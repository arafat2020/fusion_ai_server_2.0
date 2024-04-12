import { Controller, Patch, Post, Delete, UseGuards, Body, Request } from '@nestjs/common';
import { CreateService } from './create/create.service';
import { UpdateService } from './update/update.service';
import { DeleteService } from './delete/delete.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from 'src/auth/auth.pipe';
import { CommetnCreaetDTO } from './create/create.dto';
import { CommetnUpdateDTO } from './update/update.dto';
import { CommetnDeleteDTO } from './delete/delete.dto';

@Controller('comment')
@UseGuards(AuthGuard)
export class CommentController {
    constructor(
        private createService: CreateService,
        private updateService: UpdateService,
        private deleteServise: DeleteService
    ) { }

    @Post('create')
    @ApiBearerAuth()
    create(@Body(new ValidationPipe) credentianl: CommetnCreaetDTO, @Request() req) {
        return this.createService.cerate({
            artID: credentianl.artID,
            comment: credentianl.comment,
            user: req.user
        })
    }

    @Patch('update')
    @ApiBearerAuth()
    update(@Body(new ValidationPipe) credentianl: CommetnUpdateDTO, @Request() req) {
        return this.updateService.update({
            cmtID: credentianl.cmtID,
            comment: credentianl.comment,
            user: req.user
        })
    }

    @Delete('delete')
    @ApiBearerAuth()
    delete(@Body(new ValidationPipe) credentianl: CommetnDeleteDTO, @Request() req) {
        return this.deleteServise.delete({
            cmtID: credentianl.artID,
            user: req.user
        })
    }

}
