'use client';

/**
 * QuestionScreen — the generic option-list question.
 *
 * Seven of the fifteen steps are "pick one or more from a list": goals,
 * interests, experience, prior attempt, barriers, commitment, preferred time.
 * They share this component rather than each owning a near-copy of the same
 * markup, which is what let the old flow's steps drift apart visually.
 *
 * What stays per-step lives in data, not code: the options come from
 * `catalog.ts`, the copy from the dialogue engine, and the selection rules
 * from `branching.ts`.
 */

import { OptionCard, OptionGroup } from '../OptionCard';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { playHaptic } from '@/lib/haptics';
import { OPTION_ICONS } from './optionIcons';

export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  secondary?: boolean;
  badge?: string;
}

export interface QuestionScreenProps {
  /** Accessible name for the group; usually the step's prompt. */
  legend: string;
  options: QuestionOption[];
  selected: string[];
  multi?: boolean;
  onToggle: (id: string) => void;
  /** Extra note under the list, e.g. the launch-scope disclaimer. */
  note?: string;
}

export function QuestionScreen({
  legend,
  options,
  selected,
  multi = false,
  onToggle,
  note,
}: QuestionScreenProps) {
  const primary = options.filter((o) => !o.secondary);
  const secondary = options.filter((o) => o.secondary);

  const handle = (id: string) => {
    // Record the answer FIRST. Feedback is decoration, and a throwing
    // AudioContext or haptics shim must never be able to swallow a selection.
    onToggle(id);
    try {
      playHaptic('selection');
      playOnboardingCue('optionSelect');
    } catch {
      // Silent: the learner already sees the card change state.
    }
  };

  // Long lists of short, description-less labels (goals, barriers) go
  // two-up on desktop: seven single-column rows is a scroll on a laptop.
  const columns = primary.length >= 5 && primary.every((o) => !o.description) ? 2 : 1;

  const render = (option: QuestionOption) => {
    const art = OPTION_ICONS[option.id];
    return (
      <OptionCard
        key={option.id}
        id={option.id}
        label={option.label}
        description={option.description}
        secondary={option.secondary}
        badge={option.badge}
        icon={art ? <art.Icon /> : undefined}
        tone={art?.tone}
        multi={multi}
        selected={selected.includes(option.id)}
        onSelect={() => handle(option.id)}
      />
    );
  };

  return (
    <div className="w-full pb-2">
      <OptionGroup legend={legend} multi={multi} columns={columns}>
        {primary.map(render)}
      </OptionGroup>

      {secondary.length > 0 && (
        // Rendered apart and quieter: "I'm still figuring it out" is a valid
        // answer, not one of the headline choices.
        <div className="mt-3 md:max-w-[calc(50%-6px)]">
          <OptionGroup legend={`${legend} — other`} multi={multi}>
            {secondary.map(render)}
          </OptionGroup>
        </div>
      )}

      {note && (
        <p className="mt-3.5 text-[13px] md:text-[14px] leading-snug text-ink-soft text-center">
          {note}
        </p>
      )}
    </div>
  );
}

export default QuestionScreen;
