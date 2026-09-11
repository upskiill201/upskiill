import { WhatsAppChannel } from './whatsapp.channel';
import { PrismaService } from '../../../prisma/prisma.service';
import { MetaWhatsAppService } from '../../../whatsapp/meta/meta-whatsapp.service';

describe('WhatsAppChannel', () => {
  let channel: WhatsAppChannel;
  let prisma: {
    user: { findUnique: jest.Mock };
    teyNotificationPrefs: { findUnique: jest.Mock };
  };
  let meta: { sendTemplateMessage: jest.Mock };

  const USER_ID = 'user-1';
  const PHONE = '+237671405008';

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

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn() },
      teyNotificationPrefs: { findUnique: jest.fn() },
    };
    meta = {
      sendTemplateMessage: jest.fn().mockResolvedValue({ providerMessageId: 'wamid.NUDGE' }),
    };
    channel = new WhatsAppChannel(
      prisma as unknown as PrismaService,
      meta as unknown as MetaWhatsAppService,
    );
  });

  describe('isAvailableFor', () => {
    it('is false when META_WHATSAPP_ENABLED is not set', async () => {
      await withEnv({ META_WHATSAPP_ENABLED: undefined }, async () => {
        expect(await channel.isAvailableFor(USER_ID)).toBe(false);
        expect(prisma.user.findUnique).not.toHaveBeenCalled();
      });
    });

    it('is false when the user has not verified WhatsApp', async () => {
      prisma.user.findUnique.mockResolvedValue({
        whatsappVerified: false,
        whatsappPhone: null,
      });
      await withEnv({ META_WHATSAPP_ENABLED: 'true' }, async () => {
        expect(await channel.isAvailableFor(USER_ID)).toBe(false);
        expect(prisma.teyNotificationPrefs.findUnique).not.toHaveBeenCalled();
      });
    });

    it('is false when there is no notification prefs row (opt-in default)', async () => {
      prisma.user.findUnique.mockResolvedValue({
        whatsappVerified: true,
        whatsappPhone: PHONE,
      });
      prisma.teyNotificationPrefs.findUnique.mockResolvedValue(null);
      await withEnv({ META_WHATSAPP_ENABLED: 'true' }, async () => {
        expect(await channel.isAvailableFor(USER_ID)).toBe(false);
      });
    });

    it('is false when whatsappEnabled is explicitly false', async () => {
      prisma.user.findUnique.mockResolvedValue({
        whatsappVerified: true,
        whatsappPhone: PHONE,
      });
      prisma.teyNotificationPrefs.findUnique.mockResolvedValue({
        whatsappEnabled: false,
      });
      await withEnv({ META_WHATSAPP_ENABLED: 'true' }, async () => {
        expect(await channel.isAvailableFor(USER_ID)).toBe(false);
      });
    });

    it('is true when the flag is on, verified, and opted in', async () => {
      prisma.user.findUnique.mockResolvedValue({
        whatsappVerified: true,
        whatsappPhone: PHONE,
      });
      prisma.teyNotificationPrefs.findUnique.mockResolvedValue({
        whatsappEnabled: true,
      });
      await withEnv({ META_WHATSAPP_ENABLED: 'true' }, async () => {
        expect(await channel.isAvailableFor(USER_ID)).toBe(true);
      });
    });
  });

  describe('send', () => {
    const message = {
      title: 'Streak alert',
      body: 'Your streak is about to expire!',
      deepLink: '/learn',
      tag: 'streak',
      deliveryId: 'delivery-1',
    };

    it('returns NO_TARGET when the user has no phone', async () => {
      prisma.user.findUnique.mockResolvedValue({ whatsappPhone: null });
      const result = await channel.send(USER_ID, message, {} as any);
      expect(result).toEqual({ status: 'NO_TARGET' });
      expect(meta.sendTemplateMessage).not.toHaveBeenCalled();
    });

    it('returns FAILED when the nudge template env var is missing', async () => {
      prisma.user.findUnique.mockResolvedValue({ whatsappPhone: PHONE });
      await withEnv({ META_WHATSAPP_NUDGE_TEMPLATE_NAME: undefined }, async () => {
        const result = await channel.send(USER_ID, message, {} as any);
        expect(result.status).toBe('FAILED');
        expect(meta.sendTemplateMessage).not.toHaveBeenCalled();
      });
    });

    it('sends the rendered body as the template\'s single parameter', async () => {
      prisma.user.findUnique.mockResolvedValue({ whatsappPhone: PHONE });
      await withEnv(
        {
          META_WHATSAPP_NUDGE_TEMPLATE_NAME: 'tey_nudge',
          META_WHATSAPP_NUDGE_TEMPLATE_LANGUAGE: 'en_US',
        },
        async () => {
          const result = await channel.send(USER_ID, message, {} as any);
          expect(result).toEqual({ status: 'SENT', providerMessageId: 'wamid.NUDGE' });
          expect(meta.sendTemplateMessage).toHaveBeenCalledWith(
            PHONE,
            'tey_nudge',
            'en_US',
            [message.body],
          );
        },
      );
    });

    it('returns FAILED with the error message when Meta rejects the send', async () => {
      prisma.user.findUnique.mockResolvedValue({ whatsappPhone: PHONE });
      meta.sendTemplateMessage.mockRejectedValue(new Error('down'));
      await withEnv(
        { META_WHATSAPP_NUDGE_TEMPLATE_NAME: 'tey_nudge' },
        async () => {
          const result = await channel.send(USER_ID, message, {} as any);
          expect(result).toEqual({ status: 'FAILED', error: 'down' });
        },
      );
    });
  });
});
