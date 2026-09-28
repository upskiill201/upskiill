import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  AI_INTERESTS,
  CODING_INTERESTS,
  DAILY_COMMITMENTS,
  EXPERIENCE_LEVELS,
  LEARNING_BARRIERS,
  LEARNING_CATEGORIES,
  LEARNING_GOALS,
  LEARNING_INTERESTS,
  PREFERRED_TIMES,
  PRIOR_ATTEMPTS,
} from '../onboarding-answers';

/**
 * The validated shape of `PUT /user-onboarding`.
 *
 * This replaces `answers: any`, which meant the global ValidationPipe
 * (`whitelist: true`, `forbidNonWhitelisted: true`) had nothing to enforce
 * and arbitrary client JSON was persisted verbatim into the `answers` column.
 *
 * Every enum is pinned with `@IsIn` against the same constants the frontend
 * builds its option lists from, so an answer that reaches the database is by
 * construction one a learner could actually have picked.
 *
 * Array sizes are capped: multi-selects are bounded by their option lists, so
 * a thousand-element array is not a valid answer, it is someone poking at the
 * endpoint.
 */

class ChallengeAnswerDto {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsBoolean()
  skipped?: boolean;

  /** 64 hex chars from `randomBytes(32)`, issued by the anonymous claim route. */
  @IsOptional()
  @IsString()
  @Length(32, 128)
  claimToken?: string;
}

class NotificationsAnswerDto {
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  @IsIn(['granted', 'denied', 'default', 'unsupported'])
  permission?: string;
}

export class OnboardingAnswersDto {
  /**
   * A display name, so it is permissive by design — real names contain
   * apostrophes, spaces, and non-Latin scripts. Only length is enforced.
   */
  @IsOptional()
  @IsString()
  @Length(1, 40)
  name?: string;

  @IsOptional()
  @IsIn(LEARNING_CATEGORIES as unknown as string[])
  category?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(CODING_INTERESTS.length + AI_INTERESTS.length)
  @IsIn(LEARNING_INTERESTS, { each: true })
  interests?: string[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(LEARNING_GOALS.length)
  @IsIn(LEARNING_GOALS as unknown as string[], { each: true })
  goals?: string[];

  @IsOptional()
  @IsIn(EXPERIENCE_LEVELS as unknown as string[])
  experienceLevel?: string;

  @IsOptional()
  @IsIn(PRIOR_ATTEMPTS as unknown as string[])
  priorAttempt?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(LEARNING_BARRIERS.length)
  @IsIn(LEARNING_BARRIERS as unknown as string[], { each: true })
  barriers?: string[];

  @IsOptional()
  @IsIn(DAILY_COMMITMENTS as unknown as string[])
  dailyCommitment?: string;

  @IsOptional()
  @IsIn(PREFERRED_TIMES as unknown as string[])
  preferredTime?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ChallengeAnswerDto)
  challenge?: ChallengeAnswerDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationsAnswerDto)
  notifications?: NotificationsAnswerDto;
}

export class UpsertOnboardingSessionDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  currentStep?: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(15)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(15, { each: true })
  completedSteps?: number[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OnboardingAnswersDto)
  answers?: OnboardingAnswersDto;

  /**
   * A CLAIM, not a fact. The service only honours it when the answers
   * actually satisfy every required question — see `answersAreComplete`.
   */
  @IsOptional()
  @IsBoolean()
  onboardingComplete?: boolean;

  /**
   * Lets the server recognise a payload from an older client. Anything that
   * is not the current version is treated as legacy on read.
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  schemaVersion?: number;
}
