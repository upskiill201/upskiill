import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GamificationModule } from '../gamification/gamification.module';
import { MissionsModule } from '../missions/missions.module';
import { ChestModule } from '../chest/chest.module';
import { ProgressModule } from '../progress/progress.module';
import { SpinModule } from '../spin/spin.module';

@Module({
  imports: [
    PrismaModule,
    GamificationModule,
    MissionsModule,
    ChestModule,
    ProgressModule,
    SpinModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService],
})
export class HomeModule {}
