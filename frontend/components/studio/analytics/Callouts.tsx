'use client';

/**
 * Tey's read of a course: the few things worth the creator's attention, most
 * urgent first, each with the one action that answers it (see the lesson,
 * nudge the quiet ones, answer questions, make a coupon…).
 */

import type { CSSProperties } from 'react';
import {
  Clock,
  Flag,
  Lock,
  MessageCircleQuestion,
  Moon,
  Share2,
  Target,
  TrendingDown,
  TrendingUp,
  UserPlus,
} from 'lucide-react';
import type { Callout } from '@/lib/creator/studio';
import { Faces, studio as s } from '../StudioParts';

const ICONS: Record<Callout['icon'], typeof Clock> = {
  drop: TrendingDown,
  hard: Target,
  slow: Clock,
  quiet: Moon,
  almost: Flag,
  question: MessageCircleQuestion,
  paywall: Lock,
  up: TrendingUp,
  share: Share2,
  new: UserPlus,
};

const TONES: Record<Callout['tone'], string> = {
  bad: 'var(--error-red)',
  warn: 'var(--warning)',
  good: 'var(--success-green)',
  info: 'var(--color-brand)',
};

export function Callouts({ callouts, onAction }: { callouts: Callout[]; onAction: (c: Callout) => void }) {
  return (
    <div className={s.callouts}>
      {callouts.map((c) => {
        const Icon = ICONS[c.icon] ?? Flag;
        const tone = TONES[c.tone];
        const primary = c.action && ['nudge', 'cheer', 'community', 'lesson'].includes(c.action.kind);
        return (
          <div key={c.id} className={s.callout} style={{ '--tone': tone } as CSSProperties}>
            <span className={s.calloutIcon} aria-hidden="true">
              <Icon size={22} strokeWidth={2.5} />
            </span>
            <span className={s.calloutBody}>
              <span className={s.calloutTitle}>{c.title}</span>
              <span className={s.calloutText}>{c.body}</span>
            </span>
            {c.action && (
              <span className={s.calloutAction}>
                {c.action.faces && c.action.faces.length > 0 && (
                  <Faces faces={c.action.faces.slice(0, 3)} total={c.action.learnerIds?.length} />
                )}
                <button
                  type="button"
                  className={`${c.action.kind === 'cheer' ? s.btnGood : primary ? s.btnPrimary : s.btn} ${s.btnSm}`}
                  onClick={() => onAction(c)}
                >
                  {c.action.label}
                </button>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
