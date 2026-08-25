import {
  Gamepad2,
  Puzzle,
  Flame,
  Bell,
  Trophy,
  Brain,
  Bot,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

/**
 * The paywall's value-proposition content — "Why Teyro works".
 * Rendered by BenefitCarousel as swipeable benefit cards.
 */
export interface ValuePropSlide {
  id: number;
  tag: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  headline: string;
  subheadline: string;
  body: string;
  takeaway: string;
  highlights: string[];
}

export const VALUE_PROPS: ValuePropSlide[] = [
  {
    id: 1,
    tag: 'LEARN + PLAY',
    icon: Gamepad2,
    iconColor: '#0172FD',
    iconBg: '#EFF6FF',
    headline: "Learning shouldn't feel boring",
    subheadline: 'Turn learning into an engaging game.',
    body: 'Most platforms give you endless video lectures and dry quizzes. Teyro turns learning into an interactive quest: XP, coins, streak fires, challenges, and achievements make every step feel rewarding.',
    takeaway: 'I can actually enjoy learning this.',
    highlights: ['XP & Coin Rewards', 'Interactive Duolingo-style Steps', 'Unlock Mystery Chests & Badges'],
  },
  {
    id: 2,
    tag: 'BITE-SIZED PROGRESS',
    icon: Puzzle,
    iconColor: '#0284C7',
    iconBg: '#F0F9FF',
    headline: "Learning shouldn't feel overwhelming",
    subheadline: 'Big skills. Small achievable steps.',
    body: 'Starting a whole new skill can feel like looking up at a mountain. Teyro breaks courses into 5-minute bite-sized lessons so you never feel intimidated. One lesson. One challenge. One step forward.',
    takeaway: "I don't need hours to make progress.",
    highlights: ['5-Minute Focused Lessons', 'Clear Sequential Milestones', 'No Overwhelming Mountain of Videos'],
  },
  {
    id: 3,
    tag: 'HABIT BUILDING',
    icon: Flame,
    iconColor: '#EA580C',
    iconBg: '#FFF7ED',
    headline: "Starting isn't the hard part. Staying is.",
    subheadline: 'Build a habit you actually come back to.',
    body: "Most people don't fail because they can't learn — they fail because they stop coming back. Teyro builds momentum through daily streaks, quick goals, and rewarding feedback that makes consistency effortless.",
    takeaway: 'Teyro helps me actually stick with this.',
    highlights: ['Daily Streak Protection', 'Momentum-Driven Rewards', 'Easy Daily Next Steps'],
  },
  {
    id: 4,
    tag: 'ACCOUNTABILITY COMPANION',
    icon: Bell,
    iconColor: '#F59E0B',
    iconBg: '#FEFCE8',
    headline: "You shouldn't have to remember everything",
    subheadline: 'Tey remembers for you and keeps you moving.',
    body: 'Life gets busy and you miss a day. Tey notices. With witty, caring check-ins and personalized reminders, Teyro is an accountability companion that will not let your goals quietly fade away.',
    takeaway: 'Teyro actually cares whether I keep learning.',
    highlights: ['Smart Inactivity Nudges', 'Personalized Follow-ups', 'Tey Has Your Back'],
  },
  {
    id: 5,
    tag: 'SOCIAL & COMMUNITY',
    icon: Trophy,
    iconColor: '#D97706',
    iconBg: '#FEF9C3',
    headline: 'Learning alone is harder',
    subheadline: 'Learn alongside people who share your goals.',
    body: "Teyro turns learning into a shared journey. Live weekly leaderboards, peer challenges, and friendly competition give you the extra push: see who's ahead, compete, and climb the ranks together.",
    takeaway: "I'm part of something, not learning in isolation.",
    highlights: ['Weekly League Leaderboards', 'Peer Challenge Quests', 'Shared Milestone Wins'],
  },
  {
    id: 6,
    tag: 'ACTIVE RECALL & MASTERY',
    icon: Brain,
    iconColor: '#8B5CF6',
    iconBg: '#FAF5FF',
    headline: "Watching videos isn't learning",
    subheadline: "Don't just consume. Build the capability.",
    body: "A course shouldn't end with 'Congratulations, you watched everything.' Teyro uses the proven Learn → Apply → Reflect → Deepen cycle so you actually build, practice, and retain the skill for the real world.",
    takeaway: "I'm here to become truly capable.",
    highlights: ['Hands-On Interactive Tasks', 'Reflection & Recall Questions', 'Capstone Project Mastery'],
  },
  {
    id: 7,
    tag: 'ADAPTIVE AI GUIDANCE',
    icon: Bot,
    iconColor: '#0EA5E9',
    iconBg: '#F0F9FF',
    headline: "Your learning shouldn't be one-size-fits-all",
    subheadline: 'Teyro learns from how you learn.',
    body: 'As you progress, Teyro understands what you have mastered, where you struggle, and what you skip. Adaptive guidance gives you targeted practice when you need help, and pushes you when you are ready for more.',
    takeaway: 'Personalized to my pace and strengths.',
    highlights: ['Dynamic Weak-Spot Practice', 'Adaptive Difficulty Challenges', 'Guided Next-Step Direction'],
  },
  {
    id: 8,
    tag: 'THE TEYRO PROMISE',
    icon: Rocket,
    iconColor: '#16A34A',
    iconBg: '#F0FDF4',
    headline: 'This is learning, the Teyro way',
    subheadline: 'Learn. Play. Practice. Compete. Keep going.',
    body: "Teyro isn't just where you watch courses. It's where you build the lifelong habit of learning and turn ambition into tangible skills.",
    takeaway: "I'm ready to keep going.",
    highlights: ['Complete All Course Modules', 'Verified Completion Certificate', 'Full Lifetime Progress Saved'],
  },
];
