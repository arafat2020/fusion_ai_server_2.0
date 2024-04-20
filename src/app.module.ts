import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LibModule } from './lib/lib.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { ReactModule } from './react/react.module';
import { CommentModule } from './comment/comment.module';
import { GroupModule } from './group/group.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    AuthModule,
    LibModule,
    DbModule,
    ConfigModule.forRoot(),
    PostModule,
    ReactModule,
    CommentModule,
    GroupModule,
    FavoriteModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
