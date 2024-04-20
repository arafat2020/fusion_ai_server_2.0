import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ImageService,JwtService],
  controllers: [ImageController],
  imports:[ConfigModule]
})
export class ImageModule {}
