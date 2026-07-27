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
    @Query('tzOffset') tzOffset?: string,
  ) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    const timezoneOffsetMinutes = tzOffset ? parseInt(tzOffset, 10) : 0;
    return this.homeService.getHomeDashboard(userId, timezoneOffsetMinutes);
  }
}
