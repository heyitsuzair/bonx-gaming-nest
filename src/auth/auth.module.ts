import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsName } from 'config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModel } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelsName.users, schema: UsersModel }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
