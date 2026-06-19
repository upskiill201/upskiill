'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  GripVertical, Plus, Trash2, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle2, Eye, EyeOff, Check
} from 'lucide-react';
import gsap from 'gsap';
import styles from './QuestionCard.module.css';

export interface MCQOption {
  id: string;
  text: string;
  misconception?: string;
}

export interface MCQQuestion {
  id: string;
  questionText: string;
  options: MCQOption[];
  correctOptionId: string;
  explanation: string;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

interface QuestionCardProps {
  question: MCQQuestion;
  index: number;
  total: number;
  onChange: (q: MCQQuestion) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
}

export function QuestionCard({
  question, index, total, onChange, onDelete, onMoveUp, onMoveDown,
  dragHandleProps, isDragging
}: QuestionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expandedMisconceptions, setExpandedMisconceptions] = useState<Record<string, boolean>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [previewSelected, setPreviewSelected] = useState<string | null>(null);
  const [previewSubmitted, setPreviewSubmitted] = useState(false);

  // Entrance animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      );
    }
  }, []);

  const updateOption = (optId: string, patch: Partial<MCQOption>) => {
    onChange({
      ...question,
      options: question.options.map(o => o.id === optId ? { ...o, ...patch } : o)
    });
  };

  const addOption = () => {
    if (question.options.length >= 6) return;
    const newOption: MCQOption = { id: `opt_${Date.now()}`, text: '', misconception: '' };
    onChange({ ...question, options: [...question.options, newOption] });
  };

  const removeOption = (optId: string, el: HTMLElement | null) => {
    if (question.options.length <= 2) return;
    const doRemove = () => {
      const newOptions = question.options.filter(o => o.id !== optId);
      onChange({
        ...question,
        options: newOptions,
        correctOptionId: question.correctOptionId === optId ? '' : question.correctOptionId
      });
    };
    if (el) {
      gsap.to(el, { opacity: 0, x: -20, height: 0, marginBottom: 0, padding: 0, duration: 0.25, ease: 'power2.in', onComplete: doRemove });
    } else {
      doRemove();
    }
  };

  const toggleMisconception = (optId: string) => {
    setExpandedMisconceptions(p => ({ ...p, [optId]: !p[optId] }));
  };

  const qTextLen = question.questionText.length;
  const expLen = question.explanation.length;
  const hasError = !question.correctOptionId || question.questionText.trim() === '' || question.options.length < 2;

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isDragging ? styles.dragging : ''} ${hasError ? styles.hasError : ''}`}
    >
      {/* Card Header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderLeft}>
          <div className={styles.dragHandle} {...dragHandleProps}>
            <GripVertical size={16} />
          </div>
          <div className={styles.questionBadge}>Q{index + 1}</div>
          {hasError && <AlertCircle size={14} className={styles.errorIcon} />}
          {!hasError && <CheckCircle2 size={14} className={styles.successIcon} />}
        </div>
        <div className={styles.cardHeaderRight}>
          <button
            className={styles.moveBtn}
            onClick={onMoveUp}
            disabled={index === 0}
            title="Move up"
          >
            <ChevronUp size={14} />
          </button>
          <button
            className={styles.moveBtn}
            onClick={onMoveDown}
            disabled={index === total - 1}
            title="Move down"
          >
            <ChevronDown size={14} />
          </button>
          <button
            className={`${styles.previewBtn} ${showPreview ? styles.previewBtnActive : ''}`}
            onClick={() => { setShowPreview(p => !p); setPreviewSelected(null); setPreviewSubmitted(false); }}
            title="Preview question"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <button className={styles.deleteBtn} onClick={onDelete} title="Delete question">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Question Text <span className={styles.required}>*</span>
        </label>
        <div className={styles.textareaWrap}>
          <textarea
            className={`${styles.textarea} ${qTextLen > 200 ? styles.textareaError : ''}`}
            value={question.questionText}
            onChange={e => onChange({ ...question, questionText: e.target.value })}
            placeholder="Enter your question here..."
            rows={2}
            maxLength={250}
          />
          <span className={`${styles.charCount} ${qTextLen > 180 ? styles.charCountAmber : ''} ${qTextLen > 200 ? styles.charCountRed : ''}`}>
            {qTextLen}/200
          </span>
        </div>
        {question.questionText.trim() === '' && (
          <p className={styles.inlineError}><AlertCircle size={12} /> Question text is required</p>
        )}
      </div>

      {/* Options */}
      <div className={styles.optionsSection}>
        <div className={styles.optionsSectionHeader}>
          <label className={styles.fieldLabel}>Options <span className={styles.hint}>(min 2, max 6)</span></label>
          {!question.correctOptionId && (
            <span className={styles.correctAnswerError}><AlertCircle size={12} /> Select a correct answer</span>
          )}
        </div>

        {question.options.map((opt, oi) => {
          const letter = OPTION_LETTERS[oi] || '?';
          const isCorrect = question.correctOptionId === opt.id;
          const optTextLen = opt.text.length;
          const optRef = React.createRef<HTMLDivElement>();

          return (
            <div
              key={opt.id}
              ref={optRef}
              className={`${styles.optionCard} ${isCorrect ? styles.optionCorrect : ''}`}
            >
              <div className={styles.optionTop}>
                {/* Correct answer radio */}
                <button
                  className={`${styles.radioBtn} ${isCorrect ? styles.radioBtnActive : ''}`}
                  onClick={() => onChange({ ...question, correctOptionId: opt.id })}
                  title="Mark as correct answer"
                  type="button"
                >
                  {isCorrect && <span className={styles.radioDot} />}
                </button>

                {/* Letter badge */}
                <span className={`${styles.optionLetter} ${isCorrect ? styles.optionLetterCorrect : ''}`}>
                  {letter}
                </span>

                {/* Text input */}
                <div className={styles.optionInputWrap}>
                  <input
                    type="text"
                    className={`${styles.optionInput} ${optTextLen > 100 ? styles.optionInputError : ''}`}
                    value={opt.text}
                    onChange={e => updateOption(opt.id, { text: e.target.value })}
                    placeholder={`Option ${letter}...`}
                    maxLength={120}
                  />
                  <span className={`${styles.optionCharCount} ${optTextLen > 90 ? styles.charCountAmber : ''} ${optTextLen > 100 ? styles.charCountRed : ''}`}>
                    {optTextLen}/100
                  </span>
                </div>

                {/* Delete option */}
                <button
                  className={styles.optionDeleteBtn}
                  onClick={() => removeOption(opt.id, optRef.current)}
                  disabled={question.options.length <= 2}
                  title="Delete option"
                  type="button"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Correct badge */}
              {isCorrect && (
                <div className={styles.correctBadge}>
                  <Check size={11} /> Correct answer
                </div>
              )}

              {/* Misconception toggle (only for wrong answers) */}
              {!isCorrect && (
                <div className={styles.misconceptionSection}>
                  <button
                    className={styles.misconceptionToggle}
                    onClick={() => toggleMisconception(opt.id)}
                    type="button"
                  >
                    {expandedMisconceptions[opt.id] ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    {opt.misconception ? 'Edit misconception feedback' : 'Add misconception feedback'}
                    <span className={styles.miscHint}>(shown if student picks this)</span>
                  </button>
                  {expandedMisconceptions[opt.id] && (
                    <textarea
                      className={styles.misconceptionTextarea}
                      value={opt.misconception || ''}
                      onChange={e => updateOption(opt.id, { misconception: e.target.value })}
                      placeholder="Why this might seem right but isn't..."
                      rows={2}
                      maxLength={200}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add option button */}
        {question.options.length < 6 && (
          <button className={styles.addOptionBtn} onClick={addOption} type="button">
            <Plus size={14} />
            Add Option {OPTION_LETTERS[question.options.length]}
          </button>
        )}
      </div>

      {/* Explanation */}
      <div className={styles.fieldGroup} style={{ marginTop: 20 }}>
        <label className={styles.fieldLabel}>
          Explanation <span className={styles.hint}>(shown when student answers correctly)</span>
        </label>
        <div className={styles.textareaWrap}>
          <textarea
            className={`${styles.textarea} ${expLen > 300 ? styles.textareaError : ''}`}
            value={question.explanation}
            onChange={e => onChange({ ...question, explanation: e.target.value })}
            placeholder="Great job! Here's why this answer is correct..."
            rows={3}
            maxLength={350}
          />
          <span className={`${styles.charCount} ${expLen > 260 ? styles.charCountAmber : ''} ${expLen > 300 ? styles.charCountRed : ''}`}>
            {expLen}/300
          </span>
        </div>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className={styles.previewPanel}>
          <div className={styles.previewLabel}>
            <Eye size={13} /> Student Preview
          </div>
          <div className={styles.previewQuestion}>
            {question.questionText || <span style={{ color: '#94A3B8' }}>Question text will appear here...</span>}
          </div>
          <div className={styles.previewOptions}>
            {question.options.map((opt, oi) => {
              const letter = OPTION_LETTERS[oi];
              const isSelected = previewSelected === opt.id;
              const isCorrectOpt = question.correctOptionId === opt.id;
              let optClass = styles.previewOption;
              if (previewSubmitted && isSelected && isCorrectOpt) optClass = `${styles.previewOption} ${styles.previewCorrect}`;
              else if (previewSubmitted && isSelected && !isCorrectOpt) optClass = `${styles.previewOption} ${styles.previewWrong}`;
              else if (isSelected) optClass = `${styles.previewOption} ${styles.previewSelected}`;

              return (
                <button
                  key={opt.id}
                  className={optClass}
                  onClick={() => { if (!previewSubmitted) setPreviewSelected(opt.id); }}
                  disabled={previewSubmitted}
                  type="button"
                >
                  <span className={styles.previewLetter}>{letter}</span>
                  {opt.text || <span style={{ color: '#94A3B8' }}>Option {letter}</span>}
                </button>
              );
            })}
          </div>
          {!previewSubmitted ? (
            <button
              className={styles.previewSubmitBtn}
              onClick={() => previewSelected && setPreviewSubmitted(true)}
              disabled={!previewSelected}
              type="button"
            >
              Submit Answer
            </button>
          ) : (
            <div className={styles.previewFeedback}>
              {previewSelected === question.correctOptionId ? (
                <div className={styles.feedbackCorrect}>
                  <CheckCircle2 size={15} />
                  {question.explanation || 'Correct! Well done.'}
                </div>
              ) : (
                <div className={styles.feedbackWrong}>
                  <AlertCircle size={15} />
                  {question.options.find(o => o.id === previewSelected)?.misconception || 'Not quite. Try again!'}
                </div>
              )}
              <button
                className={styles.previewRetryBtn}
                onClick={() => { setPreviewSelected(null); setPreviewSubmitted(false); }}
                type="button"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
