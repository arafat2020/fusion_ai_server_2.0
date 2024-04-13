import { Module } from '@nestjs/common';
import { CreateService } from './create/create.service';
import { GetService } from './get/get.service';
import { AddService } from './add/add.service';
import { RemoveService } from './remove/remove.service';
import { DeleteService } from './delete/delete.service';
import { GroupController } from './group.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CreateService, GetService, AddService, RemoveService, DeleteService, JwtService],
  controllers: [GroupController]
})
export class GroupModule {}
