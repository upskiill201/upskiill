import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StreakService } from './streak.service';

@Controller('streak')
@UseGuards(AuthGuard('jwt'))
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @Get('me')
  async getMyStreak(@Req() req: any) {
    const userId = req.user.id;
    const timezoneOffsetMinutes = parseInt(
      (req.headers['x-timezone-offset'] as string) || '0',
      10
    );
    return this.streakService.getStreakStats(userId, timezoneOffsetMinutes);
  }

  @Get('calendar')
  async getStreakCalendar(
    @Req() req: any,
    @Query('month') month?: string
  ) {
    const userId = req.user.id;
    const timezoneOffsetMinutes = parseInt(
      (req.headers['x-timezone-offset'] as string) || '0',
      10
    );
    return this.streakService.getStreakCalendar(
      userId,
      month,
      timezoneOffsetMinutes
    );
  }
}
