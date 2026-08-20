import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import type { User } from '@prisma/client';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * GET /profile/creator/:identifier
   * Public endpoint to view a creator's public profile, stats, and courses.
   */
  @Get('creator/:identifier')
  async getCreatorProfile(@Param('identifier') identifier: string, @Req() req: any) {
    // Optional viewer id from token if attached
    const viewerId = req.user?.id;
    return this.profileService.getPublicCreatorProfile(identifier, viewerId);
  }

  /**
   * GET /profile/public/:identifier
   * Alias for public profile lookup.
   */
  @Get('public/:identifier')
  async getPublicProfile(@Param('identifier') identifier: string, @Req() req: any) {
    const viewerId = req.user?.id;
    return this.profileService.getPublicCreatorProfile(identifier, viewerId);
  }

  /**
   * POST /profile/follow/:creatorId
   * Toggle follow/unfollow a creator (protected).
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('follow/:creatorId')
  async toggleFollow(@GetUser() user: User, @Param('creatorId') creatorId: string) {
    return this.profileService.toggleFollow(creatorId, user.id);
  }

  /**
   * GET /profile/me
   * Returns the authenticated creator's full profile (User + Profile join).
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMyProfile(@GetUser() user: User) {
    return this.profileService.getMyProfile(user.id);
  }

  /**
   * GET /profile/check-username/:username
   * Checks if a creator handle is valid and available.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('check-username/:username')
  checkUsername(@GetUser() user: User, @Param('username') username: string) {
    return this.profileService.checkUsernameAvailability(username, user.id);
  }

  /**
   * PATCH /profile/me
   * Updates any profile field. Handles both User.fullName and Profile fields.
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('me')
  updateMyProfile(@GetUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateMyProfile(user.id, dto);
  }

  /**
   * DELETE /profile/me
   * Permanently deletes the user account and all related data (cascade).
   */
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Delete('me')
  deleteMyAccount(@GetUser() user: User) {
    return this.profileService.deleteMyAccount(user.id);
  }
}

