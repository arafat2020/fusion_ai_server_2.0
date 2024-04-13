import {
    Controller,
    UseGuards,
    Post,
    Get,
    Delete,
    Query,
    Request,
    Body,
    Patch
} from '@nestjs/common';
import { AddService } from './add/add.service';
import { CreateService } from './create/create.service';
import { DeleteService } from './delete/delete.service';
import { GetService } from './get/get.service';
import { RemoveService } from './remove/remove.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from 'src/auth/auth.pipe';
import { GroupGeteDTO } from './get/get.dto';
import { GroupCreaetDTO } from './create/create.sto';
import { AddToGroup } from './add/add.dto';
import { GroupRemoveDTO } from './remove/remove.dto';
import { GroupDeleteDTO } from './delete/delete.dto';

@Controller('group')
@UseGuards(AuthGuard)
export class GroupController {
    constructor(
        private addService: AddService,
        private createService: CreateService,
        private deleteService: DeleteService,
        private getService: GetService,
        private removeService: RemoveService
    ) { }

    @Get('get')
    get(@Query(new ValidationPipe) credential: GroupGeteDTO, @Request() req) {
        return this.getService.get({
            artGroupID: credential.artGroupID
        })
    }

    @Get('get/feed')
    @ApiBearerAuth()
    getForFeed() {
        return this.getService.getForFeed()
    }

    @Post('create')
    @ApiBearerAuth()
    async createGorup(@Body(new ValidationPipe) credential: GroupCreaetDTO, @Request() req) {
        return this.createService.create({
            name: credential.name,
            user: req.user
        })
    }

    @Post('add')
    @ApiBearerAuth()
    async addToGroup(@Body(new ValidationPipe) credential: AddToGroup, @Request() req) {
        return this.addService.add({
            artGroupID: credential.artGroupID,
            artID: req.user
        })
    }

    @Patch('remove')
    @ApiBearerAuth()
    async removeFromGroup(@Body(new ValidationPipe) credential: GroupRemoveDTO, @Request() req) {
        return this.removeService.removeFromFroup({
            artGroupID: credential.artGroupID,
            id: credential.id
        })
    }

    @Delete('delete')
    @ApiBearerAuth()
    async deleteGroup(@Body(new ValidationPipe) credential: GroupDeleteDTO, @Request() req) {
        return this.deleteService.delete({
            id: credential.id,
            user: req.user
        })
    }


}
