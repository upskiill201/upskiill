import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from '../LessonBuilder.module.css';

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onSave: (redirect?: string) => void;
  courseId: string;
  lesson?: any;
}

export function FooterNav({ currentTab, onTabChange, onSave, courseId, lesson }: Props) {
  const isLearnComplete = !!(lesson?.title && (lesson?.learnVideoUrl || lesson?.learnText));

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Lesson Builder Flow
        </div>
        <div className={styles.flowNav}>
          <div className={`${styles.flowStepBox} ${currentTab === 'learn' ? styles.active : ''}`}>
            <div className={styles.flowStepNumber}>
              {isLearnComplete && currentTab !== 'learn' ? <Check size={14} color="var(--success-green)" /> : '1'}
            </div>
            <div className={styles.flowStepText}>
              <span className={styles.flowStepTitle}>Learn</span>
              <span className={styles.flowStepStatus}>{isLearnComplete ? 'Completed' : 'Current'}</span>
            </div>
          </div>
          
          <ChevronRight size={20} className={styles.flowArrow} />
          
          <div className={`${styles.flowStepBox} ${currentTab === 'apply' ? styles.active : ''}`}>
            <div className={styles.flowStepNumber}>2</div>
            <div className={styles.flowStepText}>
              <span className={styles.flowStepTitle}>Apply</span>
              <span className={`${styles.flowStepStatus} ${styles.pending}`}>Pending</span>
            </div>
          </div>

          <ChevronRight size={20} className={styles.flowArrow} />
          
          <div className={`${styles.flowStepBox} ${currentTab === 'reflect' ? styles.active : ''}`}>
            <div className={styles.flowStepNumber}>3</div>
            <div className={styles.flowStepText}>
              <span className={styles.flowStepTitle}>Reflect</span>
              <span className={`${styles.flowStepStatus} ${styles.pending}`}>Pending</span>
            </div>
          </div>

          <ChevronRight size={20} className={styles.flowArrow} />
          
          <div className={`${styles.flowStepBox} ${currentTab === 'deepen' ? styles.active : ''}`}>
            <div className={styles.flowStepNumber}>4</div>
            <div className={styles.flowStepText}>
              <span className={styles.flowStepTitle}>Deepen</span>
              <span className={`${styles.flowStepStatus} ${styles.pending}`}>Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerActions}>
        <Button variant="outline" onClick={() => onSave(`/creator/builder/${courseId}`)}>
          Save & Back to Curriculum
        </Button>
        <Button 
          style={{ backgroundColor: 'var(--brand-blue)' }} 
          disabled={!isLearnComplete && currentTab === 'learn'}
          onClick={() => {
            if (currentTab === 'learn') {
              onTabChange('apply');
            } else {
              onSave();
            }
          }}
        >
          {currentTab === 'learn' ? 'Continue to Apply Step' : 'Save Changes'}
        </Button>
      </div>
    </footer>
  );
}
