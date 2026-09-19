import { Module } from '@nestjs/common';
import { CourseCreationService } from './course-creation.service';
import { CourseModule } from '../course/course.module';
import { LessonModule } from '../lesson/lesson.module';

/**
 * Purely additive: exposes CourseService/LessonService's existing create
 * paths through one composed service, with no controller of its own yet.
 * Future consumers (AI Course Importer, Phase 2+) import this module and
 * inject CourseCreationService rather than reaching into CourseModule/
 * LessonModule directly.
 */
@Module({
  imports: [CourseModule, LessonModule],
  providers: [CourseCreationService],
  exports: [CourseCreationService],
})
export class CourseCreationModule {}
