import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HfInference } from "@huggingface/inference";
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
// import sharp from "sharp";
import { LibService } from 'src/lib/lib.service';
import { DbService } from 'src/db/db.service';


@Injectable()
export class ImageService {
    constructor(
        private config: ConfigService,
        private lib: LibService,
        private prisma:DbService
    ) { }
    hf = new HfInference(this.config.get("HG_TOKEN"))

    async generate({ res, negative_prompt, prompt, height, width }: {
        res: Response,
        prompt: string,
        negative_prompt: string | undefined,
        height: number,
        width: number
    }) {
        try {
            const instance = await this.hf.textToImage({
                model: 'stabilityai/stable-diffusion-xl-base-1.0',
                inputs: prompt,
                parameters: {
                    negative_prompt,
                }
            })
            const s = await instance.arrayBuffer()
            const uint8Array = await new Uint8Array(s);
            const buffer = await Buffer.from(uint8Array);
            const base64ImageData = await buffer.toString('base64');
            const img = await this.lib.cldUpload(`data:image/png;base64,${base64ImageData}`)
            return res.send(img)
        } catch (error) {
            console.log(error);
            throw new HttpException(error, HttpStatus.BAD_REQUEST)

        }

    }

}
