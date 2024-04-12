import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CommetnCreaetDTO{

    @ApiProperty()
    @IsNotEmpty()
    artID: string

    @ApiProperty()
    @IsNotEmpty()
    comment: string
}