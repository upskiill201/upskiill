import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { EarningsService } from './earnings.service';

/**
 * Creator-facing earnings API. Every route requires a session and every
 * query is scoped to req.user.id — a creator can only ever see their own
 * money. Payout-method details are returned MASKED ONLY; decryption exists
 * exclusively on the audited admin path. INSTRUCTOR/ADMIN-only: students
 * have no business touching payout endpoints.
 */
@Controller('earnings')
@Roles(Role.INSTRUCTOR, Role.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EarningsController {
  constructor(private readonly earnings: EarningsService) {}

  @Get('summary')
  async getSummary(@Req() req: any) {
    return this.earnings.getMySummary(req.user.id as string);
  }

  @Get('trend')
  async getTrend(
    @Req() req: any,
    @Query('granularity') granularity?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const g =
      granularity === 'day' || granularity === 'week' || granularity === 'year'
        ? granularity
        : 'month';
    return this.earnings.getTrend(
      req.user.id as string,
      g,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  @Get('by-course')
  async getByCourse(
    @Req() req: any,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.earnings.getByCourse(
      req.user.id as string,
      from ? new Date(from) : undefined,
      to ? new Date(to) : undefined,
    );
  }

  @Get('transactions')
  async listTransactions(
    @Req() req: any,
    @Query('type') type?: string,
    @Query('courseId') courseId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.earnings.listTransactions(req.user.id as string, {
      type,
      courseId,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
    });
  }

  /* ── payouts ── */

  @Post('payouts')
  async requestPayout(@Req() req: any, @Body('amountMinor') amountMinor: number) {
    const amount = Number(amountMinor);
    const payout = await this.earnings.requestPayout(req.user.id as string, amount);
    return { id: payout.id, publicId: payout.publicId, status: payout.status };
  }

  @Get('payouts')
  async listPayouts(@Req() req: any) {
    return this.earnings.listMyPayouts(req.user.id as string);
  }

  @Post('payouts/:id/cancel')
  async cancelOwnPayout(@Req() req: any, @Param('id') id: string) {
    return this.earnings.cancelOwnPayout(req.user.id as string, id);
  }

  /* ── payout method ── */

  @Get('payout-method')
  async getPayoutMethod(@Req() req: any) {
    return this.earnings.getMyPayoutMethod(req.user.id as string);
  }

  @Put('payout-method')
  async savePayoutMethod(
    @Req() req: any,
    @Body()
    body: {
      type: 'BANK' | 'MOBILE_MONEY';
      holderName: string;
      accountNumber: string;
      institutionName?: string;
      country?: string;
      receivingCurrency?: string;
    },
  ) {
    return this.earnings.savePayoutMethod(req.user.id as string, body);
  }

  /* ── reports (CSV downloads) ── */

  private sendCsv(res: Response, csv: string, filename: string) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  }

  @Get('reports/transactions.csv')
  async transactionsCsv(
    @Req() req: any,
    @Res() res: Response,
    @Query('type') type?: string,
    @Query('courseId') courseId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const report = await this.earnings.buildTransactionsCsv(req.user.id as string, {
      type,
      courseId,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    });
    this.sendCsv(res, report.csv, report.filename);
  }

  @Get('reports/earnings.csv')
  async earningsCsv(
    @Req() req: any,
    @Res() res: Response,
    @Query('granularity') granularity?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('courseId') courseId?: string,
  ) {
    const g =
      granularity === 'day' || granularity === 'week' || granularity === 'year'
        ? granularity
        : 'month';
    const report = await this.earnings.buildEarningsReportCsv(req.user.id as string, {
      granularity: g,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
      courseId,
    });
    this.sendCsv(res, report.csv, report.filename);
  }

  @Get('reports/statement.csv')
  async statementCsv(
    @Req() req: any,
    @Res() res: Response,
    @Query('month') month?: string,
  ) {
    const report = await this.earnings.buildStatementCsv(
      req.user.id as string,
      month ?? '',
    );
    this.sendCsv(res, report.csv, report.filename);
  }
}
