import type { Certificate } from './types';

/**
 * The bench's sample certificate (/dev/certificates, and the homepage image
 * generator). Served for SAMPLE23 outside production only, so a fake
 * credential can never verify on the live site.
 */
export const SAMPLE_CERTIFICATE: Certificate = {
  code: 'SAMPLE23',
  courseId: 'sample',
  issuedAt: '2026-10-16T10:00:00.000Z',
  completedAt: '2026-10-16T10:00:00.000Z',
  revoked: false,
  data: {
    learnerName: 'Ada Okafor',
    courseTitle: 'Python for Beginners',
    courseSlug: 'python-for-beginners',
    isOriginal: true,
    category: 'Coding',
    chapters: 8,
    lessons: 48,
    minutes: 720,
    xp: 6820,
    bestStreak: 30,
    skills: ['Write and run real Python code', 'Store data in variables', 'Do money maths without rounding errors', 'Fix errors from the message'],
    signer: { name: 'Teyro Originals', title: 'Course team, Teyro' },
  },
};

/** Public lookup behind /c/[code] (GET /certificates/verify/:code). */
export async function fetchCertificate(code: string): Promise<Certificate | null> {
  if (code === SAMPLE_CERTIFICATE.code) {
    return process.env.NODE_ENV === 'production' ? null : SAMPLE_CERTIFICATE;
  }
  if (!/^[A-Za-z0-9-]{8,14}$/.test(code)) return null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certificates/verify/${encodeURIComponent(code)}`, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as Certificate;
  } catch {
    return null;
  }
}
