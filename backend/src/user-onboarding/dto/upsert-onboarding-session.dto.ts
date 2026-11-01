import { plainToInstance, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateNested,
  validateSync,
} from 'class-validator';
import {
  AI_INTERESTS,
  CODING_INTERESTS,
  DAILY_COMMITMENTS,
  EXPERIENCE_LEVELS,
  GOAL_IDS,
  SITUATIONS,
  SOURCES,
  V3_EXPERIENCE,
  LEARNING_BARRIERS,
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

/** The pre-signup lesson: its claim token settles it into the new account. */
class LessonAnswerDto {
  @IsOptional()
  @IsString()
  @Length(32, 128)
  claimToken?: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  @IsUUID()
  lessonId?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  /** Minutes from UTC (Date#getTimezoneOffset), so streak day 1 is the learner's day. */
  @IsOptional()
  @IsInt()
  @Min(-840)
  @Max(840)
  timezoneOffset?: number;
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

  /** v2: coding | ai. v3: a Course.category such as "Personal Finance". */
  @IsOptional()
  @IsString()
  @Length(1, 40)
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
  @IsIn([...EXPERIENCE_LEVELS, ...V3_EXPERIENCE] as string[])
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

  // ─── v3 ────────────────────────────────────────────────────────────────
  @IsOptional()
  @IsIn(GOAL_IDS as unknown as string[])
  goal?: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  @IsIn(SITUATIONS as unknown as string[])
  situation?: string;

  @IsOptional()
  @IsIn(SOURCES as unknown as string[])
  source?: string;

  @IsOptional()
  @IsBoolean()
  committed?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => LessonAnswerDto)
  lesson?: LessonAnswerDto;

  /** This device's onboarding id, so its analytics join the new account. */
  @IsOptional()
  @IsUUID('4')
  anonymousId?: string;

  @IsOptional()
  @IsBoolean()
  installed?: boolean;
}

export class UpsertOnboardingSessionDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(40)
  currentStep?: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(40)
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(40, { each: true })
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

/**
 * Learner answers that arrive with signup or Google sign-in (where the DTO
 * is a loose object, because creator signups send a different shape).
 * Validated against the same rules as PUT /user-onboarding: unknown keys are
 * stripped and any field that fails is dropped, so nothing invalid reaches
 * the profile or settles a reward.
 */
export function sanitizeLearnerAnswers(raw: unknown): OnboardingAnswersDto {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
  const instance = plainToInstance(OnboardingAnswersDto, raw);
  const errors = validateSync(instance, { whitelist: true });
  const bad = new Set(errors.map((e) => e.property));
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(instance)) {
    if (!bad.has(key) && value !== undefined) clean[key] = value;
  }
  return clean as OnboardingAnswersDto;
}
