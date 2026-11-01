import introCues from './cues.json';
import introKicks from './kicks.json';
import { setKicks } from '../showreel/lib';

// Same motion toolkit as the Git film, on this film's own beat map.
setKicks(introKicks);
export * from '../showreel/lib';
export const Q = introCues;
