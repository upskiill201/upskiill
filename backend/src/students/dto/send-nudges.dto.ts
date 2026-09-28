import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class SendNudgesDto {
  @IsString()
  @MaxLength(64)
  courseId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MaxLength(64, { each: true })
  learnerIds!: string[];

  @IsIn(['NUDGE', 'CHEER'])
  kind!: 'NUDGE' | 'CHEER';

  /** `{first}` becomes each learner's first name. */
  @IsString()
  @MinLength(2)
  @MaxLength(240)
  message!: string;
}
