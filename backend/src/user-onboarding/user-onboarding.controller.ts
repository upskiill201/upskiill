import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserOnboardingService } from './user-onboarding.service';
import { GetUser } from '../auth/decorator/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('user-onboarding')
export class UserOnboardingController {
  constructor(private readonly service: UserOnboardingService) {}

  /**
   * GET /user-onboarding
   * Returns the current user's onboarding session.
   * Returns { exists: false } when no session has been created yet.
   */
  @Get()
  async getSession(@GetUser('id') userId: string) {
    const session = await this.service.getSession(userId);
    if (!session) return { exists: false };
    return { exists: true, ...session };
  }

  /**
   * PUT /user-onboarding
   * Upserts the session. Accepts partial payload — only provided fields are updated.
   * Body: { currentStep?, completedSteps?, answers?, onboardingComplete? }
   */
  @Put()
  @HttpCode(HttpStatus.OK)
  async upsertSession(
    @GetUser('id') userId: string,
    @Body()
    body: {
      currentStep?: number;
      completedSteps?: number[];
      answers?: Record<string, unknown>;
      onboardingComplete?: boolean;
    },
  ) {
    const session = await this.service.upsertSession(userId, body);
    return session;
  }
}
