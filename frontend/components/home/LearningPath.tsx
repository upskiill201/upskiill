'use client';

/**
 * LearningPath — the home screen. Duolingo's winding lesson road.
 *
 *   ┌──────────────────────────────┐
 *   │ UNIT 2 · Market sizing   3/5 │  ← sticky banner, per unit
 *   └──────────────────────────────┘
 *              (✓)
 *                    (✓)
 *                         ( ★ )  ← current: ring + bouncing START bubble
 *                    (🔒)
 *     [Tey]    (🔒)
 *              [chest]
 *
 * What it deliberately is NOT:
 *  - a feed of cards (home used to stack nine of them, six phone-screens
 *    tall, with "start my next lesson" as one card among many);
 *  - a lesson player. START navigates to the section route, which hosts the
 *    player and re-checks sequencing and the paywall on the server.
 *
 * State rules live in `lib/path/model.ts` (tested); this file only draws.
 * Sound: `lib/audio/pathAudio.ts`. Every cue respects mute; every motion
 * respects `prefers-reduced-motion`.
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Glyph, type GlyphName } from '@/components/art/Glyph';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { playPathCue } from '@/lib/audio/pathAudio';
import { playSound } from '@/lib/audio/lessonSounds';
import { clearFinishedLesson, peekFinishedLesson } from '@/lib/path/arrival';
import { playHaptic } from '@/lib/haptics';
import { buildPathModel, type PathNode, type PathUnit } from '@/lib/path/model';
import { MILESTONE_LABEL } from '@/lib/originals';
import { OriginalsTrail } from './OriginalsTrail';
import {
  drawnLand,
  LAND_NAME,
  landFor,
  layoutUnit,
  NODE_H,
  NODE_W,
  pathNudge,
  walkedTo,
  type Keepout,
  type LandId,
} from '@/lib/path/journey';
import { LandScene } from './map/LandScene';
import styles from './map/JourneyMap.module.css';
import { useGamification } from '@/context/GamificationContext';
import { useStreakStats } from '@/hooks/useStreak';
import { useHydrated } from '@/components/studio/useHydrated';
import { buildUnlockHref } from '@/lib/return-to';
import { courseHomeHref } from '@/lib/homeCourse';
import { prefetchLesson } from '@/lib/path/lessonPrefetch';
import { jumpHref } from '@/lib/path/testOut';
import { lessonHref, preloadCourse, type LearningPath as LearningPathData } from '@/hooks/useCourse';

/** How far the road swings left/right, in px, at full amplitude. */
const SWING = { mobile: 62, desktop: 88 };

/** A darker shade of a token colour, for the 3D lip under a node or banner. */
const shade = (color: string, pct = 78) => `color-mix(in srgb, ${color} ${pct}%, black)`;

/** Tey beside the next lesson: width per layout, and his art's height:width. */
const TEY_SIZE = { mobile: 104, desktop: 140 };
const TEY_ASPECT = 1.18;
type TeyPose = 'pointing' | 'cheering';

type OpenTarget = { kind: 'node'; id: string } | { kind: 'chest'; sectionId: string } | null;

export interface LearningPathProps {
  path: LearningPathData;
  /**
   * Where sticky unit banners stop, as a CSS length — a calc() is fine, so
   * the mobile HUD's safe-area inset can be included.
   */
  stickyTop?: string;
  /**
   * Runs before START navigates — a new learner's path is a course they are
   * not enrolled in yet, so START enrolls them first. The button shows
   * "Starting…" meanwhile and cannot be double-tapped.
   */
  beforeStart?: () => Promise<void>;
  /** Rendered after the last unit — e.g. the "more coming soon" teaser. */
  footer?: React.ReactNode;
  /** Dev preview only (/dev/originals): open a lesson here instead of navigating to the lesson route. */
  onOpenLesson?: (lessonId: string) => void;
}

export function LearningPath({ path, stickyTop = '0px', beforeStart, footer, onOpenLesson }: LearningPathProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const model = useMemo(() => buildPathModel(path), [path]);
  const courseId = path.course.id;

  const [open, setOpen] = useState<OpenTarget>(null);
  const [starting, setStarting] = useState(false);
  const [swing, setSwing] = useState(SWING.mobile);
  const currentRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // ── Layout: wider swing on wider screens ─────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const apply = () => setSwing(mq.matches ? SWING.desktop : SWING.mobile);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // ── The column's real width, so Tey never hangs off a phone's edge ──────
  const [colW, setColW] = useState(360);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // Snapped to 16px: a window being dragged wider doesn't re-scatter the
    // scenery on every pixel.
    const ro = new ResizeObserver(([e]) => setColW(Math.round(e.contentRect.width / 16) * 16));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── The world: each unit's land, layout, road progress and keep-outs ───
  const roadClear = swing === SWING.desktop ? 58 : 50;
  const lands = useMemo(() => {
    const total = model.units.length;
    const teyW = swing === SWING.desktop ? TEY_SIZE.desktop : TEY_SIZE.mobile;
    const current = model.current;
    const currentId = current?.lesson.id ?? null;
    // Tey stands by the next lesson — or by the last chest once all are done.
    const teyUnit = current ? model.units.findIndex((u) => u.unitNumber === current.unitNumber) : total - 1;
    return model.units.map((unit, idx) => {
      const land = drawnLand(landFor(idx, total));
      const prevLand = idx > 0 ? drawnLand(landFor(idx - 1, total)) : null;
      const ci = unit.nodes.findIndex((n) => n.lesson.id === currentId);
      const layout = layoutUnit(unit.nodes.length, ci >= 0 ? ci : null, swing);
      const walked = walkedTo(unit);
      const reached = walked > 0 || unit.nodes.some((n) => n.state !== 'locked');
      let tey: { x: number; top: number; pose: TeyPose } | null = null;
      const keepouts: Keepout[] = [];
      if (idx === teyUnit) {
        const anchor = ci >= 0 ? layout.nodes[ci] : layout.chest;
        const side = anchor.x > 1 ? -1 : 1;
        const h = teyW * TEY_ASPECT;
        const reach = colW / 2 - teyW / 2 + 6;
        const x = Math.max(-reach, Math.min(reach, anchor.x + side * (NODE_W / 2 + 18 + teyW / 2)));
        const top = anchor.y + NODE_H + 12 - h;
        tey = { x, top, pose: ci >= 0 ? 'pointing' : 'cheering' };
        keepouts.push({ x, y: top + h / 2, r: teyW * 0.62 });
      }
      return { unit, land, prevLand, layout, walked, tey, keepouts, reached };
    });
  }, [model, swing, colW]);

  // ── Tey's reason to start now ───────────────────────────────────────────
  const hydrated = useHydrated();
  const { streakDays } = useGamification();
  const { data: streakStats } = useStreakStats();
  const nudge = useMemo(() => {
    const cur = model.current;
    if (!cur) return 'Course complete!';
    const unit = model.units.find((u) => u.unitNumber === cur.unitNumber);
    const node = unit?.nodes.find((n) => n.lesson.id === cur.lesson.id);
    return pathNudge({
      doneInCourse: model.doneCount,
      leftInUnit: unit ? unit.nodes.length - unit.doneCount : 0,
      // The SWR cache is in localStorage: only read it once hydrated.
      streakDays: hydrated ? (streakStats?.currentStreak ?? streakDays) : 0,
      practicedToday: hydrated ? (streakStats?.hasCompletedToday ?? null) : null,
      minutes: cur.lesson.durationMinutes,
      paywalled: node?.state === 'paywalled',
    });
  }, [model, hydrated, streakStats, streakDays]);

  // ── Back from a lesson: the finished node checks off, then the next one
  // unlocks in front of the learner. Handed over by the lesson player
  // (lib/path/arrival.ts); only plays if the path really shows that lesson
  // done with a new current lesson after it.
  const [finishedId] = useState(() => {
    const id = peekFinishedLesson(courseId);
    const done = id && model.units.some((u) => u.nodes.some((n) => n.lesson.id === id && n.state === 'done'));
    return done && model.current && model.current.lesson.id !== id ? id : null;
  });
  const [reveal, setReveal] = useState<'hold' | 'check' | 'unlock' | null>(finishedId ? 'hold' : null);
  useEffect(() => {
    if (!finishedId) return;
    clearFinishedLesson();
    const timers = [
      setTimeout(() => {
        setReveal('check');
        playSound('pathCheck');
        playHaptic('success', false);
      }, reducedMotion ? 0 : 550),
      setTimeout(() => {
        setReveal('unlock');
        playSound('pathUnlock');
        playHaptic('medium', false);
      }, reducedMotion ? 0 : 1350),
      setTimeout(() => setReveal(null), reducedMotion ? 0 : 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [finishedId, reducedMotion]);

  // ── Crossing into a new land, just now: its name gets its own moment ────
  const enteredLand = useMemo(() => {
    const cur = model.current;
    if (!finishedId || !cur) return null;
    const idx = lands.findIndex((l) => l.unit.unitNumber === cur.unitNumber);
    if (idx <= 0 || lands[idx].unit.nodes[0]?.lesson.id !== cur.lesson.id) return null;
    return lands[idx].land !== lands[idx - 1].land ? lands[idx].land : null;
  }, [finishedId, model, lands]);
  const [landCard, setLandCard] = useState(false);
  useEffect(() => {
    if (!enteredLand) return;
    const show = setTimeout(() => {
      setLandCard(true);
      playSound('unlock');
      playHaptic('success', false);
    }, reducedMotion ? 0 : 1500);
    const hide = setTimeout(() => setLandCard(false), reducedMotion ? 2600 : 4400);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [enteredLand, reducedMotion]);

  // ── Arrive: land on the current lesson, not the top of the course ────────
  // The layout above can still shift for a moment after the first paint (data
  // revalidating, the header settling), which used to leave the learner
  // staring at the top of the course. So the landing holds: for the first
  // two seconds every size change re-centres the next lesson — until the
  // learner scrolls or touches anything themselves.
  const landedRef = useRef(false);
  useEffect(() => {
    if (landedRef.current || !currentRef.current) return;
    landedRef.current = true;
    const centre = () => currentRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
    centre();
    if (!finishedId) playPathCue('arrive');
    let holding = true;
    const release = () => {
      holding = false;
    };
    const ro = new ResizeObserver(() => {
      if (holding) centre();
    });
    if (rootRef.current) ro.observe(rootRef.current);
    if (document.body) ro.observe(document.body);
    const opts = { passive: true, once: true } as const;
    window.addEventListener('wheel', release, opts);
    window.addEventListener('touchstart', release, opts);
    window.addEventListener('keydown', release, opts);
    window.addEventListener('pointerdown', release, opts);
    const stop = setTimeout(() => {
      release();
      ro.disconnect();
    }, 2000);
    return () => {
      clearTimeout(stop);
      ro.disconnect();
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchstart', release);
      window.removeEventListener('keydown', release);
      window.removeEventListener('pointerdown', release);
    };
  }, [finishedId]);

  // ── "Back to my lesson" button when the current node is off-screen ──────
  const [jump, setJump] = useState<'up' | 'down' | null>(null);
  useEffect(() => {
    const el = currentRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setJump(null);
        else setJump(entry.boundingClientRect.top < 0 ? 'up' : 'down');
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [model]);

  const jumpToCurrent = () => {
    playPathCue('jump');
    playHaptic('light', false);
    currentRef.current?.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // ── Popover dismissal: outside tap, Escape ──────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('[data-path-hit]')) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // ── Taps ─────────────────────────────────────────────────────────────────
  const tapNode = useCallback(
    (node: PathNode) => {
      const isOpen = open?.kind === 'node' && open.id === node.lesson.id;
      if (node.state === 'locked') {
        playPathCue('nodeLocked');
        playHaptic('warning', false);
      } else if (node.state === 'done') {
        playPathCue('nodeReview');
        playHaptic('light', false);
        preloadCourse(courseId);
        prefetchLesson(courseId, node.lesson.id);
      } else {
        playPathCue('nodeTap');
        playHaptic('medium', false);
        // Warm the lesson route on intent: its course data, and the lesson
        // itself — so START opens a lesson that has usually already arrived.
        preloadCourse(courseId);
        if (node.state === 'current') prefetchLesson(courseId, node.lesson.id);
      }
      setOpen(isOpen ? null : { kind: 'node', id: node.lesson.id });
    },
    [courseId, open],
  );

  const tapChest = (unit: PathUnit) => {
    if (unit.chest === 'locked') {
      playPathCue('nodeLocked');
      playHaptic('warning', false);
    } else {
      playPathCue('nodeReview');
      playHaptic('light', false);
    }
    const isOpen = open?.kind === 'chest' && open.sectionId === unit.sectionId;
    setOpen(isOpen ? null : { kind: 'chest', sectionId: unit.sectionId });
  };

  const start = async (unit: PathUnit, node: PathNode) => {
    if (starting) return;
    playPathCue('start');
    playHaptic('heavy', false);
    if (beforeStart) {
      setStarting(true);
      try {
        await beforeStart();
      } catch {
        // Enrollment can still complete on the lesson route; never strand them.
      }
    }
    if (onOpenLesson) {
      onOpenLesson(node.lesson.id);
      return;
    }
    router.push(lessonHref(courseId, unit.sectionIndex, node.lesson.id));
  };

  const unlock = (unit: PathUnit) => {
    playHaptic('medium', false);
    router.push(buildUnlockHref(courseId, courseHomeHref(courseId)));
  };

  if (model.units.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-[18px] font-extrabold text-ink">The first lessons are on their way.</p>
        <p className="mt-2 text-[15px] text-ink-soft">
          This course doesn&apos;t have lessons yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative w-full pb-10">
      {/* "Already know some of this?" lives in home's Start here card (FirstLessonCard). */}
      <div className={styles.board}>
      {lands.map(({ unit, land, prevLand, layout, walked, tey, keepouts, reached }, unitIdx) => (
        <section
          key={unit.sectionId}
          aria-label={`Unit ${unit.unitNumber}: ${unit.title}, ${LAND_NAME[land]}`}
          className={`${styles.land} ${styles[land]}`}
        >
          {/* The land before fades into this one: a change of scenery, not a seam. */}
          {prevLand && prevLand !== land && (
            <div
              aria-hidden="true"
              className={`${styles[prevLand]} ${styles.landBlend}`}
              style={{ background: 'linear-gradient(180deg, var(--jm-ground), transparent)' }}
            />
          )}
          <UnitBanner
            unit={unit}
            land={land}
            reached={reached}
            stickyTop={stickyTop}
            chapter={!!path.original}
            // Originals: a chapter not reached yet can be unlocked by passing a test on the ones before it.
            onJump={
              path.original && !reached && unit.nodes.every((n) => n.state === 'locked')
                ? () => {
                    playHaptic('medium', false);
                    router.push(jumpHref(courseId, unit.sectionId));
                  }
                : undefined
            }
          />

          <ol className="relative list-none" style={{ height: layout.height }}>
            <LandScene
              unitKey={`${courseId}:${unit.sectionId}`}
              land={land}
              layout={layout}
              walked={walked}
              paintLast={Boolean(finishedId) && reveal !== null && unit.unitNumber === model.current?.unitNumber}
              isFirstUnit={unitIdx === 0}
              isLastUnit={unitIdx === lands.length - 1}
              roadClear={roadClear}
              keepouts={keepouts}
              dim={!reached}
              viewHalf={colW / 2}
            />
            {/* Lands not reached yet wait under a light fog. */}
            {!reached && <div aria-hidden="true" className={styles.fog} />}

            {/* Tey waits beside your next lesson, with a reason to start it. */}
            {tey && (
              <TeyGuide
                x={tey.x}
                top={tey.top}
                pose={tey.pose}
                onTap={() => {
                  const node = unit.nodes.find((n) => n.lesson.id === model.current?.lesson.id);
                  if (node && !(open?.kind === 'node' && open.id === node.lesson.id)) tapNode(node);
                }}
              />
            )}

            {unit.nodes.map((node, i) => {
              const isCurrent = model.current?.lesson.id === node.lesson.id;
              // During the reveal the path briefly shows the moment before:
              // the finished lesson still "current", the next one still shut.
              const isFinished = finishedId === node.lesson.id;
              const holdFinished = isFinished && reveal === 'hold';
              const holdNext = isCurrent && (reveal === 'hold' || reveal === 'check');
              const shown: PathNode = holdFinished
                ? { ...node, state: 'current' }
                : holdNext
                  ? { ...node, state: 'locked' }
                  : node;
              const pop = (isFinished && reveal === 'check') || (isCurrent && reveal === 'unlock');
              const x = layout.nodes[i].x;
              const isOpen = open?.kind === 'node' && open.id === node.lesson.id;
              return (
                <li
                  key={node.lesson.id}
                  className={`absolute inset-x-0 flex justify-center ${isOpen ? 'z-30' : ''}`}
                  style={{ top: layout.nodes[i].y }}
                >
                  <div ref={isCurrent ? currentRef : undefined} style={{ transform: `translateX(${x}px)` }}>
                    <motion.div
                      key={shown.state}
                      className="relative"
                      initial={pop && !reducedMotion ? { scale: 0.6 } : false}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 520, damping: 12 }}
                    >
                      {pop && isCurrent && reveal === 'unlock' && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute left-1/2 -translate-x-1/2 -top-[64px] z-20 whitespace-nowrap rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white pointer-events-none"
                          style={{ backgroundColor: unit.color, boxShadow: `0 3px 0 ${shade(unit.color)}` }}
                          initial={{ opacity: 0, y: 10, scale: 0.6 }}
                          animate={reducedMotion ? { opacity: [0, 1, 1, 0] } : { opacity: [0, 1, 1, 0], y: [10, 0, -4, -14], scale: [0.6, 1.1, 1, 1] }}
                          transition={{ duration: 1.8, times: [0, 0.18, 0.8, 1], ease: 'easeOut' }}
                        >
                          Unlocked!
                        </motion.span>
                      )}
                      {pop && !reducedMotion && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full pointer-events-none"
                          style={{ border: `6px solid ${isFinished ? 'var(--warning)' : unit.color}` }}
                          initial={{ scale: 1, opacity: 0.9 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                        />
                      )}
                      <NodeButton
                        node={shown}
                        unit={unit}
                        isCurrent={holdFinished || (isCurrent && !holdNext)}
                        isOpen={isOpen}
                        nudge={isCurrent && !holdNext ? nudge : null}
                        onTap={() => tapNode(node)}
                      />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <NodePopover
                        key="pop"
                        node={node}
                        unit={unit}
                        arrowX={x}
                        starting={starting}
                        onStart={() => void start(unit, node)}
                        onUnlock={() => unlock(unit)}
                        isOriginal={!!path.original}
                      />
                    )}
                  </AnimatePresence>
                </li>
              );
            })}

            {/* The unit's chest — opens when every lesson in the unit is done. */}
            <li
              className={`absolute inset-x-0 flex justify-center ${open?.kind === 'chest' && open.sectionId === unit.sectionId ? 'z-30' : ''}`}
              style={{ top: layout.chest.y }}
            >
              <ChestButton unit={unit} x={layout.chest.x} onTap={() => tapChest(unit)} />
              <AnimatePresence>
                {open?.kind === 'chest' && open.sectionId === unit.sectionId && (
                  <ChestPopover key="chest" unit={unit} arrowX={layout.chest.x} />
                )}
              </AnimatePresence>
            </li>
          </ol>
        </section>
      ))}
      </div>

      {path.original && <OriginalsTrail original={path.original} levelDone={model.current === null} />}

      {footer}

      {/* "New land!" — when finishing a lesson carried you into the next one. */}
      <AnimatePresence>
        {landCard && enteredLand && (
          <motion.div
            role="status"
            className="fixed z-40 left-1/2 top-[calc(env(safe-area-inset-top)+84px)] md:top-8 pointer-events-none"
            initial={reducedMotion ? { opacity: 0, x: '-50%' } : { opacity: 0, x: '-50%', y: -30, scale: 0.7 }}
            animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0, x: '-50%' } : { opacity: 0, x: '-50%', y: -16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 460, damping: 20 }}
          >
            <div
              className="flex items-center gap-3 rounded-[20px] bg-white pl-3 pr-5 py-3 border-2 border-[var(--border)]"
              style={{ boxShadow: '0 5px 0 var(--border)' }}
            >
              <span
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--success-green)', boxShadow: `0 3px 0 ${shade('var(--success-green)')}` }}
              >
                <Glyph name={LAND_ICON[enteredLand]} size={24} strokeWidth={2.5} />
              </span>
              <span className="text-left">
                <span className="block text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                  New land reached
                </span>
                <span className="block text-[18px] font-extrabold text-ink leading-tight" style={{ fontFamily: 'var(--font-jakarta)' }}>
                  {LAND_NAME[enteredLand]}
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to my lesson — a labelled pill, so it reads as "go on" rather
          than a bare arrow. Sits above the floating bottom dock (~78px) and
          clears the iOS home indicator. */}
      <AnimatePresence>
        {jump && model.current && (
          <motion.button
            type="button"
            onClick={jumpToCurrent}
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 12 }}
            whileTap={reducedMotion ? undefined : { y: 3, boxShadow: '0 1px 0 var(--color-brand-dark)' }}
            transition={{ type: 'spring', stiffness: 500, damping: 26 }}
            aria-label="Jump to your next lesson"
            className="fixed z-30 right-4 md:right-[calc(50%-300px)] lg:right-auto lg:left-[calc(50%+40px)] h-12 pl-4 pr-5 rounded-2xl bg-brand text-white flex items-center gap-2 cursor-pointer text-[14px] font-extrabold uppercase tracking-wide"
            style={{
              bottom: 'calc(96px + env(safe-area-inset-bottom))',
              boxShadow: '0 4px 0 var(--color-brand-dark)',
              fontFamily: 'var(--font-jakarta)',
            }}
          >
            <Glyph name={jump === 'up' ? 'arrowUp' : 'arrowDown'} size={20} />
            Next lesson
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LearningPath;

// ─── Pieces ────────────────────────────────────────────────────────────────


const LAND_ICON: Record<LandId, GlyphName> = {
  meadow: 'sprout',
  forest: 'trees',
  canyon: 'mountain',
  snow: 'mountainSnow',
  summit: 'flag',
};

function UnitBanner({
  unit,
  land,
  reached,
  stickyTop,
  chapter = false,
  onJump,
}: {
  unit: PathUnit;
  land: LandId;
  reached: boolean;
  stickyTop: string;
  /** Teyro Originals: each unit is a story chapter (playbook §8a) with a marker and a story line. */
  chapter?: boolean;
  /** Jump ahead: shown on a chapter the learner hasn't reached. */
  onJump?: () => void;
}) {
  const complete = unit.doneCount === unit.nodes.length;
  const landGlyph: GlyphName = reached ? LAND_ICON[land] : 'lock';
  const pct = unit.nodes.length ? (unit.doneCount / unit.nodes.length) * 100 : 0;
  return (
    <div className="sticky z-20 pt-3 -mt-3 px-3" style={{ top: stickyTop }}>
      <div
        className="relative rounded-[18px] px-4 py-3.5 md:px-5 md:py-4 flex items-center gap-3 text-white overflow-hidden"
        style={{ backgroundColor: unit.color, boxShadow: `0 4px 0 ${shade(unit.color)}` }}
      >
        <div className="flex-1 min-w-0">
          <p className="flex items-center gap-1.5 text-[12px] md:text-[13px] font-extrabold uppercase tracking-wider opacity-90">
            <Glyph name={landGlyph} size={14} strokeWidth={2.75} className="shrink-0" />
            <span className="truncate">
              {chapter ? 'Chapter' : 'Unit'} {unit.unitNumber} · {(chapter && unit.marker) || LAND_NAME[land]}
            </span>
          </p>
          <h2 className="text-[17px] md:text-[20px] font-extrabold leading-tight truncate">{unit.title}</h2>
          {chapter && unit.description && (
            <p className="mt-0.5 text-[13px] md:text-[14px] font-semibold leading-snug opacity-90 line-clamp-2">{unit.description}</p>
          )}
        </div>
        {/* The unit's progress, as a bar along the banner's foot. */}
        <span aria-hidden="true" className="absolute left-0 right-0 bottom-0 h-[5px]" style={{ backgroundColor: shade(unit.color, 86) }}>
          <span className="block h-full bg-white/70 transition-[width] duration-700" style={{ width: `${pct}%` }} />
        </span>
        {onJump && (
          <button
            type="button"
            onClick={onJump}
            className="relative shrink-0 rounded-xl px-3 py-1.5 text-[13px] md:text-[14px] font-extrabold uppercase tracking-wide flex items-center gap-1.5 text-white bg-white/20 border-2 border-white/70 hover:bg-white/30 transition-transform active:scale-[0.98]"
            aria-label={`Jump to chapter ${unit.unitNumber}: take a test to unlock it`}
          >
            <Glyph name="chevronsUp" size={16} />
            Jump here
          </button>
        )}
        {unit.testedOutCount > 0 && unit.doneCount < unit.nodes.length && (
          <span
            className="shrink-0 rounded-xl px-2.5 py-1.5 text-[12px] md:text-[13px] font-extrabold uppercase tracking-wide"
            style={{ backgroundColor: shade(unit.color, 88) }}
          >
            Tested out
          </span>
        )}
        <span
          className="shrink-0 rounded-xl px-3 py-1.5 text-[13px] md:text-[14px] font-extrabold flex items-center gap-1"
          style={{ backgroundColor: shade(unit.color, 88) }}
          aria-label={`${unit.doneCount} of ${unit.nodes.length} lessons done`}
        >
          {complete ? <Glyph name="check" size={16} strokeWidth={3.5} /> : null}
          {unit.doneCount}/{unit.nodes.length}
        </span>
      </div>
    </div>
  );
}

function NodeButton({
  node,
  unit,
  isCurrent,
  isOpen,
  nudge = null,
  onTap,
}: {
  node: PathNode;
  unit: PathUnit;
  isCurrent: boolean;
  isOpen: boolean;
  /** Why to start now — under START on the current node's callout. */
  nudge?: string | null;
  onTap: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const lit = node.state === 'done' || node.state === 'current';
  const face = lit ? unit.color : 'var(--border)';
  const lip = lit ? shade(unit.color) : 'var(--border-strong)';
  const icon = nodeIcon(node, unit);

  const stateLabel =
    node.state === 'done'
      ? 'completed'
      : node.state === 'current'
        ? 'your next lesson'
        : node.state === 'paywalled'
          ? 'part of the full course'
          : 'locked';

  return (
    <div className="relative" data-path-hit>
      {/* START bubble over the current node — Duolingo's bouncing callout. */}
      {isCurrent && !isOpen && (
        <motion.div
          aria-hidden="true"
          className={`absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none ${nudge ? '-top-[74px]' : '-top-[52px]'}`}
          animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="relative rounded-xl border-2 bg-white px-3.5 py-2 text-center whitespace-nowrap"
            style={{ borderColor: 'var(--border)', boxShadow: '0 3px 0 var(--border)' }}
          >
            <span
              className="block text-[15px] font-extrabold uppercase tracking-wide leading-tight"
              style={{ color: node.state === 'paywalled' ? 'var(--text-secondary)' : unit.color }}
            >
              {node.state === 'paywalled' ? 'Unlock' : 'Start'}
              {node.state !== 'paywalled' && (node.lesson.xpReward ?? 0) > 0 && (
                <span
                  className="ml-1.5 inline-block rounded-full px-1.5 py-[1px] align-middle text-[11.5px] tracking-normal text-white"
                  style={{ backgroundColor: 'var(--lesson-gold-dark)' }}
                >
                  +{node.lesson.xpReward} XP
                </span>
              )}
            </span>
            {nudge && (
              <span className="block mt-0.5 text-[12.5px] font-bold normal-case tracking-normal text-[var(--text-secondary)] leading-tight">
                {nudge}
              </span>
            )}
            <span
              className="absolute left-1/2 -bottom-[7px] w-3 h-3 -translate-x-1/2 rotate-45 bg-white border-b-2 border-r-2"
              style={{ borderColor: 'var(--border)' }}
            />
          </div>
        </motion.div>
      )}

      {/* The current node: a halo that breathes, and a ring that fills with
          the chapter's progress, so the next lesson reads as a step toward it. */}
      {isCurrent && node.state !== 'paywalled' && !reducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute -inset-[18px] rounded-full pointer-events-none"
          style={{ backgroundColor: `color-mix(in srgb, ${unit.color} 30%, transparent)` }}
          animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {isCurrent && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="absolute -inset-[11px] -rotate-90 pointer-events-none"
          style={{ width: 'calc(100% + 22px)', height: 'calc(100% + 22px)' }}
        >
          <circle cx="50" cy="50" r="46" fill="none" strokeWidth="6" style={{ stroke: node.state === 'paywalled' ? 'var(--border)' : `color-mix(in srgb, ${unit.color} 22%, white)` }} />
          {node.state !== 'paywalled' && unit.nodes.length > 0 && (
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              style={{ stroke: unit.color }}
              strokeDasharray={2 * Math.PI * 46}
              initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - Math.max(0.04, unit.doneCount / unit.nodes.length)) }}
              transition={{ duration: reducedMotion ? 0 : 1.1, ease: 'easeOut', delay: 0.3 }}
            />
          )}
        </svg>
      )}

      <motion.button
        type="button"
        onClick={onTap}
        aria-label={`Lesson ${node.number}: ${node.lesson.title}, ${stateLabel}`}
        aria-expanded={isOpen}
        whileTap={reducedMotion ? undefined : { y: 6, boxShadow: `0 1px 0 ${lip}` }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="relative rounded-[50%] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40"
        style={{
          width: NODE_W,
          height: NODE_H,
          backgroundColor: face,
          boxShadow: `0 7px 0 ${lip}`,
        }}
      >
        {isCurrent && node.state === 'current' && !reducedMotion && (
          <span aria-hidden="true" className="absolute inset-0 rounded-[50%] overflow-hidden pointer-events-none">
            <motion.span
              className="absolute top-0 bottom-0 w-[40%]"
              style={{ background: 'linear-gradient(100deg, transparent, color-mix(in srgb, white 55%, transparent), transparent)' }}
              initial={{ left: '-50%' }}
              animate={{ left: ['-50%', '120%'] }}
              transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.6, ease: 'easeInOut' }}
            />
          </span>
        )}
        {/* Gloss — what makes a flat circle read as a pressable game piece. */}
        {lit && (
          <span
            aria-hidden="true"
            className="absolute top-[9px] left-1/2 -translate-x-1/2 w-[46%] h-[16%] rounded-full bg-white/30"
          />
        )}
        {node.state === 'done' ? (
          <Glyph name="check" size={36} strokeWidth={3.6} className="text-white" />
        ) : node.state === 'current' ? (
          <Glyph name={icon} size={36} strokeWidth={2.4} className="text-white" />
        ) : node.state === 'paywalled' ? (
          <Glyph name="lock" size={32} strokeWidth={2.75} className="text-[var(--text-muted)]" />
        ) : (
          <Glyph name={icon} size={36} strokeWidth={2.4} className="text-[var(--border-strong)]" />
        )}
      </motion.button>
    </div>
  );
}

function PopoverShell({
  arrowX,
  color,
  children,
}: {
  arrowX: number;
  /** Filled card in the unit colour, or a neutral white card when null. */
  color: string | null;
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      data-path-hit
      role="dialog"
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 520, damping: 32 }}
      className="absolute z-30 left-1/2 -translate-x-1/2 w-[min(320px,calc(100vw-40px))]"
      style={{ top: NODE_H + 24, transformOrigin: `calc(50% + ${arrowX}px) 0` }}
    >
      {/* Arrow, pointing up at the node wherever the road put it. */}
      <span
        aria-hidden="true"
        className="absolute -top-[8px] w-4 h-4 rotate-45"
        style={{
          left: `calc(50% + ${arrowX}px - 8px)`,
          backgroundColor: color ?? 'white',
          borderLeft: color ? undefined : '2px solid var(--border)',
          borderTop: color ? undefined : '2px solid var(--border)',
        }}
      />
      <div
        className="relative rounded-[18px] p-4"
        style={
          color
            ? { backgroundColor: color, boxShadow: `0 4px 0 ${shade(color)}` }
            : { backgroundColor: 'white', border: '2px solid var(--border)', boxShadow: '0 4px 0 var(--border)' }
        }
      >
        {children}
      </div>
    </motion.div>
  );
}

function PopoverButton({
  label,
  color,
  onClick,
  inverted = false,
}: {
  label: string;
  color: string;
  onClick: () => void;
  /** White button on a coloured card (true) or coloured button on white. */
  inverted?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const lip = inverted ? 'color-mix(in srgb, white 80%, black)' : shade(color);
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={reducedMotion ? undefined : { y: 4, boxShadow: `0 0px 0 ${lip}` }}
      transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      className="mt-3.5 w-full h-[50px] rounded-[14px] text-[16px] font-extrabold uppercase tracking-wide cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
      style={{
        backgroundColor: inverted ? 'white' : color,
        color: inverted ? color : 'white',
        boxShadow: `0 4px 0 ${lip}`,
        fontFamily: 'var(--font-jakarta)',
      }}
    >
      {label}
    </motion.button>
  );
}

function NodePopover({
  node,
  unit,
  arrowX,
  starting,
  onStart,
  onUnlock,
  isOriginal = false,
}: {
  node: PathNode;
  unit: PathUnit;
  arrowX: number;
  starting: boolean;
  onStart: () => void;
  onUnlock: () => void;
  isOriginal?: boolean;
}) {
  const milestone = node.lesson.milestone ? MILESTONE_LABEL[node.lesson.milestone] : null;
  const of = `${milestone ? `${milestone} · ` : ''}Lesson ${node.numberInUnit} of ${unit.nodes.length}`;
  const xp = node.lesson.xpReward ?? 0;

  if (node.state === 'locked') {
    return (
      <PopoverShell arrowX={arrowX} color={null}>
        <p className="text-[17px] font-extrabold text-[var(--text-muted)] leading-snug">{node.lesson.title}</p>
        <p className="mt-1 text-[14.5px] font-semibold text-[var(--text-muted)]">
          Finish the lessons above to unlock this one!
        </p>
      </PopoverShell>
    );
  }

  if (node.state === 'paywalled') {
    return (
      <PopoverShell arrowX={arrowX} color={null}>
        <p className="text-[17px] font-extrabold text-ink leading-snug">{node.lesson.title}</p>
        <p className="mt-1 text-[14.5px] font-semibold text-ink-soft">
          {isOriginal
            ? "You've finished the free lessons. Get Teyro Originals to unlock this course and every other Original."
            : "You've finished the free lessons. Unlock the full course to keep going!"}
        </p>
        <PopoverButton label={isOriginal ? 'Get Teyro Originals' : 'Unlock course'} color="var(--color-brand)" onClick={onUnlock} />
      </PopoverShell>
    );
  }

  const done = node.state === 'done';
  const toChest = unit.nodes.length - unit.doneCount;
  return (
    <PopoverShell arrowX={arrowX} color={unit.color}>
      <p className="text-[12.5px] font-extrabold uppercase tracking-[0.1em] text-white/80">
        {done ? `${of} · Done! Review it anytime.` : of}
      </p>
      <p className="mt-1 text-[18px] font-extrabold text-white leading-snug">{node.lesson.title}</p>
      {!done && node.lesson.shortDescription && (
        <p className="mt-1 text-[14px] font-semibold text-white/90 leading-snug line-clamp-3">{node.lesson.shortDescription}</p>
      )}
      {!done && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {xp > 0 && (
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[12.5px] font-extrabold text-white">+{xp} XP</span>
          )}
          {node.lesson.durationMinutes ? (
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[12.5px] font-extrabold text-white">{node.lesson.durationMinutes} min</span>
          ) : null}
          {toChest > 0 && (
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[12.5px] font-extrabold text-white">
              {toChest === 1 ? 'Last one before the chest' : `${toChest} lessons to the chest`}
            </span>
          )}
        </div>
      )}
      <PopoverButton
        label={starting ? 'Starting…' : done ? 'Review' : xp > 0 ? `Start +${xp} XP` : 'Start'}
        color={unit.color}
        onClick={onStart}
        inverted
      />
    </PopoverShell>
  );
}

function ChestButton({ unit, x, onTap }: { unit: PathUnit; x: number; onTap: () => void }) {
  const reducedMotion = useReducedMotion();
  const open = unit.chest === 'open';
  return (
    <div data-path-hit style={{ transform: `translateX(${x}px)` }}>
      <motion.button
        type="button"
        onClick={onTap}
        aria-label={open ? `Unit ${unit.unitNumber} chest, collected` : `Unit ${unit.unitNumber} chest, locked`}
        animate={open && !reducedMotion ? { rotate: [0, -4, 4, 0] } : undefined}
        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
        whileTap={reducedMotion ? undefined : { scale: 0.92 }}
        className="relative w-[84px] h-[76px] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 rounded-2xl"
      >
        <Image
          src="/Tressure box.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="84px"
          className={`object-contain ${open ? '' : 'grayscale opacity-50'}`}
        />
      </motion.button>
    </div>
  );
}

function ChestPopover({ unit, arrowX }: { unit: PathUnit; arrowX: number }) {
  const open = unit.chest === 'open';
  return (
    <PopoverShell arrowX={arrowX} color={open ? unit.color : null}>
      {open ? (
        <>
          <p className="text-[17px] font-extrabold text-white">Chest collected!</p>
          <p className="mt-1 text-[14.5px] font-bold text-white/85">
            You earned this unit&apos;s reward when you finished it.
          </p>
        </>
      ) : (
        <>
          <p className="text-[17px] font-extrabold text-ink">Unit {unit.unitNumber} chest</p>
          <p className="mt-1 text-[14.5px] font-semibold text-ink-soft">
            Finish every lesson in this unit to open it!
          </p>
        </>
      )}
    </PopoverShell>
  );
}

/**
 * Each node's icon, Duolingo-style — not a star on every lesson. A lesson's
 * real type wins (reading, audio, quiz, project, reflection); the unit's last
 * lesson is its trophy; ordinary lessons step through the lesson rhythm
 * (learn, read, practise, reflect) so neighbours never look the same.
 */
const TYPE_ICONS: Record<string, GlyphName> = {
  text: 'book',
  reading: 'book',
  audio: 'headphones',
  quiz: 'dumbbell',
  project: 'code',
  assignment: 'code',
  reflection: 'bulb',
};
const RHYTHM: GlyphName[] = ['star', 'book', 'dumbbell', 'star', 'bulb'];

function nodeIcon(node: PathNode, unit: PathUnit): GlyphName {
  if (node.lesson.milestone === 'UNIT_CHALLENGE') return 'trophy';
  if (node.lesson.milestone === 'CHECKPOINT') return 'medal';
  const byType = node.lesson.lessonType ? TYPE_ICONS[node.lesson.lessonType] : undefined;
  if (byType) return byType;
  if (unit.nodes.length > 1 && node.numberInUnit === unit.nodes.length) return 'trophy';
  return RHYTHM[(node.numberInUnit - 1) % RHYTHM.length];
}

/**
 * Tey, standing by your next lesson like a guide on the trail — bobbing,
 * with a shadow on the ground. Tapping him opens that lesson's card.
 */
function TeyGuide({ x, top, pose, onTap }: { x: number; top: number; pose: TeyPose; onTap: () => void }) {
  const reducedMotion = useReducedMotion();
  return (
    <button
      type="button"
      data-path-hit
      onClick={onTap}
      aria-label="Tey: open your next lesson"
      className="absolute z-[5] cursor-pointer w-[104px] md:w-[140px] aspect-[1/1.18] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/40 rounded-3xl"
      style={{ top, left: `calc(50% + ${x}px)`, transform: 'translateX(-50%)' }}
    >
      {/* His shadow stays on the ground while he bobs. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-[2px] w-[56%] h-[10px] rounded-[50%]"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 16%, transparent)' }}
        animate={reducedMotion ? undefined : { scaleX: [1, 0.82, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute inset-0"
        animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image src={`/User onbarding Assets/tey/${pose}.webp`} alt="" fill sizes="(min-width: 768px) 140px, 104px" className="object-contain" />
      </motion.span>
    </button>
  );
}
