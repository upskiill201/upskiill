'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowRight, BookMarked } from 'lucide-react';
import { SupportHub } from '@/components/support/SupportHub';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import g from '@/components/studio/guide/guide.module.css';

export default function CreatorHelpPage() {
  useStandaloneSound();
  return (
    <SupportHub
      audience="CREATOR"
      basePath="/creator/help"
      aside={
        <Link href="/creator/guide" className={g.helpCard} style={{ '--tone': 'var(--success-green)' } as CSSProperties}>
          <span className={g.cardIcon} style={{ '--tone': 'var(--success-green)' } as CSSProperties} aria-hidden="true">
            <BookMarked size={22} strokeWidth={2.4} />
          </span>
          <span className={g.cardText}>
            <strong>Creator Guide</strong>
            <span>Step-by-step, with pictures: the Studio, building lessons, pricing, review and payouts.</span>
          </span>
          <ArrowRight size={18} className={g.cardArrow} aria-hidden="true" />
        </Link>
      }
    />
  );
}
