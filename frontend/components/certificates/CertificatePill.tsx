'use client';

import Link from 'next/link';
import { Glyph } from '@/components/art/Glyph';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import { type CourseCertificateStatus, verifyPath } from '@/lib/certificates/types';
import type { CertificateNameState } from '@/lib/certificates/name';
import CertificateNameSheet from './CertificateNameSheet';

const PILL =
  'inline-flex items-center gap-2 rounded-full border-2 border-[color-mix(in_srgb,var(--warning)_55%,transparent)] bg-[var(--bg-card)] px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--warning)] shadow-[0_3px_0_color-mix(in_srgb,var(--warning)_55%,transparent)] transition-transform active:translate-y-[2px] active:shadow-none';

/**
 * "Certificate" pill on the course-complete screens. Asking the server issues
 * the certificate if this finish just made the learner eligible; when it
 * still needs their real name, the pill becomes "Claim certificate" and opens
 * the name sheet. Nothing renders while the course is unfinished.
 */
export default function CertificatePill({ courseId }: { courseId: string }) {
  const { data, mutate } = useSWR<CourseCertificateStatus>(`/api/certificates/course/${courseId}`, fetcher);
  const needsName = data?.status === 'NAME_REQUIRED';
  const { data: name, mutate: mutateName } = useSWR<CertificateNameState>(needsName ? '/api/certificates/name' : null, fetcher);
  const [open, setOpen] = useState(false);

  if (data?.status === 'ISSUED') {
    return (
      <Link href={verifyPath(data.certificate.code)} className={PILL}>
        <Glyph name="medal" size={16} strokeWidth={2.8} />
        Certificate
      </Link>
    );
  }
  if (!needsName || !name) return null;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={PILL}>
        <Glyph name="medal" size={16} strokeWidth={2.8} />
        Claim certificate
      </button>
      {open && (
        <CertificateNameSheet
          state={name}
          onClose={() => setOpen(false)}
          onSaved={(next) => {
            setOpen(false);
            void mutateName(next, { revalidate: false });
            void mutate();
          }}
        />
      )}
    </>
  );
}
