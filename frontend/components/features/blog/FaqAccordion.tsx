import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/blog/types';
import styles from './FaqAccordion.module.css';

interface FaqAccordionProps {
  items: FaqItem[];
}

// Native <details>/<summary> — zero JS, and the answer text stays in the
// server-rendered HTML so crawlers and AI engines see exactly what users see
// (mirrored 1:1 by the FAQPage JSON-LD on the post page).
export default function FaqAccordion({ items }: FaqAccordionProps) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={styles.heading}>
        Frequently asked questions
      </h2>
      <div className={styles.list}>
        {items.map((item, i) => (
          <details key={i} className={styles.item} open={i === 0}>
            <summary className={styles.question}>
              {item.question}
              <span className={styles.chevron} aria-hidden="true">
                <ChevronDown size={18} strokeWidth={2.5} />
              </span>
            </summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
