import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class GroupRemoveDTO {

    @ApiProperty()
    @IsNotEmpty()
    artGroupID: string

    @ApiProperty()
    @IsNotEmpty()
    id: string
    
    
}