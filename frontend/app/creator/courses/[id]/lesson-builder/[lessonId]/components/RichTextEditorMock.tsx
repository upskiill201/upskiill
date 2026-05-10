import React from 'react';
import { Bold, Italic, Underline, Link as LinkIcon, List, FileImage } from 'lucide-react';
import styles from '../LessonBuilder.module.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function RichTextEditorMock({ value, onChange, placeholder }: Props) {
  return (
    <div className={styles.richEditor}>
      <div className={styles.richToolbar}>
        <Bold size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        <Italic size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        <Underline size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border)', margin: '0 8px' }}></div>
        <LinkIcon size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        <List size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        <FileImage size={16} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
      </div>
      <textarea
        className={styles.richTextarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Start typing..."}
      />
    </div>
  );
}
