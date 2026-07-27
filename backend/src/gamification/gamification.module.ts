import { Module } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { GamificationListener } from './listeners/gamification.listener';

@Module({
  controllers: [GamificationController, AchievementsController],
  providers: [GamificationService, AchievementsService, GamificationListener],
  exports: [GamificationService, AchievementsService],
})
export class GamificationModule {}

