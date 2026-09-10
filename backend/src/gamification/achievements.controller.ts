import { Controller, Get, Post, UseGuards, Req, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Throttle } from "@nestjs/throttler";
import { AchievementsService, BadgeId } from "./achievements.service";

@UseGuards(AuthGuard("jwt"))
@Controller("gamification")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  /**
   * GET /api/gamification/achievements
   * Returns the full achievement collection — every tier as its own collectible
   * with unlock/seen state, live progress toward the next tier per badge,
   * aggregate totals for the "X / Y unlocked" header, and the raw metrics.
   */
  @Get("achievements")
  async getAchievements(@Req() req: any) {
    return this.achievementsService.getAchievements(req.user.id as string);
  }

  /**
   * GET /api/gamification/achievements/unseen
   * Unlocked-but-not-yet-viewed tiers across every badge — what the Herald
   * notification banner surfaces. Viewing one marks it seen.
   */
  @Get("achievements/unseen")
  async getUnseenAchievements(@Req() req: any) {
    return this.achievementsService.getUnseenAchievements(req.user.id as string);
  }

  /**
   * POST /api/gamification/achievements/claim-onboarding-badge
   * The step-13 onboarding moment: unlocks the Novice badge if the user's
   * onboarding session shows they reached the badge step, marks it seen (this
   * step is the viewing moment) and returns the scene payload. Idempotent —
   * re-claiming returns the same unlock; a user who hasn't earned it gets 400.
   */
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post("achievements/claim-onboarding-badge")
  async claimOnboardingBadge(@Req() req: any) {
    return this.achievementsService.claimOnboardingBadge(
      req.user.id as string,
    );
  }

  /**
   * POST /api/gamification/achievements/mark-seen
   * Records that the student viewed an unlock (celebration scene or profile
   * collection) so Herald stops surfacing it. Idempotent, credits nothing —
   * the achievement itself is the reward.
   * Body: { badgeId: string, level: number }
   */
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @Post("achievements/mark-seen")
  async markAchievementSeen(
    @Req() req: any,
    @Body() body: { badgeId: BadgeId; level: number },
  ) {
    return this.achievementsService.markAchievementSeen(
      req.user.id as string,
      body.badgeId,
      body.level,
    );
  }
}
