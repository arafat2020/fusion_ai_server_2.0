import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CommetnUpdateDTO{

    @ApiProperty()
    @IsNotEmpty()
    cmtID: string

    @ApiProperty()
    @IsNotEmpty()
    comment: string
}