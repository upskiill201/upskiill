import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AchievementsModule } from '../achievements/achievements.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [PrismaModule, AchievementsModule, GamificationModule],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService],
})
export class HomeModule {}
