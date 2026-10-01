'use client';

/**
 * A code sample in a lesson: a dark, rounded panel with the language on a
 * tab, highlighted, horizontally scrollable (never wrapped — wrapping code
 * changes its meaning in Python), with a copy button.
 */

import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { CODE_LANGUAGE_LABEL, type CodeLanguage } from '@/lib/lesson/blocks';
import { highlightCode } from '@/lib/lesson/highlight';
import { playSound } from '@/lib/audio/lessonSounds';
import styles from './Code.module.css';

export function CodeBlock({
  code,
  language,
  caption,
  compact = false,
}: {
  code: string;
  language?: CodeLanguage;
  caption?: string;
  compact?: boolean;
}) {
  const html = useMemo(() => highlightCode(code, language), [code, language]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      playSound('toggleOn');
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  return (
    <figure className={`${styles.block} ${compact ? styles.compact : ''}`}>
      <div className={styles.bar}>
        <span className={styles.lang}>{language ? CODE_LANGUAGE_LABEL[language] : 'Code'}</span>
        <button type="button" className={styles.copy} onClick={() => void copy()} aria-label={copied ? 'Copied' : 'Copy code'}>
          {copied ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : <Copy size={14} strokeWidth={2.5} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

/** One highlighted line, for exercises that work line by line. */
export function CodeLine({ text, language, onDark = false }: { text: string; language?: CodeLanguage; onDark?: boolean }) {
  const html = useMemo(() => highlightCode(text, language), [text, language]);
  return (
    <code
      className={`${styles.inlineLine} ${onDark ? styles.onDark : ''}`}
      dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }}
    />
  );
}

export default CodeBlock;
