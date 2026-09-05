import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MissionsModule } from '../missions/missions.module';
import { ChestModule } from '../chest/chest.module';
import { PaymentModule } from '../payment/payment.module';
import { CommunityModule } from '../community/community.module';

@Module({
  imports: [PrismaModule, MissionsModule, ChestModule, PaymentModule, CommunityModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
