import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MissionsService } from './missions.service';

@UseGuards(AuthGuard('jwt'))
@Controller(['missions', 'v2/missions'])
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  /**
   * GET /api/missions/today & GET /api/v2/missions/today
   * Returns current daily mission set for authenticated user (lazy generates if missing)
   */
  @Get('today')
  async getTodayMissions(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const offset = timezoneOffset ? parseInt(timezoneOffset, 10) : 0;
    return this.missionsService.getTodayMissions(req.user.id as string, offset);
  }

  /**
   * POST /api/missions/:missionId/claim & POST /api/v2/missions/:missionId/claim
   * Atomically claims mission rewards for a completed mission.
   */
  @Post(':missionId/claim')
  async claimMissionReward(
    @Req() req: any,
    @Param('missionId') missionId: string,
  ) {
    return this.missionsService.claimMissionReward(
      req.user.id as string,
      missionId,
    );
  }
}
