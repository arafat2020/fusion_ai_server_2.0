import { Controller, UseGuards, Post, Body, Res, Query } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { ValidationPipe } from 'src/auth/auth.pipe';
import { ImageGenDTO, ImageGenDeletDTO, ImageToImageDto, ImageToTextDto, Model } from './image.dto';



@UseGuards(AuthGuard)
@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) { }

    @Post('gen')
    @ApiBearerAuth()
    @ApiQuery({name:'model', enum:Model})
    generate(@Body(new ValidationPipe()) credential: ImageGenDTO, @Res() res, @Query("model") model:Model) {        
        return this.imageService.generate({
            height: credential.height,
            negative_prompt: credential.negative_prompt,
            prompt: credential.prompt,
            res: res,
            width: credential.width,
            model:model
        })
    }

    @Post('delete')
    @ApiBearerAuth()
    delete(@Body(new ValidationPipe()) credential: ImageGenDeletDTO) {
        return this.imageService.delete({
            pubic_id: credential.public_id
        })
    }

    @Post('img_to_img')
    @ApiBearerAuth()
    imgToImg(@Body(new ValidationPipe()) credential: ImageToImageDto, @Res() res) {
        return this.imageService.imgToimg({
            img_url: credential.img_url,
            negative_prompt: credential.negative_prompt,
            prompt: credential.prompt,
            res: res
        })
    }

    @Post('img_to_text')
    @ApiBearerAuth()
    imgToText(@Body(new ValidationPipe()) credential: ImageToTextDto, @Res() res) {
        return this.imageService.imgTotext({
            img_url: credential.img_url,
            res
        })
    }


}
