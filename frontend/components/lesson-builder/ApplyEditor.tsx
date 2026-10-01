'use client';

/**
 * Apply — the exercises. The add menu is written for the course's track
 * (Coding: predict the output, fill in the code, find the bug…; AI: pick the
 * better prompt, complete the prompt, order the workflow…), all built on the
 * same five kinds the player knows.
 */

import { useRef } from 'react';
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Brackets,
  Bug,
  CheckCircle2,
  Copy,
  GripVertical,
  Link2,
  ListOrdered,
  MessageSquareQuote,
  Plus,
  SquareCheckBig,
  Terminal,
  Trash2,
  X,
} from 'lucide-react';
import {
  BLANK_RE,
  CODE_LANGUAGES,
  CODE_LANGUAGE_LABEL,
  EXERCISE_TEMPLATES,
  LIMITS,
  blankExercise,
  newBlockId,
  type ApplyContent,
  type BlockIssue,
  type CodeLanguage,
  type Exercise,
  type ExerciseTemplate,
  type FillBlankExercise,
  type FindBugExercise,
  type MatchPairsExercise,
  type McqExercise,
  type OrderLinesExercise,
} from '@/lib/lesson/blocks';
import { playSound } from '@/lib/audio/lessonSounds';
import { CodeArea } from './LearnEditor';
import styles from './Builder.module.css';

const TEMPLATE_ICON: Record<string, typeof Bug> = {
  predict: Terminal,
  prompt: MessageSquareQuote,
  fill: Brackets,
  bug: Bug,
  order: ListOrdered,
  mcq: SquareCheckBig,
  match: Link2,
};

const TEMPLATE_TONE: Record<string, string> = {
  predict: 'var(--color-ink)',
  prompt: 'var(--brand-purple)',
  fill: 'var(--color-brand)',
  bug: 'var(--error-red)',
  order: 'var(--warning)',
  mcq: 'var(--success-green)',
  match: 'var(--brand-indigo)',
};

/** Which template label an exercise reads as, for its badge. */
function templateFor(ex: Exercise, track: 'coding' | 'ai'): ExerciseTemplate {
  const list = EXERCISE_TEMPLATES[track];
  return (
    list.find((t) => t.kind === ex.kind && (ex.kind !== 'mcq' || t.variant === ex.variant)) ??
    [...EXERCISE_TEMPLATES.coding, ...EXERCISE_TEMPLATES.ai].find((t) => t.kind === ex.kind && (ex.kind !== 'mcq' || t.variant === ex.variant)) ??
    list[0]
  );
}

function LanguagePicker({ value, onChange, allowNone = false }: { value: CodeLanguage | undefined; onChange: (l: CodeLanguage | undefined) => void; allowNone?: boolean }) {
  return (
    <label className={styles.label}>
      Shown as
      <select
        className={styles.select}
        value={value ?? ''}
        onChange={(e) => onChange((e.target.value || undefined) as CodeLanguage | undefined)}
      >
        {allowNone && <option value="">Plain words (no code)</option>}
        {CODE_LANGUAGES.filter((l) => l !== 'plaintext').map((l) => (
          <option key={l} value={l}>
            {CODE_LANGUAGE_LABEL[l]} code
          </option>
        ))}
      </select>
    </label>
  );
}

// ─── Kind editors ──────────────────────────────────────────────────────────

function McqEditor({ ex, onChange }: { ex: McqExercise; onChange: (e: Exercise) => void }) {
  return (
    <>
      {ex.variant === 'predictOutput' && (
        <>
          <LanguagePicker value={ex.language} onChange={(language) => onChange({ ...ex, language: language ?? 'javascript' })} />
          <CodeArea value={ex.code ?? ''} onChange={(code) => onChange({ ...ex, code })} placeholder="The code learners read" />
        </>
      )}
      <span className={styles.label}>
        Answers
        <span className={styles.hint}>Tap the circle to mark the right one. Explain why a wrong answer is tempting to help learners who pick it.</span>
      </span>
      {ex.options.map((o, i) => {
        const right = o.id === ex.correctOptionId;
        return (
          <div key={o.id} className="flex flex-col gap-1.5">
            <div className={styles.optRow}>
              <button
                type="button"
                className={`${styles.mark} ${right ? styles.markOn : ''}`}
                aria-label={right ? 'Right answer' : 'Mark as right answer'}
                aria-pressed={right}
                onClick={() => onChange({ ...ex, correctOptionId: o.id })}
              >
                <CheckCircle2 size={18} strokeWidth={2.75} />
              </button>
              {ex.variant === 'pickPrompt' ? (
                <textarea
                  className={styles.textarea}
                  style={{ minHeight: 64 }}
                  value={o.text}
                  maxLength={2000}
                  placeholder={`Prompt ${String.fromCharCode(65 + i)}`}
                  onChange={(e) => onChange({ ...ex, options: ex.options.map((x) => (x.id === o.id ? { ...x, text: e.target.value } : x)) })}
                />
              ) : (
                <input
                  className={`${styles.input} ${ex.variant === 'predictOutput' ? styles.code : ''}`}
                  value={o.text}
                  maxLength={500}
                  placeholder={`Answer ${i + 1}`}
                  onChange={(e) => onChange({ ...ex, options: ex.options.map((x) => (x.id === o.id ? { ...x, text: e.target.value } : x)) })}
                />
              )}
              <button
                type="button"
                className={`${styles.tool} ${styles.toolDanger}`}
                disabled={ex.options.length <= 2}
                aria-label="Remove answer"
                onClick={() => {
                  const options = ex.options.filter((x) => x.id !== o.id);
                  onChange({ ...ex, options, correctOptionId: right ? options[0].id : ex.correctOptionId });
                }}
              >
                <X size={16} />
              </button>
            </div>
            {!right && o.text.trim() && (
              <input
                className={styles.input}
                style={{ marginLeft: 44, width: 'calc(100% - 44px)', fontSize: 14 }}
                value={o.misconception ?? ''}
                maxLength={600}
                placeholder="Why someone might pick this (optional)"
                onChange={(e) =>
                  onChange({ ...ex, options: ex.options.map((x) => (x.id === o.id ? { ...x, misconception: e.target.value || undefined } : x)) })
                }
              />
            )}
          </div>
        );
      })}
      {ex.options.length < LIMITS.options && (
        <button
          type="button"
          className={styles.addRow}
          onClick={() => onChange({ ...ex, options: [...ex.options, { id: newBlockId('opt'), text: '' }] })}
        >
          <Plus size={15} /> Add answer
        </button>
      )}
    </>
  );
}

function FillBlankEditor({ ex, onChange }: { ex: FillBlankExercise; onChange: (e: Exercise) => void }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const markers = Array.from(ex.template.matchAll(BLANK_RE));

  /** Selected text becomes the next blank, with the selection as its answer. */
  const makeBlank = () => {
    const el = ref.current;
    if (!el || el.selectionStart === el.selectionEnd || ex.blanks.length >= LIMITS.blanks) return;
    const { selectionStart: s, selectionEnd: end } = el;
    const answer = ex.template.slice(s, end).trim();
    const n = ex.blanks.length + 1;
    onChange({
      ...ex,
      template: `${ex.template.slice(0, s)}[[${n}]]${ex.template.slice(end)}`,
      blanks: [...ex.blanks, { id: newBlockId('blank'), answers: [answer] }],
    });
    playSound('select');
  };

  const isCode = Boolean(ex.language && ex.language !== 'plaintext');

  return (
    <>
      <LanguagePicker value={ex.language} allowNone onChange={(language) => onChange({ ...ex, language })} />
      <span className={styles.label}>
        {isCode ? 'The code' : 'The text'}
        <span className={styles.hint}>Write it complete, then select a word or piece of code and press “Make it a blank”.</span>
      </span>
      {isCode ? (
        <textarea
          ref={ref}
          className={`${styles.textarea} ${styles.code}`}
          value={ex.template}
          spellCheck={false}
          rows={Math.max(4, ex.template.split('\n').length + 1)}
          onChange={(e) => onChange({ ...ex, template: e.target.value })}
        />
      ) : (
        <textarea ref={ref} className={styles.textarea} value={ex.template} onChange={(e) => onChange({ ...ex, template: e.target.value })} />
      )}
      <button type="button" className={styles.btn} style={{ alignSelf: 'flex-start' }} onMouseDown={(e) => e.preventDefault()} onClick={makeBlank}>
        <Brackets size={16} aria-hidden="true" /> Make it a blank
      </button>
      {ex.blanks.map((b, i) => (
        <label key={b.id} className={styles.label}>
          Blank {i + 1}
          <span className={styles.hint}>Right answer, then any other accepted answers separated by commas.</span>
          <div className={styles.optRow}>
            <input
              className={`${styles.input} ${isCode ? styles.code : ''}`}
              value={b.answers.join(', ')}
              onChange={(e) =>
                onChange({
                  ...ex,
                  blanks: ex.blanks.map((x) => (x.id === b.id ? { ...x, answers: e.target.value.split(',').map((a) => a.trim()) } : x)),
                })
              }
            />
            <button
              type="button"
              className={`${styles.tool} ${styles.toolDanger}`}
              aria-label="Remove blank"
              onClick={() => {
                // Put the answer back into the text and renumber the rest.
                const n = i + 1;
                let template = ex.template.replace(`[[${n}]]`, b.answers[0] ?? '');
                for (let k = n + 1; k <= ex.blanks.length; k++) template = template.replace(`[[${k}]]`, `[[${k - 1}]]`);
                onChange({ ...ex, template, blanks: ex.blanks.filter((x) => x.id !== b.id) });
              }}
            >
              <X size={16} />
            </button>
          </div>
        </label>
      ))}
      <label className={styles.label}>
        Wrong words in the word bank
        <span className={styles.hint}>Separate with commas. Make them believable.</span>
        <input
          className={`${styles.input} ${isCode ? styles.code : ''}`}
          value={ex.distractors.join(', ')}
          placeholder={isCode ? 'print, echo, var' : 'e.g. poet, 300'}
          onChange={(e) => onChange({ ...ex, distractors: e.target.value.split(',').map((d) => d.trim()).filter(Boolean) })}
        />
      </label>
      {markers.length !== ex.blanks.length && (
        <p className={styles.issue}>
          <AlertTriangle size={15} aria-hidden="true" /> The text has {markers.length} blank markers but {ex.blanks.length} answers.
        </p>
      )}
    </>
  );
}

function FindBugEditor({ ex, onChange, track }: { ex: FindBugExercise; onChange: (e: Exercise) => void; track: 'coding' | 'ai' }) {
  const text = ex.lines.join('\n');
  const isCode = Boolean(ex.language && ex.language !== 'plaintext');
  return (
    <>
      <LanguagePicker value={ex.language} allowNone={track === 'ai'} onChange={(language) => onChange({ ...ex, language })} />
      <span className={styles.label}>
        {isCode ? 'The code, one line per line' : 'The lines (an AI answer, steps…), one per line'}
      </span>
      {isCode ? (
        <CodeArea
          value={text}
          onChange={(v) => {
            const lines = v.split('\n').slice(0, LIMITS.lines);
            onChange({ ...ex, lines, bugLine: Math.min(ex.bugLine, lines.length - 1) });
          }}
        />
      ) : (
        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => {
            const lines = e.target.value.split('\n').slice(0, LIMITS.lines);
            onChange({ ...ex, lines, bugLine: Math.min(ex.bugLine, lines.length - 1) });
          }}
        />
      )}
      <span className={styles.label}>
        Tap the line with the mistake
      </span>
      <div className="flex flex-col gap-1.5">
        {ex.lines.map((l, i) =>
          l.trim() ? (
            <button
              key={i}
              type="button"
              className={`${styles.chip} ${i === ex.bugLine ? styles.chipOn : ''}`}
              style={{ justifyContent: 'flex-start', fontFamily: isCode ? 'ui-monospace, Menlo, monospace' : undefined, borderColor: i === ex.bugLine ? 'var(--error-red)' : undefined, color: i === ex.bugLine ? 'var(--error-red)' : undefined, background: i === ex.bugLine ? 'color-mix(in srgb, var(--error-red) 8%, var(--bg-card))' : undefined }}
              onClick={() => onChange({ ...ex, bugLine: i })}
            >
              <span style={{ opacity: 0.6, marginRight: 8 }}>{i + 1}</span>
              {l}
            </button>
          ) : null,
        )}
      </div>
      <label className={styles.label}>
        The corrected line (optional, shown after answering)
        {isCode ? (
          <CodeArea value={ex.fix ?? ''} rows={2} onChange={(fix) => onChange({ ...ex, fix: fix || undefined })} placeholder="let total = 10;" />
        ) : (
          <input className={styles.input} value={ex.fix ?? ''} onChange={(e) => onChange({ ...ex, fix: e.target.value || undefined })} />
        )}
      </label>
    </>
  );
}

function OrderLinesEditor({ ex, onChange, track }: { ex: OrderLinesExercise; onChange: (e: Exercise) => void; track: 'coding' | 'ai' }) {
  const isCode = Boolean(ex.language && ex.language !== 'plaintext');
  const text = ex.lines.join('\n');
  const set = (v: string) => onChange({ ...ex, lines: v.split('\n').slice(0, LIMITS.lines) });
  return (
    <>
      <LanguagePicker value={ex.language} allowNone={track === 'ai'} onChange={(language) => onChange({ ...ex, language })} />
      <span className={styles.label}>
        Lines in the RIGHT order
        <span className={styles.hint}>One per line. Learners get them shuffled. 3 to 8 lines works best.</span>
      </span>
      {isCode ? <CodeArea value={text} onChange={set} /> : <textarea className={styles.textarea} value={text} onChange={(e) => set(e.target.value)} />}
    </>
  );
}

function MatchPairsEditor({ ex, onChange }: { ex: MatchPairsExercise; onChange: (e: Exercise) => void }) {
  return (
    <>
      <span className={styles.label}>
        Pairs
        <span className={styles.hint}>3 to {LIMITS.pairs}. Learners get both columns shuffled.</span>
      </span>
      {ex.pairs.map((p, i) => (
        <div key={p.id} className={styles.optRow}>
          <input
            className={styles.input}
            value={p.left}
            maxLength={200}
            placeholder={`Term ${i + 1}`}
            onChange={(e) => onChange({ ...ex, pairs: ex.pairs.map((x) => (x.id === p.id ? { ...x, left: e.target.value } : x)) })}
          />
          <input
            className={styles.input}
            value={p.right}
            maxLength={300}
            placeholder="What it matches"
            onChange={(e) => onChange({ ...ex, pairs: ex.pairs.map((x) => (x.id === p.id ? { ...x, right: e.target.value } : x)) })}
          />
          <button
            type="button"
            className={`${styles.tool} ${styles.toolDanger}`}
            disabled={ex.pairs.length <= 3}
            aria-label="Remove pair"
            onClick={() => onChange({ ...ex, pairs: ex.pairs.filter((x) => x.id !== p.id) })}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      {ex.pairs.length < LIMITS.pairs && (
        <button
          type="button"
          className={styles.addRow}
          onClick={() => onChange({ ...ex, pairs: [...ex.pairs, { id: newBlockId('pair'), left: '', right: '' }] })}
        >
          <Plus size={15} /> Add pair
        </button>
      )}
    </>
  );
}

// ─── One exercise ──────────────────────────────────────────────────────────

function ExerciseCard({
  ex,
  index,
  total,
  track,
  issue,
  selected,
  onSelect,
  onChange,
  onMove,
  onDuplicate,
  onRemove,
}: {
  ex: Exercise;
  index: number;
  total: number;
  track: 'coding' | 'ai';
  issue: string | undefined;
  selected: boolean;
  onSelect: () => void;
  onChange: (e: Exercise) => void;
  onMove: (dir: -1 | 1) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ex.id });
  const t = templateFor(ex, track);
  const Icon = TEMPLATE_ICON[t.key] ?? SquareCheckBig;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.7 : 1, zIndex: isDragging ? 5 : undefined }}
      className={`${styles.card} ${selected ? styles.cardSelected : ''} ${issue && !selected ? styles.cardIssue : ''}`}
      onFocusCapture={onSelect}
      onClick={onSelect}
    >
      <div className={styles.cardHead}>
        <button type="button" className={styles.handle} aria-label={`Drag exercise ${index + 1}`} {...attributes} {...listeners}>
          <GripVertical size={18} />
        </button>
        <span className={styles.cardNum}>{index + 1}</span>
        <span className={styles.kindBadge} style={{ '--tone': TEMPLATE_TONE[t.key] } as React.CSSProperties}>
          <Icon size={13} strokeWidth={2.75} aria-hidden="true" /> {t.label}
        </span>
        <span className={styles.cardTools}>
          <button type="button" className={styles.tool} onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
            <ArrowUp size={16} />
          </button>
          <button type="button" className={styles.tool} onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move down">
            <ArrowDown size={16} />
          </button>
          <button type="button" className={styles.tool} onClick={onDuplicate} aria-label="Duplicate exercise">
            <Copy size={16} />
          </button>
          <button type="button" className={`${styles.tool} ${styles.toolDanger}`} onClick={onRemove} aria-label="Delete exercise">
            <Trash2 size={16} />
          </button>
        </span>
      </div>

      <input
        className={styles.input}
        value={ex.prompt}
        maxLength={500}
        placeholder="The question or instruction"
        onChange={(e) => onChange({ ...ex, prompt: e.target.value } as Exercise)}
      />

      {ex.kind === 'mcq' && <McqEditor ex={ex} onChange={onChange} />}
      {ex.kind === 'fillBlank' && <FillBlankEditor ex={ex} onChange={onChange} />}
      {ex.kind === 'findBug' && <FindBugEditor ex={ex} onChange={onChange} track={track} />}
      {ex.kind === 'orderLines' && <OrderLinesEditor ex={ex} onChange={onChange} track={track} />}
      {ex.kind === 'matchPairs' && <MatchPairsEditor ex={ex} onChange={onChange} />}

      <input
        className={styles.input}
        value={ex.explanation ?? ''}
        maxLength={1500}
        placeholder="Why the answer is right (optional, shown after checking)"
        onChange={(e) => onChange({ ...ex, explanation: e.target.value || undefined } as Exercise)}
      />

      {issue && (
        <p className={styles.issue}>
          <AlertTriangle size={15} aria-hidden="true" /> {issue}
        </p>
      )}
    </div>
  );
}

// ─── The list ──────────────────────────────────────────────────────────────

export function ApplyEditor({
  apply,
  track,
  defaultLanguage,
  issues,
  selectedId,
  onSelect,
  onChange,
}: {
  apply: ApplyContent;
  track: 'coding' | 'ai';
  defaultLanguage: CodeLanguage;
  issues: BlockIssue[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (a: ApplyContent) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const items = apply.items;
  const setItems = (next: Exercise[]) => onChange({ ...apply, items: next });

  const add = (t: ExerciseTemplate) => {
    if (items.length >= LIMITS.exercises) return;
    const ex = blankExercise(t);
    // Code-shaped exercises start in the course's usual language.
    const withLang =
      track === 'coding' && (ex.kind === 'fillBlank' || ex.kind === 'findBug' || ex.kind === 'orderLines')
        ? { ...ex, language: defaultLanguage }
        : ex.kind === 'mcq' && ex.variant === 'predictOutput'
          ? { ...ex, language: defaultLanguage }
          : ex;
    setItems([...items, withLang]);
    onSelect(withLang.id);
    playSound('cardNext');
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    setItems(arrayMove(items, items.findIndex((x) => x.id === e.active.id), items.findIndex((x) => x.id === e.over!.id)));
    playSound('select');
  };

  const listIssue = issues.find((i) => i.id === null)?.message;

  return (
    <>
      <div className={styles.card}>
        <label className={styles.label}>
          Scenario (optional)
          <span className={styles.hint}>A one-line setting Tey says before the questions, e.g. “You are building a todo app.”</span>
          <input
            className={styles.input}
            value={apply.scenario}
            maxLength={300}
            onChange={(e) => onChange({ ...apply, scenario: e.target.value })}
          />
        </label>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <strong>Let learners practise</strong>
          Add 3–6 short exercises. Mixing kinds keeps a lesson fun.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={items.map((x) => x.id)} strategy={verticalListSortingStrategy}>
            {items.map((ex, i) => (
              <ExerciseCard
                key={ex.id}
                ex={ex}
                index={i}
                total={items.length}
                track={track}
                issue={issues.find((x) => x.id === ex.id)?.message}
                selected={selectedId === ex.id}
                onSelect={() => onSelect(ex.id)}
                onChange={(next) => setItems(items.map((x) => (x.id === ex.id ? next : x)))}
                onMove={(dir) => {
                  const j = i + dir;
                  if (j >= 0 && j < items.length) setItems(arrayMove(items, i, j));
                }}
                onDuplicate={() => {
                  const copy = { ...ex, id: newBlockId('ex') } as Exercise;
                  setItems([...items.slice(0, i + 1), copy, ...items.slice(i + 1)]);
                  onSelect(copy.id);
                }}
                onRemove={() => {
                  setItems(items.filter((x) => x.id !== ex.id));
                  playSound('cardBack');
                  if (selectedId === ex.id) onSelect(null);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      {listIssue && items.length > 0 && (
        <p className={styles.issue}>
          <AlertTriangle size={15} aria-hidden="true" /> {listIssue}
        </p>
      )}

      {items.length < LIMITS.exercises && (
        <div className={styles.card}>
          <span className={styles.label}>
            Add an exercise
            <span className={styles.hint}>
              {items.length}/{LIMITS.exercises}. Picked for {track === 'ai' ? 'AI' : 'Coding'} courses.
            </span>
          </span>
          <div className={styles.addGrid}>
            {EXERCISE_TEMPLATES[track].map((t) => {
              const Icon = TEMPLATE_ICON[t.key] ?? SquareCheckBig;
              return (
                <button
                  key={t.key}
                  type="button"
                  className={styles.addTile}
                  style={{ '--tone': TEMPLATE_TONE[t.key] } as React.CSSProperties}
                  onClick={() => add(t)}
                >
                  <span className={styles.addIcon}>
                    <Icon size={18} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className={styles.addName}>{t.label}</span>
                  <span className={styles.addDesc}>{t.description}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ApplyEditor;
