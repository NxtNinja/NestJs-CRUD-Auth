import { IsEmail, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
