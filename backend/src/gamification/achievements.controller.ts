import { Controller, Get, Post, UseGuards, Req, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AchievementsService, BadgeId } from "./achievements.service";

@UseGuards(AuthGuard("jwt"))
@Controller("gamification")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  /**
   * GET /api/gamification/achievements
   * Returns the student achievement cards with live progress, unlock status, and claim state.
   */
  @Get("achievements")
  async getAchievements(@Req() req: any) {
    return this.achievementsService.getAchievements(req.user.id as string);
  }

  /**
   * POST /api/gamification/achievements/claim
   * Claims the XP reward for a specific unlocked badge tier.
   * Body: { badgeId: string, level: number }
   */
  @Post("achievements/claim")
  async claimAchievementReward(
    @Req() req: any,
    @Body() body: { badgeId: BadgeId; level: number },
  ) {
    return this.achievementsService.claimAchievementReward(
      req.user.id as string,
      body.badgeId,
      body.level,
    );
  }
}