'use client';

/**
 * CertificateNameSheet — where a learner tells us the real name to print on
 * their certificates, before the first one is issued.
 *
 * Four moments, read from GET /certificates/name:
 * - claim:   just earned a certificate, no name confirmed yet
 * - confirm: holds certificates issued before this step existed (printed with
 *            the profile name) and hasn't confirmed it
 * - edit:    confirmed, and the one free correction is still open
 * - locked:  confirmed and corrected (or 7 days passed) — changes go via support
 *
 * Saving updates every certificate the learner holds and issues any waiting.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Award, Check, Loader2, LockKeyhole, ShieldCheck, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { playHaptic } from '@/lib/haptics';
import {
  CERTIFICATE_NAME_MAX,
  certificateNameProblem,
  normaliseCertificateName,
  saveCertificateName,
  type CertificateNameState,
} from '@/lib/certificates/name';

type Mode = 'claim' | 'confirm' | 'edit' | 'locked';

export function certificateNameMode(state: CertificateNameState): Mode {
  if (state.confirmedAt) return state.canEdit ? 'edit' : 'locked';
  return state.held > 0 && state.earnedUnclaimed === 0 ? 'confirm' : 'claim';
}

const COPY: Record<Mode, { title: string; button: string }> = {
  claim: { title: 'Claim your certificate', button: 'Claim my certificate' },
  confirm: { title: 'Is this your real name?', button: 'Confirm my name' },
  edit: { title: 'Correct your certificate name', button: 'Save correction' },
  locked: { title: 'Your certificate name', button: '' },
};

function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  });
}

/** A live, simplified copy of the real certificate, so the learner sees their name in place. */
function CertificatePreview({ name, courseTitle }: { name: string; courseTitle?: string }) {
  const shown = name || 'Your Name';
  const size = shown.length > 24 ? 'text-[19px] sm:text-[22px]' : shown.length > 16 ? 'text-[23px] sm:text-[27px]' : 'text-[28px] sm:text-[32px]';
  return (
    <div
      aria-hidden
      className="relative aspect-[1600/1131] w-full rounded-[14px] bg-[linear-gradient(135deg,var(--color-brand-deep),var(--ink-fixed))] p-[2.5%]"
    >
      <div className="relative flex h-full flex-col items-center justify-center rounded-[10px] bg-[color-mix(in_srgb,var(--warning)_5%,white)] px-4 text-center">
        <div className="pointer-events-none absolute inset-[3.5%] rounded-[6px] border-2 border-[var(--warning)]" />
        <p className="font-[family-name:var(--font-jakarta)] text-[13px] font-extrabold tracking-[0.42em] text-[var(--color-brand-deep)] sm:text-[15px]">
          CERTIFICATE
        </p>
        <span className="mt-1 rounded-[3px] bg-[var(--warning)] px-3 py-[2px] text-[8px] font-extrabold tracking-[0.3em] text-white sm:text-[9px]">
          OF ACHIEVEMENT
        </span>
        <p className="mt-2 text-[9px] font-bold text-[var(--text-muted)] sm:text-[10px]">This is proudly presented to</p>
        <p
          className={`max-w-full truncate font-[family-name:var(--font-celebration)] font-extrabold leading-[1.15] ${size} ${name ? 'text-[var(--ink-fixed)]' : 'text-[color-mix(in_srgb,var(--ink-fixed)_25%,transparent)]'}`}
        >
          {shown}
        </p>
        <div className="mt-[2px] h-[2px] w-[46%] rounded-full bg-[linear-gradient(90deg,transparent,var(--warning),transparent)]" />
        {courseTitle && (
          <>
            <p className="mt-2 text-[8px] font-bold text-[var(--text-muted)] sm:text-[9px]">for completing every lesson of</p>
            <p className="line-clamp-1 max-w-full text-[12px] font-extrabold text-[var(--color-brand)] sm:text-[14px]">{courseTitle}</p>
          </>
        )}
        <div className="absolute bottom-[7%] right-[6%] flex h-[16%] aspect-square items-center justify-center rounded-full border-[3px] border-[var(--warning)] bg-[linear-gradient(180deg,var(--color-brand-deep),var(--ink-fixed))]">
          <Award className="h-1/2 w-1/2 text-[var(--warning)]" strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
}

export default function CertificateNameSheet({
  state,
  courseTitle,
  onClose,
  onSaved,
  save = saveCertificateName,
}: {
  state: CertificateNameState;
  /** The course just finished, shown on the preview when claiming. */
  courseTitle?: string;
  onClose: () => void;
  onSaved: (next: CertificateNameState) => void;
  /** Injected by the dev bench; defaults to PUT /certificates/name. */
  save?: (name: string) => Promise<CertificateNameState>;
}) {
  const mode = certificateNameMode(state);
  const reducedMotion = useReducedMotion();
  const inputId = useId();
  const hintId = useId();
  const [value, setValue] = useState(() => {
    const start = normaliseCertificateName(state.name ?? state.suggested ?? '');
    return certificateNameProblem(start) ? '' : start;
  });
  const [agreed, setAgreed] = useState(false);
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // The portal leaves the (app) layout, which is where --font-celebration (Baloo 2) is defined.
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [celebrationFont, setCelebrationFont] = useState('');

  useEffect(() => {
    if (anchorRef.current) setCelebrationFont(getComputedStyle(anchorRef.current).getPropertyValue('--font-celebration').trim());
  }, []);

  const name = normaliseCertificateName(value);
  const problem = certificateNameProblem(name);
  const unchanged = mode === 'edit' && name === state.name;
  const ready = !problem && agreed && !unchanged && !busy;

  useEffect(() => {
    if (mode !== 'locked') inputRef.current?.focus({ preventScroll: true });
  }, [mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!ready) return;
    setBusy(true);
    setError(null);
    try {
      const next = await save(name);
      playHaptic('success', false);
      onSaved(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Couldn’t save your name. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const intro: Record<Mode, React.ReactNode> = {
    claim: courseTitle ? (
      <>
        You finished <strong className="text-[var(--text-primary)]">{courseTitle}</strong>. Tell us the name to print on your certificate.
      </>
    ) : (
      'You’ve earned a certificate. Tell us the name to print on it.'
    ),
    confirm: (
      <>
        Your certificates show <strong className="text-[var(--text-primary)]">“{state.suggested}”</strong>. Confirm it or fix it so employers see your real
        name.
      </>
    ),
    edit: 'You can correct your name once. After that, changes go through support.',
    locked: 'This is the name on all your certificates.',
  };

  const anchor = <span ref={anchorRef} hidden />;
  if (typeof document === 'undefined') return anchor;

  return (
    <>
      {anchor}
      {createPortal(
        <AnimatePresence>
          <motion.div
            key="cert-name-backdrop"
            style={
              celebrationFont
                ? ({
                    '--font-celebration': celebrationFont,
                  } as React.CSSProperties)
                : undefined
            }
            className="fixed inset-0 z-[100300] flex items-end justify-center bg-[color-mix(in_srgb,var(--ink-fixed)_55%,transparent)] sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${inputId}-title`}
              onClick={(e) => e.stopPropagation()}
              initial={reducedMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              className="relative flex max-h-[100dvh] w-full max-w-[480px] flex-col overflow-y-auto rounded-t-[24px] bg-[var(--bg-card)] px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 text-[var(--text-primary)] sm:rounded-[24px] sm:px-6 sm:pb-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)]">
                  {mode === 'locked' ? <LockKeyhole size={22} strokeWidth={2.6} /> : <Award size={24} strokeWidth={2.6} />}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id={`${inputId}-title`} className="text-[20px] font-extrabold leading-tight">
                    {COPY[mode].title}
                  </h2>
                  <p className="mt-1 text-[14px] font-semibold leading-snug text-[var(--text-secondary)]">{intro[mode]}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-section)]"
                >
                  <X size={20} strokeWidth={2.6} />
                </button>
              </div>

              <div className="mt-4">
                <CertificatePreview name={mode === 'locked' ? (state.name ?? '') : name} courseTitle={mode === 'claim' ? courseTitle : undefined} />
              </div>

              {mode === 'locked' ? (
                <div className="mt-4 rounded-[12px] border border-[var(--border)] bg-[var(--bg-section)] p-4">
                  <p className="flex items-center gap-2 text-[14px] font-bold text-[var(--text-secondary)]">
                    <ShieldCheck size={18} className="text-[var(--success-green)]" strokeWidth={2.6} />
                    Confirmed
                    {state.confirmedAt ? ` on ${formatDay(state.confirmedAt)}` : ''}
                  </p>
                  <p className="mt-2 text-[14px] font-semibold text-[var(--text-secondary)]">
                    Spelled wrong, or your name changed? Our team can update it on every certificate.
                  </p>
                  <Link
                    href="/dashboard/help"
                    className="mt-3 inline-flex h-11 items-center justify-center rounded-[10px] border-2 border-[var(--border-strong)] px-4 text-[15px] font-extrabold text-[var(--text-primary)] transition-transform active:scale-[0.98]"
                  >
                    Contact support
                  </Link>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="mt-4 flex flex-col">
                  <label htmlFor={inputId} className="text-[14px] font-extrabold">
                    Full name
                  </label>
                  <input
                    ref={inputRef}
                    id={inputId}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setError(null);
                    }}
                    onBlur={() => {
                      setTouched(true);
                      setValue(normaliseCertificateName(value));
                    }}
                    maxLength={CERTIFICATE_NAME_MAX + 10}
                    autoComplete="name"
                    autoCapitalize="words"
                    spellCheck={false}
                    aria-invalid={touched && Boolean(problem)}
                    aria-describedby={hintId}
                    placeholder="First name and surname"
                    className={`mt-2 h-12 rounded-[10px] border-2 bg-[var(--bg-card)] px-4 text-[17px] font-bold outline-none transition-colors placeholder:font-semibold placeholder:text-[var(--text-muted)] focus:border-[var(--color-brand)] ${touched && problem ? 'border-[var(--error-red)]' : 'border-[var(--border-strong)]'}`}
                  />
                  <p
                    id={hintId}
                    className={`mt-2 text-[13px] font-semibold ${touched && problem ? 'text-[var(--error-red)]' : 'text-[var(--text-secondary)]'}`}
                  >
                    {touched && problem ? problem : 'Use your name exactly as it appears on your ID. Employers may check it.'}
                  </p>

                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[12px] border-2 border-[var(--border)] p-3 transition-colors has-[:checked]:border-[var(--success-green)] has-[:checked]:bg-[color-mix(in_srgb,var(--success-green)_8%,transparent)]">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="peer sr-only" />
                    <span className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] border-2 border-[var(--border-strong)] text-white transition-colors peer-checked:border-[var(--success-green)] peer-checked:bg-[var(--success-green)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand)]">
                      {agreed && <Check size={16} strokeWidth={4} />}
                    </span>
                    <span className="text-[14px] font-bold leading-snug">I confirm this is my real name.</span>
                  </label>

                  <p className="mt-3 text-[13px] font-semibold text-[var(--text-muted)]">
                    {mode === 'edit' && state.editableUntil
                      ? `This is your one correction, open until ${formatDay(state.editableUntil)}.`
                      : 'You can correct it once within 7 days. After that, changes go through support.'}
                    {state.held > 0 && mode !== 'claim' ? ' It updates every certificate you hold.' : ''}
                  </p>

                  {error && (
                    <p
                      role="alert"
                      className="mt-3 rounded-[10px] bg-[color-mix(in_srgb,var(--error-red)_10%,transparent)] px-3 py-2 text-[14px] font-bold text-[var(--error-red)]"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!ready}
                    className="mt-4 inline-flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-[var(--color-brand)] text-[16px] font-extrabold uppercase tracking-[0.04em] text-[var(--text-on-blue)] shadow-[0_4px_0_var(--color-brand-deep)] transition-[transform,box-shadow,opacity] active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-45 disabled:active:translate-y-0"
                  >
                    {busy ? <Loader2 size={20} className="animate-spin" /> : <Award size={20} strokeWidth={2.6} />}
                    {COPY[mode].button}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
