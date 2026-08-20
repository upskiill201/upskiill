import { IsString, IsOptional, IsBoolean, IsArray, MaxLength, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsString()
  creatorStatus?: string;

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
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(3000)
  about?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsOptional()
  @IsString()
  introVideoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  tagline?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsArray()
  languages?: string[];

  @IsOptional()
  @IsString()
  primaryExpertise?: string;

  @IsOptional()
  skills?: any;

  @IsOptional()
  @IsArray()
  teachingLevels?: string[];

  @IsOptional()
  @IsArray()
  contentFormats?: string[];

  // Experience, Education & Certifications
  @IsOptional()
  experiences?: any;

  @IsOptional()
  education?: any;

  @IsOptional()
  certifications?: any;

  // Social & Professional Links
  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  youtube?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  tiktok?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  portfolio?: string;

  // Contact & Preferences
  @IsOptional()
  @IsString()
  contactMethod?: string;

  @IsOptional()
  @IsString()
  businessEmail?: string;

  @IsOptional()
  @IsBoolean()
  allowCollaboration?: boolean;

  @IsOptional()
  @IsString()
  profileVisibility?: string;

  @IsOptional()
  privacySettings?: any;

  // Onboarding-derived creator fields (editable post-onboarding)
  @IsOptional()
  @IsString()
  niche?: string;

  @IsOptional()
  @IsString()
  weeklyHours?: string;

  @IsOptional()
  @IsString()
  biggestChallenge?: string;

  @IsOptional()
  @IsString()
  teachingStyle?: string;

  @IsOptional()
  @IsString()
  launchGoal?: string;
}
