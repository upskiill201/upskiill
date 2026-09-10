'use client';

import { useEffect, useRef, useState } from 'react';
import { ListTree } from 'lucide-react';
import type { TocItem } from '@/lib/blog/types';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
  items: TocItem[];
}

// Sticky scroll-spy TOC. All items render server-side with a deterministic
// initial active id (first item) so SSR/client markup matches; the
// IntersectionObserver only attaches in useEffect.
export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const visibleIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleIds.current.add(entry.target.id);
          else visibleIds.current.delete(entry.target.id);
        }
        // Active = the visible heading highest on the page.
        const topVisible = headings.find((h) => visibleIds.current.has(h.id));
        if (topVisible) setActiveId(topVisible.id);
      },
      // Observation band: just below the fixed header, upper third of viewport.
      { rootMargin: '-96px 0px -66% 0px', threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <p className={styles.label}>
        <ListTree size={14} strokeWidth={2.5} aria-hidden="true" />
        On this page
      </p>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? styles.itemL3 : undefined}>
            <a
              href={`#${item.id}`}
              className={`${styles.link} ${activeId === item.id ? styles.linkActive : ''}`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
