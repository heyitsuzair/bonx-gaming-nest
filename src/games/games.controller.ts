import {
  Controller,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
  Param,
  Get,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateGameDto, UpdateGameDto } from './dto';
import { GamesService } from './games.service';
import { Request } from 'express';
import { uploadFile, uploadPicture } from 'utils';

const multerOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      //Calling the callback passing the random name generated with the original extension
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};

@Controller('/api/games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateGameDto, @Req() req: Request) {
    const uploadedBanner = await uploadPicture(
      body.banner,
      '/gaming-mnrn/banners/',
    );
    const uploadedFile = await uploadFile(
      body.game_file,
      '/gaming-mnrn/game_files/',
    );

    body.banner = uploadedBanner.url;
    body.game_file = {
      filename: uploadedFile.url,
      size: uploadedFile.bytes,
    };
    return this.gamesService.create(body, req.headers.authorization);
  }

  @Get()
  readGames() {
    return this.gamesService.readGames();
  }

  @Get('/owner')
  @UseGuards(JwtAuthGuard)
  readOwnerGames(@Req() req: Request) {
    return this.gamesService.readOwnerGames(req.headers.authorization);
  }

  @Get('/search')
  search(@Query('category') category: string, @Query('query') query: string) {
    return this.gamesService.search(category, query);
  }

  @Get('/:id')
  readGame(@Param('id') id: string) {
    return this.gamesService.readGame(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @Req() req: Request) {
    return this.gamesService.delete(id, req.headers.authorization);
  }
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() body: UpdateGameDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    if (body.banner) {
      const uploadedBanner = await uploadPicture(
        body.banner,
        '/gaming-mnrn/banners/',
      );
      body.banner = uploadedBanner.url;
    }
    if (body.game_file) {
      const uploadedFile = await uploadFile(
        body.game_file,
        '/gaming-mnrn/game_files/',
      );

      body.game_file = {
        filename: uploadedFile.url,
        size: uploadedFile.bytes,
      };
    }
    return this.gamesService.update(body, req.headers.authorization, id);
  }
}
