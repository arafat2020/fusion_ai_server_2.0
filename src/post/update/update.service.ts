import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Art, Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class UpdateService {
    constructor(
        private prisma: DbService,
        private lib: LibService
    ) {
        this.prisma.init()
    }

    async isExist(id:string):Promise<void>{
        const isExist = await this.prisma.art.findUnique({
            where:{
                id
            }
        })
        if (!isExist) throw new HttpException('Art is not found or invalid Obj ID', HttpStatus.BAD_REQUEST)
    }

    async update({
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
        user,
        id
    }: {
        id: string,
        img: string | undefined,
        tag: string | undefined,
        prompt: string | undefined,
        negetivePrompt: string | undefined,
        chackPoint: string | undefined,
        lora: string | undefined,
        CFGscale: number | undefined,
        Clip_skip: number | undefined,
        hide: boolean,
        nsfw: boolean,
        Seed: number | undefined,
        Sampler: string | undefined,
        Steps: number | undefined,
        user: Artist
    }): Promise<Art> {
        this.isExist(id)
        const pic = img ? await this.lib.cldUpload(img) : null
        const cmp = pic.url ? await this.lib.uploadWithSharp(pic.url) : null
        try {
            return await this.prisma.art.update({
                where: {
                    id,
                    artistId: user.id
                }, data: {
                    CFGscale,
                    Clip_skip,
                    Sampler,
                    Seed,
                    Steps,
                    chackPoint,
                    hide,
                    img:pic.url,
                    height:pic.height,
                    width:pic.width,
                    lora,
                    negetivePrompt,
                    nsfw,
                    prompt,
                    tag,
                    cmp:cmp.url
                }
            })
        } catch (error) {
            if (pic.url) {
                await this.lib.deleteImage(pic.url)
                await this.lib.deleteImage(cmp.url)
            }
            throw new HttpException(error,HttpStatus.BAD_REQUEST)
        }
    }
}
