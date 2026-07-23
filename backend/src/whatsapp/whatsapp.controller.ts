import { Controller, Post, Get, Body, Header, Req } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';

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
    @Req() req: any,
  ) {
    const userId = req?.user?.id;
    return this.whatsappService.verifyOtp(phone, code, userId);
  }

  @Get('status')
  async getStatus() {
    return this.whatsappService.getStatus();
  }

  @Get('qr-page')
  @Header('Content-Type', 'text/html')
  async getQrPage() {
    return this.whatsappService.getQrPageHtml();
  }

  @Get('reset')
  async resetConnection() {
    return this.whatsappService.resetConnection();
  }
}
