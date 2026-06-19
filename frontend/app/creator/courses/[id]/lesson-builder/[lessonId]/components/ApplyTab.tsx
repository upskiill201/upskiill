'use client';

import React, { useRef, useState } from 'react';
import { Plus, Trash2, RotateCcw, Brain } from 'lucide-react';
import gsap from 'gsap';
import { QuestionCard, MCQQuestion, MCQOption } from './QuestionCard';
import { Dropdown } from '@/components/ui/Dropdown';
import styles from './ApplyTab.module.css';

export interface MCQActivity {
  scenario: string;
  passingScore: number;
  allowRetries: boolean;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  questions: MCQQuestion[];
}

function makeFreshQuestion(): MCQQuestion {
  const qId = `q_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const a: MCQOption = { id: `opt_${Date.now()}_a`, text: '', misconception: '' };
  const b: MCQOption = { id: `opt_${Date.now()}_b`, text: '', misconception: '' };
  return {
    id: qId,
    questionText: '',
    options: [a, b],
    correctOptionId: '',
    explanation: '',
  };
}

interface Props {
  activity: MCQActivity;
  onChange: (a: MCQActivity) => void;
}

export function ApplyTab({ activity, onChange }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [clearConfirm, setClearConfirm] = useState(false);

  const updateQuestion = (idx: number, q: MCQQuestion) => {
    const qs = [...activity.questions];
    qs[idx] = q;
    onChange({ ...activity, questions: qs });
  };

  const deleteQuestion = (idx: number, el: HTMLElement | null) => {
    const doDelete = () => {
      const qs = activity.questions.filter((_, i) => i !== idx);
      onChange({ ...activity, questions: qs });
    };
    if (el) {
      gsap.to(el, { opacity: 0, y: -16, scale: 0.97, duration: 0.25, ease: 'power2.in', onComplete: doDelete });
    } else {
      doDelete();
    }
  };

  const addQuestion = () => {
    if (activity.questions.length >= 50) return;
    onChange({ ...activity, questions: [...activity.questions, makeFreshQuestion()] });
    setTimeout(() => {
      listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const moveQuestion = (idx: number, dir: -1 | 1) => {
    const qs = [...activity.questions];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= qs.length) return;
    [qs[idx], qs[newIdx]] = [qs[newIdx], qs[idx]];
    onChange({ ...activity, questions: qs });
  };

  const clearAll = () => {
    onChange({ ...activity, questions: [] });
    setClearConfirm(false);
  };

  const validQuestions = activity.questions.filter(q =>
    q.questionText.trim() !== '' &&
    q.correctOptionId !== '' &&
    q.options.length >= 2
  );
  const isActivityComplete = validQuestions.length > 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.applyHeading}>
        <div>
          <h2 className={styles.applyTitle}>2. APPLY — Engage with Practice</h2>
          <p className={styles.applyDesc}>Build a multiple choice quiz so learners can test their understanding. Add up to 50 questions.</p>
        </div>
        <span className={styles.learnMore}>Learn more</span>
      </div>

      {/* Status badge */}
      <div className={styles.statusBanner}>
        <div className={`${styles.activityTypeBadge}`}>
          <Brain size={14} />
          Multiple Choice Questions
        </div>
        <div className={isActivityComplete ? styles.statusComplete : styles.statusIncomplete}>
          {isActivityComplete
            ? `${validQuestions.length} question${validQuestions.length !== 1 ? 's' : ''} ready`
            : 'No questions yet'}
        </div>
      </div>

      {/* Scenario / Context */}
      <div className={styles.scenarioSection}>
        <label className={styles.sectionLabel}>
          Scenario / Context <span className={styles.optionalLabel}>(Optional)</span>
        </label>
        <p className={styles.sectionHint}>Help learners understand the real-world context for this activity.</p>
        <div className={styles.scenarioWrap}>
          <textarea
            className={styles.scenarioTextarea}
            value={activity.scenario}
            onChange={e => onChange({ ...activity, scenario: e.target.value })}
            placeholder="You're working on a new feature for a productivity app. The team has divided the project into tasks and subtasks..."
            rows={3}
            maxLength={500}
          />
          <span className={styles.scenarioCount}>{activity.scenario.length}/500</span>
        </div>
      </div>

      {/* Questions */}
      <div className={styles.questionsSection}>
        <div className={styles.questionsSectionHeader}>
          <div className={styles.questionsSectionLeft}>
            <label className={styles.sectionLabel}>Questions in this activity</label>
            <span className={styles.questionCount}>{activity.questions.length}/50</span>
          </div>
          {activity.questions.length > 0 && (
            clearConfirm ? (
              <div className={styles.clearConfirmRow}>
                <span className={styles.clearConfirmText}>Clear all questions?</span>
                <button className={styles.clearConfirmYes} onClick={clearAll}>Yes, clear all</button>
                <button className={styles.clearConfirmNo} onClick={() => setClearConfirm(false)}>Cancel</button>
              </div>
            ) : (
              <button className={styles.clearAllBtn} onClick={() => setClearConfirm(true)}>
                <RotateCcw size={13} /> Clear all
              </button>
            )
          )}
        </div>

        {/* Question list */}
        <div className={styles.questionList} ref={listRef}>
          {activity.questions.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <Brain size={28} />
              </div>
              <div className={styles.emptyStateTitle}>No questions yet</div>
              <p className={styles.emptyStateDesc}>Add your first question to start building the quiz activity.</p>
              <button className={styles.emptyAddBtn} onClick={addQuestion}>
                <Plus size={15} /> Add First Question
              </button>
            </div>
          ) : (
            activity.questions.map((q, i) => {
              const cardRef = React.createRef<HTMLDivElement>();
              return (
                <div key={q.id} ref={cardRef}>
                  <QuestionCard
                    question={q}
                    index={i}
                    total={activity.questions.length}
                    onChange={(updated) => updateQuestion(i, updated)}
                    onDelete={() => deleteQuestion(i, cardRef.current)}
                    onMoveUp={() => moveQuestion(i, -1)}
                    onMoveDown={() => moveQuestion(i, 1)}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Add question button */}
        {activity.questions.length > 0 && activity.questions.length < 50 && (
          <button className={styles.addQuestionBtn} onClick={addQuestion}>
            <Plus size={16} /> Add Question {activity.questions.length + 1}
          </button>
        )}
      </div>

      {/* Settings footer */}
      {activity.questions.length > 0 && (
        <div className={styles.settingsRow}>
          <div className={styles.settingItem}>
            <div className={styles.settingTextGroup}>
              <label className={styles.settingLabel}>Difficulty Level</label>
              <div className={styles.settingDesc}>Sets the expected challenge.</div>
            </div>
            <Dropdown
              options={[
                { label: 'Easy', value: 'easy' },
                { label: 'Medium', value: 'medium' },
                { label: 'Hard', value: 'hard' }
              ]}
              value={activity.difficultyLevel}
              onChange={(val) => onChange({ ...activity, difficultyLevel: val as any })}
              width="120px"
            />
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingTextGroup}>
              <label className={styles.settingLabel}>Passing Score</label>
              <div className={styles.settingDesc}>Minimum % to proceed.</div>
            </div>
            <Dropdown
              options={[50, 60, 70, 80, 90, 100].map(s => ({ label: `${s}%`, value: s.toString() }))}
              value={activity.passingScore.toString()}
              onChange={(val) => onChange({ ...activity, passingScore: parseInt(val) })}
              width="100px"
            />
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingTextGroup}>
              <label className={styles.settingLabel}>Allow Retries</label>
              <div className={styles.settingDesc}>Can try again if failed.</div>
            </div>
            <button
              className={`${styles.toggleBtn} ${activity.allowRetries ? styles.toggleActive : ''}`}
              onClick={() => onChange({ ...activity, allowRetries: !activity.allowRetries })}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      )}

      {/* Passing Score Info Banner */}
      {activity.questions.length > 0 && (
        <div className={styles.scoreInfoBanner}>
          <div className={styles.scoreInfoIcon}><Brain size={14} /></div>
          <div className={styles.scoreInfoText}>
            With <strong>{activity.questions.length}</strong> question{activity.questions.length !== 1 ? 's' : ''}, 
            students need at least <strong>{Math.ceil((activity.passingScore / 100) * activity.questions.length)}</strong> correct 
            to pass ({Math.round((Math.ceil((activity.passingScore / 100) * activity.questions.length) / activity.questions.length) * 100)}%).
            {activity.questions.length < 3 && activity.passingScore > 0 && (
              <span className={styles.scoreInfoWarning}>
                {' '}We recommend adding at least 3 questions for a more balanced score distribution.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
