import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { emailConfig } from './email.config';

export type UnsubscribeScope =
  | 'ALL'
  | 'MARKETING'
  | 'STREAK'
  | 'DIGEST'
  | 'LEAGUE'
  | 'REENGAGEMENT';

interface UnsubscribeTokenPayload {
  userId: string;
  scope: UnsubscribeScope;
  /** Unix seconds. Unsubscribe links don't need to expire for usability
   *  reasons (an old email should always be able to opt the reader out),
   *  but we still cap it generously to bound token lifetime. */
  exp: number;
}

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 365; // 1 year

/**
 * Stateless signed tokens (HMAC-SHA256) — no DB table needed for
 * unsubscribe links, matching the "don't add infrastructure that isn't
 * needed" guidance. The signature is the only thing standing between a
 * tampered token and someone else's preferences, so verify() is
 * constant-time and never trusts an unverified payload.
 */
@Injectable()
export class EmailUnsubscribeService {
  private sign(payloadB64: string): string {
    return crypto
      .createHmac('sha256', emailConfig.unsubscribeSecret)
      .update(payloadB64)
      .digest('base64url');
  }

  generateToken(userId: string, scope: UnsubscribeScope): string {
    const payload: UnsubscribeTokenPayload = {
      userId,
      scope,
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    };
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString(
      'base64url',
    );
    const sig = this.sign(payloadB64);
    return `${payloadB64}.${sig}`;
  }

  verifyToken(token: string): UnsubscribeTokenPayload | null {
    const [payloadB64, sig] = token.split('.');
    if (!payloadB64 || !sig) return null;

    const expectedSig = this.sign(payloadB64);
    const a = Buffer.from(sig);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    try {
      const payload = JSON.parse(
        Buffer.from(payloadB64, 'base64url').toString('utf8'),
      ) as UnsubscribeTokenPayload;
      if (!payload.userId || !payload.scope) return null;
      if (payload.exp < Math.floor(Date.now() / 1000)) return null;
      return payload;
    } catch {
      return null;
    }
  }

  buildUnsubscribeUrl(userId: string, scope: UnsubscribeScope = 'ALL'): string {
    const token = this.generateToken(userId, scope);
    return `${emailConfig.appUrl}/api/email/unsubscribe?token=${encodeURIComponent(token)}`;
  }

  buildPreferencesUrl(userId: string): string {
    const token = this.generateToken(userId, 'ALL');
    return `${emailConfig.appUrl}/api/email/preferences?token=${encodeURIComponent(token)}`;
  }
}
