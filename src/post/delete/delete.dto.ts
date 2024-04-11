import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class PostDeletDTO {
    @ApiProperty()
    @IsNotEmpty()
    id: string
}