'use client';

import React, { useState } from 'react';
import { CheckCircle2, Brain, AlertCircle } from 'lucide-react';
import { MCQActivity } from './ApplyTab';
import { MCQOption } from './QuestionCard';
import styles from './ApplySidebar.module.css';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface Props {
  activity: MCQActivity;
}

export function ApplySidebar({ activity }: Props) {
  const firstQuestion = activity.questions[0];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Reset preview when first question changes
  React.useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
  }, [firstQuestion?.id]);

  const totalQuestions = activity.questions.length;
  const validQuestions = activity.questions.filter(q =>
    q.questionText.trim() && q.correctOptionId && q.options.length >= 2
  );

  return (
    <>
      {/* Activity Preview */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Activity Preview</h3>
          <span className={styles.cardSub}>As student will see it</span>
        </div>

        {!firstQuestion || !firstQuestion.questionText.trim() ? (
          <div className={styles.previewEmpty}>
            <Brain size={22} className={styles.previewEmptyIcon} />
            <p>Add questions to see the live preview here.</p>
          </div>
        ) : (
          <div className={styles.previewBox}>
            {activity.scenario && (
              <div className={styles.previewScenario}>{activity.scenario}</div>
            )}

            <div className={styles.previewMeta}>
              Question 1 of {totalQuestions || 1}
            </div>
            <div className={styles.previewQuestionText}>
              {firstQuestion.questionText}
            </div>

            <div className={styles.previewOptions}>
              {firstQuestion.options.map((opt: MCQOption, oi: number) => {
                const letter = OPTION_LETTERS[oi];
                const isSelected = selectedOption === opt.id;
                const isCorrect = firstQuestion.correctOptionId === opt.id;
                let cls = styles.previewOption;
                if (submitted && isSelected && isCorrect) cls = `${styles.previewOption} ${styles.optCorrect}`;
                else if (submitted && isSelected) cls = `${styles.previewOption} ${styles.optWrong}`;
                else if (isSelected) cls = `${styles.previewOption} ${styles.optSelected}`;
                return (
                  <button
                    key={opt.id}
                    className={cls}
                    onClick={() => !submitted && setSelectedOption(opt.id)}
                    disabled={submitted}
                    type="button"
                  >
                    <span className={styles.optLetter}>{letter}</span>
                    <span>{opt.text || <em style={{ color: '#94A3B8' }}>Option {letter}</em>}</span>
                  </button>
                );
              })}
            </div>

            {!submitted ? (
              <button
                className={styles.submitBtn}
                onClick={() => selectedOption && setSubmitted(true)}
                disabled={!selectedOption}
                type="button"
              >
                Submit Answer
              </button>
            ) : (
              <div className={`${styles.feedbackBox} ${selectedOption === firstQuestion.correctOptionId ? styles.feedbackGreen : styles.feedbackRed}`}>
                {selectedOption === firstQuestion.correctOptionId ? (
                  <>
                    <CheckCircle2 size={14} />
                    {firstQuestion.explanation || 'Correct! Well done.'}
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} />
                    {firstQuestion.options.find(o => o.id === selectedOption)?.misconception || 'Not quite. Review the concept and try again.'}
                  </>
                )}
              </div>
            )}

            {submitted && (
              <button
                className={styles.retryBtn}
                onClick={() => { setSelectedOption(null); setSubmitted(false); }}
                type="button"
              >
                Try again
              </button>
            )}

            {/* Correct answer indicator for creator */}
            {firstQuestion.correctOptionId && (
              <div className={styles.correctIndicator}>
                <CheckCircle2 size={11} />
                Correct answer: {OPTION_LETTERS[firstQuestion.options.findIndex(o => o.id === firstQuestion.correctOptionId)] ?? '?'}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Activity Guidelines */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Activity Guidelines</h3>
        <div className={styles.guidelinesList}>
          {[
            'Ask clear, unambiguous questions',
            'Ensure only one answer is definitively correct',
            'Make distractors plausible but clearly wrong',
            'Use misconception text to teach, not just correct',
            'Add an explanation for every question',
          ].map((g, i) => (
            <div key={i} className={styles.guidelineItem}>
              <CheckCircle2 size={13} className={styles.guidelineIcon} />
              <span>{g}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Stats */}
      {totalQuestions > 0 && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Quiz Stats</h3>
          <div className={styles.statsList}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Total questions</span>
              <span className={styles.statValue}>{totalQuestions}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Ready to publish</span>
              <span className={`${styles.statValue} ${validQuestions.length === totalQuestions ? styles.statGreen : styles.statAmber}`}>
                {validQuestions.length}/{totalQuestions}
              </span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Difficulty</span>
              <span className={styles.statValue} style={{ textTransform: 'capitalize' }}>{activity.difficultyLevel}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Passing score</span>
              <span className={styles.statValue}>{activity.passingScore}%</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Retries allowed</span>
              <span className={`${styles.statValue} ${activity.allowRetries ? styles.statGreen : styles.statAmber}`}>
                {activity.allowRetries ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
