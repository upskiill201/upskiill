'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PenTool, CheckCircle2, AlertCircle, GripVertical, Plus, Trash2, HelpCircle, AlignLeft, List, Star, Mic } from 'lucide-react';
import gsap from 'gsap';
import styles from './ReflectTab.module.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export interface ReflectionStarter {
  id: string;
  text: string;
}

export interface GuidedQuestion {
  id: string;
  text: string;
}

export interface ReflectActivity {
  prompt: string;
  type: 'open' | 'guided' | 'rating' | 'audio_video';
  openConfig: {
    useStarters: boolean;
    starters: ReflectionStarter[];
    minWordCount: number;
    required: boolean;
    peerVisibility: boolean;
    allowComments: boolean;
    allowAttachments: boolean;
  };
  guidedConfig: {
    questions: GuidedQuestion[];
    minWordCountPerQuestion: number;
    required: boolean;
    allowAttachments: boolean;
  };
}

interface Props {
  activity: ReflectActivity;
  onChange: (a: ReflectActivity) => void;
}

const QUILL_MODULES = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'link']
  ],
};

export function ReflectTab({ activity, onChange }: Props) {
  const [activeType, setActiveType] = useState(activity.type);
  const configWrapperRef = useRef<HTMLDivElement>(null);

  // Transition config sections
  useEffect(() => {
    if (activity.type !== activeType) {
      if (configWrapperRef.current) {
        gsap.to(configWrapperRef.current, { opacity: 0, duration: 0.15, onComplete: () => {
          onChange({ ...activity, type: activeType });
          gsap.to(configWrapperRef.current, { opacity: 1, duration: 0.15 });
        }});
      } else {
        onChange({ ...activity, type: activeType });
      }
    }
  }, [activeType]);

  const handlePromptChange = (val: string) => {
    onChange({ ...activity, prompt: val });
  };

  const handleTypeSelect = (type: ReflectActivity['type']) => {
    if (type === 'rating' || type === 'audio_video') return; // Phase 2
    setActiveType(type);
  };

  const promptTextLen = (activity.prompt || '').replace(/<[^>]*>?/gm, '').length;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headingArea}>
        <div>
          <h2 className={styles.title}>3. REFLECT — Reinforce Learning</h2>
          <p className={styles.desc}>Help learners pause, process and articulate what they've learned.</p>
        </div>
        <span className={styles.learnMore}>Learn more</span>
      </div>

      <div className={styles.layoutGrid}>
        <div className={styles.mainCol}>
          
          {/* Section 1: Prompt */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>1. Reflection Prompt <span className={styles.req}>*</span></h3>
              <p className={styles.sectionSub}>Ask a thoughtful question that encourages deeper reflection.</p>
            </div>
            
            <div className={styles.editorWrap}>
              <ReactQuill 
                theme="snow" 
                value={activity.prompt} 
                onChange={handlePromptChange}
                modules={QUILL_MODULES}
                placeholder="What is the most important thing you learned in this lesson, and how will you apply it..."
              />
              <div className={`${styles.charCount} ${promptTextLen > 400 ? styles.charCountAmber : ''} ${promptTextLen > 500 ? styles.charCountRed : ''}`}>
                {promptTextLen}/500
              </div>
              
              <div className={styles.tipsBox}>
                <div className={styles.tipsIcon}><HelpCircle size={14}/></div>
                <div className={styles.tipsText}>
                  <strong>Tips:</strong> Use "What", "How", "Why" questions. Encourage application, not just recall.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Starters (Open Only) */}
          {activity.type === 'open' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>2. Suggested Reflection Starters <span className={styles.opt}>(Optional)</span></h3>
                <p className={styles.sectionSub}>Provide examples or ideas to help learners think.</p>
              </div>
              
              <div className={styles.startersWrap}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', marginBottom: '8px' }} onClick={() => onChange({ ...activity, openConfig: { ...activity.openConfig, useStarters: !activity.openConfig.useStarters } })}>
                  <button
                    className={`${styles.toggleBtn} ${activity.openConfig.useStarters ? styles.toggleActive : ''}`}
                    onClick={(e) => { e.stopPropagation(); onChange({ ...activity, openConfig: { ...activity.openConfig, useStarters: !activity.openConfig.useStarters } }); }}
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>Use reflection starters</span>
                </div>

                {activity.openConfig.useStarters && (
                  <div className={styles.startersList}>
                    {activity.openConfig.starters.map((s, i) => (
                      <div key={s.id} className={styles.starterItem}>
                        <div className={styles.starterDrag}><GripVertical size={14}/></div>
                        <input 
                          type="text" 
                          className={styles.starterInput}
                          value={s.text}
                          onChange={(e) => {
                            const newStarters = [...activity.openConfig.starters];
                            newStarters[i].text = e.target.value;
                            onChange({ ...activity, openConfig: { ...activity.openConfig, starters: newStarters } });
                          }}
                          placeholder="I learned that..."
                          maxLength={50}
                        />
                        <button 
                          className={styles.starterDel}
                          onClick={() => {
                            if (activity.openConfig.starters.length <= 1) return;
                            const newStarters = activity.openConfig.starters.filter((_, idx) => idx !== i);
                            onChange({ ...activity, openConfig: { ...activity.openConfig, starters: newStarters } });
                          }}
                          disabled={activity.openConfig.starters.length <= 1}
                        >
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    ))}
                    
                    <button 
                      className={styles.addStarterBtn}
                      onClick={() => {
                        onChange({
                          ...activity,
                          openConfig: {
                            ...activity.openConfig,
                            starters: [...activity.openConfig.starters, { id: `s_${Date.now()}`, text: '' }]
                          }
                        });
                      }}
                    >
                      <Plus size={14}/> Add Starter
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Guided Questions (Guided Only) */}
          {activity.type === 'guided' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>2. Guided Reflection Questions</h3>
                <p className={styles.sectionSub}>Ask specific questions to guide thinking.</p>
              </div>
              
              <div className={styles.questionsList}>
                {activity.guidedConfig.questions.map((q, i) => (
                  <div key={q.id} className={styles.qItem}>
                    <div className={styles.qHeader}>
                      <span className={styles.qLabel}>Question {i + 1} <span className={styles.req}>*</span></span>
                      <button 
                        className={styles.qDel}
                        onClick={() => {
                          if (activity.guidedConfig.questions.length <= 1) return;
                          const nq = activity.guidedConfig.questions.filter((_, idx) => idx !== i);
                          onChange({ ...activity, guidedConfig: { ...activity.guidedConfig, questions: nq } });
                        }}
                      >
                        <Trash2 size={14}/>
                      </button>
                    </div>
                    <div className={styles.qInputWrap}>
                      <input 
                        type="text" 
                        className={styles.qInput}
                        value={q.text}
                        onChange={(e) => {
                          const nq = [...activity.guidedConfig.questions];
                          nq[i].text = e.target.value;
                          onChange({ ...activity, guidedConfig: { ...activity.guidedConfig, questions: nq } });
                        }}
                        placeholder="What is the most important thing you learned?"
                        maxLength={200}
                      />
                      <span className={styles.qCharCount}>{q.text.length}/200</span>
                    </div>
                  </div>
                ))}
                
                <button 
                  className={styles.addStarterBtn}
                  onClick={() => {
                    onChange({
                      ...activity,
                      guidedConfig: {
                        ...activity.guidedConfig,
                        questions: [...activity.guidedConfig.questions, { id: `q_${Date.now()}`, text: '' }]
                      }
                    });
                  }}
                >
                  <Plus size={14}/> Add Question
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.sideCol}>
          
          {/* Section 3: Reflection Type */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>3. Reflection Type</h3>
              <p className={styles.sectionSub}>Choose how students will reflect.</p>
            </div>
            
            <div className={styles.typeCards}>
              <div 
                className={`${styles.typeCard} ${activeType === 'open' ? styles.typeActive : ''}`}
                onClick={() => handleTypeSelect('open')}
              >
                <div className={styles.typeRadio}>
                  <div className={styles.typeRadioDot} />
                </div>
                <div className={styles.typeIcon}><AlignLeft size={16}/></div>
                <div className={styles.typeContent}>
                  <div className={styles.typeTitle}>Open Reflection</div>
                  <div className={styles.typeDesc}>Learners write freely in their own words.</div>
                </div>
              </div>
              
              <div 
                className={`${styles.typeCard} ${activeType === 'guided' ? styles.typeActive : ''}`}
                onClick={() => handleTypeSelect('guided')}
              >
                <div className={styles.typeRadio}>
                  <div className={styles.typeRadioDot} />
                </div>
                <div className={styles.typeIcon}><List size={16}/></div>
                <div className={styles.typeContent}>
                  <div className={styles.typeTitle}>Guided Reflection</div>
                  <div className={styles.typeDesc}>Learners answer specific guided questions.</div>
                </div>
              </div>

              <div className={`${styles.typeCard} ${styles.typeDisabled}`}>
                <div className={styles.typeRadio}/>
                <div className={styles.typeIcon}><Star size={16}/></div>
                <div className={styles.typeContent}>
                  <div className={styles.typeTitle}>Rating + Reflection</div>
                  <div className={styles.typeDesc}>Phase 2 feature</div>
                </div>
              </div>

              <div className={`${styles.typeCard} ${styles.typeDisabled}`}>
                <div className={styles.typeRadio}/>
                <div className={styles.typeIcon}><Mic size={16}/></div>
                <div className={styles.typeContent}>
                  <div className={styles.typeTitle}>Audio / Video Reflection</div>
                  <div className={styles.typeDesc}>Phase 2 feature</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Settings */}
          <div className={styles.section} ref={configWrapperRef}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>4. Reflection Settings</h3>
            </div>
            
            <div className={styles.settingsList}>
              {activeType === 'open' ? (
                <>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Make reflection required to complete lesson</div>
                    <button
                      className={`${styles.toggleBtn} ${activity.openConfig.required ? styles.toggleActive : ''}`}
                      onClick={() => onChange({ ...activity, openConfig: { ...activity.openConfig, required: !activity.openConfig.required } })}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Minimum word count</div>
                    <div className={styles.settingInputWrap}>
                      <input 
                        type="number" 
                        min={0}
                        className={styles.settingNum}
                        value={activity.openConfig.minWordCount}
                        onChange={(e) => onChange({ ...activity, openConfig: { ...activity.openConfig, minWordCount: parseInt(e.target.value) || 0 } })}
                      />
                      <span>words</span>
                    </div>
                  </div>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Enable peer visibility <HelpCircle size={12} className={styles.infoIcon}/></div>
                    <button
                      className={`${styles.toggleBtn} ${activity.openConfig.peerVisibility ? styles.toggleActive : ''}`}
                      onClick={() => onChange({ ...activity, openConfig: { ...activity.openConfig, peerVisibility: !activity.openConfig.peerVisibility } })}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Allow learners to like and comment</div>
                    <button
                      className={`${styles.toggleBtn} ${activity.openConfig.allowComments ? styles.toggleActive : ''}`}
                      onClick={() => onChange({ ...activity, openConfig: { ...activity.openConfig, allowComments: !activity.openConfig.allowComments } })}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Allow attachments (images, files)</div>
                    <button
                      className={`${styles.toggleBtn} ${activity.openConfig.allowAttachments ? styles.toggleActive : ''}`}
                      onClick={() => onChange({ ...activity, openConfig: { ...activity.openConfig, allowAttachments: !activity.openConfig.allowAttachments } })}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Make reflection required</div>
                    <button
                      className={`${styles.toggleBtn} ${activity.guidedConfig.required ? styles.toggleActive : ''}`}
                      onClick={() => onChange({ ...activity, guidedConfig: { ...activity.guidedConfig, required: !activity.guidedConfig.required } })}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Minimum word count per answer</div>
                    <div className={styles.settingInputWrap}>
                      <input 
                        type="number" 
                        min={0}
                        className={styles.settingNum}
                        value={activity.guidedConfig.minWordCountPerQuestion}
                        onChange={(e) => onChange({ ...activity, guidedConfig: { ...activity.guidedConfig, minWordCountPerQuestion: parseInt(e.target.value) || 0 } })}
                      />
                      <span>words</span>
                    </div>
                  </div>
                  <div className={styles.settingRow}>
                    <div className={styles.settingText}>Allow attachments</div>
                    <button
                      className={`${styles.toggleBtn} ${activity.guidedConfig.allowAttachments ? styles.toggleActive : ''}`}
                      onClick={() => onChange({ ...activity, guidedConfig: { ...activity.guidedConfig, allowAttachments: !activity.guidedConfig.allowAttachments } })}
                    >
                      <span className={styles.toggleThumb} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
