'use client';

/**
 * Reflect — one question that makes the learner put the lesson in their own
 * words. Open (one answer, with optional sentence starters) or guided (a
 * few short questions). Writing stays optional for the learner.
 */

import { Plus, X } from 'lucide-react';
import { newBlockId } from '@/lib/lesson/blocks';
import type { ReflectDraft } from '@/lib/lesson-builder/draft';
import styles from './Builder.module.css';

const IDEAS: Record<'coding' | 'ai', string[]> = {
  coding: [
    'Where could you use this in a project of your own?',
    'Explain what this code does as if to a friend.',
    'What would break if you left this out?',
  ],
  ai: [
    'What task in your week could this help with?',
    'How would you check that the AI’s answer is right?',
    'Rewrite one prompt you’ve used before, using what you learned.',
  ],
};

export function ReflectEditor({
  reflect,
  track,
  onChange,
}: {
  reflect: ReflectDraft;
  track: 'coding' | 'ai';
  onChange: (r: ReflectDraft) => void;
}) {
  const starters = reflect.openConfig.starters;
  const questions = reflect.guidedConfig.questions;

  return (
    <div className={styles.card}>
      <label className={styles.label}>
        Reflection question
        <textarea
          className={styles.textarea}
          value={reflect.prompt}
          maxLength={500}
          placeholder="What do you want learners to think about?"
          onChange={(e) => onChange({ ...reflect, prompt: e.target.value })}
        />
      </label>
      <div className={styles.chips} aria-label="Ideas">
        {IDEAS[track].map((idea) => (
          <button key={idea} type="button" className={styles.chip} onClick={() => onChange({ ...reflect, prompt: idea })}>
            {idea}
          </button>
        ))}
      </div>

      <span className={styles.label}>Style</span>
      <div className={styles.chips} role="radiogroup" aria-label="Reflection style">
        {(['open', 'guided'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={reflect.type === t}
            className={`${styles.chip} ${reflect.type === t ? styles.chipOn : ''}`}
            onClick={() => onChange({ ...reflect, type: t })}
          >
            {t === 'open' ? 'One open answer' : 'A few guided questions'}
          </button>
        ))}
      </div>

      {reflect.type === 'open' ? (
        <>
          <span className={styles.label}>
            Sentence starters (optional)
            <span className={styles.hint}>Help a learner who doesn’t know how to begin, e.g. “I could use this to…”</span>
          </span>
          {starters.map((s) => (
            <div key={s.id} className={styles.optRow}>
              <input
                className={styles.input}
                value={s.text}
                maxLength={120}
                onChange={(e) =>
                  onChange({ ...reflect, openConfig: { ...reflect.openConfig, starters: starters.map((x) => (x.id === s.id ? { ...x, text: e.target.value } : x)) } })
                }
              />
              <button
                type="button"
                className={`${styles.tool} ${styles.toolDanger}`}
                aria-label="Remove starter"
                onClick={() => onChange({ ...reflect, openConfig: { ...reflect.openConfig, starters: starters.filter((x) => x.id !== s.id) } })}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {starters.length < 4 && (
            <button
              type="button"
              className={styles.addRow}
              onClick={() =>
                onChange({ ...reflect, openConfig: { ...reflect.openConfig, useStarters: true, starters: [...starters, { id: newBlockId('st'), text: '' }] } })
              }
            >
              <Plus size={15} /> Add a starter
            </button>
          )}
        </>
      ) : (
        <>
          <span className={styles.label}>Guided questions</span>
          {questions.map((q, i) => (
            <div key={q.id} className={styles.optRow}>
              <input
                className={styles.input}
                value={q.text}
                maxLength={300}
                placeholder={`Question ${i + 1}`}
                onChange={(e) =>
                  onChange({ ...reflect, guidedConfig: { ...reflect.guidedConfig, questions: questions.map((x) => (x.id === q.id ? { ...x, text: e.target.value } : x)) } })
                }
              />
              <button
                type="button"
                className={`${styles.tool} ${styles.toolDanger}`}
                aria-label="Remove question"
                onClick={() => onChange({ ...reflect, guidedConfig: { ...reflect.guidedConfig, questions: questions.filter((x) => x.id !== q.id) } })}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {questions.length < 4 && (
            <button
              type="button"
              className={styles.addRow}
              onClick={() => onChange({ ...reflect, guidedConfig: { ...reflect.guidedConfig, questions: [...questions, { id: newBlockId('gq'), text: '' }] } })}
            >
              <Plus size={15} /> Add a question
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default ReflectEditor;
