import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseModule } from '../course/course.module';
import { CourseReviewModule } from '../course-review/course-review.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUsersService } from './admin-users.service';
import { AdminCoursesService } from './admin-courses.service';

@Module({
  // CourseModule is imported (not reimplemented) so publish/unpublish reuse
  // CourseService's existing quality-gate validation, and CourseReviewModule
  // so review decisions reuse CourseReviewService — see
  // admin-courses.service.ts.
  imports: [PrismaModule, CourseModule, CourseReviewModule],
  controllers: [AdminController],
  providers: [AdminService, AdminUsersService, AdminCoursesService],
})
export class AdminModule {}
