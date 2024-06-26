import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtService,ConfigService,]
})

@Global()
export class AuthModule {}
