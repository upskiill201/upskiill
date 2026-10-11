'use client';

/**
 * One unit's stretch of the journey: ground, water, the road (walked and
 * ahead), landmarks and scenery, as a single SVG behind the lesson nodes.
 *
 * Pure decoration — pointer-events off, aria-hidden. Everything that's
 * tappable (nodes, chest, Tey) is HTML above it, exactly as before.
 *
 * Coordinates are CSS pixels with x = 0 at the column's centre, the same as
 * the nodes' offsets. It's drawn wider than any column (±HALF) and the board
 * clips it, so a phone shows the middle and a desktop sees more land.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { memo, useEffect, useMemo, useRef } from 'react';
import {
  CHEST_H,
  CROSSING,
  hashSeed,
  riverFor,
  scatterProps,
  seeded,
  smoothPath,
  trailXAt,
  type Keepout,
  type LandId,
  type UnitLayout,
} from '@/lib/path/journey';
import { Butterfly, Castle, Cottage, Ember, Firefly, Pond, PropAt, Signpost, Snowflake } from './Scenery';
import s from './JourneyMap.module.css';

export const HALF = 300;

/** What moves in each land (the canyon is still and dry). */
const LIFE: Record<LandId, ((p: { x: number; y: number; delay?: number }) => React.ReactElement) | null> = {
  meadow: Butterfly,
  forest: Firefly,
  canyon: null,
  snow: Snowflake,
  summit: Ember,
};

/** A wavy band across the land: the river's outline. */
function riverPath(y: number, half: number, width: number, seed: number) {
  const rand = seeded(seed);
  const phase = rand() * Math.PI * 2;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let x = -half - 20; x <= half + 20; x += 20) {
    const wobble = Math.sin(x / 70 + phase) * 9;
    top.push(`${x},${(y - width / 2 + wobble).toFixed(1)}`);
    bottom.unshift(`${x},${(y + width / 2 + wobble * 0.8).toFixed(1)}`);
  }
  const mid = Array.from({ length: Math.ceil((half * 2 + 40) / 20) + 1 }, (_, i) => {
    const x = -half - 20 + i * 20;
    return `${x},${(y + Math.sin(x / 70 + phase) * 9).toFixed(1)}`;
  });
  return { band: `M${top.join(' L')} L${bottom.join(' L')} Z`, mid: `M${mid.join(' L')}` };
}

function LandSceneImpl({
  unitKey,
  land,
  layout,
  walked,
  paintLast,
  isFirstUnit,
  isLastUnit,
  roadClear,
  keepouts,
  dim,
  viewHalf,
}: {
  unitKey: string;
  land: LandId;
  layout: UnitLayout;
  /** Index into layout.trail the learner has walked to (0 = none). */
  walked: number;
  /** Draw the last walked stretch in, just now (back from a lesson). */
  paintLast: boolean;
  isFirstUnit: boolean;
  /** The course's last unit: the castle waits by its chest. */
  isLastUnit: boolean;
  roadClear: number;
  keepouts: Keepout[];
  /** Not reached yet: under fog. */
  dim: boolean;
  /** Half the visible column, px — landmarks stay inside it. */
  viewHalf: number;
}) {
  const reducedMotion = useReducedMotion();
  const H = layout.height;

  // Off-screen lands stop animating: only what the learner can see moves,
  // so a long course costs no more per frame than a short one.
  const svgRef = useRef<SVGSVGElement>(null);
  const lifeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    // A class flip, not state: scrolling past a land never re-renders it.
    const io = new IntersectionObserver(
      ([e]) => lifeRef.current?.classList.toggle(s.paused, !e.isIntersecting),
      { rootMargin: '120px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const scene = useMemo(() => {
    const seed = hashSeed(unitKey);
    const rand = seeded(seed ^ 0x9e3779b9);
    const marks: Keepout[] = [];

    // Where the journey starts: the cottage, beside the first lesson.
    const cottage = isFirstUnit ? { x: -Math.min(138, viewHalf - 52), y: 128 } : null;
    if (cottage) marks.push({ x: cottage.x, y: cottage.y - 30, r: 66 });

    // Each land's crossing (river, chasm, ice, lava); the meadow has a pond.
    const crossing = CROSSING[land];
    const river = crossing ? riverFor(layout) : null;
    let pond: { x: number; y: number } | null = null;
    if (land === 'meadow' && layout.nodes.length >= 3) {
      const y = layout.nodes[Math.min(layout.nodes.length - 1, 2)].y + 40;
      const road = trailXAt(layout.trail, y);
      pond = { x: (road >= 0 ? -1 : 1) * Math.min(Math.abs(road) + 150, viewHalf - 54), y };
      marks.push({ x: pond.x, y: pond.y, r: 64 });
    }

    // A signpost on the chest's outer side: on to the next land. At the very
    // end of the course, the castle stands there instead.
    const cx = layout.chest.x;
    const out = cx >= 0 ? 1 : -1;
    const sign = isLastUnit ? null : { x: cx + out * 74, y: layout.chest.y + CHEST_H - 4, flip: cx < 0 };
    if (sign) marks.push({ x: sign.x, y: sign.y - 20, r: 34 });
    const castle = isLastUnit
      ? { x: out * Math.min(Math.abs(cx) + 118, viewHalf - 50), y: layout.chest.y + CHEST_H + 10 }
      : null;
    if (castle) marks.push({ x: castle.x, y: castle.y - 50, r: 78 });

    const props = scatterProps({
      seed,
      land,
      layout,
      halfWidth: HALF - 10,
      roadClear,
      keepouts: [...marks, ...keepouts],
    }).filter((p) => !river || Math.abs(p.y - river.y) > 34 + p.scale * 10);

    // Ground texture: soft lighter patches, anywhere.
    const patches = Array.from({ length: Math.ceil(H / 140) }, () => ({
      x: (rand() * 2 - 1) * HALF,
      y: rand() * H,
      rx: 40 + rand() * 50,
      ry: 14 + rand() * 12,
    }));
    // A few living things per land — kept few on purpose (each is a layer).
    const LIFE_COUNT: Record<LandId, number> = { meadow: 2, forest: 6, canyon: 0, snow: 10, summit: 7 };
    const life = Array.from({ length: LIFE_COUNT[land] }, (_, i) => {
      const y = 40 + rand() * (H - 80);
      if (land === 'snow') return { x: (rand() * 2 - 1) * viewHalf, y, delay: rand() * 7 };
      const road = trailXAt(layout.trail, y);
      const side = i % 2 ? 1 : -1;
      return { x: road + side * (roadClear + 30 + rand() * 90), y, delay: rand() * 8 };
    });

    return { cottage, river, crossing, pond, sign, castle, props, patches, life };
  }, [unitKey, land, layout, isFirstUnit, isLastUnit, roadClear, keepouts, H, viewHalf]);

  const t = layout.trail;
  // The course's last stretch ends at its chest, by the castle, not the edge.
  const last = isLastUnit ? t.length - 2 : t.length - 1;
  const reach = Math.min(walked, last);
  const walkedD = reach > 0 ? smoothPath(t, 0, paintLast ? reach - 1 : reach) : '';
  const lastD = reach > 0 && paintLast ? smoothPath(t, reach - 1, reach) : '';
  const aheadD = smoothPath(t, Math.max(0, reach), last);
  const river = scene.river ? riverPath(scene.river.y, HALF, 50, hashSeed(unitKey) ^ 7) : null;

  // The bridge runs along the road where it crosses the river.
  let bridgeAngle = 0;
  if (scene.river) {
    const dy = 20;
    const dx = trailXAt(t, scene.river.y + dy) - trailXAt(t, scene.river.y - dy);
    bridgeAngle = (Math.atan2(dx, dy * 2) * 180) / Math.PI;
  }

  return (
    <>
    <svg
      aria-hidden="true"
      ref={svgRef}
      className={s.scene}
      width={HALF * 2}
      height={H}
      viewBox={`${-HALF} 0 ${HALF * 2} ${H}`}
      style={{ marginLeft: -HALF, opacity: dim ? 0.55 : 1, filter: dim ? 'saturate(0.55)' : undefined }}
    >
      {scene.patches.map((p, i) => (
        <ellipse key={i} className={s.patch} cx={p.x} cy={p.y} rx={p.rx} ry={p.ry} />
      ))}

      {river && scene.crossing === 'river' && (
        <g>
          <path className={s.leafDark} d={river.band} transform="translate(0 4)" opacity={0.35} />
          <path className={s.water} d={river.band} />
          <path className={s.riverRipple} d={river.mid} />
        </g>
      )}
      {river && scene.crossing === 'chasm' && (
        <g>
          <path className={s.rockLight} d={river.band} transform="translate(0 -5)" />
          <path className={s.rockDeep} d={river.band} />
          <path className={s.ink} d={river.band} transform="translate(0 10) scale(1 0.55)" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} opacity={0.35} />
        </g>
      )}
      {river && scene.crossing === 'ice' && (
        <g>
          <path className={s.white} d={river.band} transform="translate(0 -4)" />
          <path className={s.ice} d={river.band} />
          <path className={s.iceCrack} d={river.mid} strokeDasharray="22 30" />
        </g>
      )}
      {river && scene.crossing === 'lava' && (
        <g>
          <path className={s.rock} d={river.band} transform="translate(0 -5)" />
          <path className={s.lava} d={river.band} />
          <path className={s.crack} d={river.mid} strokeDasharray="16 22" />
        </g>
      )}
      {scene.pond && <Pond {...scene.pond} />}

      {/* The road ahead: faint stepping stones. */}
      <path className={s.roadAheadBed} d={aheadD} opacity={0.5} />
      <path className={s.roadAhead} d={aheadD} />
      {/* The road walked: a real dirt road. */}
      {walkedD && (
        <g>
          <path className={s.roadEdge} d={walkedD} />
          <path className={s.road} d={walkedD} />
          <path className={s.roadLine} d={walkedD} />
        </g>
      )}
      {lastD && (
        <g>
          {[s.roadEdge, s.road, s.roadLine].map((c) => (
            <motion.path
              key={c}
              className={c}
              d={lastD}
              initial={reducedMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.75, ease: 'easeInOut' }}
            />
          ))}
        </g>
      )}

      {scene.river && (
        <g transform={`translate(${scene.river.bridge.x.toFixed(1)} ${scene.river.y.toFixed(1)}) rotate(${(-bridgeAngle).toFixed(1)})`}>
          <rect className={s.shadow} x={-27} y={-36} width={54} height={76} rx={6} />
          {scene.crossing === 'chasm' ? (
            // A rope bridge: planks with gaps, two ropes, four posts.
            <>
              {Array.from({ length: 7 }, (_, i) => (
                <rect key={i} className={s.woodLight} x={-22} y={-38 + i * 11.5} width={44} height={7} rx={2} />
              ))}
              <path className={s.ropeLine} d="M-24,-40 Q-27,0 -24,40 M24,-40 Q27,0 24,40" />
              {[-26, 22].map((px) =>
                [-44, 36].map((py) => <rect key={`${px}${py}`} className={s.wood} x={px} y={py} width={5} height={10} rx={2} />),
              )}
            </>
          ) : scene.crossing === 'lava' ? (
            // A stone bridge over the lava.
            <>
              <rect className={s.stone} x={-26} y={-38} width={52} height={76} rx={5} />
              {Array.from({ length: 5 }, (_, i) => (
                <rect key={i} className={s.stoneLight} x={-22} y={-34 + i * 14.5} width={44} height={11} rx={2} />
              ))}
            </>
          ) : (
            <>
              <rect className={s.wood} x={-26} y={-38} width={52} height={76} rx={5} />
              {Array.from({ length: 6 }, (_, i) => (
                <rect key={i} className={s.woodLight} x={-23} y={-35 + i * 12.5} width={46} height={9} rx={2} />
              ))}
              <rect className={s.trunk} x={-30} y={-40} width={6} height={80} rx={3} />
              <rect className={s.trunk} x={24} y={-40} width={6} height={80} rx={3} />
            </>
          )}
        </g>
      )}

      {scene.props.map((p, i) => (
        <PropAt key={i} prop={p} />
      ))}

      {scene.cottage && <Cottage {...scene.cottage} />}
      {scene.sign && <Signpost {...scene.sign} />}
      {scene.castle && <Castle {...scene.castle} />}
    </svg>
    {/* What moves lives outside the SVG, so the land itself paints once. */}
    {!dim && scene.life.length > 0 && (
      <div ref={lifeRef} aria-hidden="true" className={`${s.life} ${s.paused}`}>
        {scene.life.map((l, i) => {
          const Life = LIFE[land];
          return Life ? <Life key={i} {...l} /> : null;
        })}
      </div>
    )}
    </>
  );
}

/** Memoised: opening a lesson card re-renders the path, not the scenery. */
export const LandScene = memo(LandSceneImpl);
export default LandScene;
