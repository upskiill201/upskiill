import { IsString, MaxLength, MinLength } from 'class-validator';

export class FocusCourseDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  courseId!: string;
}
