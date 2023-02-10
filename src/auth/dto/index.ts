import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty({ message: 'Name Is Required' })
  name: string;

  @IsNotEmpty({ message: 'Email Is Required' })
  @IsEmail(undefined, { message: 'Email Is Invalid' })
  email: string;

  @IsNotEmpty({ message: 'Please Enter Password' })
  password: number;
}
export class LoginDto {
  @IsNotEmpty({ message: 'Email Is Required' })
  @IsEmail(undefined, { message: 'Email Is Invalid' })
  email: string;

  @IsNotEmpty({ message: 'Please Enter Password' })
  password: number;
}
