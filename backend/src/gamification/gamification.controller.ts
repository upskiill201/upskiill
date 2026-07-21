import { Controller, Get, Post, UseGuards, Req, Query, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GamificationService } from './gamification.service';

@UseGuards(AuthGuard('jwt'))
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  /**
   * GET /api/gamification/me
   * Accepts timezoneOffset in query parameters (defaults to 0).
   */
  @Get('me')
  async getMyStats(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const offset = timezoneOffset ? parseInt(timezoneOffset, 10) : 0;
    return this.gamificationService.getMyStats(req.user.id as string, offset);
  }

  /**
   * POST /api/gamification/lose-life
   */
  @Post('lose-life')
  async loseLife(@Req() req: any) {
    return this.gamificationService.loseLife(req.user.id as string);
  }

  /**
   * POST /api/gamification/refill-lives
   */
  @Post('refill-lives')
  async refillLives(@Req() req: any) {
    return this.gamificationService.refillLives(req.user.id as string);
  }

  /**
   * POST /api/gamification/refill-lives-xp
   * Restores full lives using 100 XP points.
   */
  @Post('refill-lives-xp')
  async refillLivesWithXp(@Req() req: any) {
    return this.gamificationService.refillLivesWithXp(req.user.id as string);
  }

  /**
   * POST /api/gamification/buy-freeze
   * Buys a streak freeze card for 150 XP.
   */
  @Post('buy-freeze')
  async buyStreakFreeze(@Req() req: any) {
    return this.gamificationService.buyStreakFreeze(req.user.id as string);
  }

  /**
   * POST /api/gamification/claim-quest
   * Claims a daily quest, awards XP, and tracks streak updates.
   * Body: { questId, timezoneOffset? }
   */
  @Post('claim-quest')
  async claimQuest(
    @Req() req: any,
    @Body() body: { questId: string; timezoneOffset?: number },
  ) {
    const offset = body.timezoneOffset ?? 0;
    return this.gamificationService.claimQuest(req.user.id as string, body.questId, offset);
  }
}
