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
