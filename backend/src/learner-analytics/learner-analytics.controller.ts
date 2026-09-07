import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LearnerAnalyticsService } from './learner-analytics.service';
import { parseTimezoneOffset } from '../common/utils/parse-timezone-offset';
import type { ActivityMetric, ActivityPeriod } from './dto/activity-query.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('v2/learner-analytics')
export class LearnerAnalyticsController {
  constructor(
    private readonly learnerAnalyticsService: LearnerAnalyticsService,
  ) {}

  @Get('dashboard')
  async getDashboard(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const userId = req.user?.id || req.user?.userId || req.user?.sub;
    return this.learnerAnalyticsService.getDashboard(
      userId,
      parseTimezoneOffset(timezoneOffset),
    );
  }

  @Get('heatmap')
  async getHeatmap(
    @Req() req: any,
    @Query('weeks') weeks?: string,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const userId = req.user?.id || req.user?.userId || req.user?.sub;
    const parsedWeeks = Math.trunc(Number(weeks));
    return this.learnerAnalyticsService.getHeatmap(
      userId,
      Number.isFinite(parsedWeeks) && parsedWeeks > 0 ? parsedWeeks : 12,
      parseTimezoneOffset(timezoneOffset),
    );
  }

  @Get('activity')
  async getActivity(
    @Req() req: any,
    @Query('period') period?: ActivityPeriod,
    @Query('metric') metric?: ActivityMetric,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const userId = req.user?.id || req.user?.userId || req.user?.sub;
    return this.learnerAnalyticsService.getActivity(
      userId,
      period ?? '30d',
      metric ?? 'xp',
      parseTimezoneOffset(timezoneOffset),
    );
  }
}
