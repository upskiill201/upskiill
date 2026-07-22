import { Controller, Get, Post, Body, Query, Res, Req, Logger } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
  private readonly logger = new Logger(WhatsappController.name);

  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send-otp')
  async sendOtp(@Body('phone') phone: string) {
    return this.whatsappService.sendOtp(phone);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('phone') phone: string,
    @Body('code') code: string,
    @Body('userId') userId?: string,
    @Req() req?: any,
  ) {
    const effectiveUserId = userId || req?.user?.id;
    return this.whatsappService.verifyOtp(phone, code, effectiveUserId);
  }

  /**
   * GET /api/whatsapp/webhook
   * Meta Webhook Verification Endpoint.
   * Responds with hub.challenge when hub.verify_token matches.
   */
  @Get('webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: any,
  ) {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'teyro_whatsapp_secret_token_2026';
    if (mode === 'subscribe' && token === verifyToken) {
      this.logger.log('[WHATSAPP WEBHOOK VERIFIED] Meta webhook verified successfully.');
      return res.status(200).send(challenge);
    }
    this.logger.warn(`[WHATSAPP WEBHOOK VERIFY FAILED] Mismatched verify token or mode. Received: ${token}`);
    return res.status(403).send('Forbidden');
  }

  /**
   * POST /api/whatsapp/webhook
   * Receives incoming WhatsApp messages & status updates from Meta.
   */
  @Post('webhook')
  handleWebhook(@Body() body: any) {
    this.logger.log(`[WHATSAPP INCOMING EVENT]: ${JSON.stringify(body)}`);
    return { status: 'EVENT_RECEIVED' };
  }
}
