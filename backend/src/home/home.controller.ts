import { Controller, Get, Req, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HomeService } from './home.service';

@Controller('home')
@UseGuards(AuthGuard('jwt'))
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getHomeDashboard(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
    // Legacy spelling. This endpoint originally accepted only `tzOffset` while
    // every other endpoint in the app takes `timezoneOffset`, so a caller using
    // the app-wide convention silently fell through to 0 — which shifts the
    // "today" boundary for streaks, missions and chests for every learner not
    // on UTC. Both are accepted; the standard name wins.
    @Query('tzOffset') tzOffset?: string,
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    const raw = timezoneOffset ?? tzOffset;
    const parsed = raw !== undefined ? parseInt(raw, 10) : NaN;
    const timezoneOffsetMinutes = Number.isFinite(parsed) ? parsed : 0;
    return this.homeService.getHomeDashboard(userId, timezoneOffsetMinutes);
  }
}
