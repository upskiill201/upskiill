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
