import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { CreatorOnboardingModule } from './creator-onboarding/creator-onboarding.module';
import { ProfileModule } from './profile/profile.module';
import { UserOnboardingModule } from './user-onboarding/user-onboarding.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { GamificationModule } from './gamification/gamification.module';
import { SocialModule } from './social/social.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ShopModule } from './shop/shop.module';
import { AchievementsModule } from './achievements/achievements.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // global fallback
    }]),
    PrismaModule,
    AuthModule,
    CourseModule,
    LessonModule,
    OrdersModule,
    PaymentModule,
    CreatorOnboardingModule,
    ProfileModule,
    UserOnboardingModule,
    WhatsappModule,
    GamificationModule,
    SocialModule,
    ShopModule,
    AchievementsModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
