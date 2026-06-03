import { Module } from '@nestjs/common';
import { CreatorOnboardingController } from './creator-onboarding.controller';
import { CreatorOnboardingService } from './creator-onboarding.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CreatorOnboardingController],
  providers: [CreatorOnboardingService],
  exports: [CreatorOnboardingService],
})
export class CreatorOnboardingModule {}
