import { Test } from '@nestjs/testing';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { TeyActivityService } from './tey-activity.service';
import { IngestEventDto, IngestEventsDto } from './dto/ingest-events.dto';
import { MAX_EVENT_BACKDATE_MS } from '../contracts/tey-event.types';

describe('TeyActivityService', () => {
  let service: TeyActivityService;
  let prisma: { teyActivityEvent: { createMany: jest.Mock; findMany: jest.Mock } };

  beforeEach(async () => {
    prisma = {
      teyActivityEvent: {
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
        findMany: jest.fn().mockResolvedValue([]),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TeyActivityService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = moduleRef.get(TeyActivityService);
  });

  it('is a no-op for an empty batch', async () => {
    await expect(service.record([])).resolves.toBe(0);
    expect(prisma.teyActivityEvent.createMany).not.toHaveBeenCalled();
  });

  it('relies on skipDuplicates so a re-flushed batch costs nothing', async () => {
    // Idempotency is delegated to the partial unique index on idempotencyKey.
    // If this flag were dropped, a client retry would throw instead of no-op.
    await service.record([
      {
        userId: 'u1',
        eventType: 'app_opened',
        source: 'CLIENT',
        idempotencyKey: 'u1:abc',
        occurredAt: new Date(),
      },
    ]);

    expect(prisma.teyActivityEvent.createMany).toHaveBeenCalledWith(
      expect.objectContaining({ skipDuplicates: true }),
    );
  });

  it('reports only rows actually inserted, so duplicates are not counted', async () => {
    prisma.teyActivityEvent.createMany.mockResolvedValue({ count: 0 });
    const accepted = await service.record([
      {
        userId: 'u1',
        eventType: 'app_opened',
        source: 'CLIENT',
        occurredAt: new Date(),
      },
    ]);
    expect(accepted).toBe(0);
  });

  describe('occurredAt clamping', () => {
    it('pulls a future timestamp back to now', async () => {
      // A device with a wrong clock would otherwise pin a row from 2071 to the
      // top of the [userId, occurredAt DESC] index forever.
      const future = new Date(Date.now() + 365 * 24 * 3600 * 1000);
      await service.record([
        {
          userId: 'u1',
          eventType: 'app_opened',
          source: 'CLIENT',
          occurredAt: future,
        },
      ]);

      const row = prisma.teyActivityEvent.createMany.mock.calls[0][0].data[0];
      expect(row.occurredAt.getTime()).toBeLessThanOrEqual(Date.now() + 1000);
    });

    it('floors a timestamp older than the backdate window', async () => {
      const ancient = new Date(Date.now() - 400 * 24 * 3600 * 1000);
      await service.record([
        {
          userId: 'u1',
          eventType: 'app_opened',
          source: 'CLIENT',
          occurredAt: ancient,
        },
      ]);

      const row = prisma.teyActivityEvent.createMany.mock.calls[0][0].data[0];
      const floor = Date.now() - MAX_EVENT_BACKDATE_MS;
      expect(row.occurredAt.getTime()).toBeGreaterThanOrEqual(floor - 1000);
    });

    it('leaves a plausible timestamp alone', async () => {
      const recent = new Date(Date.now() - 60_000);
      await service.record([
        {
          userId: 'u1',
          eventType: 'lesson_opened',
          source: 'CLIENT',
          occurredAt: recent,
        },
      ]);

      const row = prisma.teyActivityEvent.createMany.mock.calls[0][0].data[0];
      expect(row.occurredAt).toEqual(recent);
    });

    it('substitutes now for an unparseable timestamp', async () => {
      await service.record([
        {
          userId: 'u1',
          eventType: 'app_opened',
          source: 'CLIENT',
          occurredAt: new Date('nonsense'),
        },
      ]);

      const row = prisma.teyActivityEvent.createMany.mock.calls[0][0].data[0];
      expect(Number.isNaN(row.occurredAt.getTime())).toBe(false);
    });
  });

  it('swallows database failures -- telemetry must never break its caller', async () => {
    prisma.teyActivityEvent.createMany.mockRejectedValue(new Error('db down'));
    await expect(
      service.record([
        {
          userId: 'u1',
          eventType: 'app_opened',
          source: 'CLIENT',
          occurredAt: new Date(),
        },
      ]),
    ).resolves.toBe(0);
  });

  it('bounds the habit-model lookback instead of walking full history', async () => {
    await service.recentCompletionHours('u1');
    expect(prisma.teyActivityEvent.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 20 }),
    );
  });
});

describe('IngestEventsDto (the client/server security boundary)', () => {
  const validEvent = {
    type: 'lesson_opened',
    occurredAt: new Date().toISOString(),
    idempotencyKey: 'abcdefgh1234',
  };

  const validateDto = async (payload: unknown) =>
    validate(plainToInstance(IngestEventsDto, payload), {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

  it('accepts the client-observable event types', async () => {
    const errors = await validateDto({ events: [validEvent] });
    expect(errors).toHaveLength(0);
  });

  it.each([
    'lesson_completed',
    'streak_extended',
    'daily_goal_completed',
    'course_enrolled',
    'user_signed_up',
  ])('rejects the server-authoritative type %s', async (type) => {
    // This is the point of the allowlist: accepting these from a browser would
    // let anyone forge progress, XP, and streaks.
    const errors = await validateDto({ events: [{ ...validEvent, type }] });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects an unknown event type', async () => {
    const errors = await validateDto({
      events: [{ ...validEvent, type: 'definitely_not_real' }],
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects a batch above the ceiling', async () => {
    const errors = await validateDto({
      events: Array.from({ length: 51 }, () => validEvent),
    });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('accepts a batch at exactly the ceiling', async () => {
    const errors = await validateDto({
      events: Array.from({ length: 50 }, () => validEvent),
    });
    expect(errors).toHaveLength(0);
  });

  it('rejects an empty batch', async () => {
    const errors = await validateDto({ events: [] });
    expect(errors.length).toBeGreaterThan(0);
  });

  it('requires a usable idempotency key', async () => {
    const errors = await validate(
      plainToInstance(IngestEventDto, { ...validEvent, idempotencyKey: 'abc' }),
    );
    expect(errors.length).toBeGreaterThan(0);
  });

  it('rejects a non-ISO timestamp', async () => {
    const errors = await validate(
      plainToInstance(IngestEventDto, { ...validEvent, occurredAt: 'yesterday' }),
    );
    expect(errors.length).toBeGreaterThan(0);
  });
});
