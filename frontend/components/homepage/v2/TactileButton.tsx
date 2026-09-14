'use client';

/**
 * Duolingo/Coddy-style pressable button: a solid fill plus a darker
 * "bottom edge" strip that reads as physical depth, which compresses flat
 * on press so the button visually shifts down into its own base. Rounded
 * rectangle (rounded-btn, the same radius Hero's own tactile CTA uses), not
 * a pill — matches the rest of the marketing site's button shape rather
 * than introducing a second one. Shared so any marketing CTA can opt into
 * this feel — FinalCta uses it today; Hero's "START LEARNING" button
 * hand-rolls a similar border-b-4 version and is a candidate to migrate
 * onto this component later rather than staying a second, slightly
 * different implementation of the same idea.
 */

import React from 'react';
import Link from 'next/link';

type TactileButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function TactileButton({ href, children, className = '' }: TactileButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex h-14 items-center justify-center rounded-btn bg-brand px-9 text-base font-extrabold tracking-wide text-white shadow-[0_5px_0_var(--color-brand-dark)] transition-transform duration-100 ease-out hover:brightness-105 active:translate-y-[5px] active:shadow-[0_0px_0_var(--color-brand-dark)] ${className}`}
    >
      {children}
    </Link>
  );
}
