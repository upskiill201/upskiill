import {
  chestReducer,
  initialChestState,
  runChestEvents,
  type ChestEffect,
  type ChestEvent,
  type ChestState,
} from '../chestLifecycle';

/** Drive the machine from scratch and return the final state + all effects. */
function run(events: ChestEvent[], from: ChestState = initialChestState()) {
  return runChestEvents(from, events);
}

const kinds = (effects: ChestEffect[]) => effects.map((e) => e.type);
const count = (effects: ChestEffect[], type: ChestEffect['type']) =>
  effects.filter((e) => e.type === type).length;

/** The happy path up to "armed and waiting for the learner". */
const ARMED: ChestEvent[] = [{ type: 'RiveReady' }, { type: 'RewardResolved', reward: 'xpRewards' }];

describe('chest lifecycle — initialization', () => {
  it('starts in loading with clean guards', () => {
    const s = initialChestState();
    expect(s.phase).toEqual({ status: 'loading' });
    expect(s.started).toBe(false);
    expect(s.revealed).toBe(false);
    expect(s.pendingTap).toBe(false);
    expect(s.tapIndex).toBe(0);
  });

  it('RiveReady moves loading → ready without side effects', () => {
    const { state, effects } = run([{ type: 'RiveReady' }]);
    expect(state.phase).toEqual({ status: 'ready' });
    expect(effects).toEqual([]);
  });

  it('ignores a second RiveReady', () => {
    const { state } = run([{ type: 'RiveReady' }, { type: 'RiveReady' }]);
    expect(state.phase).toEqual({ status: 'ready' });
  });

  it('is not ready merely because the canvas exists — only RiveReady arms it', () => {
    const { state, effects } = run([{ type: 'Tap' }]);
    expect(state.phase).toEqual({ status: 'loading' });
    expect(kinds(effects)).toEqual(['EmitStart']);
    expect(count(effects, 'FireClick')).toBe(0);
  });
});

describe('chest lifecycle — reward configuration', () => {
  it('applies the reward and arms the chest', () => {
    const { state, effects } = run(ARMED);
    expect(state.phase).toEqual({ status: 'armed', reward: 'xpRewards' });
    expect(effects).toEqual([{ type: 'ApplyReward', reward: 'xpRewards' }]);
  });

  it('re-applies when the reward prop changes before the first tap', () => {
    const { state, effects } = run([...ARMED, { type: 'RewardResolved', reward: 'hartRewards' }]);
    expect(state.phase).toEqual({ status: 'armed', reward: 'hartRewards' });
    expect(effects.filter((e) => e.type === 'ApplyReward')).toEqual([
      { type: 'ApplyReward', reward: 'xpRewards' },
      { type: 'ApplyReward', reward: 'hartRewards' },
    ]);
  });

  it('does not rewrite the enum underneath a running reveal', () => {
    const { state, effects } = run([
      ...ARMED,
      { type: 'Tap' },
      { type: 'RewardResolved', reward: 'coinRewards' },
    ]);
    // still opening the reward it started with
    expect(state.phase).toEqual({ status: 'opening', reward: 'xpRewards' });
    expect(count(effects, 'ApplyReward')).toBe(1);
  });

  it('an unsupported reward errors instead of defaulting to coins', () => {
    const { state, effects } = run([
      { type: 'RiveReady' },
      { type: 'RewardUnsupported', detail: 'MYSTERY_BOX' },
    ]);
    expect(state.phase).toEqual({ status: 'error', reason: 'reward', detail: 'MYSTERY_BOX' });
    expect(kinds(effects)).toEqual(['EmitError']);
    expect(count(effects, 'ApplyReward')).toBe(0);
    expect(count(effects, 'FireClick')).toBe(0);
  });
});

describe('chest lifecycle — the click trigger is never fired unconfigured', () => {
  it('holds a tap that lands before the reward resolves, then releases exactly one', () => {
    const { state, effects } = run([
      { type: 'RiveReady' },
      { type: 'Tap' },
      { type: 'RewardResolved', reward: 'coinRewards' },
    ]);
    expect(state.phase).toEqual({ status: 'opening', reward: 'coinRewards' });
    // ApplyReward must precede FireClick — the whole point of the hold.
    expect(kinds(effects)).toEqual(['EmitStart', 'ApplyReward', 'FireClick', 'EmitTap']);
    expect(state.tapIndex).toBe(1);
  });

  it('absorbs a burst of early taps into a single click', () => {
    const { state, effects } = run([
      { type: 'RiveReady' },
      ...Array<ChestEvent>(8).fill({ type: 'Tap' }),
      { type: 'RewardResolved', reward: 'coinRewards' },
    ]);
    expect(count(effects, 'FireClick')).toBe(1);
    expect(count(effects, 'EmitStart')).toBe(1);
    expect(state.tapIndex).toBe(1);
  });

  it('never emits FireClick before ApplyReward, under any event ordering', () => {
    const orderings: ChestEvent[][] = [
      [{ type: 'RiveReady' }, { type: 'Tap' }, { type: 'RewardResolved', reward: 'xpRewards' }],
      [{ type: 'Tap' }, { type: 'RiveReady' }, { type: 'RewardResolved', reward: 'xpRewards' }],
      [{ type: 'RiveReady' }, { type: 'RewardResolved', reward: 'xpRewards' }, { type: 'Tap' }],
      [{ type: 'Tap' }, { type: 'Tap' }, { type: 'RiveReady' }, { type: 'RewardResolved', reward: 'xpRewards' }],
    ];
    for (const events of orderings) {
      const { effects } = run(events);
      const firstClick = effects.findIndex((e) => e.type === 'FireClick');
      const firstApply = effects.findIndex((e) => e.type === 'ApplyReward');
      expect(firstApply).toBeGreaterThanOrEqual(0);
      expect(firstClick).toBeGreaterThan(firstApply);
    }
  });
});

describe('chest lifecycle — tapping through the opening sequence', () => {
  it('forwards every tap while opening and re-asserts the reward each time', () => {
    const { state, effects } = run([...ARMED, { type: 'Tap' }, { type: 'Tap' }, { type: 'Tap' }]);
    expect(state.phase).toEqual({ status: 'opening', reward: 'xpRewards' });
    expect(count(effects, 'FireClick')).toBe(3);
    expect(state.tapIndex).toBe(3);
    // 1 on arming + 2 re-assertions on the follow-up taps
    expect(count(effects, 'ApplyReward')).toBe(3);
  });

  it('emits a 1-based tap index on every forwarded tap', () => {
    const { effects } = run([...ARMED, { type: 'Tap' }, { type: 'Tap' }]);
    expect(effects.filter((e) => e.type === 'EmitTap')).toEqual([
      { type: 'EmitTap', tapIndex: 1 },
      { type: 'EmitTap', tapIndex: 2 },
    ]);
  });

  it('fires EmitStart exactly once no matter how many taps', () => {
    const { effects } = run([...ARMED, ...Array<ChestEvent>(10).fill({ type: 'Tap' })]);
    expect(count(effects, 'EmitStart')).toBe(1);
  });
});

describe('chest lifecycle — reveal', () => {
  it('completes on the Rive reveal event', () => {
    const { state, effects } = run([...ARMED, { type: 'Tap' }, { type: 'Reveal' }]);
    expect(state.phase).toEqual({ status: 'revealed', reward: 'xpRewards' });
    expect(count(effects, 'EmitReveal')).toBe(1);
  });

  it('is idempotent across duplicate reveal events', () => {
    const { effects } = run([
      ...ARMED,
      { type: 'Tap' },
      { type: 'Reveal' },
      { type: 'Reveal' },
      { type: 'Reveal' },
    ]);
    expect(count(effects, 'EmitReveal')).toBe(1);
  });

  it('ignores a reveal that arrives before any tap was accepted', () => {
    const { state, effects } = run([...ARMED, { type: 'Reveal' }]);
    expect(state.phase).toEqual({ status: 'armed', reward: 'xpRewards' });
    expect(count(effects, 'EmitReveal')).toBe(0);
  });

  it('ignores a reveal while still loading', () => {
    const { state, effects } = run([{ type: 'Reveal' }]);
    expect(state.phase).toEqual({ status: 'loading' });
    expect(effects).toEqual([]);
  });

  it('drops taps after the reveal — they would re-close the chest', () => {
    const { state, effects } = run([
      ...ARMED,
      { type: 'Tap' },
      { type: 'Reveal' },
      { type: 'Tap' },
      { type: 'Tap' },
    ]);
    expect(state.phase).toEqual({ status: 'revealed', reward: 'xpRewards' });
    // one click from the opening tap, none after the reveal
    expect(count(effects, 'FireClick')).toBe(1);
    expect(state.tapIndex).toBe(1);
  });
});

describe('chest lifecycle — repeated cycles', () => {
  it('reset clears every guard and starts a fresh cycle', () => {
    const first = run([...ARMED, { type: 'Tap' }, { type: 'Reveal' }]);
    expect(first.state.cycle).toBe(0);

    const { state, effects } = run([{ type: 'Reset' }], first.state);
    expect(state.phase).toEqual({ status: 'ready' });
    expect(state.cycle).toBe(1);
    expect(state.started).toBe(false);
    expect(state.revealed).toBe(false);
    expect(state.pendingTap).toBe(false);
    expect(state.tapIndex).toBe(0);
    expect(kinds(effects)).toEqual(['FireReset']);
  });

  it('runs chest A → B → C, each with its own reward and its own reveal', () => {
    let state = initialChestState();
    const rewards = ['coinRewards', 'hartRewards', 'xpBoostRewards'] as const;
    const revealedRewards: string[] = [];

    state = run([{ type: 'RiveReady' }], state).state;

    rewards.forEach((reward, i) => {
      if (i > 0) state = run([{ type: 'Reset' }], state).state;
      const cycle = run(
        [{ type: 'RewardResolved', reward }, { type: 'Tap' }, { type: 'Tap' }, { type: 'Reveal' }],
        state
      );
      state = cycle.state;
      expect(count(cycle.effects, 'EmitReveal')).toBe(1);
      expect(count(cycle.effects, 'EmitStart')).toBe(1);
      expect(state.phase).toEqual({ status: 'revealed', reward });
      revealedRewards.push(reward);
    });

    expect(revealedRewards).toEqual([...rewards]);
    expect(state.cycle).toBe(2);
  });

  it("a stale reveal from the previous cycle cannot complete the next one", () => {
    // Cycle A completes, we reset, and a late duplicate reveal arrives before
    // the learner has touched chest B.
    let state = run([...ARMED, { type: 'Tap' }, { type: 'Reveal' }]).state;
    state = run([{ type: 'Reset' }], state).state;
    const late = run([{ type: 'RewardResolved', reward: 'coinRewards' }, { type: 'Reveal' }], state);
    expect(late.state.phase).toEqual({ status: 'armed', reward: 'coinRewards' });
    expect(count(late.effects, 'EmitReveal')).toBe(0);
  });

  it('re-arms after a reset when the reward is unchanged', () => {
    // Regression: `reset` does not clear Rive's rewardType enum, and a caller
    // may hand the next cycle the same reward. If nothing re-applies it the
    // chest sits in `ready` holding taps that are never released.
    let state = run([...ARMED, { type: 'Tap' }, { type: 'Reveal' }]).state;
    state = run([{ type: 'Reset' }], state).state;
    expect(state.phase).toEqual({ status: 'ready' });

    const reArmed = run([{ type: 'RewardResolved', reward: 'xpRewards' }], state);
    expect(reArmed.state.phase).toEqual({ status: 'armed', reward: 'xpRewards' });
    expect(reArmed.effects).toContainEqual({ type: 'ApplyReward', reward: 'xpRewards' });

    // and it opens normally from there
    const opened = run([{ type: 'Tap' }, { type: 'Reveal' }], reArmed.state);
    expect(opened.state.phase).toEqual({ status: 'revealed', reward: 'xpRewards' });
    expect(count(opened.effects, 'EmitReveal')).toBe(1);
  });

  it('the second cycle does not inherit the first cycle’s tap count', () => {
    let state = run([...ARMED, { type: 'Tap' }, { type: 'Tap' }, { type: 'Tap' }]).state;
    expect(state.tapIndex).toBe(3);
    state = run([{ type: 'Reset' }], state).state;
    const second = run([{ type: 'RewardResolved', reward: 'coinRewards' }, { type: 'Tap' }], state);
    expect(second.effects).toContainEqual({ type: 'EmitTap', tapIndex: 1 });
  });
});

describe('chest lifecycle — errors and fallback', () => {
  it('a load failure errors once and reports once', () => {
    const { state, effects } = run([{ type: 'RiveFailed', detail: '404' }]);
    expect(state.phase).toEqual({ status: 'error', reason: 'load', detail: '404' });
    expect(kinds(effects)).toEqual(['EmitError']);
  });

  it('does not re-report an error that is already latched', () => {
    const { effects } = run([
      { type: 'RiveFailed', detail: '404' },
      { type: 'RiveFailed', detail: '404' },
      { type: 'ContractFailed', detail: 'no view model' },
    ]);
    expect(count(effects, 'EmitError')).toBe(1);
  });

  it('a contract failure is distinguished from a load failure', () => {
    const { state } = run([{ type: 'ContractFailed', detail: 'missing rewardType' }]);
    expect(state.phase).toMatchObject({ status: 'error', reason: 'contract' });
  });

  it('tapping the fallback still signals intent but never touches Rive', () => {
    const { effects } = run([
      { type: 'RiveFailed', detail: '404' },
      { type: 'Tap' },
      { type: 'Tap' },
    ]);
    expect(count(effects, 'EmitStart')).toBe(1);
    expect(count(effects, 'FireClick')).toBe(0);
    expect(count(effects, 'FireReset')).toBe(0);
  });

  it('reset does not paper over a broken asset', () => {
    const { state, effects } = run([{ type: 'ContractFailed', detail: 'bad' }, { type: 'Reset' }]);
    expect(state.phase).toMatchObject({ status: 'error' });
    expect(count(effects, 'FireReset')).toBe(0);
  });

  it('a held tap is discarded when the chest errors out', () => {
    const { state } = run([
      { type: 'RiveReady' },
      { type: 'Tap' },
      { type: 'ContractFailed', detail: 'bad' },
    ]);
    expect(state.pendingTap).toBe(false);
  });
});

describe('chest lifecycle — the component can never be in two phases at once', () => {
  it('every reachable state has exactly one status', () => {
    const sequences: ChestEvent[][] = [
      [],
      [{ type: 'RiveReady' }],
      ARMED,
      [...ARMED, { type: 'Tap' }],
      [...ARMED, { type: 'Tap' }, { type: 'Reveal' }],
      [...ARMED, { type: 'Tap' }, { type: 'Reveal' }, { type: 'Reset' }],
      [{ type: 'RiveFailed', detail: 'x' }],
    ];
    const seen = new Set<string>();
    for (const events of sequences) {
      const { state } = run(events);
      expect(typeof state.phase.status).toBe('string');
      seen.add(state.phase.status);
      // `revealed` is the only status that implies the reveal guard is set
      expect(state.revealed).toBe(state.phase.status === 'revealed');
    }
    expect(seen).toEqual(new Set(['loading', 'ready', 'armed', 'opening', 'revealed', 'error']));
  });

  it('pure: the same state and event always produce the same transition', () => {
    const state = run(ARMED).state;
    const a = chestReducer(state, { type: 'Tap' });
    const b = chestReducer(state, { type: 'Tap' });
    expect(a).toEqual(b);
    // and the input was not mutated
    expect(state.phase).toEqual({ status: 'armed', reward: 'xpRewards' });
    expect(state.tapIndex).toBe(0);
  });
});
