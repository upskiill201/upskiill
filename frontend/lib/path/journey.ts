/**
 * The journey map's geometry and rules — pure, so they can be tested.
 *
 * Each unit is a stretch of land. Its lessons sit at fixed points along a
 * winding road; the road is a smooth curve through those points; scenery is
 * scattered around it (never on it) from a seed, so a course always looks
 * the same. The deeper into a course, the wilder the land:
 *
 *   meadow → forest → canyon → snow → summit
 *
 * Every land has its own palette, props and road crossing; `drawnLand` stays
 * as the seam for any future land that ships before its art.
 */

import type { PathUnit } from './model';

// ─── Lands ──────────────────────────────────────────────────────────────────

export const LANDS = ['meadow', 'forest', 'canyon', 'snow', 'summit'] as const;
export type LandId = (typeof LANDS)[number];

/** Lands with art so far; the rest borrow the deepest one drawn. */
export const DRAWN_LANDS: readonly LandId[] = LANDS;

export const LAND_NAME: Record<LandId, string> = {
  meadow: 'Sunny Meadow',
  forest: 'Whispering Woods',
  canyon: 'Red Rock Canyon',
  snow: 'Frost Peaks',
  summit: 'The Summit',
};

/**
 * Which land a unit is in. Long courses walk the table two units per land;
 * shorter ones are spread across the whole arc, so every course starts in
 * the meadow and ends at the summit.
 */
export function landFor(unitIndex: number, totalUnits: number): LandId {
  if (totalUnits <= 1) return 'meadow';
  if (totalUnits >= 10) return LANDS[Math.min(LANDS.length - 1, Math.floor(unitIndex / 2))];
  const step = Math.round((unitIndex * (LANDS.length - 1)) / (totalUnits - 1));
  return LANDS[Math.max(0, Math.min(LANDS.length - 1, step))];
}

/** The land whose art is drawn — the real one, or the deepest drawn so far. */
export function drawnLand(land: LandId): LandId {
  if (DRAWN_LANDS.includes(land)) return land;
  return DRAWN_LANDS[DRAWN_LANDS.length - 1];
}

// ─── Layout ─────────────────────────────────────────────────────────────────

export const NODE_W = 76;
export const NODE_H = 70;
export const CHEST_W = 84;
export const CHEST_H = 76;

/** Vertical rhythm, px. */
export const LAYOUT = {
  top: 60, // under the unit banner
  row: 100, // node to node
  currentGap: 52, // extra room above the current node for its START callout
  chestGap: 106, // last node to the chest
  bottom: 70,
} as const;

export interface Pt {
  x: number;
  y: number;
}

export interface UnitLayout {
  height: number;
  /** Top-left y of each node (x is its centre offset from the column centre). */
  nodes: Pt[];
  chest: Pt;
  /** Centre points the road runs through, top edge to bottom edge. */
  trail: Pt[];
}

/** Duolingo's wave: 0 → right → 0 → left, as a fraction of the swing. */
const WAVE = [0, 0.55, 0.9, 0.55, 0, -0.55, -0.9, -0.55];
export const waveAt = (i: number) => WAVE[((i % WAVE.length) + WAVE.length) % WAVE.length];

export function layoutUnit(nodeCount: number, currentIndex: number | null, swing: number): UnitLayout {
  let y = LAYOUT.top;
  const nodes: Pt[] = [];
  for (let i = 0; i < nodeCount; i++) {
    if (i === currentIndex) y += LAYOUT.currentGap;
    nodes.push({ x: waveAt(i) * swing, y });
    y += LAYOUT.row;
  }
  y += LAYOUT.chestGap - LAYOUT.row;
  const chest = { x: waveAt(nodeCount) * swing, y };
  const height = y + CHEST_H + LAYOUT.bottom;
  const trail: Pt[] = [
    { x: 0, y: 0 },
    ...nodes.map((n) => ({ x: n.x, y: n.y + NODE_H / 2 })),
    { x: chest.x, y: chest.y + CHEST_H / 2 },
    { x: 0, y: height },
  ];
  return { height, nodes, chest, trail };
}

// ─── The road ───────────────────────────────────────────────────────────────

/**
 * An SVG path through `pts[from..to]`, as Catmull-Rom curves (tangents use the
 * neighbours from the WHOLE list, so a road drawn in two parts — walked and
 * ahead — joins without a kink).
 */
export function smoothPath(pts: Pt[], from = 0, to = pts.length - 1): string {
  if (to <= from) return '';
  const p = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  let d = `M${p(from).x.toFixed(1)},${p(from).y.toFixed(1)}`;
  for (let i = from; i < to; i++) {
    const p0 = p(i - 1);
    const p1 = p(i);
    const p2 = p(i + 1);
    const p3 = p(i + 2);
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

/** Where the road is, horizontally, at height y (straight-line between points). */
export function trailXAt(pts: Pt[], y: number): number {
  if (y <= pts[0].y) return pts[0].x;
  for (let i = 1; i < pts.length; i++) {
    if (y <= pts[i].y) {
      const a = pts[i - 1];
      const b = pts[i];
      const t = b.y === a.y ? 0 : (y - a.y) / (b.y - a.y);
      return a.x + (b.x - a.x) * t;
    }
  }
  return pts[pts.length - 1].x;
}

/**
 * How far along the road the learner has walked in this unit, as an index
 * into `trail`: through every done lesson and up to the current one.
 * 0 = nothing walked (a unit not reached yet).
 */
export function walkedTo(unit: Pick<PathUnit, 'nodes'>): number {
  const nodes = unit.nodes;
  const allDone = nodes.length > 0 && nodes.every((n) => n.state === 'done');
  if (allDone) return nodes.length + 2; // through the chest, to the bottom edge
  const cur = nodes.findIndex((n) => n.state === 'current' || n.state === 'paywalled');
  if (cur >= 0) return cur + 1; // top edge … current node
  const lastDone = nodes.map((n) => n.state).lastIndexOf('done');
  return lastDone >= 0 ? lastDone + 1 : 0;
}

// ─── Scenery ────────────────────────────────────────────────────────────────

export type PropKind =
  | 'tree'
  | 'pine'
  | 'bush'
  | 'flowers'
  | 'rock'
  | 'grass'
  | 'mushroom'
  | 'stump'
  // Canyon
  | 'cactus'
  | 'boulder'
  | 'spire'
  | 'dryBush'
  // Frost Peaks
  | 'snowPine'
  | 'snowRock'
  | 'snowman'
  | 'crystal'
  // Summit
  | 'lavaRock'
  | 'vent';

export interface Prop {
  kind: PropKind;
  x: number;
  y: number;
  /** 0.75–1.25 */
  scale: number;
  flip: boolean;
  /** Animation offset so neighbours don't sway in step (s). */
  delay: number;
}

/** Small, fast, deterministic PRNG (mulberry32). */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A string → 32-bit seed. */
export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Rough footprint radius of each prop at scale 1, px. */
export const PROP_RADIUS: Record<PropKind, number> = {
  tree: 30,
  pine: 24,
  bush: 18,
  flowers: 12,
  rock: 14,
  grass: 9,
  mushroom: 9,
  stump: 13,
  cactus: 16,
  boulder: 22,
  spire: 18,
  dryBush: 13,
  snowPine: 24,
  snowRock: 16,
  snowman: 16,
  crystal: 12,
  lavaRock: 18,
  vent: 18,
};

const MIX: Record<LandId, [PropKind, number][]> = {
  // Open and bright: round trees, flowers, bushes.
  meadow: [
    ['tree', 3],
    ['bush', 3],
    ['flowers', 4],
    ['grass', 4],
    ['rock', 1],
  ],
  // Deeper and denser: pines dominate, mushrooms under them.
  forest: [
    ['pine', 6],
    ['tree', 2],
    ['bush', 2],
    ['mushroom', 2],
    ['grass', 2],
    ['stump', 1],
    ['rock', 1],
  ],
  // Dry and warm: cacti, red boulders, rock spires.
  canyon: [
    ['cactus', 4],
    ['boulder', 3],
    ['spire', 2],
    ['dryBush', 3],
    ['rock', 2],
  ],
  // Cold and sparkling: snowy pines, snowy rocks, the odd snowman.
  snow: [
    ['snowPine', 6],
    ['snowRock', 3],
    ['crystal', 2],
    ['snowman', 1],
  ],
  // The last climb: dark rock, lava glowing through it.
  summit: [
    ['lavaRock', 4],
    ['rock', 3],
    ['vent', 2],
    ['crystal', 2],
  ],
};

/** How busy each land is — the deeper, the thicker. Props per 100px of height. */
const DENSITY: Record<LandId, number> = { meadow: 3.4, forest: 4.6, canyon: 3.8, snow: 4.4, summit: 4.2 };

/** Props worth finding once: never two in one unit. */
const UNIQUE: PropKind[] = ['snowman'];

export interface Keepout {
  x: number;
  y: number;
  r: number;
}

function pickKind(mix: [PropKind, number][], r: number): PropKind {
  const total = mix.reduce((s, [, w]) => s + w, 0);
  let t = r * total;
  for (const [k, w] of mix) {
    t -= w;
    if (t <= 0) return k;
  }
  return mix[mix.length - 1][0];
}

/**
 * Scatter props over a unit's land, never on the road, the nodes, the chest
 * or anything in `keepouts`, and not on top of each other. `halfWidth` is
 * how far either side of centre to fill (the widest column there is — a
 * phone simply shows the middle of it).
 */
export function scatterProps({
  seed,
  land,
  layout,
  halfWidth,
  roadClear,
  keepouts = [],
}: {
  seed: number;
  land: LandId;
  layout: UnitLayout;
  halfWidth: number;
  /** Clearance either side of the road's centre line, px. */
  roadClear: number;
  keepouts?: Keepout[];
}): Prop[] {
  const rand = seeded(seed);
  const target = Math.round((layout.height / 100) * DENSITY[land]);
  const placed: Prop[] = [];
  const blockers: Keepout[] = [
    ...layout.nodes.map((n) => ({ x: n.x, y: n.y + NODE_H / 2, r: 62 })),
    { x: layout.chest.x, y: layout.chest.y + CHEST_H / 2, r: 66 },
    ...keepouts,
  ];

  // Half the props hug the road's verges (inside a phone's view); the rest
  // fill the wider land a desktop sees.
  for (let tries = 0; tries < target * 30 && placed.length < target; tries++) {
    const kind = pickKind(MIX[land], rand());
    const scale = 0.8 + rand() * 0.4;
    const r = PROP_RADIUS[kind] * scale;
    const y = 18 + rand() * (layout.height - 36);
    const near = placed.length % 2 === 0;
    const side = rand() < 0.5 ? -1 : 1;
    const span = near ? halfWidth * 0.62 : halfWidth;
    const x = side * (rand() * span);
    const road = trailXAt(layout.trail, y);
    if (Math.abs(x - road) < roadClear + r) continue;
    if (Math.abs(x) > halfWidth - r * 0.3) continue;
    if (UNIQUE.includes(kind) && placed.some((p) => p.kind === kind)) continue;
    if (blockers.some((b) => Math.hypot(b.x - x, b.y - y) < b.r + r)) continue;
    if (placed.some((p) => Math.hypot(p.x - x, p.y - y) < (PROP_RADIUS[p.kind] * p.scale + r) * 0.9)) continue;
    placed.push({ kind, x, y, scale, flip: rand() < 0.5, delay: rand() * 3 });
  }
  // Painter's order: things further down the screen are in front.
  return placed.sort((a, b) => a.y - b.y);
}

// ─── The forest river ───────────────────────────────────────────────────────

/** What the road crosses in each land (the meadow has a pond beside it instead). */
export const CROSSING: Record<LandId, 'river' | 'chasm' | 'ice' | 'lava' | null> = {
  meadow: null,
  forest: 'river',
  canyon: 'chasm',
  snow: 'ice',
  summit: 'lava',
};

export interface River {
  /** Centre line y at the column's centre. */
  y: number;
  /** Where the road crosses it — the bridge. */
  bridge: Pt;
}

/**
 * A land's crossing — river, chasm, frozen river, lava — runs between two
 * lessons near the middle, where
 * the road runs most steeply (so the bridge is short and straight).
 */
export function riverFor(layout: UnitLayout): River | null {
  const n = layout.nodes.length;
  if (n < 2) return null;
  const k = Math.max(1, Math.floor(n / 2));
  const a = layout.trail[k]; // node k-1 centre (trail[0] is the top edge)
  const b = layout.trail[k + 1]; // node k centre
  const y = (a.y + b.y) / 2;
  return { y, bridge: { x: trailXAt(layout.trail, y), y } };
}

// ─── Tey's nudge ────────────────────────────────────────────────────────────

/**
 * What Tey says beside the next lesson — one short, true line that gives a
 * reason to tap START right now. First match wins.
 */
export function pathNudge(ctx: {
  /** Lessons done in the whole course. */
  doneInCourse: number;
  /** Lessons left in this unit, counting the current one. */
  leftInUnit: number;
  streakDays: number;
  /** null when unknown (still loading). */
  practicedToday: boolean | null;
  minutes: number | null;
  paywalled: boolean;
}): string {
  if (ctx.paywalled) return 'Unlock the course to keep going!';
  if (ctx.doneInCourse === 0) return 'Your journey starts here!';
  if (ctx.practicedToday === false && ctx.streakDays > 0) return `Keep your ${ctx.streakDays}-day streak alive!`;
  if (ctx.practicedToday === false) return 'One lesson starts a streak!';
  if (ctx.leftInUnit === 1) return 'Last one before the chest!';
  if (ctx.leftInUnit === 2) return '2 lessons to the chest!';
  if (ctx.minutes && ctx.minutes > 0) return `Just ${ctx.minutes} min. Let's go!`;
  return 'Ready for the next one?';
}
