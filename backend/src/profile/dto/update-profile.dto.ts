import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  MaxLength,
  Matches,
  ArrayMaxSize,
  IsIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * The settings page PATCHes the whole form, so a CLEARED field arrives as ''
 * — validators below must accept '' (= clear) as well as valid values.
 */
const MEDIA_URL_PATTERN = /^$|^(https?:\/\/|\/)\S+$/i;
const LINK_URL_PATTERN = /^$|^https?:\/\/\S+$/i;
const EMAIL_PATTERN = /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── nested shapes ──────────────────────────────────────────────────────── */

export class SkillInput {
  /** Client-side list key — accepted (and ignored) so strict whitelist mode
   *  doesn't 400 on the settings payload. */
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MaxLength(60)
  name!: string;

  @IsOptional()
  @IsIn(['Beginner', 'Intermediate', 'Expert'])
  level?: string;
}

export class ExperienceInput {
  /** Client-side list key — see SkillInput.id. */
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MaxLength(100)
  company!: string;

  @IsString()
  @MaxLength(100)
  position!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  startDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  current?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(600)
  description?: string;
}

export class EducationInput {
  /** Client-side list key — see SkillInput.id. */
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MaxLength(120)
  institution!: string;

  @IsString()
  @MaxLength(120)
  degree!: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  fieldOfStudy?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  startYear?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  endYear?: string;

  @IsOptional()
  @IsString()
  @MaxLength(600)
  description?: string;
}

export class CertificationInput {
  /** Client-side list key — see SkillInput.id. */
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @MaxLength(120)
  name!: string;

  @IsString()
  @MaxLength(120)
  organization!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  issueDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  expiryDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  credentialId?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'credentialUrl must be an http(s) URL' })
  @MaxLength(400)
  credentialUrl?: string;
}

export class PrivacySettingsInput {
  @IsOptional()
  @IsBoolean()
  showLocation?: boolean;

  @IsOptional()
  @IsBoolean()
  showExperience?: boolean;

  @IsOptional()
  @IsBoolean()
  showEducation?: boolean;

  @IsOptional()
  @IsBoolean()
  showCertifications?: boolean;

  @IsOptional()
  @IsBoolean()
  showSocials?: boolean;
}

/* ── main DTO ───────────────────────────────────────────────────────────── */

/**
 * Body of PATCH /profile/me.
 *
 * NOTE: `creatorStatus` is deliberately NOT accepted here — it is a
 * system-controlled field ("Founding Creator" etc.) and the service strips
 * it defensively because the global ValidationPipe runs without whitelist.
 */
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  headline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2500)
  about?: string;

  @IsOptional()
  @Matches(MEDIA_URL_PATTERN, { message: 'avatarUrl must be an http(s) URL or site path' })
  @MaxLength(600)
  avatarUrl?: string;

  @IsOptional()
  @Matches(MEDIA_URL_PATTERN, { message: 'coverImageUrl must be an http(s) URL or site path' })
  @MaxLength(600)
  coverImageUrl?: string;

  @IsOptional()
  @Matches(MEDIA_URL_PATTERN, { message: 'introVideoUrl must be an http(s) URL or site path' })
  @MaxLength(600)
  introVideoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tagline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(40, { each: true })
  languages?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(80)
  primaryExpertise?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => SkillInput)
  skills?: SkillInput[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(6)
  @IsIn(['Beginner', 'Intermediate', 'Advanced'], { each: true })
  teachingLevels?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  contentFormats?: string[];

  // Experience, Education & Certifications
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => ExperienceInput)
  experiences?: ExperienceInput[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => EducationInput)
  education?: EducationInput[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => CertificationInput)
  certifications?: CertificationInput[];

  // Social & Professional Links
  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'website must be an http(s) URL' })
  @MaxLength(300)
  website?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'linkedin must be an http(s) URL' })
  @MaxLength(300)
  linkedin?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'github must be an http(s) URL' })
  @MaxLength(300)
  github?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'twitter must be an http(s) URL' })
  @MaxLength(300)
  twitter?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'youtube must be an http(s) URL' })
  @MaxLength(300)
  youtube?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'instagram must be an http(s) URL' })
  @MaxLength(300)
  instagram?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'tiktok must be an http(s) URL' })
  @MaxLength(300)
  tiktok?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'facebook must be an http(s) URL' })
  @MaxLength(300)
  facebook?: string;

  @IsOptional()
  @Matches(LINK_URL_PATTERN, { message: 'portfolio must be an http(s) URL' })
  @MaxLength(300)
  portfolio?: string;

  // Contact & Preferences
  @IsOptional()
  @IsIn(['email', 'linkedin', 'website'], {
    message: 'contactMethod must be one of: email, linkedin, website',
  })
  contactMethod?: string;

  @IsOptional()
  @Matches(EMAIL_PATTERN, { message: 'businessEmail must be a valid email address' })
  @MaxLength(200)
  businessEmail?: string;

  @IsOptional()
  @IsBoolean()
  allowCollaboration?: boolean;

  @IsOptional()
  @IsIn(['PUBLIC', 'TEYRO_ONLY', 'HIDDEN'], {
    message: 'profileVisibility must be PUBLIC, TEYRO_ONLY or HIDDEN',
  })
  profileVisibility?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PrivacySettingsInput)
  privacySettings?: PrivacySettingsInput;

  // Onboarding-derived creator fields (editable post-onboarding)
  @IsOptional()
  @IsString()
  @MaxLength(80)
  niche?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  weeklyHours?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  biggestChallenge?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  teachingStyle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  launchGoal?: string;

  // Topics taught within the track (learner interest ids, e.g. web-development).
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MaxLength(40, { each: true })
  subCategories?: string[];

  // ── Student settings ─────────────────────────────────────────────────────
  // Daily goal in XP/day (Casual 20 | Regular 50 | Serious 100 | Intense 200).
  // Persisted on StudentProfile, not the creator Profile row.
  @IsOptional()
  @IsIn([20, 50, 100, 200], {
    message: 'dailyGoalXp must be one of: 20, 50, 100, 200',
  })
  dailyGoalXp?: number;
}
