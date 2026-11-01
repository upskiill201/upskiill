import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { BuddyService } from './buddy.service';
import { NetworkEventsService } from './network-events.service';
import { NetworkFeedService } from './network-feed.service';
import { SHARED_CODE_MAX, SQUAD_GOAL_MAX, SQUAD_GOAL_MIN, type ClientEventKind } from './network.constants';
import { DuelService } from './duel.service';
import { PeopleService } from './people.service';
import { PresenceService } from './presence.service';
import { SquadService } from './squad.service';

class BuddyRequestDto {
  @IsOptional() @IsString() @MaxLength(64) courseId?: string;
}

class ClientEventDto {
  @IsIn(['IMPRESSION', 'CTA', 'PROFILE_OPEN']) kind!: ClientEventKind;
  @IsUUID() activityId!: string;
  @IsOptional() @IsInt() @Min(0) @Max(99) position?: number;
}

class ShareWorkDto {
  // Not a UUID: imported courses use their own lesson ids (e.g. "les-c4-joel-m3-l1").
  @IsString() @MaxLength(64) lessonId!: string;
  @IsIn(['python', 'sql']) language!: 'python' | 'sql';
  @IsString() @MaxLength(SHARED_CODE_MAX) code!: string;
}

class CreateSquadDto {
  @IsString() @MaxLength(40) name!: string;
  @IsOptional() @IsInt() @Min(SQUAD_GOAL_MIN) @Max(SQUAD_GOAL_MAX) weeklyGoal?: number;
}

class JoinSquadDto {
  @IsString() @MaxLength(32) code!: string;
}

class CreateDuelDto {
  @IsUUID() buddyId!: string;
  // Not a UUID: imported courses use their own lesson ids (e.g. "les-c4-joel-m3-l1").
  @IsString() @MaxLength(64) lessonId!: string;
}

class DuelAnswersDto {
  /** questionId → optionId. Unknown ids are ignored by the scorer. */
  @IsObject() answers!: Record<string, string>;
}

class PresenceDto {
  // Not a UUID: imported courses use their own lesson ids (e.g. "les-c4-joel-m3-l1").
  @IsString() @MaxLength(64) lessonId!: string;
}

class ClientEventsDto {
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => ClientEventDto)
  events!: ClientEventDto[];
}

/**
 * The Teyro Network (docs/TEYRO_NETWORK_PLAN.md). Unversioned at root to
 * match the live API's layout (CLAUDE.md §5); the frontend reaches it as
 * /api/network/* through the fallback rewrite.
 */
@UseGuards(AuthGuard('jwt'))
@Controller('network')
export class NetworkController {
  constructor(
    private readonly buddies: BuddyService,
    private readonly feeds: NetworkFeedService,
    private readonly events: NetworkEventsService,
    private readonly people: PeopleService,
    private readonly squads: SquadService,
    private readonly duels: DuelService,
    private readonly presence: PresenceService,
  ) {}

  // ── Squads ─────────────────────────────────────────────────────────────

  @Get('squad')
  squad(@Req() req: any) {
    return this.squads.mine(req.user.id as string);
  }

  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('squad')
  createSquad(@Req() req: any, @Body() dto: CreateSquadDto) {
    return this.squads.create(req.user.id as string, dto);
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('squad/join')
  joinSquad(@Req() req: any, @Body() dto: JoinSquadDto) {
    return this.squads.join(req.user.id as string, dto.code);
  }

  @Get('squad/preview/:code')
  previewSquad(@Param('code') code: string) {
    return this.squads.preview(code.slice(0, 32));
  }

  @Delete('squad')
  leaveSquad(@Req() req: any) {
    return this.squads.leave(req.user.id as string);
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('squad/invite/:buddyId')
  inviteToSquad(@Req() req: any, @Param('buddyId', ParseUUIDPipe) buddyId: string) {
    return this.squads.invite(req.user.id as string, buddyId);
  }

  // ── Duels ──────────────────────────────────────────────────────────────

  @Get('duels')
  listDuels(@Req() req: any) {
    return this.duels.list(req.user.id as string);
  }

  @Get('duels/options/:buddyId')
  duelOptions(@Req() req: any, @Param('buddyId', ParseUUIDPipe) buddyId: string) {
    return this.duels.options(req.user.id as string, buddyId);
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('duels')
  createDuel(@Req() req: any, @Body() dto: CreateDuelDto) {
    return this.duels.create(req.user.id as string, dto.buddyId, dto.lessonId);
  }

  @Get('duels/:id')
  getDuel(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.duels.get(req.user.id as string, id);
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('duels/:id/answers')
  answerDuel(@Req() req: any, @Param('id', ParseUUIDPipe) id: string, @Body() dto: DuelAnswersDto) {
    return this.duels.submit(req.user.id as string, id, dto.answers);
  }

  // ── Co-learning presence ───────────────────────────────────────────────

  /** Heartbeat from the lesson player (about once a minute). */
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('presence')
  ping(@Req() req: any, @Body() dto: PresenceDto) {
    return this.presence.ping(req.user.id as string, dto.lessonId);
  }

  @Delete('presence')
  leavePresence(@Req() req: any) {
    return this.presence.leave(req.user.id as string);
  }

  /** Batched card telemetry from the browser (impressions, taps). */
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @Post('events')
  recordEvents(@Req() req: any, @Body() dto: ClientEventsDto) {
    return this.events.recordClient(req.user.id as string, dto.events);
  }

  /** "Find me a study buddy" — sends the best match a request. */
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('match')
  match(@Req() req: any) {
    return this.people.findMatch(req.user.id as string);
  }

  @Get('cohort')
  cohort(@Req() req: any) {
    return this.people.cohort(req.user.id as string);
  }

  /** Share code that passed a lesson's checks with your network. */
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('share')
  share(@Req() req: any, @Body() dto: ShareWorkDto) {
    return this.feeds.shareWork(req.user.id as string, dto);
  }

  @Get('feed')
  feed(@Req() req: any) {
    return this.feeds.feed(req.user.id as string);
  }

  @Throttle({ default: { limit: 60, ttl: 60_000 } })
  @Post('activities/:id/cheer')
  cheer(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.feeds.cheer(req.user.id as string, id);
  }

  @Get('users/:id/timeline')
  timeline(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.feeds.timeline(req.user.id as string, id);
  }

  @Get('buddies')
  list(@Req() req: any) {
    return this.buddies.list(req.user.id as string);
  }

  @Get('suggestions')
  suggestions(@Req() req: any) {
    return this.buddies.suggestions(req.user.id as string);
  }

  /** Ask — or accept, when they already asked you. */
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Post('buddies/:id')
  request(@Req() req: any, @Param('id', ParseUUIDPipe) id: string, @Body() dto: BuddyRequestDto) {
    return this.buddies.request(req.user.id as string, id, dto?.courseId);
  }

  /** Decline, cancel or un-buddy. */
  @Delete('buddies/:id')
  remove(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.buddies.remove(req.user.id as string, id);
  }

  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('buddies/:id/nudge')
  nudge(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.buddies.nudge(req.user.id as string, id);
  }
}
