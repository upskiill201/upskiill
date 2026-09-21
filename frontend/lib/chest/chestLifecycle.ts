/**
 * The treasure chest's interaction lifecycle, as a pure state machine.
 *
 * This lives outside the React component on purpose. The chest's hard parts
 * are all ordering problems — a tap that lands before the server has resolved
 * the reward, a reveal that arrives twice, a second chest inheriting the
 * first one's guards — and none of them are rendering problems. Keeping the
 * transitions pure means they can be tested exhaustively in the repo's
 * existing node-environment Jest setup, without a DOM or a Rive canvas.
 *
 * `TreasureChest.tsx` is a thin driver: it turns Rive callbacks into events,
 * feeds them here, and performs whatever effects come back.
 *
 * Two invariants this machine exists to guarantee:
 *   1. `FireClick` is never emitted before a reward has been applied, because
 *      the asset's `rewardType` defaults to coins and would happily reveal
 *      the wrong thing.
 *   2. `EmitReveal` fires at most once per cycle, and only out of `opening`.
 */

import type { RiveRewardType } from '@/components/celebration/currency';

export type ChestErrorReason = 'load' | 'contract' | 'reward';

export type ChestPhase =
  | { status: 'loading' }
  /** Rive is bound and the contract verified, but no reward is configured. */
  | { status: 'ready' }
  /** Reward written to the view model; waiting on the learner. */
  | { status: 'armed'; reward: RiveRewardType }
  /** Learner has tapped; Rive owns the progression from here. */
  | { status: 'opening'; reward: RiveRewardType }
  | { status: 'revealed'; reward: RiveRewardType }
  | { status: 'error'; reason: ChestErrorReason; detail: string };

export type ChestEvent =
  | { type: 'RiveReady' }
  | { type: 'RiveFailed'; detail: string }
  | { type: 'ContractFailed'; detail: string }
  | { type: 'RewardResolved'; reward: RiveRewardType }
  | { type: 'RewardUnsupported'; detail: string }
  | { type: 'Tap' }
  | { type: 'Reveal' }
  | { type: 'Reset' };

export type ChestEffect =
  /** Tell the caller the learner has engaged — its cue to resolve the reward. */
  | { type: 'EmitStart' }
  /** Write the reward enum to the view model before anything else happens. */
  | { type: 'ApplyReward'; reward: RiveRewardType }
  | { type: 'FireClick' }
  | { type: 'FireReset' }
  | { type: 'EmitTap'; tapIndex: number }
  | { type: 'EmitReveal' }
  | { type: 'EmitError'; reason: ChestErrorReason; detail: string };

export interface ChestState {
  phase: ChestPhase;
  /** Bumped on every reset; invalidates the previous cycle's guards at once. */
  cycle: number;
  tapIndex: number;
  /** At most one tap is held while the reward resolves — never a queue. */
  pendingTap: boolean;
  /** Whether `EmitStart` has already fired for the current cycle. */
  started: boolean;
  /** Whether `EmitReveal` has already fired for the current cycle. */
  revealed: boolean;
}

export function initialChestState(): ChestState {
  return {
    phase: { status: 'loading' },
    cycle: 0,
    tapIndex: 0,
    pendingTap: false,
    started: false,
    revealed: false,
  };
}

interface Transition {
  state: ChestState;
  effects: ChestEffect[];
}

const stay = (state: ChestState): Transition => ({ state, effects: [] });

/** Guards cleared for a brand-new cycle. Phase is set by the caller. */
function freshCycle(state: ChestState, phase: ChestPhase): ChestState {
  return {
    phase,
    cycle: state.cycle + 1,
    tapIndex: 0,
    pendingTap: false,
    started: false,
    revealed: false,
  };
}

export function chestReducer(state: ChestState, event: ChestEvent): Transition {
  switch (event.type) {
    // ── Initialization ────────────────────────────────────────────────────
    case 'RiveReady': {
      if (state.phase.status !== 'loading') return stay(state);
      // A tap may already be held from before the file finished loading; it
      // stays held until a reward arrives, which is the only thing that can
      // safely release it.
      return { state: { ...state, phase: { status: 'ready' } }, effects: [] };
    }

    case 'RiveFailed':
    case 'ContractFailed': {
      const reason: ChestErrorReason = event.type === 'RiveFailed' ? 'load' : 'contract';
      if (state.phase.status === 'error') return stay(state);
      return {
        state: { ...state, phase: { status: 'error', reason, detail: event.detail }, pendingTap: false },
        effects: [{ type: 'EmitError', reason, detail: event.detail }],
      };
    }

    case 'RewardUnsupported': {
      if (state.phase.status === 'error') return stay(state);
      return {
        state: {
          ...state,
          phase: { status: 'error', reason: 'reward', detail: event.detail },
          pendingTap: false,
        },
        effects: [{ type: 'EmitError', reason: 'reward', detail: event.detail }],
      };
    }

    // ── Reward configuration ──────────────────────────────────────────────
    case 'RewardResolved': {
      const { status } = state.phase;
      // Only meaningful before the chest starts opening. A reward arriving
      // mid-open is re-asserted on the next tap instead, so we never rewrite
      // the enum underneath a running reveal.
      if (status !== 'ready' && status !== 'armed') return stay(state);

      const effects: ChestEffect[] = [{ type: 'ApplyReward', reward: event.reward }];

      if (state.pendingTap) {
        const tapIndex = state.tapIndex + 1;
        return {
          state: {
            ...state,
            phase: { status: 'opening', reward: event.reward },
            pendingTap: false,
            tapIndex,
          },
          effects: [...effects, { type: 'FireClick' }, { type: 'EmitTap', tapIndex }],
        };
      }
      return {
        state: { ...state, phase: { status: 'armed', reward: event.reward } },
        effects,
      };
    }

    // ── Learner interaction ───────────────────────────────────────────────
    case 'Tap': {
      const effects: ChestEffect[] = [];
      let started = state.started;
      if (!started) {
        started = true;
        effects.push({ type: 'EmitStart' });
      }

      switch (state.phase.status) {
        case 'error':
          // No animation to drive, but the learner's intent still counts:
          // the caller resolves and presents the reward its own way.
          return { state: { ...state, started }, effects };

        case 'revealed':
          // A click here walks the state machine back to `hovering` and
          // re-closes the chest. Drop it entirely.
          return stay(state);

        case 'loading':
        case 'ready':
          // Hold exactly one tap. Extra taps are absorbed, not queued, so a
          // learner drumming on the chest doesn't fire a burst of clicks the
          // instant the reward lands.
          return { state: { ...state, started, pendingTap: true }, effects };

        case 'armed': {
          const tapIndex = state.tapIndex + 1;
          return {
            state: { ...state, started, tapIndex, phase: { status: 'opening', reward: state.phase.reward } },
            effects: [...effects, { type: 'FireClick' }, { type: 'EmitTap', tapIndex }],
          };
        }

        case 'opening': {
          // Rive owns the progression; keep forwarding taps so it can advance
          // through its swipe/struggle states. Re-assert the reward first so
          // a prop change mid-open can't let the reveal land on a stale one.
          const tapIndex = state.tapIndex + 1;
          return {
            state: { ...state, started, tapIndex },
            effects: [
              ...effects,
              { type: 'ApplyReward', reward: state.phase.reward },
              { type: 'FireClick' },
              { type: 'EmitTap', tapIndex },
            ],
          };
        }
      }
      return stay(state);
    }

    // ── Reveal ────────────────────────────────────────────────────────────
    case 'Reveal': {
      if (state.revealed) return stay(state);
      // Only a chest we actually accepted a tap for may complete. A reveal in
      // any other phase is an unexplained transition, not a completion.
      if (state.phase.status !== 'opening') return stay(state);
      return {
        state: {
          ...state,
          revealed: true,
          phase: { status: 'revealed', reward: state.phase.reward },
        },
        effects: [{ type: 'EmitReveal' }],
      };
    }

    // ── Reset ─────────────────────────────────────────────────────────────
    case 'Reset': {
      // Errors are not recoverable by reset: the asset is broken, not the
      // cycle, so re-arming would just fail the same way.
      if (state.phase.status === 'error') return stay(state);
      return {
        state: freshCycle(state, { status: 'ready' }),
        effects: [{ type: 'FireReset' }],
      };
    }
  }
}

/** Convenience for drivers: fold a sequence of events, collecting effects. */
export function runChestEvents(
  state: ChestState,
  events: ChestEvent[]
): { state: ChestState; effects: ChestEffect[] } {
  let next = state;
  const effects: ChestEffect[] = [];
  for (const event of events) {
    const step = chestReducer(next, event);
    next = step.state;
    effects.push(...step.effects);
  }
  return { state: next, effects };
}
