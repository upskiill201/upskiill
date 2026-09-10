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
 *
 * `headline`/`subheadline`/`body` are Tey talking directly to the learner in
 * first person — this was previously third-person narrator copy ("Teyro
 * turns learning into...", "Teyro breaks courses into...") describing the
 * product from the outside, the one piece of the paywall flow the earlier
 * "rewrite in Tey's first-person voice" pass explicitly hadn't reached yet.
 * `takeaway` stays as the LEARNER's own internal voice ("I can actually
 * enjoy learning this") — a different, deliberate register, not Tey
 * speaking, so it's untouched. `highlights` are short factual bullets, not
 * prose, and `tag` is a category label — neither needed a voice pass.
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
    headline: "I don't do boring lessons",
    subheadline: 'I turn learning into a game you actually want to play.',
    body: 'Other platforms hand you endless lectures and dry quizzes. I turn it into a quest instead — XP, coins, streak fires, challenges, achievements. Every step is meant to feel like it was worth taking.',
    takeaway: 'I can actually enjoy learning this.',
    highlights: ['XP & Coin Rewards', 'Interactive Duolingo-style Steps', 'Unlock Mystery Chests & Badges'],
  },
  {
    id: 2,
    tag: 'BITE-SIZED PROGRESS',
    icon: Puzzle,
    iconColor: '#0284C7',
    iconBg: '#F0F9FF',
    headline: "I won't make this feel like a mountain",
    subheadline: 'Big skills, in steps small enough to actually finish.',
    body: "Starting something new is intimidating on its own. I break it into 5-minute lessons so it never feels like too much — one lesson, one challenge, one step forward. That's the whole trick.",
    takeaway: "I don't need hours to make progress.",
    highlights: ['5-Minute Focused Lessons', 'Clear Sequential Milestones', 'No Overwhelming Mountain of Videos'],
  },
  {
    id: 3,
    tag: 'HABIT BUILDING',
    icon: Flame,
    iconColor: '#EA580C',
    iconBg: '#FFF7ED',
    headline: "Starting's easy. I'll help you stay.",
    subheadline: "I build the habit so you don't have to force it.",
    body: "Most people don't fail because they can't learn — they fail because they stop showing up. I keep the momentum going with daily streaks, quick goals, and feedback that makes coming back the easy choice.",
    takeaway: 'Teyro helps me actually stick with this.',
    highlights: ['Daily Streak Protection', 'Momentum-Driven Rewards', 'Easy Daily Next Steps'],
  },
  {
    id: 4,
    tag: 'ACCOUNTABILITY COMPANION',
    icon: Bell,
    iconColor: '#F59E0B',
    iconBg: '#FEFCE8',
    headline: "You don't have to remember. I will.",
    subheadline: "I notice when you're gone, and I'll nudge you back.",
    body: "Life gets busy and you miss a day — I notice. Expect witty, caring check-ins and reminders that actually mean something. I'm not letting your goals quietly fade out while you're not looking.",
    takeaway: 'Teyro actually cares whether I keep learning.',
    highlights: ['Smart Inactivity Nudges', 'Personalized Follow-ups', 'Tey Has Your Back'],
  },
  {
    id: 5,
    tag: 'SOCIAL & COMMUNITY',
    icon: Trophy,
    iconColor: '#D97706',
    iconBg: '#FEF9C3',
    headline: "You're not doing this alone",
    subheadline: "I'll put you in the mix with people chasing the same goals.",
    body: "Weekly leaderboards, peer challenges, a bit of friendly competition — I'll show you who's ahead so you've got a reason to catch up, or stay there yourself.",
    takeaway: "I'm part of something, not learning in isolation.",
    highlights: ['Weekly League Leaderboards', 'Peer Challenge Quests', 'Shared Milestone Wins'],
  },
  {
    id: 6,
    tag: 'ACTIVE RECALL & MASTERY',
    icon: Brain,
    iconColor: '#8B5CF6',
    iconBg: '#FAF5FF',
    headline: "Watching isn't learning. I know the difference.",
    subheadline: "I won't let you just consume — I'll make you build it.",
    body: "A course shouldn't end with 'congrats, you watched everything.' I run you through Learn → Apply → Reflect → Deepen so you walk away actually able to do the thing, not just having seen it done.",
    takeaway: "I'm here to become truly capable.",
    highlights: ['Hands-On Interactive Tasks', 'Reflection & Recall Questions', 'Capstone Project Mastery'],
  },
  {
    id: 7,
    tag: 'ADAPTIVE AI GUIDANCE',
    icon: Bot,
    iconColor: '#0EA5E9',
    iconBg: '#F0F9FF',
    headline: 'I pay attention to how you learn',
    subheadline: "Not one-size-fits-all — I adjust to you.",
    body: "As you go, I notice what you've got down, where you're stuck, and what you keep skipping. You'll get extra practice where it actually counts, and I'll push you when you're ready for more.",
    takeaway: 'Personalized to my pace and strengths.',
    highlights: ['Dynamic Weak-Spot Practice', 'Adaptive Difficulty Challenges', 'Guided Next-Step Direction'],
  },
  {
    id: 8,
    tag: 'THE TEYRO PROMISE',
    icon: Rocket,
    iconColor: '#16A34A',
    iconBg: '#F0FDF4',
    headline: 'This is how I do learning',
    subheadline: 'Learn. Play. Practice. Compete. Keep going.',
    body: "I'm not just where you watch a course. I'm where you build the habit — and turn wanting to learn something into actually knowing how.",
    takeaway: "I'm ready to keep going.",
    highlights: ['Complete All Course Modules', 'Verified Completion Certificate', 'Full Lifetime Progress Saved'],
  },
];
