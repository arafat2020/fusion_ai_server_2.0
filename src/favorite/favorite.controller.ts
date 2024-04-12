import { Controller, Get, Post, UseGuards, Request, Query, Body } from '@nestjs/common';
import { AddService } from './add/add.service';
import { DeleteService } from './delete/delete.service';
import { GetService } from './get/get.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/auth/auth.pipe';
import { GetMyFavoriteDTO } from './get/get.dto';
import { AddtoFavoriteDTO } from './add/add.dto';
import { DeleteFromFavoriteDTO } from './delete/delete.dto';

@UseGuards(AuthGuard)
@Controller('favorite')
export class FavoriteController {
    constructor(
        private addService: AddService,
        private deleteService: DeleteService,
        private getService: GetService
    ) {

    }

    @Get('get')
    @ApiBearerAuth()
    get(@Query(new ValidationPipe) credential: GetMyFavoriteDTO, @Request() req) {
        return this.getService.get({
            skip: credential.skip,
            user: req.user
        })
    }

    @Post('add')
    @ApiBearerAuth()
    add(@Body(new ValidationPipe) credential: AddtoFavoriteDTO, @Request() req) {
        return this.addService.add({
            artID: credential.artID,
            user: req.user
        })
    }

    @Post('remove')
    @ApiBearerAuth()
    remove(@Body(new ValidationPipe) credential: DeleteFromFavoriteDTO, @Request() req) {
        return this.deleteService.delete({
            artID: credential.artID,
            favoriteID: credential.favoriteID,
            user: req.user
        })
    }
}
