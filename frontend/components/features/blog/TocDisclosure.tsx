import { ChevronDown, ListTree } from 'lucide-react';
import type { TocItem } from '@/lib/blog/types';
import styles from './TableOfContents.module.css';

interface TocDisclosureProps {
  items: TocItem[];
}

// Collapsed "On this page" card shown above the article below the desktop
// breakpoint, where the sticky sidebar TOC is hidden. Native <details>, no JS;
// H2s only so the list stays short on a phone.
export default function TocDisclosure({ items }: TocDisclosureProps) {
  const sections = items.filter((item) => item.level === 2);
  if (sections.length === 0) return null;

  return (
    <details className={styles.disclosure}>
      <summary className={styles.disclosureSummary}>
        <ListTree size={18} strokeWidth={2.5} aria-hidden="true" />
        On this page
        <span className={styles.disclosureCount}>{sections.length} sections</span>
        <ChevronDown
          size={18}
          strokeWidth={3}
          className={styles.disclosureChevron}
          aria-hidden="true"
        />
      </summary>
      <ol className={styles.disclosureList}>
        {sections.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={styles.disclosureLink}>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
