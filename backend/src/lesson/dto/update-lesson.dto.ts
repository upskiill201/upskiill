import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsObject } from 'class-validator';

export class UpdateLessonMetadataDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() shortDescription?: string;
  @IsOptional() @IsString() lessonType?: string;
  @IsOptional() @IsString() status?: string;
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
}

