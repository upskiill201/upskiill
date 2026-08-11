import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MissionsModule } from '../missions/missions.module';
import { ChestModule } from '../chest/chest.module';
@Module({
  imports: [PrismaModule, MissionsModule, ChestModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
