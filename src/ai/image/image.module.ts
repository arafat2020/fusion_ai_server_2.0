import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ImageMiddleware } from './image.middleware';
import { BullModule } from '@nestjs/bull';
import { queues } from 'src/queues';
import { ImageConsumer } from './image.consumer';

@Module({
  providers: [ImageService,JwtService,ImageConsumer],
  controllers: [ImageController],
  imports:[ConfigModule, BullModule.registerQueue({
    name:queues.POST
  })]
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
