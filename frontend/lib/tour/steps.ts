/**
 * The guided tour, in order. Each step names where it happens (`route`) and
 * what to light up (`target`, a `data-tour` value). A step with no target is
 * a centred card. The tour walks the learner through the real app: pressing
 * Next on a step whose route differs from the current page takes them there.
 */

export type TeyPose = 'waving' | 'pointing' | 'cheering' | 'thinking' | 'badge' | 'bell' | 'podium' | 'flame' | 'tablet';

export interface TourStep {
  id: string;
  route: string;
  /** `data-tour` value of the element to highlight; omit for a centred card. */
  target?: string;
  title: string;
  body: string;
  tey: TeyPose;
  /** On phones this target lives inside the slide-out menu. */
  inDrawer?: boolean;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    route: '/dashboard',
    title: 'Welcome to Teyro!',
    body: "I'm Tey. Let me show you around in about a minute, so you always know what is where.",
    tey: 'waving',
  },
  {
    id: 'path',
    route: '/dashboard',
    target: 'home-path',
    title: 'This is your path',
    body: 'Your lessons live here, one after another. The glowing one is your next lesson. Tap it to start.',
    tey: 'pointing',
  },
  {
    id: 'stats',
    route: '/dashboard',
    target: 'stats',
    title: 'Your stats',
    body: 'Streak, coins, XP and hearts. Tap any of them to see what it does and how to earn more.',
    tey: 'flame',
  },
  {
    id: 'learning',
    route: '/dashboard/my-learning',
    target: 'nav-learning',
    title: 'My Learning',
    body: 'Every course you have started, with your progress. Pick up right where you left off.',
    tey: 'tablet',
    inDrawer: true,
  },
  {
    id: 'explore',
    route: '/dashboard/explore',
    target: 'nav-explore',
    title: 'Explore',
    body: 'Looking for something new to learn? Browse every course here.',
    tey: 'thinking',
    inDrawer: true,
  },
  {
    id: 'community',
    route: '/dashboard/feed',
    target: 'nav-community',
    title: 'Community',
    body: 'Learn with others. Ask questions and cheer on your classmates. You unlock your seat after your first two lessons.',
    tey: 'cheering',
  },
  {
    id: 'leaderboards',
    route: '/dashboard/leaderboards',
    target: 'nav-leaderboards',
    title: 'Leaderboards',
    body: 'Earn XP to climb your weekly league. Finish near the top and you move up.',
    tey: 'podium',
  },
  {
    id: 'quests',
    route: '/dashboard/quests',
    target: 'nav-quests',
    title: 'Quests',
    body: 'Goals that pay off. Finish them to claim coins and rewards.',
    tey: 'badge',
  },
  {
    id: 'shop',
    route: '/dashboard/shop',
    target: 'nav-shop',
    title: 'Shop',
    body: 'Spend your coins here: streak repairs, extra hearts and treats for your profile.',
    tey: 'pointing',
  },
  {
    id: 'profile',
    route: '/dashboard/profile',
    target: 'nav-profile',
    title: 'Your profile',
    body: 'Your badges, level and progress, all in one place.',
    tey: 'badge',
  },
  {
    id: 'bell',
    route: '/dashboard/profile',
    target: 'bell',
    title: 'Notifications',
    body: 'News about your streak, league and rewards lands here. A red dot means something is waiting.',
    tey: 'bell',
  },
  {
    id: 'more',
    route: '/dashboard/profile',
    target: 'nav-more',
    title: 'More',
    body: 'Settings, help and feedback live here. You can replay this tour from this menu any time.',
    tey: 'thinking',
    inDrawer: true,
  },
  {
    id: 'done',
    route: '/dashboard',
    title: "You're all set!",
    body: 'That is the whole app. Your first lesson is waiting on your path. Ready?',
    tey: 'cheering',
  },
];
