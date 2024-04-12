import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class ReactDTO {

    @ApiProperty()
    @IsNotEmpty()
    artId: string

    @ApiProperty()
    @IsNotEmpty()
    type: 'like' | 'love' | 'dislike'
}
