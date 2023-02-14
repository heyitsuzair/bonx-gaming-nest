import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'config';
import { GamesModule } from './games/games.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, MongooseModule.forRoot(env.database.url), GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
