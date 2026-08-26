import { IsString, Length, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @Length(7, 25)
  @Matches(/^\+?[0-9\s\-().]+$/, {
    message: 'phone must be a valid phone number',
  })
  phone!: string;

  /** 6-digit verification code exactly as delivered over WhatsApp. */
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/, { message: 'code must be exactly 6 digits' })
  code!: string;
}
