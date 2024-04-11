import { Module } from '@nestjs/common';
import { AddService } from './add/add.service';
import { GetService } from './get/get.service';
import { DeleteService } from './delete/delete.service';

@Module({
  providers: [AddService, GetService, DeleteService]
})
export class FavoriteModule {}
