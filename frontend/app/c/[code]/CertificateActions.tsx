'use client';

import { Check, Download, Link2, Printer } from 'lucide-react';
import { useState } from 'react';
import { FaLinkedinIn } from 'react-icons/fa';
import { type Certificate, certificateImagePath, linkedInAddUrl, verifyUrl } from '@/lib/certificates/types';

const BTN =
  'inline-flex items-center justify-center gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-[15px] font-bold text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]';

/** Download, print / save as PDF, add to LinkedIn, copy link. */
export default function CertificateActions({ cert }: { cert: Certificate }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      // Always the canonical teyro.app link — it's what belongs on a credential.
      await navigator.clipboard.writeText(verifyUrl(cert.code));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — the link is in the address bar anyway.
    }
  };

  return (
    <div className="flex flex-col gap-3 print:hidden">
      <a
        href={linkedInAddUrl(cert)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[var(--color-brand)] px-6 py-4 text-[16px] font-extrabold text-[var(--text-on-blue)] shadow-[0_4px_0_var(--color-brand-deep)] transition-transform active:translate-y-[2px] active:shadow-[0_2px_0_var(--color-brand-deep)]"
      >
        <FaLinkedinIn size={18} /> Add to LinkedIn
      </a>
      <div className="grid grid-cols-3 gap-2">
        <a href={certificateImagePath(cert.code, { download: true })} className={BTN}>
          <Download size={18} /> <span>Image</span>
        </a>
        <button type="button" onClick={() => window.print()} className={BTN}>
          <Printer size={18} /> <span>PDF</span>
        </button>
        <button type="button" onClick={() => void copy()} className={BTN}>
          {copied ? <Check size={18} className="text-[var(--success-green)]" /> : <Link2 size={18} />}
          <span>{copied ? 'Copied' : 'Link'}</span>
        </button>
      </div>
    </div>
  );
}
