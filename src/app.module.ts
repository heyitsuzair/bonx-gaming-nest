import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'config';
import { GamesModule } from './games/games.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(env.database.url), GamesModule],
})
export class AppModule {}
