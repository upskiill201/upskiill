'use client';

/**
 * LessonPlayer — a Teyro lesson, full screen, Duolingo-style.
 *
 *   START ─▶ LEARN ─▶ (gate) ─▶ APPLY ─▶ (gate) ─▶ REFLECT ─▶ DEEPEN ─▶ FINISH
 *     │                          │                                       │
 *     │  where you are, what's   │  combo ladder, hints, skip,           │  a finish that grows
 *     │  at stake today          │  music that builds with the run       │  across the day, then
 *     ▼                          ▼                                       ▼  the next lesson, one tap
 *   ┌ X ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ♪  ♥ 5 ┐
 *   │                 one screen at a time                │
 *   └────────────────── [ CONTINUE ] ─────────────────────┘
 *
 * Nothing else is on screen while it runs: no sidebar, no floating buttons,
 * and every banner or celebration waits (lib/lesson/lessonFocus.ts) until
 * the lesson ends, then the lesson's own payoff plays first.
 *
 * What keeps a learner in (and the research it leans on, see lib/lesson):
 *  - journey.ts   the lesson knows its chapter: progress you can see and a
 *                 goal getting closer pull people on (goal-gradient).
 *  - hype.ts      a combo ladder with real bonus XP, and a finish that grows
 *                 with every lesson today, so no two finishes feel the same.
 *  - hints.ts     a real step toward the answer when someone is stuck, and
 *                 Skip, so one hard question never ends a lesson.
 *  - The quit sheet shows what's at stake, and the last screen opens the
 *    next lesson in one tap instead of sending everyone home.
 *
 * The server stays the authority for everything that counts: completion,
 * XP (including the performance bonus), coins, hearts. This component only
 * asks, and shows what it's told.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCelebration } from '@/context/CelebrationContext';
import { useGamification } from '@/context/GamificationContext';
import { playSound } from '@/lib/audio/lessonSounds';
import {
  duckMusic,
  musicLevelForRun,
  musicStumble,
  setMusicIntensity,
  setMusicMood,
  startLessonMusic,
  stopLessonMusic,
} from '@/lib/audio/lessonMusic';
import soundManager, { AUDIO_SETTINGS_STORAGE_KEY } from '@/lib/audio/soundManager';
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
import {
  enrollmentsKey,
  learningPathKey,
  lessonHref,
  useLearningPath,
  type LearningPath,
} from '@/hooks/useCourse';
import { courseHomeHref, setHomeCourse } from '@/lib/homeCourse';
import { buildUnlockHref } from '@/lib/return-to';
import { monthOf, shiftMonth, useStreakCalendar } from '@/hooks/useStreak';
import type { CalendarDay } from '@/context/StreakContext';
import { yesterdayWasFrozen } from '@/lib/streak/week';
import { useSWRConfig } from 'swr';
import { getComboTier } from '@/lib/lesson/comboTier';
import {
  countWords,
  lessonPhases,
  lessonProgress,
  nextPhase,
  PHASE_LABEL,
  PHASE_ORDER,
  readLessonContent,
  type LessonPhase,
} from '@/lib/lesson/content';
import { learnCards } from '@/lib/lesson/learnCards';
import { pingLessonOpen, pingLessonQuit, quitStep } from '@/lib/lesson/lessonPings';
import { clearSpot, readSpot, saveSpot } from '@/lib/lesson/resume';
import { setLessonFocus } from '@/lib/lesson/lessonFocus';
import { readHistory, recordLesson } from '@/lib/lesson/history';
import { lessonJourney, type NextLesson } from '@/lib/lesson/journey';
import { HINT_NUDGE_SECONDS, HINTS_PER_LESSON, nextHint, NO_HINTS, type HintMemory } from '@/lib/lesson/hints';
import { comboRung, finishTier, isRungStart, PERFECT_BONUS_XP, sessionName, type FinishTier } from '@/lib/lesson/hype';
import { introLine } from '@/lib/lesson/introLines';
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
  pickStreakThawLine,
  pickUnitCompleteLine,
  pickLevelCompleteLine,
  pickWrongAnswerLine,
} from '@/lib/tey/lessonVoice';
import { LessonFooter, type FooterVerdict } from './LessonFooter';
import { OutOfHeartsSheet, QuitSheet } from './LessonSheets';
import { LessonTopBar } from './LessonTopBar';
import { ComboBurst, type ComboBurstEvent } from './ComboBurst';
import { ComboAura, ComboBreak, type ComboBreakEvent } from './ComboHud';
import { ApplyTools } from './ApplyTools';
import { LessonIntro } from './LessonIntro';
import { PhaseGate } from './PhaseGate';
import { TeyPreload } from './TeyPreload';
import type { TeyPose } from './TeySays';
import type { AnswerState } from './steps/ApplyStep';
import { ExerciseStep } from './exercises/ExerciseStep';
import {
  gradeExercise,
  isResponseComplete,
  RICH_LEARN_KINDS,
  type Exercise,
  type ExerciseResponse,
  type RichLearnCard,
} from '@/lib/lesson/blocks';
import { richCardNeedsAction } from './steps/RichLearnCard';
import { DeepenStep } from './steps/DeepenStep';
import { DailyQuests } from './outro/DailyQuests';
import { LessonComplete } from './outro/LessonComplete';
import { StreakDay, type StreakDayKind } from './outro/StreakDay';
import { UnitComplete } from './outro/UnitComplete';
import { LevelComplete } from './outro/LevelComplete';
import { ChapterJourney } from './outro/ChapterJourney';
import type { LevelCompletion } from '@/lib/originals';
import { LeagueClimb } from './outro/LeagueClimb';
import { computeClimb, type Board, type Climb } from '@/lib/leaderboard/leagueClimb';
import { markLeaderboardSeen } from '@/lib/leaderboard/leaderboardEvents';
import { LearnStep } from './steps/LearnStep';
import { CONFIDENCE_OPTIONS, ReflectStep } from './steps/ReflectStep';
import { FixMistakes } from './steps/FixMistakes';
import styles from './Lesson.module.css';
import ShareMilestoneButton from '@/components/share/ShareMilestoneButton';
import CertificatePill from '@/components/certificates/CertificatePill';
import { isLessonMilestone, isStreakMilestone, type ShareCardRequest } from '@/lib/share/types';

/* eslint-disable @typescript-eslint/no-explicit-any -- lesson payload is creator JSON */

const CORRECT_TITLES = ['Nice!', 'Correct!', 'Great job!', 'You got it!', 'Nailed it!', 'Spot on!'];
const RUN_TITLES = ['Unstoppable!', 'On fire!', 'Brilliant!'];
const FIXED_TITLES = ['Fixed it!', 'Got it now!', "That's the one!"];
const SKIP_LINES = [
  "No problem. Here's the answer, take a look and we'll keep going.",
  'Skipped. Read the answer, it might pop up again later.',
  "That's fine. Here's how it works.",
];
const NUDGE_LINES = ['Stuck? Tap the bulb for a hint.', 'Need a nudge? The bulb has one.', 'A hint might help here. Tap the bulb.'];
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

/** First-ever lesson: mistakes are free, and Tey makes sure they know it. */
const FREE_MISTAKE_LINES = [
  "No hearts lost. First lesson's on me.",
  "Free mistake. I'm generous today. Don't get used to it.",
  "That one's free. First lessons don't cost hearts. The rest? We'll see.",
];

/** How long a video card holds Continue before letting the learner skip ahead. */
const VIDEO_GRACE_MS = 20_000;

/** When to look for the lesson's XP on the league board (ms after saving). */
const LEAGUE_READS = [1200, 2600, 4200];
const missionsUrl = () => `/api/v2/missions/today?timezoneOffset=${new Date().getTimezoneOffset()}`;

/** Simulated lessons finished in this page session (learner preview only). */
let simulatedToday = 0;

type OutroStep = 'complete' | 'streak' | 'quests' | 'league' | 'unit' | 'level' | 'journey';

interface Gate {
  from: LessonPhase;
  to: LessonPhase;
  result: string | null;
  ahead: string | null;
  hot: string | null;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Music on/off, saved where the settings page keeps it. */
function saveMusicSetting(on: boolean) {
  soundManager.setMusicEnabled(on);
  try {
    localStorage.setItem(AUDIO_SETTINGS_STORAGE_KEY, soundManager.exportConfigJson());
  } catch {
    // Storage blocked: the switch still works for this visit.
  }
}

export interface LessonPlayerProps {
  /** The full lesson from the guarded lesson endpoint. */
  lesson: any;
  courseId: string;
  /** Already completed: practice, no hearts at risk. */
  isReview: boolean;
  /** Admin reading content: no writes, no hearts, no celebrations. */
  adminReviewMode?: boolean;
  /**
   * Learner preview (dev): everything a learner sees, the start screen to the
   * last screen, with nothing saved and no hearts spent.
   */
  simulate?: boolean;
  /** The course path, when it can't be fetched (previews). */
  pathOverride?: LearningPath | null;
  /** Open the next lesson (previews); default: navigate to its lesson route. */
  onNextLesson?: (next: NextLesson) => void;
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
  simulate = false,
  pathOverride = null,
  onNextLesson,
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
  const [atOpen] = useState(() => {
    const history = readHistory();
    const now = new Date();
    const lastAt = lastLessonCompletedAt;
    const doneToday = simulate ? simulatedToday : history.filter((r) => sameDay(new Date(r.at), now)).length;
    const practicedToday = lastAt ? sameDay(new Date(lastAt), now) : false;
    return {
      daysAway: daysSinceLastLesson,
      lastAt,
      longest: longestStreak > 0 ? longestStreak : null,
      lessonsToday: doneToday,
      streakAtStake: streakDays > 0 && !practicedToday && !isReviewAtOpen ? streakDays : null,
      bestRunBefore: history.reduce((m, r) => Math.max(m, r.bestCombo ?? 0), 0),
      enoughHistory: history.length >= 3,
    };
  });
  // The streak calendar as it stood when the lesson opened: the week row on
  // the streak screen, and whether a freeze held yesterday (an "unfreeze").
  // Last month too in the first week, so the week and yesterday are whole.
  const [openMonth] = useState(() => monthOf(new Date()));
  const [needPrevMonth] = useState(() => new Date().getDate() <= 7);
  const { data: calThis } = useStreakCalendar(openMonth);
  const { data: calPrev } = useStreakCalendar(needPrevMonth ? shiftMonth(openMonth, -1) : openMonth);
  const [calendarAtOpen, setCalendarAtOpen] = useState<CalendarDay[] | undefined>(undefined);
  if (!calendarAtOpen && calThis && (!needPrevMonth || calPrev)) {
    setCalendarAtOpen(needPrevMonth ? [...(calPrev?.days ?? []), ...calThis.days] : calThis.days);
  }
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
  // A learner's very first lesson costs no hearts: the worst first
  // impression Teyro can make is "out of hearts" before you've finished
  // anything. (Decided at open, like isReview.)
  const [firstEverLesson] = useState(() => lastLessonCompletedAt == null && !(simulate && simulatedToday > 0));
  const heartsAtRisk = !isReview && !adminReviewMode && !firstEverLesson && !simulate;
  /** Real writes: progress, pings, history. Not for admins or previews. */
  const writes = !adminReviewMode && !simulate;

  // ── Where this lesson sits: its chapter, what's next ────────────────────
  const { path: fetchedPath } = useLearningPath(pathOverride || simulate ? null : courseId);
  const coursePath = pathOverride ?? fetchedPath;
  const journey = useMemo(() => lessonJourney(coursePath, lesson.id), [coursePath, lesson.id]);

  // ── Focus: the lesson owns the screen while it's open ───────────────────
  useEffect(() => {
    setLessonFocus(true);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      setLessonFocus(false);
      document.body.style.overflow = overflow;
      stopLessonMusic(0.3);
    };
  }, []);

  const startedAt = useRef(Date.now());
  // Left part-way last time? Pick up at the same card (or the questions).
  const [spot] = useState(() => (isReviewAtOpen || !writes ? null : readSpot(lesson.id)));
  const [phase, setPhase] = useState<LessonPhase>(() =>
    spot?.phase === 'apply' && phases.includes('apply') ? 'apply' : phases[0],
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Music: a groove under the lesson that builds with the run ───────────
  const [musicOn, setMusicOn] = useState(() => soundManager.getMusicEnabled());
  const toggleMusic = () => {
    const on = !musicOn;
    setMusicOn(on);
    saveMusicSetting(on);
    playHaptic('light', false);
    if (on) startLessonMusic(phase === 'apply' ? 'apply' : phase === 'learn' ? 'learn' : 'reflect');
    else stopLessonMusic(0.4);
  };
  useEffect(() => {
    setMusicMood(phase === 'apply' ? 'apply' : phase === 'learn' ? 'learn' : 'reflect');
  }, [phase]);

  // ── Start: the lesson's start screen (not for an admin read) ────────────
  const [started, setStarted] = useState(adminReviewMode);
  // Tey's opening line: picked once (a stable seed), re-read when the
  // chapter arrives so a Checkpoint or a chapter's last lesson is named.
  const [introSeed] = useState(() => Math.random());
  const introText = useMemo(
    () =>
      introLine(
        {
          resuming: Boolean(spot),
          firstEver: firstEverLesson,
          isReview,
          lessonsToday: atOpen.lessonsToday,
          streakAtStake: atOpen.streakAtStake,
          milestone: journey?.milestone ?? null,
          endsChapter: Boolean(journey?.endsChapter),
        },
        <T,>(list: T[]) => list[Math.floor(introSeed * list.length)],
      ),
    [spot, firstEverLesson, isReview, atOpen, journey, introSeed],
  );
  const start = () => {
    if (started) return;
    playSound('lessonStart');
    playHaptic('heavy', false);
    setStarted(true);
    startedAt.current = Date.now();
    if (musicOn && !adminReviewMode) startLessonMusic(phase === 'apply' ? 'apply' : 'learn');
  };

  const goTo = useCallback((next: LessonPhase) => {
    setPhase(next);
    scrollRef.current?.scrollTo({ top: 0 });
  }, []);

  // ── Gates: a step finished feels finished ───────────────────────────────
  const [gate, setGate] = useState<Gate | null>(null);
  const passGate = () => {
    if (!gate) return;
    const to = gate.to;
    setGate(null);
    playHaptic('medium', false);
    goTo(to);
  };

  // ── Learn: one card at a time ───────────────────────────────────────────
  // A video card asks to be watched to the end; a broken video never traps
  // anyone (onError counts as ended). Every other card is just CONTINUE.
  // The lesson's "you'll learn" card moved to the start screen.
  const cards = useMemo(() => {
    const all = learnCards(content.learn);
    if (adminReviewMode) return all;
    const rest = all.filter((c) => c.kind !== 'intro');
    return rest.length > 0 ? rest : all;
  }, [content, adminReviewMode]);
  const [cardIndex, setCardIndex] = useState(() =>
    spot?.phase === 'learn' ? Math.max(0, Math.min(spot.card, cards.length - 1)) : 0,
  );
  const [cardDir, setCardDir] = useState<1 | -1>(1);
  const card = cards[Math.min(cardIndex, cards.length - 1)];
  const [mediaEnded, setMediaEnded] = useState(false);
  const [checkPicks, setCheckPicks] = useState<Record<string, number>>({});
  // Rich Originals cards (story decision, chat, walkthrough, explore, myth)
  // finished by the learner, by card id. They never cost hearts.
  const [richDone, setRichDone] = useState<Record<string, true>>({});
  const richCard = (RICH_LEARN_KINDS as readonly string[]).includes(card.kind) ? (card as RichLearnCard) : null;
  const markRichDone = useCallback((cardId: string) => {
    setRichDone((d) => (d[cardId] ? d : { ...d, [cardId]: true }));
  }, []);
  // ...but never for long: after VIDEO_GRACE_MS on a video card, Continue
  // unlocks anyway. A long intro video you must sit through is where real
  // learners quit lesson 1 for good.
  const [videoGraceCard, setVideoGraceCard] = useState<number | null>(null);
  useEffect(() => {
    if (card.kind !== 'video' || mediaEnded || isReview || adminReviewMode) return;
    const at = cardIndex;
    const t = setTimeout(() => setVideoGraceCard(at), VIDEO_GRACE_MS);
    return () => clearTimeout(t);
  }, [card.kind, cardIndex, mediaEnded, isReview, adminReviewMode]);
  const learnGated =
    !isReview &&
    !adminReviewMode &&
    ((card.kind === 'video' && !mediaEnded && videoGraceCard !== cardIndex) ||
      (card.kind === 'check' && checkPicks[card.id] === undefined) ||
      (richCard !== null && richCardNeedsAction(richCard) && !richDone[richCard.id]));
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
    if (adminReviewMode) {
      goTo(next);
      return;
    }
    setGate({
      from: 'learn',
      to: next,
      result: `${cards.length} ${cards.length === 1 ? 'card' : 'cards'} read`,
      ahead:
        next === 'apply'
          ? `${exercises.length} ${exercises.length === 1 ? 'question' : 'questions'} · combo bonus up to +5 XP · ${HINTS_PER_LESSON} hints ready`
          : next === 'reflect'
            ? 'A quick check-in, in your own words'
            : null,
      hot: null,
    });
    scrollRef.current?.scrollTo({ top: 0 });
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
  const [comboBurst, setComboBurst] = useState<ComboBurstEvent | null>(null);
  const clearComboBurst = useCallback(() => setComboBurst(null), []);
  const [comboBreak, setComboBreak] = useState<ComboBreakEvent | null>(null);
  useEffect(() => {
    if (!comboBreak) return;
    const t = setTimeout(() => setComboBreak(null), 2200);
    return () => clearTimeout(t);
  }, [comboBreak]);
  const bestAnnounced = useRef(false);
  const wrongCount = useRef(0);
  /** Questions answered wrong at least once, or skipped — the accuracy on the finish screen. */
  const missed = useRef(new Set<string>());
  const skipped = useRef(0);
  // Hints: a small budget per lesson; memory per question.
  const [hintsLeft, setHintsLeft] = useState(HINTS_PER_LESSON);
  const [hintMemory, setHintMemory] = useState<HintMemory>(NO_HINTS);
  const hintsUsed = useRef(0);
  const [stalled, setStalled] = useState(false);
  const [tey, setTey] = useState<{ pose: TeyPose; line: string; key: number }>(() => ({
    pose: 'pointing',
    line: '',
    key: 0,
  }));
  const say = (pose: TeyPose, line: string) => setTey((t) => ({ pose, line, key: t.key + 1 }));
  const qi = currentQuestion(quiz);
  const exercise: Exercise | undefined = qi !== null ? exercises[qi] : undefined;
  const fixing = isFixing(quiz);

  // The music follows the run.
  useEffect(() => {
    setMusicIntensity(musicLevelForRun(combo));
  }, [combo]);

  // A question sat on for a while: the bulb offers itself (once per question).
  const questionKey = `${exercise?.id ?? ''}-${quiz.pos}`;
  useEffect(() => {
    setStalled(false);
    if (!started || phase !== 'apply' || fixIntro || answer !== 'idle' || adminReviewMode) return;
    const t = setTimeout(() => setStalled(true), (fixing ? 8 : HINT_NUDGE_SECONDS) * 1000);
    return () => clearTimeout(t);
  }, [questionKey, started, phase, fixIntro, answer, adminReviewMode, fixing, response]);
  const canHint = useMemo(
    () => Boolean(exercise && answer === 'idle' && nextHint(exercise, response, hintMemory)),
    [exercise, answer, response, hintMemory],
  );
  const nudgedFor = useRef('');
  useEffect(() => {
    if (!stalled || !canHint || hintsLeft === 0 || nudgedFor.current === questionKey) return;
    nudgedFor.current = questionKey;
    say('thinking', pick(NUDGE_LINES));
  }, [stalled, canHint, hintsLeft, questionKey]);

  const takeHint = () => {
    if (!exercise || answer !== 'idle' || hintsLeft <= 0) return;
    const h = nextHint(exercise, response, hintMemory);
    if (!h) return;
    setHintMemory(h.memory);
    if (h.response !== undefined) setResponse(h.response);
    setHintsLeft((n) => n - 1);
    hintsUsed.current += 1;
    setStalled(false);
    say('pointing', h.line);
    playSound('hint');
    playHaptic('light', false);
  };

  const breakRun = (run: number) => {
    if (run >= 3) {
      setComboBreak((b) => ({ run, key: (b?.key ?? 0) + 1 }));
      setTimeout(() => playSound('comboBreak'), 260);
    }
    musicStumble();
  };

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
    // Write and run with the solution shown: right, but the combo starts over.
    const viaSolution = response?.kind === 'writeCode' && response.usedSolution;
    if (correct) {
      const run = viaSolution ? 0 : combo + 1;
      setCombo(run);
      if (run > bestCombo) setBestCombo(run);
      setAnswer('correct');
      playHaptic('success', false);
      playSound('correct', run);
      setVerdict({
        kind: 'correct',
        title: viaSolution ? 'Solution used' : fixing ? pick(FIXED_TITLES) : run >= 5 ? pick(RUN_TITLES) : pick(CORRECT_TITLES),
        body: viaSolution
          ? ['Read it line by line until each line makes sense. The next one is yours.', exercise.explanation].filter(Boolean).join('\n')
          : (exercise.explanation ?? null),
      });
      // A hint's line doesn't linger past the answer it helped with.
      say('cheering', run >= 3 ? pickComboLine(run) : '');
      // A personal best (beats every recent lesson), once; else the rungs.
      const best =
        !bestAnnounced.current && atOpen.enoughHistory && run >= 3 && run > atOpen.bestRunBefore && !isReview;
      if (best) bestAnnounced.current = true;
      if (best || isRungStart(run) || (run > 15 && run % 5 === 0)) {
        setComboBurst((b) => ({ run, key: (b?.key ?? 0) + run + 1, best }));
      }
      if (getComboTier(run) === 5 && !reducedMotion) {
        fireConfetti({ particleCount: 26, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      missed.current.add(exercise.id);
      const broken = combo;
      setCombo(0);
      breakRun(broken);
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
      say('thinking', firstEverLesson ? pick(FREE_MISTAKE_LINES) : pickWrongAnswerLine(broken));
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

  /** Skip: see the answer, lose nothing but the point. It doesn't come back. */
  const skip = () => {
    if (!exercise || answer !== 'idle') return;
    missed.current.add(exercise.id);
    skipped.current += 1;
    setQuiz((q) => answerQuestion(q, true));
    const broken = combo;
    setCombo(0);
    breakRun(broken);
    setAnswer('wrong');
    playSound('skip');
    playHaptic('light', false);
    let body: string | null = exercise.explanation ?? null;
    if (exercise.kind === 'mcq') {
      const right = exercise.options.find((o) => o.id === exercise.correctOptionId)?.text;
      body = [right ? `Answer: ${right}` : null, exercise.explanation].filter(Boolean).join('\n');
    }
    setVerdict({ kind: 'skip', title: 'Skipped', body });
    say('pointing', pick(SKIP_LINES));
  };

  const afterAnswer = () => {
    playHaptic('medium', false);
    setAnswer('idle');
    setResponse(null);
    setVerdict(null);
    setHintMemory(NO_HINTS);
    const next = nextQuestion(quiz);
    setQuiz(next);
    if (!quizDone(next) && !reachedMistakes(next)) playSound('next');
    scrollRef.current?.scrollTo({ top: 0 });
    if (quizDone(next)) {
      endPractice();
    } else if (reachedMistakes(next)) {
      setFixIntro(true);
      playSound('fixMistakes');
    } else {
      say('pointing', '');
    }
  };

  /** Practice over: the gate shows how it went, then on to the next step. */
  const endPractice = () => {
    const to = nextPhase(content, 'apply') ?? 'reflect';
    if (adminReviewMode) {
      goTo(to);
      return;
    }
    const right = Math.max(0, exercises.length - missed.current.size);
    duckMusic(1.6);
    setGate({
      from: 'apply',
      to,
      result: `${right} of ${exercises.length} right first time${bestCombo >= 3 ? ` · best run ${bestCombo}` : ''}`,
      ahead: to === 'reflect' ? 'A quick check-in, in your own words' : to === 'deepen' ? 'Go further, if you like' : null,
      hot: comboRung(bestCombo) ? `+${comboRung(bestCombo)!.bonusXp} XP combo bonus earned` : null,
    });
  };

  /** From the quit sheet: skip the rest of the questions, finish the lesson. */
  const skipPractice = () => {
    const unsolved = quiz.order.slice(quiz.pos).filter((i, n, all) => !quiz.solved.includes(i) && all.indexOf(i) === n);
    for (const i of unsolved) {
      const ex = exercises[i];
      if (ex && !missed.current.has(ex.id)) {
        missed.current.add(ex.id);
        skipped.current += 1;
      }
    }
    setQuiz((q) => ({ ...q, pos: q.order.length }));
    setAnswer('idle');
    setResponse(null);
    setVerdict(null);
    setFixIntro(false);
    setCombo(0);
    setQuitOpen(false);
    playSound('skip');
    goTo(nextPhase(content, 'apply') ?? 'reflect');
  };

  // Out of hearts: only asked for when it matters. Beginner Teyro Originals
  // are forgiving (docs/ORIGINALS_PLAYBOOK.md §14): mistakes still cost
  // hearts, but running out never stops the learner. Read from the map's
  // cached path; until it loads, the normal rule applies.
  const forgivingHearts = !!coursePath?.original?.forgivingHearts;
  const outOfHearts = heartsAtRisk && !forgivingHearts && phase === 'apply' && lives === 0;
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
  // milestones (unit, course, community) follow as full celebrations, and the
  // chapter map with the next lesson closes it.
  const [outro, setOutro] = useState<OutroStep | null>(null);
  const [climb, setClimb] = useState<Climb | null>(null);
  const [stats, setStats] = useState<LessonStats | null>(null);
  const [moment, setMoment] = useState<{ look: Moment; badges: Badge[]; line: string } | null>(null);
  const [tier, setTier] = useState<FinishTier>(1);
  const [streakLine, setStreakLine] = useState('');
  const [streakBeat, setStreakBeat] = useState<StreakMoment | null>(null);
  const [streakKind, setStreakKind] = useState<StreakDayKind>('extend');
  const [unitLine, setUnitLine] = useState('');
  const [levelLine, setLevelLine] = useState('');
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
    if (isReview || !writes) return;
    fetch('/api/leagues/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        leagueBefore.current = d;
      })
      .catch(() => {});
  }, [isReview, writes]);

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
    if (isReview || !writes) return;
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
  }, [isReview, writes]);

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

  /** Quests update in the background after a save — look twice at most. */
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

  const firstTryRight = () => Math.max(0, exercises.length - missed.current.size);

  /** Learner preview: what the server would say, without asking it. */
  const simulatedResult = () => {
    const right = firstTryRight();
    const run = Math.min(bestCombo, right);
    const comboXp = comboRung(run)?.bonusXp ?? 0;
    const perfectXp =
      exercises.length > 0 && missed.current.size === 0 && right >= 3 && hintsUsed.current === 0 && skipped.current === 0
        ? PERFECT_BONUS_XP
        : 0;
    const base = typeof lesson.xpReward === 'number' ? lesson.xpReward : 10;
    simulatedToday += 1;
    return {
      success: true,
      isNewCompletion: !isReview,
      xpEarned: isReview ? 0 : base + comboXp + perfectXp,
      xpBreakdown: isReview ? undefined : { lesson: base, section: 0, combo: comboXp, perfect: perfectXp, boost: 1 },
      coinsEarned: 5,
      isFirstStreakOfDay: !isReview && !atOpen.lastAt,
      newStreakDays: Math.max(1, streakDays + (atOpen.streakAtStake ? 1 : 0)),
    };
  };

  const save = async () => {
    if (saving) return;
    setSaving(true);
    setFinishError(null);
    if (simulate) {
      setTimeout(() => {
        setResult(simulatedResult());
        onCompleted(lesson.id);
        setSaving(false);
      }, 500);
      return;
    }
    try {
      const n = exercises.length;
      const res = await fetch(`/api/courses/${courseId}/complete-lesson`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId: lesson.id,
          timezoneOffset: new Date().getTimezoneOffset(),
          timeSpentSeconds: secondsRef.current,
          ...(n > 0 && {
            correctAnswers: firstTryRight(),
            attemptsCount: wrongCount.current + 1,
            quizScorePct: Math.round((firstTryRight() / n) * 100),
            // First-try misses, for the creator's "hardest exercises".
            missedBlockIds: Array.from(missed.current),
            // The performance bonus (backend lesson-bonus.util.ts).
            bestCombo,
            hintsUsed: hintsUsed.current,
            skipped: skipped.current,
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
      // Finished a whole Original level: the server enrolled them in the next
      // one, so home opens on it (docs/ORIGINALS_PLAYBOOK.md §3).
      if (data.levelComplete?.next?.courseId) setHomeCourse(data.levelComplete.next.courseId);
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
    stopLessonMusic(0.5);
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
    // How big this finish is: it grows with every lesson today.
    setTier(
      finishTier({
        isReview,
        lessonsToday: atOpen.lessonsToday + 1,
        perfect: isPerfect(s) && hintsUsed.current === 0 && skipped.current === 0,
        bestCombo,
        endsChapter: Boolean(journey?.endsChapter),
        milestone: Boolean(journey?.milestone),
      }),
    );
    if (!isReview && writes) {
      recordLesson({ at: Date.now(), lessonId: lesson.id, accuracy: accuracyPct(s), seconds, bestCombo });
    }
    setOutro('complete');
    scrollRef.current?.scrollTo({ top: 0 });
    void save();
  };

  const unit = unitSummary(result);
  // Finished a whole Teyro Original level (server: levelComplete).
  const levelDone: LevelCompletion | null = result?.levelComplete ?? null;
  // The next lesson, opened from the last screen (not across an Original level).
  const nextUp = journey?.next && !levelDone ? journey.next : null;

  // The milestone this finish screen can be shared as (a Share pill top-right).
  // Only real, first-time completions — never a replay, preview or review.
  const lessonsDone = Array.isArray(result?.completedLessons) ? (result.completedLessons as unknown[]).length : 0;
  const realFinish = Boolean(result?.isNewCompletion) && !isReview && !simulate && !adminReviewMode;
  const outroShare: ShareCardRequest | null = !realFinish
    ? null
    : outro === 'streak' && streakBeat && isStreakMilestone(result?.newStreakDays ?? 0)
      ? { kind: 'STREAK' }
      : outro === 'complete' && lessonsDone === 1
        ? { kind: 'COURSE_STARTED', courseId }
        : outro === 'complete' && isLessonMilestone(lessonsDone)
          ? { kind: 'LESSONS', courseId }
          : outro === 'unit' && unit
            ? unit.courseComplete
              ? { kind: 'COURSE_COMPLETE', courseId }
              : { kind: 'CHAPTER_COMPLETE', sectionId: unit.sectionId }
            : outro === 'level' && levelDone
              ? { kind: 'COURSE_COMPLETE', courseId }
              : null;
  // The course's last lesson: its certificate is ready (issued on first ask).
  const courseFinished =
    realFinish && ((outro === 'unit' && Boolean(unit?.courseComplete)) || (outro === 'level' && Boolean(levelDone)));

  /** After the in-lesson screens: the community welcome if earned, then out. */
  const endOutro = (dest: 'home' | 'next' = 'home') => {
    const leave = () => {
      if (dest === 'next' && nextUp) {
        if (onNextLesson) onNextLesson(nextUp);
        else router.replace(lessonHref(courseId, nextUp.sectionIndex, nextUp.id));
        return;
      }
      // Home: the path there shows what's next.
      onFinished();
    };
    const welcome =
      result?.isNewCompletion === false || simulate
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

  const startNext = () => {
    if (!nextUp) {
      endOutro('home');
      return;
    }
    playHaptic('heavy', false);
    if (nextUp.locked) {
      playSound('start');
      router.push(buildUnlockHref(courseId, courseHomeHref(courseId)));
      return;
    }
    playSound('start');
    endOutro('next');
  };

  const nextOutro = () => {
    playHaptic('medium', false);
    const fresh = result?.isNewCompletion !== false;
    const order: OutroStep[] = ['complete'];
    if (fresh && result?.isFirstStreakOfDay) order.push('streak');
    if (fresh && (questRows.length > 0 || monthly)) order.push('quests');
    if (fresh && climb) order.push('league');
    if (fresh && unit) order.push('unit');
    if (fresh && levelDone) order.push('level');
    if (journey && !levelDone) order.push('journey');
    const next = order[order.indexOf(outro ?? 'complete') + 1];
    if (!next) {
      endOutro('home');
      return;
    }
    if (next === 'streak') {
      const days = result.newStreakDays ?? streakDays;
      const beat = streakMoment(days, atOpen.longest);
      const kind: StreakDayKind =
        days <= 1 ? 'start' : yesterdayWasFrozen(calendarAtOpen) ? 'thaw' : 'extend';
      setStreakBeat(beat);
      setStreakKind(kind);
      setStreakLine(
        kind === 'thaw'
          ? pickStreakThawLine(days)
          : beat.milestone || beat.personalBest
            ? pickStreakMilestoneLine(days, beat.personalBest)
            : pickStreakLine(days),
      );
    }
    if (next === 'unit' && unit) setUnitLine(pickUnitCompleteLine(unit.courseComplete));
    if (next === 'level' && levelDone) setLevelLine(pickLevelCompleteLine(!!levelDone.next));
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
  // Only real attempts count: no replays, no admin reads, no previews.
  const tracked = !isReview && writes;
  const leftRef = useRef(false);
  const whereRef = useRef(() => quitStep(phase, { index: cardIndex, total: cards.length }, exercise?.id));
  whereRef.current = () => quitStep(phase, { index: cardIndex, total: cards.length }, exercise?.id);
  const finishedRef = useRef(false);
  finishedRef.current = outro !== null;

  // Keep their place for next time; a finished lesson forgets it.
  useEffect(() => {
    if (!tracked) return;
    if (outro !== null) clearSpot(lesson.id);
    else saveSpot(lesson.id, phase, cardIndex);
  }, [tracked, outro, phase, cardIndex, lesson.id]);
  const progressRef = useRef(0);
  const reportLeft = useCallback(() => {
    if (!tracked || leftRef.current || finishedRef.current) return;
    leftRef.current = true;
    pingLessonQuit(courseId, lesson.id, whereRef.current(), progressRef.current * 100);
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
    // Nothing to lose in a replay, an admin read, or before it started.
    if (isReview || adminReviewMode || !started) onExit();
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
  progressRef.current = progress;

  // What's left, for the quit sheet.
  const questionsLeft = Math.max(0, exercises.length - quiz.solved.length);
  const leftLine =
    phase === 'learn'
      ? `${cards.length - cardIndex} ${cards.length - cardIndex === 1 ? 'card' : 'cards'}${exercises.length ? ` and ${exercises.length} questions` : ''} left`
      : phase === 'apply'
        ? `${questionsLeft} ${questionsLeft === 1 ? 'question' : 'questions'} left`
        : phase === 'reflect'
          ? 'a quick reflection left'
          : 'one tap left';

  let footer: {
    label: string;
    onAction: () => void;
    disabled?: boolean;
    hint?: string;
    variant?: 'primary' | 'correct' | 'wrong' | 'ghost';
  } = { label: 'Continue', onAction: () => {} };
  if (!started) {
    footer = { label: 'Start', onAction: start };
  } else if (gate) {
    footer = { label: "Let's go", onAction: passGate, variant: 'primary' };
  } else if (phase === 'learn') {
    footer = {
      label: 'Continue',
      disabled: learnGated,
      hint: learnGated
        ? card.kind === 'check'
          ? 'Pick an answer to continue'
          : card.kind === 'video'
            ? 'Watch the video to the end to continue'
            : card.kind === 'tryIt'
              ? 'Run the code to continue'
              : 'Finish this card to continue'
        : undefined,
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
        ? {
            label: 'Check',
            disabled: !exercise || !isResponseComplete(exercise, response),
            hint:
              exercise?.kind === 'writeCode' && !isResponseComplete(exercise, response)
                ? exercise.language === 'html'
                  ? 'Check your page. Check unlocks when everything passes.'
                  : 'Run your code. Check unlocks when everything passes.'
                : undefined,
            onAction: check,
          }
        : {
            label: answer === 'correct' || verdict?.kind === 'skip' ? 'Continue' : 'Got it',
            onAction: afterAnswer,
            variant: verdict?.kind === 'skip' ? 'primary' : undefined,
          };
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
        : outro === 'journey'
          ? {
              label: nextUp
                ? nextUp.locked
                  ? 'Unlock the full course'
                  : nextUp.newChapter
                    ? 'Start the next chapter'
                    : `Start lesson ${(journey?.lessonNumber ?? 0) + 1}`
                : 'Continue',
              onAction: startNext,
            }
          : { label: 'Continue', disabled: !result, onAction: nextOutro };
  }

  // Keyboard: Enter presses the button, 1–9 pick an answer, Esc asks to quit.
  const footerRef = useRef(footer);
  footerRef.current = footer;
  const selectRef = useRef<(i: number) => void>(() => {});
  selectRef.current = (i: number) => {
    if (outro || !started || gate) return;
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
      if (hintMemory.eliminated.includes(exercise.options[i].id)) return;
      setResponse({ kind: 'mcq', optionId: exercise.options[i].id });
    } else if (exercise.kind === 'findBug' && i < exercise.lines.length) {
      if (hintMemory.eliminatedLines.includes(i)) return;
      setResponse({ kind: 'findBug', line: i });
    } else {
      return;
    }
    playHaptic('selection', false);
    playSound('select');
  };
  // Learn cards: arrow keys and swipes move between them.
  const cardNavRef = useRef({ next: nextCard, prev: prevCard, active: false });
  cardNavRef.current = { next: nextCard, prev: prevCard, active: phase === 'learn' && !outro && started && !gate };
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
    (gate
      ? `gate-${gate.from}`
      : phase === 'learn'
        ? `learn-${cardIndex}`
        : phase === 'apply'
          ? fixIntro
            ? 'fix-intro'
            : `apply-${quiz.pos}`
          : phase === 'reflect'
            ? `reflect-${reflectSub}`
            : phase);
  const slideFrom = phase === 'learn' && !outro && !gate ? cardDir * 48 : 48;
  const replay = isReview || result?.isNewCompletion === false;
  const fullBleed = Boolean(outro || fixIntro || gate);
  const lessonsTodayNow = atOpen.lessonsToday + 1;
  const sessionChain = !replay && outro ? { count: lessonsTodayNow, name: sessionName(lessonsTodayNow) } : null;
  const bonus = result?.xpBreakdown
    ? { combo: result.xpBreakdown.combo ?? 0, perfect: result.xpBreakdown.perfect ?? 0, section: result.xpBreakdown.section ?? 0 }
    : null;

  return (
    <div
      className={`${styles.player} fixed inset-0 z-[90000] flex flex-col bg-white`}
      role="dialog"
      aria-modal="true"
      aria-label={`Lesson: ${lesson.title ?? ''}`}
    >
      <TeyPreload />

      {!started && (
        <LessonIntro
          title={lesson.title ?? 'Lesson'}
          journey={journey}
          phases={phases}
          outcomes={content.learn.whatYouWillLearn ?? []}
          xp={typeof lesson.xpReward === 'number' ? lesson.xpReward : null}
          minutes={typeof lesson.durationMinutes === 'number' ? lesson.durationMinutes : null}
          questions={exercises.length}
          lessonsToday={atOpen.lessonsToday}
          streakAtStake={atOpen.streakAtStake}
          resuming={Boolean(spot)}
          isReview={isReview}
          teyLine={introText}
          onStart={start}
          onClose={onExit}
        />
      )}

      {/* The finish screens have no chrome — the lesson is over. */}
      {outro ? (
        <div className="relative shrink-0 h-[calc(env(safe-area-inset-top)+16px)]">
          {(outroShare || courseFinished) && (
            <div className="absolute right-4 top-[calc(env(safe-area-inset-top)+12px)] z-[3] flex items-center gap-2">
              {courseFinished && <CertificatePill courseId={courseId} />}
              {outroShare && <ShareMilestoneButton key={JSON.stringify(outroShare)} request={outroShare} />}
            </div>
          )}
        </div>
      ) : (
        <LessonTopBar
          progress={progress}
          phase={phase}
          combo={phase === 'apply' && !gate ? combo : 0}
          hearts={adminReviewMode || firstEverLesson ? null : simulate ? 5 : lives}
          onClose={requestQuit}
          musicOn={adminReviewMode ? null : musicOn}
          onToggleMusic={toggleMusic}
          stampPhases={adminReviewMode ? PHASE_ORDER : ['deepen']}
        />
      )}

      {!outro && phase === 'apply' && <ComboAura run={combo} />}
      {!outro && <ComboBurst burst={comboBurst} onDone={clearComboBurst} />}
      {!outro && <ComboBreak event={comboBreak} />}

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
          className={`mx-auto w-full max-w-[640px] px-4 md:px-6 ${fullBleed ? 'min-h-full flex flex-col' : 'pt-4 md:pt-10 pb-10'}`}
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
              className={fullBleed ? 'flex-1 flex flex-col' : undefined}
              // Swipe between Learn cards, like turning a page.
              drag={phase === 'learn' && !outro && !gate && !reducedMotion ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                if (phase !== 'learn' || outro || gate) return;
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
                  badges={replay ? [] : (moment?.badges ?? []).filter((b) => b.id !== 'lessonsToday')}
                  pose={moment?.look.pose ?? 'cheering'}
                  cards={statCards(stats, result ? (result.xpEarned ?? 0) : null, { isReview: replay, pick: labelPick })}
                  error={finishError}
                  tier={tier}
                  bonus={bonus}
                  session={sessionChain}
                />
              )}
              {outro === 'streak' && streakBeat && (
                <StreakDay
                  days={result?.newStreakDays ?? streakDays}
                  line={streakLine}
                  moment={streakBeat}
                  kind={streakKind}
                  calendar={calendarAtOpen}
                />
              )}
              {outro === 'quests' && <DailyQuests rows={questRows} monthly={monthly} />}
              {outro === 'league' && climb && <LeagueClimb climb={climb} />}
              {outro === 'unit' && unit && <UnitComplete unit={unit} line={unitLine} />}
              {outro === 'level' && levelDone && <LevelComplete level={levelDone} line={levelLine} />}
              {outro === 'journey' && journey && <ChapterJourney journey={journey} onHome={() => endOutro('home')} />}
              {!outro && gate && (
                <PhaseGate from={gate.from} to={gate.to} result={gate.result} ahead={gate.ahead} hot={gate.hot} onGo={passGate} />
              )}
              {!outro && !gate && phase === 'learn' && (
                <LearnStep
                  title={lesson.title ?? 'Lesson'}
                  card={card}
                  index={cardIndex}
                  total={cards.length}
                  points={content.learn.whatYouWillLearn}
                  onMediaEnded={() => setMediaEnded(true)}
                  checkPick={card.kind === 'check' ? checkPicks[card.id] ?? null : null}
                  onCheckPick={pickCheck}
                  richDone={richCard ? Boolean(richDone[richCard.id]) : false}
                  onRichDone={() => richCard && markRichDone(richCard.id)}
                />
              )}
              {!outro && !gate && phase === 'apply' && fixIntro && <FixMistakes count={mistakesLeft(quiz)} />}
              {!outro && !gate && phase === 'apply' && !fixIntro && exercise && (
                <ExerciseStep
                  key={`${exercise.id}-${quiz.pos}`}
                  exercise={exercise}
                  eyebrow={
                    fixing
                      ? `Fix a mistake${mistakesLeft(quiz) > 1 ? ` · ${mistakesLeft(quiz)} left` : ''}`
                      : `${PHASE_LABEL.apply} · ${quiz.pos + 1} of ${quiz.firstPass}`
                  }
                  scenario={content.apply.scenario}
                  response={response}
                  onResponse={(r) => {
                    if (answer === 'idle') setResponse(r);
                  }}
                  answer={answer}
                  tey={tey}
                  eliminated={hintMemory.eliminated}
                  eliminatedLines={hintMemory.eliminatedLines}
                  tools={
                    adminReviewMode ? undefined : (
                      <ApplyTools
                        hintsLeft={hintsLeft}
                        hintsTotal={HINTS_PER_LESSON}
                        canHint={canHint}
                        nudge={stalled}
                        onHint={takeHint}
                        onSkip={skip}
                        locked={answer !== 'idle'}
                      />
                    )
                  }
                />
              )}
              {!outro && !gate && phase === 'reflect' && (
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
              {!outro && !gate && phase === 'deepen' && (
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
        verdict={!outro && !gate && phase === 'apply' ? verdict : null}
        variant={outro ? (finishError && !result ? 'primary' : 'correct') : footer.variant}
      />

      <QuitSheet
        open={quitOpen}
        progressPct={Math.round(progress * 100)}
        left={leftLine}
        xp={!isReview && typeof lesson.xpReward === 'number' ? lesson.xpReward : null}
        combo={phase === 'apply' ? combo : 0}
        streakAtStake={atOpen.streakAtStake}
        unlocks={
          journey?.next && !journey.next.locked
            ? journey.next.newChapter
              ? `the next chapter: ${journey.next.chapterTitle}`
              : `Lesson ${journey.lessonNumber + 1}: ${journey.next.title}`
            : null
        }
        onSkipPractice={phase === 'apply' && exercises.length > 0 && !gate ? skipPractice : undefined}
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
