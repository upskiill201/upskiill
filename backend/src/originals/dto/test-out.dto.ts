import { IsIn, IsInt, IsString, Max, Min } from 'class-validator';

/** A finished Jump ahead or placement test (graded in the browser). */
export class SubmitTestOutDto {
  @IsIn(['jump', 'placement'])
  mode!: 'jump' | 'placement';

  @IsString()
  targetSectionId!: string;

  @IsInt()
  @Min(0)
  @Max(200)
  correct!: number;

  @IsInt()
  @Min(0)
  @Max(200)
  total!: number;
}
