'use client';

/**
 * EnrollReminderAsk — between "You're in!" and lesson 1, Tey asks to remind
 * them (install first, in a tab that can install).
 *
 * Learners who enrol straight from a course page skip onboarding, so this is
 * the only moment they're ever asked; and a learner we can't reach who
 * doesn't start lesson 1 is simply lost. lib/push/askPolicy.ts decides
 * whether it's due (never when reminders are on or blocked, never right
 * after onboarding's own ask); otherwise this calls `onDone` straight away.
 *
 * Renders RemindersScene directly rather than through the celebration queue:
 * the course page lives outside the student app's providers.
 */

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import { useTeyPush } from '@/hooks/useTeyPush';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { decideEnrollAsk, readLedger, recordAsk, type AskKind } from '@/lib/push/askPolicy';

const RemindersScene = dynamic(() => import('@/components/celebration/scenes/RemindersScene'), { ssr: false });

/** Hooks that never settle (no service worker, odd browser) must not strand the learner. */
const READY_TIMEOUT_MS = 2500;

export default function EnrollReminderAsk({ lessonTitle, onDone }: { lessonTitle: string; onDone: () => void }) {
  const push = useTeyPush();
  const install = usePwaInstall();
  const [variant, setVariant] = useState<AskKind | null>(null);
  const decided = useRef(false);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (decided.current) return;
      decided.current = true;
      doneRef.current();
    }, READY_TIMEOUT_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (decided.current || !push.ready || !install.ready) return;
    decided.current = true;
    const decision = decideEnrollAsk(readLedger(), {
      now: new Date(),
      permission: push.permission,
      subscribed: push.subscribed,
      standalone: install.isStandalone,
      installable: install.isInstallable,
      needsInstall: push.needsInstall,
    });
    if (!decision.ask) {
      doneRef.current();
      return;
    }
    recordAsk(decision.kind, 'enroll');
    // Deciding once the push/install hooks settle is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariant(decision.kind);
  }, [push.ready, push.permission, push.subscribed, push.needsInstall, install.ready, install.isStandalone, install.isInstallable]);

  if (!variant) return null;
  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 100200 }}>
      <RemindersScene
        scene={{ kind: 'REMINDERS', variant, streakDays: 0, lessonTitle }}
        onAdvance={() => doneRef.current()}
      />
    </div>,
    document.body,
  );
}
