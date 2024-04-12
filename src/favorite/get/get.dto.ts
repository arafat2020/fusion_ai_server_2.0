import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetMyFavoriteDTO {

    @ApiProperty({
        required:false
    })
    @IsNumber()
    skip: number
}