import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JWT guard that authenticates when a token is present but ALLOWS anonymous
 * access otherwise (request.user = null instead of 401).
 *
 * Used by WhatsApp OTP endpoints: onboarding users verify their number at
 * Step 6, before Google sign-in at Step 12. Abuse is contained per-phone in
 * the service layer + IP throttling, not by requiring auth.
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    // No token / invalid token → proceed unauthenticated rather than throwing.
    if (err || !user) return null;
    return user;
  }
}
