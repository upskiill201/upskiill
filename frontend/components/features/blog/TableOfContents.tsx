'use client';

import { useEffect, useRef, useState } from 'react';
import { ListTree } from 'lucide-react';
import type { TocItem } from '@/lib/blog/types';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
  items: TocItem[];
}

// Headings above this line (px from the viewport top, just under the sticky
// header) count as "read" — the active item is the last one past it.
const ACTIVE_LINE = 140;

// Sticky scroll-spy TOC. All items render server-side with a deterministic
// initial active id (first item) so SSR/client markup matches; the scroll
// listener only attaches in useEffect. A position check on scroll (not an
// IntersectionObserver band) so fast scrolls and anchor jumps that skip past
// every heading still land on the right section.
export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= ACTIVE_LINE) current = h;
        else break;
      }
      setActiveId(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Long contents lists scroll inside the sticky card — keep the active link
  // in view there without moving the page.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!nav || !link) return;
    const top = link.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop;
    if (top < nav.scrollTop || top + link.offsetHeight > nav.scrollTop + nav.clientHeight) {
      nav.scrollTo({ top: top - nav.clientHeight / 3 });
    }
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <nav ref={navRef} className={styles.toc} aria-label="Table of contents">
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
