import {
  Controller,
  Get,
  Query,
  Req,
  Header,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StreakService } from './streak.service';
import { parseTimezoneOffset } from '../common/utils/parse-timezone-offset';

@Controller('streak')
@UseGuards(AuthGuard('jwt'))
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @Get('me')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  async getMyStreak(
    @Req() req: any,
    @Query('timezoneOffset') queryOffset?: string
  ) {
    const userId = req.user.id;
    const headerOffset = req.headers['x-timezone-offset'] as string;
    const timezoneOffsetMinutes = parseTimezoneOffset(queryOffset || headerOffset);
    return this.streakService.getStreakStats(userId, timezoneOffsetMinutes);
  }

  @Get('calendar')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate')
  async getStreakCalendar(
    @Req() req: any,
    @Query('month') month?: string,
    @Query('timezoneOffset') queryOffset?: string
  ) {
    const userId = req.user.id;
    const headerOffset = req.headers['x-timezone-offset'] as string;
    const timezoneOffsetMinutes = parseTimezoneOffset(queryOffset || headerOffset);
    return this.streakService.getStreakCalendar(
      userId,
      month,
      timezoneOffsetMinutes
    );
  }
}
