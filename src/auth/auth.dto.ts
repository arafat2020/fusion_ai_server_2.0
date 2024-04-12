import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from 'class-validator';
export class SignUpDto {

    @ApiProperty({
        description: 'Email of the new user',
    })
    @IsEmail({}, {
        message: 'Enter a valid Email'
    })
    email: string

    @ApiProperty({
        description: 'Name of the new user',
        required: true,
    })
    @IsNotEmpty({
        message: "Name is Required"
    })
    name: string

    @ApiProperty({
        description: 'Password of the new user',
        required: true,
    })
    @IsNotEmpty({
        message: "Password is Required",
    })
    password: string

    @ApiProperty({
        description: 'A short description about an artist',
        required: true,
    })
    @IsNotEmpty({
        message: "Password is Required",
    })
    about: string

    @ApiProperty({
        description: 'User of the new user. It should be a either img http url or base64 of a image',
        required: true,
    })
    @IsNotEmpty({
        message: "Image Is required"
    })
    imgUrl: string

}

export class SingInDTO {
    @ApiProperty({
        description: 'Email of the singUped user',
        default:"test7@gmail.com"
    })
    @IsEmail({}, {
        message: 'Enter a valid Email'
    })
    email: string

    @ApiProperty({
        description: 'Password of the new user',
        default:'1234'
        })
    @IsNotEmpty({
        message: "Password is Required",
    })
    password: string
}