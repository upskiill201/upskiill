import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CommunityAdminService, MUTE_DAYS } from './community-admin.service';

class MuteMemberDto {
  /** 1, 7 or 30 days; null lifts the mute. */
  @IsOptional()
  @IsIn([...MUTE_DAYS, null])
  days!: number | null;
}

class UpdateCommunityDto {
  @IsString()
  @MaxLength(600)
  description!: string;
}

/**
 * The creator studio's community admin. Every route also checks, per
 * community, that the caller is its creator (or a platform admin).
 */
@Controller('communities')
@Roles(Role.INSTRUCTOR, Role.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CommunityAdminController {
  constructor(private readonly admin: CommunityAdminService) {}

  @Get('manage')
  listManaged(@Req() req: any) {
    return this.admin.listManaged(req.user.id as string);
  }

  @Get(':id/manage/posts')
  queue(@Req() req: any, @Param('id') id: string, @Query('tab') tab?: string, @Query('page') page?: string) {
    return this.admin.queue(req.user, id, tab ?? 'questions', page ? Number(page) || 1 : 1);
  }

  @Get(':id/manage/members')
  members(
    @Req() req: any,
    @Param('id') id: string,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
    @Query('page') page?: string,
  ) {
    return this.admin.members(req.user, id, { search, filter, page: page ? Number(page) || 1 : 1 });
  }

  @Post(':id/members/:userId/mute')
  mute(@Req() req: any, @Param('id') id: string, @Param('userId') userId: string, @Body() body: MuteMemberDto) {
    return this.admin.mute(req.user, id, userId, body.days ?? null);
  }

  @Patch(':id/manage')
  update(@Req() req: any, @Param('id') id: string, @Body() body: UpdateCommunityDto) {
    return this.admin.update(req.user, id, body.description);
  }
}
