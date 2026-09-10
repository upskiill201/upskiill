import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  CLIENT_EVENT_TYPES,
  MAX_EVENT_BATCH,
} from '../../contracts/tey-event.types';
import type { ClientEventType } from '../../contracts/tey-event.types';

export class IngestEventDto {
  /**
   * Allowlist, not a blocklist. Server-observed types (lesson_completed,
   * streak_extended, ...) are rejected here on purpose — accepting them from a
   * client would let anyone forge progress. This is the security boundary of
   * the ingest endpoint.
   */
  @IsIn(CLIENT_EVENT_TYPES as unknown as string[])
  type!: ClientEventType;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  entityType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  entityId?: string;

  @IsOptional()
  @IsObject()
  props?: Record<string, unknown>;

  @IsISO8601()
  occurredAt!: string;

  /** Client-generated and stable across retries, so a re-flush is a no-op. */
  @IsString()
  @Length(8, 128)
  idempotencyKey!: string;
}

export class IngestEventsDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(MAX_EVENT_BATCH)
  @ValidateNested({ each: true })
  @Type(() => IngestEventDto)
  events!: IngestEventDto[];

  /** IANA zone from Intl.DateTimeFormat().resolvedOptions().timeZone. */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  timezone?: string;

  @IsOptional()
  @Type(() => Number)
  timezoneOffsetMinutes?: number;
}
