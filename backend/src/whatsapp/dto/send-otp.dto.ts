import { IsString, Length, Matches } from 'class-validator';

export class SendOtpDto {
  /** Raw phone as typed/picked by the user; normalised server-side to E.164. */
  @IsString()
  @Length(7, 25)
  @Matches(/^\+?[0-9\s\-().]+$/, {
    message: 'phone must be a valid phone number',
  })
  phone!: string;
}
