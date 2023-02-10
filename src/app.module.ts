import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'config';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(env.database.url)],
})
export class AppModule {}
