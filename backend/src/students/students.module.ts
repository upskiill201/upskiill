import { Module } from '@nestjs/common';
import { AnalyticsModule } from '../analytics/analytics.module';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [AnalyticsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
