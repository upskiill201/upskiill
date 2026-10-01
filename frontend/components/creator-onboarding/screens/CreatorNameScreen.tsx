'use client';

/**
 * "What should learners call you?" — the creator's display name. Prefilled
 * from the account when signed in; lands in the answers and becomes the
 * account name at sign-up.
 */

import { useEffect, useRef, useState } from 'react';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { NAME_MAX_LENGTH, isValidName } from '@/lib/creator-onboarding/steps';

export function CreatorNameScreen({
  value: saved,
  onChange,
  onCommit,
}: {
  value: string | undefined;
  /** Every valid keystroke (saves the answer). */
  onChange: (name: string) => void;
  /** Blur with a valid name (Tey reacts). */
  onCommit: (name: string) => void;
}) {
  const [value, setValue] = useState(saved ?? '');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // A signed-in creator's name can arrive after mount.
  useEffect(() => {
    if (saved && !value) setValue(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved]);

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const invalid = touched && !isValidName(value);

  return (
    <div className="w-full md:max-w-[520px]">
      <label htmlFor="creator-name" className="sr-only">
        Your name as learners will see it
      </label>
      <input
        ref={inputRef}
        id="creator-name"
        type="text"
        value={value}
        maxLength={NAME_MAX_LENGTH}
        autoComplete="name"
        enterKeyHint="done"
        aria-invalid={invalid}
        aria-describedby={invalid ? 'creator-name-error' : undefined}
        placeholder="Your name"
        onChange={(e) => {
          setValue(e.target.value);
          const trimmed = e.target.value.trim();
          if (isValidName(trimmed)) onChange(trimmed);
        }}
        onFocus={(e) => e.currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' })}
        onBlur={() => {
          setTouched(true);
          const trimmed = value.trim();
          if (isValidName(trimmed)) onCommit(trimmed);
          else if (!trimmed) playOnboardingCue('validationError');
        }}
        className={[
          'w-full h-[60px] md:h-[64px] rounded-[16px] border-2 px-5',
          'text-[18px] md:text-[20px] font-bold text-ink placeholder:text-[var(--text-muted)] placeholder:font-semibold',
          'transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/20',
          invalid
            ? 'border-[var(--error-red)] bg-[var(--bg-card)]'
            : 'border-[var(--border)] bg-[var(--bg-section)] focus:bg-[var(--bg-card)] focus:border-brand',
        ].join(' ')}
        style={{ fontFamily: 'var(--font-jakarta)' }}
      />
      {invalid && (
        <p id="creator-name-error" role="alert" className="mt-2 text-[14px] font-semibold text-[var(--error-red)]">
          Learners need something to call you.
        </p>
      )}
      <p className="mt-3 text-[13.5px] md:text-[14px] leading-snug text-ink-soft">
        Use the name you teach under. You can change it later.
      </p>
    </div>
  );
}

export default CreatorNameScreen;
