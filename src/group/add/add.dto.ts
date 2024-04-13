import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class AddToGroup {

    @ApiProperty()
    @IsNotEmpty()
    artGroupID: string

    @ApiProperty()
    @IsNotEmpty()
    artID: string

}