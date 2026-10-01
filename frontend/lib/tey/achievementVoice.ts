/**
 * Tey's voice for the ACHIEVEMENT scene — this scene has never had a
 * mascot, headline pool, or spoken line at all (just a fixed "Achievement
 * unlocked!" over the factual tier description, which stays as-is). Adds a
 * headline pool and a short reaction line, tiered by how far up the tier
 * ladder this unlock landed.
 */

import { pickFromPool } from './pool';

const HEADLINE_NORMAL = ['Achievement unlocked!', 'Look at you go!', "Okayyy, I see you!"];

const HEADLINE_MAX_TIER = ['YOU MAXED IT OUT!', 'EVERYBODY LOOK! WE HAVE A CHAMPION!', 'This deserves a celebration!'];

const SPEECH_NORMAL = ["One more for the collection.", "That's going straight to the trophy case", 'Keep this up and I\'ll run out of things to say.'];

const SPEECH_MAX_TIER = ['I KNEW YOU HAD IT IN YOU!!!', 'Top tier. Literally.', 'Somebody tell the others — we have a legend here.'];

export function pickAchievementVoice(tier: number, maxTier: number): { headline: string; speech: string } {
  const isMax = maxTier > 1 && tier >= maxTier;
  return {
    headline: pickFromPool(isMax ? HEADLINE_MAX_TIER : HEADLINE_NORMAL, isMax ? 'achv-h:MAX' : 'achv-h:NORMAL'),
    speech: pickFromPool(isMax ? SPEECH_MAX_TIER : SPEECH_NORMAL, isMax ? 'achv-s:MAX' : 'achv-s:NORMAL'),
  };
}
