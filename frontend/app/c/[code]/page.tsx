import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ShieldAlert, ShieldCheck } from 'lucide-react';
import { fetchCertificate } from '@/lib/certificates/server';
import {
  CERTIFICATE_SIZE,
  certificateImagePath,
  credentialId,
  formatCertificateDate,
} from '@/lib/certificates/types';
import CertificateActions from './CertificateActions';

/**
 * teyro.app/c/:code — a certificate's public home and its verification.
 *
 * Anyone with the link (an employer, a LinkedIn visitor, the QR code on the
 * printout) sees that the credential is real: who earned it, for which
 * course, when — straight from the server's record. The learner downloads,
 * prints or adds it to LinkedIn from here. Personal pages stay out of search.
 */

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const cert = await fetchCertificate(code);
  if (!cert) return { title: 'Certificate not found · Teyro', robots: { index: false, follow: true } };
  const title = `${cert.data.learnerName}: ${cert.data.courseTitle} certificate · Teyro`;
  const description = `Verified Teyro certificate. ${cert.data.learnerName} completed ${cert.data.courseTitle}, all ${cert.data.lessons} lessons, on ${formatCertificateDate(cert.completedAt)}.`;
  const image = { url: certificateImagePath(cert.code), ...CERTIFICATE_SIZE, alt: title };
  return {
    title,
    description,
    robots: { index: false, follow: true },
    openGraph: { type: 'website', siteName: 'Teyro', url: `https://teyro.app/c/${cert.code}`, title, description, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export default async function CertificatePage({ params }: Props) {
  const { code } = await params;
  const cert = await fetchCertificate(code);
  if (!cert) notFound();
  const d = cert.data;

  const facts: [string, string][] = [
    ['Learner', d.learnerName],
    ['Course', d.courseTitle],
    ['Completed', formatCertificateDate(cert.completedAt)],
    ['Lessons', `All ${d.lessons}, every phase`],
    ['Credential ID', credentialId(cert.code)],
  ];

  return (
    <div className="min-h-dvh bg-[var(--bg-section)] text-[var(--text-primary)] print:bg-white">
      {/* Print / Save as PDF: the certificate alone on an A4 landscape page. */}
      <style>{`@media print { @page { size: A4 landscape; margin: 0; } body > *:not(main), header, nav, footer { display: none !important; } }`}</style>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 md:pt-12 print:max-w-none print:p-0">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 print:block">
          {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG with fixed dimensions */}
          <img
            src={certificateImagePath(cert.code)}
            width={CERTIFICATE_SIZE.width}
            height={CERTIFICATE_SIZE.height}
            alt={`${d.learnerName}'s certificate for ${d.courseTitle}`}
            className="h-auto w-full rounded-[16px] shadow-[0_24px_64px_-24px_color-mix(in_srgb,var(--text-primary)_40%,transparent)] print:rounded-none print:shadow-none"
          />

          <aside className="flex flex-col gap-6 print:hidden">
            {cert.revoked ? (
              <div className="flex items-start gap-3 rounded-[12px] border border-[var(--error-red)] bg-[var(--bg-card)] p-4">
                <ShieldAlert className="mt-0.5 shrink-0 text-[var(--error-red)]" size={24} />
                <div>
                  <p className="text-[16px] font-extrabold">This certificate was revoked</p>
                  <p className="mt-1 text-[14px] text-[var(--text-secondary)]">Teyro withdrew it, so it is no longer valid.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-[12px] border border-[color-mix(in_srgb,var(--success-green)_40%,transparent)] bg-[var(--bg-card)] p-4">
                <ShieldCheck className="mt-0.5 shrink-0 text-[var(--success-green)]" size={24} />
                <div>
                  <p className="text-[16px] font-extrabold">Verified certificate</p>
                  <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
                    Issued by Teyro after every lesson of the course was completed.
                    {d.nameConfirmed ? ' The learner confirmed the name on it is their real name.' : ''}
                  </p>
                </div>
              </div>
            )}

            <dl className="divide-y divide-[var(--border)] rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)]">
              {facts.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <dt className="text-[14px] font-bold text-[var(--text-secondary)]">{k}</dt>
                  <dd className="text-right text-[15px] font-extrabold">{v}</dd>
                </div>
              ))}
            </dl>

            {!cert.revoked && <CertificateActions cert={cert} />}

            <Link
              href={`/courses/${d.courseSlug}`}
              className="group inline-flex items-center gap-2 text-[15px] font-extrabold text-[var(--color-brand)]"
            >
              Learn {d.courseTitle} on Teyro
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
