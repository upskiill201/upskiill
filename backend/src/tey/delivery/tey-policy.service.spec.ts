import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import type { TeyContext } from '../contracts/tey-context.types';
import type { TeyLocalNow } from '../state/local-time.util';
import { TeyPolicyService } from './tey-policy.service';

const at = (hour: number, minute = 0): TeyLocalNow => ({
  date: '2026-09-04',
  minutesOfDay: hour * 60 + minute,
  hour,
  offsetMinutes: -60,
  timezone: 'Africa/Lagos',
});

const ctx = (over: Partial<TeyContext> = {}): TeyContext =>
  ({
    v: 1,
    reason: 'STREAK_AT_RISK',
    urgency: 'HIGH',
    learnerState: {
      engagement: 'ACTIVE',
      streak: 'STREAK_AT_RISK',
      performance: 'STABLE',
      course: 'IN_PROGRESS',
    },
    facts: {
      streakDays: 12,
      longestStreak: 30,
      freezesAvailable: 0,
      dailyGoalXp: 20,
      todayXp: 0,
      todayLessons: 0,
      weeklyLessons: 5,
      weeklyGoal: 300,
      courseProgressPct: 62,
      courseTitle: 'Digital Marketing',
      hoursUntilLocalMidnight: 4,
      daysSinceLastActivity: 1,
    },
    recommendedAction: 'COMPLETE_LESSON',
    target: { type: 'HOME' },
    tone: 'URGENT_PLAYFUL',
    teyState: 'STREAK_AT_RISK',
    ignoredNudgeStreak: 0,
    ...over,
  }) as TeyContext;

describe('TeyPolicyService', () => {
  let service: TeyPolicyService;
  let prisma: any;
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    prisma = {
      teyNotificationPrefs: { findUnique: jest.fn().mockResolvedValue(null) },
      teyDelivery: {
        count: jest.fn().mockResolvedValue(0),
        findFirst: jest.fn().mockResolvedValue(null),
      },
      pushSubscription: { count: jest.fn().mockResolvedValue(1) },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [TeyPolicyService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = moduleRef.get(TeyPolicyService);
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('allows an ordinary evening nudge', async () => {
    await expect(service.check('u1', ctx(), at(20))).resolves.toEqual({
      allow: true,
    });
  });

  it('honours the global kill switch above everything else', async () => {
    process.env.TEY_PUSH_ENABLED = 'false';
    const result = await service.check('u1', ctx(), at(20));
    expect(result).toEqual({ allow: false, reason: 'GLOBALLY_DISABLED' });
    // Cheapest check first: it should not have touched the database at all.
    expect(prisma.teyNotificationPrefs.findUnique).not.toHaveBeenCalled();
  });

  describe('preferences', () => {
    it('respects a learner who turned push off entirely', async () => {
      prisma.teyNotificationPrefs.findUnique.mockResolvedValue({
        pushEnabled: false,
        streakReminders: true,
        dailyReminders: true,
        milestones: true,
        reengagement: true,
        quietHoursStart: 1290,
        quietHoursEnd: 480,
        maxPerDay: 3,
      });
      const result = await service.check('u1', ctx(), at(20));
      expect(result).toEqual({ allow: false, reason: 'PUSH_OPTED_OUT' });
    });

    it('respects a per-category opt-out and names the category', async () => {
      prisma.teyNotificationPrefs.findUnique.mockResolvedValue({
        pushEnabled: true,
        streakReminders: false,
        dailyReminders: true,
        milestones: true,
        reengagement: true,
        quietHoursStart: 1290,
        quietHoursEnd: 480,
        maxPerDay: 3,
      });

      // Streak nudges off, but the daily nudge still allowed.
      await expect(service.check('u1', ctx(), at(20))).resolves.toEqual({
        allow: false,
        reason: 'CATEGORY_OPTED_OUT:streakReminders',
      });
      await expect(
        service.check(
          'u1',
          ctx({ reason: 'DAILY_GOAL_INCOMPLETE', urgency: 'MEDIUM' }),
          at(20),
        ),
      ).resolves.toEqual({ allow: true });
    });

    it('falls back to safe defaults for a learner with no prefs row', async () => {
      prisma.teyNotificationPrefs.findUnique.mockResolvedValue(null);
      await expect(service.check('u1', ctx(), at(20))).resolves.toEqual({
        allow: true,
      });
    });
  });

  describe('quiet hours', () => {
    // Defaults wrap midnight: 21:30 -> 08:00. Getting the wrap backwards would
    // silence the whole day and send only at night.
    it.each([
      ['22:00 — inside the evening half', 22, 0, false],
      ['03:00 — inside the overnight half', 3, 0, false],
      ['07:59 — still quiet', 7, 59, false],
      ['08:00 — window closes', 8, 0, true],
      ['20:00 — well before it opens', 20, 0, true],
      ['21:29 — one minute before', 21, 29, true],
    ])('%s', async (_label, hour, minute, allowed) => {
      const result = await service.check('u1', ctx(), at(hour, minute));
      if (allowed) expect(result.allow).toBe(true);
      else expect(result).toEqual({ allow: false, reason: 'QUIET_HOURS' });
    });

    it('gives a CRITICAL an hour of grace, but not the whole night', async () => {
      // Losing a 40-day streak to a quiet-hours boundary is a bad trade; being
      // woken at 3am is worse.
      const critical = ctx({ reason: 'STREAK_CRITICAL', urgency: 'CRITICAL' });
      await expect(service.check('u1', critical, at(22, 0))).resolves.toEqual({
        allow: true,
      });
      await expect(service.check('u1', critical, at(23, 0))).resolves.toEqual({
        allow: false,
        reason: 'QUIET_HOURS',
      });
    });
  });

  describe('volume', () => {
    it('enforces the daily cap', async () => {
      prisma.teyDelivery.count.mockResolvedValue(3);
      await expect(service.check('u1', ctx(), at(20))).resolves.toEqual({
        allow: false,
        reason: 'DAILY_CAP',
      });
    });

    it('gives a CRITICAL one slot of headroom over the cap', async () => {
      prisma.teyDelivery.count.mockResolvedValue(3);
      await expect(
        service.check(
          'u1',
          ctx({ reason: 'STREAK_CRITICAL', urgency: 'CRITICAL' }),
          at(21),
        ),
      ).resolves.toEqual({ allow: true });
    });

    it('enforces a minimum gap since the last push', async () => {
      prisma.teyDelivery.findFirst.mockResolvedValue({
        sentAt: new Date(Date.now() - 30 * 60_000),
        ruleId: 'DAILY_GOAL_INCOMPLETE',
      });
      await expect(service.check('u1', ctx(), at(20))).resolves.toEqual({
        allow: false,
        reason: 'MIN_GAP',
      });
    });

    it('lets a CRITICAL come closer than an ordinary nudge', async () => {
      prisma.teyDelivery.findFirst
        // last delivery (90 min ago)
        .mockResolvedValueOnce({
          sentAt: new Date(Date.now() - 90 * 60_000),
          ruleId: 'STREAK_AT_RISK',
        })
        // rule-cooldown lookup
        .mockResolvedValueOnce(null);

      await expect(
        service.check(
          'u1',
          ctx({ reason: 'STREAK_CRITICAL', urgency: 'CRITICAL' }),
          at(21),
        ),
      ).resolves.toEqual({ allow: true });
    });

    it('enforces a per-rule cooldown so one reason cannot dominate', async () => {
      prisma.teyDelivery.findFirst
        .mockResolvedValueOnce(null) // no recent delivery at all
        .mockResolvedValueOnce({ id: 'd1' }); // but this rule fired recently

      await expect(service.check('u1', ctx(), at(20))).resolves.toEqual({
        allow: false,
        reason: 'RULE_COOLDOWN',
      });
    });
  });

  it('refuses when there is nowhere to send', async () => {
    prisma.pushSubscription.count.mockResolvedValue(0);
    await expect(service.check('u1', ctx(), at(20))).resolves.toEqual({
      allow: false,
      reason: 'NO_SUBSCRIPTION',
    });
  });

  it('gives every denial a distinct, reportable reason', async () => {
    // The admin dashboard needs to answer "we wanted to nudge 400 people and
    // suppressed 120 — why?". A shared "BLOCKED" reason would make that
    // question unanswerable.
    const reasons = new Set<string>();

    process.env.TEY_PUSH_ENABLED = 'false';
    reasons.add(((await service.check('u1', ctx(), at(20))) as any).reason);
    process.env.TEY_PUSH_ENABLED = 'true';

    reasons.add(((await service.check('u1', ctx(), at(23))) as any).reason);

    prisma.teyDelivery.count.mockResolvedValue(99);
    reasons.add(((await service.check('u1', ctx(), at(20))) as any).reason);

    prisma.teyDelivery.count.mockResolvedValue(0);
    prisma.pushSubscription.count.mockResolvedValue(0);
    reasons.add(((await service.check('u1', ctx(), at(20))) as any).reason);

    expect(reasons.size).toBe(4);
  });
});
