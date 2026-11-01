import { Module } from '@nestjs/common';
import { ChestModule } from '../chest/chest.module';
import { GamificationModule } from '../gamification/gamification.module';
import { TeyModule } from '../tey/tey.module';
import { BuddyStreakJob } from './buddy-streak.job';
import { BuddyService } from './buddy.service';
import { HelpService } from './help.service';
import { NetworkAdminController } from './network-admin.controller';
import { NetworkAdminService } from './network-admin.service';
import { NetworkController } from './network.controller';
import { RankingModelService } from './ranking-model.service';
import { NetworkEventsService } from './network-events.service';
import { NetworkFeedService } from './network-feed.service';
import { NetworkListener } from './network.listener';
import { PeopleService } from './people.service';
import { ReviewService } from './review.service';
import { SquadService } from './squad.service';
import { DuelService } from './duel.service';
import { PresenceService } from './presence.service';

@Module({
  // TeyModule: the notify hub (bell + push) every network moment goes through,
  // and the ScheduleModule the evening buddy-streak job runs on.
  // GamificationModule: the Helper badge is re-checked the moment help lands.
  // ChestModule: squad chests.
  imports: [TeyModule, GamificationModule, ChestModule],
  // Admin first, so /network/admin/* is never read as a user route.
  controllers: [NetworkAdminController, NetworkController],
  providers: [
    BuddyService,
    NetworkFeedService,
    NetworkListener,
    NetworkEventsService,
    PeopleService,
    BuddyStreakJob,
    HelpService,
    ReviewService,
    SquadService,
    DuelService,
    PresenceService,
    RankingModelService,
    NetworkAdminService,
  ],
  exports: [BuddyService],
})
export class NetworkModule {}
