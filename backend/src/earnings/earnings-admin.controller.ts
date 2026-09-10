import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { EarningsService } from './earnings.service';

/**
 * Admin earnings operations: revenue-share agreements, payout processing
 * with mandatory reasons, manual adjustments, and investigation queries.
 * Every mutating action lands in the audit trail.
 */
@Controller('earnings/admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class EarningsAdminController {
  constructor(private readonly earnings: EarningsService) {}

  /* ── agreements ── */

  @Get('agreements/:userId')
  async getAgreement(@Param('userId') userId: string) {
    return this.earnings.getMyAgreement(userId);
  }

  @Put('agreements/:userId')
  async updateAgreement(
    @Req() req: any,
    @Param('userId') userId: string,
    @Body()
    body: { tier?: 'STANDARD' | 'FOUNDING'; creatorSharePct?: number; notes?: string },
  ) {
    return this.earnings.updateAgreement(req.user.id as string, userId, body);
  }

  /* ── adjustments ── */

  @Post('adjustments')
  async createAdjustment(
    @Req() req: any,
    @Body()
    body: { creatorId: string; amountMinor: number; reason: string; relatedTransactionId?: string },
  ) {
    const created = await this.earnings.createAdjustment(req.user.id as string, {
      creatorId: body.creatorId,
      amountMinor: Number(body.amountMinor),
      reason: body.reason,
      relatedTransactionId: body.relatedTransactionId,
    });
    return { id: created.id, publicId: created.publicId };
  }

  /* ── payouts ── */

  @Get('payouts')
  async listPayouts(@Query('status') status?: string) {
    return this.earnings.listAdminPayouts(status);
  }

  /** Reveal decrypted payout details for a manual transfer (audited). */
  @Get('payouts/:id/details')
  async revealDetails(@Req() req: any, @Param('id') id: string) {
    return this.earnings.revealPayoutDetails(req.user.id as string, id);
  }

  /** REQUESTED/UNDER_REVIEW → approve=true moves to PROCESSING, false REJECTS. */
  @Post('payouts/:id/review')
  async review(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { approve: boolean; reason?: string; adminNote?: string },
  ) {
    return this.earnings.transitionPayout(
      req.user.id as string,
      id,
      body.approve ? 'approve' : 'reject',
      { reason: body.reason, adminNote: body.adminNote },
    );
  }

  @Post('payouts/:id/mark-paid')
  async markPaid(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { adminNote?: string; externalReference?: string },
  ) {
    return this.earnings.transitionPayout(req.user.id as string, id, 'mark-paid', body);
  }

  @Post('payouts/:id/fail')
  async fail(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.earnings.transitionPayout(req.user.id as string, id, 'fail', {
      reason: body.reason,
    });
  }

  @Post('payouts/:id/cancel')
  async cancel(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.earnings.transitionPayout(req.user.id as string, id, 'cancel', {
      reason: body.reason,
    });
  }

  /* ── investigation ── */

  @Get('creators/:userId/ledger')
  async creatorLedger(@Param('userId') userId: string) {
    return this.earnings.getAdminCreatorLedger(userId);
  }

  @Get('audit')
  async audit(
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
  ) {
    return this.earnings.listAudit(entityType, entityId);
  }
}
