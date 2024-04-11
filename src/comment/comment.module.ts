import { Module } from '@nestjs/common';
import { CreateService } from './create/create.service';
import { UpdateService } from './update/update.service';
import { DeleteService } from './delete/delete.service';

@Module({
  providers: [CreateService, UpdateService, DeleteService]
})
export class CommentModule {}
