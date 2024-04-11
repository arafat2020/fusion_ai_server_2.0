import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Art, Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class CreateService {
    constructor(
        private prisma: DbService,
        private lib: LibService
    ) {
        this.prisma.init()
    }

    async create({
        CFGscale,
        Clip_skip,
        Sampler,
        Seed,
        Steps,
        chackPoint,
        hide,
        img,
        lora,
        negetivePrompt,
        nsfw,
        prompt,
        tag,
        user
    }: {
        img: string,
        tag: string,
        prompt: string,
        negetivePrompt: string,
        chackPoint: string,
        lora: string,
        CFGscale: number,
        Clip_skip: number,
        hide: boolean,
        nsfw: boolean,
        Seed: number,
        Sampler: string,
        Steps: number,
        user: Artist
    }):Promise<Art> {
        const pic = await this.lib.cldUpload(img)
        const cmp = await this.lib.uploadWithSharp(img)
        try {
            const art = await this.prisma.art.create({
                data: {
                    id: `${this.prisma.getObjID()}`,
                    img: `${pic.url}`,
                    width: Number(pic.width),
                    height: Number(pic.height),
                    tag: tag,
                    artistId: user.id,
                    prompt: prompt && prompt,
                    negetivePrompt: negetivePrompt && negetivePrompt,
                    chackPoint: chackPoint,
                    lora: lora,
                    CFGscale: Number(CFGscale),
                    Clip_skip: Number(Clip_skip),
                    hide: hide ? true : false,
                    nsfw: nsfw ? true : false,
                    Seed: Number(Seed),
                    Sampler: Sampler,
                    Steps: Number(Steps),
                    cmp: cmp.url,
                    public_id:pic.public_id,
                    cmpPubLic_ID:cmp.public_id
                }
            })
            return art
        } catch (error) {
            await this.lib.deleteImage(pic.public_id)
            await this.lib.deleteImage(cmp.public_id)
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }
}
