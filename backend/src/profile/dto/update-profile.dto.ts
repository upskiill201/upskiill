import { IsString, IsOptional, IsUrl, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

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
  avatarUrl?: string;

  // Social links
  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

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
