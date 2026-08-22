import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CtaOverride } from '@/lib/blog/types';
import styles from './CtaBlock.module.css';

interface CtaBlockProps {
  cta?: CtaOverride;
}

const DEFAULTS = {
  title: 'Turn reading into actually learning',
  text: 'Teyro turns what you just read into bite-sized, gamified lessons — with spaced review, streaks and rewards that make knowledge stick.',
  href: '/',
  label: 'Try Teyro free',
};

// Soft conversion block at the end of every post. Plain <Link> + CSS module
// (NOT components/ui/Button — that component is client-only and would break RSC).
export default function CtaBlock({ cta }: CtaBlockProps) {
  const title = cta?.title ?? DEFAULTS.title;
  const text = cta?.text ?? DEFAULTS.text;
  const href = cta?.href ?? DEFAULTS.href;
  const label = cta?.label ?? DEFAULTS.label;

  return (
    <aside className={styles.block} aria-label="Call to action">
      <span className={styles.mascot} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.kicker}>Ready when you are</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <Link href={href} className={styles.button}>
          {label}
          <ArrowRight size={16} strokeWidth={3} className={styles.buttonIcon} />
        </Link>
        <p className={styles.fineprint}>Free to start · No credit card needed</p>
      </div>
    </aside>
  );
}
