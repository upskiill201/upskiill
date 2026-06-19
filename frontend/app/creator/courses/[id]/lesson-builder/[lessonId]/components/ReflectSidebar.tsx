'use client';

import React from 'react';
import { PenTool, CheckCircle2, Link as LinkIcon, Info } from 'lucide-react';
import { ReflectActivity } from './ReflectTab';
import styles from './ReflectSidebar.module.css';

interface Props {
  activity: ReflectActivity;
}

export function ReflectSidebar({ activity }: Props) {
  
  const renderOpenPreview = () => (
    <>
      {activity.prompt ? (
        <div 
          className={styles.promptText} 
          dangerouslySetInnerHTML={{ __html: activity.prompt }}
        />
      ) : (
        <div className={styles.promptPlaceholder}>
          What is the most important thing you learned in this lesson, and how will you apply it in your UI design work?
        </div>
      )}

      {activity.openConfig.useStarters && activity.openConfig.starters.length > 0 && (
        <div className={styles.startersSection}>
          <div className={styles.startersLabel}>Reflection starters <span className={styles.opt}>(optional)</span></div>
          <div className={styles.startersGrid}>
            {activity.openConfig.starters.map((s, i) => (
              s.text.trim() && <span key={i} className={styles.starterPill}>{s.text}</span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.responseArea}>
        <div className={styles.textareaPlaceholder}>Write your reflection here...</div>
        <div className={styles.responseFooter}>
          {activity.openConfig.required && activity.openConfig.minWordCount > 0 && (
            <span className={styles.wordReq}>Minimum {activity.openConfig.minWordCount} words</span>
          )}
          <span className={styles.wordCount}>0 / 1000 words</span>
        </div>
      </div>

      {activity.openConfig.peerVisibility && (
        <div className={styles.visibilityNote}>
          <Info size={12}/> Your reflection will be visible to your peers.
        </div>
      )}
    </>
  );

  const renderGuidedPreview = () => (
    <div className={styles.guidedList}>
      {activity.guidedConfig.questions.length > 0 ? (
        activity.guidedConfig.questions.map((q, i) => (
          <div key={i} className={styles.guidedItem}>
            <div className={styles.gQuestion}>
              <strong>Question {i + 1}:</strong><br/>
              {q.text || <span className={styles.gPlaceholder}>Your question here...</span>}
            </div>
            <div className={styles.responseArea}>
              <div className={styles.textareaPlaceholder}>Your answer here...</div>
              <div className={styles.responseFooter}>
                {activity.guidedConfig.required && activity.guidedConfig.minWordCountPerQuestion > 0 && (
                  <span className={styles.wordReq}>Minimum {activity.guidedConfig.minWordCountPerQuestion} words</span>
                )}
                <span className={styles.wordCount}>0 / 500 words</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.emptyGuided}>Add questions to see preview</div>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      
      {/* Student Preview */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Student Preview</h3>
          <p className={styles.cardSub}>This is how learners will experience the reflection step.</p>
        </div>
        
        <div className={styles.previewBox}>
          <div className={styles.pHeader}>
            <div className={styles.pIcon}><PenTool size={16}/></div>
            <span className={styles.pTitle}>{activity.type === 'open' ? 'Reflection' : 'Guided Reflection'}</span>
          </div>

          <div className={styles.pContent}>
            {activity.type === 'open' ? renderOpenPreview() : renderGuidedPreview()}
          </div>

          <button className={styles.submitBtn} disabled>Submit Reflection</button>
        </div>
      </div>

      {/* Activity Guidelines */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Activity Guidelines</h3>
        <ul className={styles.guidelinesList}>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Ask open-ended questions.</li>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Encourage deeper thinking and application.</li>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Provide helpful starters (optional).</li>
          <li><CheckCircle2 size={14} className={styles.checkIcon}/> Make it safe and meaningful.</li>
        </ul>
        <a href="#" className={styles.guideLink}>View Best Practices Guide <LinkIcon size={12}/></a>
      </div>

      {/* Lesson Progress (Mock reused pattern) */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Lesson Progress</h3>
        <div className={styles.progressRow}>
          <div className={styles.ring}>75%</div>
          <div>
            <div className={styles.pTitle}>Great progress!</div>
            <div className={styles.pSub}>Almost there. Complete the last step to publish.</div>
          </div>
        </div>
      </div>

    </div>
  );
}
