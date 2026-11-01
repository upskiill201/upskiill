'use client';

/**
 * Dev-only bench for the certificate name step: the sheet in each of its
 * moments, with a fake save so nothing touches the API. Gated on NODE_ENV
 * like /dev/share-cards.
 */

import { useState } from 'react';
import CertificateNameSheet from '@/components/certificates/CertificateNameSheet';
import type { CertificateNameState } from '@/lib/certificates/name';

const DAY = 86_400_000;
const now = Date.now();

const STATES: Record<string, CertificateNameState> = {
  claim: {
    name: null,
    suggested: 'codeking99',
    confirmedAt: null,
    editableUntil: null,
    canEdit: true,
    held: 0,
    earnedUnclaimed: 1,
  },
  confirm: {
    name: null,
    suggested: 'Ada O.',
    confirmedAt: null,
    editableUntil: null,
    canEdit: true,
    held: 2,
    earnedUnclaimed: 0,
  },
  edit: {
    name: 'Ada Okafor',
    suggested: 'Ada Okafor',
    confirmedAt: new Date(now - DAY).toISOString(),
    editableUntil: new Date(now + 6 * DAY).toISOString(),
    canEdit: true,
    held: 2,
    earnedUnclaimed: 0,
  },
  locked: {
    name: 'Ada Okafor',
    suggested: 'Ada Okafor',
    confirmedAt: new Date(now - 20 * DAY).toISOString(),
    editableUntil: null,
    canEdit: false,
    held: 3,
    earnedUnclaimed: 0,
  },
};

export default function CertificateNameBench() {
  const [open, setOpen] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <main className="min-h-dvh bg-[var(--bg-section)] p-4 text-[var(--text-primary)] sm:p-8">
      <h1 className="text-[24px] font-extrabold">Certificate name</h1>
      <p className="mt-1 text-[14px] text-[var(--text-secondary)]">The sheet in each moment. Saving is faked here.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.keys(STATES).map((m) => (
          <button key={m} type="button" onClick={() => setOpen(m)} className="rounded-full bg-[var(--bg-card)] px-4 py-2 text-[14px] font-bold">
            {m}
          </button>
        ))}
      </div>
      {saved && <p className="mt-4 text-[14px] font-bold">Saved: {saved}</p>}
      {open && STATES[open] && (
        <CertificateNameSheet
          state={STATES[open]}
          courseTitle={open === 'claim' ? 'Python for Beginners' : undefined}
          onClose={() => setOpen(null)}
          onSaved={(next) => {
            setSaved(next.name);
            setOpen(null);
          }}
          save={async (name) => {
            await new Promise((r) => setTimeout(r, 700));
            return {
              ...STATES[open],
              name,
              confirmedAt: new Date().toISOString(),
            };
          }}
        />
      )}
    </main>
  );
}
