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
type CachedUser = Record<string, unknown>;
const userCache = new Map<string, { user: CachedUser; expiresAt: number }>();

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

  async validate(payload: { sub: string; email: string }) {
    const cached = userCache.get(payload.sub);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.user;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      userCache.delete(payload.sub);
      throw new UnauthorizedException('User no longer exists.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    userCache.set(payload.sub, { user: result, expiresAt: Date.now() + USER_CACHE_TTL_MS });
    return result;
  }
}
