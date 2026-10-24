import { Module } from '@nestjs/common';
import { OriginalsModule } from '../originals/originals.module';
import { OnboardingFlowController } from './onboarding-flow.controller';
import { OnboardingFlowService } from './onboarding-flow.service';

/**
 * Onboarding v3 (public, pre-signup). Depends on Prisma only; the course
 * module settles the lesson through the onboarding.lesson_settled event so
 * this never imports CourseModule (which would close an Auth cycle).
 */
@Module({
  // The placement test (TestOutService); Originals depends on Prisma only.
  imports: [OriginalsModule],
  controllers: [OnboardingFlowController],
  providers: [OnboardingFlowService],
  exports: [OnboardingFlowService],
})
export class OnboardingFlowModule {}
