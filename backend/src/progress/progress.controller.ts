import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProgressService } from './progress.service';

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
    const offset = timezoneOffset ? parseInt(timezoneOffset, 10) : 0;
    return this.progressService.getWeeklyProgress(userId, offset);
  }

  @Get('stats-summary')
  async getStatsSummary(@Req() req: any) {
    const userId = req.user?.id || req.user?.userId || req.user?.sub;
    return this.progressService.getStatsSummary(userId);
  }
}
