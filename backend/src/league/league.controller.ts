import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeagueService } from './league.service';

/**
 * Weekly league leaderboards (Duolingo-style). The frontend reaches these
 * through the Next.js /api proxy with the auth cookie.
 */
@UseGuards(AuthGuard('jwt'))
@Controller('leagues')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  /**
   * GET /api/leagues/me
   * Current week's leaderboard: my cohort standings, ranks, zone cutoffs and
   * the week deadline. Lazily settles any finished weeks first.
   */
  @Get('me')
  async getMyLeaderboard(@Req() req: any) {
    return this.leagueService.getMyLeaderboard(req.user.id as string);
  }

  /**
   * GET /api/leagues/me/pending-results
   * Every unseen week settlement (promotion / demotion / championship),
   * oldest first, consumed by the dashboard celebration watcher. Empty array
   * when nothing new.
   */
  @Get('me/pending-results')
  async getPendingResults(@Req() req: any) {
    return this.leagueService.getPendingResults(req.user.id as string);
  }

  /**
   * POST /api/leagues/me/ack-result
   * Marks a week result as surfaced so its celebration plays exactly once.
   * Body: { weekStart: 'YYYY-MM-DD' }
   */
  @Post('me/ack-result')
  async ackResult(@Req() req: any, @Body() body: { weekStart?: string }) {
    const weekStart = body?.weekStart;
    if (!weekStart) return { success: false };
    return this.leagueService.ackResult(req.user.id as string, weekStart);
  }

  /**
   * GET /api/leagues/me/history
   * Past week results (league, rank, XP, outcome), newest first.
   */
  @Get('me/history')
  async getHistory(@Req() req: any) {
    return this.leagueService.getHistory(req.user.id as string);
  }
}
