'use client';

/**
 * ReminderAskWatcher — queues the RemindersScene (install the app / turn on
 * reminders) when lib/push/askPolicy.ts says an ask is due: on app open and
 * right after a finished lesson, at most once a day, until both are done.
 *
 * On open it also reports in (POST /tey/reach/ping): whether this is the
 * installed app, the browser's notification answer, and whether push is
 * subscribed, which is what Teyro HQ's "can Tey reach them?" view reads.
 * The reply says whether an admin asked from HQ for the screen; that ask
 * skips the daily spacing.
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
  // HQ asked for the screen (server says so on the open ping).
  const [hqAsk, setHqAsk] = useState(false);

  // App open: report in once per session, and make the daily ask eligible.
  const pinged = useRef(false);
  useEffect(() => {
    if (pinged.current || !profileLoaded || !push.ready || !install.ready) return;
    pinged.current = true;
    void fetch('/api/tey/reach/ping', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        standalone: install.isStandalone,
        permission: push.permission,
        subscribed: push.subscribed,
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((r: { askNow?: boolean } | null) => {
        if (r?.askNow) {
          setHqAsk(true);
          setPending(true);
        }
      })
      .catch(() => undefined);
    // Opening the app is a moment to ask too (the policy keeps it daily).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPending(true);
  }, [profileLoaded, push.ready, push.permission, push.subscribed, install.ready, install.isStandalone]);

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
    const ctx = {
      now: new Date(),
      permission: push.permission,
      subscribed: push.subscribed,
      standalone: install.isStandalone,
      installable: install.isInstallable,
      needsInstall: push.needsInstall,
    };
    let decision = decideInAppAsk(readLedger(), ctx);
    // HQ asked: skip the daily spacing (never past "already on"/"can't").
    if (hqAsk && !decision.ask && decision.reason === 'too-soon') {
      decision = decideInAppAsk({ asks: [] }, ctx);
    }
    if (hqAsk) {
      setHqAsk(false);
      void fetch('/api/tey/reach/shown', { method: 'POST', credentials: 'include' }).catch(() => undefined);
    }
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
    hqAsk,
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
