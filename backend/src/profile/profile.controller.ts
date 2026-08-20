import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUser } from '../auth/decorator/get-user.decorator';
import type { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * GET /profile/me
   * Returns the authenticated creator's full profile (User + Profile join).
   */
  @Get('me')
  getMyProfile(@GetUser() user: User) {
    return this.profileService.getMyProfile(user.id);
  }

  /**
   * GET /profile/check-username/:username
   * Checks if a creator handle is valid and available.
   */
  @Get('check-username/:username')
  checkUsername(@GetUser() user: User, @Param('username') username: string) {
    return this.profileService.checkUsernameAvailability(username, user.id);
  }

  /**
   * PATCH /profile/me
   * Updates any profile field. Handles both User.fullName and Profile fields.
   */
  @Patch('me')
  updateMyProfile(@GetUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateMyProfile(user.id, dto);
  }

  /**
   * DELETE /profile/me
   * Permanently deletes the user account and all related data (cascade).
   * Requires explicit confirmation from the frontend before calling.
   */
  @HttpCode(HttpStatus.OK)
  @Delete('me')
  deleteMyAccount(@GetUser() user: User) {
    return this.profileService.deleteMyAccount(user.id);
  }
}
