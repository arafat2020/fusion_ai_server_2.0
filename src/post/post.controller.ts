import {
    Controller,
    UseGuards,
    Request,
    Post,
    Body,
    Patch,
    Get,
    Query,
    Delete
} from '@nestjs/common';
import { CreateService } from './create/create.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/auth/auth.pipe';
import { PostCreateDTO } from './create/create.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostUpdateDTO } from './update/update.dto';
import { UpdateService } from './update/update.service';
import { GetService } from './get/get.service';
import { GetPostByIdDTO, GetPsotForFeedDTO } from './get/get.dto';
import { DeleteService } from './delete/delete.service';
import { PostDeletDTO } from './delete/delete.dto';

@Controller('post')
export class PostController {
    constructor(
        private createService: CreateService,
        private updateService: UpdateService,
        private getService: GetService,
        private deleteService: DeleteService
    ) { }

    @Post('create')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    create(@Body(new ValidationPipe) {
        CFGscale,
        Clip_skip,
        Sampler,
        Seed,
        Steps,
        chackPoint,
        hide,
        img,
        lora,
        negetivePrompt,
        nsfw,
        prompt,
        tag
    }: PostCreateDTO, @Request() req) {
        return this.createService.create({
            CFGscale,
            chackPoint,
            Clip_skip,
            hide,
            img,
            lora,
            negetivePrompt,
            nsfw,
            prompt,
            Sampler,
            Seed,
            Steps,
            tag,
            user: req.user
        })
    }

    @Patch('update')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    update(@Body(new ValidationPipe) {
        CFGscale,
        Clip_skip,
        Sampler,
        Seed,
        Steps,
        chackPoint,
        hide,
        img,
        lora,
        negetivePrompt,
        nsfw,
        prompt,
        tag,
        id
    }: PostUpdateDTO, @Request() req) {
        return this.updateService.update({
            CFGscale,
            chackPoint,
            Clip_skip,
            hide,
            id,
            img,
            lora,
            negetivePrompt,
            nsfw,
            prompt,
            Sampler,
            Seed,
            Steps,
            tag,
            user: req.user
        })
    }

    @Get('get')
    getPostById(@Query(new ValidationPipe) { id }: GetPostByIdDTO) {
        return this.getService.getPostById({
            id
        })
    }

    @Get('get/feed')
    getPostForFeed(@Query(new ValidationPipe) { skip }: GetPsotForFeedDTO) {
        return this.getService.getPostForFeed({
            skip
        })
    }

    @Delete('delete')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    delete(@Body(new ValidationPipe) { id }: PostDeletDTO, @Request() req) {
        return this.deleteService.delete({
            id,
            user: req.user
        })
    }

}
