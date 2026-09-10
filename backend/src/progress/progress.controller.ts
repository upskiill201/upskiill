import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProgressService } from './progress.service';
import { parseTimezoneOffset } from '../common/utils/parse-timezone-offset';

@UseGuards(AuthGuard('jwt'))
@Controller('v2/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('weekly')
  async getWeeklyProgress(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const userId = req.user?.id || req.user?.userId || req.user?.sub;
    return this.progressService.getWeeklyProgress(userId, parseTimezoneOffset(timezoneOffset));
  }

  @Get('stats-summary')
  async getStatsSummary(
    @Req() req: any,
    @Query('filter') filter?: 'week' | 'month' | 'all',
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const userId = req.user?.id || req.user?.userId || req.user?.sub;
    return this.progressService.getStatsSummary(userId, filter || 'week', parseTimezoneOffset(timezoneOffset));
  }
}
