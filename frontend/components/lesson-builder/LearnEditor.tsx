'use client';

/**
 * Learn — the creator stacks bite-size cards, the learner swipes through
 * them one at a time. Cards drag to reorder (or use the arrows), and each
 * kind has its own small editor. Selecting a card shows it in the phone
 * preview.
 */

import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Code2,
  Copy,
  Film,
  GripVertical,
  Headphones,
  ImageIcon,
  Lightbulb,
  ListChecks,
  Plus,
  Trash2,
  Type,
  X,
} from 'lucide-react';
import {
  CODE_LANGUAGES,
  CODE_LANGUAGE_LABEL,
  LIMITS,
  clipRange,
  formatDuration,
  newBlockId,
  type BlockIssue,
  type CodeLanguage,
  type LearnCard,
  type LearnCardKind,
} from '@/lib/lesson/blocks';
import { playSound } from '@/lib/audio/lessonSounds';
import { MediaField } from './MediaField';
import { RichText } from './RichText';
import styles from './Builder.module.css';

export const CARD_META: Record<LearnCardKind, { label: string; desc: string; Icon: typeof Type; tone: string }> = {
  text: { label: 'Explanation', desc: 'A short idea in words. One idea per card.', Icon: Type, tone: 'var(--color-brand)' },
  code: { label: 'Code sample', desc: 'Highlighted code learners can copy.', Icon: Code2, tone: 'var(--color-ink)' },
  video: { label: 'Video', desc: 'Up to 15 minutes. Learners watch to the end.', Icon: Film, tone: 'var(--error-red)' },
  image: { label: 'Image', desc: 'A diagram, screenshot or example.', Icon: ImageIcon, tone: 'var(--brand-indigo)' },
  callout: { label: 'Tip', desc: 'A tip, a warning or something to remember.', Icon: Lightbulb, tone: 'var(--warning)' },
  check: { label: 'Quick check', desc: 'One question mid-lesson. No hearts lost.', Icon: ListChecks, tone: 'var(--success-green)' },
  audio: { label: 'Audio', desc: 'A short voice explanation.', Icon: Headphones, tone: 'var(--brand-purple)' },
};

const ORDER: LearnCardKind[] = ['text', 'code', 'video', 'image', 'callout', 'check', 'audio'];

export function blankCard(kind: LearnCardKind, defaultLanguage: CodeLanguage): LearnCard {
  const id = newBlockId('card');
  switch (kind) {
    case 'text':
      return { id, kind, html: '' };
    case 'code':
      return { id, kind, language: defaultLanguage, code: '' };
    case 'video':
      return { id, kind, url: '', durationSec: 0 };
    case 'audio':
      return { id, kind, url: '' };
    case 'image':
      return { id, kind, url: '', alt: '' };
    case 'callout':
      return { id, kind, tone: 'tip', text: '' };
    case 'check':
      return { id, kind, question: '', options: ['', ''], correctIndex: 0 };
  }
}

export function AddCardMenu({ onAdd }: { onAdd: (kind: LearnCardKind) => void }) {
  return (
    <div className={styles.addGrid}>
      {ORDER.map((k) => {
        const m = CARD_META[k];
        return (
          <button
            key={k}
            type="button"
            className={styles.addTile}
            style={{ '--tone': m.tone } as React.CSSProperties}
            onClick={() => onAdd(k)}
          >
            <span className={styles.addIcon}>
              <m.Icon size={18} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className={styles.addName}>{m.label}</span>
            <span className={styles.addDesc}>{m.desc}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── One card ──────────────────────────────────────────────────────────────

function CardEditor({
  card,
  index,
  total,
  lessonId,
  issue,
  selected,
  onSelect,
  onChange,
  onMove,
  onDuplicate,
  onRemove,
}: {
  card: LearnCard;
  index: number;
  total: number;
  lessonId: string;
  issue: string | undefined;
  selected: boolean;
  onSelect: () => void;
  onChange: (c: LearnCard) => void;
  onMove: (dir: -1 | 1) => void;
  onDuplicate: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: card.id });
  const meta = CARD_META[card.kind];

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.7 : 1, zIndex: isDragging ? 5 : undefined }}
      className={`${styles.card} ${selected ? styles.cardSelected : ''} ${issue && !selected ? styles.cardIssue : ''}`}
      onFocusCapture={onSelect}
      onClick={onSelect}
    >
      <div className={styles.cardHead}>
        <button type="button" className={styles.handle} aria-label={`Drag card ${index + 1}`} {...attributes} {...listeners}>
          <GripVertical size={18} />
        </button>
        <span className={styles.cardNum}>{index + 1}</span>
        <span className={styles.kindBadge} style={{ '--tone': meta.tone } as React.CSSProperties}>
          <meta.Icon size={13} strokeWidth={2.75} aria-hidden="true" /> {meta.label}
        </span>
        <span className={styles.cardTools}>
          <button type="button" className={styles.tool} onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move up">
            <ArrowUp size={16} />
          </button>
          <button type="button" className={styles.tool} onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move down">
            <ArrowDown size={16} />
          </button>
          <button type="button" className={styles.tool} onClick={onDuplicate} aria-label="Duplicate card">
            <Copy size={16} />
          </button>
          <button type="button" className={`${styles.tool} ${styles.toolDanger}`} onClick={onRemove} aria-label="Delete card">
            <Trash2 size={16} />
          </button>
        </span>
      </div>

      {card.kind === 'text' && (
        <RichText value={card.html} onChange={(html) => onChange({ ...card, html })} placeholder="Explain one idea in a few sentences…" />
      )}

      {card.kind === 'code' && (
        <>
          <label className={styles.label}>
            Language
            <select
              className={styles.select}
              value={card.language}
              onChange={(e) => onChange({ ...card, language: e.target.value as CodeLanguage })}
            >
              {CODE_LANGUAGES.map((l) => (
                <option key={l} value={l}>
                  {CODE_LANGUAGE_LABEL[l]}
                </option>
              ))}
            </select>
          </label>
          <CodeArea value={card.code} onChange={(code) => onChange({ ...card, code })} />
          <input
            className={styles.input}
            placeholder="Caption (optional), e.g. “let makes a variable you can change”"
            value={card.caption ?? ''}
            maxLength={300}
            onChange={(e) => onChange({ ...card, caption: e.target.value || undefined })}
          />
        </>
      )}

      {(card.kind === 'video' || card.kind === 'audio' || card.kind === 'image') && (
        <>
          <MediaField
            kind={card.kind}
            lessonId={lessonId}
            url={card.url}
            durationSec={card.kind === 'image' ? undefined : card.durationSec}
            onUploaded={(url, seconds) =>
              onChange(
                card.kind === 'image'
                  ? { ...card, url }
                  : card.kind === 'video'
                    ? { ...card, url, durationSec: seconds ?? 0, startSec: undefined, endSec: undefined }
                    : { ...card, url, durationSec: seconds ?? undefined, startSec: undefined, endSec: undefined },
              )
            }
            onDuration={(s) => {
              // A clip's length is its range, not the whole file's.
              if (card.kind === 'video' && !clipRange(card)) onChange({ ...card, durationSec: s });
            }}
            onRemove={() =>
              onChange(
                card.kind === 'image'
                  ? { ...card, url: '' }
                  : card.kind === 'video'
                    ? { ...card, url: '', durationSec: 0, startSec: undefined, endSec: undefined }
                    : { ...card, url: '', startSec: undefined, endSec: undefined },
              )
            }
          />
          {card.kind !== 'image' && clipRange(card) && (
            <span className={styles.hint}>
              Plays {formatDuration(clipRange(card)!.startSec)}–{formatDuration(clipRange(card)!.endSec)} of the full{' '}
              {card.kind === 'video' ? 'video' : 'audio'}. Upload a new file to replace the whole clip.
            </span>
          )}
          {card.kind === 'image' && (
            <input
              className={styles.input}
              placeholder="Describe the image for learners who can’t see it (required)"
              value={card.alt}
              maxLength={300}
              onChange={(e) => onChange({ ...card, alt: e.target.value })}
            />
          )}
          <input
            className={styles.input}
            placeholder="Caption (optional)"
            value={card.caption ?? ''}
            maxLength={300}
            onChange={(e) => onChange({ ...card, caption: e.target.value || undefined })}
          />
        </>
      )}

      {card.kind === 'callout' && (
        <>
          <div className={styles.chips} role="radiogroup" aria-label="Kind of tip">
            {(['tip', 'warning', 'remember'] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={card.tone === t}
                className={`${styles.chip} ${card.tone === t ? styles.chipOn : ''}`}
                onClick={() => onChange({ ...card, tone: t })}
              >
                {t === 'tip' ? 'Tip' : t === 'warning' ? 'Watch out' : 'Remember'}
              </button>
            ))}
          </div>
          <textarea
            className={styles.textarea}
            value={card.text}
            maxLength={1000}
            placeholder="Keep it to one or two sentences."
            onChange={(e) => onChange({ ...card, text: e.target.value })}
          />
        </>
      )}

      {card.kind === 'check' && (
        <>
          <input
            className={styles.input}
            placeholder="The question"
            value={card.question}
            maxLength={500}
            onChange={(e) => onChange({ ...card, question: e.target.value })}
          />
          <OptionList
            options={card.options}
            correct={card.correctIndex}
            onChange={(options, correctIndex) => onChange({ ...card, options, correctIndex })}
          />
          <input
            className={styles.input}
            placeholder="Why the answer is right (optional, shown after answering)"
            value={card.explanation ?? ''}
            maxLength={1000}
            onChange={(e) => onChange({ ...card, explanation: e.target.value || undefined })}
          />
        </>
      )}

      {issue && (
        <p className={styles.issue}>
          <AlertTriangle size={15} aria-hidden="true" /> {issue}
        </p>
      )}
    </div>
  );
}

/** A code box where Tab indents instead of leaving the field. */
export function CodeArea({ value, onChange, rows = 6, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <textarea
      className={`${styles.textarea} ${styles.code}`}
      value={value}
      rows={Math.max(rows, Math.min(18, value.split('\n').length + 1))}
      spellCheck={false}
      autoCapitalize="none"
      autoCorrect="off"
      maxLength={LIMITS.codeChars}
      placeholder={placeholder ?? 'Paste or type your code…'}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return;
        e.preventDefault();
        const el = e.currentTarget;
        const { selectionStart: s, selectionEnd: end } = el;
        const next = `${value.slice(0, s)}  ${value.slice(end)}`;
        onChange(next);
        requestAnimationFrame(() => el.setSelectionRange(s + 2, s + 2));
      }}
    />
  );
}

/** Answers with a "this one is right" toggle. */
export function OptionList({
  options,
  correct,
  onChange,
  max = LIMITS.options,
  mono = false,
}: {
  options: string[];
  correct: number;
  onChange: (options: string[], correct: number) => void;
  max?: number;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((o, i) => (
        <div key={i} className={styles.optRow}>
          <button
            type="button"
            className={`${styles.mark} ${i === correct ? styles.markOn : ''}`}
            aria-label={i === correct ? 'Right answer' : 'Mark as right answer'}
            aria-pressed={i === correct}
            onClick={() => onChange(options, i)}
          >
            <CheckCircle2 size={18} strokeWidth={2.75} />
          </button>
          <input
            className={`${styles.input} ${mono ? styles.code : ''}`}
            value={o}
            maxLength={500}
            placeholder={`Answer ${i + 1}`}
            onChange={(e) => onChange(options.map((x, j) => (j === i ? e.target.value : x)), correct)}
          />
          <button
            type="button"
            className={`${styles.tool} ${styles.toolDanger}`}
            disabled={options.length <= 2}
            aria-label="Remove answer"
            onClick={() => {
              const next = options.filter((_, j) => j !== i);
              onChange(next, correct === i ? 0 : correct > i ? correct - 1 : correct);
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      {options.length < max && (
        <button type="button" className={styles.addRow} onClick={() => onChange([...options, ''], correct)}>
          <Plus size={15} /> Add answer
        </button>
      )}
    </div>
  );
}

// ─── The deck ──────────────────────────────────────────────────────────────

export function LearnEditor({
  cards,
  whatYouWillLearn,
  lessonId,
  issues,
  selectedId,
  defaultLanguage,
  onSelect,
  onCards,
  onWhatYouWillLearn,
  onMediaReplaced,
}: {
  cards: LearnCard[];
  whatYouWillLearn: string[];
  lessonId: string;
  issues: BlockIssue[];
  selectedId: string | null;
  defaultLanguage: CodeLanguage;
  onSelect: (id: string | null) => void;
  onCards: (cards: LearnCard[]) => void;
  onWhatYouWillLearn: (items: string[]) => void;
  /** Called with a media URL that's no longer used, for storage cleanup. */
  onMediaReplaced: (url: string) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const issueFor = (id: string) => issues.find((i) => i.id === id)?.message;
  const deckIssue = issues.find((i) => i.id === null && !/title/i.test(i.message))?.message;

  const add = (kind: LearnCardKind) => {
    if (cards.length >= LIMITS.learnCards) return;
    const card = blankCard(kind, defaultLanguage);
    onCards([...cards, card]);
    onSelect(card.id);
    playSound('cardNext');
  };

  const change = (next: LearnCard) => {
    const prev = cards.find((c) => c.id === next.id);
    if (prev && 'url' in prev && prev.url && (!('url' in next) || next.url !== prev.url)) onMediaReplaced(prev.url);
    onCards(cards.map((c) => (c.id === next.id ? next : c)));
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= cards.length) return;
    onCards(arrayMove(cards, i, j));
    playSound('select');
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const from = cards.findIndex((c) => c.id === e.active.id);
    const to = cards.findIndex((c) => c.id === e.over!.id);
    onCards(arrayMove(cards, from, to));
    playSound('select');
  };

  return (
    <>
      <div className={styles.card}>
        <label className={styles.label}>
          By the end, learners can…
          <span className={styles.hint}>Up to 4 short outcomes. Shown on the first card.</span>
        </label>
        {whatYouWillLearn.map((w, i) => (
          <div key={i} className={styles.optRow}>
            <input
              className={styles.input}
              value={w}
              maxLength={120}
              placeholder="e.g. Store a value in a variable"
              onChange={(e) => onWhatYouWillLearn(whatYouWillLearn.map((x, j) => (j === i ? e.target.value : x)))}
            />
            <button
              type="button"
              className={`${styles.tool} ${styles.toolDanger}`}
              aria-label="Remove outcome"
              onClick={() => onWhatYouWillLearn(whatYouWillLearn.filter((_, j) => j !== i))}
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {whatYouWillLearn.length < 4 && (
          <button type="button" className={styles.addRow} onClick={() => onWhatYouWillLearn([...whatYouWillLearn, ''])}>
            <Plus size={15} /> Add an outcome
          </button>
        )}
      </div>

      {cards.length === 0 ? (
        <div className={styles.empty}>
          <strong>Start your lesson</strong>
          Pick the first card. Most great lessons open with a short explanation or a code sample.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            {cards.map((c, i) => (
              <CardEditor
                key={c.id}
                card={c}
                index={i}
                total={cards.length}
                lessonId={lessonId}
                issue={issueFor(c.id)}
                selected={selectedId === c.id}
                onSelect={() => onSelect(c.id)}
                onChange={change}
                onMove={(dir) => move(i, dir)}
                onDuplicate={() => {
                  const copy = { ...c, id: newBlockId('card') } as LearnCard;
                  onCards([...cards.slice(0, i + 1), copy, ...cards.slice(i + 1)]);
                  onSelect(copy.id);
                }}
                onRemove={() => {
                  if ('url' in c && c.url) onMediaReplaced(c.url);
                  onCards(cards.filter((x) => x.id !== c.id));
                  playSound('cardBack');
                  if (selectedId === c.id) onSelect(null);
                }}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      {deckIssue && cards.length > 0 && (
        <p className={styles.issue}>
          <AlertTriangle size={15} aria-hidden="true" /> {deckIssue}
        </p>
      )}

      {cards.length < LIMITS.learnCards ? (
        <div className={styles.card}>
          <span className={styles.label}>
            Add a card
            <span className={styles.hint}>
              {cards.length}/{LIMITS.learnCards} cards. Aim for 4–8: one idea each.
            </span>
          </span>
          <AddCardMenu onAdd={add} />
        </div>
      ) : (
        <p className={styles.issue}>This lesson has the most cards it can hold. Split the rest into a new lesson.</p>
      )}
    </>
  );
}

export default LearnEditor;
