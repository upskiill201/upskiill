'use client';

/**
 * Dev-only bench for the shareable milestone cards: every template in both
 * formats (rendered by /s/sample-*\/image from lib/share/samples.ts), plus a
 * live ShareSheet against the real API. Gated on NODE_ENV like /dev/tey-scenes.
 */

import { useState } from 'react';
import ShareMilestoneButton from '@/components/share/ShareMilestoneButton';
import { SAMPLE_SHARE_CARDS } from '@/lib/share/samples';
import { shareImagePath, type ShareFormat } from '@/lib/share/types';

export default function ShareCardsBench() {
  const [format, setFormat] = useState<ShareFormat>('story');
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <main className="min-h-dvh bg-[var(--bg-section)] p-4 text-[var(--text-primary)] sm:p-8">
      <h1 className="text-[24px] font-extrabold">Share cards</h1>
      <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
        Sample snapshots from lib/share/samples.ts. The Share buttons below hit the real API with your session.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(['story', 'square'] as ShareFormat[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFormat(f)}
            className={`rounded-full px-4 py-2 text-[14px] font-bold ${format === f ? 'bg-[var(--color-brand)] text-[var(--text-on-blue)]' : 'bg-[var(--bg-card)]'}`}
          >
            {f}
          </button>
        ))}
        <ShareMilestoneButton request={{ kind: 'STREAK' }} />
        <ShareMilestoneButton request={{ kind: 'LEAGUE' }} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Object.keys(SAMPLE_SHARE_CARDS).map((slug) => (
          <figure key={slug} className="m-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- generated PNG */}
            <img src={shareImagePath(slug, format)} alt={slug} className="w-full rounded-[12px]" />
            <figcaption className="mt-1 text-[12px] font-bold text-[var(--text-secondary)]">{slug}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
