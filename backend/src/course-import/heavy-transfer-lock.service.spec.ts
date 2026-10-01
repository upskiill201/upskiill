import { HeavyTransferLockService } from './heavy-transfer-lock.service';

describe('HeavyTransferLockService', () => {
  it('grants the lock when free, and refuses a second caller until released', () => {
    const lock = new HeavyTransferLockService();

    expect(lock.tryAcquire()).toBe(true);
    expect(lock.tryAcquire()).toBe(false); // e.g. the other processor's tick

    lock.release();

    expect(lock.tryAcquire()).toBe(true);
  });
});
