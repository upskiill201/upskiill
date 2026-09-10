import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommunityService, type LeaderboardWindow } from './community.service';
import { PostService } from './post.service';

@UseGuards(AuthGuard('jwt'))
@Controller('communities')
export class CommunityController {
  constructor(
    private readonly communityService: CommunityService,
    private readonly postService: PostService,
  ) {}

  /**
   * GET /communities/course/:courseId — community landing payload
   * (identity, stats, my role, members preview). Visiting also lazily seats
   * eligible learners who enrolled before this feature existed.
   */
  @Get('course/:courseId')
  async getCommunityByCourse(@Req() req: any, @Param('courseId') courseId: string) {
    const community = await this.communityService.getCommunityByCourseId(courseId);
    return this.communityService.getOverview(community.id, req.user.id as string, req.user.role);
  }

  /**
   * GET /communities/course/:courseId/bootstrap — everything the community
   * page needs to paint, in ONE request.
   *
   * The old page did overview → posts → leaderboard as three sequential
   * fetches, and each one re-resolved the community and re-ran the access
   * check first. Against a far-away Supabase that stacked up to seconds of
   * pure waterfall before a single post appeared. Here the community is
   * resolved once and the three payloads are built in parallel.
   */
  @Get('course/:courseId/bootstrap')
  async bootstrap(
    @Req() req: any,
    @Param('courseId') courseId: string,
    @Query('sort') sort?: 'new' | 'top' | 'unanswered',
    @Query('type') type?: string,
    @Query('lessonId') lessonId?: string,
  ) {
    const userId = req.user.id as string;
    const role = req.user.role as string | undefined;
    const community = await this.communityService.getCommunityByCourseId(courseId);

    const [overview, posts, leaderboard] = await Promise.all([
      this.communityService.getOverview(community.id, userId, role),
      this.postService.listPosts(
        community.id,
        { id: userId, role },
        { sort, postType: type, lessonId, skipAccessCheck: true },
      ),
      // Rail preview only — the full three-window bundle loads when the
      // learner actually opens the Leaderboards tab.
      this.communityService
        .getLeaderboard(community.id, userId, { window: '30d', limit: 5 })
        .catch(() => null),
    ]);

    return { community: overview, posts, leaderboard };
  }

  /**
   * GET /communities/my — every community the caller belongs to in a single
   * lightweight payload. Powers the feed rail + communities index without the
   * N+1 overview calls.
   */
  @Get('my')
  async getMyCommunities(@Req() req: any) {
    return this.communityService.getMyCommunities(req.user.id as string);
  }

  /**
   * GET /communities/:id/leaderboards — the full Leaderboards tab: 7-day,
   * 30-day and all-time boards plus the caller's level card.
   */
  @Get(':id/leaderboards')
  async getLeaderboards(@Req() req: any, @Param('id') communityId: string) {
    return this.communityService.getLeaderboardBundle(
      communityId,
      req.user.id as string,
      req.user.role,
    );
  }

  /** GET /communities/:id/leaderboard?window=7d|30d|all — a single board. */
  @Get(':id/leaderboard')
  async getLeaderboard(
    @Req() req: any,
    @Param('id') communityId: string,
    @Query('window') window?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user.id as string;
    await this.communityService.assertMember(communityId, userId, req.user.role);
    const parsed: LeaderboardWindow =
      window === '7d' || window === 'all' ? window : '30d';
    return this.communityService.getLeaderboard(communityId, userId, {
      window: parsed,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  /**
   * GET /communities/:id/members?page=&pageSize=&q= — also powers the
   * composer's @mention autocomplete.
   */
  @Get(':id/members')
  async getMembers(
    @Req() req: any,
    @Param('id') communityId: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('q') q?: string,
  ) {
    return this.communityService.getMembers(communityId, {
      page: page ? parseInt(page, 10) : undefined,
      pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      q,
    });
  }
}
