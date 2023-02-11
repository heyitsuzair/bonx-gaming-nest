import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsName, env } from 'config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModel } from './model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelsName.users, schema: UsersModel }]),
    JwtModule.register({
      secret: env.jwt.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
