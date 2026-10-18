'use client';

/**
 * "Your certificates" on My Learning. GET /certificates/mine also issues any
 * certificate the learner earned but never opened — including courses they
 * finished before certificates existed — so this shelf is where those appear.
 */

import Link from 'next/link';
import { Award, RotateCcw } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import { type Certificate, certificateImagePath, formatCertificateDate, verifyPath } from '@/lib/certificates/types';

export default function CertificatesShelf() {
  const { data, error, isLoading, mutate } = useSWR<Certificate[]>('/api/certificates/mine', fetcher);

  return (
    <section aria-labelledby="certificates-title" className="mt-8">
      <h2 id="certificates-title" className="text-[20px] font-extrabold text-[var(--text-primary)]">
        Your certificates
      </h2>

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

      {data && data.length === 0 && (
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
