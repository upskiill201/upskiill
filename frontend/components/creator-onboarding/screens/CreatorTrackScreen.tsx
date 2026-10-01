'use client';

/**
 * Coding or AI — what the creator will teach. Two big 3D cards like the
 * learner's category step, because this answer decides the topics, the plan
 * and the first course's category.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { CREATOR_TRACK_LIST, type CreatorTrack } from '@/lib/creator/categories';
import { playCategoryCue } from '@/lib/audio/onboardingAudio';
import { playHaptic } from '@/lib/haptics';
import { creatorIcon } from '../creatorIcons';

export function CreatorTrackScreen({
  selected,
  onSelect,
}: {
  selected: CreatorTrack | undefined;
  onSelect: (track: CreatorTrack) => void;
}) {
  const reduce = useReducedMotion();

  const choose = (id: CreatorTrack) => {
    onSelect(id);
    try {
      playHaptic('medium', false);
      playCategoryCue(id);
    } catch {
      // Selection already recorded.
    }
  };

  return (
    <div className="w-full">
      <fieldset>
        <legend className="sr-only">What will you teach?</legend>
        <div role="radiogroup" aria-label="Teaching track" className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {CREATOR_TRACK_LIST.map((track) => {
            const art = creatorIcon('track', track.id);
            const tone = art?.tone ?? 'var(--color-brand)';
            const isSelected = selected === track.id;
            const edge = isSelected ? tone : 'var(--border)';
            const Icon = art?.Icon;

            return (
              <motion.button
                key={track.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => choose(track.id)}
                whileTap={reduce ? undefined : { y: 4, boxShadow: `0 0px 0 ${edge}` }}
                transition={{ type: 'spring', stiffness: 600, damping: 30 }}
                className={[
                  'relative w-full rounded-[20px] border-2 text-left cursor-pointer',
                  'flex items-center gap-4 p-4',
                  'md:flex-col md:items-start md:gap-5 md:p-6 md:min-h-[230px]',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30',
                ].join(' ')}
                style={{
                  borderColor: edge,
                  backgroundColor: isSelected ? `color-mix(in srgb, ${tone} 7%, var(--bg-card))` : 'var(--bg-card)',
                  boxShadow: `0 4px 0 ${edge}`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 w-14 h-14 md:w-[72px] md:h-[72px] rounded-[16px] flex items-center justify-center"
                  style={{ color: tone, backgroundColor: `color-mix(in srgb, ${tone} 13%, var(--bg-card))` }}
                >
                  {Icon && <Icon className="w-7 h-7 md:w-9 md:h-9 stroke-[2.25]" />}
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className="block text-[20px] md:text-[26px] font-extrabold text-ink leading-tight"
                    style={{ fontFamily: 'var(--font-jakarta)' }}
                  >
                    {track.label}
                  </span>
                  <span className="block mt-1 md:mt-2 text-[14px] md:text-[16px] leading-snug text-ink-soft">
                    {track.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors md:absolute md:top-5 md:right-5"
                  style={{
                    backgroundColor: isSelected ? tone : 'var(--bg-card)',
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
        These are the two tracks learners pick on Teyro right now. More are on the way.
      </p>
    </div>
  );
}

export default CreatorTrackScreen;
