import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AdminService } from './admin.service';
import { AdminUsersService, type ListUsersQuery } from './admin-users.service';
import {
  AdminCoursesService,
  type ListCoursesQuery,
} from './admin-courses.service';

interface AuthedUser {
  id: string;
}

/**
 * Teyro Admin Center — platform-wide root.
 *
 * Distinct from tey/admin (the notification control room): this controller
 * is the general business admin surface (users, courses, creators,
 * payments, ...) that each phase adds to.
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
  constructor(
    private readonly admin: AdminService,
    private readonly adminUsers: AdminUsersService,
    private readonly adminCourses: AdminCoursesService,
  ) {}

  @Get('summary')
  summary() {
    return this.admin.summary();
  }

  // ── Users ────────────────────────────────────────────────────────────

  @Get('users')
  listUsers(@Query() query: ListUsersQuery) {
    return this.adminUsers.list(query);
  }

  @Get('users/:id')
  userDetail(@Param('id') id: string) {
    return this.adminUsers.detail(id);
  }

  @Post('users/:id/suspend')
  suspendUser(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminUsers.suspend(actor.id, id, body.reason);
  }

  @Post('users/:id/unsuspend')
  unsuspendUser(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    return this.adminUsers.unsuspend(actor.id, id, body.reason);
  }

  @Post('users/:id/unlock')
  unlockUser(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    return this.adminUsers.unlock(actor.id, id, body.reason);
  }

  // ── Courses ──────────────────────────────────────────────────────────

  @Get('courses')
  listCourses(@Query() query: ListCoursesQuery) {
    return this.adminCourses.list(query);
  }

  @Get('courses/:id')
  courseDetail(@Param('id') id: string) {
    return this.adminCourses.detail(id);
  }

  @Post('courses/:id/publish')
  publishCourse(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminCourses.publish(actor.id, id);
  }

  @Post('courses/:id/unpublish')
  unpublishCourse(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminCourses.unpublish(actor.id, id);
  }

  @Post('courses/:id/feature')
  featureCourse(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminCourses.feature(actor.id, id);
  }

  @Post('courses/:id/unfeature')
  unfeatureCourse(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminCourses.unfeature(actor.id, id);
  }
}
