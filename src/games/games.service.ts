import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsName } from '../../config';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { deleteFile } from '../../utils';

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
      const game = await this.gamesModel
        .findById(id)
        .populate('owner_id', 'name');
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

      const banner = game.banner;
      /**
       * Removing Forward Slashes From URL And Combining Strings To Make Path To Delete Image On Cloudinary
       */
      const removeForwardSlashesBanner = banner.split('/');
      const pathBanner =
        removeForwardSlashesBanner[7] +
        '/' +
        removeForwardSlashesBanner[8] +
        '/' +
        removeForwardSlashesBanner[9].split('.')[0];

      const bannerPathWithoutPercent20 = decodeURIComponent(pathBanner);
      await deleteFile(bannerPathWithoutPercent20);

      const game_file = game.game_file.filename;
      /**
       * Removing Forward Slashes From URL And Combining Strings To Make Path To Delete File On Cloudinary
       */
      const removeForwardSlashesFile = game_file.split('/');
      const pathFile =
        removeForwardSlashesFile[7] +
        '/' +
        removeForwardSlashesFile[8] +
        '/' +
        removeForwardSlashesFile[9];

      const filepathWithoutPercent20 = decodeURIComponent(pathFile);

      await deleteFile(filepathWithoutPercent20);

      game.delete();

      return { msg: 'Game Deleted!' };
    } catch ({ response }) {
      throw new HttpException({ msg: response.message }, response.statusCode);
    }
  }
  async update(body: CreateGameDto, token: any, id: string) {
    try {
      /**
       * Find Game
       */
      const game: any = await this.gamesModel.findById(id);

      if (!game) {
        throw new NotFoundException('Game Not Found!');
      }
      /**
       * Get Owner ID From JWT
       */
      const loggedInUser: any = this.jwtService.decode(token.split(' ')[1]);

      if (!game.owner_id.equals(loggedInUser.user_id)) {
        throw new UnauthorizedException('Unauthorized!');
      }

      body.owner_id = loggedInUser.user_id;

      game.title = body.title;
      game.short_description = body.short_description;
      game.long_description = body.long_description;
      game.features = body.features;
      game.installs = body.installs;
      game.current_version = body.current_version;
      game.category = body.category;
      game.owner_id = body.owner_id;

      if (body.game_file) {
        game.game_file = body.game_file;
      }
      if (body.banner) {
        game.banner = body.banner;
      }
      if (body.whats_new) {
        game.whats_new = body.whats_new;
      }

      game.save();

      return { msg: 'Game Updated!' };
    } catch ({ response }) {
      throw new HttpException({ msg: response.message }, response.statusCode);
    }
  }
  async search(category: string, query: string) {
    /**
     * Object To Query In MongoDB
     */
    const toFind: any = {};

    /**
     * Check Whether Each Query Is Incoming
     *
     * @true Add A Query Object To @var toFind
     *
     * @false Continue
     */
    if (query) {
      toFind.title = { $regex: new RegExp('.*' + query.toLowerCase(), 'i') };
    }
    if (category) {
      toFind.category = { $regex: new RegExp('.*' + category, 'i') };
    }

    const games = await this.gamesModel.find(toFind);

    return games;
  }
}
