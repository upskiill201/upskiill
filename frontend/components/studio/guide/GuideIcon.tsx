import {
  BarChart3,
  Compass,
  Dumbbell,
  GalleryVerticalEnd,
  Hammer,
  Layers,
  Lightbulb,
  MessagesSquare,
  Send,
  Sparkles,
  Tag,
  TicketPercent,
  Users,
  Wallet,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react';
import type { GuideArticle, GuideGroup } from '@/lib/creator/guide';

const ICONS: Record<GuideArticle['icon'], LucideIcon> = {
  compass: Compass,
  sparkles: Sparkles,
  wand: WandSparkles,
  layers: Layers,
  hammer: Hammer,
  cards: GalleryVerticalEnd,
  dumbbell: Dumbbell,
  lightbulb: Lightbulb,
  tag: Tag,
  send: Send,
  users: Users,
  messages: MessagesSquare,
  chart: BarChart3,
  ticket: TicketPercent,
  wallet: Wallet,
};

export const GROUP_TONE: Record<GuideGroup, string> = {
  start: 'var(--color-brand)',
  build: 'var(--success-green)',
  grow: 'var(--brand-purple)',
  earn: 'var(--warning)',
};

export function GuideIcon({ name, size = 22 }: { name: GuideArticle['icon']; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} strokeWidth={2.4} />;
}
