import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ReactService } from './react.service';
import { ReactController } from './react.controller';
import { JwtService } from '@nestjs/jwt';
import { ReactMiddleware } from './react.middleware';

@Module({
  providers: [ReactService,JwtService],
  controllers: [ReactController]
})
export class ReactModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReactMiddleware)
      .forRoutes({
        path:'react',
        method:RequestMethod.POST
      })
  }
}
