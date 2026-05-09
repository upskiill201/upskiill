import React from 'react';
import { ChevronRight, Save } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from '../LessonBuilder.module.css';

interface FooterNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onSave: (redirect?: string) => void;
  courseId: string;
}

export function FooterNav({ currentTab, onTabChange, onSave, courseId }: FooterNavProps) {
  const tabs = ['learn', 'apply', 'reflect', 'deepen'];

  const getTabLabel = (id: string) => {
    switch(id) {
      case 'learn': return { title: 'Learn', subtitle: 'Teach the concept' };
      case 'apply': return { title: 'Apply', subtitle: 'Engage with practice' };
      case 'reflect': return { title: 'Reflect', subtitle: 'Reinforce learning' };
      case 'deepen': return { title: 'Deepen', subtitle: 'Provide more resources' };
      default: return { title: '', subtitle: '' };
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <div className="text-sm font-bold text-gray-900 mb-0.5">Lesson Builder Flow</div>
        <div className="text-xs text-gray-500 mb-3">Build each step to create a complete learning experience.</div>
        <div className={styles.flowNav}>
          {tabs.map((tab, idx) => {
            const isActive = currentTab === tab;
            // Temporary logic for mocking complete state
            const isCompleted = idx < tabs.indexOf(currentTab) || (tab === 'learn' && currentTab !== 'learn');
            const { title, subtitle } = getTabLabel(tab);

            return (
              <React.Fragment key={tab}>
                <div
                  className={`${styles.flowStep} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                  onClick={() => onTabChange(tab)}
                >
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${isActive ? 'bg-indigo-600 text-white' : isCompleted ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {isCompleted && !isActive ? '✓' : idx + 1}
                  </div>
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${isActive ? 'text-indigo-900' : 'text-gray-900'}`}>{title}</span>
                      {isCompleted && !isActive && <span className="text-[10px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">Completed</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-normal">{subtitle}</span>
                      {!isCompleted && !isActive && <span className="text-[10px] font-medium text-gray-500">Not started</span>}
                    </div>
                  </div>
                </div>
                {idx < tabs.length - 1 && <ChevronRight size={16} color="#CBD5E1" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className={styles.footerActions}>
        <Button variant="outline" onClick={() => onSave(`/creator/courses/${courseId}/manage`)}>
          <Save size={16} className="mr-2" />
          Save & Exit
        </Button>
        <Button onClick={() => onSave(`/creator/courses/${courseId}/manage`)} className="bg-indigo-700 hover:bg-indigo-800 flex items-center gap-3 px-6 h-auto py-2">
          <Save size={20} className="text-indigo-200" />
          <div className="flex flex-col items-start text-left">
            <span className="font-bold text-sm text-white">Save & Back to Curriculum</span>
            <span className="text-[10px] text-indigo-200 font-normal">All progress will be saved</span>
          </div>
        </Button>
      </div>
    </footer>
  );
}
