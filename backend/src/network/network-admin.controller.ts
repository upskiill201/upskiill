import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { NetworkAdminService } from './network-admin.service';

/**
 * Teyro HQ → Network. The class-level @Roles is load-bearing: RolesGuard
 * returns TRUE when no @Roles metadata is present, so a controller without it
 * would be open to every logged-in learner (see tey-admin.controller.ts).
 */
@Controller('network/admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class NetworkAdminController {
  constructor(private readonly admin: NetworkAdminService) {}

  @Get('overview')
  overview() {
    return this.admin.overview();
  }

  /** Retrain the feed ranking now (it also runs every Monday). */
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  @Post('retrain')
  retrain() {
    return this.admin.retrain();
  }
}
