import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { CreateService } from './create/create.service';
import { UpdateService } from './update/update.service';
import { GetService } from './get/get.service';
import { DeleteService } from './delete/delete.service';

@Module({
  controllers: [PostController],
  providers: [CreateService, UpdateService, GetService, DeleteService]
})
export class PostModule {}
