import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NormalizeEmail } from './normalize-email';

export class LoginDto {
  @NormalizeEmail()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  role?: string;
}
