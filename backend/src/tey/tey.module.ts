import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '../prisma/prisma.module';
import { StreakModule } from '../streak/streak.module';
import { NotificationModule } from '../notification/notification.module';
import { TeyActivityController } from './activity/tey-activity.controller';
import { TeyActivityService } from './activity/tey-activity.service';
import { TeyListener } from './listeners/tey.listener';
import { LearnerStateService } from './state/learner-state.service';
import { TeyTimezoneService } from './state/timezone.service';
import { TeyDecisionService } from './decision/tey-decision.service';
import { InAppChannel } from './delivery/channels/inapp.channel';
import { PushChannel } from './delivery/channels/push.channel';
import { WhatsAppChannel } from './delivery/channels/whatsapp.channel';
import { PushController } from './delivery/push/push.controller';
import { PushSubscriptionService } from './delivery/push/push-subscription.service';
import { WebPushClient } from './delivery/push/web-push.client';
import { TeyDeliveryService } from './delivery/tey-delivery.service';
import { TeyPolicyService } from './delivery/tey-policy.service';
import { TeyActionRepository } from './scheduler/tey-action.repository';
import { TeySchedulerController } from './scheduler/tey-scheduler.controller';
import { TeySchedulerService } from './scheduler/tey-scheduler.service';
import { TeyController } from './tey.controller';

/**
 * Tey's intelligence layer.
 *
 * Phases 1-2 -- activity capture, the learner-state projection, the decision
 * engine, and the scheduler. Still dark: the scheduler runs in dry-run
 * (TEY_DELIVERY_ENABLED unset), recording what it WOULD send so the rules can
 * be observed against real learners before anything reaches a phone.
 *
 * StreakModule is imported for StreakService, which stays the single source of
 * streak truth. See LearnerStateService for why that matters.
 */
@Module({
  imports: [
    PrismaModule,
    StreakModule,
    NotificationModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    TeyController,
    TeyActivityController,
    TeySchedulerController,
    PushController,
  ],
  providers: [
    TeyActivityService,
    TeyTimezoneService,
    LearnerStateService,
    TeyDecisionService,
    TeyActionRepository,
    TeySchedulerService,
    TeyPolicyService,
    TeyDeliveryService,
    WebPushClient,
    PushSubscriptionService,
    PushChannel,
    InAppChannel,
    WhatsAppChannel,
    TeyListener,
  ],
  exports: [
    TeyActivityService,
    LearnerStateService,
    TeyTimezoneService,
    TeyDecisionService,
    TeySchedulerService,
    TeyDeliveryService,
    TeyPolicyService,
  ],
})
export class TeyModule {}
