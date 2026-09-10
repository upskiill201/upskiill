import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StreakController } from './streak.controller';
import { StreakService } from './streak.service';

@Module({
  imports: [PrismaModule],
  controllers: [StreakController],
  providers: [StreakService],
  exports: [StreakService],
})
export class StreakModule {}
