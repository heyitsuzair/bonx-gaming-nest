import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsName } from '../../config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModel } from './model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelsName.users, schema: UsersModel }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
