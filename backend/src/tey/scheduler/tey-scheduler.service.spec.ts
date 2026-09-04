import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { TeyDecisionService } from '../decision/tey-decision.service';
import { LearnerStateService } from '../state/learner-state.service';
import type { LearnerStateSnapshot } from '../contracts/tey-state.types';
import { TeyActionRepository } from './tey-action.repository';
import { TeySchedulerService } from './tey-scheduler.service';
import { TeyDeliveryService } from '../delivery/tey-delivery.service';

const learner = (
  over: Partial<LearnerStateSnapshot> = {},
): LearnerStateSnapshot => ({
  userId: 'u1',
  streakDays: 12,
  longestStreak: 30,
  lastStreakEarnedAt: new Date('2026-09-03T18:00:00Z'),
  freezesAvailable: 0,
  localDate: '2026-09-04',
  todayXp: 0,
  todayLessons: 0,
  dailyGoalXp: 20,
  todayGoalCompleted: false,
  weeklyLessons: 5,
  weeklyXp: 120,
  streakState: 'STREAK_AT_RISK',
  engagementState: 'ACTIVE',
  courseState: 'IN_PROGRESS',
  performanceState: 'STABLE',
  target: { type: 'LESSON', courseId: 'c1', sectionIndex: 1, lessonId: 'l3' },
  currentCourseId: 'c1',
  currentCourseTitle: 'Digital Marketing',
  currentLessonId: 'l3',
  courseProgressPct: 62,
  usualHourLocal: 19,
  usualHourSamples: 10,
  lastActivityAt: new Date('2026-09-03T18:00:00Z'),
  daysSinceLastActivity: 1,
  consecutiveIgnoredNudges: 0,
  ...over,
});

const dueAction = (over: Record<string, unknown> = {}) => ({
  id: 'a1',
  userId: 'u1',
  ruleId: 'STREAK_AT_RISK',
  priority: 'HIGH',
  status: 'CLAIMED',
  dueAt: new Date(Date.now() - 60_000),
  expiresAt: new Date(Date.now() + 3600_000),
  dedupeKey: 'STREAK_AT_RISK:u1:2026-09-04',
  context: {},
  attempts: 1,
  ...over,
});

describe('TeySchedulerService', () => {
  let service: TeySchedulerService;
  let actions: jest.Mocked<Partial<TeyActionRepository>>;
  let learnerState: { project: jest.Mock; get: jest.Mock };
  let delivery: {
    deliver: jest.Mock;
    recordIgnoredNudge: jest.Mock;
  };
  let prisma: any;
  const originalEnv = { ...process.env };

  beforeEach(async () => {
    actions = {
      claimDue: jest.fn().mockResolvedValue([]),
      reapStaleClaims: jest.fn().mockResolvedValue(0),
      markSkipped: jest.fn().mockResolvedValue(undefined),
      markSent: jest.fn().mockResolvedValue(undefined),
      markFailed: jest.fn().mockResolvedValue(undefined),
      upsertIntent: jest.fn().mockResolvedValue(undefined),
      cancelPending: jest.fn().mockResolvedValue(2),
    } as jest.Mocked<Partial<TeyActionRepository>>;

    learnerState = {
      project: jest.fn().mockResolvedValue(learner()),
      get: jest.fn().mockResolvedValue(learner()),
    };

    delivery = {
      deliver: jest.fn().mockResolvedValue({ sent: true, deliveryId: 'd1' }),
      recordIgnoredNudge: jest.fn().mockResolvedValue(undefined),
    };

    prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          timezone: 'Africa/Lagos',
          timezoneOffsetMinutes: -60,
        }),
      },
      teyDelivery: { create: jest.fn().mockResolvedValue({}) },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TeySchedulerService,
        TeyDecisionService,
        { provide: PrismaService, useValue: prisma },
        { provide: TeyActionRepository, useValue: actions },
        { provide: LearnerStateService, useValue: learnerState },
        { provide: TeyDeliveryService, useValue: delivery },
      ],
    }).compile();

    service = moduleRef.get(TeySchedulerService);
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe('tick', () => {
    it('does nothing when the queue is empty', async () => {
      const summary = await service.tick();
      expect(summary.claimed).toBe(0);
      expect(learnerState.project).not.toHaveBeenCalled();
    });

    it('recovers abandoned claims before taking new work', async () => {
      await service.tick();
      // Ordering matters: reaping after claiming would leave a crashed
      // instance's rows stuck for an extra tick.
      const reapOrder = (actions.reapStaleClaims as jest.Mock).mock
        .invocationCallOrder[0];
      const claimOrder = (actions.claimDue as jest.Mock).mock
        .invocationCallOrder[0];
      expect(reapOrder).toBeLessThan(claimOrder);
    });

    /**
     * The scenario the spec calls mandatory: scheduled at 8pm, learner studies
     * at 9pm, action fires at 10pm. Nothing may be sent.
     */
    it('SKIPS an action the learner has already made moot', async () => {
      (actions.claimDue as jest.Mock).mockResolvedValue([dueAction()]);
      learnerState.project.mockResolvedValue(
        learner({ todayGoalCompleted: true, todayLessons: 1 }),
      );

      const summary = await service.tick();

      expect(actions.markSkipped).toHaveBeenCalledWith(
        'a1',
        'NO_LONGER_RELEVANT',
      );
      expect(actions.markSent).not.toHaveBeenCalled();
      expect(prisma.teyDelivery.create).not.toHaveBeenCalled();
      expect(summary.skipReasons.NO_LONGER_RELEVANT).toBe(1);
    });

    it('re-derives state from source rather than trusting the frozen context', async () => {
      (actions.claimDue as jest.Mock).mockResolvedValue([
        // A context snapshot claiming the streak is still at risk...
        dueAction({ context: { reason: 'STREAK_AT_RISK', urgency: 'HIGH' } }),
      ]);
      // ...contradicted by reality.
      learnerState.project.mockResolvedValue(
        learner({ todayGoalCompleted: true }),
      );

      await service.tick();

      expect(learnerState.project).toHaveBeenCalledWith('u1');
      expect(actions.markSkipped).toHaveBeenCalledWith(
        'a1',
        'NO_LONGER_RELEVANT',
      );
    });

    it('never sends an expired action', async () => {
      (actions.claimDue as jest.Mock).mockResolvedValue([
        dueAction({ expiresAt: new Date(Date.now() - 1000) }),
      ]);

      await service.tick();

      expect(actions.markSkipped).toHaveBeenCalledWith('a1', 'EXPIRED');
      // Expiry short-circuits before any work is done.
      expect(learnerState.project).not.toHaveBeenCalled();
    });

    it('records what it would have sent instead of sending, in dry-run', async () => {
      delete process.env.TEY_DELIVERY_ENABLED;
      (actions.claimDue as jest.Mock).mockResolvedValue([dueAction()]);

      const summary = await service.tick();

      expect(prisma.teyDelivery.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            channel: 'DRY_RUN',
            status: 'SUPPRESSED',
            ruleId: 'STREAK_AT_RISK',
          }),
        }),
      );
      expect(actions.markSkipped).toHaveBeenCalledWith('a1', 'DRY_RUN');
      expect(summary.sent).toBe(0);
    });

    it('keeps the batch alive when one action blows up', async () => {
      (actions.claimDue as jest.Mock).mockResolvedValue([
        dueAction({ id: 'bad' }),
        dueAction({ id: 'good', dedupeKey: 'k2' }),
      ]);
      learnerState.project
        .mockRejectedValueOnce(new Error('db blip'))
        .mockResolvedValue(learner());

      const summary = await service.tick();

      expect(summary.failed).toBe(1);
      expect(actions.markFailed).toHaveBeenCalledWith('bad', 1, 'db blip');
      // The second action still ran.
      expect(prisma.teyDelivery.create).toHaveBeenCalledTimes(1);
    });

    it('delivers, and counts the nudge as ignored until it is opened', async () => {
      process.env.TEY_DELIVERY_ENABLED = 'true';
      (actions.claimDue as jest.Mock).mockResolvedValue([dueAction()]);

      const summary = await service.tick();

      expect(delivery.deliver).toHaveBeenCalledWith(
        'u1',
        expect.objectContaining({ reason: 'STREAK_AT_RISK' }),
        expect.anything(),
        'a1',
      );
      expect(actions.markSent).toHaveBeenCalledWith('a1');
      // Escalates tone until markOpened resets it.
      expect(delivery.recordIgnoredNudge).toHaveBeenCalledWith('u1');
      expect(summary.sent).toBe(1);
    });

    it('treats policy suppression as a skip, not a failure', async () => {
      // The nudge was correct; the moment was not. Marking it failed would
      // retry it and defeat the point of the quiet-hours/cap rules.
      process.env.TEY_DELIVERY_ENABLED = 'true';
      (actions.claimDue as jest.Mock).mockResolvedValue([dueAction()]);
      delivery.deliver.mockResolvedValue({ sent: false, skipReason: 'QUIET_HOURS' });

      const summary = await service.tick();

      expect(actions.markSkipped).toHaveBeenCalledWith('a1', 'QUIET_HOURS');
      expect(actions.markSent).not.toHaveBeenCalled();
      expect(summary.skipReasons.QUIET_HOURS).toBe(1);
    });

    it('re-plans while it has fresh state in hand', async () => {
      // This is what keeps the escalation ladder going without a cron sweep.
      (actions.claimDue as jest.Mock).mockResolvedValue([dueAction()]);
      await service.tick();
      expect(actions.upsertIntent).toHaveBeenCalled();
    });
  });

  describe('planFor', () => {
    it('queues the intents the decision engine produced', async () => {
      const count = await service.planFor('u1', learner());
      expect(count).toBeGreaterThan(0);
      expect(actions.upsertIntent).toHaveBeenCalledWith(
        'u1',
        expect.objectContaining({ ruleId: expect.any(String) }),
      );
    });

    it('queues nothing for a learner who is already done today', async () => {
      const count = await service.planFor(
        'u1',
        learner({
          todayGoalCompleted: true,
          todayLessons: 2,
          daysSinceLastActivity: 0,
        }),
      );
      expect(count).toBe(0);
      expect(actions.upsertIntent).not.toHaveBeenCalled();
    });
  });

  describe('cancelFor', () => {
    it('drops every pending nudge for a learner who just studied', async () => {
      await service.cancelFor('u1');
      expect(actions.cancelPending).toHaveBeenCalledWith(
        'u1',
        expect.arrayContaining(['STREAK_AT_RISK', 'STREAK_CRITICAL']),
      );
    });
  });

  describe('gating', () => {
    it('stays out of the queue outside production unless explicitly enabled', async () => {
      process.env.NODE_ENV = 'development';
      delete process.env.TEY_SCHEDULER_ENABLED;

      await service.scheduledTick();

      // A developer running start:dev must not drive the real queue.
      expect(actions.claimDue).not.toHaveBeenCalled();
    });

    it('can be switched on explicitly for local testing', async () => {
      process.env.NODE_ENV = 'development';
      process.env.TEY_SCHEDULER_ENABLED = 'true';

      await service.scheduledTick();

      expect(actions.claimDue).toHaveBeenCalled();
    });

    it('never lets a tick failure escape the cron handler', async () => {
      process.env.TEY_SCHEDULER_ENABLED = 'true';
      (actions.claimDue as jest.Mock).mockRejectedValue(new Error('db down'));

      await expect(service.scheduledTick()).resolves.toBeUndefined();
    });
  });
});
