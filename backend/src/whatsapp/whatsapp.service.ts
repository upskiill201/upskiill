import { Injectable, Logger, BadRequestException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  WASocket,
} from '@whiskeysockets/baileys';
import * as qrcode from 'qrcode-terminal';
import * as path from 'path';
import * as fs from 'fs';

// ─── OTP Store Entry ─────────────────────────────────────────────────────────
interface OtpEntry {
  code: string;
  expiresAt: number; // Unix ms timestamp
}

@Injectable()
export class WhatsappService implements OnModuleInit {
  private readonly logger = new Logger(WhatsappService.name);

  /** In-memory OTP store with TTL. */
  private otpStore = new Map<string, OtpEntry>();

  /** Baileys WASocket instance */
  private sock: WASocket | null = null;
  private isConnected = false;
  private qrCodeStr: string | null = null;

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Initialise Baileys when NestJS module starts
    await this.initBaileys();
  }

  /** Initialises the Baileys WhatsApp Web socket */
  private async initBaileys() {
    try {
      const authDir = path.join(process.cwd(), 'whatsapp_auth');
      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }

      const { state, saveCreds } = await useMultiFileAuthState(authDir);
      const { version } = await fetchLatestBaileysVersion();

      this.logger.log(`[WhatsApp Baileys] Starting WhatsApp Web client v${version.join('.')}...`);

      this.sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false, // We render manually with qrcode-terminal for clear logging
        syncFullHistory: false,
      });

      this.sock.ev.on('creds.update', saveCreds);

      this.sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          this.qrCodeStr = qr;
          this.logger.log('====================================================');
          this.logger.log('  📱 SCAN THIS QR CODE WITH YOUR WHATSAPP PHONE APP 📱  ');
          this.logger.log('====================================================');
          qrcode.generate(qr, { small: true }, (terminalQr) => {
            console.log(terminalQr);
          });
          this.logger.log('Open WhatsApp on your phone -> Linked Devices -> Link a Device & scan the QR above!');
        }

        if (connection === 'close') {
          this.isConnected = false;
          const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
          const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
          
          this.logger.warn(
            `[WhatsApp Baileys] Connection closed (status: ${statusCode}). Reconnecting: ${shouldReconnect}`,
          );

          if (shouldReconnect) {
            setTimeout(() => this.initBaileys(), 3000);
          } else {
            this.logger.error('[WhatsApp Baileys] Device logged out. Please restart server & scan QR again.');
          }
        } else if (connection === 'open') {
          this.isConnected = true;
          this.qrCodeStr = null;
          this.logger.log('====================================================');
          this.logger.log('  ✅ TEY WHATSAPP CLIENT CONNECTED SUCCESSFULLY!      ');
          this.logger.log('====================================================');
        }
      });
    } catch (err: any) {
      this.logger.error(`[WhatsApp Baileys] Failed to initialise socket: ${err?.message}`);
    }
  }

  // ─── Status & QR Endpoint Support ──────────────────────────────────────────

  getStatus() {
    return {
      isConnected: this.isConnected,
      hasQrCode: !!this.qrCodeStr,
      qrCodeStr: this.qrCodeStr,
    };
  }

  // ─── Send OTP ──────────────────────────────────────────────────────────────

  async sendOtp(rawPhone: string) {
    if (!rawPhone) {
      throw new BadRequestException('Phone number is required.');
    }

    const phone = this.normalisePhone(rawPhone);
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store with 10-minute TTL
    this.otpStore.set(phone, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    const jid = `${phone.replace('+', '')}@s.whatsapp.net`;
    const message = this.buildOtpMessage(code);

    if (this.sock && this.isConnected) {
      try {
        await this.sock.sendMessage(jid, { text: message });
        this.logger.log(`[WhatsApp Baileys] OTP sent to ${phone} (${jid}) ✅`);
      } catch (err: any) {
        this.logger.error(`[WhatsApp Baileys] Failed to send message to ${phone}: ${err?.message}`);
      }
    } else {
      this.logger.warn(
        `[WhatsApp Baileys] Client not connected yet. OTP for ${phone} is: ${code} (Scan QR code to activate real delivery)`,
      );
    }

    return {
      success: true,
      message: this.isConnected
        ? 'OTP sent to your WhatsApp number!'
        : 'OTP generated. Please scan the backend QR code to enable direct WhatsApp delivery.',
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

    // OTP matched
    this.otpStore.delete(phone);
    this.logger.log(`[WhatsApp Baileys] OTP verified for ${phone} ✅`);

    // Persist verified number to User record
    if (userId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          whatsappPhone: phone,
          whatsappVerified: true,
        },
      });

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

  private normalisePhone(raw: string): string {
    const digits = raw.replace(/[^\d+]/g, '');
    return digits.startsWith('+') ? digits : `+${digits}`;
  }

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
