import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { UserOnboardingService } from './user-onboarding.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { OptionalJwtAuthGuard } from '../auth/guard/optional-jwt-auth.guard';
import { ChallengeCompleteDto } from './dto/challenge-complete.dto';

/**
 * NOTE: guards are declared PER METHOD (not class-level) because the
 * anonymous challenge route must accept pre-signup callers — NestJS stacks
 * method guards on top of class guards rather than replacing them.
 */
@Controller('user-onboarding')
export class UserOnboardingController {
  constructor(private readonly service: UserOnboardingService) {}

  /**
   * GET /user-onboarding
   * Returns the current user's onboarding session.
   * Returns { exists: false } when no session has been created yet.
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async upsertSession(
    @GetUser('id') userId: string,
    @Body()
    body: {
      currentStep?: number;
      completedSteps?: number[];
      answers?: any;
      onboardingComplete?: boolean;
    },
  ) {
    const session = await this.service.upsertSession(userId, body);
    return session;
  }

  /**
   * POST /user-onboarding/challenge-complete
   * Claims the one-time Step 9 shape-challenge reward (25 XP + 25 coins).
   * Idempotent — repeat calls return alreadyClaimed with zero deltas.
   */
  @Post('challenge-complete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async claimChallengeReward(@GetUser('id') userId: string) {
    return this.service.claimChallengeReward(userId);
  }

  /**
   * POST /user-onboarding/challenge-complete/anonymous
   * Step 9 runs BEFORE sign-up, so fresh learners have no JWT yet.
   *  - Anonymous callers: records a single-use pending claim server-side and
   *    returns a token the browser presents at signup; the celebration plays
   *    immediately, the payout settles when the account appears.
   *  - Authenticated callers (returning users replaying onboarding): pays out
   *    right away via the idempotent authenticated path.
   * Throttled hard per-IP — this is a public, pre-auth endpoint.
   */
  @Post('challenge-complete/anonymous')
  @HttpCode(HttpStatus.OK)
  @UseGuards(OptionalJwtAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 900_000 } })
  async claimChallengeRewardAnonymous(
    @GetUser('id') userId: string | null,
    @Body() dto: ChallengeCompleteDto,
  ) {
    if (userId) {
      return this.service.claimChallengeReward(userId);
    }
    return this.service.issueAnonymousClaim(dto.whatsappNumber);
  }
}
