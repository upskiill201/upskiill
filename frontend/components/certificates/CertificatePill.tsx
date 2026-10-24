'use client';

import Link from 'next/link';
import { Glyph } from '@/components/art/Glyph';
import useSWR from 'swr';
import { fetcher } from '@/lib/swr';
import { type CourseCertificateStatus, verifyPath } from '@/lib/certificates/types';

/**
 * "Certificate" pill on the course-complete screens. Asking the server issues
 * the certificate if this finish just made the learner eligible; nothing
 * renders until one exists.
 */
export default function CertificatePill({ courseId }: { courseId: string }) {
  const { data } = useSWR<CourseCertificateStatus>(`/api/certificates/course/${courseId}`, fetcher);
  if (data?.status !== 'ISSUED') return null;
  return (
    <Link
      href={verifyPath(data.certificate.code)}
      className="inline-flex items-center gap-2 rounded-full border-2 border-[color-mix(in_srgb,var(--warning)_55%,transparent)] bg-[var(--bg-card)] px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--warning)] shadow-[0_3px_0_color-mix(in_srgb,var(--warning)_55%,transparent)] transition-transform active:translate-y-[2px] active:shadow-none"
    >
      <Glyph name="medal" size={16} strokeWidth={2.8} />
      Certificate
    </Link>
  );
}
