import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class ChallengeCompleteDto {
  /**
   * Verified WhatsApp number from Step 6, when the learner verified before
   * reaching Step 9. Normalised server-side; only accepted as a settlement
   * key when a fresh, unclaimed whatsapp_otps row proves verification —
   * client "verified" flags alone are never trusted.
   */
  @IsOptional()
  @IsString()
  @Length(7, 25)
  @Matches(/^\+?[0-9\s\-().]+$/, {
    message: 'whatsappNumber must be a valid phone number',
  })
  whatsappNumber?: string;
}
