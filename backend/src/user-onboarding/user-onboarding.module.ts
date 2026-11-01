import { Module } from '@nestjs/common';
import { UserOnboardingController } from './user-onboarding.controller';
import { UserOnboardingService } from './user-onboarding.service';
import { PrismaModule } from '../prisma/prisma.module';
import { OnboardingFlowModule } from '../onboarding-flow/onboarding-flow.module';

@Module({
  imports: [PrismaModule, OnboardingFlowModule],
  controllers: [UserOnboardingController],
  providers: [UserOnboardingService],
  exports: [UserOnboardingService],
})
export class UserOnboardingModule {}
