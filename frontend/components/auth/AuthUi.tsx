'use client';

/**
 * Shared pieces for the student auth screens (welcome / log in / sign up /
 * reset), Duolingo-style: a grouped field box, chunky 3D buttons, a white
 * Google button, and an error line that shakes. Styles in Auth.module.css.
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import styles from './Auth.module.css';

export { styles as authStyles };

/** The grouped box Duolingo stacks its inputs in. */
export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className={styles.fieldGroup}>{children}</div>;
}

export function Field({
  label,
  trailing,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; trailing?: React.ReactNode }) {
  return (
    <label className={styles.field}>
      <span className="sr-only">{label}</span>
      <input className={styles.input} placeholder={label} {...input} />
      {trailing}
    </label>
  );
}

export function PrimaryButton({
  children,
  busy = false,
  tone = 'blue',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { busy?: boolean; tone?: 'blue' | 'green' }) {
  return (
    <button
      {...rest}
      className={`${styles.primary} ${tone === 'green' ? styles.primaryGreen : ''} ${rest.className ?? ''}`}
      disabled={busy || rest.disabled}
      aria-busy={busy}
    >
      {busy && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}

export function SecondaryButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={`${styles.secondary} ${rest.className ?? ''}`}>
      {children}
    </button>
  );
}

export function GoogleButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <SecondaryButton
      type="button"
      disabled={disabled}
      onClick={() => {
        playSound('navTap', 2);
        playHaptic('light', false);
        onClick();
      }}
    >
      <FaGoogle className={styles.google} aria-hidden="true" />
      Continue with Google
    </SecondaryButton>
  );
}

export function Divider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <span />
      OR
      <span />
    </div>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p key={message} className={styles.error} role="alert">
      <AlertCircle size={18} strokeWidth={2.75} aria-hidden="true" />
      {message}
    </p>
  );
}
