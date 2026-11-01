import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { IsIn, IsOptional } from 'class-validator';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { REPORT_REASONS, type ReportReason } from './avatar.constants';
import { AvatarService } from './avatar.service';

class ReportPhotoDto {
  @IsOptional() @IsIn(REPORT_REASONS as unknown as string[]) reason?: ReportReason;
}

/**
 * Teyro HQ → Photos. The class-level @Roles is load-bearing: RolesGuard
 * returns TRUE when no @Roles metadata is present (see network-admin).
 */
@Controller('avatar/admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class AvatarAdminController {
  constructor(private readonly avatars: AvatarService) {}

  @Get('reports')
  reports() {
    return this.avatars.adminReports();
  }

  @Post(':userId/remove')
  remove(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.avatars.adminRemove(userId);
  }

  @Post(':userId/dismiss')
  dismiss(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.avatars.adminDismiss(userId);
  }
}

/**
 * Profile photos. Unversioned at root to match the live API's layout
 * (CLAUDE.md §5); the frontend reaches it as /api/avatar/*.
 */
@UseGuards(AuthGuard('jwt'))
@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatars: AvatarService) {}

  /** Has the one-time photo thank-you been paid? */
  @Get('photo-reward')
  async photoReward(@Req() req: any) {
    return { claimed: await this.avatars.photoRewardClaimed(req.user.id as string) };
  }

  /** Pays the one-time Coins if they now show a real photo. Idempotent. */
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('photo-reward')
  claim(@Req() req: any) {
    return this.avatars.claimPhotoReward(req.user.id as string);
  }

  @Throttle({ default: { limit: 20, ttl: 3_600_000 } })
  @Post('report/:userId')
  report(@Req() req: any, @Param('userId', ParseUUIDPipe) userId: string, @Body() dto: ReportPhotoDto) {
    return this.avatars.report(req.user.id as string, userId, dto.reason);
  }
}
