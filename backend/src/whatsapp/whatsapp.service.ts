import {
  Injectable,
  Logger,
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  ServiceUnavailableException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  WASocket,
  BufferJSON,
  initAuthCreds,
  proto,
} from '@whiskeysockets/baileys';
import * as crypto from 'crypto';
import * as qrcodeTerminal from 'qrcode-terminal';
import * as QRCode from 'qrcode';
import { normalisePhone, maskPhone } from './phone.util';
import { MetaWhatsAppService } from './meta/meta-whatsapp.service';
import { MetaWhatsAppError } from './meta/meta-whatsapp.types';

// ─── OTP policy constants ────────────────────────────────────────────────────
const OTP_TTL_MS = 10 * 60 * 1000; // code validity
const MAX_OTP_ATTEMPTS = 5; // wrong guesses before the code is destroyed
const RESEND_COOLDOWN_MS = 60 * 1000; // min gap between sends per phone
const SEND_WINDOW_MS = 60 * 60 * 1000; // hourly abuse window
const MAX_SENDS_PER_WINDOW = 5; // per phone per window
const SEND_TIMEOUT_MS = 20_000; // give up on a stuck WhatsApp send

@Injectable()
export class WhatsappService implements OnModuleInit {
  private readonly logger = new Logger(WhatsappService.name);

  /** Baileys WASocket instance */
  private sock: WASocket | null = null;
  private isConnected = false;
  private qrCodeStr: string | null = null;
  private keepAliveInterval: NodeJS.Timeout | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private initAttempts = 0;

  constructor(
    private prisma: PrismaService,
    private meta: MetaWhatsAppService,
  ) {}

  private get isEnabled(): boolean {
    return process.env.ENABLE_WHATSAPP === 'true';
  }

  /** 'meta' | 'baileys' (default). Production stays on Baileys until flipped. */
  private get provider(): 'meta' | 'baileys' {
    return process.env.WHATSAPP_PROVIDER?.toLowerCase() === 'meta'
      ? 'meta'
      : 'baileys';
  }

  async onModuleInit() {
    if (this.provider === 'meta') {
      this.logger.log(
        '[WhatsApp] WHATSAPP_PROVIDER=meta — skipping Baileys socket init.',
      );
      return;
    }
    if (!this.isEnabled) {
      this.logger.warn(
        '[WhatsApp] Baileys service is DISABLED (set ENABLE_WHATSAPP=true in env to activate). Dev Mode active.',
      );
      return;
    }
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

    this.keepAliveInterval = setInterval(
      async () => {
        const backendUrl =
          process.env.RENDER_EXTERNAL_URL ||
          process.env.BACKEND_URL ||
          process.env.NEXT_PUBLIC_API_URL ||
          'https://upskiill-backend.onrender.com';
        const targetUrl = `${backendUrl.replace(/\/$/, '')}/health`;
        try {
          const res = await fetch(targetUrl);
          if (res.ok) {
            this.logger.log(
              `[WhatsApp Keep-Alive] Self-pinged ${targetUrl} (200 OK) — Render 15-min inactivity sleep timer reset ✅`,
            );
          }
        } catch (err: any) {
          this.logger.warn(
            `[WhatsApp Keep-Alive] Self-ping to ${targetUrl} failed: ${err?.message}`,
          );
        }
      },
      4 * 60 * 1000,
    );
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
        this.logger.error(
          `[WhatsApp DB Auth] Write failed for key ${key}: ${err?.message}`,
        );
      }
    };

    const readData = async (key: string) => {
      try {
        const res = await this.prisma.whatsappAuthStore.findUnique({
          where: { key },
        });
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
      this.logger.error(
        `[WhatsApp DB Auth] Failed to clear auth store: ${err?.message}`,
      );
    }
  }

  /** Manual session reset to clear stale auth keys & trigger fresh QR scan */
  async resetConnection() {
    this.logger.warn(
      '[WhatsApp Baileys] Manual session reset requested. Purging auth store...',
    );
    this.isConnected = false;
    this.qrCodeStr = null;

    if (this.sock) {
      try {
        this.sock.end(undefined);
      } catch {}
      this.sock = null;
    }

    await this.clearAuthState();
    this.scheduleReconnect(1000);

    return {
      success: true,
      message:
        'WhatsApp session reset. Please visit /whatsapp/qr-page to scan fresh QR code.',
    };
  }

  /** Single-flight reconnect scheduling — never stacks overlapping timers. */
  private scheduleReconnect(delayMs: number) {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      void this.initBaileys();
    }, delayMs);
  }

  /** Initialises the Baileys WhatsApp Web socket using database-backed auth */
  private async initBaileys() {
    if (!this.isEnabled) return;
    try {
      const { state, saveCreds } = await this.usePrismaAuthState();

      // Version fetch needs outbound network — fall back to Baileys' baked-in
      // default rather than dying at boot when it blips.
      let version: [number, number, number] | undefined;
      try {
        version = (await fetchLatestBaileysVersion()).version;
      } catch {
        this.logger.warn(
          '[WhatsApp Baileys] fetchLatestBaileysVersion failed — using bundled default version.',
        );
      }

      this.logger.log(
        `[WhatsApp Baileys] Initialising client v${version?.join('.') ?? 'default'} (DB-backed Auth)...`,
      );

      const sock = makeWASocket({
        ...(version ? { version } : {}),
        auth: state,
        printQRInTerminal: false,
        syncFullHistory: false,
        browser: ['Teyro AI Assistant', 'Chrome', '1.0.0'],
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 15000,
        retryRequestDelayMs: 2500,
      });
      this.sock = sock;
      this.initAttempts = 0;

      sock.ev.on('creds.update', saveCreds);

      sock.ev.on('connection.update', async (update) => {
        // Stale-socket guard: a replaced socket's late events must not
        // schedule competing reconnects against the live one.
        if (this.sock !== sock) return;

        const { connection, lastDisconnect, qr } = update;

        if (qr) {
          this.qrCodeStr = qr;
          this.logger.log(
            '====================================================',
          );
          this.logger.log(
            '  📱 SCAN QR CODE TO CONNECT TEY WHATSAPP CLIENT   ',
          );
          this.logger.log(
            '====================================================',
          );
          qrcodeTerminal.generate(qr, { small: true }, (terminalQr) => {
            console.log(terminalQr);
          });
          this.logger.log(
            'Or visit: https://upskiill-backend.onrender.com/whatsapp/qr-page to scan on web!',
          );
        }

        if (connection === 'close') {
          this.isConnected = false;
          const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
          const isLoggedOut = statusCode === DisconnectReason.loggedOut;

          this.logger.warn(
            `[WhatsApp Baileys] Connection closed (status: ${statusCode}). Logged out: ${isLoggedOut}`,
          );

          if (isLoggedOut) {
            this.logger.error(
              '[WhatsApp Baileys] Device logged out. Clearing auth store for fresh QR scan...',
            );
            await this.clearAuthState();
            this.scheduleReconnect(2000);
          } else {
            const delay =
              statusCode === DisconnectReason.restartRequired ? 1000 : 3000;
            this.logger.log(`[WhatsApp Baileys] Reconnecting in ${delay}ms...`);
            this.scheduleReconnect(delay);
          }
        } else if (connection === 'open') {
          this.isConnected = true;
          this.qrCodeStr = null;
          this.logger.log(
            '====================================================',
          );
          this.logger.log(
            '  ✅ TEY WHATSAPP CLIENT CONNECTED SUCCESSFULLY!      ',
          );
          this.logger.log(
            '====================================================',
          );
        }
      });
    } catch (err: any) {
      // Boot failures (network blips, DB hiccups) must self-heal — previously
      // a single throw left WhatsApp dead until the next redeploy.
      this.initAttempts += 1;
      const delay = Math.min(30_000, 1000 * 2 ** this.initAttempts);
      this.logger.error(
        `[WhatsApp Baileys] Failed to initialise socket (attempt ${this.initAttempts}): ${err?.message} — retrying in ${delay}ms`,
      );
      this.scheduleReconnect(delay);
    }
  }

  // ─── Status & QR Page Helpers ──────────────────────────────────────────────

  getStatus() {
    return {
      enabled: this.isEnabled,
      isConnected: this.isConnected,
      hasQrCode: !!this.qrCodeStr,
      qrCodeStr: this.qrCodeStr,
    };
  }

  /**
   * JSON counterpart to `getQrPageHtml` — renders the same QR as a data URL
   * so an admin-center page can poll and display it directly, instead of
   * requiring a raw-HTML fetch with a manually-attached bearer token.
   */
  async getQrData(): Promise<{
    enabled: boolean;
    isConnected: boolean;
    hasQrCode: boolean;
    qrDataUrl: string | null;
  }> {
    const qrDataUrl =
      !this.isConnected && this.qrCodeStr
        ? await QRCode.toDataURL(this.qrCodeStr, { width: 300, margin: 2 })
        : null;

    return {
      enabled: this.isEnabled,
      isConnected: this.isConnected,
      hasQrCode: !!this.qrCodeStr,
      qrDataUrl,
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
    const dataUrl = await QRCode.toDataURL(this.qrCodeStr, {
      width: 300,
      margin: 2,
    });

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

  /**
   * Generates, stores (hashed) and delivers an OTP for the given phone.
   *
   * `userId` is null for pre-signup onboarding users (account is created at
   * Step 12). The raw code is NEVER returned to the client or embedded in API
   * messages in production. In local Dev Mode (ENABLE_WHATSAPP disabled) it is
   * logged, and additionally returned only when EXPOSE_DEV_OTP=true so local
   * flows can complete verification without reading server logs.
   */
  async sendOtp(userId: string | null, rawPhone: string) {
    const phone = normalisePhone(rawPhone);
    if (!phone) {
      throw new BadRequestException(
        "That doesn't look like a valid WhatsApp number. Double-check the country code and digits.",
      );
    }

    // A number already bound to another verified account cannot be claimed.
    await this.assertNumberAvailable(phone, userId);

    // ── Per-phone rate limits (server-side source of truth) ──
    const now = new Date();
    const existing = await this.prisma.whatsappOtp.findUnique({
      where: { phone },
    });

    let sentCount = 1;
    let windowStartedAt = now;
    if (existing) {
      const sinceLastSend = now.getTime() - existing.lastSentAt.getTime();
      if (sinceLastSend < RESEND_COOLDOWN_MS) {
        const waitSeconds = Math.ceil(
          (RESEND_COOLDOWN_MS - sinceLastSend) / 1000,
        );
        throw new HttpException(
          `Please wait ${waitSeconds}s before requesting another code.`,
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      const windowExpired =
        now.getTime() - existing.windowStartedAt.getTime() >= SEND_WINDOW_MS;
      sentCount = windowExpired ? 0 : existing.sentCount;
      if (sentCount >= MAX_SENDS_PER_WINDOW) {
        throw new HttpException(
          'Too many codes requested for this number today. Please try again later.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      sentCount += 1;
      windowStartedAt = windowExpired ? now : existing.windowStartedAt;
    }

    // CSPRNG — Math.random is predictable, fatal for a 6-digit code space.
    const code = crypto.randomInt(100_000, 1_000_000).toString();
    const codeHash = hashOtp(code, phone);
    const expiresAt = new Date(now.getTime() + OTP_TTL_MS);

    await this.prisma.whatsappOtp.upsert({
      where: { phone },
      create: {
        phone,
        codeHash,
        expiresAt,
        attempts: 0,
        sentCount,
        windowStartedAt,
        lastSentAt: now,
      },
      update: {
        codeHash,
        expiresAt,
        attempts: 0,
        sentCount,
        windowStartedAt,
        lastSentAt: now,
      },
    });

    // ── Delivery ──
    // WHATSAPP_PROVIDER selects Meta Cloud API or the existing Baileys
    // socket; whichever isn't selected is never touched. Both branches keep
    // the code valid in the DB on failure so a retry can succeed once the
    // provider recovers — never lie about delivery.
    const usingMeta = this.provider === 'meta' && this.meta.isEnabled;
    const delivering = usingMeta || this.isEnabled;

    if (usingMeta) {
      await this.deliverViaMeta(phone, code);
    } else if (this.isEnabled && this.sock && this.isConnected) {
      await this.deliverViaBaileys(phone, code);
    } else if (this.isEnabled) {
      // Enabled but disconnected — previously this path leaked the code in the
      // API response, which was a full verification bypass.
      this.logger.error(
        `[WhatsApp Baileys] Socket offline — OTP for ${maskPhone(phone)} generated but NOT delivered.`,
      );
      throw new ServiceUnavailableException(
        "Tey's WhatsApp link is offline right now. Please try again in a few minutes.",
      );
    } else {
      // Dev Mode — no provider enabled.
      this.logger.warn(
        `[WhatsApp Dev Mode] OTP for ${maskPhone(phone)} is: 🔑 ${code} 🔑`,
      );
    }

    const exposeDevOtp = !delivering && process.env.EXPOSE_DEV_OTP === 'true';
    return {
      success: true,
      message: delivering
        ? 'OTP sent to your WhatsApp number!'
        : 'OTP generated (Dev Mode — delivery disabled).',
      ...(exposeDevOtp ? { devCode: code } : {}),
    };
  }

  // ─── Verify OTP ────────────────────────────────────────────────────────────

  async verifyOtp(rawPhone: string, rawCode: string, userId: string | null) {
    if (!rawPhone || !rawCode) {
      throw new BadRequestException('Phone number and OTP code are required.');
    }

    const phone = normalisePhone(rawPhone);
    if (!phone) {
      throw new BadRequestException(
        "That doesn't look like a valid WhatsApp number.",
      );
    }

    const entry = await this.prisma.whatsappOtp.findUnique({
      where: { phone },
    });

    if (!entry) {
      throw new BadRequestException(
        'No active code found for this number. Please request a new one.',
      );
    }

    if (new Date() > entry.expiresAt) {
      await this.prisma.whatsappOtp
        .delete({ where: { phone } })
        .catch(() => undefined);
      throw new BadRequestException(
        'Your code has expired. Please request a new one.',
      );
    }

    if (entry.attempts >= MAX_OTP_ATTEMPTS) {
      await this.prisma.whatsappOtp
        .delete({ where: { phone } })
        .catch(() => undefined);
      throw new BadRequestException(
        'Too many incorrect attempts. Please request a new code.',
      );
    }

    if (hashOtp(rawCode, phone) !== entry.codeHash) {
      // Atomic conditional increment (B9): the old read-then-write let two
      // concurrent guesses share one attempt slot. The where-clause makes
      // every miss claim its own slot and refuses once the cap is reached.
      const bumped = await this.prisma.whatsappOtp.updateMany({
        where: { phone, attempts: { lt: MAX_OTP_ATTEMPTS } },
        data: { attempts: { increment: 1 } },
      });
      const attempts = entry.attempts + 1;

      if (bumped.count === 0 || attempts >= MAX_OTP_ATTEMPTS) {
        await this.prisma.whatsappOtp
          .delete({ where: { phone } })
          .catch(() => undefined);
        this.logger.warn(
          `[WhatsApp] OTP locked after ${MAX_OTP_ATTEMPTS} failed attempts for ${maskPhone(phone)}`,
        );
        throw new BadRequestException(
          'Too many incorrect attempts. Please request a new code.',
        );
      }
      const remaining = MAX_OTP_ATTEMPTS - attempts;
      throw new BadRequestException(
        `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
      );
    }

    // ── OTP matched ──
    // Re-check uniqueness at the last possible moment (another account may
    // have claimed this number while the code sat in the inbox).
    await this.assertNumberAvailable(phone, userId);
    this.logger.log(
      `[WhatsApp Baileys] OTP verified for ${maskPhone(phone)} ✅`,
    );

    if (!userId) {
      // Pre-signup journey (onboarding Step 6 runs before Google sign-in at
      // Step 12): keep a server-side proof of verification so the number can
      // be bound to the account when onboarding answers sync post-signup.
      await this.prisma.whatsappOtp.update({
        where: { phone },
        data: { verifiedAt: new Date() },
      });
      this.logger.log(
        `[WhatsApp] Pre-auth verification recorded for ${maskPhone(phone)} — will bind after signup.`,
      );
      return {
        success: true,
        message: 'WhatsApp number verified successfully.',
        phone,
      };
    }

    await this.prisma.whatsappOtp
      .delete({ where: { phone } })
      .catch(() => undefined);

    // Persist verified number to User record
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

    return {
      success: true,
      message: 'WhatsApp number verified successfully.',
      phone,
    };
  }

  // ─── Delivery providers ─────────────────────────────────────────────────────

  /** Pure extraction of the pre-existing Baileys send — no behaviour change. */
  private async deliverViaBaileys(phone: string, code: string): Promise<void> {
    const jid = `${phone.replace('+', '')}@s.whatsapp.net`;
    const message = this.buildOtpMessage(code);
    try {
      await this.withTimeout(
        this.sock!.sendMessage(jid, { text: message }),
        SEND_TIMEOUT_MS,
        'sendMessage',
      );
      this.logger.log(`[WhatsApp Baileys] OTP sent to ${maskPhone(phone)} ✅`);
    } catch (err: any) {
      this.logger.error(
        `[WhatsApp Baileys] Failed to send message to ${maskPhone(phone)}: ${err?.message}`,
      );
      throw new ServiceUnavailableException(
        "We couldn't reach WhatsApp just now. Please tap Resend in a minute.",
      );
    }
  }

  /** Meta WhatsApp Cloud API OTP delivery via a pre-approved Authentication template. */
  private async deliverViaMeta(phone: string, code: string): Promise<void> {
    const templateName = process.env.META_WHATSAPP_OTP_TEMPLATE_NAME;
    const languageCode =
      process.env.META_WHATSAPP_OTP_TEMPLATE_LANGUAGE || 'en_US';

    if (!templateName) {
      this.logger.error(
        '[Meta WhatsApp] META_WHATSAPP_OTP_TEMPLATE_NAME is not configured.',
      );
      throw new ServiceUnavailableException(
        "We couldn't reach WhatsApp just now. Please tap Resend in a minute.",
      );
    }

    try {
      await this.meta.sendTemplateMessage(phone, templateName, languageCode, [
        code,
      ]);
    } catch (err) {
      const kind = err instanceof MetaWhatsAppError ? err.kind : 'UNKNOWN';
      this.logger.error(
        `[Meta WhatsApp] Failed to send OTP to ${maskPhone(phone)} (${kind}): ${(err as Error).message}`,
      );
      // Never lie about delivery — the code stays valid in the DB so the
      // user can retry once Meta recovers.
      throw new ServiceUnavailableException(
        "We couldn't reach WhatsApp just now. Please tap Resend in a minute.",
      );
    }
  }

  // ─── Private Helpers ────────────────────────────────────────────────────────

  /** Rejects numbers already bound (verified) to a DIFFERENT account. */
  private async assertNumberAvailable(phone: string, userId: string | null) {
    const holder = await this.prisma.user.findFirst({
      where: {
        whatsappPhone: phone,
        whatsappVerified: true,
        ...(userId ? { id: { not: userId } } : {}),
      },
      select: { id: true },
    });
    if (holder) {
      throw new ConflictException(
        'This WhatsApp number is already linked to another Teyro account.',
      );
    }
  }

  /** Rejects a promise that hangs longer than `ms` (stuck Baileys sends). */
  private withTimeout<T>(
    promise: Promise<T>,
    ms: number,
    label: string,
  ): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error(`${label} timed out after ${ms}ms`)),
          ms,
        ),
      ),
    ]);
  }

  private buildOtpMessage(code: string, expiryMinutes = 10): string {
    return (
      `💙 Hey, I'm Tey!\n\n` +
      `I brought your verification code:\n\n` +
      `🔐 *${code}*\n\n` +
      `Use it within ${expiryMinutes} minutes so we can get back to making learning dangerously fun. 😏\n\n` +
      `Didn't ask for this? You can safely ignore this message.\n\n` +
      `@teyro.app #${code}`
    );
  }
}

/** SHA-256 of the code bound to its phone — raw codes are never stored. */
function hashOtp(code: string, phone: string): string {
  return crypto.createHash('sha256').update(`${code}:${phone}`).digest('hex');
}
