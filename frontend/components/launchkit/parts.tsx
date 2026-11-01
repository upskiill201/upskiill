"use client";

/**
 * Launch kit building blocks. Every piece of every launch image is its own
 * layer built from these, so it can be animated and moved like motion
 * graphics instead of being a flattened screenshot. Illustrative data; every
 * feature shown ships today (see lib/seo/facts.ts).
 *
 * `still` renders the finished frame with no motion: that is what the PNG
 * export captures.
 */

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Glyph, type GlyphName } from "@/components/art/Glyph";
import css from "./launchkit.module.css";

type SceneState = { still: boolean };
const SceneCtx = React.createContext<SceneState>({ still: false });
export const useScene = () => React.useContext(SceneCtx);

export type Tone = "blue" | "green" | "amber" | "purple";

/** Fixed-size artboard. Replays itself every `loopMs` unless `still`. */
export function Stage({
  tone = "blue",
  width = 1270,
  height = 760,
  still = false,
  loopMs = 9000,
  children,
}: {
  tone?: Tone;
  width?: number;
  height?: number;
  still?: boolean;
  loopMs?: number;
  children: React.ReactNode;
}) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setTick((n) => n + 1), loopMs);
    return () => window.clearInterval(id);
  }, [still, loopMs]);
  return (
    <SceneCtx.Provider value={{ still }}>
      <div
        className={`${css.stage} ${css[`tone_${tone}`]}`}
        style={{ width, height }}
        data-stage
      >
        <span className={`${css.blob} ${css.blobA}`} />
        <span className={`${css.blob} ${css.blobB}`} />
        <React.Fragment key={tick}>{children}</React.Fragment>
      </div>
    </SceneCtx.Provider>
  );
}

type At = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  width?: number;
  rotate?: number;
  z?: number;
};

const FROM = {
  up: { y: 48, opacity: 0 },
  down: { y: -48, opacity: 0 },
  left: { x: -70, opacity: 0 },
  right: { x: 70, opacity: 0 },
  pop: { scale: 0.5, opacity: 0 },
  fade: { opacity: 0 },
};

/** A positioned layer that enters (and optionally idles with a gentle float). */
export function Fx({
  children,
  at,
  delay = 0,
  from = "up",
  float = 0,
  className,
}: {
  children: React.ReactNode;
  at?: At;
  delay?: number;
  from?: keyof typeof FROM;
  float?: number;
  className?: string;
}) {
  const { still } = useScene();
  const pos: React.CSSProperties = at
    ? {
        position: "absolute",
        left: at.left,
        top: at.top,
        right: at.right,
        bottom: at.bottom,
        width: at.width,
        zIndex: at.z,
        rotate: at.rotate ? `${at.rotate}deg` : undefined,
      }
    : {};
  const pop = from === "pop";
  return (
    <motion.div
      className={className}
      style={pos}
      initial={still ? false : FROM[from]}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: pop ? 340 : 160,
        damping: pop ? 15 : 20,
        delay,
      }}
    >
      {float && !still ? (
        <motion.div
          animate={{ y: [0, -float, 0] }}
          transition={{
            duration: 3 + (delay % 1.3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  );
}

/** Counts up through `delaysMs`; returns how many have elapsed (all, when still). */
export function useSteps(delaysMs: number[]) {
  const { still } = useScene();
  const [n, setN] = React.useState(still ? delaysMs.length : 0);
  React.useEffect(() => {
    if (still) return;
    const ids = delaysMs.map((d, i) => window.setTimeout(() => setN(i + 1), d));
    return () => ids.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still]);
  return n;
}

/** The headline block on the left of every image. */
export function Copy({
  kicker,
  title,
  sub,
  children,
  left = 72,
  width = 520,
}: {
  kicker: string;
  title: React.ReactNode;
  sub: string;
  children?: React.ReactNode;
  left?: number;
  width?: number;
}) {
  return (
    <div className={css.copy} style={{ left, width }}>
      <Fx from="up" delay={0.05}>
        <span className={css.kicker}>{kicker}</span>
      </Fx>
      <Fx from="up" delay={0.15}>
        <h2 className={css.title}>{title}</h2>
      </Fx>
      <Fx from="up" delay={0.3}>
        <p className={css.sub}>{sub}</p>
      </Fx>
      {children}
    </div>
  );
}

/** A feature label with its glyph — the "this feature exists" marker. */
export function Callout({
  glyph,
  label,
  at,
  delay = 0.6,
  hue = "var(--color-brand)",
  from = "pop",
  float = 5,
}: {
  glyph: GlyphName;
  label: string;
  at: At;
  delay?: number;
  hue?: string;
  from?: keyof typeof FROM;
  float?: number;
}) {
  return (
    <Fx at={{ ...at, z: at.z ?? 6 }} delay={delay} from={from} float={float}>
      <span className={css.callout}>
        <span className={css.calloutDot} style={{ background: hue }}>
          <Glyph name={glyph} size={20} strokeWidth={3} />
        </span>
        {label}
      </span>
    </Fx>
  );
}

/** A row of small feature pills under the copy. */
export function FeatureRow({
  items,
  delay = 0.6,
}: {
  items: { glyph: GlyphName; label: string; hue?: string }[];
  delay?: number;
}) {
  return (
    <div className={css.featureRow}>
      {items.map((f, i) => (
        <Fx key={f.label} from="pop" delay={delay + i * 0.08}>
          <span className={css.featurePill}>
            <span
              className={css.featureDot}
              style={{ background: f.hue ?? "var(--color-brand)" }}
            >
              <Glyph name={f.glyph} size={15} strokeWidth={3.2} />
            </span>
            {f.label}
          </span>
        </Fx>
      ))}
    </div>
  );
}

/** Teyro's mascot, for the images where he belongs (never on the certificate). */
export function Tey({
  pose,
  at,
  size = 150,
  delay = 1,
}: {
  pose: "cheering" | "waving" | "podium" | "pointing" | "tablet" | "welcome" | "flame" | "bell";
  at: At;
  size?: number;
  delay?: number;
}) {
  return (
    <Fx at={{ ...at, z: at.z ?? 7 }} from="up" delay={delay} float={6}>
      <Image
        src={`/User onbarding Assets/tey/${pose}.webp`}
        alt=""
        width={size}
        height={Math.round(size * 1.16)}
        className={css.tey}
      />
    </Fx>
  );
}

// ─── The phone and what lives inside it ─────────────────────────────────────

export function Phone({
  at,
  scale = 1,
  delay = 0.1,
  children,
}: {
  at: At;
  scale?: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <Fx at={{ ...at, z: at.z ?? 3 }} from="up" delay={delay}>
      <div className={css.phone} style={{ ["--ph" as string]: scale }}>
        <div className={css.screen}>
          <span className={css.notch} />
          {children}
        </div>
      </div>
    </Fx>
  );
}

/** The four marks the app's top bar shows. */
export function Hud({
  streak = 128,
  coins = "2,450",
  xp = "5,380",
  hearts = 5,
}: {
  streak?: number;
  coins?: string;
  xp?: string;
  hearts?: number;
}) {
  return (
    <div className={css.hud}>
      <span className={`${css.hudStat} ${css.hudStreak}`}>
        <Image src="/Icons/burn.png" alt="" width={20} height={20} />
        {streak}
      </span>
      <span className={`${css.hudStat} ${css.hudCoin}`}>
        <Image src="/Icons/Coin.png" alt="" width={20} height={20} />
        {coins}
      </span>
      <span className={`${css.hudStat} ${css.hudXp}`}>
        <Image src="/art/ui/xp-bolt.svg" alt="" width={18} height={18} />
        {xp}
      </span>
      <span className={`${css.hudStat} ${css.hudHeart}`}>
        <Image src="/Icons/heart.png" alt="" width={18} height={18} />
        {hearts}
      </span>
    </div>
  );
}

export function TabBar({ on = 0 }: { on?: number }) {
  const tabs: GlyphName[] = ["house", "trophy", "shield", "users", "user"];
  return (
    <div className={css.tabbar}>
      {tabs.map((g, i) => (
        <span key={g} className={`${css.tab} ${i === on ? css.tabOn : ""}`}>
          <Glyph name={g} size={18} strokeWidth={2.75} />
        </span>
      ))}
    </div>
  );
}

/** A floating stat card: icon, small label, big value. */
export function Chip({
  src,
  label,
  value,
  at,
  delay,
  float = 6,
}: {
  src: string;
  label: string;
  value: string;
  at: At;
  delay: number;
  float?: number;
}) {
  return (
    <Fx at={{ ...at, z: at.z ?? 6 }} from="pop" delay={delay} float={float}>
      <span className={css.chip}>
        <Image src={src} alt="" width={38} height={38} />
        <span>
          <span className={css.chipLabel}>{label}</span>
          <span className={css.chipValue}>{value}</span>
        </span>
      </span>
    </Fx>
  );
}

/** A card shell for the loose panels around the phone. */
export function Card({
  at,
  delay = 0.5,
  from = "up",
  float = 0,
  tilt,
  children,
  className,
}: {
  at: At;
  delay?: number;
  from?: keyof typeof FROM;
  float?: number;
  tilt?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Fx
      at={{ ...at, rotate: tilt, z: at.z ?? 5 }}
      from={from}
      delay={delay}
      float={float}
    >
      <div className={`${css.card} ${className ?? ""}`}>{children}</div>
    </Fx>
  );
}

/** A progress bar that fills when it mounts. */
export function Bar({
  to = 100,
  from = 8,
  delay = 0.4,
  tone = "var(--success-green)",
}: {
  to?: number;
  from?: number;
  delay?: number;
  tone?: string;
}) {
  const { still } = useScene();
  return (
    <span className={css.bar}>
      <motion.span
        className={css.barFill}
        style={{ background: tone }}
        initial={still ? false : { width: `${from}%` }}
        animate={{ width: `${to}%` }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
    </span>
  );
}

export const AVATAR = [
  "var(--color-brand)",
  "var(--brand-purple)",
  "var(--success-green)",
  "var(--warning)",
  "var(--error-red)",
];
