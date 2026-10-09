import { IsBoolean } from 'class-validator';

export class SkipLessonDto {
  /** true = leave the lesson out of its section; false = put it back. */
  @IsBoolean()
  skip: boolean;
}
