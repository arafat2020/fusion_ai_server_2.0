import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class ImageGenDTO {

    @ApiProperty()
    @IsNotEmpty()
    prompt: string

    @ApiProperty()
    negative_prompt: string

    @ApiProperty()
    @IsNotEmpty()
    height: number

    @ApiProperty()
    @IsNotEmpty()
    width: number

}
export class ImageGenDeletDTO {
    @ApiProperty()
    @IsNotEmpty()
    public_id: string
}

export class ImageToImageDto {
    @ApiProperty()
    @IsNotEmpty()
    prompt: string

    @ApiProperty()
    negative_prompt: string

    @ApiProperty()
    @IsNotEmpty()
    img_url: string
}

export class ImageToTextDto {

    @ApiProperty()
    @IsNotEmpty()
    img_url: string

}

export enum Model {
    ANIME = "cagliostrolab/animagine-xl-3.1",
    STABLE_DEFUSION = "stabilityai/stable-diffusion-xl-base-1.0",
    REALISTIC_VISION = "stablediffusionapi/realistic-vision",
    DREAMSHAPER = "Lykon/dreamshaper-xl-1-0"
}