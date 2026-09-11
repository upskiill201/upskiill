import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { WhatsappWebhookService } from './whatsapp-webhook.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WhatsappWebhookService', () => {
  let service: WhatsappWebhookService;
  let prisma: {
    teyDelivery: { updateMany: jest.Mock };
    whatsappInboundMessage: { create: jest.Mock };
    processedWebhookEvent: { create: jest.Mock };
    user: { findFirst: jest.Mock };
  };

  const SECRET = 'test-app-secret';

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

  const sign = (body: Buffer, secret = SECRET) =>
    `sha256=${crypto.createHmac('sha256', secret).update(body).digest('hex')}`;

  beforeEach(() => {
    prisma = {
      teyDelivery: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
      whatsappInboundMessage: { create: jest.fn().mockResolvedValue({}) },
      processedWebhookEvent: { create: jest.fn().mockResolvedValue({}) },
      user: { findFirst: jest.fn().mockResolvedValue(null) },
    };
    service = new WhatsappWebhookService(prisma as unknown as PrismaService);
  });

  describe('verifySignature', () => {
    it('rejects when META_WHATSAPP_APP_SECRET is not configured', async () => {
      await withEnv({ META_WHATSAPP_APP_SECRET: undefined }, () => {
        const body = Buffer.from('{}');
        expect(() => service.verifySignature(body, sign(body))).toThrow(
          BadRequestException,
        );
      });
    });

    it('rejects a missing signature header', async () => {
      await withEnv({ META_WHATSAPP_APP_SECRET: SECRET }, () => {
        expect(() =>
          service.verifySignature(Buffer.from('{}'), undefined),
        ).toThrow(BadRequestException);
      });
    });

    it('rejects a tampered body', async () => {
      await withEnv({ META_WHATSAPP_APP_SECRET: SECRET }, () => {
        const body = Buffer.from('{"a":1}');
        const signature = sign(body);
        const tampered = Buffer.from('{"a":2}');
        expect(() => service.verifySignature(tampered, signature)).toThrow(
          BadRequestException,
        );
      });
    });

    it('rejects a signature from the wrong secret', async () => {
      await withEnv({ META_WHATSAPP_APP_SECRET: SECRET }, () => {
        const body = Buffer.from('{"a":1}');
        expect(() =>
          service.verifySignature(body, sign(body, 'wrong-secret')),
        ).toThrow(BadRequestException);
      });
    });

    it('accepts a valid signature', async () => {
      await withEnv({ META_WHATSAPP_APP_SECRET: SECRET }, () => {
        const body = Buffer.from('{"a":1}');
        expect(() => service.verifySignature(body, sign(body))).not.toThrow();
      });
    });
  });

  describe('handleWebhookPayload', () => {
    const statusPayload = (
      status: 'sent' | 'delivered' | 'read' | 'failed',
      id = 'wamid.ABC',
    ) => ({
      entry: [
        {
          changes: [
            {
              value: {
                statuses: [{ id, status, timestamp: '1700000000' }],
              },
            },
          ],
        },
      ],
    });

    it('updates deliveredAt on a delivered status', async () => {
      await service.handleWebhookPayload(statusPayload('delivered'));
      expect(prisma.teyDelivery.updateMany).toHaveBeenCalledWith({
        where: { providerMessageId: 'wamid.ABC' },
        data: { deliveredAt: expect.any(Date) },
      });
    });

    it('updates openedAt on a read status', async () => {
      await service.handleWebhookPayload(statusPayload('read'));
      expect(prisma.teyDelivery.updateMany).toHaveBeenCalledWith({
        where: { providerMessageId: 'wamid.ABC', openedAt: null },
        data: { openedAt: expect.any(Date) },
      });
    });

    it('marks the delivery FAILED on a failed status', async () => {
      await service.handleWebhookPayload(statusPayload('failed'));
      expect(prisma.teyDelivery.updateMany).toHaveBeenCalledWith({
        where: { providerMessageId: 'wamid.ABC' },
        data: { status: 'FAILED' },
      });
    });

    it('is a no-op for a duplicate status event id', async () => {
      prisma.processedWebhookEvent.create
        .mockResolvedValueOnce({})
        .mockRejectedValueOnce(new Error('unique violation'));

      await service.handleWebhookPayload(statusPayload('delivered'));
      await service.handleWebhookPayload(statusPayload('delivered'));

      expect(prisma.teyDelivery.updateMany).toHaveBeenCalledTimes(1);
    });

    it('stores an inbound message without side effects beyond the insert', async () => {
      const payload = {
        entry: [
          {
            changes: [
              {
                value: {
                  messages: [
                    {
                      id: 'wamid.INBOUND1',
                      from: '237671405008',
                      timestamp: '1700000000',
                      type: 'text',
                      text: { body: 'hey tey' },
                    },
                  ],
                },
              },
            ],
          },
        ],
      };

      await service.handleWebhookPayload(payload);

      expect(prisma.whatsappInboundMessage.create).toHaveBeenCalledWith({
        data: {
          waMessageId: 'wamid.INBOUND1',
          fromPhone: '+237671405008',
          userId: undefined,
          body: 'hey tey',
          rawPayload: payload.entry[0].changes[0].value.messages[0],
        },
      });
      expect(prisma.teyDelivery.updateMany).not.toHaveBeenCalled();
    });

    it('never throws even when the payload is malformed', async () => {
      await expect(
        service.handleWebhookPayload({} as any),
      ).resolves.toBeUndefined();
      await expect(
        service.handleWebhookPayload(undefined as any),
      ).resolves.toBeUndefined();
    });
  });
});
