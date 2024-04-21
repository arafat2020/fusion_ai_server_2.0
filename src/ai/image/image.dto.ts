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