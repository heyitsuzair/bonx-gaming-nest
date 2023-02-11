import {
  Controller,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Req,
  Param,
  Get,
} from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards';
import { CreateGameDto } from './dto';
import { GamesService } from './games.service';
import { Request } from 'express';

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
  // You're not actually providing a file, but the interceptor will expect "form data"
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'game_file', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  create(
    @Body() body: CreateGameDto,
    @UploadedFiles()
    files: {
      game_file?: any;
      banner?: any;
    },
    @Req() req: Request,
  ) {
    body.banner = files.banner[0].filename;
    body.game_file = {
      filename: files.game_file[0].filename,
      size: files.game_file[0].size,
    };
    return this.gamesService.create(body, req.headers.authorization);
  }

  @Get('/:id')
  readGame(@Param('id') id: string) {
    return this.gamesService.readGame(id);
  }
}
