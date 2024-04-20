import { Controller, UseGuards, Post, Body, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from 'src/auth/auth.pipe';
import { ImageGenDTO } from './image.dto';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) { }

    @Post('gen')
    @ApiBearerAuth()
    generate(@Body(new ValidationPipe()) credential: ImageGenDTO, @Res() res) {
        return this.imageService.generate({
            height: credential.height,
            negative_prompt: credential.negative_prompt,
            prompt: credential.prompt,
            res: res,
            width: credential.width,
        })
    }
}
