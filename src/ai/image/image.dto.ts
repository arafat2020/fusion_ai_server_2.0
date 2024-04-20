import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class ImageGenDTO {

    @ApiProperty()
    @IsNotEmpty()
    prompt:string

    @ApiProperty()
    negative_prompt:string

    @ApiProperty()
    @IsNotEmpty()
    height:number

    @ApiProperty()
    @IsNotEmpty()
    width:number

}