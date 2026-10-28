import { Module } from '@nestjs/common';
import { TeyModule } from '../tey/tey.module';
import { AvatarAdminController, AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { PhotoNudgeJob } from './photo-nudge.job';

/** Profile photos and Teyro characters (founder, 2026-10-28). */
@Module({
  // TeyModule: the notify hub (the day-2 reminder, the "photo removed" note)
  // and the ScheduleModule the reminder job runs on.
  imports: [TeyModule],
  // Admin first, so /avatar/admin/* is never read as a user route.
  controllers: [AvatarAdminController, AvatarController],
  providers: [AvatarService, PhotoNudgeJob],
  exports: [AvatarService],
})
export class AvatarModule {}
