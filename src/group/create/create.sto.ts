import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class GroupCreaetDTO{

    @ApiProperty()
    @IsNotEmpty()
    name: string
}