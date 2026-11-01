'use client';

/**
 * Teyro HQ — one device's onboarding, event by event: every screen it saw,
 * what it answered (never the name), how long it took, where it went back,
 * quit or came back, and the signup. Personal answers are never stored, so
 * they can't show here either.
 */

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Glyph } from '@/components/art/Glyph';
import { useAdminData } from '@/components/admin/AdminUI';
import { Hero, LoadError, Panel, Skeleton, hq as h } from '@/components/admin/hq/HQ';
import g from '@/components/admin/hq/growth.module.css';
import { answerLabel, eventLabel, quitLabel, stepLabel } from '@/lib/admin/growthLabels';

interface Journey {
  anonymousId: string;
  events: {
    step: string;
    type: string;
    answerKey: string | null;
    answerValue: string | null;
    ms: number | null;
    reason: string | null;
    device: string | null;
    createdAt: string;
  }[];
}

function describe(e: Journey['events'][number]): string {
  const screen = stepLabel(e.step);
  switch (e.type) {
    case 'VIEW':
      return `Saw ${screen}`;
    case 'ANSWER': {
      const secs = e.ms ? ` after ${Math.round(e.ms / 100) / 10}s` : '';
      return e.answerValue ? `Answered ${screen}: ${answerLabel(e.answerValue)}${secs}` : `Moved on from ${screen}${secs}`;
    }
    case 'BACK':
      return `Went back from ${screen}`;
    case 'QUIT_PROMPT':
      return `Tried to leave at ${screen}, Tey asked them to stay`;
    case 'QUIT_STAY':
      return 'Stayed';
    case 'QUIT':
      return `Left at ${screen}${e.reason ? `: ${quitLabel(e.reason)}` : ''}`;
    case 'RESUME':
      return `Came back to ${screen}`;
    case 'LESSON_START':
      return 'Started the lesson';
    case 'LESSON_EXIT':
      return 'Left the lesson';
    case 'LESSON_DONE':
      return `Finished the lesson${e.answerValue ? ` (${e.answerValue})` : ''}`;
    case 'SIGNUP':
      return `Saved progress${e.answerValue ? ` with ${answerLabel(e.answerValue)}` : ''}`;
    case 'PAYWALL':
      return e.answerValue === 'pro' ? 'Started Pro' : 'Stayed on the free plan';
    case 'COMPLETE':
      return 'Finished onboarding';
    default:
      return `${eventLabel(e.type)} · ${screen}`;
  }
}

export default function OnboardingJourneyPage() {
  const params = useParams<{ anonymousId: string }>();
  const id = params?.anonymousId;
  const { data, error, mutate } = useAdminData<Journey>(id ? `/api/admin/insights/onboarding/journeys/${id}` : null);

  if (error && !data) return <LoadError onRetry={() => void mutate()} />;
  if (!data) return <Skeleton />;

  const first = data.events[0];
  const last = data.events[data.events.length - 1];
  const day = (iso: string) => new Date(iso).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  const time = (iso: string) => new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const minutes = first && last ? Math.max(1, Math.round((Date.parse(last.createdAt) - Date.parse(first.createdAt)) / 60_000)) : 0;

  // A day heading wherever the date changes.
  const rows = data.events.map((e, i) => ({
    e,
    d: day(e.createdAt),
    header: i === 0 || day(data.events[i - 1].createdAt) !== day(e.createdAt),
  }));

  return (
    <div className={h.page}>
      <Link href="/admin/onboarding" className={g.back}>
        <Glyph name="back" size={16} strokeWidth={3} /> Onboarding
      </Link>
      <Hero
        pose="searching"
        title="One onboarding, screen by screen"
        sub={
          first
            ? `${data.events.length} events over ${minutes} minute${minutes === 1 ? '' : 's'}, on ${first.device ? answerLabel(first.device).toLowerCase() : 'an unknown device'}.`
            : 'Nothing recorded for this device.'
        }
      />
      <Panel title="Timeline" note="Times are in your timezone">
        {data.events.length === 0 ? (
          <p className={h.empty}>No events.</p>
        ) : (
          <ol className={g.timeline}>
            {rows.map(({ e, d, header }, i) => (
              <li key={`${e.createdAt}-${i}`}>
                {header && <p className={h.note} style={{ margin: '12px 0 4px' }}>{d}</p>}
                <div className={g.event}>
                  <span className={g.eventTime}>{time(e.createdAt)}</span>
                  <span className={g.eventText}>{describe(e)}</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Panel>
    </div>
  );
}
