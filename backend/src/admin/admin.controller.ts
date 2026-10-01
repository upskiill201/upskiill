import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SiteSettingsService } from '../site/site-settings.service';
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
import {
  AdminCreatorsService,
  type ListCreatorsQuery,
} from './admin-creators.service';
import {
  AdminPaymentsService,
  type ListTransactionsQuery,
  type PaymentsOverviewQuery,
} from './admin-payments.service';
import {
  AdminPayoutsService,
  type ListPayoutsQuery,
} from './admin-payouts.service';
import {
  AdminCouponsService,
  type ListCouponsQuery,
} from './admin-coupons.service';
import { AdminInsightsService, toRange } from './admin-insights.service';

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
    private readonly adminCreators: AdminCreatorsService,
    private readonly adminPayments: AdminPaymentsService,
    private readonly adminPayouts: AdminPayoutsService,
    private readonly adminCoupons: AdminCouponsService,
    private readonly insights: AdminInsightsService,
    private readonly site: SiteSettingsService,
  ) {}

  @Get('summary')
  summary() {
    return this.admin.summary();
  }

  // ── Teyro HQ insights ────────────────────────────────────────────────

  @Get('insights/badges')
  insightBadges() {
    return this.insights.badges();
  }

  @Get('insights/overview')
  insightOverview(@Query('range') range?: string) {
    return this.insights.overview(toRange(range));
  }

  @Get('insights/learning')
  insightLearning(@Query('range') range?: string) {
    return this.insights.learning(toRange(range));
  }

  @Get('insights/creators')
  insightCreators(@Query('range') range?: string) {
    return this.insights.creators(toRange(range));
  }

  @Get('insights/subscribers')
  insightSubscribers(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('range') range?: string,
  ) {
    return this.insights.subscribers({
      status,
      search: search?.slice(0, 120),
      page: page ? Math.max(1, parseInt(page, 10) || 1) : 1,
      range: toRange(range),
    });
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

  @Get('courses/:courseId/lessons/:lessonId')
  courseLessonContent(
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.adminCourses.getLessonContent(courseId, lessonId);
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

  // ── Course review ────────────────────────────────────────────────────

  @Post('courses/:id/review/start')
  startCourseReview(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminCourses.startReview(actor.id, id);
  }

  @Post('courses/:id/review/request-changes')
  requestCourseChanges(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { feedback: string; internalNote?: string },
  ) {
    return this.adminCourses.requestChanges(
      actor.id,
      id,
      body.feedback,
      body.internalNote,
    );
  }

  @Post('courses/:id/review/approve')
  approveCourseReview(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { internalNote?: string },
  ) {
    return this.adminCourses.approveReview(actor.id, id, body?.internalNote);
  }

  @Post('courses/:id/review/reject')
  rejectCourseReview(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason: string; internalNote?: string },
  ) {
    return this.adminCourses.rejectReview(
      actor.id,
      id,
      body.reason,
      body.internalNote,
    );
  }

  // ── Creators ─────────────────────────────────────────────────────────
  // Suspend/unsuspend a creator reuses POST /admin/users/:id/suspend directly
  // — there is no separate creator-suspend endpoint, by design (see
  // admin-creators.service.ts header comment).

  @Get('creators/summary')
  creatorsSummary() {
    return this.adminCreators.summary();
  }

  @Get('creators')
  listCreators(@Query() query: ListCreatorsQuery) {
    return this.adminCreators.list(query);
  }

  @Get('creators/:id')
  creatorDetail(@Param('id') id: string) {
    return this.adminCreators.detail(id);
  }

  @Post('creators/:id/verify')
  verifyCreator(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    return this.adminCreators.verify(actor.id, id, body?.reason);
  }

  @Post('creators/:id/unverify')
  unverifyCreator(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    return this.adminCreators.unverify(actor.id, id, body?.reason);
  }

  // ── Payments ─────────────────────────────────────────────────────────
  // Read-only: no refund action exists here on purpose — see
  // admin-payments.service.ts header comment.

  @Get('payments/overview')
  paymentsOverview(@Query() query: PaymentsOverviewQuery) {
    return this.adminPayments.overview(query);
  }

  @Get('payments/transactions')
  listTransactions(@Query() query: ListTransactionsQuery) {
    return this.adminPayments.list(query);
  }

  @Get('payments/transactions/:id')
  transactionDetail(@Param('id') id: string) {
    return this.adminPayments.detail(id);
  }

  // ── Payouts ──────────────────────────────────────────────────────────
  // Every mutation below is a thin pass-through to
  // EarningsService#transitionPayout — see admin-payouts.service.ts.

  @Get('payouts/overview')
  payoutsOverview() {
    return this.adminPayouts.overview();
  }

  @Get('payouts')
  listPayouts(@Query() query: ListPayoutsQuery) {
    return this.adminPayouts.list(query);
  }

  @Get('payouts/:id')
  payoutDetail(@Param('id') id: string) {
    return this.adminPayouts.detail(id);
  }

  @Post('payouts/:id/review')
  reviewPayout(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminPayouts.review(actor.id, id);
  }

  @Post('payouts/:id/approve')
  approvePayout(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminPayouts.approve(actor.id, id);
  }

  @Post('payouts/:id/reject')
  rejectPayout(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminPayouts.reject(actor.id, id, body.reason);
  }

  @Post('payouts/:id/mark-paid')
  markPayoutPaid(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { externalReference?: string },
  ) {
    return this.adminPayouts.markPaid(actor.id, id, body?.externalReference);
  }

  @Post('payouts/:id/fail')
  failPayout(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminPayouts.fail(actor.id, id, body.reason);
  }

  @Post('payouts/:id/cancel')
  cancelPayout(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminPayouts.cancel(actor.id, id, body.reason);
  }

  @Post('payouts/:id/reveal-method')
  revealPayoutMethod(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminPayouts.revealMethod(actor.id, id);
  }

  // ── Coupons & Discounts ──────────────────────────────────────────────

  @Get('coupons')
  listCoupons(@Query() query: ListCouponsQuery) {
    return this.adminCoupons.list(query);
  }

  @Get('coupons/analytics')
  couponAnalytics() {
    return this.adminCoupons.analytics();
  }

  @Get('coupons/:id')
  couponDetail(@Param('id') id: string) {
    return this.adminCoupons.detail(id);
  }

  @Post('coupons/:id/disable')
  disableCoupon(
    @GetUser() actor: AuthedUser,
    @Param('id') id: string,
    @Body() body: { reason: string },
  ) {
    return this.adminCoupons.disable(actor.id, id, body.reason);
  }

  @Post('coupons/:id/pause')
  pauseCoupon(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminCoupons.pause(actor.id, id);
  }

  @Post('coupons/:id/archive')
  archiveCoupon(@GetUser() actor: AuthedUser, @Param('id') id: string) {
    return this.adminCoupons.archive(actor.id, id);
  }

  @Get('settings/intro-video')
  getIntroVideo() {
    return this.site.getIntroVideoAdmin();
  }

  @Patch('settings/intro-video')
  setIntroVideo(@GetUser() actor: AuthedUser, @Body() body: { url?: string | null }) {
    return this.site.setIntroVideo(actor.id, body?.url);
  }

  @Get('settings/coupons')
  getCouponSettings() {
    return this.adminCoupons.getSettings();
  }

  @Patch('settings/coupons')
  updateCouponSettings(
    @GetUser() actor: AuthedUser,
    @Body()
    body: {
      couponsEnabled?: boolean;
      maxDiscountPercent?: number;
      maxActiveCouponsPerCreator?: number;
      allowFixedAmountDiscounts?: boolean;
      allowUnlimitedRedemptions?: boolean;
      allowFreeCoupons?: boolean;
    },
  ) {
    return this.adminCoupons.updateSettings(actor.id, body);
  }
}
