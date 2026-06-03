import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { CreatorOnboardingModule } from './creator-onboarding/creator-onboarding.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CourseModule,
    LessonModule,
    OrdersModule,
    PaymentModule,
    CreatorOnboardingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
