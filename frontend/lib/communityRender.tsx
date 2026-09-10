import React from 'react';
import styles from '@/components/community/community.module.css';

/**
 * Renders post/comment text with the composer's mention tokens
 * ([Name](mention:<userId>)) as highlighted chips, plus paragraph breaks.
 */
export function renderRichText(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /\[([^\]]*)\]\(mention:([a-zA-Z0-9-]+)\)|\n/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={key++}>{text.slice(last, m.index)}</span>);
    }
    if (m[2]) {
      // Mention token
      nodes.push(
        <span key={key++} className={styles.mentionChip}>
          @{m[1] || 'member'}
        </span>,
      );
    } else {
      // Newline — paragraph break
      nodes.push(<br key={key++} />);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    nodes.push(<span key={key++}>{text.slice(last)}</span>);
  }
  return nodes;
}

/**
 * Flattens post text to a single clamped line of plain text for card previews.
 * Mention tokens collapse to "@Name" and newlines to spaces — a card excerpt
 * is CSS line-clamped, so real <br>s would waste the two lines it gets.
 */
export function plainExcerpt(text: string, max = 260): string {
  const flat = text
    .replace(/\[([^\]]*)\]\(mention:[a-zA-Z0-9-]+\)/g, (_m, name) => `@${name || 'member'}`)
    .replace(/\s+/g, ' ')
    .trim();
  return flat.length > max ? `${flat.slice(0, max).trimEnd()}…` : flat;
}
