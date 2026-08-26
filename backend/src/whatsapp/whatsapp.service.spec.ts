import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { WhatsappService } from './whatsapp.service';
import { normalisePhone, maskPhone } from './phone.util';
import { PrismaService } from '../prisma/prisma.service';

// Baileys ships ESM-only — jest's CJS runtime can't parse it, and none of these
// specs exercise socket behaviour, so stub the whole module surface we import.
jest.mock('@whiskeysockets/baileys', () => ({
  __esModule: true,
  default: jest.fn(),
  DisconnectReason: { loggedOut: 401 },
  fetchLatestBaileysVersion: jest
    .fn()
    .mockResolvedValue({ version: [2, 3000, 10241] }),
  WASocket: jest.fn(),
  BufferJSON: {
    replacer: (_k: string, v: unknown) => v,
    reviver: (_k: string, v: unknown) => v,
  },
  initAuthCreds: () => ({ noiseKey: { public: 'test', private: 'test' } }),
  proto: {
    Message: { AppStateSyncKeyData: { fromObject: (v: unknown) => v } },
  },
}));

/** Mirror of the service's private hash — keeps specs honest about storage format. */
const expectedHash = (code: string, phone: string) =>
  crypto.createHash('sha256').update(`${code}:${phone}`).digest('hex');

describe('phone.util', () => {
  it.each([
    ['+237671405008', '+237671405008'],
    ['671405008', '+237671405008'],
    ['0671405008', '+237671405008'],
    ['237 671 405 008', '+237671405008'],
    ['+14155552671', '+14155552671'],
  ])('normalises %s → %s', (raw, expected) => {
    expect(normalisePhone(raw)).toBe(expected);
  });

  it.each([[''], ['123'], ['++23767'], [undefined as unknown as string]])(
    'rejects implausible input %j',
    (raw) => {
      expect(normalisePhone(raw)).toBeNull();
    },
  );

  it('masks phones for logging', () => {
    expect(maskPhone('+237671405008')).toBe('+237••••••008');
  });
});

describe('WhatsappService', () => {
  let service: WhatsappService;
  let prisma: {
    whatsappOtp: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
    user: { findFirst: jest.Mock; findUnique: jest.Mock; update: jest.Mock };
    onboardingSession: { findUnique: jest.Mock; update: jest.Mock };
  };

  const PHONE = '+237671405008';
  const future = (ms: number) => new Date(Date.now() + ms);
  const past = (ms: number) => new Date(Date.now() - ms);

  const withEnv = (
    env: Record<string, string | undefined>,
    fn: () => Promise<void> | void,
  ) => {
    const saved = { ...process.env };
    for (const [k, v] of Object.entries(env)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
    return Promise.resolve(fn()).finally(() => {
      process.env = saved;
    });
  };

  beforeEach(async () => {
    prisma = {
      whatsappOtp: {
        findUnique: jest.fn(),
        upsert: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      },
      user: {
        findFirst: jest.fn().mockResolvedValue(null),
        findUnique: jest.fn().mockResolvedValue(null),
        update: jest.fn().mockResolvedValue({}),
      },
      onboardingSession: {
        findUnique: jest.fn().mockResolvedValue(null),
        update: jest.fn().mockResolvedValue({}),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WhatsappService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<WhatsappService>(WhatsappService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ─── sendOtp ───────────────────────────────────────────────────────────────

  describe('sendOtp', () => {
    it('rejects implausible phone numbers', async () => {
      await expect(service.sendOtp('user-1', 'not-a-phone')).rejects.toThrow(
        BadRequestException,
      );
      expect(prisma.whatsappOtp.upsert).not.toHaveBeenCalled();
    });

    it('rejects numbers already linked to another verified account', async () => {
      prisma.user.findFirst.mockResolvedValue({ id: 'someone-else' });

      await expect(service.sendOtp('user-1', PHONE)).rejects.toThrow(
        ConflictException,
      );
      expect(prisma.whatsappOtp.upsert).not.toHaveBeenCalled();
    });

    it('enforces the per-phone resend cooldown', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue({
        phone: PHONE,
        sentCount: 1,
        windowStartedAt: past(60_000),
        lastSentAt: past(10_000), // 10s ago < 60s cooldown
      });

      await withEnv({ ENABLE_WHATSAPP: undefined }, async () => {
        await expect(service.sendOtp(null, PHONE)).rejects.toMatchObject({
          status: 429,
        });
      });
      expect(prisma.whatsappOtp.upsert).not.toHaveBeenCalled();
    });

    it('caps sends at 5 per hourly window per phone', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue({
        phone: PHONE,
        sentCount: 5,
        windowStartedAt: past(10 * 60_000),
        lastSentAt: past(2 * 60_000),
      });

      await withEnv({ ENABLE_WHATSAPP: undefined }, async () => {
        await expect(service.sendOtp(null, PHONE)).rejects.toMatchObject({
          status: 429,
        });
      });
    });

    it('resets the send counter once the hourly window has rolled over', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue({
        phone: PHONE,
        sentCount: 5,
        windowStartedAt: past(2 * 60 * 60_000), // window expired
        lastSentAt: past(2 * 60_000),
      });

      await withEnv(
        { ENABLE_WHATSAPP: undefined, EXPOSE_DEV_OTP: 'true' },
        async () => {
          const res = await service.sendOtp(null, PHONE);
          const stored = prisma.whatsappOtp.upsert.mock.calls[0][0];
          expect(stored.update.sentCount).toBe(1);
          expect(String(res.devCode)).toMatch(/^\d{6}$/);
        },
      );
    });

    it('stores only a hashed code and never echoes the raw code outside Dev Mode', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(null);

      await withEnv(
        { ENABLE_WHATSAPP: undefined, EXPOSE_DEV_OTP: 'true' },
        async () => {
          const res = await service.sendOtp('user-1', PHONE);
          const devCode = String(res.devCode);

          const call = prisma.whatsappOtp.upsert.mock.calls[0][0];
          expect(call.where.phone).toBe(PHONE);
          expect(call.create.codeHash).toBe(expectedHash(devCode, PHONE));
          expect(JSON.stringify(call.create)).not.toContain(devCode); // hash ≠ raw
          expect(res.message).not.toContain(devCode);
        },
      );
    });

    it('returns no code at all when the dev exposure flag is absent', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(null);

      await withEnv(
        { ENABLE_WHATSAPP: undefined, EXPOSE_DEV_OTP: undefined },
        async () => {
          const res = await service.sendOtp('user-1', PHONE);
          expect(res.devCode).toBeUndefined();
        },
      );
    });

    it('fails honestly instead of leaking the code when Baileys is enabled but offline', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(null);

      await withEnv({ ENABLE_WHATSAPP: 'true' }, async () => {
        // this.sock is never initialised in tests → enabled-but-disconnected
        await expect(service.sendOtp('user-1', PHONE)).rejects.toThrow(
          ServiceUnavailableException,
        );
      });
      // The code must still be stored so a retry-after-recovery can succeed…
      expect(prisma.whatsappOtp.upsert).toHaveBeenCalled();
    });
  });

  // ─── verifyOtp ─────────────────────────────────────────────────────────────

  describe('verifyOtp', () => {
    const CODE = '482913';

    const activeRow = (overrides: Record<string, unknown> = {}) => ({
      phone: PHONE,
      codeHash: expectedHash(CODE, PHONE),
      expiresAt: future(5 * 60_000),
      attempts: 0,
      ...overrides,
    });

    it('rejects when no code was requested', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(null);

      await expect(service.verifyOtp(PHONE, CODE, 'user-1')).rejects.toThrow(
        new BadRequestException(
          'No active code found for this number. Please request a new one.',
        ),
      );
    });

    it('deletes and rejects expired codes', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(
        activeRow({ expiresAt: past(1000) }),
      );

      await expect(service.verifyOtp(PHONE, CODE, 'user-1')).rejects.toThrow(
        /expired/i,
      );
      expect(prisma.whatsappOtp.delete).toHaveBeenCalledWith({
        where: { phone: PHONE },
      });
    });

    it('locks the number after MAX failed attempts and destroys the code', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(
        activeRow({ attempts: 4 }),
      );
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(
        service.verifyOtp(PHONE, '000000', 'user-1'),
      ).rejects.toThrow(/too many incorrect attempts/i);
      expect(prisma.whatsappOtp.delete).toHaveBeenCalledWith({
        where: { phone: PHONE },
      });
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('reports remaining attempts on a wrong guess without destroying the code', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(
        activeRow({ attempts: 1 }),
      );

      await expect(
        service.verifyOtp(PHONE, '000000', 'user-1'),
      ).rejects.toThrow(/3 attempts remaining/);
      expect(prisma.whatsappOtp.update).toHaveBeenCalledWith({
        where: { phone: PHONE },
        data: { attempts: 2 },
      });
      expect(prisma.whatsappOtp.delete).not.toHaveBeenCalled();
    });

    it('binds the number to the account when authenticated', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(activeRow());
      prisma.onboardingSession.findUnique.mockResolvedValue({
        userId: 'user-1',
        answers: {},
      });

      const res = await service.verifyOtp(PHONE, CODE, 'user-1');

      expect(res.success).toBe(true);
      expect(prisma.whatsappOtp.delete).toHaveBeenCalledWith({
        where: { phone: PHONE },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { whatsappPhone: PHONE, whatsappVerified: true },
      });
      // Onboarding answers get the server-normalised E.164 number
      expect(prisma.onboardingSession.update).toHaveBeenCalledWith({
        where: { userId: 'user-1' },
        data: { answers: { whatsappNumber: PHONE } },
      });
    });

    it('stamps verifiedAt instead of binding when pre-signup (anonymous)', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(activeRow());

      const res = await service.verifyOtp(PHONE, CODE, null);

      expect(res.success).toBe(true);
      expect(prisma.whatsappOtp.delete).not.toHaveBeenCalled();
      expect(prisma.whatsappOtp.update).toHaveBeenCalledWith({
        where: { phone: PHONE },
        data: { verifiedAt: expect.any(Date) },
      });
      expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('never binds a number already held by another account', async () => {
      prisma.whatsappOtp.findUnique.mockResolvedValue(activeRow());
      prisma.user.findFirst.mockResolvedValue({ id: 'holder-elsewhere' });

      await expect(service.verifyOtp(PHONE, CODE, 'user-1')).rejects.toThrow(
        ConflictException,
      );
      expect(prisma.whatsappOtp.delete).not.toHaveBeenCalled();
      expect(prisma.user.update).not.toHaveBeenCalled();
    });
  });
});
