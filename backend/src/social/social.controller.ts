import { Controller, Get, Post, Delete, Param, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SocialService } from "./social.service";

@UseGuards(AuthGuard("jwt"))
@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  /**
   * GET /social/users/:id — a learner's public profile card.
   */
  @Get("users/:id")
  async getLearnerProfile(@Req() req: any, @Param("id") targetUserId: string) {
    return this.socialService.getLearnerProfile(targetUserId, req.user.id as string);
  }

  /**
   * POST /social/follow/:id
   */
  @Post("follow/:id")
  async followUser(@Req() req: any, @Param("id") targetUserId: string) {
    return this.socialService.followUser(req.user.id as string, targetUserId);
  }

  /**
   * DELETE /social/unfollow/:id
   */
  @Delete("unfollow/:id")
  async unfollowUser(@Req() req: any, @Param("id") targetUserId: string) {
    return this.socialService.unfollowUser(req.user.id as string, targetUserId);
  }

  /**
   * GET /social/counts
   */
  @Get("counts")
  async getMyCounts(@Req() req: any) {
    return this.socialService.getSocialCounts(req.user.id as string);
  }

  /**
   * GET /social/followers
   */
  @Get("followers")
  async getMyFollowers(@Req() req: any) {
    return this.socialService.getFollowers(req.user.id as string, req.user.id as string);
  }

  /**
   * GET /social/following
   */
  @Get("following")
  async getMyFollowing(@Req() req: any) {
    return this.socialService.getFollowing(req.user.id as string, req.user.id as string);
  }

  /**
   * GET /social/classmates
   */
  @Get("classmates")
  async getClassmates(@Req() req: any) {
    return this.socialService.getClassmates(req.user.id as string);
  }
}