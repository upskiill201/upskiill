'use client';

/**
 * CategoryScreen — Coding or AI. The primary branch, and the first
 * high-energy moment in the flow.
 *
 * Two deliberately large cards rather than a list: this single answer decides
 * the entire remaining experience, so it should not look like the same
 * question as "what time of day do you learn".
 *
 * The scope line under the cards is required, not decoration. The brief is
 * explicit that onboarding must not imply every skill is already available at
 * launch, and two cards with no context would read as "here are the first
 * two of many".
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CATEGORY_LIST } from '@/lib/onboarding/catalog';
import type { LearningCategory } from '@/lib/onboarding/types';
import { playCategoryCue } from '@/lib/audio/onboardingAudio';
import { trackCategorySelected } from '@/lib/onboarding/analytics';
import { playHaptic } from '@/lib/haptics';
import { OPTION_ICONS } from './optionIcons';
import type { ScreenProps } from './types';

export function CategoryScreen({ answers, saveAnswer, react }: ScreenProps) {
  const reducedMotion = useReducedMotion();
  const selected = answers.category;

  const choose = (id: LearningCategory) => {
    // Answer first, then reaction, then decoration — so neither a failing
    // sound nor a failing haptic can cost the learner their selection.
    saveAnswer('category', id);
    trackCategorySelected(id);
    react({ category: id });
    try {
      playHaptic('medium');
      playCategoryCue(id);
    } catch {
      // Silent: the card's selected state is the real feedback.
    }
  };

  return (
    <div className="w-full">
      <fieldset>
        <legend className="sr-only">What do you want to learn first?</legend>
        <div
          role="radiogroup"
          aria-label="Learning category"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
        >
          {CATEGORY_LIST.map((category) => {
            const { Icon, tone } = OPTION_ICONS[category.id];
            const isSelected = selected === category.id;
            const edge = isSelected ? tone : 'var(--border)';

            return (
              <motion.button
                key={category.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => choose(category.id)}
                whileTap={reducedMotion ? undefined : { y: 4, boxShadow: `0 0px 0 ${edge}` }}
                transition={{ type: 'spring', stiffness: 600, damping: 30 }}
                className={[
                  'relative w-full rounded-[20px] border-2 text-left cursor-pointer',
                  'flex items-center gap-4 p-4',
                  // Desktop: tall tiles side by side, so the choice reads as
                  // THE fork in the road rather than two more list rows.
                  'md:flex-col md:items-start md:gap-5 md:p-6 md:min-h-[250px]',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30',
                ].join(' ')}
                style={{
                  borderColor: edge,
                  backgroundColor: isSelected
                    ? `color-mix(in srgb, ${tone} 7%, white)`
                    : 'white',
                  boxShadow: `0 4px 0 ${edge}`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 w-14 h-14 md:w-[72px] md:h-[72px] rounded-[16px] flex items-center justify-center"
                  style={{ color: tone, backgroundColor: `color-mix(in srgb, ${tone} 13%, white)` }}
                >
                  <Icon className="w-7 h-7 md:w-9 md:h-9 stroke-[2.25]" />
                </span>

                <span className="flex-1 min-w-0">
                  <span
                    className="block text-[20px] md:text-[26px] font-extrabold text-ink leading-tight"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    {category.label}
                  </span>
                  <span className="block mt-1 md:mt-2 text-[14px] md:text-[16px] leading-snug text-ink-soft">
                    {category.description}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors md:absolute md:top-5 md:right-5"
                  style={{
                    backgroundColor: isSelected ? tone : 'white',
                    borderColor: isSelected ? tone : 'var(--border-strong)',
                  }}
                >
                  {isSelected && <Check className="w-4 h-4 text-white stroke-[3.5]" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-4 text-center text-[13px] md:text-[14px] leading-snug text-ink-soft">
        These are the two tracks Teyro is built around right now. More are on the way.
      </p>
    </div>
  );
}


export default CategoryScreen;
