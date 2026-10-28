'use client';

/**
 * A duel: up to five questions from a lesson you and a buddy both passed,
 * one at a time. Answers are scored on the server — this page never knows
 * the right option until you've answered them all. Then: your score, theirs
 * once they've played, and each question with both answers and the right one.
 */

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { Glyph } from '@/components/art/Glyph';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { useHydrated } from '@/components/studio/useHydrated';
import styles from '@/components/network/Network.module.css';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { NETWORK_KEYS, answerDuel, useRefreshNetwork, type DuelData } from '@/lib/network';

export default function DuelPage() {
  const { id } = useParams<{ id: string }>();
  const res = useSWR<DuelData>(id ? NETWORK_KEYS.duel(id) : null, fetcher, { revalidateOnFocus: true });
  const hydrated = useHydrated();
  const duel = hydrated ? res.data : undefined;

  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <Link href="/dashboard/network" className={styles.backLink} onClick={() => playSound('navTap', 1)}>
          <Glyph name="back" size={18} strokeWidth={2.8} /> Study buddies
        </Link>
        <h1 className={styles.pageTitle}>Duel</h1>
        {duel && (
          <p className={styles.pageSub}>
            You vs {duel.opponent.name} on {duel.lessonTitle}
          </p>
        )}
      </header>

      {res.error && !duel && hydrated ? (
        <div className={styles.errorBox}>
          <Glyph name="alert" size={26} />
          <span>{res.error instanceof Error ? res.error.message : "Couldn't load this duel."}</span>
          <Button variant="outline" onClick={() => void res.mutate()}>
            Try again
          </Button>
        </div>
      ) : !duel ? (
        <section className={styles.section}>
          <span className={styles.skelLine} style={{ width: '60%', height: 18 }} />
          <span className={styles.skelLine} style={{ width: '90%' }} />
          <span className={styles.skelLine} style={{ width: '80%' }} />
        </section>
      ) : duel.myTurn ? (
        <Play duel={duel} onDone={(d) => void res.mutate(d, { revalidate: false })} />
      ) : (
        <Result duel={duel} />
      )}
    </div>
  );
}

function Play({ duel, onDone }: { duel: DuelData; onDone: (d: DuelData) => void }) {
  const refresh = useRefreshNetwork();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const q = duel.questions[step];
  const last = step === duel.questions.length - 1;

  const submit = async (all: Record<string, string>) => {
    setBusy(true);
    setError(null);
    try {
      const d = await answerDuel(duel.id, all);
      playSound('lessonComplete');
      playHaptic('success', false);
      onDone(d);
      void refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send your answers.');
      playSound('nodeLocked');
      setBusy(false);
    }
  };

  if (!q) return null;
  const picked = answers[q.id];

  return (
    <section className={styles.section}>
      <div className={styles.duelStepper} aria-label={`Question ${step + 1} of ${duel.questions.length}`}>
        {duel.questions.map((x, i) => (
          <span key={x.id} className={`${styles.duelDot} ${i < step ? styles.duelDotDone : i === step ? styles.duelDotNow : ''}`} />
        ))}
      </div>
      {q.message && <p className={styles.reviewMessage}>“{q.message}”</p>}
      {q.code && <pre className={styles.codeBlock}>{q.code}</pre>}
      <p className={styles.reviewPrompt}>{q.prompt}</p>
      <div className={styles.reviewOptions} role="radiogroup" aria-label="Answers">
        {q.options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={picked === o.id}
            className={`${styles.reviewOpt} ${picked === o.id ? styles.optPicked : ''}`}
            disabled={busy}
            onClick={() => {
              playSound('select');
              setAnswers((a) => ({ ...a, [q.id]: o.id }));
            }}
          >
            {o.text}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.learnBtn}
        disabled={!picked || busy}
        onClick={() => {
          if (last) void submit(answers);
          else {
            playSound('cardNext');
            setStep((s) => s + 1);
          }
        }}
      >
        {last ? (busy ? 'Sending…' : 'Finish duel') : 'Next'} <Glyph name="chevron" size={16} strokeWidth={2.8} />
      </button>
      {error && <p className={styles.formError}>{error}</p>}
    </section>
  );
}

function Result({ duel }: { duel: DuelData }) {
  const first = duel.opponent.name.split(' ')[0];
  const me = duel.myScore ?? 0;
  const them = duel.theirScore;
  const headline =
    duel.status === 'EXPIRED'
      ? 'This duel ran out of time'
      : duel.status !== 'DONE'
        ? `You got ${me} of ${duel.total}. Now it's ${first}'s turn.`
        : me > (them ?? 0)
          ? `You won, ${me}–${them}`
          : me < (them ?? 0)
            ? `${first} won, ${them}–${me}`
            : `A tie, ${me}–${them}`;

  return (
    <>
      <section className={styles.duelScore}>
        <div className={styles.duelSide}>
          <span className={styles.duelBig}>{duel.myScore ?? '–'}</span>
          <span className={styles.personSub}>You</span>
        </div>
        <span className={styles.duelVs}>vs</span>
        <div className={styles.duelSide}>
          <Avatar size="sm" src={duel.opponent.avatar ?? undefined} name={duel.opponent.name} />
          <span className={styles.duelBig}>{them ?? '?'}</span>
          <span className={styles.personSub}>{first}</span>
        </div>
      </section>
      <p className={styles.duelHeadline}>{headline}</p>

      {duel.questions.some((q) => q.correct) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The questions</h2>
          {duel.questions.map((q, i) => {
            const right = q.options.find((o) => o.id === q.correct);
            const mine = q.options.find((o) => o.id === q.mine);
            const theirs = q.theirs !== undefined ? q.options.find((o) => o.id === q.theirs) : undefined;
            return (
              <div key={q.id} className={styles.duelReview}>
                <p className={styles.personName}>
                  {i + 1}. {q.prompt}
                </p>
                <p className={q.mine === q.correct ? styles.duelRight : styles.duelWrong}>
                  You: {mine?.text ?? 'no answer'}
                </p>
                {duel.status === 'DONE' && (
                  <p className={q.theirs === q.correct ? styles.duelRight : styles.duelWrong}>
                    {first}: {theirs?.text ?? 'no answer'}
                  </p>
                )}
                {q.mine !== q.correct && right && <p className={styles.mutedLine}>Right answer: {right.text}</p>}
                {q.explanation && <p className={styles.mutedLine}>{q.explanation}</p>}
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}
