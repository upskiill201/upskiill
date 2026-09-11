import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseModule } from '../course/course.module';
import { CourseReviewModule } from '../course-review/course-review.module';
import { EarningsModule } from '../earnings/earnings.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUsersService } from './admin-users.service';
import { AdminCoursesService } from './admin-courses.service';
import { AdminCreatorsService } from './admin-creators.service';

@Module({
  // CourseModule is imported (not reimplemented) so publish/unpublish reuse
  // CourseService's existing quality-gate validation, CourseReviewModule so
  // review decisions reuse CourseReviewService, and EarningsModule so the
  // creators Earnings tab reuses EarningsService#getAdminCreatorLedger
  // instead of re-deriving financial totals — see admin-courses.service.ts
  // and admin-creators.service.ts.
  imports: [PrismaModule, CourseModule, CourseReviewModule, EarningsModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminUsersService,
    AdminCoursesService,
    AdminCreatorsService,
  ],
})
export class AdminModule {}
