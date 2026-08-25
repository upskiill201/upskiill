import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { XpAwardedEvent } from './events/xp-awarded.event';
import { LeagueService } from './league.service';

/**
 * Consumes every 'xp.awarded' domain event and credits it to the user's
 * weekly league standings. XP from any source counts toward the league week,
 * exactly like Duolingo. Failures are logged and swallowed — league tracking
 * must never break the flow that awarded the XP.
 */
@Injectable()
export class LeagueListener {
  private readonly logger = new Logger(LeagueListener.name);

  constructor(private readonly leagueService: LeagueService) {}

  @OnEvent('xp.awarded', { async: true })
  async handleXpAwarded(event: XpAwardedEvent) {
    try {
      await this.leagueService.recordXp(event.userId, event.amount, event.awardedAt, event.source);
    } catch (err) {
      this.logger.error(
        `[Event Error] Failed crediting ${event.amount} XP to league week for user ${event.userId}`,
        err as Error,
      );
    }
  }
}
