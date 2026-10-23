import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import type { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guard/optional-jwt-auth.guard';
import { OnboardingFlowService } from './onboarding-flow.service';

class LessonStatsDto {
  @IsOptional() @IsInt() @Min(0) @Max(3600) timeSpentSeconds?: number;
  @IsOptional() @IsInt() @Min(0) @Max(50) correctAnswers?: number;
  @IsOptional() @IsInt() @Min(0) @Max(100) quizScorePct?: number;
  @IsOptional() @IsInt() @Min(0) @Max(50) bestCombo?: number;
}

export class LessonClaimDto {
  @IsUUID()
  courseId: string;

  @IsUUID()
  lessonId: string;

  @ValidateNested()
  @Type(() => LessonStatsDto)
  stats: LessonStatsDto;
}

export const ONBOARDING_EVENT_TYPES = [
  'VIEW',
  'ANSWER',
  'BACK',
  'QUIT_PROMPT',
  'QUIT_STAY',
  'QUIT',
  'RESUME',
  'LESSON_START',
  'LESSON_EXIT',
  'LESSON_DONE',
  'SIGNUP_START',
  'SIGNUP',
  'PAYWALL',
  'INSTALL',
  'PUSH',
  'COMPLETE',
] as const;

class OnboardingEventDto {
  @IsUUID('4') anonymousId: string;
  @IsString() @Length(1, 64) sessionId: string;
  @IsString() @Length(1, 40) step: string;
  @IsOptional() @IsInt() @Min(0) @Max(100) stepIndex?: number;
  @IsIn(ONBOARDING_EVENT_TYPES) type: string;
  /** Non-personal answers only (the client never sends the name). */
  @IsOptional() @IsString() @Length(1, 40) answerKey?: string;
  @IsOptional() @IsString() @Length(1, 120) answerValue?: string;
  @IsOptional() @IsInt() @Min(0) @Max(3_600_000) ms?: number;
  @IsOptional() @IsString() @Length(1, 40) reason?: string;
  @IsOptional() @IsIn(['mobile', 'tablet', 'desktop']) device?: string;
  @IsOptional() @IsString() @Length(1, 40) source?: string;
  @IsOptional() @IsISO8601() clientTs?: string;
}

export class OnboardingEventsDto {
  @ValidateNested({ each: true })
  @Type(() => OnboardingEventDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(25)
  events: OnboardingEventDto[];
}

/**
 * Public on purpose: onboarding v3 runs before the visitor has an account.
 * Nothing here returns more than a course list and ONE free lesson, and
 * nothing pays out until an account exists (the claim settles at signup).
 */
@Controller('onboarding-flow')
export class OnboardingFlowController {
  constructor(private readonly flow: OnboardingFlowService) {}

  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  @Get('catalog')
  catalog() {
    return this.flow.catalog();
  }

  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @Get('courses/:id/first-lesson')
  firstLesson(@Param('id') id: string) {
    return this.flow.firstLesson(id);
  }

  @Throttle({ default: { limit: 10, ttl: 900_000 } })
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('lesson-claim')
  async lessonClaim(@Req() req: Request & { user?: { id: string } | null }, @Body() dto: LessonClaimDto) {
    const claim = await this.flow.issueLessonClaim(dto);
    // Already signed in (finished onboarding after signup): settle at once.
    if (req.user?.id) {
      const settled = await this.flow.settleLessonClaim(req.user.id, claim.claimToken);
      return { ...claim, status: settled.settled ? ('SETTLED' as const) : claim.status };
    }
    return claim;
  }

  @Throttle({ default: { limit: 120, ttl: 60_000 } })
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('events')
  async events(@Req() req: Request & { user?: { id: string } | null }, @Body() dto: OnboardingEventsDto) {
    await this.flow.recordEvents(req.user?.id ?? null, dto.events);
    return { ok: true };
  }
}
