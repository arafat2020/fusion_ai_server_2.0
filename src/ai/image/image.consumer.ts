import { Processor, Process, } from '@nestjs/bull';
import { queues } from 'src/queues';
import { Job } from 'bull';
import { Artist } from '@prisma/client';
import { DbService } from 'src/db/db.service';
import { LibService } from 'src/lib/lib.service';
import { Logger } from '@nestjs/common';


@Processor(queues.POST)
export class ImageConsumer {
    constructor(
        private prisma:DbService,
        private lib:LibService
    ){
        this.prisma.init()
    }

    @Process()
    async createPost(job: Job) {
        const data = job.data as {
            prompt:string,
            negative_prompt:string,
            img:{
                url: string,
                width: number,
                height: number,
                public_id:string
            },
            user:Artist,
        }
        const cmp = await this.lib.uploadWithSharp(data.img.url) 
        const post = await this.prisma.art.create({
            data:{
                id:this.prisma.getObjID(),
                img:data.img.url,
                height:data.img.height,
                width:data.img.width,
                tag:data.prompt,
                artistId:data.user.id,
                prompt:data.prompt,
                negetivePrompt:data.negative_prompt,
                cmp:cmp.url,
                cmpPubLic_ID:cmp.public_id,
                public_id:data.img.public_id,
                hide:true
            }
        })
        Logger.log('post created for user',post.artistId)
    }
}