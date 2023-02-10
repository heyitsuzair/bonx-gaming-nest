import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsName } from 'config';
import { Model } from 'mongoose';
import { LoginDto, SignupDTO } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ModelsName.users)
    private readonly usersModel: Model<SignupDTO>,
    private jwtService: JwtService,
  ) {}
  async signup(body: SignupDTO) {
    try {
      /**
       * Hashing Password
       */
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      body.password = hash;

      await this.usersModel.create(body);

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
  async login(body: LoginDto) {
    try {
      const { email, password } = body;
      /**
       * Find User
       */
      const user = await this.usersModel.findOne({ email });

      /**
       * @return @exception If User Not Found
       */
      if (!user) {
        throw new UnauthorizedException();
      }
      /**
       * Comparing Password
       */
      const is_password_correct = await bcrypt.compare(password, user.password);

      /**
       * @throws @exception If Password is incorrect
       */
      if (!is_password_correct) {
        throw new UnauthorizedException();
      }

      const token = this.generateJwt(user);

      const user_details = {
        name: user.name,
        email: user.email,
        _id: user._id,
      };

      return { token, user_details };
    } catch ({ code, message }) {
      let errorMessage = message;

      errorMessage =
        message === 'Unauthorized' ? 'Invalid Email Or Password!' : message;

      throw new HttpException({ msg: errorMessage }, HttpStatus.UNAUTHORIZED);
    }
  }

  generateJwt(user: any) {
    const payload = { user_id: user._id };
    return this.jwtService.sign(payload);
  }
}
