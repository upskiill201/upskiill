/**
 * /deck-shots — dev-only sheet of the homepage visuals, one per frame, so
 * scripts/export-deck-shots.mjs can capture each as a transparent PNG for the
 * pitch deck. Not linked anywhere; 404s in production.
 */

import { notFound } from 'next/navigation';
import { Baloo_2 } from 'next/font/google';
import {
  FriendsVisual,
  HeroPhone,
  LeagueVisual,
  LessonVisual,
  MethodVisual,
  RemindersVisual,
  RewardsVisual,
  StreakVisual,
} from '@/components/homepage/v3/Visuals';
import s from '@/components/homepage/v3/Home.module.css';

const baloo2 = Baloo_2({ variable: '--font-celebration', subsets: ['latin'], weight: ['600', '700', '800'] });

const SHOTS: { name: string; width: number; node: React.ReactNode }[] = [
  {
    name: 'app-home-path-phone',
    width: 560,
    node: (
      <div style={{ width: '100%' }}>
        <HeroPhone />
      </div>
    ),
  },
  { name: 'app-home-path-phone-clean', width: 380, node: <HeroPhone bare /> },
  { name: 'lesson-correct-answer', width: 480, node: <LessonVisual /> },
  { name: 'learn-apply-reflect-deepen', width: 480, node: <MethodVisual /> },
  { name: 'streak-128-days', width: 480, node: <StreakVisual /> },
  { name: 'league-first-place', width: 480, node: <LeagueVisual /> },
  { name: 'friends-and-community', width: 480, node: <FriendsVisual /> },
  { name: 'daily-quests-rewards', width: 480, node: <RewardsVisual /> },
  { name: 'reminders-home-screen', width: 480, node: <RemindersVisual /> },
];

export default function DeckShots() {
  if (process.env.NODE_ENV === 'production') notFound();
  return (
    <main className={`${baloo2.variable} ${s.page}`} style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 80 }}>
      {SHOTS.map((shot) => (
        <div
          key={shot.name}
          data-shot={shot.name}
          // Room for the cards' drop shadows and the floating chips.
          style={{ width: shot.width + 128, padding: 64, display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ width: shot.width, display: 'flex', justifyContent: 'center' }}>{shot.node}</div>
        </div>
      ))}
    </main>
  );
}
