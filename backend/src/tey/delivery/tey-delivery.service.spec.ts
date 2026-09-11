import { TeyDeliveryService } from './tey-delivery.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TeyPolicyService } from './tey-policy.service';
import { PushChannel } from './channels/push.channel';
import { InAppChannel } from './channels/inapp.channel';
import { WhatsAppChannel } from './channels/whatsapp.channel';
import { TeyAiService } from '../ai/tey-ai.service';
import type { TeyContext } from '../contracts/tey-context.types';
import type { TeyLocalNow } from '../state/local-time.util';

describe('TeyDeliveryService', () => {
  let service: TeyDeliveryService;
  let prisma: {
    teyDelivery: { create: jest.Mock; update: jest.Mock };
    teyNotificationPrefs: { findUnique: jest.Mock };
  };
  let policy: { check: jest.Mock };
  let push: { send: jest.Mock };
  let inApp: { send: jest.Mock };
  let whatsapp: { isAvailableFor: jest.Mock; send: jest.Mock };
  let ai: { generateNudgeCopy: jest.Mock };

  const USER_ID = 'user-1';
  const NOW = { date: '2026-09-11' } as unknown as TeyLocalNow;

  const baseCtx = (overrides: Partial<TeyContext> = {}): TeyContext =>
    ({
      v: 1,
      reason: 'DAILY_GOAL_INCOMPLETE',
      urgency: 'MEDIUM',
      learnerState: {
        engagement: 'ACTIVE',
        streak: 'STREAK_SAFE',
        performance: 'STABLE',
        course: 'IN_PROGRESS',
      },
      facts: {
        streakDays: 5,
        longestStreak: 10,
        freezesAvailable: 0,
        dailyGoalXp: 20,
        todayXp: 0,
        todayLessons: 0,
        weeklyLessons: 3,
        weeklyGoal: 300,
        courseProgressPct: 40,
        courseTitle: 'Digital Marketing',
        hoursUntilLocalMidnight: 5,
        daysSinceLastActivity: 0,
      },
      recommendedAction: 'COMPLETE_LESSON',
      target: { type: 'HOME' },
      tone: 'ENCOURAGING',
      teyState: 'REMINDER',
      ignoredNudgeStreak: 0,
      ...overrides,
    }) as unknown as TeyContext;

  beforeEach(() => {
    prisma = {
      teyDelivery: {
        create: jest.fn().mockResolvedValue({ id: 'delivery-1' }),
        update: jest.fn().mockResolvedValue({}),
      },
      teyNotificationPrefs: {
        findUnique: jest.fn().mockResolvedValue({ whatsappEnabled: true }),
      },
    };
    policy = { check: jest.fn().mockResolvedValue({ allow: true }) };
    push = { send: jest.fn().mockResolvedValue({ status: 'SENT' }) };
    inApp = { send: jest.fn().mockResolvedValue({ status: 'SENT' }) };
    whatsapp = {
      isAvailableFor: jest.fn().mockResolvedValue(true),
      send: jest.fn().mockResolvedValue({ status: 'SENT', providerMessageId: 'wamid.1' }),
    };
    ai = { generateNudgeCopy: jest.fn().mockResolvedValue({ copy: null, fallbackReason: 'not eligible' }) };

    service = new TeyDeliveryService(
      prisma as unknown as PrismaService,
      policy as unknown as TeyPolicyService,
      push as unknown as PushChannel,
      inApp as unknown as InAppChannel,
      whatsapp as unknown as WhatsAppChannel,
      ai as unknown as TeyAiService,
    );
  });

  describe('shouldAlsoSendWhatsApp gating', () => {
    it('does not attempt WhatsApp for a routine DAILY_GOAL_INCOMPLETE/MEDIUM nudge', async () => {
      await service.deliver(USER_ID, baseCtx(), NOW);
      expect(whatsapp.isAvailableFor).not.toHaveBeenCalled();
      expect(whatsapp.send).not.toHaveBeenCalled();
      // Only one TeyDelivery row created (the PUSH one).
      expect(prisma.teyDelivery.create).toHaveBeenCalledTimes(1);
    });

    it('sends WhatsApp for CRITICAL urgency', async () => {
      await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      expect(whatsapp.send).toHaveBeenCalledTimes(1);
    });

    it('sends WhatsApp for STREAK_CRITICAL', async () => {
      await service.deliver(USER_ID, baseCtx({ reason: 'STREAK_CRITICAL' }), NOW);
      expect(whatsapp.send).toHaveBeenCalledTimes(1);
    });

    it('sends WhatsApp for INACTIVE_RETURN', async () => {
      await service.deliver(USER_ID, baseCtx({ reason: 'INACTIVE_RETURN' }), NOW);
      expect(whatsapp.send).toHaveBeenCalledTimes(1);
    });

    it('does not send WhatsApp when the user has not opted in', async () => {
      prisma.teyNotificationPrefs.findUnique.mockResolvedValue({ whatsappEnabled: false });
      await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      expect(whatsapp.send).not.toHaveBeenCalled();
    });

    it('does not send WhatsApp when the channel reports unavailable', async () => {
      whatsapp.isAvailableFor.mockResolvedValue(false);
      await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      expect(whatsapp.send).not.toHaveBeenCalled();
    });
  });

  describe('WhatsApp send behaviour', () => {
    it('writes a second TeyDelivery row with channel WHATSAPP', async () => {
      await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);

      const calls = prisma.teyDelivery.create.mock.calls;
      expect(calls).toHaveLength(2);
      expect(calls[0][0].data.channel).toBe('PUSH');
      expect(calls[1][0].data.channel).toBe('WHATSAPP');
    });

    it('updates the WhatsApp row with the provider message id on success', async () => {
      await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      expect(prisma.teyDelivery.update).toHaveBeenCalledWith({
        where: { id: 'delivery-1' },
        data: { status: 'SENT', providerMessageId: 'wamid.1' },
      });
    });

    it('marks the WhatsApp row FAILED without throwing when the channel fails', async () => {
      whatsapp.send.mockResolvedValue({ status: 'FAILED', error: 'down' });
      const outcome = await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      // Push still succeeded — the overall outcome is unaffected by WhatsApp.
      expect(outcome.sent).toBe(true);
    });

    it('never lets a WhatsApp exception affect the Push-path return value', async () => {
      whatsapp.isAvailableFor.mockRejectedValue(new Error('db down'));
      const outcome = await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      expect(outcome.sent).toBe(true);
      expect(outcome.deliveryId).toBe('delivery-1');
    });

    it('still attempts WhatsApp even when the Push send itself failed', async () => {
      push.send.mockResolvedValue({ status: 'FAILED' });
      const outcome = await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      expect(outcome.sent).toBe(false);
      expect(whatsapp.send).toHaveBeenCalledTimes(1);
    });
  });

  describe('policy denial', () => {
    it('never attempts WhatsApp when the policy gate denies the nudge', async () => {
      policy.check.mockResolvedValue({ allow: false, reason: 'QUIET_HOURS' });
      const outcome = await service.deliver(USER_ID, baseCtx({ urgency: 'CRITICAL' }), NOW);
      expect(outcome.sent).toBe(false);
      expect(whatsapp.send).not.toHaveBeenCalled();
    });
  });
});
