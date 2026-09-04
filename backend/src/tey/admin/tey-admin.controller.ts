import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../../auth/decorator/roles.decorator';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { PrismaService } from '../../prisma/prisma.service';
import {
  TEY_REASONS,
  type TeyReason,
  type TeyTone,
} from '../contracts/tey-context.types';
import { TeyDeliveryService } from '../delivery/tey-delivery.service';
import { resolveLocalNow } from '../state/local-time.util';
import { LearnerStateService } from '../state/learner-state.service';
import { TeyDecisionService } from '../decision/tey-decision.service';
import { TeyAdminService } from './tey-admin.service';

const TONES: readonly TeyTone[] = [
  'CELEBRATORY',
  'ENCOURAGING',
  'WARM_WELCOME',
  'URGENT_PLAYFUL',
  'PLAYFUL_PASSIVE_AGGRESSIVE',
  'NEUTRAL',
];

interface AuthedUser {
  id: string;
}

/**
 * Tey's command center.
 *
 * The class-level @Roles is load-bearing: RolesGuard returns TRUE when no
 * @Roles metadata is present (roles.guard.ts), so a controller that forgets it
 * is open to every logged-in student. A spec asserts this decorator exists.
 */
@Controller('tey/admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class TeyAdminController {
  constructor(
    private readonly admin: TeyAdminService,
    private readonly delivery: TeyDeliveryService,
    private readonly learnerState: LearnerStateService,
    private readonly decision: TeyDecisionService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('overview')
  overview() {
    return this.admin.overview();
  }

  @Get('rules')
  rules() {
    return this.admin.rules();
  }

  @Get('suppressions')
  suppressions() {
    return this.admin.suppressions();
  }

  @Get('deliveries')
  deliveries(
    @Query('page') page?: string,
    @Query('ruleId') ruleId?: string,
    @Query('status') status?: string,
  ) {
    return this.admin.deliveries({
      page: page ? parseInt(page, 10) : 1,
      ruleId,
      status,
    });
  }

  @Get('queue')
  queue(@Query('status') status?: string) {
    return this.admin.queue(status || 'PENDING');
  }

  @Post('queue/:id/cancel')
  cancel(@Param('id') id: string) {
    return this.admin.cancelAction(id);
  }

  @Get('preview')
  preview(@Query('reason') reason?: string, @Query('tone') tone?: string) {
    if (!reason || !TEY_REASONS.includes(reason as TeyReason)) {
      throw new BadRequestException('Unknown reason');
    }
    const resolvedTone = (tone && TONES.includes(tone as TeyTone)
      ? tone
      : 'URGENT_PLAYFUL') as TeyTone;

    return this.admin.preview(reason as TeyReason, resolvedTone);
  }

  @Get('health')
  health() {
    return this.admin.health();
  }

  /**
   * Sends a real notification — to the calling admin, and only to them.
   *
   * The recipient is taken from the session and there is deliberately no way
   * to pass one in. A "send to any user" endpoint behind an admin login is the
   * single most direct route from admin panel to accidental spam cannon, and
   * the convenience is not worth it: an operator can always test on their own
   * account.
   */
  @Post('test-push')
  async testPush(@GetUser() user: AuthedUser) {
    const state = await this.learnerState.project(user.id);
    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      select: { timezone: true, timezoneOffsetMinutes: true },
    });
    const now = resolveLocalNow(dbUser);

    // Build a real context off the admin's own state so the test exercises the
    // same render path a learner would get, rather than a special-case string.
    const check = this.decision.revalidate('STREAK_AT_RISK', state, now);
    const context =
      check.context ??
      this.admin.preview('STREAK_AT_RISK', 'URGENT_PLAYFUL').context;

    const outcome = await this.delivery.deliver(user.id, context, now);
    return {
      ...outcome,
      note: outcome.sent
        ? 'Sent to your own account.'
        : `Not sent: ${outcome.skipReason}. Policy applies to admins too.`,
    };
  }
}
