'use client';

/**
 * The pieces every creator studio page is built from: the page head, stat
 * tiles with a delta, faces, pills, Tey's speech bubble, empty/error/loading
 * states, a bottom sheet and a toast. Styles: studio.module.css.
 */

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Minus, RotateCw, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { TEY_POSE_SRC, type TeyPose } from '@/components/lesson/TeySays';
import { compact, type Face } from '@/lib/creator/studio';
import { playSound } from '@/lib/audio/lessonSounds';
import s from './studio.module.css';

export { s as studio };

/* ── page head ────────────────────────────────────────────────────────── */

export function PageHead({ title, sub, actions }: { title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <header className={s.head}>
      <div className={s.headText}>
        <h1 className={s.title}>{title}</h1>
        {sub && <p className={s.sub}>{sub}</p>}
      </div>
      {actions && <div className={s.headActions}>{actions}</div>}
    </header>
  );
}

export function Section({
  title,
  note,
  side,
  children,
}: {
  title: string;
  note?: ReactNode;
  side?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <div>
          <h2 className={s.sectionTitle}>{title}</h2>
          {note && <p className={s.sectionNote}>{note}</p>}
        </div>
        {side}
      </div>
      {children}
    </section>
  );
}

/* ── stat tiles ───────────────────────────────────────────────────────── */

export function Delta({ pct, upIsGood = true, vs }: { pct: number; upIsGood?: boolean; vs?: string }) {
  const cls = pct === 0 ? s.deltaFlat : (pct > 0) === upIsGood ? s.deltaUp : s.deltaDown;
  const Icon = pct === 0 ? Minus : pct > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={cls}>
      <Icon size={14} aria-hidden="true" />
      {pct > 0 ? '+' : ''}
      {pct}%{vs && <span className={s.deltaFlat} style={{ fontWeight: 600 }}>&nbsp;{vs}</span>}
    </span>
  );
}

export function StatTile({
  icon,
  label,
  value,
  foot,
  tone,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  foot?: ReactNode;
  tone?: string;
  onClick?: () => void;
}) {
  const body = (
    <>
      <span className={s.statTop}>
        <span className={s.statIcon} style={tone ? ({ '--tone': tone } as CSSProperties) : undefined}>
          {icon}
        </span>
        <span className={s.statLabel}>{label}</span>
      </span>
      <span className={s.statValue}>{typeof value === 'number' ? compact(value) : value}</span>
      {foot && <span className={s.statFoot}>{foot}</span>}
    </>
  );
  return onClick ? (
    <button type="button" className={s.stat} onClick={onClick}>
      {body}
    </button>
  ) : (
    <div className={s.stat}>{body}</div>
  );
}

/* ── people ───────────────────────────────────────────────────────────── */

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

export function PersonAvatar({ face, size = 44 }: { face: Pick<Face, 'fullName' | 'avatarUrl'>; size?: number }) {
  return (
    <span className={s.avatar} style={{ '--size': `${size}px` } as CSSProperties} aria-hidden="true">
      {face.avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- user uploads on arbitrary hosts
        <img src={face.avatarUrl} alt="" loading="lazy" />
      ) : (
        initials(face.fullName)
      )}
    </span>
  );
}

export function Faces({ faces, total }: { faces: Face[]; total?: number }) {
  const more = (total ?? faces.length) - faces.length;
  return (
    <span className={s.faces} aria-label={`${total ?? faces.length} learners`}>
      {faces.map((f) => (
        <span key={f.id} className={s.face} title={f.fullName}>
          {f.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- user uploads on arbitrary hosts
            <img src={f.avatarUrl} alt="" loading="lazy" />
          ) : (
            initials(f.fullName)
          )}
        </span>
      ))}
      {more > 0 && <span className={`${s.face} ${s.faceMore}`}>+{more > 99 ? 99 : more}</span>}
    </span>
  );
}

export function Pill({ tone, children }: { tone?: string; children: ReactNode }) {
  return (
    <span className={s.pill} style={tone ? ({ '--tone': tone } as CSSProperties) : undefined}>
      {children}
    </span>
  );
}

export function Bar({ pct, tone, label }: { pct: number; tone?: string; label: string }) {
  const v = Math.max(0, Math.min(100, Math.round(pct)));
  return (
    <div className={s.bar} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className={s.barFill} style={{ width: `${v}%`, ...(tone ? ({ '--tone': tone } as CSSProperties) : {}) }} />
    </div>
  );
}

/* ── Tey ──────────────────────────────────────────────────────────────── */

export function TeyLine({ pose, children }: { pose: TeyPose; children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <div className={s.tey}>
      <motion.div
        initial={reduced ? false : { y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      >
        <Image src={TEY_POSE_SRC[pose]} alt="" width={112} height={134} className={s.teyImg} priority />
      </motion.div>
      <motion.div
        className={s.bubble}
        initial={reduced ? false : { scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 380, damping: 24 }}
        style={{ transformOrigin: 'left bottom' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── states ───────────────────────────────────────────────────────────── */

export function Skel({ h, w = '100%', r }: { h: number; w?: number | string; r?: number }) {
  return <div className={s.skel} style={{ height: h, width: w, borderRadius: r }} aria-hidden="true" />;
}

export function EmptyCard({
  pose = 'searching',
  title,
  children,
  action,
}: {
  pose?: TeyPose;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className={s.empty}>
      <Image src={TEY_POSE_SRC[pose]} alt="" width={88} height={104} className={s.emptyImg} />
      <strong>{title}</strong>
      {children && <span>{children}</span>}
      {action}
    </div>
  );
}

export function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className={s.errorBox} role="alert">
      <span>{message}</span>
      <button type="button" className={`${s.btn} ${s.btnSm}`} onClick={onRetry}>
        <RotateCw size={14} aria-hidden="true" /> Try again
      </button>
    </div>
  );
}

/* ── sheet ────────────────────────────────────────────────────────────── */

export function Sheet({
  open,
  title,
  onClose,
  children,
  labelledBy = 'studio-sheet-title',
}: {
  open: boolean;
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  labelledBy?: string;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    playSound('menuOpen');
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => panelRef.current?.querySelector<HTMLElement>('textarea, input, button')?.focus(), 60);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={s.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            className={s.sheet}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={reduced ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            <div className={s.sheetHead}>
              <h2 className={s.sheetTitle} id={labelledBy}>
                {title}
              </h2>
              <button type="button" className={s.iconBtn} aria-label="Close" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── toast ────────────────────────────────────────────────────────────── */

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = useCallback((m: string) => {
    setMsg(m);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 3200);
  }, []);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const node = (
    <AnimatePresence>
      {msg && (
        <motion.div
          className={s.toast}
          role="status"
          initial={{ y: 24, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 24, opacity: 0, x: '-50%' }}
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
  return { show, node };
}

/* ── range switch ─────────────────────────────────────────────────────── */

export function Segmented<T extends string | number>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className={s.seg} role="radiogroup" aria-label={label}>
      {options.map((o, i) => (
        <button
          key={String(o.value)}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          className={`${s.segBtn} ${value === o.value ? s.segOn : ''}`}
          onClick={() => {
            if (value === o.value) return;
            onChange(o.value);
            playSound('navTap', i);
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
