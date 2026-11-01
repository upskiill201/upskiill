import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { getJwtSecret } from '../jwt-secret.util';
import { Request } from 'express';

// This strategy's validate() used to run a full `User` findUnique on EVERY
// authenticated request purely to confirm the account still exists — a
// student dashboard load fires ~12 authenticated requests, so that was 12
// extra primary-key lookups + full-row serializations per page view, each
// paying the app<->DB round trip (the Render service and Supabase DB sit in
// different regions). The validated user object is small and short-lived by
// nature (a stale copy self-heals within one TTL window, or immediately on
// the next login), so a short in-process TTL cache is a safe trade: same
// req.user shape for every downstream consumer, ~95% fewer lookups under
// normal traffic where one user fires several requests in quick succession.
const USER_CACHE_TTL_MS = 30_000;
const ACTIVE_STAMP_MS = 5 * 60_000;
type CachedUser = Record<string, unknown>;
// Keyed per session (sub + jti) so a logged-out token can't ride on the
// cached entry of the same user's other, still-valid session.
const userCache = new Map<string, { user: CachedUser; expiresAt: number }>();
const cacheKey = (sub: string, jti?: string) => `${sub}:${jti ?? ''}`;

/** Called on logout so a revoked session stops working this instant. */
export function forgetCachedSession(sub: string, jti?: string): void {
  userCache.delete(cacheKey(sub, jti));
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token as string;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      // Throws at boot when JWT_SECRET is unset — no fallback secret.
      secretOrKey: getJwtSecret(),
    });
  }

  async validate(payload: { sub: string; email: string; jti?: string }) {
    const key = cacheKey(payload.sub, payload.jti);
    const cached = userCache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.user;
    }

    const [user, revoked] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: payload.sub } }),
      payload.jti
        ? this.prisma.revokedSession.findUnique({
            where: { jti: payload.jti },
            select: { jti: true },
          })
        : Promise.resolve(null),
    ]);

    if (revoked) {
      userCache.delete(key);
      throw new UnauthorizedException('This session has ended. Please sign in again.');
    }

    if (!user) {
      userCache.delete(key);
      throw new UnauthorizedException('User no longer exists.');
    }

    // "Last active" for Teyro HQ, the studio and the nudge engine. Nothing
    // else stamps it; at most one write per user per few minutes, off the
    // request path, since a cache miss here happens every 30s at most.
    if (!user.lastActiveAt || Date.now() - user.lastActiveAt.getTime() > ACTIVE_STAMP_MS) {
      void this.prisma.user
        .update({ where: { id: user.id }, data: { lastActiveAt: new Date() } })
        .catch(() => undefined);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    userCache.set(key, { user: result, expiresAt: Date.now() + USER_CACHE_TTL_MS });
    return result;
  }
}
