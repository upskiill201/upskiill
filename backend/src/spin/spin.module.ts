import { Module } from '@nestjs/common';
import { SpinController } from './spin.controller';
import { SpinService } from './spin.service';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [GamificationModule],
  controllers: [SpinController],
  providers: [SpinService],
  exports: [SpinService],
})
export class SpinModule {}
