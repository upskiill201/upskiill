"use client";

/**
 * Homepage visuals — drawn from the real app (the path, the lesson player,
 * the streak screen, the league board, friends, quests, reminders), each
 * showing someone *succeeding* with Teyro: a long streak, #1 in the league,
 * a correct answer, a finished quest set. Illustrative data; every feature
 * shown ships today.
 */

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bell,
  Check,
  Crown,
  Flame,
  Heart,
  Home,
  Lock,
  MessageCircle,
  Shield,
  Snowflake,
  Star,
  Trophy,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { HomeScreenMock } from "@/components/start/HomeScreenMock";
import { NotificationPreview } from "@/components/push/NotificationPreview";
import s from "./Home.module.css";
import v from "./Visuals.module.css";

/** Avatar colours, from the palette tokens. */
const AVATAR = [
  "var(--color-brand)",
  "var(--brand-purple)",
  "var(--success-green)",
  "var(--warning)",
  "var(--error-red)",
];

/** Fades and rises into view once. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 160, damping: 22, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Pops in (for chips, medals, rows). */
export function Pop({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 380, damping: 16, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero: the app's home path, mid-course ──────────────────────────────────

/** `bare`: just the phone — no floating cards, no Tey (pitch-deck export). */
export function HeroPhone({ bare = false }: { bare?: boolean }) {
  return (
    <div className={s.heroVisual}>
      {!bare && (
        <>
          <Pop delay={0.5} className={`${s.float} ${s.floatStreak}`}>
            <Image src="/Icons/burn.png" alt="" width={36} height={36} />
            <span>
              <span className={s.floatLabel}>Streak</span>
              <span className={s.floatValue}>128 days</span>
            </span>
          </Pop>
          <Pop delay={0.8} className={`${s.float} ${s.floatLeague}`}>
            <Image src="/art/ui/medal-1.svg" alt="" width={36} height={36} />
            <span>
              <span className={s.floatLabel}>Diamond League</span>
              <span className={s.floatValue}>#1 this week</span>
            </span>
          </Pop>
          <Pop delay={1.1} className={`${s.float} ${s.floatXp}`}>
            <Image src="/art/ui/xp-bolt.svg" alt="" width={32} height={32} />
            <span>
              <span className={s.floatLabel}>Lesson complete</span>
              <span className={s.floatValue}>+20 XP</span>
            </span>
          </Pop>
        </>
      )}

      <div className={s.phone} aria-hidden="true">
        <div className={s.screen}>
          <span className={s.notch} />
          <div className={s.hud}>
            <span className={`${s.hudStat} ${s.hudStreak}`}>
              <Image src="/Icons/burn.png" alt="" width={20} height={20} />
              128
            </span>
            <span className={`${s.hudStat} ${s.hudCoin}`}>
              <Image src="/Icons/Coin.png" alt="" width={20} height={20} />
              2,450
            </span>
            <span className={`${s.hudStat} ${s.hudXp}`}>
              <Image src="/art/ui/xp-bolt.svg" alt="" width={18} height={18} />
              5,380
            </span>
            <span className={`${s.hudStat} ${s.hudHeart}`}>
              <Image src="/Icons/heart.png" alt="" width={18} height={18} />5
            </span>
          </div>
          <div className={s.unit}>
            <span className={s.unitNum}>Section 2 · Unit 3</span>
            <span className={s.unitTitle}>JavaScript functions</span>
          </div>
          <div className={s.path}>
            <span
              className={`${s.node} ${s.nodeDone}`}
              style={{ marginLeft: -40 }}
            >
              <Check size={26} strokeWidth={4} />
            </span>
            <span
              className={`${s.node} ${s.nodeDone}`}
              style={{ marginLeft: 40 }}
            >
              <Check size={26} strokeWidth={4} />
            </span>
            <span
              className={`${s.node} ${s.nodeNow}`}
              style={{ marginTop: 34 }}
            >
              <span className={s.startTag}>START</span>
              <Star size={28} strokeWidth={2.5} fill="currentColor" />
            </span>
            <span
              className={`${s.node} ${s.nodeLocked}`}
              style={{ marginLeft: -44 }}
            >
              <Lock size={22} strokeWidth={3} />
            </span>
            <Image
              src="/art/items/chest-gold.svg"
              alt=""
              width={56}
              height={56}
              style={{ marginLeft: 30 }}
            />
          </div>
          <div className={s.tabbar}>
            <span className={`${s.tab} ${s.tabOn}`}>
              <Home size={18} strokeWidth={2.75} />
            </span>
            <span className={s.tab}>
              <Trophy size={18} strokeWidth={2.75} />
            </span>
            <span className={s.tab}>
              <Shield size={18} strokeWidth={2.75} />
            </span>
            <span className={s.tab}>
              <Users size={18} strokeWidth={2.75} />
            </span>
            <span className={s.tab}>
              <UserRound size={18} strokeWidth={2.75} />
            </span>
          </div>
        </div>
      </div>

      {!bare && (
        <Image
          src="/User onbarding Assets/tey/cheering.webp"
          alt=""
          width={150}
          height={174}
          className={s.heroTey}
          priority
        />
      )}
    </div>
  );
}

// ─── Lesson: a coding question, answered right ──────────────────────────────

const CHOICES = ["return a + b", "print(a + b)", "a + b = result"];

export function LessonVisual() {
  return (
    <div className={`${s.card} ${v.lesson}`} aria-hidden="true">
      <div className={v.lessonTop}>
        <X size={22} strokeWidth={3} className={v.muted} />
        <span className={v.bar}>
          <motion.span
            className={v.barFill}
            initial={{ width: "30%" }}
            whileInView={{ width: "72%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </span>
        <span className={v.hearts}>
          <Heart size={18} fill="currentColor" strokeWidth={0} /> 5
        </span>
      </div>
      <span className={v.kicker}>Apply</span>
      <p className={v.question}>
        Finish the function so it gives back the total:
      </p>
      <pre className={v.code}>
        <span className={v.kw}>function</span> <span className={v.fn}>add</span>
        (a, b) {"{"}
        {"\n"} <span className={v.blank}>return a + b</span>
        {"\n"}
        {"}"}
      </pre>
      <div className={v.choices}>
        {CHOICES.map((c, i) => (
          <Pop
            key={c}
            delay={0.2 + i * 0.1}
            className={`${v.choice} ${i === 0 ? v.choiceRight : ""}`}
          >
            <code>{c}</code>
          </Pop>
        ))}
      </div>
      <Pop delay={0.9} className={v.correct}>
        <span className={v.correctBadge}>
          <Check size={22} strokeWidth={4} />
        </span>
        <span>
          <strong>Nice! That&apos;s right.</strong>
          <span className={v.correctXp}>+10 XP</span>
        </span>
      </Pop>
    </div>
  );
}

// ─── Method: Learn → Apply → Reflect → Deepen ───────────────────────────────

const PHASES = [
  { name: "Learn", line: "One idea, explained simply", tone: v.pBlue },
  { name: "Apply", line: "Use it right away", tone: v.pGreen },
  { name: "Reflect", line: "Put it in your own words", tone: v.pPurple },
  { name: "Deepen", line: "Go further when you want", tone: v.pOrange },
];

export function MethodVisual() {
  return (
    <div className={`${s.card} ${v.method}`} aria-hidden="true">
      {PHASES.map((p, i) => (
        <Pop
          key={p.name}
          delay={0.15 + i * 0.15}
          className={`${v.phase} ${p.tone}`}
        >
          <span className={v.phaseNum}>
            {i < 3 ? <Check size={20} strokeWidth={4} /> : i + 1}
          </span>
          <span>
            <strong>{p.name}</strong>
            <span className={v.phaseLine}>{p.line}</span>
          </span>
        </Pop>
      ))}
    </div>
  );
}

// ─── Streak: 128 days, with a freeze that saved it ──────────────────────────

const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const FREEZE_DAY = 11;
const TODAY = 26;

export function StreakVisual() {
  return (
    <div className={`${s.card} ${v.streak}`} aria-hidden="true">
      <div className={v.streakHero}>
        <motion.span
          className={v.flame}
          initial={{ scale: 0.6, rotate: -8 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            delay: 0.2,
          }}
        >
          <Image src="/Icons/burn.png" alt="" width={84} height={84} />
        </motion.span>
        <span>
          <span className={v.streakNum}>128</span>
          <span className={v.streakWord}>day streak!</span>
        </span>
      </div>
      <div className={v.calendar}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className={v.dow}>
            {d}
          </span>
        ))}
        <span />
        <span />
        {DAYS.map((d) => (
          <span
            key={d}
            className={`${v.day} ${d === FREEZE_DAY ? v.dayFreeze : d <= TODAY ? v.dayLit : ""} ${d === TODAY ? v.dayToday : ""}`}
          >
            {d === FREEZE_DAY ? <Snowflake size={14} strokeWidth={3} /> : d}
          </span>
        ))}
      </div>
      <div className={v.society}>
        <Crown size={22} strokeWidth={2.5} />
        <span>
          <strong>Streak Society</strong> · a freeze saved day 11
        </span>
      </div>
    </div>
  );
}

// ─── League: #1 in Diamond ──────────────────────────────────────────────────

const BOARD = [
  { name: "You", xp: 1240, me: true },
  { name: "Kemi A.", xp: 1180 },
  { name: "Daniel O.", xp: 1065 },
  { name: "Priya S.", xp: 940 },
  { name: "Tunde B.", xp: 905 },
];

export function LeagueVisual() {
  return (
    <div className={`${s.card} ${v.league}`} aria-hidden="true">
      <div className={v.leagueHead}>
        <Image src="/art/ui/medal-1.svg" alt="" width={52} height={52} />
        <span>
          <strong className={v.leagueName}>Diamond League</strong>
          <span className={v.leagueSub}>
            Top 10 reach the Tournament · 2 days left
          </span>
        </span>
      </div>
      <ol className={v.board}>
        {BOARD.map((r, i) => (
          <Pop
            key={r.name}
            delay={0.1 + i * 0.09}
            className={`${v.row} ${r.me ? v.rowMe : ""}`}
          >
            <span className={v.rank}>
              {i < 3 ? (
                <Image
                  src={`/art/ui/medal-${i + 1}.svg`}
                  alt=""
                  width={28}
                  height={28}
                />
              ) : (
                i + 1
              )}
            </span>
            <span
              className={v.avatar}
              style={{ background: AVATAR[i % AVATAR.length] }}
            >
              {r.name.charAt(0)}
            </span>
            <span className={v.rowName}>{r.name}</span>
            <span className={v.rowXp}>{r.xp.toLocaleString()} XP</span>
          </Pop>
        ))}
      </ol>
      <div className={v.zone}>Promotion zone</div>
    </div>
  );
}

// ─── Friends: streaks side by side, cheers on your wins ─────────────────────

const FRIENDS = [
  { name: "Kemi", streak: 64, note: "finished Unit 4" },
  { name: "Daniel", streak: 31, note: "on a 7-lesson day" },
  { name: "Priya", streak: 22, note: "joined your league" },
];

export function FriendsVisual() {
  return (
    <div className={v.friendsStack} aria-hidden="true">
      <div className={`${s.card} ${v.friends}`}>
        <strong className={v.cardTitle}>Friends</strong>
        {FRIENDS.map((f, i) => (
          <Pop key={f.name} delay={0.1 + i * 0.1} className={v.friend}>
            <span
              className={v.avatar}
              style={{ background: AVATAR[(i + 1) % AVATAR.length] }}
            >
              {f.name.charAt(0)}
            </span>
            <span className={v.friendText}>
              <strong>{f.name}</strong>
              <span>{f.note}</span>
            </span>
            <span className={v.friendStreak}>
              <Flame size={16} strokeWidth={2.75} fill="currentColor" />{" "}
              {f.streak}
            </span>
          </Pop>
        ))}
      </div>
      <Pop delay={0.55} className={`${s.card} ${v.post}`}>
        <span className={v.postHead}>
          <Image src="/art/posts/WIN.svg" alt="" width={36} height={36} />
          <span>
            <strong>You shared a win</strong>
            <span className={v.postMeta}>JavaScript Foundations community</span>
          </span>
        </span>
        <p className={v.postBody}>Built my first to-do app today!</p>
        <span className={v.postStats}>
          <span className={v.liked}>
            <Image src="/art/ui/like.svg" alt="" width={20} height={20} /> 24
          </span>
          <span>
            <MessageCircle size={18} strokeWidth={2.5} /> 8
          </span>
          <span className={v.cheer}>Kemi cheered you on</span>
        </span>
      </Pop>
    </div>
  );
}

// ─── Rewards: today's quests done, a chest open, a level up ─────────────────

const QUESTS = [
  { label: "Earn 50 XP", done: 50, target: 50 },
  { label: "Finish 3 lessons", done: 3, target: 3 },
  { label: "Get 20 answers right", done: 20, target: 20 },
];

export function RewardsVisual() {
  return (
    <div className={`${s.card} ${v.rewards}`} aria-hidden="true">
      <strong className={v.cardTitle}>Daily quests</strong>
      {QUESTS.map((q, i) => (
        <div key={q.label} className={v.quest}>
          <span className={v.questText}>
            <strong>{q.label}</strong>
            <span className={v.questBar}>
              <motion.span
                className={v.questFill}
                initial={{ width: "10%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
              />
              <span className={v.questCount}>
                {q.done} / {q.target}
              </span>
            </span>
          </span>
          <Image
            src="/art/items/chest-gold.svg"
            alt=""
            width={40}
            height={40}
          />
        </div>
      ))}
      <div className={v.rewardRow}>
        <Pop delay={0.9} className={v.rewardPill}>
          <Image src="/Icons/Coin.png" alt="" width={26} height={26} /> +50
          coins
        </Pop>
        <Pop delay={1.05} className={`${v.rewardPill} ${v.levelPill}`}>
          <Image src="/art/ui/level-hex.svg" alt="" width={26} height={26} />{" "}
          Level 14
        </Pop>
      </div>
    </div>
  );
}

// ─── Reminders: on your Home Screen, nudging at the right time ──────────────

export function RemindersVisual() {
  return (
    <div className={v.reminders} aria-hidden="true">
      <HomeScreenMock />
      <div className={v.notif}>
        <NotificationPreview
          title="Keep your 128-day streak alive!"
          body="One quick lesson is all it takes. I saved your spot."
          delay={0.8}
        />
      </div>
      <Pop delay={1.2} className={v.bell}>
        <Bell size={22} strokeWidth={2.75} />
      </Pop>
    </div>
  );
}
