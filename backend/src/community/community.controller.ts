import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommunityService } from './community.service';

@UseGuards(AuthGuard('jwt'))
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

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
   * GET /communities/my — every community the caller belongs to in a single
   * lightweight payload. Powers the feed rail + communities index without the
   * N+1 overview calls.
   */
  @Get('my')
  async getMyCommunities(@Req() req: any) {
    return this.communityService.getMyCommunities(req.user.id as string);
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
