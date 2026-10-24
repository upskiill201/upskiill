import React from 'react';
import { M1, M1_DURATION } from './m1-osi/M1';
import { M2, M2_DURATION } from './m2-agents/M2';
import { M3, M3_DURATION } from './m3-passwords/M3';
import { M4, M4_DURATION } from './m4-git/M4';
import { M5, M5_DURATION } from './m5-git-undo/M5';
import { M6, M6_DURATION } from './m6-quit-courses/M6';
import { M7, M7_DURATION } from './m7-face-id/M7';
import { M8, M8_DURATION } from './m8-tutorial-hell/M8';
import { M9, M9_DURATION } from './m9-chatgpt-enter/M9';
import { M10, M10_DURATION } from './m10-best-ai-model/M10';

/**
 * Registry of finished motion explainers. Add one line per video:
 *   import { M2, M2_DURATION } from './m2-<slug>/M2';
 *   { id: 'M2-<slug>', component: M2, durationInFrames: M2_DURATION },
 */
export const VIDEOS: { id: string; component: React.FC; durationInFrames: number }[] = [
  { id: 'M1-osi', component: M1, durationInFrames: M1_DURATION },
  { id: 'M2-agents', component: M2, durationInFrames: M2_DURATION },
  { id: 'M3-passwords', component: M3, durationInFrames: M3_DURATION },
  { id: 'M4-git', component: M4, durationInFrames: M4_DURATION },
  { id: 'M5-git-undo', component: M5, durationInFrames: M5_DURATION },
  { id: 'M6-quit-courses', component: M6, durationInFrames: M6_DURATION },
  { id: 'M7-face-id', component: M7, durationInFrames: M7_DURATION },
  { id: 'M8-tutorial-hell', component: M8, durationInFrames: M8_DURATION },
  { id: 'M9-chatgpt-enter', component: M9, durationInFrames: M9_DURATION },
  { id: 'M10-best-ai-model', component: M10, durationInFrames: M10_DURATION },
];
