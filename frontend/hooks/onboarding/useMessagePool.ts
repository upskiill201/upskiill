'use client';

import { useCallback } from 'react';
import { pickOnboardingMessage, type OnboardingMessageType } from '@/lib/tey/onboardingVoice';

export type MessageType = OnboardingMessageType;

/**
 * Thin wrapper around `lib/tey/onboardingVoice.ts` — kept as a hook so
 * Step9Content.tsx's call sites don't change, but the pools and the
 * "don't repeat the last line" memory now live in the shared Tey voice
 * module instead of a component-local `useRef` that reset on remount.
 */
export function useMessagePool() {
  const getRandomMessage = useCallback((type: MessageType): string => pickOnboardingMessage(type), []);
  return { getRandomMessage };
}
