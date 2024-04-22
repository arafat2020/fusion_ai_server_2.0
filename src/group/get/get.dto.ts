import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class GroupGeteDTO {

    @ApiProperty()
    @IsNotEmpty()
    artGroupID: string

}

