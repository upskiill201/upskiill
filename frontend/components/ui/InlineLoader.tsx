import React from 'react';
import styles from './InlineLoader.module.css';

export interface InlineLoaderProps {
  /** Optional text to display alongside spinner */
  text?: string;
  className?: string;
}

/**
 * InlineLoader (Pattern C: Micro Loader)
 *
 * Used for small in-page async actions (saving a note, submitting an answer)
 * without covering the existing UI.
 */
export default function InlineLoader({ text, className = '' }: InlineLoaderProps) {
  return (
    <span className={`${styles.inlineSpinner} ${className}`}>
      <span className={styles.dots} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </span>
      {text && <span>{text}</span>}
    </span>
  );
}
