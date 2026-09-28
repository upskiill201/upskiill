import Image from 'next/image';
import Link from 'next/link';
import type { CtaOverride } from '@/lib/blog/types';
import styles from './CtaBlock.module.css';

interface CtaBlockProps {
  cta?: CtaOverride;
}

const DEFAULTS = {
  title: 'Turn reading into actually learning',
  text: 'Teyro turns what you just read into bite-sized, gamified lessons — with spaced review, streaks and rewards that make knowledge stick.',
  href: '/onboarding/0',
  label: 'Try Teyro free',
};

// Conversion panel at the end of every post (and the blog index) — the
// homepage's final-CTA look: flat brand blue, cheering Tey, white 3D button.
// Plain <Link> + CSS module (NOT components/ui/Button — that component is
// client-only and would break RSC).
export default function CtaBlock({ cta }: CtaBlockProps) {
  const title = cta?.title ?? DEFAULTS.title;
  const text = cta?.text ?? DEFAULTS.text;
  const href = cta?.href ?? DEFAULTS.href;
  const label = cta?.label ?? DEFAULTS.label;

  return (
    <aside className={styles.block} aria-label="Call to action">
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
        <Link href={href} className={styles.button}>
          {label}
        </Link>
        <p className={styles.fineprint}>Free to start · No credit card needed</p>
      </div>
      <div className={styles.art} aria-hidden="true">
        <Image
          src="/User onbarding Assets/tey/cheering.webp"
          alt=""
          width={180}
          height={209}
          className={styles.tey}
        />
      </div>
    </aside>
  );
}
