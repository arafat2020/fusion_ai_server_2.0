import { Module } from '@nestjs/common';
import { AddService } from './add/add.service';
import { GetService } from './get/get.service';
import { DeleteService } from './delete/delete.service';
import { FavoriteController } from './favorite.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AddService, GetService, DeleteService, JwtService],
  controllers: [FavoriteController]
})
export class FavoriteModule {}
