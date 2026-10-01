import { Module } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { GamificationListener } from './listeners/gamification.listener';
import { MissionsModule } from '../missions/missions.module';
import { MonthlyQuestModule } from '../monthly-quest/monthly-quest.module';
import { ProgressModule } from '../progress/progress.module';
import { ChestModule } from '../chest/chest.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ShopModule } from '../shop/shop.module';
import { StreakModule } from '../streak/streak.module';

@Module({
  imports: [
    MissionsModule,
    MonthlyQuestModule,
    ProgressModule,
    ChestModule,
    PrismaModule,
    // Losing a life first checks for a Perfect Lesson Protection charge.
    ShopModule,
    // Streaks reconcile in one place: StreakService.
    StreakModule,
  ],
  controllers: [GamificationController, AchievementsController],
  providers: [GamificationService, AchievementsService, GamificationListener],
  exports: [GamificationService, AchievementsService],
})
export class GamificationModule {}
