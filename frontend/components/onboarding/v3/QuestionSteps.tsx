'use client';

/**
 * The question screens of onboarding v3: one question per screen, a tap is
 * an answer, Tey reacts to every tap (sound, haptic, a line in the footer).
 */

import { motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  Brain,
  Briefcase,
  Clock,
  Mic,
  Moon,
  PiggyBank,
  Rocket,
  Sun,
  Sunrise,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import { OptionCard, OptionGroup } from '@/components/onboarding/OptionCard';
import { GOALS } from '@/lib/onboarding/goals';
import { DAILY_OPTIONS, TIME_OPTIONS } from '@/lib/onboarding/v3/flow';
import type { CatalogCourse } from '@/lib/onboarding/v3/catalog';

const GOAL_ICONS: Record<string, LucideIcon> = {
  Briefcase,
  TrendingUp,
  Rocket,
  PiggyBank,
  Users,
  Mic,
  Bot,
  Brain,
};

export function ChoiceList<T extends string>(props: {
  legend: string;
  options: readonly { id: T; label: string; description?: string; icon?: LucideIcon; badge?: string }[];
  selected: T | undefined;
  onPick: (id: T) => void;
  columns?: 1 | 2;
}) {
  return (
    <OptionGroup legend={props.legend} columns={props.columns ?? 1}>
      {props.options.map((o) => {
        const Icon = o.icon;
        return (
          <OptionCard
            key={o.id}
            id={o.id}
            label={o.label}
            description={o.description}
            badge={o.badge}
            selected={props.selected === o.id}
            onSelect={() => props.onPick(o.id)}
            icon={Icon ? <Icon className="w-6 h-6" aria-hidden="true" /> : undefined}
          />
        );
      })}
    </OptionGroup>
  );
}

export function GoalStep({ selected, onPick }: { selected?: string; onPick: (id: string) => void }) {
  return (
    <ChoiceList
      legend="What do you want to achieve?"
      columns={2}
      options={GOALS.map((g) => ({ id: g.id, label: g.label, icon: GOAL_ICONS[g.icon] }))}
      selected={selected}
      onPick={onPick}
    />
  );
}

/** Categories that have courses, best match for their goal first. */
export function CategoryStep(props: {
  categories: { name: string; count: number; recommended: boolean }[];
  selected?: string;
  onPick: (name: string) => void;
}) {
  return (
    <ChoiceList
      legend="What do you want to learn?"
      options={props.categories.map((c) => ({
        id: c.name,
        label: c.name,
        description: `${c.count} course${c.count === 1 ? '' : 's'}`,
        badge: c.recommended ? 'Best for your goal' : undefined,
      }))}
      selected={props.selected}
      onPick={props.onPick}
    />
  );
}

export function CourseStep(props: { courses: CatalogCourse[]; selected?: string; onPick: (id: string) => void }) {
  const reduce = useReducedMotion();
  return (
    <div role="radiogroup" aria-label="Pick your course" className="flex flex-col gap-3">
      {props.courses.map((c, i) => {
        const on = props.selected === c.id;
        return (
          <motion.button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => props.onPick(c.id)}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left flex items-center gap-3 rounded-[16px] border-2 p-3 bg-white cursor-pointer"
            style={{
              borderColor: on ? 'var(--color-brand)' : 'var(--border)',
              boxShadow: `0 4px 0 ${on ? 'var(--color-brand-deep)' : 'var(--border)'}`,
              background: on ? 'var(--color-band)' : 'var(--bg-page)',
            }}
          >
            <span className="relative w-[72px] h-[72px] shrink-0 overflow-hidden rounded-[12px] bg-[var(--bg-section)]">
              {c.thumbnailUrl ? (
                <Image src={c.thumbnailUrl} alt="" fill sizes="72px" className="object-cover" />
              ) : null}
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[16px] font-extrabold text-[var(--color-ink)] leading-tight">{c.title}</span>
              <span className="block mt-1 text-[13px] font-semibold text-[var(--text-secondary)]">
                Lesson 1: {c.firstLesson.title} · {c.firstLesson.durationMinutes} min
              </span>
              {c.isOriginal && (
                <span className="inline-block mt-1.5 rounded-full px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide bg-[var(--color-band)] text-[var(--color-brand)]">
                  Teyro Original
                </span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function DailyStep({ selected, onPick }: { selected?: string; onPick: (id: string) => void }) {
  return (
    <ChoiceList
      legend="How much time can you give a day?"
      options={DAILY_OPTIONS.map((d) => ({
        id: d.id,
        label: `${d.minutes} min a day`,
        description: d.label,
        // Recommended, not 'most popular': we haven't measured popularity.
        badge: d.id === '10' ? 'Recommended' : undefined,
      }))}
      selected={selected}
      onPick={onPick}
    />
  );
}

const TIME_ICONS: Record<string, LucideIcon> = { morning: Sunrise, afternoon: Sun, evening: Moon, 'no-preference': Clock };

export function TimeStep({ selected, onPick }: { selected?: string; onPick: (id: string) => void }) {
  return (
    <ChoiceList
      legend="When should Tey remind you?"
      options={TIME_OPTIONS.map((t) => ({ id: t.id, label: t.label, description: t.hint, icon: TIME_ICONS[t.id] }))}
      selected={selected}
      onPick={onPick}
    />
  );
}
