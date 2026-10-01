import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { SupportService } from './support.service';
import {
  CreateTicketDto,
  ReplyDto,
  SetStatusDto,
  SUPPORT_AUDIENCES,
  SUPPORT_KINDS,
  SUPPORT_STATUSES,
  type SupportAudience,
  type SupportKind,
  type SupportStatus,
} from './support.dto';

const pick = <T extends string>(
  list: readonly T[],
  v?: string,
): T | undefined =>
  v && (list as readonly string[]).includes(v) ? (v as T) : undefined;

/** A learner's or creator's own conversations with Teyro. */
@Controller('support')
@UseGuards(AuthGuard('jwt'))
export class SupportController {
  constructor(private readonly support: SupportService) {}

  @Post('tickets')
  @Throttle({ default: { limit: 6, ttl: 600_000 } }) // 6 per 10 minutes
  create(
    @Req() req: any,
    @Body() dto: CreateTicketDto,
    @Headers('user-agent') ua?: string,
  ) {
    return this.support.create(req.user.id as string, dto, ua);
  }

  @Get('tickets')
  list(@Req() req: any, @Query('audience') audience?: string) {
    return this.support.listMine(
      req.user.id as string,
      pick<SupportAudience>(SUPPORT_AUDIENCES, audience),
    );
  }

  @Get('unread')
  unread(@Req() req: any, @Query('audience') audience?: string) {
    return this.support.unreadCount(
      req.user.id as string,
      pick<SupportAudience>(SUPPORT_AUDIENCES, audience),
    );
  }

  @Get('tickets/:id')
  get(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.support.getMine(req.user.id as string, id);
  }

  @Post('tickets/:id/replies')
  @Throttle({ default: { limit: 20, ttl: 600_000 } })
  reply(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReplyDto,
  ) {
    return this.support.replyMine(req.user.id as string, id, dto.message);
  }

  @Post('tickets/:id/close')
  close(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.support.closeMine(req.user.id as string, id);
  }
}

/** Teyro's team inbox. ADMIN only. */
@Controller('support/admin')
@Roles(Role.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SupportAdminController {
  constructor(private readonly support: SupportService) {}

  @Get('tickets')
  list(
    @Query('status') status?: string,
    @Query('audience') audience?: string,
    @Query('kind') kind?: string,
    @Query('q') q?: string,
  ) {
    return this.support.adminList({
      status: pick<SupportStatus>(SUPPORT_STATUSES, status),
      audience: pick<SupportAudience>(SUPPORT_AUDIENCES, audience),
      kind: pick<SupportKind>(SUPPORT_KINDS, kind),
      q: q?.slice(0, 120),
    });
  }

  @Get('tickets/:id')
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.support.adminGet(id);
  }

  @Post('tickets/:id/replies')
  reply(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReplyDto,
  ) {
    return this.support.adminReply(req.user.id as string, id, dto.message);
  }

  @Patch('tickets/:id/status')
  setStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: SetStatusDto) {
    return this.support.adminSetStatus(id, dto.status);
  }
}
