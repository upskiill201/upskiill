import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  
  // In-memory store for dev mock (phone -> OTP)
  // In production, use Redis with TTL
  private otpStore = new Map<string, string>();

  constructor(private prisma: PrismaService) {}

  async sendOtp(phone: string) {
    if (!phone) {
      throw new BadRequestException('Phone number is required');
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store it
    this.otpStore.set(phone, otp);

    // Mock sending via WhatsApp
    this.logger.log(`[MOCK WHATSAPP] Sending OTP ${otp} to phone number ${phone}`);

    return {
      success: true,
      message: 'OTP sent successfully (Mock)',
    };
  }

  async verifyOtp(phone: string, code: string, userId: string) {
    if (!phone || !code) {
      throw new BadRequestException('Phone and code are required');
    }

    const storedOtp = this.otpStore.get(phone);

    if (!storedOtp) {
      throw new BadRequestException('No OTP found or it has expired');
    }

    if (storedOtp !== code) {
      throw new BadRequestException('Invalid OTP code');
    }

    // Success! Clear the OTP
    this.otpStore.delete(phone);

    // If userId is provided, we can also update the onboarding session
    if (userId) {
      const session = await this.prisma.onboardingSession.findUnique({
        where: { userId },
      });
      if (session) {
        const answers = (session.answers as Record<string, any>) || {};
        answers.whatsappNumber = phone;
        await this.prisma.onboardingSession.update({
          where: { userId },
          data: { answers },
        });
      }
    }

    this.logger.log(`[MOCK WHATSAPP] OTP Verified successfully for ${phone}`);

    return {
      success: true,
      message: 'Phone verified successfully',
    };
  }
}
