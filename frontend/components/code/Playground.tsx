'use client';

/**
 * The Code playground (/dashboard/code): Python in the browser, outside any
 * lesson. Two modes:
 *
 *   Free code    an editor that remembers your last program on this device,
 *                with example programs to start from.
 *   Challenges   short tasks checked like lesson exercises, with a hint, the
 *                solution after two tries, and a celebration when they pass.
 *
 * Browser storage is a per-device convenience only (the draft and which
 * challenges you've done); it may be empty, and the page works without it.
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Eye, Lightbulb, SquareTerminal, Trophy } from 'lucide-react';
import { CHALLENGES, EXAMPLES, type PlaygroundChallenge } from '@/lib/code/playground';
import { fireConfetti } from '@/lib/confetti';
import { playSound } from '@/lib/audio/lessonSounds';
import { useHydrated } from '@/components/studio/useHydrated';
import { PythonPad } from './PythonPad';
import padStyles from './PythonPad.module.css';
import styles from './Playground.module.css';

const DRAFT_KEY = 'teyro.playground.draft';
const DONE_KEY = 'teyro.playground.done';

function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStore(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode or blocked storage: the page still works */
  }
}

type Mode = 'free' | 'challenges';

export function Playground() {
  const [mode, setMode] = useState<Mode>('free');
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.heroIcon} aria-hidden="true">
          <SquareTerminal size={34} strokeWidth={2.4} />
        </span>
        <div>
          <h1 className={styles.title}>Code playground</h1>
          <p className={styles.sub}>Write and run Python right here, on any device. Nothing to install.</p>
        </div>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Playground mode">
        {(
          [
            ['free', 'Free code'],
            ['challenges', 'Challenges'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            className={`${styles.tab} ${mode === id ? styles.tabOn : ''}`}
            onClick={() => {
              playSound('navTap');
              setMode(id);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'free' ? <FreeCode /> : <Challenges />}
    </div>
  );
}

// ─── Free code ───────────────────────────────────────────────────────────

/** Saved drafts live in this browser, so wait for hydration before reading them. */
function FreeCode() {
  const hydrated = useHydrated();
  return hydrated ? <FreeCodeEditor /> : <div className={styles.placeholder} aria-hidden="true" />;
}

function FreeCodeEditor() {
  // The last draft on this device, else the first example.
  const [code, setCode] = useState(() => readStore(DRAFT_KEY) ?? EXAMPLES[0].code);
  useEffect(() => {
    const t = window.setTimeout(() => writeStore(DRAFT_KEY, code), 400);
    return () => window.clearTimeout(t);
  }, [code]);

  return (
    <section className={styles.section} aria-label="Free code">
      <div className={styles.examples}>
        <span className={styles.examplesLabel}>Start from</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            type="button"
            className={styles.chip}
            onClick={() => {
              playSound('select');
              setCode(ex.code);
            }}
          >
            {ex.label}
          </button>
        ))}
        <button
          type="button"
          className={styles.chip}
          onClick={() => {
            playSound('select');
            setCode('');
          }}
        >
          Blank
        </button>
      </div>
      <PythonPad value={code} onChange={setCode} minLines={10} maxLines={24} label="Your Python program" />
      <p className={styles.note}>Your code is saved on this device as you type.</p>
    </section>
  );
}

// ─── Challenges ──────────────────────────────────────────────────────────

function readDone(): string[] {
  try {
    const raw = readStore(DONE_KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return []; // unreadable: start fresh
  }
}

function useDone() {
  const [done, setDone] = useState<string[]>(readDone);
  const markDone = (id: string) =>
    setDone((d) => {
      if (d.includes(id)) return d;
      const next = [...d, id];
      writeStore(DONE_KEY, JSON.stringify(next));
      return next;
    });
  return { done, markDone };
}

/** Which challenges are done lives in this browser: read it after hydration. */
function Challenges() {
  const hydrated = useHydrated();
  return hydrated ? <ChallengeList /> : <div className={styles.placeholder} aria-hidden="true" />;
}

function ChallengeList() {
  const { done, markDone } = useDone();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = CHALLENGES.find((c) => c.id === openId) ?? null;

  if (open) {
    const index = CHALLENGES.indexOf(open);
    const next = CHALLENGES[index + 1] ?? null;
    return (
      <ChallengeView
        key={open.id}
        challenge={open}
        number={index + 1}
        wasDone={done.includes(open.id)}
        onPassed={() => markDone(open.id)}
        onBack={() => setOpenId(null)}
        onNext={next ? () => setOpenId(next.id) : null}
      />
    );
  }

  return (
    <section className={styles.section} aria-label="Challenges">
      <p className={styles.progress}>
        <Trophy size={18} aria-hidden="true" /> {done.length} of {CHALLENGES.length} done
      </p>
      <ol className={styles.list}>
        {CHALLENGES.map((c, i) => {
          const isDone = done.includes(c.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                className={`${styles.challenge} ${isDone ? styles.challengeDone : ''}`}
                onClick={() => {
                  playSound('navTap', i);
                  setOpenId(c.id);
                }}
              >
                <span className={styles.challengeNo} aria-hidden="true">
                  {isDone ? <Check size={18} strokeWidth={3.5} /> : i + 1}
                </span>
                <span className={styles.challengeText}>
                  <span className={styles.challengeTitle}>{c.title}</span>
                  <span className={styles.challengeTask}>{c.task}</span>
                </span>
                <ArrowRight size={18} className={styles.challengeArrow} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ChallengeView({
  challenge,
  number,
  wasDone,
  onPassed,
  onBack,
  onNext,
}: {
  challenge: PlaygroundChallenge;
  number: number;
  wasDone: boolean;
  onPassed: () => void;
  onBack: () => void;
  onNext: (() => void) | null;
}) {
  const reduce = useReducedMotion();
  // Done before this visit, not just now.
  const [doneBefore] = useState(wasDone);
  const [code, setCode] = useState(challenge.starter);
  const [failed, setFailed] = useState(0);
  const [passed, setPassed] = useState(false);
  const [hint, setHint] = useState(false);
  const checks = useMemo(() => challenge.checks, [challenge]);

  return (
    <section className={styles.section} aria-label={challenge.title}>
      <button type="button" className={styles.back} onClick={onBack}>
        <ArrowLeft size={16} aria-hidden="true" /> All challenges
      </button>
      <div>
        <p className={styles.eyebrow}>
          Challenge {number} of {CHALLENGES.length}
          {doneBefore ? ' · done before' : ''}
        </p>
        <h2 className={styles.challengeHeading}>{challenge.title}</h2>
        <p className={styles.taskText}>{challenge.task}</p>
      </div>
      <PythonPad
        value={code}
        onChange={(c) => {
          setCode(c);
          setPassed(false);
        }}
        resetTo={challenge.starter}
        stdin={challenge.stdin}
        checks={checks}
        minLines={6}
        label={challenge.title}
        onRun={(run) => {
          if (run.allPassed) {
            setPassed(true);
            onPassed();
            if (!reduce) fireConfetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
          } else {
            setFailed((f) => f + 1);
          }
        }}
        actions={
          <>
            <button type="button" className={padStyles.ghost} onClick={() => setHint((h) => !h)} aria-expanded={hint}>
              <Lightbulb size={16} aria-hidden="true" /> Hint
            </button>
            {failed >= 2 && (
              <button type="button" className={padStyles.ghost} onClick={() => setCode(challenge.solution)}>
                <Eye size={16} aria-hidden="true" /> Show solution
              </button>
            )}
          </>
        }
      />
      {hint && <p className={styles.hint}>{challenge.hint}</p>}
      {passed && (
        <motion.div
          className={styles.win}
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          role="status"
        >
          <span className={styles.winIcon} aria-hidden="true">
            <Check size={22} strokeWidth={3.5} />
          </span>
          <span className={styles.winText}>Challenge complete!</span>
          {onNext ? (
            <button type="button" className={styles.winButton} onClick={onNext}>
              Next challenge <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button type="button" className={styles.winButton} onClick={onBack}>
              All challenges
            </button>
          )}
        </motion.div>
      )}
    </section>
  );
}
