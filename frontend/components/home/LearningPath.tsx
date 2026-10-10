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
import { ArrowDown, ArrowUp, Check, Lock, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { playPathCue } from '@/lib/audio/pathAudio';
import { playSound } from '@/lib/audio/lessonSounds';
import { clearFinishedLesson, peekFinishedLesson } from '@/lib/path/arrival';
import { playHaptic } from '@/lib/haptics';
import { buildPathModel, nodeOffset, type PathNode, type PathUnit } from '@/lib/path/model';
import { buildUnlockHref } from '@/lib/return-to';
import { courseHomeHref } from '@/lib/homeCourse';
import { prefetchLesson } from '@/lib/path/lessonPrefetch';
import { lessonHref, preloadCourse, type LearningPath as LearningPathData } from '@/hooks/useCourse';

/** How far the road swings left/right, in px, at full amplitude. */
const SWING = { mobile: 62, desktop: 88 };

/** A darker shade of a token colour, for the 3D lip under a node or banner. */
const shade = (color: string, pct = 78) => `color-mix(in srgb, ${color} ${pct}%, black)`;

/** Tey beside the road — one per unit, cycling through the cropped poses. */
const TEY_POSES = ['cheering', 'thinking', 'pointing', 'tablet', 'flame'] as const;

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
}

export function LearningPath({ path, stickyTop = '0px', beforeStart, footer }: LearningPathProps) {
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

  // ── Arrive: land on the current lesson, not the top of the course ────────
  const landedRef = useRef(false);
  useEffect(() => {
    if (landedRef.current || !currentRef.current) return;
    landedRef.current = true;
    currentRef.current.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior });
    if (!finishedId) playPathCue('arrive');
  }, [model, finishedId]);

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
      {model.units.map((unit, unitIdx) => (
        <section key={unit.sectionId} aria-label={`Unit ${unit.unitNumber}: ${unit.title}`} className="relative">
          <UnitBanner unit={unit} stickyTop={stickyTop} />

          <ol className="relative flex flex-col items-center gap-[22px] pt-10 pb-8 list-none">
            {/* Tey beside the road, on the side the road swings away from. */}
            {unit.nodes.length >= 3 && (
              <TeyBeside
                pose={TEY_POSES[unitIdx % TEY_POSES.length]}
                side={nodeOffset(2) > 0 ? 'left' : 'right'}
                // Row 2's vertical centre: top padding + two node rows.
                top={40 + 2 * (NODE_H + 22) - 30}
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
              const x = nodeOffset(i) * swing;
              const isOpen = open?.kind === 'node' && open.id === node.lesson.id;
              return (
                <li
                  key={node.lesson.id}
                  className={`relative w-full flex justify-center ${isCurrent ? 'mt-7' : ''}`}
                >
                  <div ref={isCurrent ? currentRef : undefined} style={{ transform: `translateX(${x}px)` }}>
                    <motion.div
                      key={shown.state}
                      className="relative"
                      initial={pop && !reducedMotion ? { scale: 0.6 } : false}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 520, damping: 12 }}
                    >
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
                      />
                    )}
                  </AnimatePresence>
                </li>
              );
            })}

            {/* The unit's chest — opens when every lesson in the unit is done. */}
            <li className="relative w-full flex justify-center pt-2">
              <ChestButton
                unit={unit}
                x={nodeOffset(unit.nodes.length) * swing}
                onTap={() => tapChest(unit)}
              />
              <AnimatePresence>
                {open?.kind === 'chest' && open.sectionId === unit.sectionId && (
                  <ChestPopover key="chest" unit={unit} arrowX={nodeOffset(unit.nodes.length) * swing} />
                )}
              </AnimatePresence>
            </li>
          </ol>
        </section>
      ))}

      {footer}

      {/* Back to my lesson — Duolingo's floating arrow. Sits above the mobile
          bottom nav (84px) and clears the iOS home indicator. */}
      <AnimatePresence>
        {jump && model.current && (
          <motion.button
            type="button"
            onClick={jumpToCurrent}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileTap={reducedMotion ? undefined : { y: 3 }}
            transition={{ type: 'spring', stiffness: 500, damping: 26 }}
            aria-label="Jump to your next lesson"
            className="fixed z-30 right-4 md:right-[calc(50%-300px)] lg:right-auto lg:left-[calc(50%+110px)] w-14 h-14 rounded-2xl bg-white border-2 border-[var(--border)] flex items-center justify-center text-brand cursor-pointer"
            style={{
              bottom: 'calc(96px + env(safe-area-inset-bottom))',
              boxShadow: '0 4px 0 var(--border)',
            }}
          >
            {jump === 'up' ? <ArrowUp className="w-7 h-7 stroke-[3]" /> : <ArrowDown className="w-7 h-7 stroke-[3]" />}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LearningPath;

// ─── Pieces ────────────────────────────────────────────────────────────────

const NODE_W = 76;
const NODE_H = 70;

function UnitBanner({ unit, stickyTop }: { unit: PathUnit; stickyTop: string }) {
  const complete = unit.doneCount === unit.nodes.length;
  return (
    <div className="sticky z-20 pt-3 -mt-3" style={{ top: stickyTop }}>
      <div
        className="rounded-[18px] px-4 py-3.5 md:px-5 md:py-4 flex items-center gap-3 text-white"
        style={{ backgroundColor: unit.color, boxShadow: `0 4px 0 ${shade(unit.color)}` }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[12px] md:text-[13px] font-extrabold uppercase tracking-wider opacity-85">
            Unit {unit.unitNumber}
          </p>
          <h2 className="text-[17px] md:text-[20px] font-extrabold leading-tight truncate">{unit.title}</h2>
        </div>
        <span
          className="shrink-0 rounded-xl px-3 py-1.5 text-[13px] md:text-[14px] font-extrabold flex items-center gap-1"
          style={{ backgroundColor: shade(unit.color, 88) }}
          aria-label={`${unit.doneCount} of ${unit.nodes.length} lessons done`}
        >
          {complete ? <Check className="w-4 h-4 stroke-[3.5]" aria-hidden="true" /> : null}
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
  onTap,
}: {
  node: PathNode;
  unit: PathUnit;
  isCurrent: boolean;
  isOpen: boolean;
  onTap: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const lit = node.state === 'done' || node.state === 'current';
  const face = lit ? unit.color : 'var(--border)';
  const lip = lit ? shade(unit.color) : 'var(--border-strong)';

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
          className="absolute left-1/2 -translate-x-1/2 -top-[52px] z-10 pointer-events-none"
          animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="relative rounded-xl border-2 bg-white px-3.5 py-2 text-[15px] font-extrabold uppercase tracking-wide whitespace-nowrap"
            style={{ borderColor: 'var(--border)', color: node.state === 'paywalled' ? 'var(--text-secondary)' : unit.color }}
          >
            {node.state === 'paywalled' ? 'Unlock' : 'Start'}
            <span
              className="absolute left-1/2 -bottom-[7px] w-3 h-3 -translate-x-1/2 rotate-45 bg-white border-b-2 border-r-2"
              style={{ borderColor: 'var(--border)' }}
            />
          </div>
        </motion.div>
      )}

      {/* Progress ring around the current node. */}
      {isCurrent && (
        <span
          aria-hidden="true"
          className="absolute -inset-[9px] rounded-full border-[6px]"
          style={{ borderColor: node.state === 'paywalled' ? 'var(--border)' : `color-mix(in srgb, ${unit.color} 28%, white)` }}
        />
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
        {/* Gloss — what makes a flat circle read as a pressable game piece. */}
        {lit && (
          <span
            aria-hidden="true"
            className="absolute top-[9px] left-1/2 -translate-x-1/2 w-[46%] h-[16%] rounded-full bg-white/30"
          />
        )}
        {node.state === 'done' ? (
          <Check className="w-9 h-9 text-white stroke-[3.5]" aria-hidden="true" />
        ) : node.state === 'current' ? (
          <Star className="w-9 h-9 text-white fill-white" aria-hidden="true" />
        ) : node.state === 'paywalled' ? (
          <Lock className="w-8 h-8 stroke-[2.75] text-[var(--text-muted)]" aria-hidden="true" />
        ) : (
          <Star className="w-9 h-9 fill-[var(--border-strong)] text-[var(--border-strong)]" aria-hidden="true" />
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
}: {
  node: PathNode;
  unit: PathUnit;
  arrowX: number;
  starting: boolean;
  onStart: () => void;
  onUnlock: () => void;
}) {
  const of = `Lesson ${node.numberInUnit} of ${unit.nodes.length}`;
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
          You&apos;ve finished the free lessons. Unlock the full course to keep going!
        </p>
        <PopoverButton label="Unlock course" color="var(--color-brand)" onClick={onUnlock} />
      </PopoverShell>
    );
  }

  const done = node.state === 'done';
  return (
    <PopoverShell arrowX={arrowX} color={unit.color}>
      <p className="text-[17px] font-extrabold text-white leading-snug">{node.lesson.title}</p>
      <p className="mt-1 text-[14.5px] font-bold text-white/85">
        {done ? `${of} · Done! Review it anytime.` : of}
      </p>
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

function TeyBeside({ pose, side, top }: { pose: string; side: 'left' | 'right'; top: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute w-[96px] h-[112px] md:w-[124px] md:h-[144px] pointer-events-none"
      style={{
        top,
        [side]: 'max(4px, calc(50% - 190px))',
      }}
    >
      <Image
        src={`/User onbarding Assets/tey/${pose}.webp`}
        alt=""
        fill
        sizes="124px"
        className="object-contain drop-shadow-[0_10px_16px_rgba(7,18,51,0.12)]"
      />
    </div>
  );
}
