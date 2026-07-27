import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AchievementsService } from './achievements.service';

@Controller('achievements')
@UseGuards(AuthGuard('jwt'))
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('my')
  async getMyAchievements(@Req() req: any) {
    const userId = req.user.userId || req.user.id || req.user.sub;
    return this.achievementsService.getUserAchievements(userId);
  }
}
