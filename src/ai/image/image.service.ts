import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HfInference } from "@huggingface/inference";
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { LibService } from 'src/lib/lib.service';
import { Model } from './image.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { queues } from 'src/queues';
import { Artist } from '@prisma/client';



@Injectable()
export class ImageService {
    constructor(
        private config: ConfigService,
        private lib: LibService,
        @InjectQueue(queues.POST) private audioQueue: Queue
    ) { }
    hf = new HfInference(this.config.get("HG_TOKEN"))


    async generate({ res, negative_prompt, prompt, height, width, model,user }: {
        res: Response,
        prompt: string,
        negative_prompt: string | undefined,
        height: number,
        width: number,
        model: Model,
        user:Artist
    }) {

        try {
            

            const instance = await this.hf.textToImage({
                model: model ? model : Model.STABLE_DEFUSION,
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
            this.audioQueue.add({
                prompt,
                negative_prompt,
                img,
                user
            },{
                removeOnComplete:true
            })
            return res.send(img)
        } catch (error) {
            console.log(error);
            throw new HttpException({
                error: error
            }, HttpStatus.BAD_REQUEST)

        }

    }

    async imgToimg({ img_url, prompt, negative_prompt, res }: {
        img_url: string,
        prompt: string,
        negative_prompt: string,
        res: Response
    }) {
        try {
            
            const instance = await this.hf.imageToImage({
                inputs: await (await fetch(`${img_url}`)).blob(),
                model: 'stabilityai/stable-diffusion-xl-refiner-1.0',
                parameters: {
                    prompt,
                    negative_prompt,
                    num_inference_steps: 20,
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
            throw new HttpException({
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async imgTotext({ img_url, res }: {
        img_url: string,
        res: Response
    }) {
        try {
            const instance = await this.hf.imageToText({
                data: await (await fetch(`${img_url}`)).blob(),
                model: 'Salesforce/blip-image-captioning-large'
            })
            const text = instance.generated_text
            return res.send({
                text
            })
        } catch (error) {
            console.log(error);
            throw new HttpException({
                error: error
            }, HttpStatus.BAD_REQUEST)
        }
    }

    async delete({ pubic_id }: {
        pubic_id: string
    }) {
        return this.lib.deleteImage(pubic_id)
    }

}
