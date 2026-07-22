import { Controller, Post, Body, Req } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
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
}
