import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Headers,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import type { Request, Response } from 'express';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { OptionalJwtAuthGuard } from '../auth/guard/optional-jwt-auth.guard';
import { WhatsappService } from './whatsapp.service';
import { WhatsappWebhookService } from './whatsapp-webhook.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

/**
 * WhatsApp verification endpoints.
 *
 * send-otp / verify-otp use OPTIONAL auth: onboarding users verify at Step 6,
 * before Google sign-in creates their account at Step 12. When authenticated
 * (returning users, profile settings), verification binds straight to the
 * account; anonymous successes are stamped server-side and reconciled later.
 * Per-phone cooldowns/caps + IP throttling contain abuse.
 *
 * status / qr-page / reset are operator-only: `reset` logs the whole platform's
 * WhatsApp session out, so it must never be publicly reachable.
 */
@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly webhookService: WhatsappWebhookService,
  ) {}

  /** OTP delivery is the abuse magnet — tightened per-IP on top of per-phone DB limits. */
  @Post('send-otp')
  @UseGuards(OptionalJwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async sendOtp(@Body() dto: SendOtpDto, @GetUser('id') userId: string | null) {
    return this.whatsappService.sendOtp(userId, dto.phone);
  }

  @Post('verify-otp')
  @UseGuards(OptionalJwtAuthGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async verifyOtp(
    @Body() dto: VerifyOtpDto,
    @GetUser('id') userId: string | null,
  ) {
    return this.whatsappService.verifyOtp(dto.phone, dto.code, userId);
  }

  @Get('status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async getStatus() {
    return this.whatsappService.getStatus();
  }

  @Get('qr-page')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Header('Content-Type', 'text/html')
  async getQrPage() {
    return this.whatsappService.getQrPageHtml();
  }

  @Get('reset')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async resetConnection() {
    return this.whatsappService.resetConnection();
  }

  // ─── Meta Cloud API webhook ─────────────────────────────────────────────────
  // Public: Meta can't authenticate as a Teyro user. GET is Meta's one-time
  // verification handshake; POST is signature-gated instead of guarded.

  @Get('webhook')
  handleWebhookVerification(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') verifyToken: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    const expected = process.env.META_WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    if (mode === 'subscribe' && expected && verifyToken === expected) {
      res.status(200).send(challenge);
      return;
    }
    res.status(403).send('Forbidden');
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhookEvent(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('x-hub-signature-256') signature: string | undefined,
  ) {
    // The HMAC must verify against the EXACT bytes Meta signed — rawBody:
    // true (main.ts) keeps them on req.rawBody while req.body is parsed.
    const rawBody = req.rawBody ?? Buffer.from(JSON.stringify(req.body));
    this.webhookService.verifySignature(rawBody, signature);

    if (req.body) {
      await this.webhookService.handleWebhookPayload(req.body);
    }
    return { received: true };
  }
}
