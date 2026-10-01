import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/** The launch tracks (course-readiness.util LAUNCH_CATEGORIES). */
export const IMPORT_TRACKS = ['Coding', 'AI'] as const;
export const IMPORT_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export class CreateCourseImportDto {
  @IsString()
  @MinLength(1)
  driveFolderId: string;

  /** Autopilot: analyze the structure and build the draft course unattended. */
  @IsOptional()
  @IsBoolean()
  autopilot?: boolean;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  courseTitle?: string;

  @IsOptional()
  @IsIn(IMPORT_TRACKS)
  courseCategory?: (typeof IMPORT_TRACKS)[number];

  @IsOptional()
  @IsIn(IMPORT_LEVELS)
  courseLevel?: (typeof IMPORT_LEVELS)[number];
}
