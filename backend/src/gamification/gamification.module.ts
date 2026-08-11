import { Module } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { GamificationListener } from './listeners/gamification.listener';
import { MissionsModule } from '../missions/missions.module';
import { ProgressModule } from '../progress/progress.module';
import { ChestModule } from '../chest/chest.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [MissionsModule, ProgressModule, ChestModule, PrismaModule],
  controllers: [GamificationController, AchievementsController],
  providers: [GamificationService, AchievementsService, GamificationListener],
  exports: [GamificationService, AchievementsService],
})
export class GamificationModule {}
