import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddtoFavoriteDTO {

    @ApiProperty()
    @IsNotEmpty()
    artID:string
}