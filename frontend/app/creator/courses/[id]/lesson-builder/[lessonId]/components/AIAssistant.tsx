import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import styles from '../LessonBuilder.module.css';

interface Props {
  onApplyAI: (result: string) => void;
}

export function AIAssistant({ onApplyAI }: Props) {
  const chips = [
    "Improve explanation",
    "Add real-world examples",
    "Simplify terminology"
  ];

  return (
    <div className={styles.aiBlock}>
      <div className={styles.aiHeader}>
        <Sparkles size={16} className={styles.aiIcon} />
        Teyro AI Assistant
      </div>
      <p className={styles.aiDesc}>Need help teaching this concept? Ask Teyro to improve your script or text.</p>
      
      <div className={styles.aiChips}>
        {chips.map((chip, i) => (
          <button key={i} className={styles.aiChip}>
            {chip}
          </button>
        ))}
      </div>

      <div className={styles.aiInputWrapper}>
        <input 
          type="text" 
          className={styles.aiInput} 
          placeholder="e.g. Can you make this sound more professional?"
        />
        <button className={styles.aiGenerateBtn}>
          <Sparkles size={14} /> Generate
        </button>
      </div>

      <div className={styles.aiMascot}>
        <div className={styles.aiMascotInner}>
          {/* Using a star icon as a placeholder for the Mascot */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
      </div>
    </div>
  );
}
