import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsObject,
} from 'class-validator';
import { Role } from '@prisma/client';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  draftId?: string;

  // Full onboarding answers from localStorage — sent at Step 15 registration
  @IsOptional()
  @IsObject()
  onboarding?: Record<string, unknown>;
}
