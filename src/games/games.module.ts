import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { ModelsName } from '../../config';
import { JwtModule } from '@nestjs/jwt';
import { GamesModel } from './model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ModelsName.games, schema: GamesModel }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
