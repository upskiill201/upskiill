import { Injectable, Logger } from '@nestjs/common';
import type { TeyContext } from '../contracts/tey-context.types';
import type { LearnerStateSnapshot } from '../contracts/tey-state.types';
import { resolveLocalNow, TeyLocalNow } from '../state/local-time.util';
import { localTimeToday, ruleById, ScheduleIntent, TEY_RULES } from './rules';

export interface RevalidationResult {
  relevant: boolean;
  /** Present only when relevant. */
  context?: TeyContext;
  /** Present only when not relevant — recorded as the action's skipReason. */
  skipReason?: string;
}

/**
 * Decides whether Tey should act, and never what it should say.
 *
 * The output is a structured intent or a TeyContext — never prose. Keeping
 * message generation out of this layer is what lets templates and (later) an
 * LLM swap places without touching a single decision.
 */
@Injectable()
export class TeyDecisionService {
  private readonly logger = new Logger(TeyDecisionService.name);

  /**
   * Evaluates every rule and returns what should be queued.
   *
   * Where two rules would fire, the higher-urgency one wins and its
   * `supersedes` list suppresses the others — so a learner two hours from
   * losing a 40-day streak gets one CRITICAL nudge, not three overlapping
   * reminders about the same evening.
   */
  evaluate(
    state: LearnerStateSnapshot,
    now: TeyLocalNow = resolveLocalNow(null),
  ): ScheduleIntent[] {
    const planned: ScheduleIntent[] = [];
    const superseded = new Set<string>();
    // The learner's current wall clock, as a real instant.
    const nowInstant = localTimeToday(now, 0, now.minutesOfDay).getTime();

    for (const rule of TEY_RULES) {
      let intent: ScheduleIntent | null = null;
      try {
        intent = rule.plan(state, now);
      } catch (err) {
        // One misbehaving rule must not silence every other nudge.
        this.logger.error(`Rule ${rule.id} threw during plan`, err as Error);
        continue;
      }
      if (!intent) continue;

      // Never queue something that can no longer fire. Rules compute their
      // window from the learner's local day, so evaluating at 23:45 can produce
      // a 20:00 slot that is already hours gone. The scheduler would claim it,
      // mark it EXPIRED, and drop it — correct, but it burns a row and a batch
      // slot every tick for no reason. One guard here covers every rule.
      if (intent.expiresAt.getTime() <= nowInstant) continue;

      // TEY_RULES is ordered by descending urgency, so anything this rule
      // supersedes either has not been planned yet or is outranked.
      for (const s of rule.supersedes) superseded.add(s);
      planned.push(intent);
    }

    return planned.filter((i) => !superseded.has(i.ruleId));
  }

  /**
   * Re-checks a scheduled action against freshly projected state, immediately
   * before it would be sent.
   *
   * This is spec section 10 and it is not optional: it is the difference
   * between "Tey is smart" and "Tey nags people who already did the work". It
   * is also what makes the lossy in-process event chain safe — a missed event
   * costs freshness, never a wrong send.
   */
  revalidate(
    ruleId: string,
    state: LearnerStateSnapshot,
    now: TeyLocalNow = resolveLocalNow(null),
  ): RevalidationResult {
    const rule = ruleById(ruleId);
    if (!rule) {
      // A rule removed in a deploy leaves rows behind pointing at it.
      return { relevant: false, skipReason: 'UNKNOWN_RULE' };
    }

    try {
      if (!rule.stillRelevant(state, now)) {
        return { relevant: false, skipReason: 'NO_LONGER_RELEVANT' };
      }
      return { relevant: true, context: rule.buildContext(state, now) };
    } catch (err) {
      this.logger.error(
        `Rule ${ruleId} threw during revalidation`,
        err as Error,
      );
      // Fail closed: when in doubt, do not interrupt the learner.
      return { relevant: false, skipReason: 'RULE_ERROR' };
    }
  }

  /** Rule ids whose pending actions a completed lesson should cancel. */
  cancellableOnActivity(): string[] {
    return TEY_RULES.map((r) => r.id);
  }
}
