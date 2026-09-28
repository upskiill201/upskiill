import { Module } from '@nestjs/common';
import { AnalyticsController, AnalyticsInstructorController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { CoursePulseService } from './course-pulse.service';
import { StudioHomeService } from './studio-home.service';

@Module({
  controllers: [AnalyticsController, AnalyticsInstructorController],
  providers: [AnalyticsService, CoursePulseService, StudioHomeService],
  // Exported for sibling product modules (Students) that build on the same
  // privacy-projected learner dataset instead of duplicating it.
  exports: [AnalyticsService, CoursePulseService, StudioHomeService],
})
export class AnalyticsModule {}
