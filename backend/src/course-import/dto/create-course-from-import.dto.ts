import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseFromImportDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  category: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  creatorTimeWeekly?: string;
}
