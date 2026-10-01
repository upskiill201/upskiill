import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IMPORT_LEVELS } from './create-course-import.dto';

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
  @IsIn(IMPORT_LEVELS)
  level?: (typeof IMPORT_LEVELS)[number];

  @IsOptional()
  @IsString()
  @MaxLength(100)
  creatorTimeWeekly?: string;
}
