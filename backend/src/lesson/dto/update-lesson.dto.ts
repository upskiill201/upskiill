import { IsString, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  lessonType?: string;

  @IsOptional()
  @IsBoolean()
  isFreePreview?: boolean;

  @IsOptional()
  @IsNumber()
  durationMinutes?: number;

  @IsOptional()
  @IsString()
  learnVideoUrl?: string;

  @IsOptional()
  @IsString()
  learnText?: string;

  @IsOptional()
  @IsString()
  learnAudioUrl?: string;

  @IsOptional()
  @IsString()
  applyType?: string;

  @IsOptional()
  @IsString()
  applyScenario?: string;

  @IsOptional()
  @IsString()
  applyTask?: string;

  @IsOptional()
  @IsString()
  applyAnswer?: string;

  @IsOptional()
  @IsString()
  applyExplanation?: string;

  @IsOptional()
  @IsString()
  reflectPrompt?: string;

  @IsOptional()
  @IsArray() // Since it's Json in schema
  reflectChips?: any[];

  @IsOptional()
  @IsArray() // Since it's Json in schema, assuming Array of objects
  deepenResources?: any[];

  @IsOptional()
  @IsString()
  aiSimplified?: string;

  @IsOptional()
  @IsString()
  aiRealWorld?: string;

  @IsOptional()
  @IsString()
  aiCommonMistakes?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsArray() // Since it's Json in schema
  resources?: any[];

  @IsOptional()
  @IsBoolean()
  isLearnCompleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isApplyCompleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isReflectCompleted?: boolean;

  @IsOptional()
  @IsBoolean()
  isDeepenCompleted?: boolean;
}
