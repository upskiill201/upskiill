import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

/**
 * Like AuthGuard('jwt') but ANONYMOUS-FRIENDLY: requests with no token (or an
 * expired one) pass through with `req.user` left undefined instead of
 * receiving a 401.
 *
 * Used on public catalog/learning endpoints that personalise their response
 * when a session happens to be present (e.g. hiding draft lessons from
 * students but showing them to the owning creator) without ever requiring a
 * login to browse.
 */
@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await super.canActivate(context);
    } catch {
      // No/invalid token → continue as guest. Routes must tolerate
      // `req.user === undefined`.
      return true;
    }
    return true;
  }
}
