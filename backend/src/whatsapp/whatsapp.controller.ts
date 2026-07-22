import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('send-otp')
  async sendOtp(@Body('phone') phone: string) {
    return this.whatsappService.sendOtp(phone);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('verify-otp')
  async verifyOtp(
    @Body('phone') phone: string,
    @Body('code') code: string,
    @GetUser('id') userId: string,
  ) {
    return this.whatsappService.verifyOtp(phone, code, userId);
  }

  @Get('status')
  async getStatus() {
    return this.whatsappService.getStatus();
  }
}
