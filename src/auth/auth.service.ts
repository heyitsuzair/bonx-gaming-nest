import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelsName } from 'config';
import { Model } from 'mongoose';
import { LoginDto, SignupDTO, UpdateDTO } from './dto';
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

      errorMessage = code === 11000 && 'Email Already Exists!';

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
        throw new UnauthorizedException('Invalid Email Or Password');
      }
      /**
       * Comparing Password
       */
      const is_password_correct = await bcrypt.compare(password, user.password);

      /**
       * @throws @exception If Password is incorrect
       */
      if (!is_password_correct) {
        throw new UnauthorizedException('Invalid Email Or Password');
      }

      const token = this.generateJwt(user);

      const user_details = {
        name: user.name,
        email: user.email,
        _id: user._id,
      };

      return { token, user_details };
    } catch ({ code, message }) {
      throw new HttpException({ msg: message }, HttpStatus.UNAUTHORIZED);
    }
  }

  async update(body: UpdateDTO, token: any) {
    const { name, email, password } = body;
    try {
      /**
       * Get User Id From JWT
       */
      const loggedInUser: any = this.jwtService.decode(token.split(' ')[1]);
      /**
       * Find User
       */
      const user = await this.usersModel.findById(loggedInUser.user_id);

      if (user.email !== email) {
        /**
         * Check Whether Email Is Already In Use Or Not
         *
         * @true @throw Exception
         *
         * @false Continue
         */
        const is_email_in_use = await this.usersModel.findOne({
          email,
        });

        if (is_email_in_use) {
          throw new BadRequestException('Email Already Exists!');
        }
        user.email = email;
      }
      if (password) {
        /**
         * Hashing Password
         */
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user.password = hash;
      }

      user.name = name;

      user.save();

      return { msg: 'Profile Updated!' };
    } catch ({ response }) {
      throw new HttpException({ msg: response.message }, response.statusCode);
    }
  }

  generateJwt(user: any) {
    const payload = { user_id: user._id };
    return this.jwtService.sign(payload);
  }
}
