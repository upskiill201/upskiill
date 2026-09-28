import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsString, Length } from 'class-validator';
import { ReferralService } from './referral.service';

class ClaimReferralDto {
  @IsString()
  @Length(6, 12)
  code!: string;
}

@UseGuards(AuthGuard('jwt'))
@Controller('referrals')
export class ReferralController {
  constructor(private readonly referrals: ReferralService) {}

  /** GET /referrals/me — my invite code, the reward, and the friends who joined. */
  @Get('me')
  me(@Req() req: { user: { id: string } }) {
    return this.referrals.summary(req.user.id);
  }

  /** POST /referrals/claim — a new learner claims the invite they arrived with. */
  @Post('claim')
  claim(@Req() req: { user: { id: string } }, @Body() dto: ClaimReferralDto) {
    return this.referrals.claim(req.user.id, dto.code);
  }
}
