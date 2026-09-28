'use client';

/**
 * NameScreen — "what should I call you?"
 *
 * This is a DISPLAY name, not an identity change. If the account already has
 * a name we pre-fill it and let the learner confirm or edit; we never
 * overwrite the verified account identity from here, and the value lands in
 * onboarding answers rather than being PATCHed onto the auth record.
 *
 * Mobile keyboard behaviour is the fiddly part: on a 100dvh layout an open
 * keyboard can push the Continue button off screen. The input scrolls itself
 * into view on focus, and the shell's footer sits inside the scrollable
 * region so it follows.
 */

import { useEffect, useRef, useState } from 'react';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { NAME_MAX_LENGTH, isValidName } from '@/lib/onboarding/steps';
import type { ScreenProps } from './types';

export function NameScreen({ answers, saveAnswer, react }: ScreenProps) {
  const [value, setValue] = useState(answers.name ?? '');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus is right here: the screen exists to collect one short string,
  // and the learner arrived by tapping Continue, so focus is expected.
  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const commit = (next: string) => {
    setValue(next);
    const trimmed = next.trim();
    if (isValidName(trimmed)) {
      saveAnswer('name', trimmed);
    }
  };

  const invalid = touched && !isValidName(value);

  return (
    <div className="w-full md:max-w-[520px]">
      <label htmlFor="onboarding-name" className="sr-only">
        Your preferred name
      </label>
      <input
        ref={inputRef}
        id="onboarding-name"
        type="text"
        value={value}
        maxLength={NAME_MAX_LENGTH}
        autoComplete="given-name"
        enterKeyHint="done"
        aria-invalid={invalid}
        aria-describedby={invalid ? 'name-error' : undefined}
        placeholder="Your first name"
        onChange={(e) => commit(e.target.value)}
        onFocus={(e) => e.currentTarget.scrollIntoView({ block: 'center', behavior: 'smooth' })}
        onBlur={() => {
          setTouched(true);
          const trimmed = value.trim();
          if (isValidName(trimmed)) {
            react({ name: trimmed });
          } else if (trimmed.length === 0) {
            playOnboardingCue('validationError');
          }
        }}
        className={[
          'w-full h-[60px] md:h-[64px] rounded-[16px] border-2 px-5',
          'text-[18px] md:text-[20px] font-bold text-ink placeholder:text-[var(--text-muted)] placeholder:font-semibold',
          'transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/20',
          invalid
            ? 'border-[var(--error-red)] bg-white'
            : 'border-[var(--border)] bg-slate-50 focus:bg-white focus:border-brand',
        ].join(' ')}
        style={{ fontFamily: 'var(--font-jakarta)' }}
      />

      {invalid && (
        // role="alert" so the error is announced, not just coloured red.
        <p id="name-error" role="alert" className="mt-2 text-[14px] font-semibold text-[var(--error-red)]">
          I need something to call you. Any name works!
        </p>
      )}

      <p className="mt-3 text-[13.5px] md:text-[14px] leading-snug text-ink-soft">
        It&apos;s just what I&apos;ll call you. You can change it later.
      </p>
    </div>
  );
}

export default NameScreen;
