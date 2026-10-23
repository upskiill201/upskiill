import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProAccessModule } from '../pro/pro-access.module';
import { StreakController } from './streak.controller';
import { StreakService } from './streak.service';

@Module({
  // Pro learners get a free streak repair.
  imports: [PrismaModule, ProAccessModule],
  controllers: [StreakController],
  providers: [StreakService],
  exports: [StreakService],
})
export class StreakModule {}
