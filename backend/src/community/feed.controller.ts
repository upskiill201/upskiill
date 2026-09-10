import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedService } from './feed.service';
import type { FeedType } from './feed.service';

@UseGuards(AuthGuard('jwt'))
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  /**
   * GET /feed?page=&pageSize=&type=all|question|win|announcement
   * Personalized discovery layer across the learner's communities.
   */
  @Get()
  async getFeed(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('type') type?: FeedType,
  ) {
    return this.feedService.getFeed(
      { id: req.user.id as string, role: req.user.role },
      {
        page: page ? parseInt(page, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
        type,
      },
    );
  }

  /** GET /feed/discover — rule-based recommended learning cards (no AI). */
  @Get('discover')
  async getDiscover(@Req() req: any) {
    return this.feedService.getDiscover({ id: req.user.id as string });
  }
}
