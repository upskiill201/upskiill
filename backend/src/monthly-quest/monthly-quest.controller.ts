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
import { MonthlyQuestService } from './monthly-quest.service';
import { MilestoneParamsDto } from './dto/milestone-params.dto';
import { parseTimezoneOffset } from '../common/utils/parse-timezone-offset';

@UseGuards(AuthGuard('jwt'))
@Controller(['monthly-quest', 'v2/monthly-quest'])
export class MonthlyQuestController {
  constructor(private readonly monthlyQuestService: MonthlyQuestService) {}

  /**
   * GET /api/monthly-quest/current & GET /api/v2/monthly-quest/current
   * Returns this month's quest for the authenticated user (lazy creates the
   * row and runs catch-up evaluation, so missed listener events never lose
   * progress).
   */
  @Get('current')
  async getCurrentQuest(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    return this.monthlyQuestService.getCurrentQuest(
      req.user.id as string,
      parseTimezoneOffset(timezoneOffset),
    );
  }

  /**
   * GET /api/monthly-quest/history & GET /api/v2/monthly-quest/history
   * Past months for the quests page history section.
   */
  @Get('history')
  async getHistory(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    return this.monthlyQuestService.getHistory(
      req.user.id as string,
      parseTimezoneOffset(timezoneOffset),
    );
  }

  /**
   * POST /api/monthly-quest/:milestoneId/claim & POST /api/v2/monthly-quest/:milestoneId/claim
   * Atomically claims a milestone reward. Optional ?month=YYYY-MM claims
   * against a past month's still-unclaimed milestone.
   */
  @Post(':milestoneId/claim')
  async claimMilestone(
    @Req() req: any,
    @Param() params: MilestoneParamsDto,
    @Query('timezoneOffset') timezoneOffset?: string,
    @Query('month') month?: string,
  ) {
    return this.monthlyQuestService.claimMilestone(
      req.user.id as string,
      params.milestoneId,
      parseTimezoneOffset(timezoneOffset),
      month,
    );
  }
}
