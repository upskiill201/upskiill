import { Module } from '@nestjs/common';
import { LessonAccessService } from './lesson-access.service';
import { ProAccessService } from './pro-access.service';
import { ProGrantService } from './pro-grant.service';

/**
 * Leaf module: depends on Prisma only, so Course, Gamification, Shop, Streak
 * and Payment can all ask "is this learner Pro?" without importing billing
 * (ProModule), which would close a dependency cycle.
 */
@Module({
  providers: [ProAccessService, ProGrantService, LessonAccessService],
  exports: [ProAccessService, ProGrantService, LessonAccessService],
})
export class ProAccessModule {}
