import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * The global ValidationPipe runs with `whitelist: true` and
 * `forbidNonWhitelisted: true`, so every accepted field must be declared here.
 * Note what is deliberately absent: price. The server computes what an item
 * costs — a client that can post its own price is a client that sets it.
 */
export class PurchaseDto {
  /** Registry item id. `item` is the legacy field name, still accepted below. */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  itemId?: string;

  /** Legacy alias from the original shop client. */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  item?: string;

  /** Client-minted retry guard — one key per purchase attempt. */
  @IsOptional()
  @IsString()
  @MaxLength(128)
  idempotencyKey?: string;
}

export class EquipDto {
  @IsString()
  @MaxLength(64)
  itemId!: string;

  @IsBoolean()
  equipped!: boolean;
}

export class MarkUnlocksSeenDto {
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(50)
  itemIds!: string[];
}

export class TimezoneDto {
  /** JS Date.getTimezoneOffset() — minutes behind UTC. */
  @IsOptional()
  @IsInt()
  @Min(-900)
  @Max(900)
  timezoneOffset?: number;
}
