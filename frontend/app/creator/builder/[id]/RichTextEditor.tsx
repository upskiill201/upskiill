'use client';

import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Builder.module.css';

// ─── RICH TEXT EDITOR ────────────────────────────────────────
const HEADING_OPTIONS = [
  { label: 'Paragraph', tag: 'div' },
  { label: 'Heading 2', tag: 'h2' },
  { label: 'Heading 3', tag: 'h3' },
];

export function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [headingLabel, setHeadingLabel] = React.useState('Paragraph');
  const [headingOpen, setHeadingOpen] = React.useState(false);

  // Sync initial value into editor once on mount
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    // After exec, sync html back to state
    onChange(editorRef.current?.innerHTML || '');
  };

  const handleFormat = (e: React.MouseEvent, command: string, arg?: string) => {
    e.preventDefault(); // prevent blur
    exec(command, arg);
  };

  const handleHeading = (e: React.MouseEvent, tag: string, label: string) => {
    e.preventDefault();
    exec('formatBlock', tag);
    setHeadingLabel(label);
    setHeadingOpen(false);
  };

  const handleLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = prompt('Enter URL:');
    if (url) exec('createLink', url);
  };

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || '');
  };

  const charCount = editorRef.current?.innerText?.length ?? 0;

  return (
    <div className={styles.richEditor}>
      <div className={styles.richToolbar}>
        {/* Heading dropdown */}
        <div className={styles.headingDropdown}>
          <button
            type="button"
            className={styles.headingBtn}
            onMouseDown={(e) => { e.preventDefault(); setHeadingOpen(o => !o); }}
          >
            {headingLabel} <ChevronDown size={12} />
          </button>
          {headingOpen && (
            <div className={styles.headingMenu}>
              {HEADING_OPTIONS.map(opt => (
                <button
                  key={opt.tag}
                  type="button"
                  className={styles.headingMenuItem}
                  onMouseDown={(e) => handleHeading(e, opt.tag, opt.label)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.richToolbarDivider} />

        <button type="button" className={styles.richToolbarBtn} title="Bold"
          onMouseDown={(e) => handleFormat(e, 'bold')}>
          <strong>B</strong>
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Italic"
          onMouseDown={(e) => handleFormat(e, 'italic')}>
          <em>I</em>
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Underline"
          onMouseDown={(e) => handleFormat(e, 'underline')}>
          <u>U</u>
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Strikethrough"
          onMouseDown={(e) => handleFormat(e, 'strikeThrough')}
          style={{ textDecoration: 'line-through' }}>
          S
        </button>

        <div className={styles.richToolbarDivider} />

        <button type="button" className={styles.richToolbarBtn} title="Ordered List"
          onMouseDown={(e) => handleFormat(e, 'insertOrderedList')}>
          1.
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Bullet List"
          onMouseDown={(e) => handleFormat(e, 'insertUnorderedList')}>
          •
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Blockquote"
          onMouseDown={(e) => handleFormat(e, 'formatBlock', 'blockquote')}>
          ❝
        </button>

        <div className={styles.richToolbarDivider} />

        <button type="button" className={styles.richToolbarBtn} title="Link"
          onMouseDown={handleLink}>
          🔗
        </button>
        <button type="button" className={styles.richToolbarBtn} title="Clear Formatting"
          onMouseDown={(e) => handleFormat(e, 'removeFormat')}>
          Tx
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={styles.richTextarea}
        onInput={handleInput}
        data-placeholder="Write a detailed description of your course. Explain what learners will learn, why it matters, and what makes your course unique."
      />
      <div className={styles.charCountRight} style={{ color: charCount >= 1800 ? '#EF4444' : undefined, transition: 'color 0.2s' }}>{charCount}/2000</div>
    </div>
  );
}
