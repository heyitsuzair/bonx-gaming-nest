import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDTO, UpdateDTO } from './dto';
import { JwtAuthGuard } from './guards';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signup(@Body() body: SignupDTO) {
    return this.authService.signup(body);
  }
  @Post('/login')
  @HttpCode(200)
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
  @Put('/update/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  update(@Body() body: UpdateDTO, @Param('id') id: string, @Req() req: any) {
    return this.authService.update(body, id, req.headers.authorization);
  }
}
