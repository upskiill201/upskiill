import { ConflictException } from '@nestjs/common';
import { PeopleService } from './people.service';

const DAY = 86_400_000;
const now = Date.now();

function row(over: Record<string, unknown>) {
  return {
    id: 'x',
    fullName: 'Someone',
    avatar: null,
    timezone: null,
    timezoneOffsetMinutes: -60,
    courseId: 'c1',
    courseTitle: 'Python',
    createdAt: new Date(now - 30 * DAY),
    myCreatedAt: new Date(now - 2 * DAY),
    progress: 80,
    myProgress: 10,
    lastActiveAt: new Date(now - 20 * DAY),
    preferredHour: null,
    buddyCount: 0,
    ...over,
  };
}

describe('PeopleService.findMatch', () => {
  const setup = (rows: unknown[]) => {
    const prisma = {
      user: { findUnique: jest.fn().mockResolvedValue({ timezone: null, timezoneOffsetMinutes: -60 }) },
      teyNotificationPrefs: { findUnique: jest.fn().mockResolvedValue({ preferredHour: 19 }) },
      $queryRaw: jest.fn().mockResolvedValue(rows),
    };
    const buddies = { request: jest.fn().mockResolvedValue({ status: 'OUTGOING', streakTogether: 0 }) };
    return { service: new PeopleService(prisma as never, buddies as never), buddies };
  };

  it('asks the classmate who started the same week, at the same pace, and is active', async () => {
    const { service, buddies } = setup([
      row({ id: 'quiet-expert', fullName: 'Quiet Expert' }),
      row({
        id: 'ideal',
        fullName: 'Ideal Match',
        createdAt: new Date(now - 3 * DAY),
        progress: 15,
        lastActiveAt: new Date(now - 1 * DAY),
        preferredHour: 20,
      }),
      row({ id: 'full', fullName: 'Full Up', createdAt: new Date(now - 3 * DAY), progress: 12, lastActiveAt: new Date(now), buddyCount: 5 }),
    ]);
    const res = await service.findMatch('me');
    expect(buddies.request).toHaveBeenCalledWith('me', 'ideal', 'c1');
    expect(res.reasons).toEqual(expect.arrayContaining(['started the same week as you', 'at your pace', 'learning this week']));
  });

  it('says so when there is nobody to match', async () => {
    const { service, buddies } = setup([row({ id: 'full', buddyCount: 5 })]);
    await expect(service.findMatch('me')).rejects.toBeInstanceOf(ConflictException);
    expect(buddies.request).not.toHaveBeenCalled();
  });
});
