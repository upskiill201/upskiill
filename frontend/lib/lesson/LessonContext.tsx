'use client';

/**
 * Which lesson a deep component is inside — so something like the code
 * runner's "Share with your buddies" knows what it's sharing from without
 * threading ids through every exercise view. Null outside the player.
 */

import { createContext, useContext } from 'react';

export interface LessonContextValue {
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  /** Review replays and admin previews never post to the network. */
  shareable: boolean;
}

export const LessonContext = createContext<LessonContextValue | null>(null);

export const useLessonContext = () => useContext(LessonContext);
