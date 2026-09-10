import { IsEmail, IsNotEmpty } from 'class-validator';

/** POST /auth/resend-verification body. */
export class ResendVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
