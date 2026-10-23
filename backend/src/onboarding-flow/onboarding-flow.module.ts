import { Module } from '@nestjs/common';
import { OnboardingFlowController } from './onboarding-flow.controller';
import { OnboardingFlowService } from './onboarding-flow.service';

/**
 * Onboarding v3 (public, pre-signup). Depends on Prisma only; the course
 * module settles the lesson through the onboarding.lesson_settled event so
 * this never imports CourseModule (which would close an Auth cycle).
 */
@Module({
  controllers: [OnboardingFlowController],
  providers: [OnboardingFlowService],
  exports: [OnboardingFlowService],
})
export class OnboardingFlowModule {}
