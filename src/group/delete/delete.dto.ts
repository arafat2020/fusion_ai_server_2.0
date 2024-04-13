import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class GroupDeleteDTO {

    @ApiProperty()
    @IsNotEmpty()
    id: string
    
}