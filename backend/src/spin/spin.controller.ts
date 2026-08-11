import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { SpinService } from './spin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('v2/spin')
@UseGuards(AuthGuard('jwt'))
export class SpinController {
  constructor(private readonly spinService: SpinService) {}

  @Get('current-week')
  async getCurrentWeek(@Req() req) {
    return this.spinService.getCurrentWeekSpin(req.user.id);
  }

  @Get('wheel-config')
  async getWheelConfig() {
    return this.spinService.getWheelConfig();
  }

  @Post('spin')
  async spin(@Req() req) {
    return this.spinService.executeSpin(req.user.id);
  }
}
