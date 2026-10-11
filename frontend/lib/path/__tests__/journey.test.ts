import {
  CROSSING,
  drawnLand,
  LANDS,
  hashSeed,
  landFor,
  layoutUnit,
  NODE_H,
  pathNudge,
  PROP_RADIUS,
  riverFor,
  scatterProps,
  smoothPath,
  trailXAt,
  walkedTo,
} from '../journey';
import type { PathNode } from '../model';

const nodes = (...states: PathNode['state'][]) =>
  states.map((state, i) => ({ state, numberInUnit: i + 1, number: i + 1, lesson: { id: `l${i}` } }) as unknown as PathNode);

describe('landFor — the deeper, the wilder', () => {
  it('starts every course in the meadow and ends it at the summit', () => {
    for (const total of [2, 3, 5, 8]) {
      expect(landFor(0, total)).toBe('meadow');
      expect(landFor(total - 1, total)).toBe('summit');
    }
  });

  it('never goes back to an earlier land', () => {
    const order = ['meadow', 'forest', 'canyon', 'snow', 'summit'];
    for (const total of [3, 6, 9, 14]) {
      const seen = Array.from({ length: total }, (_, i) => order.indexOf(landFor(i, total)));
      expect(seen).toEqual([...seen].sort((a, b) => a - b));
    }
  });

  it('walks long courses two units per land', () => {
    expect([0, 1, 2, 3, 4, 5, 8, 11].map((i) => landFor(i, 12))).toEqual([
      'meadow', 'meadow', 'forest', 'forest', 'canyon', 'canyon', 'summit', 'summit',
    ]);
  });

  it('a one-unit course is a meadow', () => {
    expect(landFor(0, 1)).toBe('meadow');
  });

  it('has art for every land', () => {
    for (const land of LANDS) expect(drawnLand(land)).toBe(land);
  });

  it('gives every land past the meadow its own crossing', () => {
    expect(CROSSING.meadow).toBeNull();
    expect(new Set(LANDS.slice(1).map((l) => CROSSING[l])).size).toBe(4);
  });
});

describe('layoutUnit', () => {
  it('runs the road from the top edge, through every node and the chest, to the bottom edge', () => {
    const l = layoutUnit(4, null, 60);
    expect(l.trail).toHaveLength(4 + 3);
    expect(l.trail[0]).toEqual({ x: 0, y: 0 });
    expect(l.trail[l.trail.length - 1]).toEqual({ x: 0, y: l.height });
    l.nodes.forEach((n, i) => expect(l.trail[i + 1]).toEqual({ x: n.x, y: n.y + NODE_H / 2 }));
  });

  it('makes room above the current node for its START bubble', () => {
    const plain = layoutUnit(3, null, 60);
    const withCurrent = layoutUnit(3, 1, 60);
    expect(withCurrent.nodes[1].y - withCurrent.nodes[0].y).toBeGreaterThan(plain.nodes[1].y - plain.nodes[0].y);
  });
});

describe('the road', () => {
  it('draws a curve through the points it is given', () => {
    const l = layoutUnit(3, null, 60);
    const d = smoothPath(l.trail);
    expect(d.startsWith('M0.0,0.0')).toBe(true);
    expect((d.match(/C/g) ?? []).length).toBe(l.trail.length - 1);
    expect(smoothPath(l.trail, 2, 2)).toBe('');
  });

  it('knows where the road is at any height', () => {
    const pts = [{ x: 0, y: 0 }, { x: 100, y: 100 }];
    expect(trailXAt(pts, 50)).toBe(50);
    expect(trailXAt(pts, -10)).toBe(0);
    expect(trailXAt(pts, 500)).toBe(100);
  });

  it('is walked up to the current lesson, through a finished unit, and not at all ahead', () => {
    expect(walkedTo({ nodes: nodes('done', 'current', 'locked') })).toBe(2);
    expect(walkedTo({ nodes: nodes('done', 'done') })).toBe(4);
    expect(walkedTo({ nodes: nodes('locked', 'locked') })).toBe(0);
    expect(walkedTo({ nodes: nodes('current', 'locked') })).toBe(1);
  });
});

describe('scatterProps', () => {
  const layout = layoutUnit(5, 2, 62);
  const props = scatterProps({ seed: hashSeed('unit-1'), land: 'meadow', layout, halfWidth: 280, roadClear: 52 });

  it('is the same every time for the same unit', () => {
    expect(scatterProps({ seed: hashSeed('unit-1'), land: 'meadow', layout, halfWidth: 280, roadClear: 52 })).toEqual(props);
  });

  it('puts plenty of scenery down, and none of it on the road', () => {
    expect(props.length).toBeGreaterThan(8);
    for (const p of props) {
      expect(Math.abs(p.x - trailXAt(layout.trail, p.y))).toBeGreaterThanOrEqual(52 + PROP_RADIUS[p.kind] * p.scale - 0.001);
    }
  });

  it('keeps clear of the lesson nodes', () => {
    for (const p of props) {
      for (const n of layout.nodes) {
        expect(Math.hypot(p.x - n.x, p.y - (n.y + NODE_H / 2))).toBeGreaterThan(62);
      }
    }
  });

  it('respects keep-out zones (Tey)', () => {
    const tey = { x: -120, y: 300, r: 80 };
    const around = scatterProps({ seed: 7, land: 'forest', layout, halfWidth: 280, roadClear: 52, keepouts: [tey] });
    for (const p of around) expect(Math.hypot(p.x - tey.x, p.y - tey.y)).toBeGreaterThan(tey.r);
  });

  it('never puts two snowmen in one unit', () => {
    for (let seed = 0; seed < 40; seed++) {
      const snow = scatterProps({ seed, land: 'snow', layout, halfWidth: 280, roadClear: 52 });
      expect(snow.filter((p) => p.kind === 'snowman').length).toBeLessThanOrEqual(1);
    }
  });

  it('grows thicker deeper in', () => {
    const forest = scatterProps({ seed: hashSeed('unit-1'), land: 'forest', layout, halfWidth: 280, roadClear: 52 });
    expect(forest.length).toBeGreaterThanOrEqual(props.length);
  });
});

describe('riverFor', () => {
  it('crosses between two lessons, with the bridge on the road', () => {
    const l = layoutUnit(4, null, 60);
    const r = riverFor(l)!;
    expect(r.y).toBeGreaterThan(l.nodes[1].y);
    expect(r.y).toBeLessThan(l.nodes[2].y + NODE_H);
    expect(r.bridge.x).toBeCloseTo(trailXAt(l.trail, r.y));
  });

  it('needs two lessons to run between', () => {
    expect(riverFor(layoutUnit(1, null, 60))).toBeNull();
  });
});

describe('pathNudge — one true reason to start now', () => {
  const base = { doneInCourse: 4, leftInUnit: 3, streakDays: 0, practicedToday: true, minutes: 5, paywalled: false };

  it('welcomes a brand-new learner', () => {
    expect(pathNudge({ ...base, doneInCourse: 0 })).toBe('Your journey starts here!');
  });

  it('protects a streak that has not been kept today', () => {
    expect(pathNudge({ ...base, streakDays: 6, practicedToday: false })).toBe('Keep your 6-day streak alive!');
    expect(pathNudge({ ...base, practicedToday: false })).toBe('One lesson starts a streak!');
  });

  it('points at the chest when it is close', () => {
    expect(pathNudge({ ...base, leftInUnit: 1 })).toBe('Last one before the chest!');
    expect(pathNudge({ ...base, leftInUnit: 2 })).toBe('2 lessons to the chest!');
  });

  it('falls back to how short it is', () => {
    expect(pathNudge(base)).toBe("Just 5 min. Let's go!");
    expect(pathNudge({ ...base, minutes: null })).toBe('Ready for the next one?');
  });

  it('says it straight when the next lesson is behind the paywall', () => {
    expect(pathNudge({ ...base, paywalled: true })).toBe('Unlock the course to keep going!');
  });
});
