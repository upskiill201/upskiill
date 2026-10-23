'use client';

/**
 * The question screens of onboarding v3, in Duolingo's order: "I want to
 * learn…" (every course, grouped by topic), name, how they heard, why, how
 * much they know, the daily goal and when to remind them. One question per
 * screen, Teyro's own illustrations on every answer, a tap is an answer.
 */

import Image from 'next/image';
import type { ReactNode } from 'react';
import { FaAppStoreIos, FaGoogle, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Art, topicArt, type ArtName } from '@/components/art/Art';
import { GOALS } from '@/lib/onboarding/goals';
import type { CatalogCourse } from '@/lib/onboarding/v3/catalog';
import { DAILY_OPTIONS, EXPERIENCE_OPTIONS, SOURCE_OPTIONS, TIME_OPTIONS } from '@/lib/onboarding/v3/flow';
import { Choice, ChoiceGroup, kitCss as css } from './ui/Kit';

// ── "I want to learn…" ─────────────────────────────────────────────────────

/** Topics in the order a newcomer most often looks for them; the rest follow. */
const TOPIC_ORDER = ['coding', 'ai', 'data', 'business', 'personal finance', 'communication', 'leadership', 'career'];
function topicRank(category: string) {
  const c = category.toLowerCase();
  const i = TOPIC_ORDER.findIndex((t) => c.includes(t));
  return i === -1 ? 99 : i;
}

export function LearnStep(props: { courses: CatalogCourse[]; selected?: string; onPick: (course: CatalogCourse) => void }) {
  const groups = new Map<string, CatalogCourse[]>();
  for (const c of props.courses) groups.set(c.category, [...(groups.get(c.category) ?? []), c]);
  const ordered = [...groups.entries()].sort((a, b) => topicRank(a[0]) - topicRank(b[0]) || a[0].localeCompare(b[0]));
  let n = 0;
  return (
    <div role="radiogroup" aria-label="I want to learn">
      {ordered.map(([category, courses]) => (
        <section key={category} aria-label={category}>
          <h2 className={css.groupHead}>
            <Art name={topicArt(category)} size={34} />
            {category}
            <span className={css.groupCount}>
              {courses.length} {courses.length === 1 ? 'course' : 'courses'}
            </span>
          </h2>
          <div className={css.choices}>
            {courses.map((c) => (
              <Choice
                key={c.id}
                index={n++}
                selected={props.selected === c.id}
                onSelect={() => props.onPick(c)}
                label={c.title}
                sub={`${c.chapters} ${c.chapters === 1 ? 'chapter' : 'chapters'} · ${c.totalLessons} lessons`}
                chevron
                media={
                  <span className={css.cover}>
                    {c.thumbnailUrl ? (
                      <Image src={c.thumbnailUrl} alt="" fill sizes="64px" className="object-cover" />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center">
                        <Art name={topicArt(category)} size={40} />
                      </span>
                    )}
                  </span>
                }
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// ── Name ───────────────────────────────────────────────────────────────────

export function NameStep(props: { value?: string; onChange: (v: string) => void; onSubmit: () => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.value?.trim()) props.onSubmit();
      }}
    >
      <label className={css.srOnly} htmlFor="ob-name">
        Your first name
      </label>
      <input
        id="ob-name"
        className={css.input}
        value={props.value ?? ''}
        onChange={(e) => props.onChange(e.target.value.slice(0, 40))}
        placeholder="Your first name"
        autoComplete="given-name"
        autoCapitalize="words"
        enterKeyHint="next"
        autoFocus
        maxLength={40}
      />
      <p className={css.hint}>Just what I&apos;ll call you. You can change it later.</p>
    </form>
  );
}

// ── How did you hear ──────────────────────────────────────────────────────

/** A brand mark in a rounded tile, in a colour that reads as that brand. */
function BrandTile({ children, bg, fg = 'var(--bg-page)', bordered }: { children: ReactNode; bg: string; fg?: string; bordered?: boolean }) {
  return (
    <span
      className="grid place-items-center rounded-[14px] w-[48px] h-[48px] text-[24px]"
      style={{ background: bg, color: fg, border: bordered ? '2px solid var(--border)' : undefined }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

const SOURCE_MEDIA: Record<string, ReactNode> = {
  tiktok: (
    <BrandTile bg="var(--color-ink)">
      <FaTiktok />
    </BrandTile>
  ),
  instagram: (
    <BrandTile bg="linear-gradient(135deg, var(--brand-purple), var(--error-red) 60%, var(--warning))">
      <FaInstagram />
    </BrandTile>
  ),
  youtube: (
    <BrandTile bg="var(--error-red)">
      <FaYoutube />
    </BrandTile>
  ),
  google: (
    <BrandTile bg="var(--bg-page)" fg="var(--color-brand)" bordered>
      <FaGoogle />
    </BrandTile>
  ),
  linkedin: (
    <BrandTile bg="var(--color-brand-deep)">
      <FaLinkedinIn />
    </BrandTile>
  ),
  'app-store': (
    <BrandTile bg="var(--color-brand)">
      <FaAppStoreIos />
    </BrandTile>
  ),
  friend: <Art name="friends" size={48} />,
  x: <Art name="xmark" size={48} />,
  other: <Art name="planet" size={48} />,
};

export function SourceStep({ selected, onPick }: { selected?: string; onPick: (id: string) => void }) {
  return (
    <ChoiceGroup label="How did you hear about Teyro?" layout="grid3">
      {SOURCE_OPTIONS.map((o, i) => (
        <Choice
          key={o.id}
          index={i}
          layout="small"
          selected={selected === o.id}
          onSelect={() => onPick(o.id)}
          label={o.label}
          media={<span className={css.art}>{SOURCE_MEDIA[o.id]}</span>}
        />
      ))}
    </ChoiceGroup>
  );
}

// ── Why ───────────────────────────────────────────────────────────────────

const GOAL_ART: Record<string, ArtName> = {
  'tech-job': 'laptop',
  'grow-at-work': 'chart',
  'build-my-own': 'rocket',
  money: 'piggy',
  'lead-team': 'team',
  'speak-confidently': 'mic',
  'keep-up-ai': 'chip',
  'stay-sharp': 'brain',
};

export function GoalStep({ selected, onPick, topic }: { selected?: string; onPick: (id: string) => void; topic?: string }) {
  return (
    <ChoiceGroup label={`Why are you learning ${topic ?? 'this'}?`} layout="grid2">
      {GOALS.map((g, i) => (
        <Choice
          key={g.id}
          index={i}
          layout="tile"
          selected={selected === g.id}
          onSelect={() => onPick(g.id)}
          label={g.label}
          art={GOAL_ART[g.id] ?? 'spark'}
        />
      ))}
    </ChoiceGroup>
  );
}

// ── How much they know ────────────────────────────────────────────────────

const LEVEL_ART: Record<string, ArtName> = { new: 'seed', some: 'sprout', lots: 'tree' };

export function ExperienceStep({ selected, onPick, topic }: { selected?: string; onPick: (id: string) => void; topic?: string }) {
  return (
    <ChoiceGroup label={`How much ${topic ?? 'of it'} do you know?`}>
      {EXPERIENCE_OPTIONS.map((o, i) => (
        <Choice
          key={o.id}
          index={i}
          selected={selected === o.id}
          onSelect={() => onPick(o.id)}
          label={o.label}
          sub={o.sub}
          art={LEVEL_ART[o.id]}
          artSize={56}
        />
      ))}
    </ChoiceGroup>
  );
}

// ── Daily goal ────────────────────────────────────────────────────────────

const PACE_ART: Record<string, ArtName> = { '5': 'pace5', '10': 'pace10', '20': 'pace20', '30': 'pace30' };

export function DailyStep({ selected, onPick }: { selected?: string; onPick: (id: string) => void }) {
  return (
    <ChoiceGroup label="Daily learning goal">
      {DAILY_OPTIONS.map((d, i) => (
        <Choice
          key={d.id}
          index={i}
          selected={selected === d.id}
          onSelect={() => onPick(d.id)}
          label={d.label}
          meta={`${d.minutes} min / day`}
          art={PACE_ART[d.id]}
          // Recommended, not "most popular": popularity hasn't been measured.
          badge={d.id === '10' ? 'Recommended' : undefined}
        />
      ))}
    </ChoiceGroup>
  );
}

// ── When to remind ────────────────────────────────────────────────────────

const TIME_ART: Record<string, ArtName> = { morning: 'sunrise', afternoon: 'sun', evening: 'moon', 'no-preference': 'clock' };

export function TimeStep(props: { selected?: string; onPick: (id: string) => void; name?: string; courseTitle?: string; minutes: number }) {
  const t = TIME_OPTIONS.find((o) => o.id === props.selected);
  const at = t ? new Date(2000, 0, 1, t.hour).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : null;
  return (
    <div className="flex flex-col gap-5">
      <ChoiceGroup label="When should Tey remind you?" layout="grid2">
        {TIME_OPTIONS.map((o, i) => (
          <Choice
            key={o.id}
            index={i}
            layout="tile"
            selected={props.selected === o.id}
            onSelect={() => props.onPick(o.id)}
            label={o.label}
            sub={o.hint}
            art={TIME_ART[o.id]}
          />
        ))}
      </ChoiceGroup>
      {t && (
        <div aria-label="What your reminder will look like">
          <p className="mb-2 text-[13px] font-extrabold uppercase tracking-wider text-[var(--text-muted)]">Your reminder</p>
          <div className={css.note}>
            <span className={css.noteIcon}>
              <Image src="/Icons/icon-192.png" alt="" width={40} height={40} />
            </span>
            <span className="flex-1 min-w-0">
              <span className={css.noteHead}>
                <span>Teyro</span>
                <span>{t.id === 'no-preference' ? 'at your time' : at}</span>
              </span>
              <span className={`${css.noteTitle} block`}>
                {props.name ? `${props.name}, ${props.minutes} minutes?` : `${props.minutes} minutes today?`}
              </span>
              <span className={`${css.noteBody} block`}>
                {props.courseTitle ? `${props.courseTitle} is waiting. Your streak too.` : 'Your next lesson is waiting.'}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
