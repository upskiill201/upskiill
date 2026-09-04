import {
  Body,
  Controller,
  Get,
  Header,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { LearnerStateService } from './state/learner-state.service';
import { TeyTimezoneService } from './state/timezone.service';

export class UpdateTimezoneDto {
  /** IANA zone from Intl.DateTimeFormat().resolvedOptions().timeZone. */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  timezone?: string;

  @IsOptional()
  @Type(() => Number)
  timezoneOffsetMinutes?: number;
}

interface AuthedUser {
  id: string;
  timezone?: string | null;
  timezoneOffsetMinutes?: number | null;
}

@Controller('tey')
@UseGuards(AuthGuard('jwt'))
export class TeyController {
  constructor(
    private readonly learnerState: LearnerStateService,
    private readonly timezone: TeyTimezoneService,
  ) {}

  /**
   * The learner's current state as Tey sees it.
   *
   * Reading this also re-plans, which is what lets the system self-heal after a
   * dropped in-process event: the next time the learner opens the app, their
   * projection is rebuilt from source tables.
   *
   * `teyState` is not returned yet -- that arrives with TeyContext in the
   * decision-engine phase.
   */
  @Get('me/state')
  @Header('Cache-Control', 'no-store')
  async myState(@GetUser() user: AuthedUser) {
    const state = await this.learnerState.get(user.id);
    return { state };
  }

  /** Explicit timezone capture, used on app boot. */
  @Patch('me/timezone')
  async updateTimezone(
    @GetUser() user: AuthedUser,
    @Body() dto: UpdateTimezoneDto,
  ) {
    await this.timezone.capture(user.id, dto, user);
    return { success: true };
  }
}
