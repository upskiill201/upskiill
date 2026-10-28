'use client';

/**
 * Right after gaining a study buddy, Tey asks to turn on notifications —
 * with a buddy notification as the preview ("Ada just did today's lesson").
 * The moment a person, not an app, will need you is the best moment to ask.
 *
 * Same policy as every other ask (lib/push/askPolicy.ts, the in-app rule:
 * never when reminders are on or blocked, at most about once a day), so a
 * new buddy can't become a way around the founder's spacing.
 */

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import { useTeyPush } from '@/hooks/useTeyPush';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { decideInAppAsk, readLedger, recordAsk, type AskKind } from '@/lib/push/askPolicy';

const RemindersScene = dynamic(() => import('@/components/celebration/scenes/RemindersScene'), { ssr: false });

/**
 * Longer than useTeyPush's 4 s service-worker race, so the push check can
 * settle even with no worker registered. Nothing waits on this ask (unlike
 * the enrol ask, which sits before lesson 1), so waiting costs nothing.
 */
const READY_TIMEOUT_MS = 6000;

export default function BuddyReminderAsk({ buddyName, onDone }: { buddyName: string; onDone: () => void }) {
  const push = useTeyPush();
  const install = usePwaInstall();
  const [variant, setVariant] = useState<AskKind | null>(null);
  const decided = useRef(false);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  // Hooks that never settle (no service worker, odd browser) must not leave this hanging.
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
    const decision = decideInAppAsk(readLedger(), {
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
    recordAsk(decision.kind, 'in-app');
    // Deciding once the push/install hooks settle is the point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVariant(decision.kind);
  }, [push.ready, push.permission, push.subscribed, push.needsInstall, install.ready, install.isStandalone, install.isInstallable]);

  if (!variant) return null;
  return createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 100200 }}>
      <RemindersScene scene={{ kind: 'REMINDERS', variant, streakDays: 0, buddyName }} onAdvance={() => doneRef.current()} />
    </div>,
    document.body,
  );
}
