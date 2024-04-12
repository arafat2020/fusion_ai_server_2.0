import { Module } from '@nestjs/common';
import { CreateService } from './create/create.service';
import { UpdateService } from './update/update.service';
import { DeleteService } from './delete/delete.service';
import { CommentController } from './comment.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CreateService, UpdateService, DeleteService, JwtService],
  controllers: [CommentController]
})
export class CommentModule {}
