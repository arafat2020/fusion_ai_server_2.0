import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from './auth.pipe';
import { SignUpDto, SingInDTO } from './auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Artist } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signUp')
    signUp(@Body(new ValidationPipe) {
        about,
        email,
        imgUrl,
        name,
        password
    }: SignUpDto) {
        return this.authService.signUp({
            name,
            about,
            email,
            password,
            imgUrl
        })
    }

    @Post('signIn')
    async signIn(@Body(new ValidationPipe) {
        email,
        password
    }: SingInDTO) {
        const user = await this.authService.signIn({
            email,
            password
        })
        user.artist.password = null
        return user
    }

    @Get('profile')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async me(@Request() req) {
        const user = await req.user as Artist
        user.password = null
        return user
    }
}
