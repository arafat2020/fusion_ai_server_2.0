import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteFromFavoriteDTO {

    @ApiProperty()
    @IsNotEmpty()
    artID: string

    @ApiProperty()
    @IsNotEmpty()
    favoriteID: string

}