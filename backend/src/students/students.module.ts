import { Module } from '@nestjs/common';
import { AnalyticsModule } from '../analytics/analytics.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { NudgesService } from './nudges.service';
import { NotificationModule } from '../notification/notification.module';
import { TeyModule } from '../tey/tey.module';

@Module({
  imports: [AnalyticsModule, NotificationModule, TeyModule],
  controllers: [StudentsController],
  providers: [StudentsService, NudgesService],
})
export class StudentsModule {}
