import {
  CHEST_REVEAL_EVENT,
  CHEST_REWARD_ENUM_PROPERTY,
  CHEST_REWARD_VM_CANDIDATES,
  CHEST_TRIGGER_CLICK,
  CHEST_TRIGGER_RESET,
  RIVE_REWARD_TYPES,
  isTeyroRewardType,
  safeToRiveRewardType,
  toRiveRewardType,
  toTreasureChestRewardType,
  type TeyroRewardType,
} from '../currency';

/**
 * These values are a contract with a binary we don't control. Every string
 * here was read out of treasure_chest.riv with the installed runtime; if the
 * animator renames one, this file should fail before the chest silently
 * reveals the wrong reward in production.
 */
describe('Rive reward enum mapping', () => {
  it.each([
    ['coins', 'coinRewards'],
    ['xp', 'xpRewards'],
    ['hearts', 'hartRewards'],
    ['streakFreeze', 'streakFreezeRewards'],
    ['xpBoost', 'xpBoostRewards'],
  ] as const)('maps %s → %s', (teyro, rive) => {
    expect(toRiveRewardType(teyro)).toBe(rive);
  });

  it('covers every reward type exactly once, with no duplicate enum values', () => {
    const all: TeyroRewardType[] = ['coins', 'xp', 'hearts', 'streakFreeze', 'xpBoost'];
    const mapped = all.map(toRiveRewardType);
    expect(new Set(mapped).size).toBe(all.length);
    expect(new Set(mapped)).toEqual(new Set(RIVE_REWARD_TYPES));
  });

  it("keeps the animator's 'hart' spelling", () => {
    // Deliberate: the .riv declares hartRewards. "Fixing" this to
    // heartRewards makes every heart reward reveal as the default (coins).
    expect(toRiveRewardType('hearts')).toBe('hartRewards');
    expect(RIVE_REWARD_TYPES).not.toContain('heartRewards');
  });
});

describe('reward type validation', () => {
  it('accepts every supported type', () => {
    for (const t of ['coins', 'xp', 'hearts', 'streakFreeze', 'xpBoost']) {
      expect(isTeyroRewardType(t)).toBe(true);
    }
  });

  it.each([undefined, null, '', 'COINS', 'gems', 'mysteryBox', 42, {}, [], 'toString'])(
    'rejects %p',
    (value) => {
      expect(isTeyroRewardType(value)).toBe(false);
      expect(safeToRiveRewardType(value)).toBeNull();
    }
  );

  it('does not fall through to a prototype property', () => {
    // A naive `value in map` check would accept 'constructor'.
    expect(isTeyroRewardType('constructor')).toBe(false);
    expect(isTeyroRewardType('hasOwnProperty')).toBe(false);
  });
});

describe('backend reward strings → chest reward type', () => {
  it.each([
    ['COINS', 'coins'],
    ['GEMS', 'coins'],
    ['XP', 'xp'],
    ['HEARTS', 'hearts'],
    ['LIVES', 'hearts'],
    ['STREAK_FREEZE', 'streakFreeze'],
    ['XP_BOOST', 'xpBoost'],
  ] as const)('maps %s → %s', (backend, expected) => {
    expect(toTreasureChestRewardType(backend)).toBe(expected);
  });

  it('is case-insensitive, matching the backend column being a plain String', () => {
    expect(toTreasureChestRewardType('coins')).toBe('coins');
    expect(toTreasureChestRewardType('Xp_Boost')).toBe('xpBoost');
  });

  it('returns null rather than silently substituting coins', () => {
    // The server has already granted and persisted the real reward. Showing
    // a coin animation for an unknown type would misreport it to the learner.
    for (const unknown of ['MYSTERY', 'BADGE', '', null, undefined]) {
      expect(toTreasureChestRewardType(unknown)).toBeNull();
    }
  });

  it('maps STREAK (the streak scene, not a chest reward) to null', () => {
    expect(toTreasureChestRewardType('STREAK')).toBeNull();
  });
});

describe('Rive contract constants', () => {
  it('probes the asset spelling first and the guide spelling second', () => {
    // The shipped .riv names the nested view model `rewords`; the integration
    // guide calls it `rewards`. Both are tried so a future fix needs no code
    // change, but the real one must be attempted first.
    expect(CHEST_REWARD_VM_CANDIDATES).toEqual(['rewords', 'rewards']);
  });

  it('names the triggers and reveal event the asset actually exposes', () => {
    expect(CHEST_REWARD_ENUM_PROPERTY).toBe('rewardType');
    expect(CHEST_TRIGGER_CLICK).toBe('click');
    expect(CHEST_TRIGGER_RESET).toBe('reset');
    // A Rive *event* name, not a view-model trigger.
    expect(CHEST_REVEAL_EVENT).toBe('rewardReveal');
  });
});
