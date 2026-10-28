"use client";

/**
 * The Product Hunt launch gallery: a square thumbnail plus eight 1270x760
 * images in a fixed order (overview → lesson → habit → play → together →
 * everything inside → outcome → next step). Every scene is built from the
 * layers in ./parts, so each piece animates on its own.
 *
 * Facts shown come from lib/seo/facts.ts. Names and numbers are illustrative.
 */

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { Art } from "@/components/art/Art";
import { Glyph } from "@/components/art/Glyph";
import {
  AVATAR,
  Bar,
  Callout,
  Card,
  Chip,
  Copy,
  FeatureRow,
  Fx,
  Hud,
  Phone,
  Stage,
  TabBar,
  Tey,
  useScene,
} from "./parts";
import css from "./launchkit.module.css";

type SceneProps = { still?: boolean };

const AMBER = "var(--warning)";
const GREEN = "var(--success-green)";
const PURPLE = "var(--brand-purple)";
const RED = "var(--error-red)";
const BLUE = "var(--color-brand)";

// ─── Shared screens ─────────────────────────────────────────────────────────

const UNITS = [
  { subject: "Coding", title: "Python functions" },
  { subject: "Money", title: "Build your first budget" },
  { subject: "Leadership", title: "Run a great one-to-one" },
  { subject: "AI", title: "Prompts that save an hour" },
  { subject: "Communication", title: "Speak like a CEO" },
];

function UnitBanner() {
  const { still } = useScene();
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % UNITS.length), 1700);
    return () => window.clearInterval(id);
  }, [still]);
  const u = UNITS[i];
  return (
    <div className={css.unit}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={u.subject}
          style={{ display: "block" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <span className={css.unitNum}>{u.subject} · Unit 3</span>
          <span className={css.unitTitle}>{u.title}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function HomeScreen() {
  return (
    <>
      <Hud />
      <UnitBanner />
      <div className={css.path}>
        <span className={`${css.node} ${css.nodeDone}`} style={{ marginLeft: -40 }}>
          <Glyph name="check" size={26} strokeWidth={4} />
        </span>
        <span className={`${css.node} ${css.nodeDone}`} style={{ marginLeft: 40 }}>
          <Glyph name="check" size={26} strokeWidth={4} />
        </span>
        <span className={`${css.node} ${css.nodeNow}`} style={{ marginTop: 20 }}>
          <span className={css.startTag}>START</span>
          <Glyph name="star" size={30} strokeWidth={2.5} />
        </span>
        <span className={`${css.node} ${css.nodeLocked}`} style={{ marginLeft: -44 }}>
          <Glyph name="lock" size={22} strokeWidth={3} />
        </span>
        <Image src="/art/items/chest-gold.svg" alt="" width={56} height={56} style={{ marginLeft: 30 }} />
      </div>
      <TabBar on={0} />
    </>
  );
}

// ─── Thumbnail (separate asset, 512x512) ────────────────────────────────────

export function Thumbnail({ still }: SceneProps) {
  return (
    <Stage tone="blue" width={512} height={512} still={still} loopMs={6000}>
      <Fx at={{ left: 106, top: 106, z: 3 }} from="pop" delay={0.1} float={8}>
        <Image
          src="/Icons/icon-512.png"
          alt=""
          width={300}
          height={300}
          style={{ borderRadius: 72, boxShadow: "0 40px 60px -30px rgba(7,18,51,.55)" }}
        />
      </Fx>
      <Fx at={{ left: 330, top: 70, z: 5 }} from="pop" delay={0.5} float={6}>
        <span className={css.chip}>
          <Image src="/Icons/burn.png" alt="" width={38} height={38} />
          <span className={css.chipValue}>128</span>
        </span>
      </Fx>
      <Fx at={{ left: 40, top: 380, z: 5 }} from="pop" delay={0.7} float={6}>
        <span className={css.chip}>
          <Image src="/art/ui/xp-bolt.svg" alt="" width={34} height={34} />
          <span className={css.chipValue}>+20 XP</span>
        </span>
      </Fx>
    </Stage>
  );
}

// ─── 1. Overview ────────────────────────────────────────────────────────────

export function S1Overview({ still }: SceneProps) {
  return (
    <Stage tone="blue" still={still}>
      <Copy
        kicker="Meet Teyro"
        title={<>Learn real skills. <em>Actually finish.</em></>}
        sub="Short daily lessons in coding, AI, money and leadership."
      >
        <FeatureRow
          items={[
            { glyph: "flame", label: "Streaks", hue: AMBER },
            { glyph: "trophy", label: "Leagues", hue: PURPLE },
            { glyph: "users", label: "Friends", hue: GREEN },
            { glyph: "verified", label: "Certificates", hue: BLUE },
          ]}
        />
      </Copy>
      <Phone at={{ left: 800, top: 60 }}>
        <HomeScreen />
      </Phone>
      <Chip src="/Icons/burn.png" label="Streak" value="128 days" at={{ left: 596, top: 100 }} delay={0.7} />
      <Chip src="/art/ui/medal-1.svg" label="Diamond League" value="#1 this week" at={{ left: 1030, top: 250 }} delay={1.0} />
      <Chip src="/art/ui/xp-bolt.svg" label="Lesson complete" value="+20 XP" at={{ left: 650, top: 520 }} delay={1.3} />
      <Callout glyph="clock" label="5–20 min a day" at={{ left: 1000, top: 18 }} delay={1.6} hue={GREEN} />
      <Callout glyph="sparkle" label="Free to start" at={{ left: 1000, top: 500 }} delay={1.8} hue={AMBER} />
      <Tey pose="cheering" at={{ left: 1080, top: 560 }} size={150} delay={1.5} />
    </Stage>
  );
}

// ─── 2. The lesson ──────────────────────────────────────────────────────────

const PHASES = [
  { name: "Learn", line: "One idea, explained simply", tone: BLUE },
  { name: "Apply", line: "Use it straight away", tone: GREEN },
  { name: "Reflect", line: "Put it in your own words", tone: PURPLE },
  { name: "Deepen", line: "Go further if you want", tone: AMBER },
];

function LessonTop({ pct }: { pct: number }) {
  return (
    <div className={css.lessonTop}>
      <Glyph name="close" size={22} strokeWidth={3} color="var(--border-strong)" />
      <Bar to={pct} from={Math.max(4, pct - 20)} delay={0.1} />
      <span className={css.hudHeart} style={{ display: "inline-flex", gap: 4, fontWeight: 800 }}>
        <Glyph name="heart" size={18} /> 5
      </span>
    </div>
  );
}

function PhaseScreen({ phase }: { phase: number }) {
  if (phase === 0)
    return (
      <>
        <LessonTop pct={25} />
        <div className={css.lessonBody}>
          <span className={css.lKicker} style={{ color: BLUE }}>Learn</span>
          <p className={css.lQuestion}>A function is a recipe you can reuse.</p>
          <div style={{ display: "grid", placeItems: "center", padding: "6px 0" }}>
            <Art name="bulb" size={120} />
          </div>
          {[92, 100, 70].map((w, i) => (
            <span key={i} style={{ height: 10, width: `${w}%`, borderRadius: 99, background: "var(--border)" }} />
          ))}
        </div>
      </>
    );
  if (phase === 1)
    return (
      <>
        <LessonTop pct={55} />
        <div className={css.lessonBody}>
          <span className={css.lKicker}>Apply</span>
          <p className={css.lQuestion}>Finish the function so it gives back the total:</p>
          <pre className={css.code}>
            <span className={css.kw}>function</span> <span className={css.fnName}>add</span>(a, b) {"{"}
            {"\n"}  <span className={css.blank}>return a + b</span>
            {"\n"}{"}"}
          </pre>
          {["return a + b", "print(a + b)", "a + b = result"].map((c, i) => (
            <Fx key={c} from="pop" delay={0.15 + i * 0.1}>
              <span className={`${css.choice} ${i === 0 ? css.choiceRight : ""}`}>
                <code>{c}</code>
              </span>
            </Fx>
          ))}
          <Fx from="up" delay={0.8} className="">
            <div className={css.correctBar}>
              <span className={css.correctBadge}><Glyph name="check" size={20} strokeWidth={4} /></span>
              <span>Nice! That&apos;s right.<span className={css.correctXp}>+10 XP</span></span>
            </div>
          </Fx>
        </div>
      </>
    );
  if (phase === 2)
    return (
      <>
        <LessonTop pct={80} />
        <div className={css.lessonBody}>
          <span className={css.lKicker} style={{ color: PURPLE }}>Reflect</span>
          <p className={css.lQuestion}>Say it in your own words. Why use a function?</p>
          <div className={css.choice} style={{ minHeight: 120, borderColor: PURPLE, lineHeight: 1.4 }}>
            So I can reuse the same steps without rewriting them every time.
          </div>
          <div style={{ display: "grid", placeItems: "center" }}>
            <Art name="notebook" size={96} />
          </div>
        </div>
      </>
    );
  return (
    <>
      <LessonTop pct={100} />
      <div className={css.lessonBody}>
        <span className={css.lKicker} style={{ color: AMBER }}>Deepen</span>
        <p className={css.lQuestion}>Go further when you&apos;re ready.</p>
        {[{ g: "book", t: "How functions really work" }, { g: "video", t: "Watch: refactor a messy script" }, { g: "puzzle", t: "Bonus challenge" }].map((r, i) => (
          <Fx key={r.t} from="right" delay={0.1 + i * 0.12}>
            <div className={css.choice} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Glyph name={r.g as "book"} size={22} color={AMBER} />
              {r.t}
            </div>
          </Fx>
        ))}
      </div>
    </>
  );
}

export function S2Lesson({ still }: SceneProps) {
  const { still: s } = { still: !!still };
  const n = useStepsLocal(s, [100, 2100, 4100, 6100]);
  const active = s ? 1 : Math.max(0, n - 1);
  return (
    <Stage tone="green" still={still}>
      <Copy
        kicker="The method"
        title={<>Learn it.<br />Use it.<br /><em>Keep it.</em></>}
        sub="Every lesson: learn, apply, reflect, deepen."
        width={470}
      />
      <div style={{ position: "absolute", left: 560, top: 150, width: 330, display: "grid", gap: 14, zIndex: 5 }}>
        {PHASES.map((p, i) => (
          <Fx key={p.name} from="left" delay={0.2 + i * 0.12}>
            <div
              className={`${css.phase} ${i === active ? css.phaseOn : ""}`}
              style={{ ["--pt" as string]: p.tone }}
            >
              <span className={css.phaseNum}>
                {i < active ? <Glyph name="check" size={26} strokeWidth={4} /> : i + 1}
              </span>
              <span>
                <span className={css.phaseName}>{p.name}</span>
                <span className={css.phaseLine}>{p.line}</span>
              </span>
            </div>
          </Fx>
        ))}
      </div>
      <Phone at={{ left: 930, top: 60 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <PhaseScreen phase={active} />
          </motion.div>
        </AnimatePresence>
      </Phone>
      <Callout glyph="heart" label="5 hearts" at={{ left: 840, top: 40 }} delay={0.9} hue={RED} />
      <Callout glyph="bolt" label="+10 XP" at={{ left: 1060, top: 640 }} delay={1.2} hue={BLUE} />
      <Callout glyph="clock" label="Five-minute lessons" at={{ left: 570, top: 650 }} delay={1.5} hue={GREEN} />
    </Stage>
  );
}

/** useSteps needs the scene context, which Stage provides to children only. */
function useStepsLocal(still: boolean, delays: number[]) {
  const [n, setN] = React.useState(still ? delays.length : 0);
  React.useEffect(() => {
    if (still) return;
    const ids = delays.map((d, i) => window.setTimeout(() => setN(i + 1), d));
    return () => ids.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still]);
  return n;
}

// ─── 3. Habit ───────────────────────────────────────────────────────────────

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

function StreakScreen() {
  return (
    <>
      <Hud />
      <div className={css.streakHero}>
        <motion.span
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 10, delay: 0.3 }}
        >
          <Image src="/Icons/burn.png" alt="" width={86} height={86} />
        </motion.span>
        <span>
          <span className={css.streakNum}>128</span>
          <span className={css.streakWord}>day streak!</span>
        </span>
      </div>
      <div className={css.calendar}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className={css.dow}>{d}</span>
        ))}
        <span /><span />
        {DAYS.map((d) => (
          <span
            key={d}
            className={`${css.day} ${d === 11 ? css.dayFreeze : d <= 26 ? css.dayLit : ""} ${d === 26 ? css.dayToday : ""}`}
          >
            {d === 11 ? <Glyph name="snowflake" size={14} strokeWidth={3} /> : d}
          </span>
        ))}
      </div>
      <div className={css.society}>
        <Glyph name="crown" size={20} strokeWidth={2.5} />
        <span><strong>Streak Society</strong> · a freeze saved day 11</span>
      </div>
      <TabBar on={0} />
    </>
  );
}

export function S3Habit({ still }: SceneProps) {
  return (
    <Stage tone="amber" still={still}>
      <Copy
        kicker="The habit"
        title={<>Five minutes. <em>Every day.</em></>}
        sub="Streaks, freezes and gentle reminders keep you going."
        width={440}
      />
      <Phone at={{ left: 860, top: 60 }}>
        <StreakScreen />
      </Phone>
      <Card at={{ left: 510, top: 90, width: 320 }} delay={0.6} from="left" float={5}>
        <span className={css.cardTitle}>Pick your daily goal</span>
        <div className={css.goalRow}>
          {[["5", "min"], ["10", "min"], ["15", "min"], ["20", "min"]].map(([m, u], i) => (
            <div key={m} className={`${css.goal} ${i === 1 ? css.goalOn : ""}`}>
              {m}<small>{u}</small>
            </div>
          ))}
        </div>
      </Card>
      <Card at={{ left: 940, top: 24, width: 310 }} delay={1.1} from="down" float={6} tilt={2}>
        <div className={css.notif}>
          <Image src="/Icons/icon-192.png" alt="" width={52} height={52} className={css.notifIcon} />
          <span>
            <span className={css.notifApp}>Teyro · now</span>
            <span className={css.notifTitle}>Keep your 128-day streak alive!</span>
            <span className={css.notifBody}>One quick lesson is all it takes.</span>
          </span>
        </div>
      </Card>
      <Card at={{ left: 560, top: 500, width: 290 }} delay={1.5} from="up" float={5} tilt={-3}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/art/items/freeze.svg" alt="" width={64} height={64} />
          <span style={{ fontWeight: 800, fontSize: 19, lineHeight: 1.2 }}>
            Streak freeze
            <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--color-ink-soft)" }}>
              Busy day? Your streak stays safe.
            </span>
          </span>
        </div>
      </Card>
      <Callout glyph="refresh" label="48-hour repair window" at={{ left: 940, top: 640 }} delay={1.9} hue={BLUE} />
      <Tey pose="flame" at={{ left: 1110, top: 400 }} size={130} delay={2.0} />
    </Stage>
  );
}

// ─── 4. Play ────────────────────────────────────────────────────────────────

const START = [
  { name: "Kemi A.", xp: 1180 },
  { name: "Daniel O.", xp: 1065 },
  { name: "Priya S.", xp: 940 },
  { name: "You", xp: 905, me: true },
  { name: "Tunde B.", xp: 880 },
];

function LeagueScreen({ climbed }: { climbed: boolean }) {
  const rows = React.useMemo(
    () =>
      START.map((r) => (r.me && climbed ? { ...r, xp: 1240 } : r)).sort((a, b) => b.xp - a.xp),
    [climbed],
  );
  return (
    <>
      <Hud />
      <div className={css.leagueHead}>
        <Image src="/art/ui/medal-1.svg" alt="" width={52} height={52} />
        <span>
          <span className={css.leagueName}>Diamond League</span>
          <span className={css.leagueSub}>Weekly · real learners, no bots</span>
        </span>
      </div>
      <ol className={css.board}>
        {rows.map((r, i) => (
          <motion.li
            key={r.name}
            layout
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={`${css.row} ${r.me ? css.rowMe : ""}`}
          >
            <span className={css.rank}>
              {i < 3 ? <Image src={`/art/ui/medal-${i + 1}.svg`} alt="" width={26} height={26} /> : i + 1}
            </span>
            <span className={css.avatar} style={{ background: r.me ? BLUE : AVATAR[(START.indexOf(r) + 1) % AVATAR.length] }}>
              {r.name.charAt(0)}
            </span>
            <span className={css.rowName}>{r.name}</span>
            <span className={css.rowXp}>{r.xp.toLocaleString()} XP</span>
          </motion.li>
        ))}
      </ol>
      <div className={css.zone}>Promotion zone</div>
      <TabBar on={1} />
    </>
  );
}

const TIERS = [
  { n: "Bronze", c: "color-mix(in srgb, var(--warning) 55%, var(--error-red))" },
  { n: "Silver", c: "var(--border-strong)" },
  { n: "Gold", c: AMBER },
  { n: "Diamond", c: BLUE },
];

export function S4Play({ still }: SceneProps) {
  const n = useStepsLocal(!!still, [2200, 3400]);
  return (
    <Stage tone="purple" still={still}>
      <Copy
        kicker="The game"
        title={<>Compete with <em>real learners.</em></>}
        sub="Weekly leagues, daily quests and rewards you actually earn."
        width={470}
      />
      <Phone at={{ left: 860, top: 60 }}>
        <LeagueScreen climbed={n >= 1} />
      </Phone>
      <Card at={{ left: 510, top: 70, width: 320 }} delay={0.5} from="left" float={5}>
        <span className={css.cardTitle}>Daily quests</span>
        {[["Earn 50 XP", 100], ["Finish 3 lessons", 100], ["Get 20 right", 100]].map(([l, p], i) => (
          <div key={l as string} className={css.quest}>
            <span className={css.questText}>
              {l}
              <Bar to={p as number} delay={0.8 + i * 0.3} />
            </span>
            <Image src="/art/items/chest-gold.svg" alt="" width={38} height={38} />
          </div>
        ))}
      </Card>
      <Card at={{ left: 1030, top: 400, width: 230 }} delay={1.0} from="right" float={6} tilt={3}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <motion.span
            animate={n >= 2 || still ? { scale: [1, 1.25, 1], rotate: [0, -10, 8, 0] } : {}}
            transition={{ duration: 0.6 }}
          >
            <Image src="/art/items/chest-gold.svg" alt="" width={76} height={76} />
          </motion.span>
          <span style={{ display: "grid", gap: 6 }}>
            <span className={css.pill}>
              <Image src="/Icons/Coin.png" alt="" width={24} height={24} /> +50
            </span>
            <span className={`${css.pill} ${css.pillBlue}`}>
              <Image src="/art/ui/level-hex.svg" alt="" width={24} height={24} /> Lvl 14
            </span>
          </span>
        </div>
      </Card>
      <Card at={{ left: 560, top: 440, width: 280 }} delay={1.4} from="up" float={5} tilt={-2}>
        <span className={css.cardTitle}>Climb the tiers</span>
        <div className={css.tiers}>
          {TIERS.map((t, i) => (
            <span key={t.n} className={`${css.tier} ${i === 3 ? css.tierOn : ""}`}>
              <Glyph name="shield" size={34} strokeWidth={2.5} color={t.c} />
              {t.n}
            </span>
          ))}
        </div>
      </Card>
      <Callout glyph="coinDollar" label="Spend coins in the shop" at={{ left: 560, top: 650 }} delay={1.8} hue={AMBER} />
      <Callout glyph="trophy" label="#1 this week" at={{ left: 1010, top: 40 }} delay={2.2} hue={PURPLE} />
    </Stage>
  );
}

// ─── 5. Together ────────────────────────────────────────────────────────────

const FRIENDS = [
  { name: "Kemi", streak: 64, note: "finished Unit 4" },
  { name: "Daniel", streak: 31, note: "on a 7-lesson day" },
  { name: "Priya", streak: 22, note: "joined your course" },
];

function PostCard({ who, body, likes, comments, art, delay }: { who: string; body: string; likes: number; comments: number; art: string; delay: number }) {
  return (
    <Fx from="up" delay={delay}>
      <div className={css.card} style={{ padding: 14, borderRadius: 18 }}>
        <span className={css.postHead}>
          <Image src={art} alt="" width={34} height={34} />
          <span>
            {who}
            <span className={css.postMeta}>JavaScript Foundations community</span>
          </span>
        </span>
        <p className={css.postBody} style={{ fontSize: 15 }}>{body}</p>
        <span className={css.postStats} style={{ fontSize: 13 }}>
          <span><Image src="/art/ui/like.svg" alt="" width={18} height={18} /> {likes}</span>
          <span><Glyph name="bubble" size={16} strokeWidth={2.5} /> {comments}</span>
        </span>
      </div>
    </Fx>
  );
}

export function S5Together({ still }: SceneProps) {
  return (
    <Stage tone="blue" still={still}>
      <Copy
        kicker="Together"
        title={<>Learn with<br />your <em>classmates.</em></>}
        sub="Every course has a community. Cheer, share wins, stay on track."
        width={470}
      />
      <Phone at={{ left: 860, top: 60 }}>
        <Hud />
        <div style={{ padding: "12px 12px 0", display: "grid", gap: 10 }}>
          <span className={css.cardTitle} style={{ margin: 0 }}>Course community</span>
          <PostCard who="Kemi shared a win" body="Finished Unit 4 with a 64-day streak!" likes={18} comments={5} art="/art/posts/WIN.svg" delay={0.4} />
          <PostCard who="You shared a win" body="Built my first to-do app today!" likes={24} comments={8} art="/art/posts/WIN.svg" delay={0.8} />
        </div>
        <TabBar on={3} />
      </Phone>
      <Card at={{ left: 510, top: 90, width: 320 }} delay={0.7} from="left" float={5}>
        <span className={css.cardTitle}>Friends</span>
        {FRIENDS.map((f, i) => (
          <div key={f.name} className={css.friend}>
            <span className={css.avatar} style={{ background: AVATAR[(i + 1) % AVATAR.length] }}>{f.name.charAt(0)}</span>
            <span className={css.friendText}>{f.name}<span>{f.note}</span></span>
            <span className={css.friendStreak}>
              <Glyph name="flame" size={16} strokeWidth={2.75} /> {f.streak}
            </span>
          </div>
        ))}
      </Card>
      <Card at={{ left: 1000, top: 24, width: 250 }} delay={1.4} from="right" float={6} tilt={3}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className={css.avatar} style={{ background: AVATAR[1] }}>K</span>
          <span style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.2 }}>
            Kemi cheered you
            <span className={css.cheerTag} style={{ display: "inline-block", marginLeft: 0, marginTop: 4 }}>+1 cheer</span>
          </span>
        </div>
      </Card>
      <Callout glyph="users" label="Join after lesson 2" at={{ left: 560, top: 500 }} delay={1.7} hue={BLUE} />
      <Callout glyph="userPlus" label="Add friends" at={{ left: 590, top: 580 }} delay={1.9} hue={GREEN} />
      <Tey pose="pointing" at={{ left: 1130, top: 580 }} size={120} delay={2.1} />
    </Stage>
  );
}

// ─── 6. Everything inside ───────────────────────────────────────────────────

const INSIDE_L = [
  { glyph: "heart", label: "5 hearts", hue: RED, at: { left: 90, top: 250 } },
  { glyph: "snowflake", label: "Streak freezes", hue: BLUE, at: { left: 40, top: 340 } },
  { glyph: "target", label: "Daily quests", hue: GREEN, at: { left: 110, top: 430 } },
  { glyph: "coinDollar", label: "Coins & shop", hue: AMBER, at: { left: 50, top: 520 } },
] as const;
const INSIDE_R = [
  { glyph: "trophy", label: "Weekly leagues", hue: PURPLE, at: { left: 930, top: 240 } },
  { glyph: "bell", label: "Smart reminders", hue: AMBER, at: { left: 990, top: 330 } },
  { glyph: "wifi", label: "Works offline", hue: GREEN, at: { left: 940, top: 420 } },
  { glyph: "verified", label: "Certificates", hue: BLUE, at: { left: 990, top: 510 } },
  { glyph: "close", label: "No ads", hue: RED, at: { left: 960, top: 600 } },
] as const;

export function S6Everything({ still }: SceneProps) {
  return (
    <Stage tone="green" still={still}>
      <div className={css.centerTitle}>
        <Fx from="up" delay={0.05}><span className={css.kicker}>Everything inside</span></Fx>
        <Fx from="up" delay={0.15}>
          <h2 className={css.title}>All the tools to <em>stay</em> the course.</h2>
        </Fx>
      </div>
      <Phone at={{ left: 484, top: 215 }} scale={0.88}>
        <HomeScreen />
      </Phone>
      {[...INSIDE_L, ...INSIDE_R].map((c, i) => (
        <Callout
          key={c.label}
          glyph={c.glyph}
          label={c.label}
          hue={c.hue}
          at={c.at}
          delay={0.5 + i * 0.14}
          from={i < INSIDE_L.length ? "left" : "right"}
          float={4}
        />
      ))}
    </Stage>
  );
}

// ─── 7. Outcome ─────────────────────────────────────────────────────────────

const CONFETTI = [
  [120, 40, BLUE], [260, 20, AMBER], [420, 60, PURPLE], [560, 10, GREEN],
  [700, 50, RED], [860, 20, BLUE], [1000, 60, AMBER], [1120, 30, PURPLE],
  [180, 90, GREEN], [640, 90, AMBER], [940, 100, GREEN], [1200, 80, BLUE],
] as const;

function Confetti() {
  const { still } = useScene();
  return (
    <>
      {CONFETTI.map(([x, y, c], i) => (
        <motion.span
          key={i}
          className={css.confetti}
          style={{ left: x, top: y, background: c, rotate: i * 37 }}
          initial={still ? false : { y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 9, delay: 1.1 + i * 0.05 }}
        />
      ))}
    </>
  );
}

export function S7Outcome({ still }: SceneProps) {
  return (
    <Stage tone="amber" still={still}>
      <Copy
        kicker="The result"
        title={<>Finish. <em>Get certified.</em></>}
        sub="A verifiable certificate for every course you complete."
        width={440}
      />
      <Phone at={{ left: 940, top: 60 }}>
        <Hud />
        <div className={css.ring}>
          <svg width="150" height="150" viewBox="0 0 150 150" style={{ position: "absolute", transform: "rotate(-90deg)" }}>
            <circle cx="75" cy="75" r="62" fill="none" stroke="var(--border)" strokeWidth="16" />
            <motion.circle
              cx="75" cy="75" r="62" fill="none" stroke={GREEN} strokeWidth="16" strokeLinecap="round"
              strokeDasharray={390}
              initial={{ strokeDashoffset: 390 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
          <span className={css.ringNum}>100%</span>
        </div>
        <div className={css.completeTitle}>Course complete!</div>
        <div className={css.completeSub}>Python for Beginners</div>
        <div className={css.miniPath}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Fx key={i} from="pop" delay={1 + i * 0.1}>
              <span className={css.miniNode}><Glyph name="check" size={16} strokeWidth={4} /></span>
            </Fx>
          ))}
        </div>
        <TabBar on={0} />
      </Phone>
      <Card at={{ left: 510, top: 150, width: 400 }} delay={0.7} from="left" float={5} tilt={-3} className="">
        <div className={css.cert}>
          <span className={css.certKicker}>Certificate of completion</span>
          <div className={css.certName}>Alex Morgan</div>
          <div className={css.certLine}>has completed</div>
          <div className={css.certCourse}>Python for Beginners</div>
          <span className={css.certVerify}>
            <Glyph name="verified" size={18} strokeWidth={3} /> Verified · teyro.app/c/AX7K2Q
          </span>
        </div>
      </Card>
      <Fx at={{ left: 560, top: 540, z: 6 }} from="up" delay={1.5} float={5}>
        <span className={css.liBtn}>
          <FaLinkedin size={24} /> Add to LinkedIn
        </span>
      </Fx>
      <Callout glyph="link" label="Anyone can verify it" at={{ left: 700, top: 650 }} delay={2.0} hue={GREEN} />
      <Confetti />
    </Stage>
  );
}

// ─── 8. Next step ───────────────────────────────────────────────────────────

export function S8Start({ still }: SceneProps) {
  const slots = Array.from({ length: 12 });
  return (
    <Stage tone="green" still={still}>
      <Copy
        kicker="Get started"
        title={<>Free to start. <em>No app store.</em></>}
        sub="Open it in your browser and add it to your Home Screen in one tap."
        width={500}
      >
        <FeatureRow
          items={[
            { glyph: "sparkle", label: "Free to start", hue: AMBER },
            { glyph: "gift", label: "7-day Pro trial", hue: PURPLE },
            { glyph: "wifi", label: "Works offline", hue: GREEN },
          ]}
        />
        <Fx from="up" delay={1.2}>
          <span className={css.cta} style={{ marginTop: 10 }}>
            teyro.app <Glyph name="arrow" size={28} strokeWidth={3.5} />
          </span>
        </Fx>
      </Copy>
      <Phone at={{ left: 800, top: 60 }}>
        <div className={css.appGrid}>
          {slots.map((_, i) =>
            i === 5 ? (
              <span key={i} className={css.appSlot}>
                <Fx from="down" delay={0.9}>
                  <span className={css.teyroApp}>
                    <Image src="/Icons/icon-192.png" alt="" width={52} height={52} />
                  </span>
                </Fx>
                <span className={css.appName}>Teyro</span>
              </span>
            ) : (
              <span key={i} className={css.appSlot}>
                <span className={css.blankApp} style={{ opacity: 0.55 + ((i * 7) % 5) * 0.09 }} />
                <span className={css.blankName} />
              </span>
            ),
          )}
        </div>
        <div className={css.dock}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={css.blankApp} />
          ))}
        </div>
      </Phone>
      <Callout glyph="install" label="Add to Home Screen" at={{ left: 930, top: 410 }} delay={1.3} hue={BLUE} />
      <Callout glyph="phone" label="iPhone & Android" at={{ left: 1000, top: 560 }} delay={1.6} hue={GREEN} />
      <Tey pose="waving" at={{ left: 1090, top: 130 }} size={140} delay={1.8} />
    </Stage>
  );
}

// ─── The set, in gallery order ──────────────────────────────────────────────

export const LAUNCH_SCENES = [
  { id: "thumb", title: "Thumbnail", w: 512, h: 512, C: Thumbnail },
  { id: "1-overview", title: "1 · Overview", w: 1270, h: 760, C: S1Overview },
  { id: "2-lesson", title: "2 · The lesson", w: 1270, h: 760, C: S2Lesson },
  { id: "3-habit", title: "3 · The habit", w: 1270, h: 760, C: S3Habit },
  { id: "4-play", title: "4 · The game", w: 1270, h: 760, C: S4Play },
  { id: "5-together", title: "5 · Together", w: 1270, h: 760, C: S5Together },
  { id: "6-everything", title: "6 · Everything inside", w: 1270, h: 760, C: S6Everything },
  { id: "7-outcome", title: "7 · The result", w: 1270, h: 760, C: S7Outcome },
  { id: "8-start", title: "8 · Get started", w: 1270, h: 760, C: S8Start },
] as const;
