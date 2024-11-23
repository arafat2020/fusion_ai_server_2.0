import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetPostByIdDTO {
    @ApiProperty()
    @IsNotEmpty()
    id: string
}

export class GetPsotForFeedDTO {
    @ApiProperty({
        required: false
    })
    @IsNumberString()
    skip: number | undefined | string
}