import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // Override handleRequest to avoid throwing an exception if the user is missing
  handleRequest(err, user) {
    return user || null;
  }
}
