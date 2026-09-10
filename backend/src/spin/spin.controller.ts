import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { SpinService } from './spin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('v2/spin')
export class SpinController {
  constructor(private readonly spinService: SpinService) {}

  @Get('wheel-config')
  async getWheelConfig() {
    return this.spinService.getWheelConfig();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('current-week')
  async getCurrentWeek(@Req() req) {
    return this.spinService.getCurrentWeekSpin(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('spin')
  async spin(@Req() req) {
    return this.spinService.executeSpin(req.user.id);
  }
}
