import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

/**
 * POST /auth/verify-code body. Codes are exactly 6 digits (CSPRNG-generated,
 * 10-minute TTL). A strict DTO keeps the global ValidationPipe's
 * whitelist/forbidNonWhitelisted contract intact — loose @Body('prop')
 * extraction here previously let malformed bodies through to bcrypt as
 * `undefined` and blew up as a 500 instead of a clean 400.
 */
export class VerifyCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^\d{6}$/, { message: 'code must be exactly 6 digits' })
  code: string;
}
