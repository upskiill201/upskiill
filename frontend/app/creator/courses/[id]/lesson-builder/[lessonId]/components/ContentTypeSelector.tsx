import React from 'react';
import { Play, FileText, Headphones, MonitorPlay } from 'lucide-react';
import styles from '../LessonBuilder.module.css';

interface Props {
  selected: string;
  onChange: (type: string) => void;
}

export function ContentTypeSelector({ selected, onChange }: Props) {
  const types = [
    { id: 'video', label: 'Video', icon: <Play size={20} fill="currentColor" /> },
    { id: 'text', label: 'Text/Article', icon: <FileText size={20} /> },
    { id: 'audio', label: 'Audio', icon: <Headphones size={20} /> },
    { id: 'interactive', label: 'Interactive Demo', icon: <MonitorPlay size={20} /> },
  ];

  return (
    <div className={styles.contentTypes}>
      {types.map(t => (
        <div
          key={t.id}
          className={`${styles.typeCard} ${selected === t.id ? styles.active : ''}`}
          onClick={() => onChange(t.id)}
        >
          <div className={styles.typeIcon}>{t.icon}</div>
          {t.label}
        </div>
      ))}
    </div>
  );
}
