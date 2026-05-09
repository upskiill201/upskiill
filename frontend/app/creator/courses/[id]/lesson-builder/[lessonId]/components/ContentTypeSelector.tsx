import React from 'react';
import { Video, FileText, Headphones, MousePointer2 } from 'lucide-react';
import styles from '../LessonBuilder.module.css';

interface ContentTypeProps {
  selected: string;
  onChange: (val: string) => void;
}

export function ContentTypeSelector({ selected, onChange }: ContentTypeProps) {
  const types = [
    { id: 'video', label: 'Video', icon: Video },
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'demo', label: 'Interactive Demo', icon: MousePointer2 },
  ];

  return (
    <div className="flex gap-2">
      {types.map(t => {
        const Icon = t.icon;
        const isActive = selected === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
              isActive ? 'border-indigo-600 text-indigo-700 bg-indigo-50' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon size={16} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
