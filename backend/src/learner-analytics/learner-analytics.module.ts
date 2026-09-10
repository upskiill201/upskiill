import { Module } from '@nestjs/common';
import { LearnerAnalyticsController } from './learner-analytics.controller';
import { LearnerAnalyticsService } from './learner-analytics.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LearnerAnalyticsController],
  providers: [LearnerAnalyticsService],
  exports: [LearnerAnalyticsService],
})
export class LearnerAnalyticsModule {}
