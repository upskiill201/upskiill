import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CourseReviewModule } from '../course-review/course-review.module';

@Module({
  // CourseReviewModule backs the edit-lock/reopen guard every lesson
  // mutation now runs through — see LessonService#getOwnedLesson.
  imports: [PrismaModule, CourseReviewModule],
  controllers: [LessonController],
  providers: [LessonService],
  // CourseCreationService (course-creation module) composes LessonService's
  // content-save/publish/resource methods alongside CourseService's — needs
  // this exported the same way CourseModule already exports CourseService.
  exports: [LessonService],
})
export class LessonModule {}
