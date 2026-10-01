'use client';

/**
 * The lesson builder — where a Teyro lesson is made.
 *
 *   top bar   back to the course, the lesson title, save status, play, publish
 *   left      the four steps with their state (Deepen marked optional)
 *   middle    the step's editor: Learn cards, Apply exercises, Reflect, Deepen
 *   right     a live phone showing the selected card or exercise
 *
 * Everything autosaves (lib/lesson-builder/useLessonDraft). Rules come from
 * lib/lesson/blocks.ts and are shown inline as the creator works; publishing
 * runs the same rules on the server.
 */

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  CloudOff,
  Dumbbell,
  Eye,
  Lightbulb,
  Loader2,
  Microscope,
  Play,
  Rocket,
  X,
} from 'lucide-react';
import { useLessonDraft, type SaveStatus } from '@/lib/lesson-builder/useLessonDraft';
import { estimateMinutes, phaseIssues, savePayload, type BuilderPhase } from '@/lib/lesson-builder/draft';
import { normalizeCourseCategory } from '@/lib/creator/categories';
import { isLockedForReview } from '@/lib/creator/courseStatus';
import { extractErrorMessage } from '@/lib/apiError';
import { playHaptic } from '@/lib/haptics';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import type { CodeLanguage } from '@/lib/lesson/blocks';
import { LearnEditor } from './LearnEditor';
import { ApplyEditor } from './ApplyEditor';
import { ReflectEditor } from './ReflectEditor';
import { DeepenEditor } from './DeepenEditor';
import { PhonePreview, type PreviewTarget } from './PhonePreview';
import styles from './Builder.module.css';

const PHASES: { id: BuilderPhase; name: string; Icon: typeof BookOpen; tone: string; title: string; sub: string }[] = [
  { id: 'learn', name: 'Learn', Icon: BookOpen, tone: 'var(--lb-learn)', title: 'Learn', sub: 'Teach one idea at a time. Learners swipe through your cards.' },
  { id: 'apply', name: 'Apply', Icon: Dumbbell, tone: 'var(--lb-apply)', title: 'Apply', sub: 'Short exercises, checked instantly. Wrong answers come back at the end.' },
  { id: 'reflect', name: 'Reflect', Icon: Lightbulb, tone: 'var(--lb-reflect)', title: 'Reflect', sub: 'One question that makes the lesson stick.' },
  { id: 'deepen', name: 'Deepen', Icon: Microscope, tone: 'var(--lb-deepen)', title: 'Deepen (optional)', sub: 'Extra resources for learners who want more.' },
];

function StatusLabel({ status }: { status: SaveStatus }) {
  if (status === 'saving')
    return (
      <span className={styles.status}>
        <Loader2 size={14} className={styles.spin} aria-hidden="true" /> Saving…
      </span>
    );
  if (status === 'saved')
    return (
      <span className={`${styles.status} ${styles.statusOk}`}>
        <CheckCircle2 size={14} aria-hidden="true" /> Saved
      </span>
    );
  if (status === 'offline')
    return (
      <span className={`${styles.status} ${styles.statusBad}`}>
        <CloudOff size={14} aria-hidden="true" /> Offline, kept here
      </span>
    );
  if (status === 'error' || status === 'conflict')
    return (
      <span className={`${styles.status} ${styles.statusBad}`}>
        <AlertTriangle size={14} aria-hidden="true" /> Not saved
      </span>
    );
  return <span className={styles.status}>Unsaved changes</span>;
}

export function LessonBuilder({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const router = useRouter();
  useStandaloneSound();
  const d = useLessonDraft(lessonId);
  const [phase, setPhase] = useState<BuilderPhase>('learn');
  const [selected, setSelected] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  // Deep link from the studio's lesson insights: ?phase=apply&block=<id>
  // opens straight on the exercise learners keep missing.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = q.get('phase');
    if (p === 'learn' || p === 'apply' || p === 'reflect' || p === 'deepen') setPhase(p);
    const block = q.get('block');
    if (block) setSelected(block);
  }, []);

  const track = normalizeCourseCategory(d.lessonMeta?.category) ?? 'coding';
  const defaultLanguage: CodeLanguage = track === 'ai' ? 'python' : 'javascript';
  const courseHref = `/creator/courses/${d.lessonMeta?.courseId ?? courseId}`;

  const issues = useMemo(() => (d.draft ? phaseIssues(d.draft, d.resources) : null), [d.draft, d.resources]);

  const previewTarget: PreviewTarget = useMemo(() => {
    const draft = d.draft;
    if (!draft) return { kind: 'text', message: '' };
    if (phase === 'learn') {
      const i = draft.cards.findIndex((c) => c.id === selected);
      const index = i >= 0 ? i : 0;
      const card = draft.cards[index];
      return card
        ? { kind: 'card', card, index, total: draft.cards.length, title: draft.title || 'Untitled lesson', points: draft.whatYouWillLearn }
        : { kind: 'text', message: 'Add a card to see it here.' };
    }
    if (phase === 'apply') {
      const i = draft.apply.items.findIndex((x) => x.id === selected);
      const index = i >= 0 ? i : 0;
      const ex = draft.apply.items[index];
      return ex
        ? { kind: 'exercise', exercise: ex, index, total: draft.apply.items.length, scenario: draft.apply.scenario }
        : { kind: 'text', message: 'Add an exercise to try it here.' };
    }
    if (phase === 'reflect') return { kind: 'text', message: draft.reflect.prompt ? `Tey asks: “${draft.reflect.prompt}”` : 'Write the reflection question.' };
    return { kind: 'text', message: draft.deepen.enabled ? `${draft.deepen.collectionTitle || 'Extra resources'} · ${d.resources.length} resource(s)` : 'Deepen is off. The lesson ends after Reflect.' };
  }, [d.draft, d.resources, phase, selected]);

  if (d.loadError) {
    return (
      <div className={styles.shell}>
        <div className={styles.empty} style={{ margin: 24 }}>
          <strong>{d.loadError}</strong>
          <div className={styles.row} style={{ justifyContent: 'center' }}>
            <button type="button" className={styles.btn} onClick={() => void d.reload()}>
              Try again
            </button>
            <Link href={courseHref} className={styles.btnGhost}>
              Back to the course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!d.draft || !issues) {
    return (
      <div className={styles.shell} aria-busy="true">
        <div className={styles.topBar}>
          <span className={styles.crumb}>Loading lesson…</span>
        </div>
      </div>
    );
  }

  const draft = d.draft;
  const blocking = [...issues.learn, ...issues.apply, ...issues.reflect, ...issues.deepen];
  const current = PHASES.find((p) => p.id === phase)!;

  const stepSub = (p: BuilderPhase) => {
    const n = issues[p].length;
    if (p === 'deepen' && !draft.deepen.enabled) return { text: 'Optional · off', cls: '' };
    if (n === 0) {
      const count = p === 'learn' ? `${draft.cards.length} cards` : p === 'apply' ? `${draft.apply.items.length} exercises` : 'Ready';
      return { text: count, cls: styles.stepSubOk };
    }
    return { text: `${n} to fix`, cls: styles.stepSubBad };
  };

  const goPhase = (p: BuilderPhase, i: number) => {
    setPhase(p);
    setSelected(null);
    playSound('navTap', i);
    playHaptic('selection', false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlay = async () => {
    await d.flush();
    window.open(`/preview/lesson/${lessonId}`, '_blank', 'noopener');
  };

  const publish = async () => {
    setPublishing(true);
    setPublishError(null);
    try {
      await d.flush();
      const res = await fetch(`/api/lesson/${lessonId}/full-save-publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(savePayload(draft, d.resources, d.version())),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 409) throw new Error('This lesson was changed in another tab. Reload it, then try again.');
        throw new Error(Array.isArray(data?.errors) ? data.errors.join(' · ') : extractErrorMessage(data, res.status));
      }
      if (typeof data?.lesson?.version === 'number') d.setVersion(data.lesson.version);
      setPublished(true);
      playSound('lessonComplete');
      playHaptic('success', false);
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : 'Publishing failed. Try again?');
      playSound('wrong');
    } finally {
      setPublishing(false);
    }
  };

  const isPublished = d.lessonMeta?.status === 'published';

  return (
    <div className={`${styles.shell} ${previewOpen ? styles.previewOpen : ''}`}>
      <header className={styles.topBar}>
        <Link href={courseHref} className={styles.iconBtn} aria-label="Back to the course" onClick={() => playSound('cardBack')}>
          <ArrowLeft size={22} strokeWidth={2.5} />
        </Link>
        <div className={styles.titleBlock}>
          <span className={styles.crumb}>
            {track === 'ai' ? 'AI' : 'Coding'} lesson · about {estimateMinutes(draft)} min
          </span>
          <input
            className={styles.titleInput}
            value={draft.title}
            maxLength={100}
            placeholder="Lesson title"
            aria-label="Lesson title"
            onChange={(e) => d.update((x) => ({ ...x, title: e.target.value }))}
          />
        </div>
        <StatusLabel status={d.status} />
        <button type="button" className={`${styles.btn} ${styles.mobilePreviewBtn}`} onClick={() => setPreviewOpen(true)} aria-label="Preview">
          <Eye size={16} aria-hidden="true" />
        </button>
        <button type="button" className={`${styles.btn} ${styles.hideSm}`} onClick={() => void openPlay()}>
          <Play size={16} aria-hidden="true" /> Play lesson
        </button>
        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => {
            setPublishOpen(true);
            setPublished(false);
            setPublishError(null);
            playSound('menuOpen');
          }}
        >
          <Rocket size={16} aria-hidden="true" /> <span className={styles.hideSm}>{isPublished ? 'Update' : 'Publish'}</span>
        </button>
      </header>

      {isLockedForReview(d.lessonMeta?.reviewStatus) && (
        <div className={styles.banner}>
          <span className={styles.bannerText}>
            This course is being reviewed by Teyro, so changes can’t be saved until the review ends. You can still look around and play the lesson.
          </span>
        </div>
      )}
      {d.recoverable && (
        <div className={styles.banner}>
          <span className={styles.bannerText}>
            You have changes from {new Date(d.recoverable.savedAt).toLocaleString()} that never reached the server.
          </span>
          <button type="button" className={styles.btn} onClick={d.restoreBackup}>
            Restore them
          </button>
          <button type="button" className={styles.btnGhost} onClick={d.dismissBackup}>
            Discard
          </button>
        </div>
      )}
      {d.status === 'conflict' && (
        <div className={`${styles.banner} ${styles.bannerBad}`}>
          <span className={styles.bannerText}>This lesson was saved from another tab or device. Which version do you want?</span>
          <button type="button" className={styles.btn} onClick={() => void d.keepMine()}>
            Keep mine
          </button>
          <button type="button" className={styles.btnGhost} onClick={() => void d.discardMine()}>
            Load theirs
          </button>
        </div>
      )}
      {d.status === 'error' && d.saveError && (
        <div className={`${styles.banner} ${styles.bannerBad}`}>
          <span className={styles.bannerText}>{d.saveError}</span>
          <button type="button" className={styles.btn} onClick={() => void d.save()}>
            Try again
          </button>
        </div>
      )}

      <div className={styles.body}>
        <nav className={styles.rail} aria-label="Lesson steps">
          {PHASES.map((p, i) => {
            const sub = stepSub(p.id);
            return (
              <button
                key={p.id}
                type="button"
                className={`${styles.step} ${phase === p.id ? styles.stepOn : ''}`}
                style={{ '--tone': p.tone } as React.CSSProperties}
                aria-current={phase === p.id ? 'step' : undefined}
                onClick={() => goPhase(p.id, i)}
              >
                <span className={styles.stepIcon}>
                  <p.Icon size={18} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className={styles.stepText}>
                  <span className={styles.stepName}>
                    {i + 1}. {p.name}
                  </span>
                  <span className={`${styles.stepSub} ${sub.cls}`}>{sub.text}</span>
                </span>
              </button>
            );
          })}
          <p className={styles.railNote}>
            Bite-size wins: 4–8 Learn cards, 3–6 exercises, videos under 15 minutes. Learners finish lessons they can do in one sitting.
          </p>
        </nav>

        <main className={styles.editor}>
          <div className={styles.phaseHead}>
            <h1 className={styles.phaseTitle}>{current.title}</h1>
            <p className={styles.phaseSub}>{current.sub}</p>
          </div>

          {phase === 'learn' && (
            <LearnEditor
              cards={draft.cards}
              whatYouWillLearn={draft.whatYouWillLearn}
              lessonId={lessonId}
              issues={issues.learn}
              selectedId={selected}
              defaultLanguage={defaultLanguage}
              onSelect={setSelected}
              onCards={(cards) => d.update((x) => ({ ...x, cards }))}
              onWhatYouWillLearn={(whatYouWillLearn) => d.update((x) => ({ ...x, whatYouWillLearn }))}
              onMediaReplaced={d.markSuperseded}
            />
          )}
          {phase === 'apply' && (
            <ApplyEditor
              apply={draft.apply}
              track={track}
              defaultLanguage={defaultLanguage}
              issues={issues.apply}
              selectedId={selected}
              onSelect={setSelected}
              onChange={(apply) => d.update((x) => ({ ...x, apply }))}
            />
          )}
          {phase === 'reflect' && <ReflectEditor reflect={draft.reflect} track={track} onChange={(reflect) => d.update((x) => ({ ...x, reflect }))} />}
          {phase === 'deepen' && (
            <DeepenEditor
              lessonId={lessonId}
              deepen={draft.deepen}
              resources={d.resources}
              onDeepen={(deepen) => d.update((x) => ({ ...x, deepen }))}
              onResources={(list) => {
                d.setResources(list);
                d.update((x) => ({ ...x }));
              }}
            />
          )}

          <div className={styles.row} style={{ justifyContent: 'space-between' }}>
            {phase !== 'learn' ? (
              <button type="button" className={styles.btnGhost} style={{ flex: '0 0 auto' }} onClick={() => goPhase(PHASES[PHASES.findIndex((p) => p.id === phase) - 1].id, 0)}>
                Back
              </button>
            ) : (
              <span />
            )}
            {phase !== 'deepen' && (
              <button type="button" className={styles.btn} style={{ flex: '0 0 auto' }} onClick={() => goPhase(PHASES[PHASES.findIndex((p) => p.id === phase) + 1].id, 2)}>
                Next: {PHASES[PHASES.findIndex((p) => p.id === phase) + 1].name}
              </button>
            )}
          </div>
        </main>

        <aside className={styles.previewCol} onClick={(e) => e.target === e.currentTarget && setPreviewOpen(false)}>
          <PhonePreview target={previewTarget} onClose={previewOpen ? () => setPreviewOpen(false) : undefined} />
        </aside>
      </div>

      <AnimatePresence>
        {publishOpen && (
          <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !publishing && setPublishOpen(false)}>
            <motion.div
              className={styles.sheet}
              role="dialog"
              aria-modal="true"
              aria-labelledby="publish-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            >
              <div className={styles.optRow}>
                <h2 id="publish-title" style={{ flex: 1 }}>
                  {published ? 'Lesson ready!' : blocking.length ? 'Almost there' : isPublished ? 'Update this lesson?' : 'Mark this lesson ready?'}
                </h2>
                <button type="button" className={styles.iconBtn} aria-label="Close" onClick={() => setPublishOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {published ? (
                <>
                  <p className={styles.phaseSub}>
                    It’s part of your course now. When the whole course is ready, submit it for review from the course page. A Teyro reviewer checks every course before learners see it.
                  </p>
                  <div className={styles.row}>
                    <button type="button" className={styles.btnPrimary} onClick={() => router.push(courseHref)}>
                      Back to the course
                    </button>
                    <button type="button" className={styles.btn} onClick={() => setPublishOpen(false)}>
                      Keep editing
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <ul className={styles.checkList}>
                    {PHASES.map((p) => {
                      const list = issues[p.id];
                      const skipped = p.id === 'deepen' && !draft.deepen.enabled;
                      return (
                        <li key={p.id} className={styles.checkItem}>
                          <span className={`${styles.checkDot} ${list.length ? styles.checkDotBad : ''}`} aria-hidden="true">
                            {list.length ? '!' : <Check size={14} strokeWidth={3.5} />}
                          </span>
                          <span>
                            {p.name}
                            {skipped ? ' (skipped, that’s fine)' : ''}
                            {list.map((x, i) => (
                              <span key={i} className={styles.hint} style={{ display: 'block' }}>
                                {x.message}
                              </span>
                            ))}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {publishError && (
                    <p className={`${styles.issue} ${styles.issueBad}`} role="alert">
                      {publishError}
                    </p>
                  )}
                  <button type="button" className={styles.btnPrimary} disabled={blocking.length > 0 || publishing} onClick={() => void publish()}>
                    {publishing ? <Loader2 size={16} className={styles.spin} /> : <Rocket size={16} />}
                    {blocking.length ? `Fix ${blocking.length} thing${blocking.length === 1 ? '' : 's'} first` : isPublished ? 'Update lesson' : 'Mark ready'}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LessonBuilder;
