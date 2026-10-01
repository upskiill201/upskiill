import { Prisma } from '@prisma/client';
import { EmailLogService } from './email-log.service';
import { EmailCategory } from './types';

function uniqueViolation() {
  return new Prisma.PrismaClientKnownRequestError('duplicate', {
    code: 'P2002',
    clientVersion: 'test',
  });
}

describe('EmailLogService — idempotency', () => {
  let prisma: {
    emailLog: { create: jest.Mock; update: jest.Mock; updateMany: jest.Mock };
  };
  let service: EmailLogService;

  beforeEach(() => {
    prisma = {
      emailLog: { create: jest.fn(), update: jest.fn(), updateMany: jest.fn() },
    };
    service = new EmailLogService(prisma as never);
  });

  const input = {
    userId: 'u1',
    email: 'a@b.com',
    templateKey: 'auth.welcome',
    category: EmailCategory.TRANSACTIONAL,
    idempotencyKey: 'auth.welcome:u1',
  };

  it('reserve() returns the new row id on first insert', async () => {
    prisma.emailLog.create.mockResolvedValue({ id: 'log-1' });
    await expect(service.reserve(input)).resolves.toEqual({ id: 'log-1' });
  });

  it('reserve() returns null (never throws) when the DB unique constraint rejects a duplicate — the real idempotency guarantee', async () => {
    prisma.emailLog.create.mockRejectedValue(uniqueViolation());
    await expect(service.reserve(input)).resolves.toBeNull();
  });

  it('reserve() rethrows any error that is not the unique-constraint violation', async () => {
    prisma.emailLog.create.mockRejectedValue(new Error('connection reset'));
    await expect(service.reserve(input)).rejects.toThrow('connection reset');
  });

  it('markSkipped() swallows a concurrent duplicate insert instead of crashing the caller', async () => {
    prisma.emailLog.create.mockRejectedValue(uniqueViolation());
    await expect(
      service.markSkipped(input, 'UNSUBSCRIBED'),
    ).resolves.toBeUndefined();
  });

  it('webhook handlers are idempotent no-ops when the providerMessageId is unknown (0 rows matched)', async () => {
    prisma.emailLog.updateMany.mockResolvedValue({ count: 0 });
    await expect(service.markDelivered('unknown-id')).resolves.toBeUndefined();
  });
});
