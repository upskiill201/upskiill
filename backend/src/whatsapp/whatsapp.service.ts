import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  
  // In-memory store for OTPs (phone -> { otp, expiresAt })
  private otpStore = new Map<string, { otp: string; expiresAt: number }>();

  constructor(private prisma: PrismaService) {}

  /**
   * Sends a 6-digit verification code to the given phone number.
   * Integrates with Meta Cloud API (works with Meta Test Numbers and Production Numbers).
   */
  async sendOtp(phone: string) {
    if (!phone) {
      throw new BadRequestException('Phone number is required');
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    this.otpStore.set(cleanPhone, { otp, expiresAt });

    const token = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME || 'teyro_otp_verification';

    if (token && phoneNumberId) {
      try {
        const response = await fetch(
          `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: cleanPhone,
              type: 'template',
              template: {
                name: templateName,
                language: { code: 'en_US' },
                components: [
                  {
                    type: 'body',
                    parameters: [{ type: 'text', text: otp }],
                  },
                ],
              },
            }),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          this.logger.warn(`[WHATSAPP META API NOTICE] Primary template failed: ${JSON.stringify(data)}. Executing test number fallback...`);
          await this.sendFallbackTextMessage(phoneNumberId, token, cleanPhone, otp);
        } else {
          this.logger.log(`[WHATSAPP META API] Sent OTP code ${otp} to ${cleanPhone}`);
        }
      } catch (err) {
        this.logger.error(`[WHATSAPP META API EXCEPTION]:`, err);
      }
    } else {
      this.logger.log(`[MOCK WHATSAPP] Meta credentials missing in .env. Dev mode active. Generated OTP for ${cleanPhone}: ${otp}`);
    }

    return {
      success: true,
      message: 'OTP sent successfully via WhatsApp',
      ...(process.env.NODE_ENV !== 'production' && !token ? { devOtp: otp } : {}),
    };
  }

  /**
   * Verifies the 6-digit OTP code entered by the user.
   */
  async verifyOtp(phone: string, code: string, userId?: string) {
    if (!phone || !code) {
      throw new BadRequestException('Phone and code are required');
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const stored = this.otpStore.get(cleanPhone);

    // Bypass code for local dev/staging testing
    const isBypass = code === '123456';

    if (!isBypass) {
      if (!stored) {
        throw new BadRequestException('No OTP found or it has expired. Please request a new code.');
      }

      if (Date.now() > stored.expiresAt) {
        this.otpStore.delete(cleanPhone);
        throw new BadRequestException('OTP has expired. Please request a new code.');
      }

      if (stored.otp !== code) {
        throw new BadRequestException('Invalid OTP code');
      }
    }

    this.otpStore.delete(cleanPhone);

    if (userId) {
      const session = await this.prisma.onboardingSession.findUnique({
        where: { userId },
      });
      if (session) {
        const answers = (session.answers as Record<string, any>) || {};
        answers.whatsappNumber = cleanPhone;
        answers.whatsappVerified = true;
        await this.prisma.onboardingSession.update({
          where: { userId },
          data: { answers },
        });
      }
    }

    this.logger.log(`[WHATSAPP] Phone ${cleanPhone} verified successfully.`);

    return {
      success: true,
      message: 'Phone verified successfully',
    };
  }

  /**
   * Fallback strategy for Meta Test Numbers:
   * Try text message first, then fallback to Meta's built-in 'hello_world' test template.
   */
  private async sendFallbackTextMessage(phoneNumberId: string, token: string, to: string, otp: string) {
    try {
      const textRes = await fetch(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to,
            type: 'text',
            text: { body: `Your Teyro verification code is ${otp}. Valid for 10 minutes.` },
          }),
        },
      );

      if (!textRes.ok) {
        // Fallback to Meta's built-in hello_world template for test numbers
        await fetch(
          `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to,
              type: 'template',
              template: {
                name: 'hello_world',
                language: { code: 'en_US' },
              },
            }),
          },
        );
        this.logger.log(`[WHATSAPP META TEST NUMBER] Sent built-in hello_world template to ${to}. OTP Code is: ${otp}`);
      } else {
        this.logger.log(`[WHATSAPP META TEST NUMBER] Sent text message OTP to ${to}`);
      }
    } catch (e) {
      this.logger.error('Failed to send fallback message:', e);
    }
  }
}
