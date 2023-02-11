import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
     * Get Owner ID From JWT
     */
    const loggedInUser: any = this.jwtService.decode(token.split(' ')[1]);

    body.owner_id = loggedInUser.user_id;

    await this.gamesModel.create(body);

    return { msg: 'Game Added!' };
  }
  async readGame(id: string) {
    try {
      const game = await this.gamesModel.findById(id);

      if (!game) {
        throw new NotFoundException('Game Not Found!');
      }

      return game;
    } catch (error) {
      throw new HttpException({ msg: 'Game Not Found' }, 404);
    }
  }
  async readGames() {
    const games = await this.gamesModel.find();

    return games;
  }
  async readOwnerGames(token: any) {
    /**
     * Get Owner ID From JWT
     */
    const loggedInUser: any = this.jwtService.decode(token.split(' ')[1]);

    const owner_id = loggedInUser.user_id;
    const games = await this.gamesModel.find({ owner_id });

    return games;
  }

  async delete(id: string, token: any) {
    try {
      /**
       * Find Game
       */
      const game: any = await this.gamesModel.findById(id);

      if (!game) {
        throw new NotFoundException('Game Not Found!');
      }

      /**
       * Check Whether The Owner Is Trying To Delete
       *
       * @true  Continue
       *
       * @false @throw Exception
       */
      const loggedInUser: any = this.jwtService.decode(token.split(' ')[1]);

      if (!game.owner_id.equals(loggedInUser.user_id)) {
        throw new UnauthorizedException('Unauthorized!');
      }

      game.delete();

      return { msg: 'Game Deleted!' };
    } catch ({ response }) {
      throw new HttpException({ msg: response.message }, response.statusCode);
    }
  }
}
