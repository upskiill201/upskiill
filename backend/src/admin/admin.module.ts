import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseModule } from '../course/course.module';
import { CourseReviewModule } from '../course-review/course-review.module';
import { EarningsModule } from '../earnings/earnings.module';
import { CouponsModule } from '../coupons/coupons.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUsersService } from './admin-users.service';
import { AdminCoursesService } from './admin-courses.service';
import { AdminCreatorsService } from './admin-creators.service';
import { AdminPaymentsService } from './admin-payments.service';
import { AdminPayoutsService } from './admin-payouts.service';
import { AdminCouponsService } from './admin-coupons.service';

@Module({
  // CourseModule is imported (not reimplemented) so publish/unpublish reuse
  // CourseService's existing quality-gate validation, CourseReviewModule so
  // review decisions reuse CourseReviewService, EarningsModule so the
  // creators Earnings tab and the Payments/Payouts modules all reuse
  // EarningsService (getAdminCreatorLedger, transitionPayout,
  // revealPayoutDetails) instead of re-deriving financial logic, and
  // CouponsModule so AdminCouponsService reuses
  // CouponsService.deriveCouponStatus()/getPlatformSettings() rather than
  // re-deriving coupon status — see admin-courses.service.ts,
  // admin-creators.service.ts, admin-payments.service.ts,
  // admin-payouts.service.ts, admin-coupons.service.ts.
  imports: [PrismaModule, CourseModule, CourseReviewModule, EarningsModule, CouponsModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminUsersService,
    AdminCoursesService,
    AdminCreatorsService,
    AdminPaymentsService,
    AdminPayoutsService,
    AdminCouponsService,
  ],
})
export class AdminModule {}
