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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
