import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ImageMiddleware } from './image.middleware';

@Module({
  providers: [ImageService,JwtService],
  controllers: [ImageController],
  imports:[ConfigModule]
})
export class ImageModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImageMiddleware)
      .forRoutes({
        path:'image/gen',
        method:RequestMethod.POST
      })
  }
}
