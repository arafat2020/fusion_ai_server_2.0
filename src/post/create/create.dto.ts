import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class PostCreateDTO {

    @ApiProperty()
    @IsNotEmpty()
    img: string

    @ApiProperty()
    @IsNotEmpty()
    tag: string

    @ApiProperty()
    @IsNotEmpty()
    prompt: string

    @ApiProperty()
    negetivePrompt: string

    @ApiProperty()
    chackPoint: string

    @ApiProperty()
    lora: string

    @ApiProperty()
    CFGscale: number

    @ApiProperty()
    Clip_skip: number

    @ApiProperty()
    hide: boolean

    @ApiProperty()
    nsfw: boolean

    @ApiProperty()
    Seed: number

    @ApiProperty()
    Sampler: string

    @ApiProperty()
    Steps: number

}