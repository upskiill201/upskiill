import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { CourseCreationModule } from './course-creation/course-creation.module';
import { GoogleDriveModule } from './google-drive/google-drive.module';
import { CourseImportModule } from './course-import/course-import.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './profile/profile.module';
import { UserOnboardingModule } from './user-onboarding/user-onboarding.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { GamificationModule } from './gamification/gamification.module';
import { SocialModule } from './social/social.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { MissionsModule } from './missions/missions.module';
import { MonthlyQuestModule } from './monthly-quest/monthly-quest.module';
import { ProgressModule } from './progress/progress.module';
import { LearnerAnalyticsModule } from './learner-analytics/learner-analytics.module';
import { ChestModule } from './chest/chest.module';
import { SpinModule } from './spin/spin.module';
import { StreakModule } from './streak/streak.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { EarningsModule } from './earnings/earnings.module';
import { StudentsModule } from './students/students.module';
import { CommunityModule } from './community/community.module';
import { NotificationModule } from './notification/notification.module';
import { LeagueModule } from './league/league.module';
import { TeyModule } from './tey/tey.module';
import { AdminModule } from './admin/admin.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100, // global fallback
      },
    ]),
    PrismaModule,
    AuthModule,
    CourseModule,
    LessonModule,
    CourseCreationModule,
    GoogleDriveModule,
    CourseImportModule,
    OrdersModule,
    PaymentModule,
    ProfileModule,
    UserOnboardingModule,
    WhatsappModule,
    GamificationModule,
    SocialModule,
    ShopModule,
    HomeModule,
    MissionsModule,
    MonthlyQuestModule,
    ProgressModule,
    LearnerAnalyticsModule,
    ChestModule,
    SpinModule,
    StreakModule,
    AnalyticsModule,
    EarningsModule,
    StudentsModule,
    CommunityModule,
    NotificationModule,
    LeagueModule,
    TeyModule,
    AdminModule,
    CouponsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global rate limit (100 req/min per IP) on every endpoint. Auth endpoints
    // tighten this further with their own @Throttle decorators.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
