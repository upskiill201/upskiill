'use client';

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
import type { VisualKey } from '@/lib/seo/facts';

// The homepage's product mocks, picked by key so server pages can choose one
// without passing a component across the client boundary. Each page shows the
// feature it is about — never a generic app screenshot.
const VISUALS: Record<VisualKey, () => React.ReactElement> = {
  phone: () => <HeroPhone bare />,
  lesson: LessonVisual,
  method: MethodVisual,
  streak: StreakVisual,
  league: LeagueVisual,
  friends: FriendsVisual,
  rewards: RewardsVisual,
  reminders: RemindersVisual,
};

export default function FeatureVisual({ name }: { name: VisualKey }) {
  const Visual = VISUALS[name];
  return <Visual />;
}
