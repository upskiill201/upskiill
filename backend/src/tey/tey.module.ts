import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { StreakModule } from '../streak/streak.module';
import { TeyActivityController } from './activity/tey-activity.controller';
import { TeyActivityService } from './activity/tey-activity.service';
import { TeyListener } from './listeners/tey.listener';
import { LearnerStateService } from './state/learner-state.service';
import { TeyTimezoneService } from './state/timezone.service';
import { TeyController } from './tey.controller';

/**
 * Tey's intelligence layer.
 *
 * Phase 1 -- activity capture and the learner-state projection. Nothing here
 * is user-visible yet: the module ships dark so it starts accumulating
 * timezone and event data, which the decision engine and scheduler need and
 * which takes real calendar time to fill.
 *
 * StreakModule is imported for StreakService, which stays the single source of
 * streak truth. See LearnerStateService for why that matters.
 */
@Module({
  imports: [PrismaModule, StreakModule],
  controllers: [TeyController, TeyActivityController],
  providers: [
    TeyActivityService,
    TeyTimezoneService,
    LearnerStateService,
    TeyListener,
  ],
  exports: [TeyActivityService, LearnerStateService, TeyTimezoneService],
})
export class TeyModule {}
