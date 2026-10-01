import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/** Learner-selectable post types. ANNOUNCEMENT/CHALLENGE are moderator-only;
 *  PROGRESS/MILESTONE/ACHIEVEMENT stay server-reserved for system posts. */
export const USER_POST_TYPES = [
  'QUESTION',
  'TIP',
  'WIN',
  'RESOURCE',
  'DISCUSSION',
  'POLL',
  'GENERAL',
] as const;

export const MODERATOR_POST_TYPES = ['ANNOUNCEMENT', 'CHALLENGE'] as const;

export const ALL_POST_TYPES = [...USER_POST_TYPES, ...MODERATOR_POST_TYPES];

export class AttachmentInputDto {
  @IsString()
  url: string;

  @IsString()
  @MaxLength(255)
  filename: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  mimeType?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sizeBytes?: number;
}

export class PollOptionInputDto {
  @IsString()
  @Length(1, 200)
  text: string;
}

export class CreatePostDto {
  @IsOptional()
  // Every type validates here; PostService rejects ANNOUNCEMENT/CHALLENGE from non-moderators.
  @IsIn(ALL_POST_TYPES)
  postType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  title?: string;

  @IsString()
  @Length(1, 8000)
  contentText: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(8)
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => AttachmentInputDto)
  attachments?: AttachmentInputDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(8)
  @ValidateNested({ each: true })
  @Type(() => PollOptionInputDto)
  pollOptions?: PollOptionInputDto[];

  @IsOptional()
  @IsString()
  lessonId?: string;
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(1, 8000)
  contentText?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(8)
  @IsString({ each: true })
  images?: string[];
}

export class CreateCommentDto {
  @IsString()
  @Length(1, 4000)
  contentText: string;

  @IsOptional()
  @IsString()
  parentId?: string;
}

export class UpdateCommentDto {
  @IsString()
  @Length(1, 4000)
  contentText: string;
}

export class VotePollDto {
  @IsString()
  optionId: string;
}

export class MarkReadDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ids?: string[];
}

export class ModerationFlagDto {
  @IsOptional()
  @IsBoolean()
  value?: boolean;
}
