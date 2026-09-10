import { Module } from '@nestjs/common';
import { MonthlyQuestController } from './monthly-quest.controller';
import { MonthlyQuestService } from './monthly-quest.service';

@Module({
  controllers: [MonthlyQuestController],
  providers: [MonthlyQuestService],
  exports: [MonthlyQuestService],
})
export class MonthlyQuestModule {}
