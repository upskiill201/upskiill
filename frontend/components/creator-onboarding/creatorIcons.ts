/**
 * An icon and tile colour for every creator onboarding answer, keyed
 * `question:id` (creator ids like `first-time` or `community` also exist in
 * the learner map with different meanings). Token vars only.
 */

import {
  Award,
  BookOpen,
  Clapperboard,
  Coffee,
  Dumbbell,
  FileText,
  Flame,
  GraduationCap,
  HandHeart,
  Megaphone,
  MessagesSquare,
  PiggyBank,
  Presentation,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Sparkle,
  Sprout,
  Timer,
  TrendingUp,
  UserRound,
  Users,
  Video,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { OPTION_ICONS } from '@/components/onboarding/screens/optionIcons';

const BLUE = 'var(--color-brand)';
const INDIGO = 'var(--brand-indigo)';
const PURPLE = 'var(--brand-purple)';
const ORANGE = 'var(--warning)';
const GREEN = 'var(--success-green)';
const RED = 'var(--error-red)';
const SLATE = 'var(--text-secondary)';

type Art = { Icon: LucideIcon; tone: string };

const CREATOR_ICONS: Record<string, Art> = {
  'type:course-creator': { Icon: GraduationCap, tone: BLUE },
  'type:content-creator': { Icon: Clapperboard, tone: RED },
  'type:teacher': { Icon: Presentation, tone: INDIGO },
  'type:mentor': { Icon: HandHeart, tone: GREEN },
  'type:engineer': { Icon: Wrench, tone: ORANGE },
  'type:new-creator': { Icon: Sprout, tone: SLATE },

  'experience:first-time': { Icon: SignalLow, tone: BLUE },
  'experience:some': { Icon: SignalMedium, tone: BLUE },
  'experience:experienced': { Icon: SignalHigh, tone: BLUE },
  'experience:pro': { Icon: Signal, tone: BLUE },

  'audience:none': { Icon: Sparkle, tone: SLATE },
  'audience:under-1k': { Icon: UserRound, tone: GREEN },
  'audience:1k-10k': { Icon: Users, tone: BLUE },
  'audience:10k-100k': { Icon: Megaphone, tone: PURPLE },
  'audience:100k-plus': { Icon: Award, tone: ORANGE },

  'existing:videos': { Icon: Video, tone: RED },
  'existing:full-course': { Icon: BookOpen, tone: BLUE },
  'existing:notes': { Icon: FileText, tone: INDIGO },
  'existing:community': { Icon: MessagesSquare, tone: GREEN },
  'existing:nothing-yet': { Icon: Sprout, tone: SLATE },

  'goal:earn': { Icon: PiggyBank, tone: GREEN },
  'goal:audience': { Icon: TrendingUp, tone: BLUE },
  'goal:impact': { Icon: HandHeart, tone: RED },
  'goal:community': { Icon: Users, tone: PURPLE },

  'time:1-2': { Icon: Coffee, tone: GREEN },
  'time:3-5': { Icon: Timer, tone: BLUE },
  'time:6-10': { Icon: Flame, tone: ORANGE },
  'time:10-plus': { Icon: Dumbbell, tone: RED },
};

/** Creator icon first, then the learner map (tracks and topics share ids). */
export function creatorIcon(question: string, id: string): Art | undefined {
  return CREATOR_ICONS[`${question}:${id}`] ?? OPTION_ICONS[id];
}
