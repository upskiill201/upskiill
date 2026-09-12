import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessPlan } from '@prisma/client';
import { CouponsService } from './coupons.service';

/**
 * Student-facing coupon validation, called from the /learn/:id/unlock
 * paywall. Speculative/informational only — this is NEVER the source of
 * truth for what gets charged. PaymentService.subscribeCourse() re-runs the
 * identical quote() at charge time and does not trust this earlier call.
 *
 * Requires auth (the unlock flow is already behind login) so this can't be
 * scraped anonymously at scale, but leaks nothing about the owning creator
 * or any other coupon.
 */
@UseGuards(AuthGuard('jwt'))
@Controller('coupons')
export class CouponsPublicController {
  constructor(private readonly coupons: CouponsService) {}

  @Post('validate')
  validate(@Body() body: { courseId: string; plan: AccessPlan; code: string }) {
    return this.coupons.quote({
      courseId: body.courseId,
      plan: body.plan,
      code: body.code,
    });
  }
}
