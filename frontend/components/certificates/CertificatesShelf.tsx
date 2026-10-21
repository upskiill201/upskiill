'use client';

/**
 * "Your certificates" on My Learning. GET /certificates/mine also issues any
 * certificate the learner earned but never opened — including courses they
 * finished before certificates existed — so this shelf is where those appear.
 * Nothing is issued until the learner confirms their real name, so the shelf
 * also carries the way in: a "waiting" card, a confirm banner for certificates
 * printed before that step, and the name itself once confirmed.
 */

import Link from 'next/link';
import { Award, LockKeyhole, PencilLine, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import { type Certificate, certificateImagePath, formatCertificateDate, verifyPath } from '@/lib/certificates/types';
import type { CertificateNameState } from '@/lib/certificates/name';
import CertificateNameSheet from './CertificateNameSheet';

const CTA =
  'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[12px] bg-[var(--color-brand)] px-4 text-[14px] font-extrabold uppercase tracking-[0.04em] text-[var(--text-on-blue)] shadow-[0_3px_0_var(--color-brand-deep)] transition-transform active:translate-y-[2px] active:shadow-none';

export default function CertificatesShelf() {
  const { data, error, isLoading, mutate } = useSWR<Certificate[]>('/api/certificates/mine', fetcher);
  const { data: name, mutate: mutateName } = useSWR<CertificateNameState>('/api/certificates/name', fetcher);
  const [sheetOpen, setSheetOpen] = useState(false);

  const waiting = name?.earnedUnclaimed ?? 0;
  const unconfirmedHeld = name && !name.confirmedAt && name.held > 0 && waiting === 0;

  return (
    <section aria-labelledby="certificates-title" className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 id="certificates-title" className="text-[20px] font-extrabold text-[var(--text-primary)]">
          Your certificates
        </h2>
        {name?.confirmedAt && name.name && (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-[13px] font-bold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)]"
          >
            {name.canEdit ? <PencilLine size={15} strokeWidth={2.4} /> : <LockKeyhole size={15} strokeWidth={2.4} />}
            <span>
              Name on certificates: <span className="font-extrabold text-[var(--text-primary)]">{name.name}</span>
            </span>
          </button>
        )}
      </div>

      {waiting > 0 && (
        <div className="mt-3 flex flex-col gap-4 rounded-[12px] border-2 border-[color-mix(in_srgb,var(--warning)_55%,transparent)] bg-[color-mix(in_srgb,var(--warning)_8%,var(--bg-card))] p-4 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--warning)] text-white shadow-[0_3px_0_color-mix(in_srgb,var(--warning)_60%,black)]">
            <Award size={26} strokeWidth={2.6} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-extrabold text-[var(--text-primary)]">
              {waiting === 1 ? 'A certificate is waiting for you' : `${waiting} certificates are waiting for you`}
            </p>
            <p className="mt-0.5 text-[14px] font-semibold text-[var(--text-secondary)]">Confirm the name to print on it and it’s yours.</p>
          </div>
          <button type="button" onClick={() => setSheetOpen(true)} className={CTA}>
            <Award size={18} strokeWidth={2.6} /> Claim
          </button>
        </div>
      )}

      {unconfirmedHeld && (
        <div className="mt-3 flex flex-col gap-4 rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-extrabold text-[var(--text-primary)]">Is “{name.suggested}” your real name?</p>
            <p className="mt-0.5 text-[14px] font-semibold text-[var(--text-secondary)]">
              Confirm the name on your certificates so employers see your real name.
            </p>
          </div>
          <button type="button" onClick={() => setSheetOpen(true)} className={CTA}>
            Confirm name
          </button>
        </div>
      )}

      {sheetOpen && name && (
        <CertificateNameSheet
          state={name}
          onClose={() => setSheetOpen(false)}
          onSaved={(next) => {
            setSheetOpen(false);
            void mutateName(next, { revalidate: false });
            void mutate();
          }}
        />
      )}

      {isLoading && (
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2" aria-hidden>
          {[0, 1].map((i) => (
            <div key={i} className="aspect-[1600/1131] animate-pulse rounded-[12px] bg-[var(--bg-section)]" />
          ))}
        </div>
      )}

      {error && !isLoading && (
        <div className="mt-3 flex items-center justify-between gap-4 rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] p-4">
          <p className="text-[15px] font-bold text-[var(--text-secondary)]">We couldn&apos;t load your certificates.</p>
          <button
            type="button"
            onClick={() => void mutate()}
            className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--border)] px-3 py-2 text-[14px] font-bold"
          >
            <RotateCcw size={16} /> Try again
          </button>
        </div>
      )}

      {data && data.length === 0 && waiting === 0 && (
        <div className="mt-3 flex items-center gap-4 rounded-[12px] border border-dashed border-[var(--border-strong)] bg-[var(--bg-card)] p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--warning)_18%,transparent)] text-[var(--warning)]">
            <Award size={24} strokeWidth={2.4} />
          </span>
          <p className="text-[15px] font-bold text-[var(--text-secondary)]">
            Finish every lesson of a course to earn its certificate. It&apos;s yours to download, print and add to LinkedIn.
          </p>
        </div>
      )}

      {data && data.length > 0 && (
        <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.map((c) => (
            <li key={c.code}>
              <Link
                href={verifyPath(c.code)}
                className="group block rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] p-2 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG */}
                <img
                  src={certificateImagePath(c.code)}
                  alt={`Certificate for ${c.data.courseTitle}`}
                  loading="lazy"
                  className="aspect-[1600/1131] w-full rounded-[8px] object-cover"
                />
                <div className="px-2 pb-1 pt-3">
                  <p className="text-[16px] font-extrabold text-[var(--text-primary)]">{c.data.courseTitle}</p>
                  <p className="text-[13px] font-bold text-[var(--text-secondary)]">Completed {formatCertificateDate(c.completedAt)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
