/**
 * The journey map's props — flat, two-tone, cartoon shapes in the Duolingo
 * spirit. Each is an SVG group drawn standing on its own base point (0, 0),
 * so the map places it by where it touches the ground. Colours are classes
 * from JourneyMap.module.css, so each land repaints them.
 */

import type { Prop } from '@/lib/path/journey';
import s from './JourneyMap.module.css';

function Shadow({ rx, ry = rx * 0.28 }: { rx: number; ry?: number }) {
  return <ellipse className={s.shadow} cx={0} cy={0} rx={rx} ry={ry} />;
}

export function Tree() {
  return (
    <g>
      <Shadow rx={24} />
      <rect className={s.trunk} x={-5} y={-28} width={10} height={28} rx={3} />
      <g>
        <circle className={s.leafDark} cx={0} cy={-44} r={27} />
        <circle className={s.leaf} cx={-3} cy={-48} r={24} />
        <circle className={s.leafLight} cx={-11} cy={-57} r={9} />
      </g>
    </g>
  );
}

export function Pine() {
  return (
    <g>
      <Shadow rx={20} />
      <rect className={s.trunk} x={-4} y={-14} width={8} height={14} rx={2} />
      <g>
        <path className={s.leafDark} d="M0,-86 L22,-50 L13,-50 L28,-24 L16,-24 L30,-10 L-30,-10 L-16,-24 L-28,-24 L-13,-50 L-22,-50 Z" />
        {/* Lit left half — the flat two-tone look. */}
        <path className={s.leaf} d="M0,-86 L0,-10 L-30,-10 L-16,-24 L-28,-24 L-13,-50 L-22,-50 Z" />
      </g>
    </g>
  );
}

export function Bush() {
  return (
    <g>
      <Shadow rx={20} />
      <circle className={s.leafDark} cx={9} cy={-11} r={11} />
      <circle className={s.leaf} cx={-8} cy={-11} r={12} />
      <circle className={s.leaf} cx={2} cy={-18} r={13} />
      <circle className={s.leafLight} cx={-3} cy={-24} r={4.5} />
    </g>
  );
}

export function Flowers() {
  const petals = [
    { x: -9, y: -6, c: s.red },
    { x: 4, y: -12, c: s.yellow },
    { x: 10, y: -3, c: s.purple },
  ];
  return (
    <g>
      <ellipse className={s.leafDark} cx={-4} cy={-1} rx={6} ry={2.5} />
      <ellipse className={s.leafDark} cx={7} cy={0} rx={5} ry={2} />
      {petals.map((p, i) => (
        <g key={i}>
          <rect className={s.leafDark} x={p.x - 1} y={p.y} width={2} height={-p.y} />
          <circle className={p.c} cx={p.x} cy={p.y} r={4.6} />
          <circle className={s.white} cx={p.x} cy={p.y} r={1.7} />
        </g>
      ))}
    </g>
  );
}

export function Rock() {
  return (
    <g>
      <Shadow rx={16} />
      <path className={s.rock} d="M-15,0 L-12,-12 L-3,-18 L9,-15 L15,-5 L14,0 Z" />
      <path className={s.rockLight} d="M-12,-12 L-3,-18 L9,-15 L3,-9 L-7,-8 Z" />
    </g>
  );
}

export function Grass() {
  return (
    <g>
      <path className={s.leafDark} d="M-8,0 L-5,-11 L-2,0 Z M-2,0 L1,-15 L4,0 Z M4,0 L8,-9 L10,0 Z" />
    </g>
  );
}

export function Mushroom() {
  return (
    <g>
      <Shadow rx={9} />
      <rect className={s.white} x={-3} y={-10} width={6} height={10} rx={2} />
      <path className={s.red} d="M-11,-9 A11,10 0 0 1 11,-9 Z" />
      <circle className={s.white} cx={-4} cy={-14} r={2} />
      <circle className={s.white} cx={4} cy={-12} r={1.6} />
    </g>
  );
}

export function Stump() {
  return (
    <g>
      <Shadow rx={15} />
      <rect className={s.trunk} x={-11} y={-14} width={22} height={14} rx={3} />
      <ellipse className={s.trunkLight} cx={0} cy={-14} rx={11} ry={4.5} />
      <ellipse className={s.trunk} cx={0} cy={-14} rx={5} ry={2} />
    </g>
  );
}

// ─── Red Rock Canyon ────────────────────────────────────────────────────────

export function Cactus() {
  return (
    <g>
      <Shadow rx={14} />
      <rect className={s.leafDark} x={-7} y={-46} width={14} height={46} rx={7} />
      <rect className={s.leaf} x={-7} y={-46} width={8} height={46} rx={4} />
      <path className={s.leafDark} d="M-7,-24 L-15,-24 Q-19,-24 -19,-28 L-19,-36 Q-19,-40 -15,-40 Q-12,-40 -12,-36 L-12,-30 L-7,-30 Z" />
      <path className={s.leafDark} d="M7,-18 L14,-18 Q18,-18 18,-22 L18,-32 Q18,-36 14,-36 Q11,-36 11,-32 L11,-24 L7,-24 Z" />
      <circle className={s.red} cx={0} cy={-48} r={3.5} />
    </g>
  );
}

export function Boulder() {
  return (
    <g>
      <Shadow rx={24} />
      <path className={s.rockDeep} d="M-24,0 L-22,-18 L-10,-30 L8,-30 L22,-18 L24,0 Z" />
      <path className={s.rock} d="M-22,-18 L-10,-30 L8,-30 L22,-18 L14,-12 L-14,-12 Z" />
      <path className={s.rockLight} d="M-10,-30 L8,-30 L4,-24 L-8,-24 Z" />
    </g>
  );
}

export function Spire() {
  return (
    <g>
      <Shadow rx={18} />
      <path className={s.rockDeep} d="M-16,0 L-12,-40 L-8,-62 L6,-66 L10,-42 L16,0 Z" />
      <path className={s.rock} d="M-16,0 L-12,-40 L-8,-62 L0,-64 L0,0 Z" />
      <rect className={s.rockLight} x={-13} y={-36} width={26} height={4} rx={2} />
      <rect className={s.rockLight} x={-15} y={-18} width={30} height={4} rx={2} />
    </g>
  );
}

export function DryBush() {
  return (
    <g>
      <Shadow rx={13} />
      <path
        className={`${s.stroke}`}
        style={{ stroke: 'var(--jm-dry, var(--jm-trunk))', strokeWidth: 2.5 }}
        d="M0,0 L-10,-12 M0,0 L-4,-16 M0,0 L4,-15 M0,0 L11,-10 M-6,-8 L-12,-14 M5,-9 L12,-15"
      />
    </g>
  );
}

// ─── Frost Peaks ────────────────────────────────────────────────────────────

export function SnowPine() {
  return (
    <g>
      <Shadow rx={20} />
      <rect className={s.trunk} x={-4} y={-14} width={8} height={14} rx={2} />
      <path className={s.leafDark} d="M0,-86 L22,-50 L13,-50 L28,-24 L16,-24 L30,-10 L-30,-10 L-16,-24 L-28,-24 L-13,-50 L-22,-50 Z" />
      <path className={s.leaf} d="M0,-86 L0,-10 L-30,-10 L-16,-24 L-28,-24 L-13,-50 L-22,-50 Z" />
      {/* Snow on each tier. */}
      <path className={s.white} d="M0,-86 L9,-70 Q4,-66 0,-70 Q-4,-66 -9,-70 Z" />
      <path className={s.white} d="M-13,-50 L13,-50 L17,-44 Q8,-40 0,-44 Q-8,-40 -17,-44 Z" />
      <path className={s.white} d="M-16,-24 L16,-24 L21,-18 Q10,-14 0,-18 Q-10,-14 -21,-18 Z" />
    </g>
  );
}

export function SnowRock() {
  return (
    <g>
      <Shadow rx={18} />
      <path className={s.rock} d="M-18,0 L-15,-14 L-4,-22 L10,-19 L18,-6 L17,0 Z" />
      <path className={s.white} d="M-15,-14 L-4,-22 L10,-19 L14,-12 Q4,-9 -2,-13 Q-9,-9 -15,-14 Z" />
    </g>
  );
}

export function Snowman() {
  return (
    <g>
      <Shadow rx={16} />
      <circle className={s.white} cx={0} cy={-13} r={13} />
      <circle className={s.white} cx={0} cy={-34} r={9.5} />
      <circle className={s.ink} cx={-3} cy={-36} r={1.4} />
      <circle className={s.ink} cx={3} cy={-36} r={1.4} />
      <path className={s.orange} d="M0,-33 L8,-31.5 L0,-30 Z" />
      <circle className={s.ink} cx={0} cy={-17} r={1.4} />
      <circle className={s.ink} cx={0} cy={-11} r={1.4} />
      <rect className={s.red} x={-8} y={-27} width={16} height={4} rx={2} />
      <rect className={s.ink} x={-7} y={-48} width={14} height={7} rx={1.5} />
      <rect className={s.ink} x={-10} y={-42} width={20} height={2.5} rx={1.2} />
    </g>
  );
}

export function Crystal() {
  return (
    <g>
      <Shadow rx={12} />
      <path className={s.iceDeep} d="M-8,0 L-11,-14 L-5,-26 L0,-14 Z" />
      <path className={s.ice} d="M-3,0 L-4,-20 L3,-34 L9,-20 L7,0 Z" />
      <path className={s.white} d="M-4,-20 L3,-34 L2,-20 Z" opacity={0.7} />
      <path className={s.iceDeep} d="M7,0 L10,-12 L14,-6 L12,0 Z" />
    </g>
  );
}

// ─── The Summit ─────────────────────────────────────────────────────────────

export function LavaRock() {
  return (
    <g>
      <ellipse className={s.lava} cx={0} cy={-2} rx={22} ry={6} opacity={0.35} />
      <path className={s.rock} d="M-20,0 L-17,-16 L-5,-26 L10,-23 L20,-8 L19,0 Z" />
      <path className={s.rockLight} d="M-17,-16 L-5,-26 L10,-23 L4,-17 L-8,-16 Z" />
      <path className={s.crack} d="M-12,-2 L-8,-10 L-2,-8 L3,-16 M3,-8 L10,-12" />
    </g>
  );
}

export function Vent() {
  return (
    <g>
      <Shadow rx={20} />
      <path className={s.rock} d="M-20,0 L-8,-24 L8,-24 L20,0 Z" />
      <path className={s.rockLight} d="M-8,-24 L8,-24 L4,-18 L-4,-18 Z" />
      <ellipse className={s.lava} cx={0} cy={-24} rx={8} ry={3} />
      <ellipse className={s.lavaHot} cx={0} cy={-24} rx={4} ry={1.5} />
    </g>
  );
}

const DRAW: Record<Prop['kind'], () => React.ReactElement> = {
  tree: Tree,
  pine: Pine,
  bush: Bush,
  flowers: Flowers,
  rock: Rock,
  grass: Grass,
  mushroom: Mushroom,
  stump: Stump,
  cactus: Cactus,
  boulder: Boulder,
  spire: Spire,
  dryBush: DryBush,
  snowPine: SnowPine,
  snowRock: SnowRock,
  snowman: Snowman,
  crystal: Crystal,
  lavaRock: LavaRock,
  vent: Vent,
};

/** One placed prop. */
export function PropAt({ prop }: { prop: Prop }) {
  const Draw = DRAW[prop.kind];
  return (
    <g
      transform={`translate(${prop.x.toFixed(1)} ${prop.y.toFixed(1)}) scale(${(prop.flip ? -1 : 1) * prop.scale} ${prop.scale})`}
    >
      <Draw />
    </g>
  );
}

// ─── Landmarks ──────────────────────────────────────────────────────────────

/** Where the journey begins: a little cottage with smoke from the chimney. */
export function Cottage({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={46} ry={9} />
      <rect className={s.trunk} x={18} y={-74} width={10} height={20} />
      <circle className={s.white} cx={23} cy={-82} r={6} style={{ opacity: 0.75 }} />
      <circle className={s.white} cx={28} cy={-92} r={4.5} style={{ opacity: 0.55 }} />
      <rect className={s.white} x={-34} y={-44} width={68} height={44} rx={4} />
      <path className={s.roof} d="M-42,-42 L0,-78 L42,-42 Z" />
      <rect className={s.wood} x={-9} y={-24} width={18} height={24} rx={3} />
      <circle className={s.yellow} cx={5} cy={-12} r={1.8} />
      <rect className={s.waterLight} x={-28} y={-32} width={14} height={12} rx={2} />
      <rect className={s.waterLight} x={14} y={-32} width={14} height={12} rx={2} />
    </g>
  );
}

/** A small pond with a lily pad — the meadow's water. */
export function Pond({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse className={s.patch} cx={0} cy={0} rx={50} ry={22} />
      <ellipse className={s.water} cx={0} cy={0} rx={44} ry={18} />
      <ellipse className={s.waterLight} cx={-12} cy={-5} rx={14} ry={4} />
      <path className={s.leaf} d="M14,4 A8,5 0 1 1 22,4 L18,1 Z" />
    </g>
  );
}

/** The signpost by a unit's chest — "on to the next land". */
export function Signpost({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <Shadow rx={12} />
      <rect className={s.wood} x={-3} y={-46} width={6} height={46} rx={2} />
      <path className={s.woodLight} d="M-20,-44 L14,-44 L22,-37 L14,-30 L-20,-30 Z" />
      <path className={s.wood} d="M-20,-34 L14,-34 L18,-30 L-20,-30 Z" />
    </g>
  );
}

/** The end of the journey: a little castle with flags, beside the last chest. */
export function Castle({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Shadow rx={56} ry={10} />
      {/* Towers */}
      <rect className={s.stone} x={-46} y={-78} width={24} height={78} rx={2} />
      <rect className={s.stone} x={22} y={-78} width={24} height={78} rx={2} />
      <rect className={s.stoneLight} x={-30} y={-58} width={60} height={58} rx={2} />
      {/* Battlements */}
      {[-46, -38, -30].map((bx) => (
        <rect key={`l${bx}`} className={s.stone} x={bx} y={-86} width={6} height={10} />
      ))}
      {[22, 30, 38].map((bx) => (
        <rect key={`r${bx}`} className={s.stone} x={bx} y={-86} width={6} height={10} />
      ))}
      {[-24, -12, 0, 12].map((bx) => (
        <rect key={`m${bx}`} className={s.stoneLight} x={bx} y={-64} width={8} height={8} />
      ))}
      {/* Gate */}
      <path className={s.wood} d="M-12,0 L-12,-22 A12,12 0 0 1 12,-22 L12,0 Z" />
      <rect className={s.ink} x={-38} y={-60} width={8} height={12} rx={4} opacity={0.55} />
      <rect className={s.ink} x={30} y={-60} width={8} height={12} rx={4} opacity={0.55} />
      {/* Flags */}
      <rect className={s.ink} x={-35} y={-112} width={2.5} height={28} />
      <path className={s.red} d="M-32.5,-112 L-14,-106 L-32.5,-100 Z" />
      <rect className={s.ink} x={33} y={-112} width={2.5} height={28} />
      <path className={s.yellow} d="M35.5,-112 L54,-106 L35.5,-100 Z" />
    </g>
  );
}

// ─── Life ───────────────────────────────────────────────────────────────────
// HTML, not SVG: these are the only things that move, and moving an HTML
// element's transform/opacity runs on the compositor. Animating shapes inside
// the land's big SVG would repaint the whole land every frame (measured: 9fps
// → 60fps on a phone viewport when the scenery went static).

/** A butterfly over the meadow, wandering a small loop. */
export function Butterfly({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <span className={s.lifeAt} style={{ left: `calc(50% + ${x.toFixed(0)}px)`, top: y }}>
      <span className={s.flutter} style={{ animationDelay: `${-delay}s` }}>
        <span className={`${s.wingL} ${s.wing}`} />
        <span className={`${s.wingR} ${s.wing}`} />
        <span className={s.body} />
      </span>
    </span>
  );
}

/** A firefly in the woods, glowing on and off. */
export function Firefly({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <span className={s.lifeAt} style={{ left: `calc(50% + ${x.toFixed(0)}px)`, top: y }}>
      <span className={s.firefly} style={{ animationDelay: `${-delay}s` }} />
    </span>
  );
}

/** Snow drifting down over Frost Peaks. */
export function Snowflake({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <span className={s.lifeAt} style={{ left: `calc(50% + ${x.toFixed(0)}px)`, top: y }}>
      <span className={s.snowflake} style={{ animationDelay: `${-delay}s` }} />
    </span>
  );
}

/** Embers rising off the summit's lava. */
export function Ember({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <span className={s.lifeAt} style={{ left: `calc(50% + ${x.toFixed(0)}px)`, top: y }}>
      <span className={s.ember} style={{ animationDelay: `${-delay}s` }} />
    </span>
  );
}
