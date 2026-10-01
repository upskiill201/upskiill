'use client';

/**
 * A pick-one or pick-many creator question, built on the learner flow's
 * OptionCard so both onboardings look and feel the same. The answer is
 * recorded before any sound or haptic runs, so failing audio can never
 * swallow a selection.
 */

import { OptionCard, OptionGroup } from '@/components/onboarding/OptionCard';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { playHaptic } from '@/lib/haptics';
import { creatorIcon } from '../creatorIcons';

export interface CreatorQuestionOption {
  id: string;
  label: string;
  description?: string;
  secondary?: boolean;
}

export interface CreatorQuestionProps {
  /** Icon namespace (see creatorIcons). */
  question: string;
  legend: string;
  options: CreatorQuestionOption[];
  selected: string[];
  multi?: boolean;
  onToggle: (id: string) => void;
}

export function CreatorQuestion({ question, legend, options, selected, multi = false, onToggle }: CreatorQuestionProps) {
  const primary = options.filter((o) => !o.secondary);
  const secondary = options.filter((o) => o.secondary);

  const handle = (id: string) => {
    onToggle(id);
    try {
      playHaptic('selection', false);
      playOnboardingCue('optionSelect');
    } catch {
      // The card's selected state is the real feedback.
    }
  };

  const render = (option: CreatorQuestionOption) => {
    const art = creatorIcon(question, option.id);
    return (
      <OptionCard
        key={option.id}
        id={option.id}
        label={option.label}
        description={option.description}
        secondary={option.secondary}
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
      <OptionGroup legend={legend} multi={multi}>
        {primary.map(render)}
      </OptionGroup>
      {secondary.length > 0 && (
        <div className="mt-3 md:max-w-[calc(50%-6px)]">
          <OptionGroup legend={`${legend} (other)`} multi={multi}>
            {secondary.map(render)}
          </OptionGroup>
        </div>
      )}
    </div>
  );
}

export default CreatorQuestion;
