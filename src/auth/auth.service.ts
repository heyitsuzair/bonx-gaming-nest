import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsName } from 'config';
import { Model } from 'mongoose';
import { AuthDto } from './dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ModelsName.users) private readonly usersModel: Model<AuthDto>,
  ) {}
  async signup(body: AuthDto) {
    try {
      /**
       * Hashing Password
       */
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      body.password = hash;

      const create_user = await this.usersModel.create(body);
      return { msg: 'Registration Successful!' };
    } catch ({ code, message }) {
      let errorMessage = message;

      errorMessage = code === 11000 && 'Account Already Exists!';

      throw new HttpException(
        { msg: errorMessage },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
