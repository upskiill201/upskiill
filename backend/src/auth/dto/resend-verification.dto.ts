import { IsEmail, IsNotEmpty } from 'class-validator';
import { NormalizeEmail } from './normalize-email';

/** POST /auth/resend-verification body. */
export class ResendVerificationDto {
  @NormalizeEmail()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
