import { Injectable, Logger, BadRequestException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  WASocket,
  BufferJSON,
  initAuthCreds,
  proto,
} from '@whiskeysockets/baileys';
import * as qrcodeTerminal from 'qrcode-terminal';
import * as QRCode from 'qrcode';

// ─── OTP Store Entry ─────────────────────────────────────────────────────────
interface OtpEntry {
  code: string;
  expiresAt: number; // Unix ms timestamp (10 mins)
  lastSentAt: number; // Unix ms timestamp (30s cooldown)
  resendCount: number; // Max 5 resends per session
  attempts: number; // Max 5 wrong verification tries
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
  private keepAliveInterval: NodeJS.Timeout | null = null;

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.initBaileys();
    this.startKeepAlivePinger();
  }

  /**
   * Self-pinging Keep-Alive Timer for Render Free Tier.
   * Hits the backend's public /health URL every 4 minutes to reset Render's
   * 15-minute inactivity sleep timer, keeping Tey WhatsApp online 24/7!
   */
  private startKeepAlivePinger() {
    if (this.keepAliveInterval) return;

    this.keepAliveInterval = setInterval(async () => {
      const backendUrl =
        process.env.RENDER_EXTERNAL_URL ||
        process.env.BACKEND_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        'https://upskiill-backend.onrender.com';
      const targetUrl = `${backendUrl.replace(/\/$/, '')}/health`;
      try {
        const res = await fetch(targetUrl);
        if (res.ok) {
          this.logger.log(`[WhatsApp Keep-Alive] Self-pinged ${targetUrl} (200 OK) — Render 15-min inactivity sleep timer reset ✅`);
        }
      } catch (err: any) {
        this.logger.warn(`[WhatsApp Keep-Alive] Self-ping to ${targetUrl} failed: ${err?.message}`);
      }
    }, 4 * 60 * 1000);
  }

  /**
   * Database-backed Auth State handler for Baileys.
   * Stores all credentials & keys in the `whatsapp_auth_store` table in PostgreSQL.
   * This ensures that Render redeployments or container restarts NEVER lose your login session!
   */
  private async usePrismaAuthState() {
    const writeData = async (data: any, key: string) => {
      try {
        await this.prisma.whatsappAuthStore.upsert({
          where: { key },
          create: { key, value: JSON.stringify(data, BufferJSON.replacer) },
          update: { value: JSON.stringify(data, BufferJSON.replacer) },
        });
      } catch (err: any) {
        this.logger.error(`[WhatsApp DB Auth] Write failed for key ${key}: ${err?.message}`);
      }
    };

    const readData = async (key: string) => {
      try {
        const res = await this.prisma.whatsappAuthStore.findUnique({ where: { key } });
        if (res?.value) {
          return JSON.parse(res.value, BufferJSON.reviver);
        }
      } catch {
        return null;
      }
      return null;
    };

    const removeData = async (key: string) => {
      try {
        await this.prisma.whatsappAuthStore.delete({ where: { key } });
      } catch {}
    };

    const creds = (await readData('creds')) || initAuthCreds();

    return {
      state: {
        creds,
        keys: {
          get: async (type: string, ids: string[]) => {
            const data: { [id: string]: any } = {};
            await Promise.all(
              ids.map(async (id) => {
                let value = await readData(`${type}-${id}`);
                if (type === 'app-state-sync-key' && value) {
                  value = proto.Message.AppStateSyncKeyData.fromObject(value);
                }
                if (value) {
                  data[id] = value;
                }
              }),
            );
            return data;
          },
          set: async (data: any) => {
            const tasks: Promise<any>[] = [];
            for (const category in data) {
              for (const id in data[category]) {
                const value = data[category][id];
                const key = `${category}-${id}`;
                tasks.push(value ? writeData(value, key) : removeData(key));
              }
            }
            await Promise.all(tasks);
          },
        },
      },
      saveCreds: () => writeData(creds, 'creds'),
    };
  }

  /** Clears the whatsapp_auth_store table in PostgreSQL */
  private async clearAuthState() {
    try {
      await this.prisma.whatsappAuthStore.deleteMany({});
      this.logger.log('[WhatsApp DB Auth] Auth store purged from PostgreSQL.');
    } catch (err: any) {
      this.logger.error(`[WhatsApp DB Auth] Failed to clear auth store: ${err?.message}`);
    }
  }

  /** Manual session reset to clear stale auth keys & trigger fresh QR scan */
  async resetConnection() {
    this.logger.warn('[WhatsApp Baileys] Manual session reset requested. Purging auth store...');
    this.isConnected = false;
    this.qrCodeStr = null;

    if (this.sock) {
      try {
        this.sock.end(undefined);
      } catch {}
      this.sock = null;
    }

    await this.clearAuthState();
    setTimeout(() => this.initBaileys(), 1000);

    return {
      success: true,
      message: 'WhatsApp session reset. Please visit /whatsapp/qr-page to scan fresh QR code.',
    };
  }

  /** Initialises the Baileys WhatsApp Web socket using database-backed auth */
  private async initBaileys() {
    try {
      const { state, saveCreds } = await this.usePrismaAuthState();
      const { version } = await fetchLatestBaileysVersion();

      this.logger.log(`[WhatsApp Baileys] Initialising client v${version.join('.')} (DB-backed Auth)...`);

      this.sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        syncFullHistory: false,
        browser: ['Teyro AI Assistant', 'Chrome', '1.0.0'],
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 15000,
        retryRequestDelayMs: 2500,
      });

      this.sock.ev.on('creds.update', saveCreds);

      this.sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          this.qrCodeStr = qr;
          this.logger.log('====================================================');
          this.logger.log('  📱 SCAN QR CODE TO CONNECT TEY WHATSAPP CLIENT   ');
          this.logger.log('====================================================');
          qrcodeTerminal.generate(qr, { small: true }, (terminalQr) => {
            console.log(terminalQr);
          });
          this.logger.log('Or visit: https://upskiill-backend.onrender.com/whatsapp/qr-page to scan on web!');
        }

        if (connection === 'close') {
          this.isConnected = false;
          const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
          const isLoggedOut = statusCode === DisconnectReason.loggedOut;

          this.logger.warn(
            `[WhatsApp Baileys] Connection closed (status: ${statusCode}). Logged out: ${isLoggedOut}`,
          );

          if (isLoggedOut) {
            this.logger.error('[WhatsApp Baileys] Device logged out. Clearing auth store for fresh QR scan...');
            await this.clearAuthState();
            setTimeout(() => this.initBaileys(), 2000);
          } else {
            const delay = statusCode === DisconnectReason.restartRequired ? 1000 : 3000;
            this.logger.log(`[WhatsApp Baileys] Reconnecting in ${delay}ms...`);
            setTimeout(() => this.initBaileys(), delay);
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

  // ─── Status & QR Page Helpers ──────────────────────────────────────────────

  getStatus() {
    return {
      isConnected: this.isConnected,
      hasQrCode: !!this.qrCodeStr,
      qrCodeStr: this.qrCodeStr,
    };
  }

  /** Generates a self-contained HTML page rendering the QR Code image for web scanning */
  async getQrPageHtml(): Promise<string> {
    if (this.isConnected) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Tey WhatsApp Client — Connected</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: sans-serif; background: #0F172A; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
              .card { background: #1E293B; padding: 2rem; border-radius: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.3); max-w: 400px; }
              .badge { display: inline-block; background: #10B981; color: white; padding: 0.5rem 1rem; border-radius: 9999px; font-weight: bold; margin-bottom: 1rem; }
              h1 { margin: 0 0 0.5rem 0; font-size: 1.5rem; }
              p { color: #94A3B8; font-size: 0.9rem; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="badge">Connected ✅</div>
              <h1>Tey WhatsApp is Ready!</h1>
              <p>Your Teyro WhatsApp client is connected and ready to deliver real-time OTPs, notifications, and reminders.</p>
              <div style="margin-top: 1.5rem; border-top: 1px solid #334155; pt-4">
                <a href="/whatsapp/reset" onclick="return confirm('Disconnect and generate fresh QR code?');" style="display: inline-block; background: #EF4444; color: white; padding: 0.6rem 1.2rem; border-radius: 0.5rem; text-decoration: none; font-size: 0.85rem; font-weight: bold;">Disconnect & Re-link Device</a>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    if (!this.qrCodeStr) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Tey WhatsApp Client — Initialising</title>
            <meta http-equiv="refresh" content="3">
            <style>
              body { font-family: sans-serif; background: #0F172A; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
              .card { background: #1E293B; padding: 2rem; border-radius: 1rem; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>Initialising Tey WhatsApp Socket...</h2>
              <p>Please wait a moment while the QR code generates (refreshing in 3s)...</p>
            </div>
          </body>
        </html>
      `;
    }

    // Convert QR string to Data URL image
    const dataUrl = await QRCode.toDataURL(this.qrCodeStr, { width: 300, margin: 2 });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Scan QR — Tey WhatsApp</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="refresh" content="15">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #0F172A; color: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; padding: 1rem; }
            .card { background: #1E293B; padding: 2.5rem; border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.4); max-width: 420px; width: 100%; border: 1px solid #334155; }
            h1 { font-size: 1.5rem; font-weight: 800; color: #38BDF8; margin-top: 0; }
            p { color: #94A3B8; font-size: 0.95rem; line-height: 1.5; }
            .qr-wrapper { background: white; padding: 1rem; border-radius: 1rem; display: inline-block; margin: 1.5rem 0; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
            img { display: block; max-width: 100%; height: auto; }
            .instructions { text-align: left; background: #0F172A; padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.85rem; color: #CBD5E1; margin-top: 1rem; border: 1px solid #334155; }
            .instructions ol { margin: 0; padding-left: 1.25rem; }
            .instructions li { margin-bottom: 0.4rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Link Tey WhatsApp Account</h1>
            <p>Scan this QR code with WhatsApp on Tey's dedicated phone to enable automated OTPs & reminders.</p>
            <div class="qr-wrapper">
              <img src="${dataUrl}" alt="WhatsApp QR Code" />
            </div>
            <div class="instructions">
              <strong>Instructions:</strong>
              <ol>
                <li>Open <strong>WhatsApp</strong> on Tey's phone</li>
                <li>Tap <strong>Settings</strong> -> <strong>Linked Devices</strong></li>
                <li>Tap <strong>Link a Device</strong> and scan this code</li>
              </ol>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  // ─── Send OTP ──────────────────────────────────────────────────────────────

  async sendOtp(rawPhone: string) {
    if (!rawPhone) {
      throw new BadRequestException('Phone number is required.');
    }

    const phone = this.normalisePhone(rawPhone);
    const now = Date.now();
    const existing = this.otpStore.get(phone);

    // 1. Generation Rate Limiting: 30-second cooldown window
    if (existing && now - existing.lastSentAt < 30 * 1000) {
      const secondsLeft = Math.ceil((30 * 1000 - (now - existing.lastSentAt)) / 1000);
      throw new BadRequestException(`Please wait ${secondsLeft} second(s) before requesting a new code.`);
    }

    // 2. Cap Total Resends (max 5 per session per phone number)
    const resendCount = existing ? existing.resendCount + 1 : 0;
    if (resendCount > 5) {
      throw new BadRequestException('Maximum resend limit reached for this number. Please try again in 15 minutes.');
    }

    // 3. Invalidate previous code and issue a FRESH 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    this.otpStore.set(phone, {
      code,
      expiresAt: now + 10 * 60 * 1000, // 10 minutes TTL
      lastSentAt: now,
      resendCount,
      attempts: 0,
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
        `[WhatsApp Baileys] Client not connected yet. OTP for ${phone} is: ${code} (Visit https://upskiill-backend.onrender.com/whatsapp/qr-page to scan QR)`,
      );
    }

    return {
      success: true,
      message: this.isConnected
        ? 'OTP sent to your WhatsApp number!'
        : 'OTP generated. Please visit the backend QR page to connect WhatsApp.',
      phone,
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
      throw new BadRequestException('No active OTP found for this number. Please request a new code.');
    }

    if (Date.now() > entry.expiresAt) {
      this.otpStore.delete(phone);
      throw new BadRequestException('OTP has expired. Please request a new code.');
    }

    // Check if locked due to too many failed attempts
    if (entry.attempts >= 5) {
      this.otpStore.delete(phone);
      throw new BadRequestException('Too many incorrect attempts. Code locked — please request a new code.');
    }

    if (entry.code !== code) {
      entry.attempts += 1;
      const remaining = 5 - entry.attempts;
      if (remaining <= 0) {
        this.otpStore.delete(phone);
        throw new BadRequestException('Too many incorrect attempts. Code locked — please request a new code.');
      }
      throw new BadRequestException(`Incorrect OTP code. You have ${remaining} attempt(s) remaining.`);
    }

    // OTP matched successfully
    this.otpStore.delete(phone);
    this.logger.log(`[WhatsApp Baileys] OTP verified for ${phone} ✅`);

    // Persist verified number to User & OnboardingSession records
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

  /**
   * Smart Phone Normalisation.
   * Handles local 9-digit numbers (e.g. 671405008 -> +237671405008), zero-prefixed,
   * 12-digit 237-prefixed, and international numbers starting with '+'.
   */
  private normalisePhone(raw: string): string {
    let clean = raw.replace(/[^\d+]/g, '');

    if (clean.startsWith('+')) {
      return clean;
    }

    if (clean.startsWith('0')) {
      clean = clean.substring(1);
    }

    // Default to Cameroon (+237) for 9-digit numbers starting with 6 or 2
    if (clean.length === 9 && (clean.startsWith('6') || clean.startsWith('2'))) {
      return `+237${clean}`;
    }

    // Handle 12-digit numbers starting with 237
    if (clean.length === 12 && clean.startsWith('237')) {
      return `+${clean}`;
    }

    return `+${clean}`;
  }

  /**
   * Builds WhatsApp OTP message with iOS / Android WebOTP autofill tag (@teyro.app #code).
   */
  private buildOtpMessage(code: string, expiryMinutes = 10): string {
    return (
      `💙 Hey, I'm Tey!\n\n` +
      `Here is your Teyro verification code:\n\n` +
      `🔐 *${code}*\n\n` +
      `Valid for ${expiryMinutes} minutes. Make sure not to share it with anyone! 😏\n\n` +
      `@teyro.app #${code}`
    );
  }
}
