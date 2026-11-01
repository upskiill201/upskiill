import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import {
  SHARE_KINDS,
  ShareCardService,
  type ShareKind,
} from './share-card.service';

class CreateShareCardDto {
  @IsIn(SHARE_KINDS as unknown as string[])
  kind!: ShareKind;

  @IsOptional()
  @IsString()
  @Length(1, 64)
  courseId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 64)
  sectionId?: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  weekStart?: string;

  @IsOptional()
  @IsString()
  @Length(1, 40)
  badgeId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(20)
  tier?: number;
}

@Controller('share-cards')
export class ShareCardController {
  constructor(private readonly cards: ShareCardService) {}

  /** POST /share-cards — snapshot a milestone the learner reached; returns its link. */
  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Post()
  create(
    @Req() req: { user: { id: string } },
    @Body() dto: CreateShareCardDto,
  ) {
    return this.cards.create(req.user.id, dto);
  }

  /** POST /share-cards/:slug/shared — the card went out; pays the one-time Coins. */
  @UseGuards(AuthGuard('jwt'))
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Post(':slug/shared')
  shared(@Req() req: { user: { id: string } }, @Param('slug') slug: string) {
    return this.cards.markShared(req.user.id, slug);
  }

  /** GET /share-cards/:slug — public: the snapshot behind teyro.app/s/:slug and its image. */
  @Throttle({ default: { limit: 120, ttl: 60000 } })
  @Get(':slug')
  getPublic(@Param('slug') slug: string) {
    return this.cards.getPublic(slug);
  }
}
