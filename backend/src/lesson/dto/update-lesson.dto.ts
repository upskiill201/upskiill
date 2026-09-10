import { IsString, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class UpdateLessonMetadataDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() shortDescription?: string;
  @IsOptional() @IsString() lessonType?: string;
  // Real media length (minutes), measured from the uploaded file client-side.
  // Feeds lesson time estimates instead of always reading 0.
  @IsOptional() @IsNumber() durationMinutes?: number;
  // NOTE: `status` is intentionally NOT accepted here — publishing must go
  // through the validated publish endpoints, never a bare metadata write.
  @IsOptional() @IsNumber() version?: number;
}

export class UpdateLessonPhaseDto {
  @IsArray() contentBlocks: any[];
  @IsOptional() @IsBoolean() isCompleted?: boolean;
  @IsNumber() version: number;
}

export class AddLessonResourceDto {
  @IsString() type: string;
  @IsString() title: string;
  @IsString() storageUrl: string;
  @IsOptional() @IsNumber() sizeBytes?: number;
  @IsOptional() @IsString() originalName?: string;
  @IsOptional() @IsNumber() estimatedReadMin?: number;
  @IsOptional() @IsNumber() displayOrder?: number;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() category?: string;
}

export class UpdateLessonResourceDto {
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() storageUrl?: string;
  @IsOptional() @IsNumber() sizeBytes?: number;
  @IsOptional() @IsString() originalName?: string;
  @IsOptional() @IsNumber() estimatedReadMin?: number;
  @IsOptional() @IsNumber() displayOrder?: number;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() category?: string;
}

export class PublishLessonDto {
  @IsString() publishOption: 'now' | 'schedule' | 'draft';
  @IsOptional() @IsString() publishDate?: string;
}

/**
 * FullSaveLessonDto — batches ALL lesson data into ONE request.
 * Used by the lesson builder to replace 5 sequential API calls with 1.
 */
export class FullSaveLessonDto {
  // Metadata
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() shortDescription?: string;
  @IsOptional() @IsString() lessonType?: string;
  /** Real media length in minutes, measured from the uploaded file. */
  @IsOptional() @IsNumber() durationMinutes?: number;

  // Content blocks per phase
  @IsOptional() @IsArray() learnBlocks?: any[];
  @IsOptional() @IsArray() applyBlocks?: any[];
  @IsOptional() @IsArray() reflectBlocks?: any[];
  @IsOptional() @IsArray() deepenBlocks?: any[];

  // Completion flags
  @IsOptional() @IsBoolean() isLearnCompleted?: boolean;
  @IsOptional() @IsBoolean() isApplyCompleted?: boolean;
  @IsOptional() @IsBoolean() isReflectCompleted?: boolean;
  @IsOptional() @IsBoolean() isDeepenCompleted?: boolean;

  // Optimistic locking — when provided, must match the stored version or the
  // save is rejected with 409. The builder sends this on every manual save.
  @IsOptional() @IsNumber() version?: number;
}
