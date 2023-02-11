import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsName } from 'config';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(ModelsName.games)
    private readonly gamesModel: Model<CreateGameDto>,
    private jwtService: JwtService,
  ) {}
  async create(body: CreateGameDto, token: any) {
    /**
     * Check Whether The Owner Is Trying To Update His Profile
     */
    const loggedInUser: any = this.jwtService.decode(token.split(' ')[1]);

    body.owner_id = loggedInUser.user_id;

    await this.gamesModel.create(body);

    return { msg: 'Game Added!' };
  }
  async readGame(id) {
    /**
     * Check Whether The Owner Is Trying To Update His Profile
     */

    const game = await this.gamesModel.findById(id);

    return game;
  }
}
