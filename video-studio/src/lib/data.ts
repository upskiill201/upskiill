import lipL from '../data/lipsync.json';
import tlL from '../data/timeline.json';
import lipA from '../data/ai/lipsync.json';
import tlA from '../data/ai/timeline.json';
import lipC from '../data/code/lipsync.json';
import tlC from '../data/code/timeline.json';
import lipW from '../data/wef/lipsync.json';
import tlW from '../data/wef/timeline.json';

// Each composition renders one reel; it selects its data set before its children render.
type D = { amp: number[]; vis: string; kicks: number[] };
const SETS: Record<string, D> = {
  launch: { amp: (lipL as any).amp, vis: (lipL as any).vis, kicks: (tlL as any).kicks },
  ai: { amp: (lipA as any).amp, vis: (lipA as any).vis, kicks: (tlA as any).kicks },
  code: { amp: (lipC as any).amp, vis: (lipC as any).vis, kicks: (tlC as any).kicks },
  wef: { amp: (lipW as any).amp, vis: (lipW as any).vis, kicks: (tlW as any).kicks },
};
let cur = 'launch';
export const setReel = (id: 'launch' | 'ai' | 'code' | 'wef') => { cur = id; };
export const reel = () => SETS[cur];
