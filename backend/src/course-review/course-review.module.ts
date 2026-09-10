import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationModule } from '../notification/notification.module';
import { CourseReviewService } from './course-review.service';

/**
 * Standalone (not nested inside CourseModule) so both CourseModule
 * (CourseService's edit-lock guard, CourseController's submit-for-review
 * endpoint) and LessonModule (LessonService's edit-lock guard) can import
 * it without a circular dependency between Course and Lesson. AdminModule
 * imports it too, for the review-decision actions.
 */
@Module({
  imports: [PrismaModule, NotificationModule],
  providers: [CourseReviewService],
  exports: [CourseReviewService],
})
export class CourseReviewModule {}
