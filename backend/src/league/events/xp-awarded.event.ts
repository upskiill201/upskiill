/**
 * Fired from every XP award site (lesson completion, mission claims, chest and
 * spin rewards, community posts/comments…). The LeagueListener consumes these
 * to keep the weekly league standings in sync — XP from any source counts
 * toward the current league week, exactly like Duolingo.
 */
export class XpAwardedEvent {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
    /** 'LESSON' | 'MISSION' | 'REWARD' | 'CHEST' | 'SPIN' | 'COMMUNITY' … */
    public readonly source: string,
    public readonly awardedAt: Date = new Date(),
  ) {}
}
