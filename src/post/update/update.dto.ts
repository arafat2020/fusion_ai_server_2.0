import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class PostUpdateDTO {

    @ApiProperty()
    @IsNotEmpty()
    id: string

    @ApiProperty()
    img: string|undefined

    @ApiProperty()
    @IsNotEmpty()
    tag: string|undefined

    @ApiProperty()
    prompt: string|undefined

    @ApiProperty()
    negetivePrompt: string|undefined

    @ApiProperty()
    chackPoint: string|undefined

    @ApiProperty()
    lora: string|undefined

    @ApiProperty()
    CFGscale: number|undefined

    @ApiProperty()
    Clip_skip: number|undefined

    @ApiProperty()
    hide: boolean

    @ApiProperty()
    nsfw: boolean

    @ApiProperty()
    Seed: number|undefined

    @ApiProperty()
    Sampler: string|undefined

    @ApiProperty()
    Steps: number|undefined

}