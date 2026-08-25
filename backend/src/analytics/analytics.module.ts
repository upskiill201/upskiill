import { Module } from '@nestjs/common';
import { AnalyticsController, AnalyticsInstructorController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  controllers: [AnalyticsController, AnalyticsInstructorController],
  providers: [AnalyticsService],
  // Exported for sibling product modules (Students) that build on the same
  // privacy-projected learner dataset instead of duplicating it.
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
