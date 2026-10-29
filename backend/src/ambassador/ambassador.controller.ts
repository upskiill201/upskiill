import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AmbassadorService } from './ambassador.service';
import { AmbassadorAdminService } from './ambassador-admin.service';

type AuthedRequest = { user: { id: string } };

class JoinDto {
  @IsOptional()
  @IsIn(['ONBOARDING', 'APP'])
  source?: 'ONBOARDING' | 'APP';
}

class EncourageDto {
  @IsUUID()
  friendId!: string;

  @IsIn(['NUDGE', 'CHEER'])
  kind!: 'NUDGE' | 'CHEER';
}

class SettingsDto {
  @IsOptional() @IsBoolean() enabled?: boolean;
  @IsOptional() @IsInt() friendsForPro?: number;
  @IsOptional() @IsInt() qualifyLessons?: number;
  @IsOptional() @IsInt() qualifyStreak?: number;
  @IsOptional() @IsInt() activeDays?: number;
  @IsOptional() @IsInt() graceDays?: number;
}

class CodeParam {
  @IsString()
  code!: string;
}

/**
 * Teyro HQ → Ambassadors. Declared before the learner controller so
 * /ambassador/admin/* is never read as a learner route. The class-level
 * @Roles is load-bearing: RolesGuard allows everything without it.
 */
@Controller('ambassador/admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class AmbassadorAdminController {
  constructor(private readonly admin: AmbassadorAdminService) {}

  @Get('overview')
  overview() {
    return this.admin.overview();
  }

  @Patch('settings')
  settings(@Req() req: AuthedRequest, @Body() dto: SettingsDto) {
    return this.admin.updateSettings(req.user.id, dto);
  }

  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  @Post('evaluate')
  evaluate() {
    return this.admin.evaluateAll();
  }
}

@Controller('ambassador')
export class AmbassadorController {
  constructor(private readonly ambassadors: AmbassadorService) {}

  /** Public: who sent this invite (the /i/[code] page and its share image). */
  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  @Get('invite/:code')
  invite(@Param() p: CodeParam) {
    return this.ambassadors.invitePreview(p.code);
  }

  /** Is the programme on, and what does it take? (The paywall asks before offering it.) */
  @Get('programme')
  async programme() {
    const r = await this.ambassadors.rules();
    return {
      enabled: r.enabled,
      friendsForPro: r.friendsForPro,
      qualifyLessons: r.qualifyLessons,
      qualifyStreak: r.qualifyStreak,
      activeDays: r.activeDays,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: AuthedRequest) {
    return this.ambassadors.me(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  @Post('join')
  join(@Req() req: AuthedRequest, @Body() dto: JoinDto) {
    return this.ambassadors.join(req.user.id, dto.source ?? 'APP');
  }

  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  @Post('encourage')
  encourage(@Req() req: AuthedRequest, @Body() dto: EncourageDto) {
    return this.ambassadors.encourage(req.user.id, dto.friendId, dto.kind);
  }

  /** The invited friend's side: their inviter, and "learn together" state. */
  @UseGuards(AuthGuard('jwt'))
  @Get('inviter')
  inviter(@Req() req: AuthedRequest) {
    return this.ambassadors.learnWithStatus(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @HttpCode(HttpStatus.OK)
  @Post('learn-with')
  learnWith(@Req() req: AuthedRequest) {
    return this.ambassadors.learnWith(req.user.id);
  }
}
