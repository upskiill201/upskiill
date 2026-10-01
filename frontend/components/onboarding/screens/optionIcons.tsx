/**
 * An icon and a tile colour for every onboarding answer.
 *
 * A wall of identical white text rows is what made the question steps read
 * as a survey. An icon per answer gives the eye something to land on, and
 * lets a learner recognise an option before they have read it.
 *
 * Keyed by option id. The ids are unique across every question, so one flat
 * map is enough; an id with no entry simply renders without an icon.
 * Colours are token vars only — no raw hex.
 */

import {
  BrainCircuit,
  Bot,
  Braces,
  Brain,
  Briefcase,
  CalendarX,
  CircleMinus,
  CirclePause,
  Clock,
  CodeXml,
  Coffee,
  Compass,
  Dumbbell,
  Flame,
  Globe,
  GraduationCap,
  Hammer,
  Laptop,
  Meh,
  Moon,
  Rocket,
  Server,
  Shuffle,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Signpost,
  Smartphone,
  Sparkle,
  Sparkles,
  Sun,
  Sunrise,
  ThumbsUp,
  Timer,
  TrendingUp,
  BookOpen,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const BLUE = 'var(--color-brand)';
const INDIGO = 'var(--brand-indigo)';
const PURPLE = 'var(--brand-purple)';
const ORANGE = 'var(--warning)';
const GREEN = 'var(--success-green)';
const RED = 'var(--error-red)';
const SLATE = 'var(--text-secondary)';

export const OPTION_ICONS: Record<string, { Icon: LucideIcon; tone: string }> = {
  // Goals
  'build-projects': { Icon: Hammer, tone: ORANGE },
  career: { Icon: Briefcase, tone: BLUE },
  freelance: { Icon: Laptop, tone: INDIGO },
  startup: { Icon: Rocket, tone: RED },
  automate: { Icon: Zap, tone: ORANGE },
  explore: { Icon: Compass, tone: GREEN },
  'improve-skills': { Icon: TrendingUp, tone: PURPLE },

  // Coding interests
  'web-development': { Icon: Globe, tone: BLUE },
  'mobile-development': { Icon: Smartphone, tone: INDIGO },
  'programming-fundamentals': { Icon: Braces, tone: ORANGE },
  'software-development': { Icon: Server, tone: GREEN },

  // AI interests
  'use-tools': { Icon: Sparkles, tone: PURPLE },
  'build-agents': { Icon: Bot, tone: BLUE },
  automations: { Icon: Workflow, tone: ORANGE },

  exploring: { Icon: Compass, tone: SLATE },

  // Experience — signal bars fill up as experience grows.
  beginner: { Icon: SignalLow, tone: BLUE },
  'tried-a-little': { Icon: SignalMedium, tone: BLUE },
  basics: { Icon: SignalHigh, tone: BLUE },
  experienced: { Icon: Signal, tone: BLUE },

  // Prior attempt
  stopped: { Icon: CirclePause, tone: ORANGE },
  'still-learning': { Icon: BookOpen, tone: GREEN },
  'self-taught-a-little': { Icon: GraduationCap, tone: INDIGO },
  'first-time': { Icon: Sparkle, tone: PURPLE },
  skipped: { Icon: CircleMinus, tone: SLATE },

  // Barriers
  distracted: { Icon: Smartphone, tone: RED },
  consistency: { Icon: CalendarX, tone: ORANGE },
  boring: { Icon: Meh, tone: INDIGO },
  'what-next': { Icon: Signpost, tone: BLUE },
  'hard-concepts': { Icon: Brain, tone: PURPLE },
  'no-time': { Icon: Clock, tone: ORANGE },
  accountability: { Icon: Users, tone: GREEN },
  none: { Icon: ThumbsUp, tone: GREEN },

  // Daily commitment — heat rises with the minutes.
  '5': { Icon: Coffee, tone: GREEN },
  '10': { Icon: Timer, tone: BLUE },
  '20': { Icon: Flame, tone: ORANGE },
  '30': { Icon: Dumbbell, tone: RED },

  // Preferred time
  morning: { Icon: Sunrise, tone: ORANGE },
  afternoon: { Icon: Sun, tone: ORANGE },
  evening: { Icon: Moon, tone: INDIGO },
  'no-preference': { Icon: Shuffle, tone: SLATE },

  // Categories
  coding: { Icon: CodeXml, tone: BLUE },
  ai: { Icon: BrainCircuit, tone: PURPLE },
};
