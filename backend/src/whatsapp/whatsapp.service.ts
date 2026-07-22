import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Twilio from 'twilio';

// ─── OTP Store Entry ─────────────────────────────────────────────────────────
interface OtpEntry {
  code: string;
  expiresAt: number; // Unix ms timestamp
}

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  /** In-memory OTP store with TTL. In production, replace with Redis. */
  private otpStore = new Map<string, OtpEntry>();

  /** Twilio client — only initialised when env vars are present. */
  private readonly twilioClient: ReturnType<typeof Twilio> | null;
  private readonly fromNumber: string;

  constructor(private prisma: PrismaService) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886';

    if (sid && token) {
      this.twilioClient = Twilio(sid, token);
      this.logger.log('[WhatsApp] Twilio client initialised ✅');
    } else {
      this.twilioClient = null;
      this.logger.warn('[WhatsApp] Twilio credentials not set — running in MOCK mode 🔶');
    }
  }

  // ─── Send OTP ──────────────────────────────────────────────────────────────

  async sendOtp(rawPhone: string) {
    if (!rawPhone) {
      throw new BadRequestException('Phone number is required.');
    }

    // Normalise to E.164 (strip everything except digits and leading +)
    const phone = this.normalisePhone(rawPhone);

    // Generate a 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store with a 10-minute TTL
    this.otpStore.set(phone, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    if (this.twilioClient) {
      // ── Real WhatsApp message via Twilio ──
      try {
        await this.twilioClient.messages.create({
          from: this.fromNumber,
          to: `whatsapp:${phone}`,
          body: this.buildOtpMessage(code),
        });
        this.logger.log(`[WhatsApp] OTP sent to ${phone} via Twilio ✅`);
      } catch (err: any) {
        this.logger.error(`[WhatsApp] Twilio send failed for ${phone}: ${err?.message}`);
        // Don't throw — fall through so the UI still transitions to OTP entry.
        // The user can request a resend.
      }
    } else {
      // ── Mock mode (no Twilio credentials) ──
      this.logger.log(`[WhatsApp MOCK] OTP for ${phone} is: ${code}`);
    }

    return {
      success: true,
      message: this.twilioClient
        ? 'OTP sent to your WhatsApp number.'
        : 'OTP generated (mock mode — check server logs).',
    };
  }

  // ─── Verify OTP ────────────────────────────────────────────────────────────

  async verifyOtp(rawPhone: string, code: string, userId: string) {
    if (!rawPhone || !code) {
      throw new BadRequestException('Phone number and OTP code are required.');
    }

    const phone = this.normalisePhone(rawPhone);
    const entry = this.otpStore.get(phone);

    if (!entry) {
      throw new BadRequestException('No OTP found for this number. Please request a new one.');
    }

    if (Date.now() > entry.expiresAt) {
      this.otpStore.delete(phone);
      throw new BadRequestException('OTP has expired. Please request a new one.');
    }

    if (entry.code !== code) {
      throw new BadRequestException('Incorrect OTP code. Please try again.');
    }

    // ✅ OTP matched — clear it
    this.otpStore.delete(phone);
    this.logger.log(`[WhatsApp] OTP verified for ${phone} ✅`);

    // ── Persist verified number to the User record ──
    if (userId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          whatsappPhone: phone,
          whatsappVerified: true,
        },
      });

      // Also save to the onboarding session answers if one exists
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

    return {
      success: true,
      message: 'WhatsApp number verified successfully.',
      phone,
    };
  }

  // ─── Private Helpers ────────────────────────────────────────────────────────

  /**
   * Normalise any phone string to E.164 format (e.g. +2347012345678).
   * Keeps a leading + if present; otherwise prepends it.
   */
  private normalisePhone(raw: string): string {
    const digits = raw.replace(/[^\d+]/g, '');
    return digits.startsWith('+') ? digits : `+${digits}`;
  }

  /** Tey-branded OTP message sent via WhatsApp. */
  private buildOtpMessage(code: string, expiryMinutes = 10): string {
    return (
      `💙 Hey, I'm Tey!\n\n` +
      `I brought your login code:\n\n` +
      `🔐 *${code}*\n\n` +
      `Use it within ${expiryMinutes} minutes so we can get back to making learning dangerously fun. 😏\n\n` +
      `Didn't ask for this? You can safely ignore this message.`
    );
  }
}
