'use client';

import dynamic from 'next/dynamic';
import { Share2 } from 'lucide-react';
import { useState } from 'react';
import { playHaptic } from '@/lib/haptics';
import type { ShareCardRequest } from '@/lib/share/types';

const ShareSheet = dynamic(() => import('./ShareSheet'), { ssr: false });

/**
 * The "Share" pill on a milestone moment (streak milestone, chapter done,
 * league podium...). Opens the ShareSheet; nothing is created until tapped.
 */
export default function ShareMilestoneButton({
  request,
  className = '',
}: {
  request: ShareCardRequest;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          playHaptic('light', false);
          setOpen(true);
        }}
        className={`inline-flex items-center gap-2 rounded-full border-2 border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-[14px] font-extrabold uppercase tracking-[0.06em] text-[var(--color-brand)] shadow-[0_3px_0_var(--border)] transition-transform active:translate-y-[2px] active:shadow-none ${className}`}
      >
        <Share2 size={16} strokeWidth={2.8} />
        Share
      </button>
      {open && <ShareSheet request={request} onClose={() => setOpen(false)} />}
    </>
  );
}
