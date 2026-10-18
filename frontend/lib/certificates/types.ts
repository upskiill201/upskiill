/**
 * Course completion certificates — shared by the verify page /c/[code], its
 * image route, the learner's certificate list and the course-complete screens.
 * Every number is the server's snapshot (backend/src/certificate).
 */

export interface CertificateData {
  learnerName: string;
  courseTitle: string;
  courseSlug: string;
  isOriginal: boolean;
  category: string | null;
  chapters: number;
  lessons: number;
  minutes: number;
  xp: number;
  bestStreak: number;
  skills: string[];
  signer: { name: string; title: string };
}

export interface Certificate {
  code: string;
  courseId: string;
  issuedAt: string;
  completedAt: string;
  revoked: boolean;
  data: CertificateData;
}

/** GET /certificates/course/:courseId */
export type CourseCertificateStatus =
  | { status: 'ISSUED'; certificate: Certificate }
  | { status: 'IN_PROGRESS'; lessonsDone: number; lessonsTotal: number };

export const CERTIFICATE_SIZE = { width: 1600, height: 1131 } as const;

/** TY-7K2M-9QXA — how the code is printed and read aloud. */
export function credentialId(code: string): string {
  return `TY-${code.slice(0, 4)}-${code.slice(4)}`;
}

export function verifyPath(code: string): string {
  return `/c/${code}`;
}

export function verifyUrl(code: string, origin = 'https://teyro.app'): string {
  return `${origin}${verifyPath(code)}`;
}

export function certificateImagePath(code: string, opts: { download?: boolean } = {}): string {
  return `/c/${code}/image${opts.download ? '?download=1' : ''}`;
}

export function formatCertificateDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** "12h" / "45m" — time the learner practised. */
export function practiceTime(minutes: number): string {
  if (minutes >= 60) return `${Math.round(minutes / 60)}h`;
  return `${Math.max(1, Math.round(minutes))}m`;
}

/**
 * LinkedIn's "Add licence or certification" form, pre-filled. Opens the
 * learner's own profile editor — nothing is posted on their behalf.
 */
export function linkedInAddUrl(cert: Certificate, origin = 'https://teyro.app'): string {
  const done = new Date(cert.completedAt);
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: cert.data.courseTitle,
    organizationName: 'Teyro',
    issueYear: String(done.getUTCFullYear()),
    issueMonth: String(done.getUTCMonth() + 1),
    certUrl: verifyUrl(cert.code, origin),
    certId: credentialId(cert.code),
  });
  return `https://www.linkedin.com/profile/add?${params.toString()}`;
}
