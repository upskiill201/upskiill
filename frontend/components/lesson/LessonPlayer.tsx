'use client';

/**
 * LessonPlayer — a Teyro lesson, full screen, Duolingo-style.
 *
 *   ┌ X ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ♥ 5 ┐   one bar, grows every step
 *   │                                       │
 *   │   LEARN → APPLY → REFLECT → DEEPEN    │   one screen at a time
 *   │                                       │
 *   └──────────── [ CONTINUE ] ─────────────┘   one button, always here
 *
 * Nothing else is on screen while it runs: no sidebar, no floating buttons,
 * and every banner or celebration waits (lib/lesson/lessonFocus.ts) until
 * the lesson ends, then the lesson's own payoff plays first.
 *
 * The server stays the authority for everything that counts: completion,
 * XP, coins, hearts. This component only asks, and shows what it's told.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCelebration } from '@/context/CelebrationContext';
import { useGamification } from '@/context/GamificationContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { fireConfetti } from '@/lib/confetti';
import { playHaptic } from '@/lib/haptics';
import { communityScene, stashSectionChest, unitSummary } from '@/lib/lesson/completion';
import {
  accuracyPct,
  completeTitle,
  isPerfect,
  questProgress,
  statCards,
  type LessonStats,
  type MonthlyBeat,
  type MonthlyQuestLite,
  monthlyBeat,
  type Mission,
  type QuestRow,
} from '@/lib/lesson/outro';
import { markLessonFinished } from '@/lib/path/arrival';
import { monthlyQuestKey } from '@/lib/monthlyQuest';
import { enrollmentsKey, learningPathKey, type LearningPath } from '@/hooks/useCourse';
import { useSWRConfig } from 'swr';
import { getComboTier } from '@/lib/lesson/comboTier';
import {
  countWords,
  lessonPhases,
  lessonProgress,
  nextPhase,
  readLessonContent,
  type LessonPhase,
} from '@/lib/lesson/content';
import { learnCards } from '@/lib/lesson/learnCards';
import { pingLessonOpen, pingLessonQuit, quitStep } from '@/lib/lesson/lessonPings';
import { setLessonFocus } from '@/lib/lesson/lessonFocus';
import { readHistory, recordLesson } from '@/lib/lesson/history';
import {
  isFast,
  lessonBadges,
  lessonMoment,
  lessonsToday,
  randomPick,
  streakMoment,
  type Badge,
  type Moment,
  type MomentInput,
  type StreakMoment,
} from '@/lib/lesson/moments';
import {
  answerQuestion,
  currentQuestion,
  isFixing,
  mistakesLeft,
  nextQuestion,
  quizDone,
  reachedMistakes,
  startQuiz,
} from '@/lib/lesson/quizQueue';
import { fetchInventory, usePowerUp as spendPowerUp } from '@/lib/shop/api';
import {
  pickComboLine,
  pickFixMistakesLine,
  pickReflectLine,
  type Confidence,
  pickMomentLine,
  pickStreakMilestoneLine,
  pickPhaseUnlockLine,
  pickStreakLine,
  pickUnitCompleteLine,
  pickWrongAnswerLine,
} from '@/lib/tey/lessonVoice';
import { LessonFooter, type FooterVerdict } from './LessonFooter';
import { OutOfHeartsSheet, QuitSheet } from './LessonSheets';
import { LessonTopBar } from './LessonTopBar';
import { TeyPreload } from './TeyPreload';
import type { TeyPose } from './TeySays';
import type { AnswerState } from './steps/ApplyStep';
import { ExerciseStep } from './exercises/ExerciseStep';
import { gradeExercise, isResponseComplete, type ExerciseResponse } from '@/lib/lesson/blocks';
import { DeepenStep } from './steps/DeepenStep';
import { DailyQuests } from './outro/DailyQuests';
import { LessonComplete } from './outro/LessonComplete';
import { StreakDay } from './outro/StreakDay';
import { UnitComplete } from './outro/UnitComplete';
import { LeagueClimb } from './outro/LeagueClimb';
import { computeClimb, type Board, type Climb } from '@/lib/leaderboard/leagueClimb';
import { markLeaderboardSeen } from '@/lib/leaderboard/leaderboardEvents';
import { LearnStep } from './steps/LearnStep';
import { CONFIDENCE_OPTIONS, ReflectStep } from './steps/ReflectStep';
import { FixMistakes } from './steps/FixMistakes';
import styles from './Lesson.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any -- lesson payload is creator JSON */

const CORRECT_TITLES = ['Nice!', 'Correct!', 'Great job!', 'You got it!', 'Nailed it!', 'Spot on!'];
const RUN_TITLES = ['Unstoppable!', 'On fire!', 'Brilliant!'];
const FIXED_TITLES = ['Fixed it!', 'Got it now!', "That's the one!"];
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];
/** When to look for the lesson's XP on the league board (ms after saving). */
const LEAGUE_READS = [1200, 2600, 4200];
const missionsUrl = () => `/api/v2/missions/today?timezoneOffset=${new Date().getTimezoneOffset()}`;

export interface LessonPlayerProps {
  /** The full lesson from the guarded lesson endpoint. */
  lesson: any;
  courseId: string;
  /** Already completed: practice, no hearts at risk. */
  isReview: boolean;
  /** Admin reading content: no writes, no hearts, no celebrations. */
  adminReviewMode?: boolean;
  /** Leaving without finishing (quit, out of hearts). */
  onExit: () => void;
  /** The server confirmed completion — mark it done locally. */
  onCompleted: (lessonId: string) => void;
  /** After the celebration chain (or straight away for a replay). */
  onFinished: () => void;
}

export function LessonPlayer({
  lesson,
  courseId,
  isReview: isReviewAtOpen,
  adminReviewMode = false,
  onExit,
  onCompleted,
  onFinished,
}: LessonPlayerProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  // Decided once, when the lesson opens. Finishing marks the lesson complete
  // upstream, and re-reading it then would turn this very lesson's payoff
  // into "Practice complete!" halfway through the celebration.
  const [isReview] = useState(isReviewAtOpen);
  const {
    xp,
    lives,
    loseLife,
    applyLessonReward,
    refillLivesWithXp,
    streakDays,
    refresh,
    daysSinceLastLesson,
    lastLessonCompletedAt,
    longestStreak,
  } = useGamification();
  // Read once, as the lesson opens — finishing it changes all three, and the
  // finish screen is about how things stood before this lesson.
  const [atOpen] = useState(() => ({
    daysAway: daysSinceLastLesson,
    lastAt: lastLessonCompletedAt,
    longest: longestStreak > 0 ? longestStreak : null,
  }));
  // Stat titles rotate between lessons but stay put within one.
  const [labelPick] = useState(() => {
    const chosen = new Map<string, string>();
    return (list: string[]) => {
      const key = list.join('|');
      if (!chosen.has(key)) chosen.set(key, randomPick(list));
      return chosen.get(key)!;
    };
  });
  const { celebrate, closeAll } = useCelebration();
  const { mutate } = useSWRConfig();

  const content = useMemo(() => readLessonContent(lesson), [lesson]);
  const phases = lessonPhases(content);
  const exercises = content.apply.exercises;
  const heartsAtRisk = !isReview && !adminReviewMode;

  // ── Focus: the lesson owns the screen while it's open ───────────────────
  useEffect(() => {
    setLessonFocus(true);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      setLessonFocus(false);
      document.body.style.overflow = overflow;
    };
  }, []);

  const startedAt = useRef(Date.now());
  const [phase, setPhase] = useState<LessonPhase>(phases[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: LessonPhase) => {
    setPhase(next);
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  // ── Learn: one card at a time ───────────────────────────────────────────
  // A video card must be watched to the end; a broken video never traps
  // anyone (onError counts as ended). Every other card is just CONTINUE.
  const cards = useMemo(() => learnCards(content.learn), [content]);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardDir, setCardDir] = useState<1 | -1>(1);
  const card = cards[Math.min(cardIndex, cards.length - 1)];
  const [mediaEnded, setMediaEnded] = useState(false);
  const [checkPicks, setCheckPicks] = useState<Record<string, number>>({});
  const learnGated =
    !isReview &&
    !adminReviewMode &&
    ((card.kind === 'video' && !mediaEnded) || (card.kind === 'check' && checkPicks[card.id] === undefined));
  const pickCheck = (i: number) => {
    if (card.kind !== 'check' || checkPicks[card.id] !== undefined) return;
    const right = i === card.correctIndex;
    setCheckPicks((p) => ({ ...p, [card.id]: i }));
    playSound(right ? 'correct' : 'wrong', right ? 1 : 0);
    playHaptic(right ? 'success' : 'error', false);
  };
  const wasGated = useRef(learnGated);
  useEffect(() => {
    if (wasGated.current && !learnGated) playSound('gateOpen');
    wasGated.current = learnGated;
  }, [learnGated]);

  const nextCard = () => {
    if (learnGated) return;
    playHaptic('medium', false);
    if (cardIndex < cards.length - 1) {
      setCardDir(1);
      setCardIndex(cardIndex + 1);
      playSound('cardNext');
      scrollRef.current?.scrollTo({ top: 0 });
      return;
    }
    const next = nextPhase(content, 'learn') ?? 'reflect';
    if (next === 'apply') say('pointing', pickPhaseUnlockLine('apply', { watchedVideo: mediaEnded }));
    goTo(next);
  };
  const prevCard = () => {
    if (cardIndex === 0) return;
    playSound('cardBack');
    playHaptic('light', false);
    setCardDir(-1);
    setCardIndex(cardIndex - 1);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  // ── Apply: a queue, so mistakes come back to be fixed ───────────────────
  const [quiz, setQuiz] = useState(() => startQuiz(exercises.length));
  const [fixIntro, setFixIntro] = useState(false);
  const [response, setResponse] = useState<ExerciseResponse | null>(null);
  const [answer, setAnswer] = useState<AnswerState>('idle');
  const [verdict, setVerdict] = useState<FooterVerdict>(null);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const wrongCount = useRef(0);
  /** Questions answered wrong at least once — the accuracy on the finish screen. */
  const missed = useRef(new Set<string>());
  const [tey, setTey] = useState<{ pose: TeyPose; line: string; key: number }>(() => ({
    pose: 'pointing',
    line: '',
    key: 0,
  }));
  const say = (pose: TeyPose, line: string) => setTey((t) => ({ pose, line, key: t.key + 1 }));
  const qi = currentQuestion(quiz);
  const exercise = qi !== null ? exercises[qi] : undefined;
  const fixing = isFixing(quiz);

  const [shieldAbsorbed, setShieldAbsorbed] = useState(false);
  useEffect(() => {
    if (!shieldAbsorbed) return;
    const t = setTimeout(() => setShieldAbsorbed(false), 2600);
    return () => clearTimeout(t);
  }, [shieldAbsorbed]);

  const check = () => {
    if (!exercise || !isResponseComplete(exercise, response)) return;
    const correct = gradeExercise(exercise, response);
    setQuiz((q) => answerQuestion(q, correct));
    if (correct) {
      const run = combo + 1;
      setCombo(run);
      if (run > bestCombo) setBestCombo(run);
      setAnswer('correct');
      playHaptic('success', false);
      playSound('correct', run);
      setVerdict({
        kind: 'correct',
        title: fixing ? pick(FIXED_TITLES) : run >= 5 ? pick(RUN_TITLES) : pick(CORRECT_TITLES),
        body: exercise.explanation ?? null,
      });
      say('cheering', run >= 3 ? pickComboLine(run) : tey.line);
      if (getComboTier(run) === 5 && !reducedMotion) {
        fireConfetti({ particleCount: 26, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      missed.current.add(exercise.id);
      const broken = combo;
      setCombo(0);
      setAnswer('wrong');
      playHaptic('error', false);
      playSound('wrong');
      // Duolingo's way: show the right answer now, ask again later.
      // Multiple choice names the right answer and why the pick was tempting;
      // the other kinds show the right answer in place (ExerciseStep).
      let body: string | null = exercise.explanation ?? null;
      if (exercise.kind === 'mcq' && response?.kind === 'mcq') {
        const right = exercise.options.find((o) => o.id === exercise.correctOptionId)?.text;
        const picked = exercise.options.find((o) => o.id === response.optionId);
        body = [right ? `Correct answer: ${right}` : null, picked?.misconception ?? exercise.explanation].filter(Boolean).join('\n');
      }
      setVerdict({ kind: 'wrong', title: 'Not quite', body });
      say('thinking', pickWrongAnswerLine(broken));
      if (heartsAtRisk) {
        wrongCount.current += 1;
        // A Perfect Lesson Protection charge may absorb this; the server
        // decides, we just make sure the learner knows it saved them.
        void loseLife().then((r: any) => {
          if (r?.shieldAbsorbed) setShieldAbsorbed(true);
          // The heart only breaks if it was really lost.
          else playSound('heartLost');
        });
      }
    }
  };

  const afterAnswer = () => {
    playHaptic('medium', false);
    setAnswer('idle');
    setResponse(null);
    setVerdict(null);
    const next = nextQuestion(quiz);
    setQuiz(next);
    if (!quizDone(next) && !reachedMistakes(next)) playSound('next');
    scrollRef.current?.scrollTo({ top: 0 });
    if (quizDone(next)) {
      goTo(nextPhase(content, 'apply') ?? 'reflect');
    } else if (reachedMistakes(next)) {
      setFixIntro(true);
      playSound('fixMistakes');
    } else {
      say('pointing', '');
    }
  };

  // Out of hearts: only asked for when it matters.
  const outOfHearts = heartsAtRisk && phase === 'apply' && lives === 0;
  useEffect(() => {
    if (outOfHearts) playSound('outOfHearts');
  }, [outOfHearts]);
  const [retryCharges, setRetryCharges] = useState<number | null>(null);
  const [heartsBusy, setHeartsBusy] = useState(false);
  useEffect(() => {
    if (!outOfHearts || retryCharges !== null) return;
    fetchInventory()
      .then((inv) => setRetryCharges(inv.items.find((i) => i.id === 'LESSON_RETRY')?.quantity ?? 0))
      .catch(() => setRetryCharges(0));
  }, [outOfHearts, retryCharges]);

  // ── Reflect: a tap, then your own words (optional) ──────────────────────
  const [reflectSub, setReflectSub] = useState<'confidence' | 'write'>('confidence');
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [reflectLine, setReflectLine] = useState('');
  const [reflectText, setReflectText] = useState('');
  const [guided, setGuided] = useState<string[]>([]);
  const reflect = content.reflect;
  const reflectWords =
    reflect.type === 'open' ? countWords(reflectText) : guided.reduce((n, g) => n + countWords(g ?? ''), 0);

  // ── Finish: the outro ───────────────────────────────────────────────────
  // FINISH goes straight to "Lesson complete!" and saves underneath, so the
  // payoff never waits on the network. The screens after it (streak, daily
  // quests) appear only when there's something true to show; the rarer
  // milestones (unit, course, community) follow as full celebrations.
  const [outro, setOutro] = useState<'complete' | 'streak' | 'quests' | 'league' | 'unit' | null>(null);
  const [climb, setClimb] = useState<Climb | null>(null);
  const [stats, setStats] = useState<LessonStats | null>(null);
  const [moment, setMoment] = useState<{ look: Moment; badges: Badge[]; line: string } | null>(null);
  const [streakLine, setStreakLine] = useState('');
  const [streakBeat, setStreakBeat] = useState<StreakMoment | null>(null);
  const [unitLine, setUnitLine] = useState('');
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [finishError, setFinishError] = useState<string | null>(null);
  const [questRows, setQuestRows] = useState<QuestRow[]>([]);
  const [monthly, setMonthly] = useState<MonthlyBeat | null>(null);
  const monthlyBefore = useRef<MonthlyQuestLite | null>(null);
  const navigatedRef = useRef(false);
  const secondsRef = useRef(0);

  // The league board as it stood before this lesson — what a climb is
  // measured from (lib/leaderboard/leagueClimb.ts).
  const leagueBefore = useRef<Board | null>(null);
  useEffect(() => {
    if (isReview || adminReviewMode) return;
    fetch('/api/leagues/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        leagueBefore.current = d;
      })
      .catch(() => {});
  }, [isReview, adminReviewMode]);

  /**
   * The lesson's XP reaches the league through a background listener, so
   * look a few times until it has landed (the learner is still on the
   * lesson-complete screen meanwhile).
   */
  const readLeagueClimb = () => {
    const before = leagueBefore.current;
    const myBefore = before?.standings?.find((r) => r.isMe)?.weeklyXp ?? 0;
    const attempt = (i: number) =>
      setTimeout(async () => {
        try {
          const r = await fetch('/api/leagues/me', { credentials: 'include' });
          const after = r.ok ? ((await r.json()) as Board) : null;
          const myAfter = after?.standings?.find((row) => row.isMe)?.weeklyXp ?? 0;
          const landed = after?.joined && (!before?.joined || myAfter > myBefore);
          if (landed || i === LEAGUE_READS.length - 1) {
            setClimb(computeClimb(before, after));
            return;
          }
          attempt(i + 1);
        } catch {
          // No league screen this time.
        }
      }, LEAGUE_READS[i]);
    attempt(0);
  };

  // Today's quests as they stood before this lesson — the start of each bar.
  const questsBefore = useRef<Mission[] | null>(null);
  useEffect(() => {
    if (isReview || adminReviewMode) return;
    fetch(missionsUrl(), { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        questsBefore.current = Array.isArray(d?.missions) ? d.missions : null;
      })
      .catch(() => {});
    // …and the month's challenge, for the goal-day beat.
    fetch(monthlyQuestKey(), { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        monthlyBefore.current = d;
      })
      .catch(() => {});
  }, [isReview, adminReviewMode]);

  /** Quests update in the background after a save — look twice at most. */
  /** Goal days are written by the same background listener — look twice. */
  const readMonthlyBeat = () => {
    const attempt = (delay: number, last: boolean) =>
      setTimeout(async () => {
        try {
          const r = await fetch(monthlyQuestKey(), { credentials: 'include' });
          const beat = monthlyBeat(monthlyBefore.current, r.ok ? await r.json() : null);
          if (beat) setMonthly(beat);
          else if (!last) attempt(1800, true);
        } catch {
          // No monthly beat this time.
        }
      }, delay);
    attempt(1100, false);
  };

  const readQuestProgress = () => {
    const attempt = (delay: number, last: boolean) =>
      setTimeout(async () => {
        try {
          const r = await fetch(missionsUrl(), { credentials: 'include' });
          const d = r.ok ? await r.json() : null;
          const rows = questProgress(questsBefore.current, Array.isArray(d?.missions) ? d.missions : null);
          if (rows.length > 0) setQuestRows(rows);
          else if (!last) attempt(1600, true);
        } catch {
          // No quests screen this time — never an error for the learner.
        }
      }, delay);
    attempt(900, false);
  };

  const save = async () => {
    if (saving) return;
    setSaving(true);
    setFinishError(null);
    try {
      const res = await fetch(`/api/courses/${courseId}/complete-lesson`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          timezoneOffset: new Date().getTimezoneOffset(),
          timeSpentSeconds: secondsRef.current,
          ...(exercises.length > 0 && {
            correctAnswers: Math.max(0, exercises.length - missed.current.size),
            attemptsCount: wrongCount.current + 1,
            quizScorePct: Math.round(
              ((exercises.length - Math.min(wrongCount.current, exercises.length)) / exercises.length) * 100,
            ),
            // First-try misses, for the creator's "hardest exercises".
            missedBlockIds: Array.from(missed.current),
          }),
        }),
      });
      if (res.status === 403) {
        setFinishError('This lesson is locked. Unlock the full course to save your progress.');
        return;
      }
      if (!res.ok) {
        setFinishError("Your progress didn't save. Check your connection and try again.");
        return;
      }
      const data = await res.json();
      setResult(data);
      onCompleted(lesson.id);
      stashSectionChest(data, streakDays);
      // Home shows it the moment the learner gets there: the node checked
      // off, the next one unlocking (lib/path/arrival.ts).
      markLessonFinished(courseId, lesson.id);
      void mutate(
        learningPathKey(courseId),
        (p?: LearningPath) =>
          p && !p.completedLessons.includes(lesson.id)
            ? { ...p, completedLessons: [...p.completedLessons, lesson.id] }
            : p,
        { revalidate: true },
      );
      void mutate(enrollmentsKey);
      if (data.newXp !== undefined && data.newStreakDays !== undefined) {
        applyLessonReward(data.newXp, data.newStreakDays, data.newCoins);
      }
      window.dispatchEvent(new Event('lesson:completed'));
      window.dispatchEvent(new Event('mission:refresh'));
      void refresh();
      if (data.isNewCompletion !== false) {
        readQuestProgress();
        readMonthlyBeat();
        readLeagueClimb();
      }
    } catch {
      setFinishError("Your progress didn't save. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const finish = () => {
    if (outro) return;
    if (adminReviewMode) {
      playHaptic('success', false);
      onFinished();
      return;
    }
    // The last rung of the phase ladder, then straight into the payoff.
    playHaptic('success', false);
    playSound('phaseUnlock', 3);
    const seconds = Math.max(0, Math.round((Date.now() - startedAt.current) / 1000));
    secondsRef.current = seconds;
    const s: LessonStats = {
      questions: exercises.length,
      missed: missed.current.size,
      seconds,
      words: reflectWords,
      expectedMinutes: typeof lesson.durationMinutes === 'number' ? lesson.durationMinutes : null,
    };
    setStats(s);
    // What this finish is about — from what really happened, measured against
    // the learner's own recent lessons (lib/lesson/moments.ts).
    const input: MomentInput = {
      stats: s,
      bestCombo,
      isReview,
      history: readHistory(),
      now: new Date(),
      daysSinceLastLesson: atOpen.daysAway,
      lastLessonAt: atOpen.lastAt,
    };
    const look = lessonMoment(input);
    setMoment({
      look,
      badges: lessonBadges(input),
      line: pickMomentLine(look.id, {
        daysAway: atOpen.daysAway,
        today: lessonsToday(input),
        run: bestCombo,
        streak: streakDays,
        perfect: isPerfect(s),
        fast: isFast(s),
        isReview,
      }),
    });
    if (!isReview) {
      recordLesson({ at: Date.now(), lessonId: lesson.id, accuracy: accuracyPct(s), seconds, bestCombo });
    }
    setOutro('complete');
    scrollRef.current?.scrollTo({ top: 0 });
    void save();
  };

  const unit = unitSummary(result);

  /** After the in-lesson screens: the community welcome if earned, then out. */
  const endOutro = () => {
    // Always home: the path there shows what's next (there is no unit map).
    const leave = () => onFinished();
    const welcome =
      result?.isNewCompletion === false
        ? null
        : communityScene(result, (id) => {
            navigatedRef.current = true;
            closeAll();
            router.push(`/dashboard/community/${id}?compose=1`);
          });
    if (!welcome) {
      leave();
      return;
    }
    (welcome as { onComplete?: () => void }).onComplete = () => {
      if (!navigatedRef.current) leave();
    };
    // Goes ahead of anything that waited during the lesson; then the held
    // queue is released.
    celebrate(welcome, { front: true });
    setLessonFocus(false);
  };

  const nextOutro = () => {
    playHaptic('medium', false);
    const fresh = result?.isNewCompletion !== false;
    const order: ('complete' | 'streak' | 'quests' | 'league' | 'unit')[] = ['complete'];
    if (fresh && result?.isFirstStreakOfDay) order.push('streak');
    if (fresh && (questRows.length > 0 || monthly)) order.push('quests');
    if (fresh && climb) order.push('league');
    if (fresh && unit) order.push('unit');
    const next = order[order.indexOf(outro ?? 'complete') + 1];
    if (!next) {
      endOutro();
      return;
    }
    if (next === 'streak') {
      const days = result.newStreakDays ?? streakDays;
      const beat = streakMoment(days, atOpen.longest);
      setStreakBeat(beat);
      setStreakLine(
        beat.milestone || beat.personalBest ? pickStreakMilestoneLine(days, beat.personalBest) : pickStreakLine(days),
      );
    }
    if (next === 'unit' && unit) setUnitLine(pickUnitCompleteLine(unit.courseComplete));
    // Shown here — so the rank watcher and the tab dot treat it as seen.
    if (next === 'league' && climb) {
      void fetch('/api/leagues/me', { credentials: 'include' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d && markLeaderboardSeen(d))
        .catch(() => {});
    }
    setOutro(next);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  // ── Creator analytics: opened, and where a learner left part-way ────────
  // Only real attempts count: no replays, no admin reads.
  const tracked = !isReview && !adminReviewMode;
  const leftRef = useRef(false);
  const whereRef = useRef(() => quitStep(phase, { index: cardIndex, total: cards.length }, exercise?.id));
  whereRef.current = () => quitStep(phase, { index: cardIndex, total: cards.length }, exercise?.id);
  const finishedRef = useRef(false);
  finishedRef.current = outro !== null;
  const reportLeft = useCallback(() => {
    if (!tracked || leftRef.current || finishedRef.current) return;
    leftRef.current = true;
    pingLessonQuit(courseId, lesson.id, whereRef.current());
  }, [tracked, courseId, lesson.id]);
  useEffect(() => {
    if (!tracked) return;
    pingLessonOpen(courseId, lesson.id);
    // Closing the tab or the app mid-lesson is a quit too.
    window.addEventListener('pagehide', reportLeft);
    const openedAt = Date.now();
    return () => {
      window.removeEventListener('pagehide', reportLeft);
      // Leaving another way (the back button). Dev's instant double-mount
      // isn't a quit.
      if (Date.now() - openedAt > 1500) reportLeft();
    };
  }, [tracked, courseId, lesson.id, reportLeft]);

  // ── Quit ────────────────────────────────────────────────────────────────
  const [quitOpen, setQuitOpen] = useState(false);
  const requestQuit = () => {
    playHaptic('light', false);
    // Nothing to lose in a replay or an admin read — just leave.
    if (isReview || adminReviewMode) onExit();
    else {
      setQuitOpen(true);
      playSound('quitOpen');
    }
  };

  // ── The one button ──────────────────────────────────────────────────────
  const progress = lessonProgress(content, {
    phase,
    learnCards: cards.length,
    learnDone: cardIndex,
    questionsDone: quiz.solved.length,
    reflectDone: reflectSub === 'write' ? 1 : 0,
    finished: outro !== null,
  });

  let footer: {
    label: string;
    onAction: () => void;
    disabled?: boolean;
    hint?: string;
    variant?: 'primary' | 'correct' | 'wrong' | 'ghost';
  } = { label: 'Continue', onAction: () => {} };
  if (phase === 'learn') {
    footer = {
      label: 'Continue',
      disabled: learnGated,
      hint: learnGated ? 'Watch the video to the end to continue' : undefined,
      onAction: nextCard,
    };
  } else if (phase === 'apply') {
    footer = fixIntro
      ? {
          label: 'Continue',
          onAction: () => {
            playHaptic('medium', false);
            setFixIntro(false);
            say('pointing', pickFixMistakesLine());
          },
        }
      : answer === 'idle'
        ? { label: 'Check', disabled: !exercise || !isResponseComplete(exercise, response), onAction: check }
        : { label: answer === 'correct' ? 'Continue' : 'Got it', onAction: afterAnswer };
  } else if (phase === 'reflect') {
    footer =
      reflectSub === 'confidence'
        ? {
            label: 'Continue',
            disabled: !confidence,
            onAction: () => {
              if (!confidence) return;
              playHaptic('medium', false);
              setReflectLine(pickReflectLine(confidence));
              setReflectSub('write');
              scrollRef.current?.scrollTo({ top: 0 });
            },
          }
        : {
            // Writing is optional — the button says so until there are words.
            label: reflectWords > 0 ? 'Continue' : 'Skip',
            variant: reflectWords > 0 ? 'primary' : 'ghost',
            onAction: () => {
              playHaptic('success', false);
              goTo('deepen');
            },
          };
  } else {
    footer = { label: 'Finish lesson', onAction: finish };
  }
  if (outro) {
    footer =
      finishError && !result
        ? { label: 'Try again', disabled: saving, onAction: () => void save() }
        : { label: 'Continue', disabled: !result, onAction: nextOutro };
  }

  // Keyboard: Enter presses the button, 1–9 pick an answer, Esc asks to quit.
  const footerRef = useRef(footer);
  footerRef.current = footer;
  const selectRef = useRef<(i: number) => void>(() => {});
  selectRef.current = (i: number) => {
    if (outro) return;
    if (phase === 'reflect' && reflectSub === 'confidence') {
      const o = CONFIDENCE_OPTIONS[i];
      if (!o) return;
      playHaptic('selection', false);
      setConfidence(o.id);
      playSound('select');
      return;
    }
    if (phase === 'learn' && card.kind === 'check') {
      if (i < card.options.length) pickCheck(i);
      return;
    }
    if (phase !== 'apply' || fixIntro || answer !== 'idle' || !exercise) return;
    if (exercise.kind === 'mcq' && i < exercise.options.length) {
      setResponse({ kind: 'mcq', optionId: exercise.options[i].id });
    } else if (exercise.kind === 'findBug' && i < exercise.lines.length) {
      setResponse({ kind: 'findBug', line: i });
    } else {
      return;
    }
    playHaptic('selection', false);
    playSound('select');
  };
  // Learn cards: arrow keys and swipes move between them.
  const cardNavRef = useRef({ next: nextCard, prev: prevCard, active: false });
  cardNavRef.current = { next: nextCard, prev: prevCard, active: phase === 'learn' && !outro };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) return;
      if (e.key === 'Enter') {
        const f = footerRef.current;
        if (!f.disabled) {
          e.preventDefault();
          f.onAction();
        }
      } else if (/^[1-9]$/.test(e.key)) {
        selectRef.current(Number(e.key) - 1);
      } else if (e.key === 'ArrowRight' && cardNavRef.current.active) {
        cardNavRef.current.next();
      } else if (e.key === 'ArrowLeft' && cardNavRef.current.active) {
        cardNavRef.current.prev();
      } else if (e.key === 'Escape') {
        setQuitOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const stepKey =
    outro ??
    (phase === 'learn'
      ? `learn-${cardIndex}`
      : phase === 'apply'
        ? fixIntro
          ? 'fix-intro'
          : `apply-${quiz.pos}`
        : phase === 'reflect'
          ? `reflect-${reflectSub}`
          : phase);
  const slideFrom = phase === 'learn' && !outro ? cardDir * 48 : 48;
  const replay = isReview || result?.isNewCompletion === false;

  return (
    <div
      className={`${styles.player} fixed inset-0 z-[90000] flex flex-col bg-white`}
      role="dialog"
      aria-modal="true"
      aria-label={`Lesson: ${lesson.title ?? ''}`}
    >
      <TeyPreload />

      {/* The finish screens have no chrome — the lesson is over. */}
      {outro ? (
        <div className="shrink-0 h-[calc(env(safe-area-inset-top)+16px)]" />
      ) : (
        <LessonTopBar
          progress={progress}
          phase={phase}
          combo={phase === 'apply' ? combo : 0}
          hearts={adminReviewMode ? null : lives}
          onClose={requestQuit}
        />
      )}

      <AnimatePresence>
        {shieldAbsorbed && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(env(safe-area-inset-top)+70px)] md:top-[84px] z-[2] inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-extrabold text-white"
            style={{ backgroundColor: 'var(--lesson-correct-dark)' }}
          >
            <Shield className="w-4 h-4 stroke-[2.8]" aria-hidden="true" />
            Protection used · no heart lost
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <div
          className={`mx-auto w-full max-w-[640px] px-4 md:px-6 ${outro ? 'min-h-full flex flex-col' : 'pt-4 md:pt-10 pb-10'}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stepKey}
              custom={slideFrom}
              variants={{
                enter: (d: number) => (reducedMotion ? { opacity: 0 } : { opacity: 0, x: d }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => (reducedMotion ? { opacity: 0 } : { opacity: 0, x: -d }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 460, damping: 38 }}
              className={outro || fixIntro ? 'flex-1 flex flex-col' : undefined}
              // Swipe between Learn cards, like turning a page.
              drag={phase === 'learn' && !outro && !reducedMotion ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (phase !== 'learn' || outro) return;
                if (info.offset.x < -80) nextCard();
                else if (info.offset.x > 80) prevCard();
              }}
            >
              {outro === 'complete' && stats && (
                <LessonComplete
                  title={moment?.look.title ?? completeTitle(stats, { isReview: replay })}
                  line={moment?.line ?? ''}
                  confetti={moment?.look.confetti ?? 'burst'}
                  entrance={moment?.look.entrance ?? 'bounce'}
                  badges={replay ? [] : (moment?.badges ?? [])}
                  pose={moment?.look.pose ?? 'cheering'}
                  cards={statCards(stats, result ? (result.xpEarned ?? 0) : null, { isReview: replay, pick: labelPick })}
                  error={finishError}
                />
              )}
              {outro === 'streak' && streakBeat && (
                <StreakDay days={result?.newStreakDays ?? streakDays} line={streakLine} moment={streakBeat} />
              )}
              {outro === 'quests' && <DailyQuests rows={questRows} monthly={monthly} />}
              {outro === 'league' && climb && <LeagueClimb climb={climb} />}
              {outro === 'unit' && unit && <UnitComplete unit={unit} line={unitLine} />}
              {!outro && phase === 'learn' && (
                <LearnStep
                  title={lesson.title ?? 'Lesson'}
                  card={card}
                  index={cardIndex}
                  total={cards.length}
                  points={content.learn.whatYouWillLearn}
                  onMediaEnded={() => setMediaEnded(true)}
                  checkPick={card.kind === 'check' ? checkPicks[card.id] ?? null : null}
                  onCheckPick={pickCheck}
                />
              )}
              {!outro && phase === 'apply' && fixIntro && <FixMistakes count={mistakesLeft(quiz)} />}
              {!outro && phase === 'apply' && !fixIntro && exercise && (
                <ExerciseStep
                  key={`${exercise.id}-${quiz.pos}`}
                  exercise={exercise}
                  eyebrow={
                    fixing
                      ? `Fix a mistake${mistakesLeft(quiz) > 1 ? ` · ${mistakesLeft(quiz)} left` : ''}`
                      : `Apply · ${quiz.pos + 1} of ${quiz.firstPass}`
                  }
                  scenario={content.apply.scenario}
                  response={response}
                  onResponse={(r) => {
                    if (answer === 'idle') setResponse(r);
                  }}
                  answer={answer}
                  tey={tey}
                />
              )}
              {!outro && phase === 'reflect' && (
                <ReflectStep
                  sub={reflectSub}
                  reflect={reflect}
                  confidence={confidence}
                  onConfidence={(c) => {
                    playHaptic('selection', false);
                    setConfidence(c);
                    playSound('select');
                  }}
                  teyLine={reflectLine}
                  text={reflectText}
                  onText={setReflectText}
                  guided={guided}
                  onGuided={(i, v) =>
                    setGuided((prev) => {
                      const next = [...prev];
                      next[i] = v;
                      return next;
                    })
                  }
                />
              )}
              {!outro && phase === 'deepen' && (
                <DeepenStep title={content.deepen.title} description={content.deepen.description} resources={content.resources} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <LessonFooter
        label={footer.label}
        onAction={footer.onAction}
        disabled={footer.disabled}
        hint={footer.hint}
        verdict={!outro && phase === 'apply' ? verdict : null}
        variant={outro ? (finishError && !result ? 'primary' : 'correct') : footer.variant}
      />

      <QuitSheet
        open={quitOpen}
        progressPct={Math.round(progress * 100)}
        onKeepGoing={() => {
          playSound('keepGoing');
          playHaptic('medium', false);
          setQuitOpen(false);
        }}
        onQuit={() => {
          playHaptic('light', false);
          setQuitOpen(false);
          reportLeft();
          onExit();
        }}
      />

      <OutOfHeartsSheet
        open={outOfHearts}
        xp={xp}
        retryCharges={retryCharges ?? 0}
        busy={heartsBusy}
        onUseRetry={async () => {
          if (heartsBusy) return;
          setHeartsBusy(true);
          try {
            playHaptic('success', false);
            await spendPowerUp('LESSON_RETRY');
            setRetryCharges((n) => Math.max(0, (n ?? 1) - 1));
            await refresh();
          } catch {
            // Falls back to the refill and the exit — never stranded.
          } finally {
            setHeartsBusy(false);
          }
        }}
        onRefill={async () => {
          if (heartsBusy) return;
          setHeartsBusy(true);
          try {
            playHaptic('success', false);
            await refillLivesWithXp();
          } finally {
            setHeartsBusy(false);
          }
        }}
        onLeave={() => {
          playHaptic('light', false);
          reportLeft();
          onExit();
        }}
      />
    </div>
  );
}

export default LessonPlayer;
