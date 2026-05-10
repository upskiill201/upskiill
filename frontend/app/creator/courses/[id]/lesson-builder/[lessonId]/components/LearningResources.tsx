import React, { useRef } from 'react';
import { Plus, FileText, Image as ImageIcon, Link as LinkIcon, MoreVertical, Trash2 } from 'lucide-react';
import styles from '../LessonBuilder.module.css';

export interface ResourceItem {
  id: string;
  title: string;
  type: string;   // 'pdf' | 'pptx' | 'fig' | 'link'
  size?: string;
  time?: string;
  url: string;
}

interface Props {
  resources: ResourceItem[];
  onChange: (r: ResourceItem[]) => void;
}

function iconClass(type: string) {
  if (type === 'pdf')  return styles.iconPdf;
  if (type === 'pptx') return styles.iconPptx;
  if (type === 'fig')  return styles.iconFig;
  return styles.iconLink;
}

function typeLabel(type: string) {
  if (type === 'pdf')  return 'PDF';
  if (type === 'pptx') return 'PPTX';
  if (type === 'fig')  return 'FIG';
  return 'LINK';
}

export function LearningResources({ resources, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'pdf';
    const type = ['png','jpg','fig','svg'].includes(ext) ? 'fig'
               : ['ppt','pptx'].includes(ext) ? 'pptx'
               : ext === 'pdf' ? 'pdf' : 'link';
    onChange([...resources, {
      id: Date.now().toString(),
      title: file.name,
      type,
      size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
      time: '5 min',
      url: '#',
    }]);
    e.target.value = '';
  };

  const remove = (id: string) => onChange(resources.filter(r => r.id !== id));

  return (
    <div className={styles.resourcesPanel}>
      <div className={styles.resourcesHeader}>
        <div>
          <span className={styles.resourcesLabel}>3. Add Learning Resources</span>
          <span className={styles.resourcesOptional}> (Optional)</span>
        </div>
        <button className={styles.addResourceBtn} onClick={() => fileRef.current?.click()}>
          <Plus size={14} /> Add Resource
        </button>
        <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={handleFile} />
      </div>
      <p className={styles.resourcesSubtext}>Upload supporting materials that help learners go deeper.</p>

      {resources.length === 0 ? (
        <div className={styles.resourcesEmpty}>No resources attached yet.</div>
      ) : (
        <div className={styles.resourceList}>
          {resources.map(r => (
            <div key={r.id} className={styles.resourceRow}>
              <div className={styles.resourceLeft}>
                <div className={`${styles.resourceIcon} ${iconClass(r.type)}`}>
                  {typeLabel(r.type)}
                </div>
                <div>
                  <div className={styles.resourceName}>{r.title}</div>
                  <div className={styles.resourceMeta}>{typeLabel(r.type)} · {r.size}</div>
                </div>
              </div>
              <div className={styles.resourceRight}>
                <span className={styles.resourceTime}>{r.time}</span>
                <button className={styles.resourceMenuBtn} onClick={() => remove(r.id)} title="Remove">
                  <MoreVertical size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {resources.length > 0 && (
        <div className={styles.resourcesFooter}>
          <span>{resources.length} resource{resources.length !== 1 ? 's' : ''} attached</span>
          <span>Max 10 per lesson</span>
        </div>
      )}
    </div>
  );
}
