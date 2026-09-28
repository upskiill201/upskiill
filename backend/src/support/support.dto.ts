import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export const SUPPORT_AUDIENCES = ['LEARNER', 'CREATOR'] as const;
export const SUPPORT_KINDS = [
  'FEEDBACK',
  'IDEA',
  'BUG',
  'HELP',
  'ACCOUNT',
  'PAYMENT',
  'COURSE',
] as const;
export const SUPPORT_STATUSES = ['OPEN', 'ANSWERED', 'CLOSED'] as const;

export type SupportAudience = (typeof SUPPORT_AUDIENCES)[number];
export type SupportKind = (typeof SUPPORT_KINDS)[number];
export type SupportStatus = (typeof SUPPORT_STATUSES)[number];

export class CreateTicketDto {
  @IsIn(SUPPORT_AUDIENCES)
  audience: SupportAudience;

  @IsIn(SUPPORT_KINDS)
  kind: SupportKind;

  @IsOptional()
  @IsString()
  @MaxLength(140)
  subject?: string;

  @IsString()
  @Length(5, 4000)
  message: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  mood?: number;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  pagePath?: string;
}

export class ReplyDto {
  @IsString()
  @Length(1, 4000)
  message: string;
}

export class SetStatusDto {
  @IsIn(SUPPORT_STATUSES)
  status: SupportStatus;
}
