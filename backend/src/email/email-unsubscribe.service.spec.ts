import * as crypto from 'crypto';
import { EmailUnsubscribeService } from './email-unsubscribe.service';

describe('EmailUnsubscribeService', () => {
  let service: EmailUnsubscribeService;

  beforeEach(() => {
    process.env.EMAIL_UNSUBSCRIBE_SECRET = 'test-secret-value';
    service = new EmailUnsubscribeService();
  });

  it('round-trips userId and scope through a generated token', () => {
    const token = service.generateToken('user-42', 'STREAK');
    const payload = service.verifyToken(token);
    expect(payload).toEqual(
      expect.objectContaining({ userId: 'user-42', scope: 'STREAK' }),
    );
  });

  it('rejects a token whose payload was tampered with (userId swapped) without matching signature', () => {
    const tokenForVictim = service.generateToken('victim', 'ALL');
    const [payloadB64, sig] = tokenForVictim.split('.');
    const forgedPayload = Buffer.from(
      JSON.stringify({ userId: 'attacker', scope: 'ALL', exp: 9_999_999_999 }),
    ).toString('base64url');
    const forgedToken = `${forgedPayload}.${sig}`;
    expect(service.verifyToken(forgedToken)).toBeNull();
    void payloadB64;
  });

  it('rejects a token signed with a different secret', () => {
    const token = service.generateToken('user-1', 'ALL');
    process.env.EMAIL_UNSUBSCRIBE_SECRET = 'a-different-secret';
    const service2 = new EmailUnsubscribeService();
    expect(service2.verifyToken(token)).toBeNull();
  });

  it('rejects a malformed token', () => {
    expect(service.verifyToken('not-a-real-token')).toBeNull();
    expect(service.verifyToken('')).toBeNull();
  });

  it('rejects an expired token', () => {
    const payload = {
      userId: 'user-1',
      scope: 'ALL',
      exp: Math.floor(Date.now() / 1000) - 10,
    };
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString(
      'base64url',
    );
    const sig = crypto
      .createHmac('sha256', 'test-secret-value')
      .update(payloadB64)
      .digest('base64url');
    expect(service.verifyToken(`${payloadB64}.${sig}`)).toBeNull();
  });
});
