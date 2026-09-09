import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MissionsModule } from '../missions/missions.module';
import { ChestModule } from '../chest/chest.module';
import { PaymentModule } from '../payment/payment.module';
import { CommunityModule } from '../community/community.module';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports: [
    PrismaModule,
    MissionsModule,
    ChestModule,
    PaymentModule,
    CommunityModule,
    // Lesson rewards read the learner's active XP/Coin boosts from the shop.
    ShopModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
  // The Admin Center (Courses phase) reuses publishCourse/unpublishCourse
  // rather than duplicating the quality-gate validation in admin code.
  exports: [CourseService],
})
export class CourseModule {}
