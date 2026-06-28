import { Module } from '@nestjs/common';
import { UserOnboardingController } from './user-onboarding.controller';
import { UserOnboardingService } from './user-onboarding.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserOnboardingController],
  providers: [UserOnboardingService],
  exports: [UserOnboardingService],
})
export class UserOnboardingModule {}
