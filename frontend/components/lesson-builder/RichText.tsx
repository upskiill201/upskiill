'use client';

/**
 * A small rich-text box for explanation cards: bold, italic, a heading,
 * lists and inline code — what a bite-size explanation needs, nothing that
 * turns a card into a wall of text. The player sanitises the HTML.
 */

import { useEffect, useRef } from 'react';
import { Bold, Code, Heading2, Italic, List, ListOrdered } from 'lucide-react';
import styles from './RichText.module.css';

export function RichText({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Set once; afterwards the DOM is the source of truth while typing.
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = () => onChange(ref.current?.innerHTML ?? '');

  const run = (e: React.MouseEvent, command: string, arg?: string) => {
    e.preventDefault(); // keep the selection
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const inlineCode = (e: React.MouseEvent) => {
    e.preventDefault();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    if (!ref.current?.contains(range.commonAncestorContainer)) return;
    const code = document.createElement('code');
    code.textContent = range.toString();
    range.deleteContents();
    range.insertNode(code);
    emit();
  };

  return (
    <div className={styles.box}>
      <div className={styles.toolbar} role="toolbar" aria-label="Formatting">
        <button type="button" onMouseDown={(e) => run(e, 'bold')} aria-label="Bold">
          <Bold size={16} strokeWidth={2.5} />
        </button>
        <button type="button" onMouseDown={(e) => run(e, 'italic')} aria-label="Italic">
          <Italic size={16} strokeWidth={2.5} />
        </button>
        <button type="button" onMouseDown={(e) => run(e, 'formatBlock', 'h2')} aria-label="Heading">
          <Heading2 size={16} strokeWidth={2.5} />
        </button>
        <button type="button" onMouseDown={(e) => run(e, 'insertUnorderedList')} aria-label="Bullet list">
          <List size={16} strokeWidth={2.5} />
        </button>
        <button type="button" onMouseDown={(e) => run(e, 'insertOrderedList')} aria-label="Numbered list">
          <ListOrdered size={16} strokeWidth={2.5} />
        </button>
        <button type="button" onMouseDown={inlineCode} aria-label="Inline code">
          <Code size={16} strokeWidth={2.5} />
        </button>
        <button type="button" onMouseDown={(e) => run(e, 'formatBlock', 'p')} className={styles.textBtn}>
          Normal
        </button>
      </div>
      <div
        ref={ref}
        className={styles.editable}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={emit}
        onPaste={(e) => {
          // Paste as plain text: no fonts or colours from other sites.
          e.preventDefault();
          document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
          emit();
        }}
      />
    </div>
  );
}

export default RichText;
