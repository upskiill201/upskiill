'use client';

/**
 * ReviewScreen — "fix anything I got wrong".
 *
 * Every row has an Edit action that jumps back to the step that owns that
 * answer. Editing preserves everything else, and the jump back forward
 * re-runs the invalidation rules in `useOnboardingSession.saveAnswer` — so
 * switching Coding to AI from here drops the coding interests, re-resolves
 * every downstream dialogue beat and regenerates the path summary, exactly as
 * it would if the learner had walked back to step 3 by hand.
 *
 * Rows show catalog LABELS only. No internal ids, no field names, nothing
 * that leaks the data model at the learner.
 */

import { Pencil } from 'lucide-react';
import {
  categoryLabel,
  experienceLabel,
  goalLabel,
  interestLabel,
  preferredTimeLabel,
} from '@/lib/onboarding/catalog';
import { commitmentLabel } from '@/lib/onboarding/commitment';
import { stepById } from '@/lib/onboarding/steps';
import type { StepId } from '@/lib/onboarding/dialogue/types';
import { playHaptic } from '@/lib/haptics';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import type { ScreenProps } from './types';

interface Row {
  label: string;
  value: string;
  step: StepId;
}

export function ReviewScreen({ answers, goToStep }: ScreenProps) {
  const interests = (answers.interests ?? [])
    .map((id) => interestLabel(answers.category, id))
    .filter(Boolean)
    .join(', ');

  const goals = (answers.goals ?? []).map(goalLabel).filter(Boolean).join(', ');

  const rows: Row[] = ([
    { label: 'Name', value: answers.name ?? '', step: 'name' },
    { label: 'Learning', value: categoryLabel(answers.category), step: 'category' },
    { label: 'Focus', value: interests, step: 'interests' },
    { label: 'Goals', value: goals, step: 'goals' },
    { label: 'Experience', value: experienceLabel(answers.experienceLevel), step: 'experience' },
    { label: 'Daily goal', value: commitmentLabel(answers.dailyCommitment), step: 'commitment' },
    { label: 'Best time', value: preferredTimeLabel(answers.preferredTime), step: 'preferred-time' },
  ] satisfies Row[]).filter((row) => row.value);

  const edit = (stepId: StepId) => {
    const step = stepById(stepId);
    if (!step) return;
    playHaptic('light');
    playOnboardingCue('back');
    goToStep(step.number);
  };

  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center gap-3 rounded-[16px] border-2 border-[var(--border)] bg-white px-4 py-3"
            style={{ boxShadow: '0 3px 0 var(--border)' }}
          >
            <span className="flex-1 min-w-0">
              <span className="block text-[12px] font-extrabold uppercase tracking-wide text-[var(--text-muted)]">
                {row.label}
              </span>
              <span className="block mt-0.5 text-[15px] md:text-[16px] font-bold text-ink break-words">
                {row.value}
              </span>
            </span>

            <button
              type="button"
              onClick={() => edit(row.step)}
              // The visible word is "Edit"; the accessible name says what is
              // being edited, so a screen reader doesn't hear seven identical
              // buttons.
              aria-label={`Edit ${row.label.toLowerCase()}`}
              className={[
                'shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 cursor-pointer',
                'text-[13px] font-extrabold uppercase tracking-wide text-brand hover:bg-band transition-colors',
                'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30',
              ].join(' ')}
            >
              <Pencil className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewScreen;
