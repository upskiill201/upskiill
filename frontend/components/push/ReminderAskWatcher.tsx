'use client';

/**
 * ReminderAskWatcher — queues the RemindersScene right after a finished
 * lesson, when lib/push/askPolicy.ts says an ask is due.
 *
 * "Finished a lesson" = `lastLessonCompletedAt` moved forward during this
 * session. The scene is queued once the learner is out of the lesson player
 * (the celebration queue also holds while a lesson is focused), so it lands
 * after the lesson's own finish screens, on the path.
 *
 * Mounted for the whole student app, which also keeps a usePwaInstall
 * instance alive to catch Chrome's one-time install prompt for the scene.
 */

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useGamification } from '@/context/GamificationContext';
import { useCelebration } from '@/context/CelebrationContext';
import { useLessonFocused } from '@/lib/lesson/lessonFocus';
import { useTeyPush } from '@/hooks/useTeyPush';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { decideInAppAsk, readLedger, recordAsk } from '@/lib/push/askPolicy';

/** Routes where a takeover must never appear. */
const SKIP_ROUTE_PREFIXES = ['/creator', '/onboarding', '/login', '/signup', '/dev'];

export default function ReminderAskWatcher() {
  const pathname = usePathname();
  const { profileLoaded, lastLessonCompletedAt, streakDays } = useGamification();
  const { celebrate } = useCelebration();
  const lessonFocused = useLessonFocused();
  const push = useTeyPush();
  const install = usePwaInstall();

  // The value seen when the app loaded; only a later one counts as "just finished".
  const baselineRef = useRef<string | null | undefined>(undefined);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!profileLoaded) return;
    if (baselineRef.current === undefined) {
      baselineRef.current = lastLessonCompletedAt;
      return;
    }
    if (lastLessonCompletedAt && lastLessonCompletedAt !== baselineRef.current) {
      baselineRef.current = lastLessonCompletedAt;
      // A lesson just finished — reacting to the gamification store is the point.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPending(true);
    }
  }, [profileLoaded, lastLessonCompletedAt]);

  useEffect(() => {
    if (!pending || lessonFocused) return;
    if (!push.ready || !install.ready) return;
    const path = pathname || '';
    if (SKIP_ROUTE_PREFIXES.some((p) => path.startsWith(p))) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPending(false);
    const decision = decideInAppAsk(readLedger(), {
      now: new Date(),
      permission: push.permission,
      subscribed: push.subscribed,
      standalone: install.isStandalone,
      installable: install.isInstallable,
      needsInstall: push.needsInstall,
    });
    if (!decision.ask) return;

    recordAsk(decision.kind, 'in-app');
    celebrate({
      kind: 'REMINDERS',
      variant: decision.kind,
      streakDays,
      dedupeKey: `reminders:${new Date().toDateString()}`,
    });
  }, [
    pending,
    lessonFocused,
    pathname,
    push.ready,
    push.permission,
    push.subscribed,
    push.needsInstall,
    install.ready,
    install.isStandalone,
    install.isInstallable,
    streakDays,
    celebrate,
  ]);

  return null;
}
