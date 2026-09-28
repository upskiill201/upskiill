/**
 * Every sound of the lesson experience — from tapping a lesson on the path
 * to the finish fanfare — on the studio's instruments (./studio.ts).
 *
 * One sonic world, so the whole journey sounds like one game:
 *  - Key of C major. Rewards climb C–E–G–C; nothing ever clashes.
 *  - Bells and marimba for "yes"; bubble pops for buttons; a soft wooden
 *    thud and a muffled tone for "not yet" — never a buzzer.
 *  - Short. A tap is under 150ms, a right answer under a second; only the
 *    finish screens earn a fanfare.
 *
 * Components name a cue, never a frequency. Every cue is a silent no-op when
 * sound is muted (getStudio returns null), is rate-limited against double
 * calls, and can never throw — audio is decoration.
 */

import {
  bell,
  brass,
  coin,
  getStudio,
  marimba,
  muted,
  NOTE as N,
  pop,
  sparkle,
  swoosh,
  thud,
  wash,
  type Studio,
} from './studio';
import { shouldPlay } from './synth';

export type LessonSound =
  // ── The path ──
  | 'nodeTap' // tap a lesson you can take: the card pops open
  | 'nodeReview' // tap a lesson you've finished
  | 'nodeLocked' // tap one you can't take yet
  | 'start' // press START: button, whoosh, rising chime
  | 'jump' // "back to my lesson"
  | 'switchCourse'
  | 'hudOpen'
  // ── App chrome (menu, bottom nav, settings) ──
  | 'navTap' // a tab in the menu or bottom nav (n = tab index: each has its own note)
  | 'menuOpen' // the More menu / drawer opens
  | 'menuClose'
  | 'toggleOn' // a settings switch flips on
  | 'toggleOff'
  // ── Community ──
  | 'like' // a like lands: a bubbly pop and a little rising pair
  | 'post' // your post goes up: whoosh, then a bright chord
  | 'comment' // your comment lands: a pop and a soft ding
  | 'vote' // a poll vote locks in
  // ── Courses ──
  | 'enrolled' // you joined a course: the doors swing open
  | 'courseUnlocked' // you bought access: the lock gives, then a fanfare
  // ── Creator studio (onboarding, profile) ──
  | 'studioOpen' // creator onboarding opens: studio doors, a warm marimba chord
  | 'creatorPlan' // your creator plan is revealed: a rising bell run
  | 'studioReady' // onboarding done: brass and bells, the studio is yours
  | 'profileSaved' // your creator profile saved: a soft double ting
  | 'nudgeSent' // a creator's nudge goes out: a knock-knock and a bell
  | 'cheerSent' // a creator's cheer goes out: claps and a rising run
  | 'cashOut' // a payout requested: coins pour, then a ka-ching
  | 'couponMade' // a coupon created: a ticket tears off with a bright ting
  | 'arrive' // landing on home with a lesson waiting
  | 'pathCheck' // back from a lesson: the finished node ticks off
  | 'pathUnlock' // …and the next one opens
  // ── In the lesson ──
  | 'select' // pick an answer / a confidence card
  | 'correct' // right answer (n = run length)
  | 'wrong' // wrong answer
  | 'next' // CONTINUE to the next question
  | 'heartLost'
  | 'phaseSeal' // the step behind you closes
  | 'phaseTravel' // the bar travels on
  | 'phaseUnlock' // the next step opens (n = step 0..3)
  | 'cardNext' // Learn card forward
  | 'cardBack' // Learn card back
  | 'gateOpen' // a locked CONTINUE unlocks (video watched)
  | 'teyPop' // Tey's bubble appears
  | 'fixMistakes' // "Let's fix your mistakes"
  | 'quitOpen' // "Wait, don't go!"
  | 'keepGoing' // …and staying
  | 'outOfHearts'
  // ── The finish ──
  | 'lessonComplete' // the "Lesson complete!" fanfare
  | 'perfectComplete' // …a flawless one
  | 'statTick' // a stat card lands (n = card index)
  | 'badge' // a personal-record badge pops in
  | 'streak' // the streak flame
  | 'streakMilestone' // one week, one month…
  | 'weekDay' // today's circle fills
  | 'questFill' // a quest bar moves (n = row)
  | 'questComplete' // a quest crosses the line
  | 'unitComplete'
  | 'courseComplete'
  // ── Awareness (lib/awareness/notices.ts) ──
  | 'noticeGood' // good news slides in: chest ready, you climbed
  | 'noticeWarn' // someone passed you — a nudge, not an alarm
  | 'noticeInfo' // neutral news
  // ── League (after a lesson) ──
  | 'leagueJoin' // you're on this week's board
  | 'leagueUp' // you climbed (n = places passed)
  | 'leagueTop' // reached #1 / entered the promotion zone
  | 'leaguePromoted' // week over: up a league
  | 'leagueStayed' // week over: holding your league
  | 'leagueDemoted' // week over: down a league
  // ── Quests ──
  | 'chestOpen' // a quest chest bursts open with its reward
  | 'monthBadge' // the month's challenge badge is earned
  // ── The chest (ChestScene, every chest in Teyro) ──
  | 'chestReady' // a chest is waiting for you: a little glint
  | 'chestAppear' // the chest drops onto the stage (n = 1 for rare)
  | 'chestTap' // each tap on the chest: a knock that climbs (n = tap)
  | 'chestBurst' // the lid gives way (n = 1 for rare)
  | 'chestReward' // what it is (n: 0 coins, 1 XP, 2 freeze, 3 hearts, 4 boost)
  | 'chestTick' // the headline counts up (n = tick)
  | 'chestPile' // a coin lands on the pile (n = item)
  | 'chestCollect' // CONTINUE: into your pocket
  | 'chestError' // couldn't open it — soft, never an alarm
  // ── Celebration screens (components/celebration, components/shop-engine) ──
  | 'levelUp' // a new level: the biggest climb in the app
  | 'achievement' // a medal is earned
  | 'rewardClaim' // a reward lands in your balance
  | 'welcomeBack' // back after a break: warm, not sad
  | 'streakFreeze' // a streak freeze saved you
  | 'streakLost' // the streak went out — gentle, then a lift
  | 'typeTick' // Tey's bubble types out (very quiet)
  | 'shine' // a bar or medal catches the light
  | 'unlock' // a lock rattles, then gives: the next section opens
  | 'progress' // a course progress bar sweeps forward
  | 'purchase' // bought something in the shop
  | 'itemUnlock' // a new item is yours
  | 'collectionComplete' // a whole collection done
  | 'collect'; // a reward particle lands in the top bar (n = particle)

const COOLDOWN_MS: Partial<Record<LessonSound, number>> = {
  nodeLocked: 250,
  start: 800,
  arrive: 20_000,
  lessonComplete: 2000,
  perfectComplete: 2000,
  unitComplete: 2000,
  courseComplete: 2000,
  streak: 1500,
  streakMilestone: 1500,
  chestAppear: 800,
  chestBurst: 1500,
  chestCollect: 600,
  levelUp: 2000,
  achievement: 1500,
  welcomeBack: 1500,
  streakFreeze: 1500,
  streakLost: 1500,
  purchase: 800,
  navTap: 90,
  like: 120,
  post: 1000,
  enrolled: 2000,
  courseUnlocked: 2000,
  studioOpen: 1500,
  creatorPlan: 1500,
  studioReady: 2000,
  profileSaved: 400,
  nudgeSent: 900,
  cheerSent: 1200,
  cashOut: 1600,
  couponMade: 900,
  collectionComplete: 2000,
  typeTick: 45,
};

/** C-major steps above a root, for anything that climbs. */
const LADDER = [N.C6, N.D6, N.E6, N.G6, N.A6, N.C7];

const CUES: Record<LessonSound, (s: Studio, n: number) => void> = {
  // ── The path ──────────────────────────────────────────────────────────────
  nodeTap: (s) => {
    pop(s, 520, 0, { gain: 0.6 });
    marimba(s, N.G5, 0.03, { gain: 0.24 });
  },
  nodeReview: (s) => {
    marimba(s, N.E5, 0, { gain: 0.26 });
    bell(s, N.G6, 0.02, { gain: 0.06, dur: 0.5 });
  },
  nodeLocked: (s) => {
    thud(s, 130, 0, { gain: 0.45 });
  },
  start: (s) => {
    // Press… whoosh… up we go: the moment a lesson begins.
    pop(s, 440, 0, { gain: 0.7 });
    swoosh(s, 0.04, { dur: 0.42, from: 300, to: 4200, gain: 0.26, panFrom: -0.6, panTo: 0.6 });
    bell(s, N.C6, 0.1, { gain: 0.16, dur: 0.5 });
    bell(s, N.E6, 0.17, { gain: 0.17, dur: 0.5 });
    bell(s, N.G6, 0.24, { gain: 0.2, dur: 0.9 });
    marimba(s, N.C5, 0.24, { gain: 0.18 });
    sparkle(s, 0.3, { count: 5, gain: 0.05 });
  },
  jump: (s) => {
    swoosh(s, 0, { dur: 0.2, from: 800, to: 3000, gain: 0.16, panFrom: 0, panTo: 0 });
    pop(s, 620, 0.12, { gain: 0.5 });
  },
  switchCourse: (s) => {
    marimba(s, N.A5, 0, { gain: 0.22 });
    marimba(s, N.E6, 0.06, { gain: 0.2 });
  },
  hudOpen: (s) => {
    pop(s, 700, 0, { gain: 1, dur: 0.08 });
  },
  // ── App chrome ────────────────────────────────────────────────────────────
  navTap: (s, n) => {
    // A soft wooden tick, pitched per tab, so moving along the bar plays a
    // little C-major walk instead of the same click five times.
    const walk = [N.C6, N.D6, N.E6, N.G6, N.A6, N.C7];
    pop(s, 560 + (n % 6) * 40, 0, { gain: 0.35, dur: 0.05 });
    marimba(s, walk[n % walk.length], 0.012, { gain: 0.1, dur: 0.18 });
  },
  menuOpen: (s) => {
    swoosh(s, 0, { dur: 0.16, from: 600, to: 2600, gain: 0.08, panFrom: -0.2, panTo: 0.2 });
    marimba(s, N.G5, 0.05, { gain: 0.12, dur: 0.2 });
  },
  menuClose: (s) => {
    swoosh(s, 0, { dur: 0.14, from: 2400, to: 700, gain: 0.06, panFrom: 0.2, panTo: -0.2 });
  },
  toggleOn: (s) => {
    pop(s, 640, 0, { gain: 0.45, dur: 0.05 });
    marimba(s, N.E6, 0.02, { gain: 0.14, dur: 0.2 });
  },
  toggleOff: (s) => {
    pop(s, 420, 0, { gain: 0.35, dur: 0.05 });
    marimba(s, N.C5, 0.02, { gain: 0.1, dur: 0.18 });
  },
  // ── Community ─────────────────────────────────────────────────────────────
  like: (s) => {
    pop(s, 760, 0, { gain: 0.55, dur: 0.06 });
    marimba(s, N.E6, 0.03, { gain: 0.16, dur: 0.2 });
    marimba(s, N.A6, 0.09, { gain: 0.14, dur: 0.24 });
  },
  post: (s) => {
    swoosh(s, 0, { dur: 0.3, from: 500, to: 3800, gain: 0.14, panFrom: -0.4, panTo: 0.4 });
    [N.C6, N.E6, N.G6].forEach((f, i) => bell(s, f, 0.16 + i * 0.05, { gain: 0.12, dur: 0.7 }));
    sparkle(s, 0.3, { count: 5, gain: 0.04 });
  },
  comment: (s) => {
    pop(s, 640, 0, { gain: 0.5, dur: 0.06 });
    bell(s, N.G6, 0.05, { gain: 0.1, dur: 0.5 });
  },
  vote: (s) => {
    pop(s, 580, 0, { gain: 0.5, dur: 0.06 });
    marimba(s, N.C6, 0.03, { gain: 0.15 });
    marimba(s, N.G6, 0.09, { gain: 0.13 });
  },
  // ── Courses ───────────────────────────────────────────────────────────────
  enrolled: (s) => {
    // Doors swing open (a rising whoosh), a marimba "welcome in", then the
    // bells settle on the tonic with a little glitter.
    swoosh(s, 0, { dur: 0.45, from: 300, to: 3600, gain: 0.16, panFrom: -0.5, panTo: 0.5 });
    [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => marimba(s, f, 0.12 + i * 0.07, { gain: 0.2, dur: 0.35 }));
    bell(s, N.E6, 0.44, { gain: 0.14, dur: 0.8 });
    bell(s, N.C7, 0.52, { gain: 0.16, dur: 1.2 });
    sparkle(s, 0.55, { count: 7, gain: 0.05 });
  },
  courseUnlocked: (s) => {
    // The lock rattles and gives, a ka-ching, then a warm brass chord.
    CUES.unlock(s, 0);
    coin(s, N.B5, 0.42, { gain: 0.12 });
    coin(s, N.E6, 0.5, { gain: 0.14 });
    for (const f of [N.C5, N.E5, N.G5]) brass(s, f, 0.6, { dur: 0.9, gain: 0.08 });
    bell(s, N.C7, 0.66, { gain: 0.16, dur: 1.3 });
    sparkle(s, 0.7, { count: 10, gain: 0.06 });
  },
  // ── Creator studio ──────────────────────────────────────────────────────
  studioOpen: (s) => {
    // Two doors part (a low-to-high whoosh) onto a warm IV–I marimba chord —
    // the enrolled cue's cousin, a fourth lower: this is your room, not a class.
    swoosh(s, 0, { dur: 0.5, from: 240, to: 3000, gain: 0.14, panFrom: 0.5, panTo: -0.5 });
    for (const f of [N.F4, N.A4, N.C5]) marimba(s, f, 0.14, { gain: 0.16, dur: 0.45 });
    for (const f of [N.C5, N.E5, N.G5]) marimba(s, f, 0.36, { gain: 0.18, dur: 0.6 });
    bell(s, N.C6, 0.4, { gain: 0.1, dur: 1.0 });
    wash(s, 0.36, { dur: 1.0, gain: 0.05 });
  },
  creatorPlan: (s) => {
    // Each line of the plan lands on the next rung: C–D–E–G–A, then home.
    [N.C6, N.D6, N.E6, N.G6, N.A6].forEach((f, i) => bell(s, f, i * 0.09, { gain: 0.11, dur: 0.5 }));
    bell(s, N.C7, 0.5, { gain: 0.16, dur: 1.2 });
    marimba(s, N.C5, 0.5, { gain: 0.2, dur: 0.6 });
    sparkle(s, 0.55, { count: 6, gain: 0.05 });
  },
  studioReady: (s) => {
    // The biggest creator moment: a brass I–V–I with bells on top.
    for (const f of [N.C5, N.E5, N.G5]) brass(s, f, 0, { dur: 0.26, gain: 0.08 });
    for (const f of [N.D5, N.G5, N.B5]) brass(s, f, 0.22, { dur: 0.26, gain: 0.08 });
    for (const f of [N.C5, N.E5, N.G5, N.C6]) brass(s, f, 0.46, { dur: 1.1, gain: 0.09 });
    marimba(s, N.C4, 0.46, { gain: 0.3, dur: 0.8 });
    [N.E6, N.G6, N.C7].forEach((f, i) => bell(s, f, 0.46 + i * 0.07, { gain: 0.14, dur: 1.2 }));
    wash(s, 0.46, { dur: 1.4, gain: 0.08 });
    sparkle(s, 0.55, { count: 12, gain: 0.06 });
  },
  profileSaved: (s) => {
    bell(s, N.E6, 0, { gain: 0.1, dur: 0.4 });
    bell(s, N.A6, 0.08, { gain: 0.12, dur: 0.7 });
  },
  nudgeSent: (s) => {
    // Two knocks on the learner's door, then a friendly bell on the way out.
    pop(s, 420, 0, { gain: 0.55, dur: 0.05 });
    pop(s, 460, 0.12, { gain: 0.5, dur: 0.05 });
    swoosh(s, 0.2, { dur: 0.25, from: 700, to: 3200, gain: 0.08, panFrom: -0.3, panTo: 0.4 });
    bell(s, N.G6, 0.3, { gain: 0.12, dur: 0.7 });
  },
  cheerSent: (s) => {
    // Quick claps under a C–E–G–C run: you're in their corner.
    [0, 0.07, 0.14].forEach((t) => pop(s, 900, t, { gain: 0.35, dur: 0.03 }));
    [N.C6, N.E6, N.G6, N.C7].forEach((f, i) => marimba(s, f, 0.18 + i * 0.06, { gain: 0.15, dur: 0.35 }));
    sparkle(s, 0.4, { count: 8, gain: 0.05 });
  },
  cashOut: (s) => {
    // Coins pour into the bag, then the till: ka-ching.
    [N.E5, N.G5, N.B5, N.E6, N.G6].forEach((f, i) => coin(s, f, i * 0.07, { gain: 0.1 }));
    coin(s, N.B6, 0.42, { gain: 0.16 });
    for (const f of [N.C5, N.E5, N.G5]) marimba(s, f, 0.46, { gain: 0.16, dur: 0.6 });
    sparkle(s, 0.5, { count: 8, gain: 0.05 });
  },
  couponMade: (s) => {
    // A ticket tears off the roll, then a bright ting.
    swoosh(s, 0, { dur: 0.16, from: 2400, to: 5200, gain: 0.1, panFrom: 0.2, panTo: -0.2 });
    pop(s, 700, 0.15, { gain: 0.45, dur: 0.05 });
    bell(s, N.E6, 0.2, { gain: 0.12, dur: 0.5 });
    bell(s, N.C7, 0.28, { gain: 0.13, dur: 0.8 });
  },
  arrive: (s) => {
    marimba(s, N.G5, 0, { gain: 0.16 });
    marimba(s, N.C6, 0.09, { gain: 0.16 });
  },
  pathCheck: (s) => {
    marimba(s, N.C6, 0, { gain: 0.3 });
    bell(s, N.E6, 0.05, { gain: 0.16, dur: 0.6 });
    sparkle(s, 0.08, { count: 3, gain: 0.04 });
  },
  pathUnlock: (s) => {
    pop(s, 600, 0, { gain: 0.6 });
    bell(s, N.G6, 0.05, { gain: 0.2, dur: 0.8 });
    bell(s, N.C7, 0.12, { gain: 0.16, dur: 1 });
    sparkle(s, 0.16, { count: 6, gain: 0.05 });
  },

  // ── In the lesson ─────────────────────────────────────────────────────────
  select: (s) => {
    pop(s, 760, 0, { gain: 1, dur: 0.07, drop: 1.5 });
  },
  correct: (s, run) => {
    // The "da-ding!": a bright fourth, rising. A run lifts it a little each
    // step (capped), and a long run adds the third on top, then glitter.
    const lift = Math.min(Math.max(0, run - 1), 4) * 2;
    const k = Math.pow(2, lift / 12);
    bell(s, N.B5 * k, 0, { gain: 0.2, dur: 0.45 });
    bell(s, N.E6 * k, 0.085, { gain: 0.24, dur: 1.0 });
    marimba(s, N.E5 * k, 0.085, { gain: 0.16 });
    if (run >= 3) bell(s, N.G6 * k, 0.16, { gain: 0.12, dur: 0.8 });
    if (run >= 5) sparkle(s, 0.2, { count: 5, gain: 0.05 });
  },
  wrong: (s) => {
    muted(s, N.E4, 0, { gain: 0.11, dur: 0.16 });
    muted(s, N.C4, 0.12, { gain: 0.1, dur: 0.3 });
  },
  next: (s) => {
    pop(s, 560, 0, { gain: 1, dur: 0.09 });
  },
  heartLost: (s) => {
    thud(s, 110, 0, { gain: 0.4 });
    bell(s, N.E5, 0.02, { gain: 0.09, dur: 0.35, bright: 0.4 });
    bell(s, N.C5, 0.12, { gain: 0.08, dur: 0.5, bright: 0.4 });
  },
  phaseSeal: (s) => {
    marimba(s, N.G4, 0, { gain: 0.2, dur: 0.25 });
  },
  phaseTravel: (s) => {
    swoosh(s, 0, { dur: 0.34, from: 600, to: 3200, gain: 0.2, panFrom: -0.3, panTo: 0.3 });
  },
  phaseUnlock: (s, step) => {
    const f = LADDER[Math.max(0, Math.min(step, 3))];
    bell(s, f, 0, { gain: 0.2, dur: 0.9 });
    marimba(s, f / 2, 0, { gain: 0.16 });
    if (step >= 3) {
      bell(s, f * 1.5, 0.09, { gain: 0.12, dur: 1 });
      sparkle(s, 0.12, { count: 4, gain: 0.04 });
    }
  },
  cardNext: (s) => {
    swoosh(s, 0, { dur: 0.16, from: 1500, to: 5200, gain: 0.1, panFrom: 0.5, panTo: -0.5 });
    marimba(s, N.E6, 0.04, { gain: 0.1, dur: 0.2 });
  },
  cardBack: (s) => {
    swoosh(s, 0, { dur: 0.16, from: 5200, to: 1500, gain: 0.18, panFrom: -0.5, panTo: 0.5 });
  },
  gateOpen: (s) => {
    bell(s, N.E6, 0, { gain: 0.13, dur: 0.5 });
    bell(s, N.A6, 0.07, { gain: 0.13, dur: 0.7 });
  },
  teyPop: (s) => {
    pop(s, 900, 0, { gain: 0.7, dur: 0.07, drop: 1.4 });
  },
  fixMistakes: (s) => {
    marimba(s, N.E5, 0, { gain: 0.16 });
    marimba(s, N.D5, 0.11, { gain: 0.15 });
    marimba(s, N.G5, 0.22, { gain: 0.18, dur: 0.5 });
  },
  quitOpen: (s) => {
    muted(s, N.G4, 0, { gain: 0.11, dur: 0.18 });
    muted(s, N.E4, 0.14, { gain: 0.11, dur: 0.3 });
  },
  keepGoing: (s) => {
    pop(s, 560, 0, { gain: 0.55 });
    bell(s, N.C6, 0.04, { gain: 0.12, dur: 0.5 });
  },
  outOfHearts: (s) => {
    muted(s, N.C4, 0, { gain: 0.09, dur: 0.3 });
    muted(s, N.A4 / 2, 0.22, { gain: 0.08, dur: 0.5 });
    thud(s, 90, 0.22, { gain: 0.25 });
  },

  // ── The finish ────────────────────────────────────────────────────────────
  lessonComplete: (s) => {
    // Quick bell run up, then the band lands on the chord: "ta-da!"
    bell(s, N.C6, 0, { gain: 0.16, dur: 0.4 });
    bell(s, N.E6, 0.08, { gain: 0.17, dur: 0.4 });
    bell(s, N.G6, 0.16, { gain: 0.18, dur: 0.45 });
    for (const f of [N.C5, N.E5, N.G5]) brass(s, f, 0.26, { dur: 0.75, gain: 0.1 });
    marimba(s, N.C4, 0.26, { gain: 0.3, dur: 0.6 });
    bell(s, N.C7, 0.26, { gain: 0.2, dur: 1.4 });
    sparkle(s, 0.34, { count: 8, gain: 0.06 });
    wash(s, 0.26, { dur: 1.2, gain: 0.07 });
  },
  perfectComplete: (s) => {
    CUES.lessonComplete(s, 0);
    // A flawless lesson gets one more rung and a longer glitter.
    bell(s, N.E6 * 2, 0.5, { gain: 0.12, dur: 1.2 });
    sparkle(s, 0.6, { count: 8, gain: 0.05, spread: 0.06 });
  },
  statTick: (s, i) => {
    const f = [N.C6, N.E6, N.G6, N.C7][Math.min(i, 3)];
    pop(s, 500 + i * 90, 0, { gain: 0.5, dur: 0.08 });
    marimba(s, f, 0.01, { gain: 0.2, dur: 0.3 });
  },
  badge: (s) => {
    coin(s, N.B5, 0, { gain: 0.12 });
    sparkle(s, 0.08, { count: 4, gain: 0.05 });
  },
  streak: (s) => {
    // Fire catching: a low swoosh igniting, then a warm chord and a bell.
    swoosh(s, 0, { dur: 0.55, from: 180, to: 1600, gain: 0.3, panFrom: 0, panTo: 0 });
    for (const f of [N.G4, N.C5, N.E5]) brass(s, f, 0.3, { dur: 0.7, gain: 0.08 });
    bell(s, N.G6, 0.32, { gain: 0.18, dur: 1.1 });
    sparkle(s, 0.4, { count: 5, gain: 0.05 });
  },
  streakMilestone: (s) => {
    CUES.streak(s, 0);
    for (const f of [N.C5, N.E5, N.G5, N.C6]) brass(s, f, 0.85, { dur: 0.8, gain: 0.08 });
    bell(s, N.C7, 0.85, { gain: 0.18, dur: 1.4 });
    wash(s, 0.85, { dur: 1.3, gain: 0.08 });
    sparkle(s, 0.9, { count: 9, gain: 0.06 });
  },
  weekDay: (s) => {
    marimba(s, N.C6, 0, { gain: 0.26 });
    bell(s, N.G6, 0.04, { gain: 0.12, dur: 0.6 });
  },
  questFill: (s, row) => {
    bell(s, LADDER[Math.min(row, LADDER.length - 1)], 0, { gain: 0.14, dur: 0.6 });
  },
  questComplete: (s) => {
    coin(s, N.B5, 0, { gain: 0.14 });
    bell(s, N.C7, 0.12, { gain: 0.14, dur: 0.9 });
    sparkle(s, 0.16, { count: 5, gain: 0.05 });
  },
  unitComplete: (s) => {
    // I–IV–V–I: the band plays a proper little cadence.
    const chords = [
      [N.C5, N.E5, N.G5],
      [N.C5, N.F5, N.A5],
      [N.D5, N.G5, N.B5],
    ];
    chords.forEach((ch, i) => ch.forEach((f) => brass(s, f, i * 0.2, { dur: 0.24, gain: 0.08 })));
    for (const f of [N.C5, N.E5, N.G5, N.C6]) brass(s, f, 0.62, { dur: 1.0, gain: 0.09 });
    marimba(s, N.C4, 0.62, { gain: 0.32, dur: 0.8 });
    bell(s, N.E6, 0, { gain: 0.1, dur: 0.3 });
    bell(s, N.F6, 0.2, { gain: 0.1, dur: 0.3 });
    bell(s, N.G6, 0.4, { gain: 0.12, dur: 0.3 });
    bell(s, N.C7, 0.62, { gain: 0.2, dur: 1.6 });
    wash(s, 0.62, { dur: 1.6, gain: 0.09 });
    sparkle(s, 0.7, { count: 10, gain: 0.06 });
  },
  courseComplete: (s) => {
    CUES.unitComplete(s, 0);
    bell(s, N.G6 * 2, 1.0, { gain: 0.12, dur: 1.4 });
    for (const f of [N.C6, N.E6, N.G6]) brass(s, f, 1.05, { dur: 1.1, gain: 0.06 });
    sparkle(s, 1.1, { count: 12, gain: 0.06, spread: 0.06 });
  },

  // ── Awareness — a notice sounds like it belongs to the lesson you just did ─
  noticeGood: (s) => {
    pop(s, 620, 0, { gain: 0.6 });
    bell(s, N.E6, 0.05, { gain: 0.13, dur: 0.5 });
    bell(s, N.A6, 0.12, { gain: 0.14, dur: 0.7 });
  },
  noticeWarn: (s) => {
    // Quick descending pair, then a pop: "hey — they got past you".
    marimba(s, N.A5, 0, { gain: 0.26 });
    marimba(s, N.E5, 0.09, { gain: 0.24 });
    pop(s, 480, 0.2, { gain: 0.5 });
  },
  noticeInfo: (s) => {
    pop(s, 640, 0, { gain: 0.6 });
    marimba(s, N.C6, 0.04, { gain: 0.18 });
  },

  // ── League ──────────────────────────────────────────────────────────────
  leagueJoin: (s) => {
    pop(s, 520, 0, { gain: 0.6 });
    for (const [i, f] of [N.C6, N.E6, N.G6].entries()) bell(s, f, 0.08 + i * 0.07, { gain: 0.13, dur: 0.7 });
    sparkle(s, 0.3, { count: 5, gain: 0.05 });
  },
  leagueUp: (s, passed) => {
    // Whoosh up the board, a bell for each place gained, then the landing.
    swoosh(s, 0, { dur: 0.45, from: 300, to: 4000, gain: 0.22, panFrom: 0, panTo: 0 });
    const steps = Math.max(1, Math.min(passed, 5));
    for (let i = 0; i < steps; i++) bell(s, LADDER[i], 0.1 + i * 0.08, { gain: 0.12, dur: 0.5 });
    const land = 0.12 + steps * 0.08;
    bell(s, N.C7, land, { gain: 0.18, dur: 1.1 });
    marimba(s, N.C5, land, { gain: 0.22 });
    sparkle(s, land + 0.04, { count: 6, gain: 0.05 });
  },
  leagueTop: (s) => {
    // Swoosh to the top, a bright rising run, the band hits the chord.
    swoosh(s, 0, { dur: 0.4, from: 300, to: 4200, gain: 0.2, panFrom: -0.4, panTo: 0.4 });
    [N.C6, N.E6, N.G6, N.C7].forEach((f, i) => bell(s, f, 0.1 + i * 0.07, { gain: 0.15, dur: 0.6 }));
    for (const f of [N.C5, N.E5, N.G5]) brass(s, f, 0.38, { dur: 0.8, gain: 0.09 });
    marimba(s, N.C4, 0.38, { gain: 0.28, dur: 0.6 });
    sparkle(s, 0.42, { count: 8, gain: 0.06 });
    wash(s, 0.38, { dur: 1.2, gain: 0.07 });
  },
  leaguePromoted: (s) => {
    CUES.unitComplete(s, 0);
    bell(s, N.C7 * 1.5, 0.9, { gain: 0.1, dur: 1.2 });
  },
  leagueStayed: (s) => {
    marimba(s, N.G5, 0, { gain: 0.24 });
    marimba(s, N.C6, 0.1, { gain: 0.24 });
    bell(s, N.E6, 0.2, { gain: 0.14, dur: 0.9 });
  },
  leagueDemoted: (s) => {
    // Gentle and short: "not this week" — then a small lift to say "again".
    muted(s, N.E4, 0, { gain: 0.1, dur: 0.22 });
    muted(s, N.C4, 0.16, { gain: 0.1, dur: 0.4 });
    marimba(s, N.G4, 0.62, { gain: 0.18 });
    marimba(s, N.C5, 0.72, { gain: 0.2, dur: 0.5 });
  },
  chestOpen: (s) => {
    // Wooden creak, the lid pops, coins spill, a bright bell for the reward.
    thud(s, 170, 0, { gain: 0.35, dur: 0.18 });
    marimba(s, N.G4, 0.02, { gain: 0.18, dur: 0.25 });
    pop(s, 520, 0.16, { gain: 0.6 });
    swoosh(s, 0.16, { dur: 0.3, from: 1200, to: 5000, gain: 0.12, panFrom: 0, panTo: 0 });
    coin(s, N.B5, 0.26, { gain: 0.14 });
    coin(s, N.E6, 0.36, { gain: 0.12 });
    bell(s, N.C7, 0.42, { gain: 0.16, dur: 1 });
    sparkle(s, 0.44, { count: 6, gain: 0.05 });
  },
  monthBadge: (s) => {
    // The biggest fanfare of the month: the cadence, then a bright tag.
    CUES.unitComplete(s, 0);
    for (const [i, f] of [N.G6, N.C7, N.E6 * 2].entries()) bell(s, f, 1.05 + i * 0.1, { gain: 0.12, dur: 1 });
    sparkle(s, 1.2, { count: 12, gain: 0.06, spread: 0.05 });
  },
  // ── The chest ─────────────────────────────────────────────────────────────
  chestReady: (s) => {
    bell(s, N.G6, 0, { gain: 0.08, dur: 0.4 });
    bell(s, N.C7, 0.09, { gain: 0.1, dur: 0.7 });
    sparkle(s, 0.05, { count: 4, gain: 0.04 });
  },
  chestAppear: (s, rare) => {
    // A heavy wooden chest lands and settles — thump, a small bounce, a glint.
    swoosh(s, 0, { dur: 0.22, from: 3000, to: 700, gain: 0.08, panFrom: 0, panTo: 0 });
    thud(s, 120, 0.2, { gain: 0.45, dur: 0.22 });
    marimba(s, N.C4, 0.2, { gain: 0.2, dur: 0.3 });
    thud(s, 160, 0.38, { gain: 0.18, dur: 0.12 });
    bell(s, rare ? N.E6 : N.G6, 0.5, { gain: 0.07, dur: 0.5 });
    if (rare) bell(s, N.B6, 0.58, { gain: 0.08, dur: 0.7 });
    sparkle(s, 0.52, { count: rare ? 8 : 4, gain: 0.04 });
  },
  chestTap: (s, n) => {
    // Knock, rattle, and a marimba step up the C-major ladder: every tap
    // sounds closer to giving way than the last.
    const i = Math.min(n, 9);
    thud(s, 130 + i * 14, 0, { gain: 0.34 + i * 0.02, dur: 0.12 });
    marimba(s, [N.C5, N.D5, N.E5, N.G5, N.A5, N.C6, N.D6, N.E6, N.G6, N.C7][i], 0.01, { gain: 0.16, dur: 0.22 });
    if (i >= 2) coin(s, N.E6 + i * 40, 0.04, { gain: 0.035 + i * 0.006 });
    if (i >= 5) coin(s, N.G6, 0.09, { gain: 0.04 });
  },
  chestBurst: (s, rare) => {
    // The lid bursts: a whoosh up, the pop, a bright major chord, and light.
    swoosh(s, 0, { dur: 0.35, from: 800, to: 6000, gain: 0.14, panFrom: 0, panTo: 0 });
    pop(s, 440, 0.08, { gain: 0.7, dur: 0.12 });
    thud(s, 90, 0.08, { gain: 0.3, dur: 0.25 });
    for (const f of [N.C5, N.E5, N.G5, N.C6]) brass(s, f, 0.12, { dur: 0.7, gain: 0.08 });
    bell(s, N.C7, 0.14, { gain: 0.18, dur: 1.4 });
    if (rare) {
      bell(s, N.E6 * 2, 0.3, { gain: 0.12, dur: 1.2 });
      bell(s, N.G6 * 2, 0.42, { gain: 0.1, dur: 1.2 });
    }
    wash(s, 0.12, { dur: 1.2, gain: 0.08 });
    sparkle(s, 0.16, { count: rare ? 14 : 9, gain: 0.06, spread: 0.05 });
  },
  chestReward: (s, kind) => {
    switch (kind) {
      case 1: // XP: a quick bright arpeggio
        [N.C6, N.E6, N.G6, N.C7].forEach((f, i) => bell(s, f, i * 0.06, { gain: 0.09, dur: 0.5 }));
        return;
      case 2: // Streak freeze: icy high bells
        [N.B6, N.G6, N.E6 * 2].forEach((f, i) => bell(s, f, i * 0.08, { gain: 0.07, dur: 0.9, bright: 1 }));
        sparkle(s, 0.05, { count: 10, gain: 0.05, spread: 0.04 });
        return;
      case 3: // Hearts: a warm marimba lift
        [N.E5, N.G5, N.C6].forEach((f, i) => marimba(s, f, i * 0.08, { gain: 0.2, dur: 0.4 }));
        return;
      case 4: // Boost: the rocket goes up
        swoosh(s, 0, { dur: 0.5, from: 500, to: 7000, gain: 0.12, panFrom: -0.4, panTo: 0.4 });
        bell(s, N.G6, 0.35, { gain: 0.1, dur: 0.6 });
        return;
      default: // Coins: a spill of coins
        for (let i = 0; i < 5; i++) coin(s, [N.B5, N.E6, N.G6, N.B6, N.E6][i], i * 0.055, { gain: 0.08 });
    }
  },
  chestTick: (s, n) => {
    pop(s, 700 + Math.min(n, 8) * 70, 0, { gain: 0.25, dur: 0.05 });
  },
  chestPile: (s, n) => {
    // Quiet clinks, a little lower as the heap deadens.
    coin(s, N.E6 - (n % 7) * 30, 0, { gain: Math.max(0.018, 0.045 - n * 0.001) });
  },
  chestCollect: (s) => {
    // Cha-ching: two coin hits and a bell — it's in your pocket now.
    coin(s, N.B5, 0, { gain: 0.12 });
    coin(s, N.E6, 0.08, { gain: 0.14 });
    bell(s, N.C7, 0.12, { gain: 0.1, dur: 0.6 });
  },
  chestError: (s) => {
    muted(s, N.E4, 0, { gain: 0.1, dur: 0.2 });
    muted(s, N.C4, 0.14, { gain: 0.1, dur: 0.36 });
  },
  // ── Celebration screens ───────────────────────────────────────────────────
  levelUp: (s) => {
    // Two octaves of bells racing up, then the band hits the chord twice —
    // "LEVEL UP!" — with the low marimba as the drum.
    const run = [N.C5, N.E5, N.G5, N.C6, N.E6, N.G6, N.C7];
    run.forEach((f, i) => bell(s, f, i * 0.055, { gain: 0.1 + i * 0.01, dur: 0.35 }));
    swoosh(s, 0, { dur: 0.4, from: 600, to: 5000, gain: 0.1, panFrom: 0, panTo: 0 });
    for (const f of [N.C5, N.E5, N.G5]) brass(s, f, 0.42, { dur: 0.18, gain: 0.09 });
    for (const f of [N.C5, N.E5, N.G5, N.C6]) brass(s, f, 0.62, { dur: 1.1, gain: 0.1 });
    marimba(s, N.C4, 0.42, { gain: 0.3, dur: 0.3 });
    marimba(s, N.C4, 0.62, { gain: 0.34, dur: 0.8 });
    bell(s, N.C7, 0.62, { gain: 0.2, dur: 1.6 });
    bell(s, N.G6 * 2, 0.74, { gain: 0.1, dur: 1.4 });
    wash(s, 0.62, { dur: 1.6, gain: 0.09 });
    sparkle(s, 0.7, { count: 12, gain: 0.06, spread: 0.05 });
  },
  achievement: (s) => {
    // A shimmer rising into a medal "ting", then a proud little chord.
    swoosh(s, 0, { dur: 0.45, from: 1500, to: 7000, gain: 0.08, panFrom: -0.3, panTo: 0.3 });
    bell(s, N.G6, 0.3, { gain: 0.14, dur: 0.6 });
    bell(s, N.C7, 0.38, { gain: 0.2, dur: 1.4, bright: 1.4 });
    for (const f of [N.G4, N.C5, N.E5]) brass(s, f, 0.4, { dur: 0.9, gain: 0.08 });
    sparkle(s, 0.42, { count: 9, gain: 0.06 });
  },
  rewardClaim: (s) => {
    // Coins climbing into a bell: the reward landing in your balance.
    [N.C6, N.E6, N.G6].forEach((f, i) => coin(s, f, i * 0.07, { gain: 0.1 }));
    bell(s, N.C7, 0.22, { gain: 0.16, dur: 1 });
    sparkle(s, 0.24, { count: 6, gain: 0.05 });
  },
  welcomeBack: (s) => {
    // "Hey, you're back!" — a warm, bouncy hello, not a sad motif.
    marimba(s, N.G4, 0, { gain: 0.22, dur: 0.3 });
    marimba(s, N.C5, 0.12, { gain: 0.24, dur: 0.3 });
    marimba(s, N.E5, 0.24, { gain: 0.24, dur: 0.3 });
    bell(s, N.G5, 0.36, { gain: 0.14, dur: 0.8 });
    bell(s, N.C6, 0.44, { gain: 0.12, dur: 1 });
  },
  streakFreeze: (s) => {
    // Ice forming: glassy high bells over a cold sparkle.
    [N.E6 * 2, N.B6, N.G6, N.E6].forEach((f, i) => bell(s, f, i * 0.07, { gain: 0.08, dur: 1, bright: 1.6 }));
    sparkle(s, 0, { count: 14, gain: 0.05, spread: 0.05 });
    brass(s, N.E5, 0.32, { dur: 0.9, gain: 0.06 });
    brass(s, N.B5, 0.32, { dur: 0.9, gain: 0.05 });
  },
  streakLost: (s) => {
    // The flame goes out (a soft falling tone) — then one small lift: "again".
    swoosh(s, 0, { dur: 0.5, from: 1600, to: 200, gain: 0.12, panFrom: 0, panTo: 0 });
    muted(s, N.E4, 0.1, { gain: 0.1, dur: 0.3 });
    muted(s, N.C4, 0.34, { gain: 0.1, dur: 0.5 });
    marimba(s, N.G4, 0.95, { gain: 0.18 });
    marimba(s, N.C5, 1.05, { gain: 0.2, dur: 0.5 });
  },
  typeTick: (s) => {
    pop(s, 1400, 0, { gain: 0.12, dur: 0.03, drop: 1.1 });
  },
  shine: (s) => {
    bell(s, N.E6 * 2, 0, { gain: 0.05, dur: 0.5 });
    sparkle(s, 0, { count: 4, gain: 0.04 });
  },
  unlock: (s) => {
    // Rattle, rattle — clack — and the way opens.
    thud(s, 180, 0, { gain: 0.3, dur: 0.08 });
    thud(s, 200, 0.12, { gain: 0.3, dur: 0.08 });
    thud(s, 220, 0.24, { gain: 0.32, dur: 0.08 });
    pop(s, 700, 0.5, { gain: 0.7, dur: 0.1 });
    swoosh(s, 0.5, { dur: 0.35, from: 1000, to: 6000, gain: 0.1, panFrom: 0, panTo: 0 });
    [N.C6, N.E6, N.G6, N.C7].forEach((f, i) => bell(s, f, 0.56 + i * 0.07, { gain: 0.12 + i * 0.02, dur: 0.9 }));
    sparkle(s, 0.6, { count: 8, gain: 0.05 });
  },
  progress: (s) => {
    swoosh(s, 0, { dur: 0.5, from: 400, to: 3000, gain: 0.1, panFrom: -0.4, panTo: 0.4 });
    LADDER.slice(0, 4).forEach((f, i) => marimba(s, f, 0.1 + i * 0.09, { gain: 0.18, dur: 0.3 }));
    bell(s, N.C7, 0.5, { gain: 0.12, dur: 0.9 });
  },
  purchase: (s) => {
    // Ka-ching, then the item's little fanfare.
    coin(s, N.B5, 0, { gain: 0.13 });
    coin(s, N.E6, 0.08, { gain: 0.15 });
    [N.C6, N.E6, N.G6].forEach((f, i) => bell(s, f, 0.22 + i * 0.07, { gain: 0.12, dur: 0.6 }));
    bell(s, N.C7, 0.43, { gain: 0.16, dur: 1.1 });
    sparkle(s, 0.45, { count: 7, gain: 0.05 });
  },
  itemUnlock: (s) => {
    pop(s, 620, 0, { gain: 0.6, dur: 0.1 });
    bell(s, N.G6, 0.06, { gain: 0.14, dur: 0.6 });
    bell(s, N.C7, 0.14, { gain: 0.18, dur: 1.2 });
    for (const f of [N.C5, N.E5, N.G5]) brass(s, f, 0.16, { dur: 0.7, gain: 0.07 });
    sparkle(s, 0.18, { count: 8, gain: 0.05 });
  },
  collectionComplete: (s) => {
    CUES.unitComplete(s, 0);
    sparkle(s, 0.9, { count: 12, gain: 0.06, spread: 0.05 });
  },
  collect: (s, n) => {
    // Each coin that lands climbs one step higher — a rising run of clinks.
    const f = LADDER[Math.min(n, LADDER.length - 1)];
    coin(s, f, 0, { gain: 0.07 });
    pop(s, 800 + Math.min(n, 8) * 60, 0, { gain: 0.18, dur: 0.04 });
  },
};

export function playSound(cue: LessonSound, n = 0): void {
  try {
    if (!shouldPlay(`lesson:${cue}:${n}`, COOLDOWN_MS[cue] ?? 60)) return;
    const s = getStudio();
    if (!s) return;
    CUES[cue](s, n);
  } catch {
    // Audio is decoration — a blocked or broken context is never the
    // learner's problem.
  }
}

/** Maps a celebration currency to its chestReward flourish. */
export function chestRewardVariant(currency: string): number {
  return ({ COINS: 0, XP: 1, FREEZE: 2, HEARTS: 3, BOOST: 4 } as Record<string, number>)[currency] ?? 0;
}

/** For the offline render tests and the dev sound board. */
export const LESSON_SOUND_CUES = CUES;
