import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from './auth.pipe';
import { SignUpDto, SingInDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signUp')
    signUp(@Body(new ValidationPipe) {
        about,
        email,
        imgUrl,
        name,
        password
    }:SignUpDto){
        return this.authService.signUp({
            name,
            about,
            email,
            password,
            imgUrl
        })
    }

    @Post('signIn')
    signIn(@Body(new ValidationPipe) {
        email,
        password
    }:SingInDTO){
        return this.authService.signIn({
            email,
            password
        })
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    me(@Request() req){
        return req.user
    }
}
