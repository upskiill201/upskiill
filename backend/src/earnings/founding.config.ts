/**
 * Founding Creator programme: everyone who becomes a creator while it is open
 * joins at the Founding share. It runs until the learner app launches
 * (November 2026) and is closed by setting FOUNDING_PROGRAM=off on the backend
 * (Render) — creators who already joined keep their Founding agreement.
 */
export const STANDARD_SHARE_PCT = 70;
export const FOUNDING_SHARE_PCT = 80;
export const FOUNDING_NOTE =
  'Founding Creator programme: joined before the learner app launch';

export function isFoundingProgramOpen(): boolean {
  return (process.env.FOUNDING_PROGRAM ?? 'on').trim().toLowerCase() !== 'off';
}
