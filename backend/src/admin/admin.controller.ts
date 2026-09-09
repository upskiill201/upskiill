import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AdminService } from './admin.service';

/**
 * Teyro Admin Center — platform-wide root.
 *
 * Distinct from tey/admin (the notification control room): this controller
 * is the seed of the general business admin surface (users, courses,
 * creators, payments, ...) that later phases add to.
 *
 * The class-level @Roles is load-bearing: RolesGuard returns TRUE when no
 * @Roles metadata is present (roles.guard.ts), so a controller that forgets
 * it is open to every logged-in student. A spec asserts this decorator
 * exists — see admin.controller.spec.ts.
 */
@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('summary')
  summary() {
    return this.admin.summary();
  }
}
