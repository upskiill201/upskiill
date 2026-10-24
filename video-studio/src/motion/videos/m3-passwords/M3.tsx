import React from 'react';
import { AbsoluteFill, Easing } from 'remotion';
import { Cpu, Database, FileText, KeyRound, ListOrdered, Mail, ShieldCheck, Skull } from 'lucide-react';
import {
  At, Backdrop, Badge, BigText, Captions, ChapterCard, Checklist, Footnote, Host, HudMeter, LoopBack, MotionProvider, Recap, SfxCue,
  SoundLayer, Split, Strike, Tag, TeyroBridge, TeyroOutro, TitleCard, Ticker, TypeLine, VO, World, camAt, cue, fmt, life, line,
  loadMotionFonts, pop, prog, revealCues, rnd, ticks, useMotion, Z, FONT, LOOKS,
} from '../../kit';
import voJson from './vo.json';

const vo = voJson as VO;
const SLUG = 'm3-passwords';
const LB = LOOKS.lab;
export const M3_DURATION = Math.ceil((vo.duration + 0.25) * 30);

/* ───────────── timing helpers ───────────── */
const L = (id: string) => line(vo, id);
const c = (w: string, after?: string | number, n = 1) => cue(vo, w, { n, after: typeof after === 'string' ? L(after).start : after });
const S = (id: string) => L(id).start;
const OY = 1240;
const SX = 700;
const SIDE = (z: number, cx = 0) => cx - (Z.sideCx - 540) / z;

/* real SHA-256 values (computed 2026-10-09), shown truncated */
const HASH = {
  pssw: 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342',
  password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
  n123456: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
  aaaa: '61be55a8e2f6b4e172338bddf184d6dbee29c98853e0a0485ecee7f27b9af0b4',
  saltAda: 'a9265710f733f48c3cd8cfcc1e66c3c44ed69afaf42c4be9bc2e184b64fc1cb9',
  saltTunde: '74b3f464197d2a634d8aa8c70c3cc04da4c611c1f00eb43e81727c7ea2f94678',
  saltKemi: '296fd1c518fd2fd53691180123c6f1defb4b38a2520cad55050980bb2e990703',
  saltFemi: 'ecc0d18cd75e6503980bd31e6273bb039dab013bd1f767c53f8b8c9badccd3ba',
};
const short = (h: string, n = 16) => `${h.slice(0, n)}…`;

/* world stations, left → right: the password's journey */
const X_LOGIN = 0, X_BLEND = 900, X_DB = 1800, X_GPU = 2700;
const WORLD_AT = c('follow', 'h3');
const AWAY = c('away', 'c1a');
const SALT_AT = c('salt', 'c5c');
const SLOW_AT = c('bcrypt', 'c6b');

/* ───────────── small parts ───────────── */
const Field: React.FC<{ text: string; w?: number; size?: number; mono?: boolean; tone?: 'normal' | 'problem' | 'good'; caret?: boolean; label?: string }> = ({ text, w = 460, size = 34, mono = true, tone = 'normal', caret, label }) => {
  const { look, t } = useMotion();
  const edge = tone === 'problem' ? look.problem : tone === 'good' ? look.good : look.accent;
  return (
    <div style={{ width: w }}>
      {label && <div style={{ fontFamily: FONT.mono, fontSize: 17, fontWeight: 700, letterSpacing: '0.1em', color: look.inkSoft, marginBottom: 6 }}>{label}</div>}
      <div style={{ height: size * 1.9, borderRadius: 14, border: `2.5px solid ${edge}`, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 18px', boxSizing: 'border-box', fontFamily: mono ? FONT.mono : FONT.sans, fontWeight: 700, fontSize: size, color: look.ink, whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {text}{caret && <span style={{ display: 'inline-block', width: 3, height: size, marginLeft: 3, background: look.accent, opacity: Math.floor(t * 2.4) % 2 ? 0 : 1 }} />}
      </div>
    </div>
  );
};

const Stamp: React.FC<{ at: number; text: string; size?: number; rot?: number; tone?: 'problem' | 'good'; until?: number }> = ({ at, text, size = 64, rot = -8, tone = 'problem', until }) => {
  const { look, t, frame, fps } = useMotion();
  const k = frame === 0 && at <= 0 ? 1 : pop(frame, fps, at, { damping: 8, stiffness: 320 });
  if (k <= 0 || (until !== undefined && t >= until)) return null;
  const col = tone === 'problem' ? look.problem : look.good;
  return (
    <div style={{ display: 'inline-block', padding: `${size * 0.12}px ${size * 0.35}px`, border: `${size * 0.09}px solid ${col}`, borderRadius: size * 0.18, color: col, fontFamily: FONT.display, fontWeight: 700, fontSize: size, letterSpacing: '0.04em', transform: `rotate(${rot}deg) scale(${0.6 + 0.4 * k + (1 - Math.min(1, k)) * 1.2})`, opacity: Math.min(1, k * 1.5), background: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap' }}>{text}</div>
  );
};

/* ───────────── the hook (frame 0 = cover) ───────────── */
const HookField: React.FC = () => {
  const { look, t } = useMotion();
  const shake = t > c('hacked', 'h1') && t < c('hacked', 'h1') + 0.4 ? Math.sin(t * 90) * 10 * (1 - prog(t, c('hacked', 'h1'), c('hacked', 'h1') + 0.4)) : 0;
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, transform: `translateX(${shake}px)` }}>
      <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: look.problem, letterSpacing: '-0.01em' }}>if you don't want to get hacked</div>
      <div style={{ position: 'relative' }}>
        <Field text="P@ssw0rd!" w={620} size={58} label="PASSWORD" caret />
        <div style={{ position: 'absolute', right: -30, top: -20 }}><Stamp at={0} text="STOP" size={84} rot={-10} /></div>
        {(['@', '0', '!'] as string[]).map((s, i) => (
          <div key={s} style={{ position: 'absolute', left: [88, 196, 318][i], top: 30 + Math.sin(t * 3 + i) * 6, fontFamily: FONT.mono, fontWeight: 800, fontSize: 58, color: look.problem, opacity: 0.0 }}>{s}</div>
        ))}
      </div>
    </div>
  );
};

/** h2: capital ✓ number ✓ symbol ✓ → strong → leaked 6,421,042 times */
const Leaked: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const lk = c('leaked', 'h2');
  const strong = prog(t, c('ticks', 'h2'), c('box', 'h2') + 0.3);
  const red = t >= lk;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
      <Field text="P@ssw0rd" w={620} size={60} tone={red ? 'problem' : strong > 0.5 ? 'good' : 'normal'} />
      <div style={{ display: 'flex', gap: 16 }}>
        {([['A–Z', 'Capital'], ['0–9', 'Number'], ['#@!', 'Symbol']] as [string, string][]).map(([txt, w]) => <Tag key={w} at={c(w, 'h2')} text={`${txt} ✓`} tone="good" size={30} />)}
      </div>
      <div style={{ width: 620 }}>
        <div style={{ height: 22, borderRadius: 11, background: look.bg2, overflow: 'hidden' }}><div style={{ width: `${strong * 100}%`, height: '100%', background: red ? look.problem : look.good, borderRadius: 11 }} /></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, letterSpacing: '0.1em', color: red ? look.problem : look.good, opacity: strong }}><span>STRENGTH</span><span>{red ? 'LEAKED' : 'STRONG'}</span></div>
      </div>
      {red && (
        <div style={{ textAlign: 'center', transform: `scale(${pop(frame, fps, lk, { damping: 10 })})` }}>
          <Ticker keys={[{ t: 0, v: 0 }, { t: lk, v: 6421042, dur: c('times', 'h2') - lk + 0.2 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 112, color: look.problem, letterSpacing: '-0.03em', transformOrigin: 'center' }} />
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, letterSpacing: '0.2em', color: look.problem }}>TIMES LEAKED</div>
          <div style={{ marginTop: 10 }}><Footnote at={lk + 0.3} text="Have I Been Pwned · Pwned Passwords · checked Oct 9, 2026" /></div>
        </div>
      )}
    </div>
  );
};

/* ───────────── world: login → blender → database → guessing machine ───────────── */
const LoginCard: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, WORLD_AT, { damping: 13 });
  // what the password field shows over time
  const typeA = c('type', 'c1a'), typeB = c('password', 'c1a');
  const pw = 'P@ssw0rd';
  const pass = ['velvet', 'pancake', 'glacier', 'rocket'];
  const passAt = [c('four', 't2'), c('random', 't2'), c('words', 't2'), c('words', 't2') + 0.35];
  let text = '';
  let tone: 'normal' | 'good' = 'normal';
  if (t >= S('t2')) { text = pass.filter((_, i) => t >= passAt[i]).join(' '); tone = t >= passAt[3] ? 'good' : 'normal'; }
  else if (t >= AWAY) text = '••••••••';
  else if (t >= typeA) text = pw.slice(0, Math.ceil(prog(t, typeA, typeB + 0.3, Easing.linear) * pw.length));
  return (
    <At x={X_LOGIN} y={0}>
      <div style={{ width: 600, borderRadius: 30, background: '#fff', border: `1.5px solid ${look.cardEdge}`, boxShadow: `0 18px 44px ${look.cardShadow}`, padding: '28px 34px', boxSizing: 'border-box', transform: `scale(${k})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.ink }}><KeyRound size={38} color={look.accent} />Create account</div>
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12, height: 64, borderRadius: 14, border: `2px solid ${look.cardEdge}`, padding: '0 16px', fontFamily: FONT.sans, fontSize: 28, color: look.inkSoft }}><Mail size={28} />kemi@mail.com</div>
        <div style={{ marginTop: 16 }}><Field text={text} w={532} size={t >= S('t2') ? 27 : 34} caret={t < AWAY || (t >= S('t2') && t < passAt[3])} tone={tone} /></div>
        <div style={{ marginTop: 18, height: 66, borderRadius: 16, background: look.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT.sans, fontWeight: 800, fontSize: 30, color: '#fff' }}>Sign up</div>
      </div>
    </At>
  );
};

/** the typed password as a pill, flying from the login form into the blender */
const PasswordPill: React.FC = () => {
  const { look, t } = useMotion();
  const a = AWAY, b = c('blender', 'c1b'), drop = c('Same', 'c1b');
  if (t < a || t > drop + 0.5) return null;
  const k = prog(t, a, b, Easing.inOut(Easing.cubic));
  const d = prog(t, drop, drop + 0.45, Easing.in(Easing.quad));
  const x = X_LOGIN + (X_BLEND - X_LOGIN) * k, y = 40 - 260 * Math.sin(k * Math.PI) * (1 - k * 0.6) - 180 * k + 190 * d;
  return (
    <At x={x} y={y} z={5}>
      <div style={{ padding: '12px 24px', borderRadius: 30, background: look.accent, color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 34, boxShadow: `0 10px 24px ${look.accent}55`, transform: `scale(${1 - d * 0.6}) rotate(${k * 360 * 0.15}deg)`, opacity: 1 - d }}>P@ssw0rd</div>
    </At>
  );
};

const SPIN: [number, number][] = [[c('Same', 'c1b'), c('out', 'c1b') + 0.5], [c('blends', 'c1c'), c('typed', 'c1c') + 0.4], [c('fast', 'c6a') - 0.6, SLOW_AT]];
const Blender: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, WORLD_AT + 0.1, { damping: 13 });
  const slow = t >= SLOW_AT;
  const spinning = SPIN.some(([a, b]) => t >= a && t < b) || slow;
  const ang = t * (slow ? 40 : spinning ? 1400 : 0);
  const outAt = c('out', 'c1b');
  const no = c('un-blend', 'c1b');
  return (
    <>
      <At x={X_BLEND} y={-20}>
        <svg width={300} height={400} viewBox="0 0 300 400" style={{ transform: `scale(${k})`, overflow: 'visible' }}>
          <path d="M60 30 L240 30 L215 270 L85 270 Z" fill={`${look.accent}10`} stroke={look.accent} strokeWidth={6} strokeLinejoin="round" />
          <rect x={50} y={14} width={200} height={22} rx={8} fill={look.ink} />
          {spinning && Array.from({ length: 8 }, (_, i) => <circle key={i} cx={150 + Math.cos((ang / 57 + i) * 1.7) * (30 + i * 6)} cy={200 - i * 18 + Math.sin(ang / 30 + i) * 6} r={9 - i * 0.6} fill={i % 2 ? look.accent2 : look.warm} opacity={0.75} />)}
          <g transform={`translate(150 250) rotate(${ang})`}><path d="M-46 0 L46 0 M0 -10 L0 10" stroke={look.inkSoft} strokeWidth={8} strokeLinecap="round" /></g>
          <path d="M75 270 L225 270 L245 360 L55 360 Z" fill={slow ? look.good : look.ink} />
          <circle cx={150} cy={318} r={16} fill="#fff" opacity={0.9} />
        </svg>
      </At>
      <At x={X_BLEND} y={230}>
        <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, letterSpacing: '0.18em', color: slow ? look.good : look.accent, whiteSpace: 'nowrap', opacity: k }}>{slow ? 'BCRYPT · SLOW' : t >= c('hash', 'c1b') ? 'HASH' : ''}</div>
      </At>
      {t >= outAt && (
        <At x={X_BLEND + 10} y={310}>
          <div style={{ transform: `scale(${pop(frame, fps, outAt, { damping: 11 })})`, padding: '12px 20px', borderRadius: 14, background: look.ink, color: '#9FE8B8', fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, whiteSpace: 'nowrap' }}>{short(HASH.pssw, 22)}</div>
        </At>
      )}
      {t >= no && t < S('c1c') + 0.3 && (
        <At x={X_BLEND - 290} y={150}><Badge at={no} text="CAN'T UN-BLEND" /></At>
      )}
      {t >= c('fast', 'c6a') - 0.6 && t < SLOW_AT && <At x={X_BLEND} y={-300}><Tag at={c('fast', 'c6a') - 0.6} text="built to be fast" tone="problem" size={24} /></At>}
    </>
  );
};

type Row = { email: string; hash: string; salt?: string; salted?: string; same?: boolean };
const ROWS: Row[] = [
  { email: 'kemi@mail.com', hash: HASH.pssw, salt: 'Qm81r', salted: HASH.saltKemi },
  { email: 'ada@mail.com', hash: HASH.password, salt: 'x9Lq2', salted: HASH.saltAda, same: true },
  { email: 'tunde@mail.com', hash: HASH.password, salt: 'k2Pz7', salted: HASH.saltTunde, same: true },
  { email: 'femi@mail.com', hash: HASH.n123456, salt: 'Zt4Ve', salted: HASH.saltFemi },
];
const Database_: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const at = c('keeps', 'c1c') - 0.3;
  const k = pop(frame, fps, at, { damping: 13 });
  if (k <= 0) return null;
  const hacked = c('hacked', 'c2a');
  const breached = t >= hacked && t < S('c5a');
  const shake = t >= hacked && t < hacked + 0.5 ? Math.sin(t * 80) * 12 * (1 - prog(t, hacked, hacked + 0.5)) : 0;
  const sameHi = t >= c('same', 'c5a') && t < SALT_AT;
  const cracked = t >= c('Crack', 'c5b') && t < SALT_AT;
  const saltK = prog(t, SALT_AT, SALT_AT + 0.4);
  return (
    <At x={X_DB} y={0}>
      <div style={{ width: 680, borderRadius: 26, background: '#fff', border: `${breached ? 3 : 1.5}px solid ${breached ? look.problem : look.cardEdge}`, boxShadow: `0 18px 44px ${look.cardShadow}${breached ? `, 0 0 30px ${look.problem}55` : ''}`, overflow: 'hidden', transform: `translateX(${shake}px) scale(${k})` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px', borderBottom: `1.5px solid ${look.cardEdge}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 22, letterSpacing: '0.12em', color: look.inkSoft }}>
          <Database size={26} color={look.accent} />TABLE · USERS<span style={{ flex: 1 }} />{breached && <span style={{ color: look.problem, display: 'flex', alignItems: 'center', gap: 6 }}><Skull size={24} />BREACHED</span>}
        </div>
        <div style={{ display: 'flex', padding: '10px 22px', fontFamily: FONT.mono, fontSize: 17, fontWeight: 800, letterSpacing: '0.1em', color: look.inkFaint }}>
          <span style={{ width: 230 }}>EMAIL</span>{saltK > 0 && <span style={{ width: 110, opacity: saltK, color: look.warm }}>SALT</span>}<span>PASSWORD HASH</span>
        </div>
        {ROWS.map((r, i) => {
          const rk = pop(frame, fps, at + 0.3 + i * 0.15, { damping: 13 });
          const hi = r.same && sameHi;
          const cr = r.same && cracked;
          const h = saltK > 0.5 && r.salted ? r.salted : r.hash;
          return (
            <div key={r.email} style={{ display: 'flex', alignItems: 'center', padding: '12px 22px', borderTop: `1px solid ${look.cardEdge}`, background: cr ? '#FDECEC' : hi ? '#FFF4D6' : 'transparent', opacity: rk, transform: `translateX(${(1 - rk) * -20}px)`, fontFamily: FONT.mono, fontSize: 22, color: look.ink }}>
              <span style={{ width: 230, fontFamily: FONT.sans, fontWeight: 600 }}>{r.email}</span>
              {saltK > 0 && <span style={{ width: 110, color: look.warm, fontWeight: 800, opacity: saltK }}>{r.salt}</span>}
              <span style={{ color: cr ? look.problem : look.inkSoft, fontWeight: 700 }}>{short(h, saltK > 0 ? 12 : 18)}</span>
              {cr && <span style={{ marginLeft: 10, fontWeight: 800, fontSize: 18, color: look.problem }}>= password</span>}
            </div>
          );
        })}
        {t >= c('match', 'c1c') - 0.2 && t < S('c2a') && <div style={{ padding: '10px 22px 16px', display: 'flex', gap: 12 }}><Tag at={c('typed', 'c1c')} text="login: blend + compare" size={18} tone="muted" /><Tag at={c('match', 'c1c')} text="match ✓" tone="good" size={18} solid /></div>}
      </div>
    </At>
  );
};

/** the stolen hashes file sliding from the database to the guessing machine */
const Loot: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const a = c('walk', 'c2a'), b = c('guess', 'c2b');
  if (t < a || t >= S('c5a')) return null;
  const k = prog(t, a, b, Easing.inOut(Easing.cubic));
  return (
    <At x={X_DB + 380 + (X_GPU - X_DB - 700) * k} y={-260 + 60 * k} z={4}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderRadius: 16, background: look.ink, color: '#fff', fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, transform: `scale(${pop(frame, fps, a, { damping: 11 })}) rotate(${-4 + k * 4}deg)`, boxShadow: '0 14px 30px rgba(0,0,0,0.25)' }}>
        <FileText size={26} />hashes.txt
      </div>
    </At>
  );
};

/** the guessing machine: one gaming GPU, fans spin harder while it guesses */
const GUESSING: [number, number][] = [[c('Blend', 'c3a'), S('c4a')], [c('Crackers', 'c4d'), c('instantly', 'c4d') + 0.6], [c('card', 'c6c'), S('t1')]];
const GPU: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const k = pop(frame, fps, WORLD_AT + 0.2, { damping: 13 });
  const busy = GUESSING.some(([a, b]) => t >= a && t < b);
  const slow = t >= c('drops', 'c6c');
  const spd = busy ? (slow ? 90 : 1600) : 30;
  const ang = t * spd;
  const word = busy ? ['aaaa', 'aaab', '123456', 'qwerty', 'dragon', 'letmein', 'monkey', 'sunshine', 'iloveyou', 'P@ssw0rd'][Math.floor(t * (slow ? 2 : 14)) % 10] : 'aaaa';
  return (
    <>
      <At x={X_GPU} y={-10}>
        <div style={{ width: 620, height: 260, borderRadius: 26, background: '#1B1F2A', border: `3px solid ${busy ? (slow ? look.good : look.problem) : '#2E3445'}`, boxShadow: `0 20px 44px rgba(0,0,0,0.28)${busy ? `, 0 0 40px ${slow ? look.good : look.problem}55` : ''}`, display: 'flex', alignItems: 'center', justifyContent: 'space-around', transform: `scale(${k})`, position: 'relative' }}>
          {[0, 1].map((i) => (
            <svg key={i} width={200} height={200} viewBox="-100 -100 200 200">
              <circle r={92} fill="#11141C" stroke="#3A4256" strokeWidth={6} />
              <g transform={`rotate(${ang + i * 40})`}>{Array.from({ length: 7 }, (_, j) => <path key={j} d="M0 0 Q 30 -40 10 -84 L -14 -80 Q 4 -40 0 0" fill="#4A5570" transform={`rotate(${(j * 360) / 7})`} />)}</g>
              <circle r={18} fill="#2A3142" />
            </svg>
          ))}
          <div style={{ position: 'absolute', left: 24, top: 14, display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT.mono, fontWeight: 800, fontSize: 19, letterSpacing: '0.14em', color: '#9AA4BC' }}><Cpu size={20} />GAMING GPU</div>
        </div>
      </At>
      <At x={X_GPU} y={210}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: FONT.mono, fontWeight: 800, fontSize: 26, opacity: k, whiteSpace: 'nowrap' }}>
          <span style={{ color: look.inkSoft }}>guess:</span><span style={{ color: look.ink, minWidth: 170 }}>{word}</span>
          <span style={{ color: look.inkFaint }}>→</span><span style={{ color: busy ? look.problem : look.inkSoft }}>{busy ? short(HASH.aaaa.split('').map((ch, i) => '0123456789abcdef'[Math.floor(rnd(i + Math.floor(t * 14)) * 16)]).join(''), 10) : short(HASH.aaaa, 10)}</span>
        </div>
      </At>
    </>
  );
};

/* ───────────── overlays ───────────── */
const Ov: React.FC<{ a: number; b: number; x?: number; y?: number; children: React.ReactNode }> = ({ a, b, x = 540, y = OY, children }) => {
  const { t, frame, fps } = useMotion();
  if (t < a || t >= b) return null;
  const k = life(t, frame, fps, a, b);
  return <At x={x} y={y}><div style={{ opacity: Math.min(1, k * 1.3), transform: `translateY(${(1 - Math.min(1, k)) * 24}px)` }}>{children}</div></At>;
};
const W1000: React.FC<{ children: React.ReactNode; w?: number }> = ({ children, w = 1000 }) => <div style={{ width: w, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>{children}</div>;

/** guess → hash → compare, one step per spoken word */
const GuessLoop: React.FC = () => {
  const { look, t } = useMotion();
  const steps = [c('Blend', 'c3a'), c('Compare', 'c3a'), c('Wrong', 'c3a'), c('Next', 'c3a')];
  const s = steps.filter((x) => t >= x).length;
  const cell = (label: string, val: string, on: boolean, tone?: string) => (
    <div style={{ width: 290, padding: '14px 18px', borderRadius: 16, background: '#fff', border: `2.5px solid ${on ? (tone ?? look.accent) : look.cardEdge}`, opacity: on ? 1 : 0.35, boxShadow: `0 10px 24px ${look.cardShadow}` }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 17, fontWeight: 800, letterSpacing: '0.12em', color: look.inkSoft }}>{label}</div>
      <div style={{ fontFamily: FONT.mono, fontSize: 26, fontWeight: 800, color: tone ?? look.ink, marginTop: 4, whiteSpace: 'nowrap' }}>{val}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      {cell('GUESS', s >= 4 ? 'aaab' : 'aaaa', s >= 1)}
      {cell('HASH', short(HASH.aaaa, 10), s >= 1)}
      {cell(s >= 3 ? 'MATCH?' : 'STOLEN', s >= 3 ? '✗ no' : short(HASH.pssw, 10), s >= 2, s >= 3 ? look.problem : undefined)}
    </div>
  );
};

const LEAKS: [string, string, number][] = [['123456', '210,461,208', 0], ['password', '52,372,427', 1], ['qwerty123', '13,871,714', 2], ['iloveyou', '7,007,935', 3], ['P@ssw0rd', '6,421,042', 4]];
const LeakList: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const ats = [c('One', 'c4b'), c('password', 'c4b'), c('password', 'c4b') + 0.25, c('Fifty', 'c4b'), c('Fifty', 'c4b') + 0.25];
  const hot = t < c('password', 'c4b') ? 0 : t < c('Fifty', 'c4b') + 0.5 ? 1 : -1;
  return (
    <div style={{ width: 700, borderRadius: 22, background: '#fff', border: `1.5px solid ${look.cardEdge}`, boxShadow: `0 14px 34px ${look.cardShadow}`, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: `1.5px solid ${look.cardEdge}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 18, letterSpacing: '0.12em', color: look.inkSoft }}><ListOrdered size={22} />LEAKED PASSWORDS<span style={{ flex: 1 }} />TIMES SEEN</div>
      {LEAKS.map(([p, n, i]) => {
        const k = pop(frame, fps, ats[i], { damping: 13 });
        return (
          <div key={p} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 20px', borderTop: i ? `1px solid ${look.cardEdge}` : 'none', background: hot === i ? '#FDECEC' : 'transparent', fontFamily: FONT.mono, fontSize: 26, fontWeight: 700, color: look.ink, opacity: k, transform: `translateX(${(1 - Math.min(1, k)) * -24}px)` }}>
            <span>{p}</span><span style={{ color: look.problem }}>{n}</span>
          </div>
        );
      })}
    </div>
  );
};

/** password → Password → Passw0rd → Passw0rd! (the same tricks everyone uses) */
const Tricks: React.FC = () => {
  const { look, t, frame, fps } = useMotion();
  const steps: [string, number, string][] = [['password', c('same', 'c4c'), ''], ['Password', c('Capital', 'c4c'), 'capital first'], ['Passw0rd', c('zero', 'c4c'), '1 or 0'], ['Passw0rd!', c('end', 'c4c'), '! at the end']];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {steps.map(([w, at, note], i) => {
        const k = pop(frame, fps, at, { damping: 12 });
        if (k <= 0) return <div key={w} style={{ width: 210 }} />;
        return (
          <React.Fragment key={w}>
            {i > 0 && <span style={{ fontFamily: FONT.mono, fontSize: 30, color: look.inkFaint }}>→</span>}
            <div style={{ textAlign: 'center', transform: `scale(${k})` }}>
              <div style={{ padding: '10px 14px', borderRadius: 14, background: '#fff', border: `2.5px solid ${i === 3 ? look.problem : look.accent}`, fontFamily: FONT.mono, fontWeight: 800, fontSize: 28, color: look.ink }}>{w}</div>
              <div style={{ fontFamily: FONT.hand, fontSize: 30, color: look.inkSoft, marginTop: 4, height: 34 }}>{note}</div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Rainbow: React.FC = () => {
  const { look, frame, fps } = useMotion();
  const at = c('tables', 'c5b');
  const rows: [string, string][] = [[short(HASH.n123456, 12), '123456'], [short(HASH.password, 12), 'password'], [short(HASH.pssw, 12), 'P@ssw0rd']];
  return (
    <div style={{ width: 640, borderRadius: 20, background: look.ink, padding: '14px 22px', transform: `scale(${pop(frame, fps, at, { damping: 13 })})` }}>
      <div style={{ fontFamily: FONT.mono, fontSize: 17, fontWeight: 800, letterSpacing: '0.12em', color: '#8A93A6', marginBottom: 6 }}>PRE-MADE TABLE · HASH → PASSWORD</div>
      {rows.map(([h, p], i) => <div key={p} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 25, fontWeight: 700, color: '#9FE8B8', opacity: pop(frame, fps, at + 0.15 + i * 0.12) }}><span>{h}</span><span style={{ color: '#fff' }}>{p}</span></div>)}
    </div>
  );
};

/* ───────────── camera ───────────── */
const CAM = (t: number) => camAt([
  { t: 0, x: SIDE(1, X_LOGIN), y: 0, z: 1 },
  { t: S('c1b') - 0.2, x: X_BLEND, y: 20, z: 1, dur: 1.1 },
  { t: c('keeps', 'c1c') - 0.4, x: X_DB, y: 0, z: 1, dur: 1.0 },
  { t: c('walk', 'c2a'), x: (X_DB + X_GPU) / 2 - 100, y: -20, z: 0.85, dur: 1.2 },
  { t: c('guess', 'c2b') - 0.4, x: X_GPU, y: -40, z: 1, dur: 0.9 },
  { t: S('c5a') - 0.1, x: X_DB, y: -40, z: 1, dur: 1.1 },
  { t: S('c6a') - 0.1, x: X_BLEND, y: -20, z: 1, dur: 1.1 },
  { t: c('card', 'c6c') - 0.4, x: X_GPU, y: -40, z: 1, dur: 1.0 },
  { t: S('t1') - 0.1, x: SIDE(0.9, X_LOGIN), y: -40, z: 0.9, dur: 1.4 },
  { t: S('recap') - 0.2, x: SIDE(0.3, (X_LOGIN + X_GPU) / 2), y: 0, z: 0.3, dur: 1.0 },
], t);

const CHAPTERS: [string, string, string][] = [['c1a', '01', 'Sign-up'], ['c2a', '02', 'The breach'], ['c3a', '03', 'Guessing machine'], ['c4a', '04', 'The list'], ['c5a', '05', 'Salt'], ['c6a', '06', 'Slow on purpose'], ['t1', '07', 'What works']];

/* ───────────── scene ───────────── */
const Scene: React.FC = () => {
  loadMotionFonts();
  const { look, t, frame, fps } = useMotion();
  const cam = CAM(t);
  const br = L('bridge');
  const worldOn = prog(t, WORLD_AT - 0.1, WORLD_AT + 0.4)
    * (1 - 1.0 * (prog(t, S('c4a') + 0.2, S('c4a') + 0.6) - prog(t, S('c4e') - 0.2, S('c4e') + 0.2)))
    * (1 - 0.9 * prog(t, S('recap') - 0.3, S('recap') + 0.2))
    * (1 - prog(t, S('punch') - 0.3, S('punch')));
  const end = vo.duration + 0.25;

  return (
    <AbsoluteFill>
      <Backdrop cam={cam} />

      {/* ── the world ── */}
      {worldOn > 0.001 && (
        <AbsoluteFill style={{ opacity: worldOn }}>
          <World cam={cam} centerY={800}>
            <LoginCard />
            <Blender />
            <Database_ />
            <GPU />
            <Loot />
            <PasswordPill />
          </World>
        </AbsoluteFill>
      )}

      {/* ── HUD: guesses per second + times leaked ── */}
      <HudMeter pulseTeyro={[br.start, S('cta')]}
        lamps={[{ label: 'Hashed', color: look.accent, on: [[c('hash', 'c1b'), end]] }, { label: 'Salted', color: look.warm, on: [[SALT_AT, end]] }, { label: 'Slow', color: look.good, on: [[SLOW_AT, end]] }]}
        counters={[
          { label: 'Guesses / sec', format: fmt.compact, keys: [{ t: 0, v: 0 }, { t: c('Blend', 'c3a'), v: 1, dur: 0.2 }, { t: c('billion', 'c3b'), v: 22e9, dur: 0.9 }, { t: c('thousand', 'c6c'), v: 184000, dur: 0.8 }, { t: c('fast', 't3'), v: 22e9, dur: 0.5 }, { t: c('slow', 't3'), v: 184000, dur: 0.5 }] },
          { label: 'Times leaked', align: 'right', format: fmt.int, keys: [{ t: 0, v: 0 }, { t: c('leaked', 'h2'), v: 6421042, dur: 0.9 }, { t: c('Seen', 'c4b'), v: 210461208, dur: 0.9 }, { t: c('Fifty', 'c4b'), v: 52372427, dur: 0.6 }, { t: c('instantly', 'c4d'), v: 6421042, dur: 0.6 }, { t: c('Leaked', 't5'), v: 4173, dur: 0.7 }] },
        ]}
        sub={[{ t: 0, text: 'stop adding symbols' }, ...CHAPTERS.map(([id, n, name]) => ({ t: S(id), text: `${n} · ${name}` })), { t: S('recap'), text: 'recap' }]} />

      {/* ── HOOK (frame 0 = cover): STOP adding symbols ── */}
      <TitleCard title={['STOP ADDING', 'SYMBOLS']} kicker="" until={S('h2')} titleSize={132} top={400}><HookField /></TitleCard>
      <Ov a={S('h2')} b={S('h3')} y={860}><Leaked /></Ov>
      <Ov a={S('h3')} b={WORLD_AT + 0.2} x={SX} y={820}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Badge at={c('hackers', 'h3')} text="HACKERS" icon={<Skull size={26} />} />
          <Strike text="guess like you" at={c('guess', 'h3')} strikeAt={c('think', 'h3')} size={56} />
        </div>
      </Ov>

      {/* ── chapter cards ── */}
      {CHAPTERS.map(([id, n, name]) => <ChapterCard key={id} at={S(id)} until={S(id) + 2.6} n={n} title={name} sub="STEP" size={104} y={384} color={id === 't1' ? look.good : look.accent} />)}

      {/* ── 01 sign-up ── */}
      <Ov a={c('throws', 'c1a')} b={S('c1b')} x={SX} y={1150}><Tag at={c('throws', 'c1a')} text="thrown away?" tone="problem" size={34} /></Ov>
      <Ov a={c('blender', 'c1b')} b={S('c1c')}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Tag at={c('in', 'c1b')} text="same in" size={28} /><span style={{ fontFamily: FONT.mono, fontSize: 30, color: look.inkFaint }}>→</span><Tag at={c('out', 'c1b')} text="same out" size={28} solid />
        </div>
      </Ov>
      <Ov a={c('string', 'c1c')} b={S('c2a')}>
        <W1000><Footnote at={c('string', 'c1c')} text={`SHA-256("P@ssw0rd") = ${HASH.pssw.slice(0, 40)}…`} /></W1000>
      </Ov>

      {/* ── 02 breach ── */}
      <Ov a={c('millions', 'c2a')} b={S('c2b')}><Tag at={c('millions', 'c2a')} text="millions of rows" tone="problem" size={30} /></Ov>
      <Ov a={S('c2b')} b={S('c3a')}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <Tag at={c('No', 'c2b')} text="✗ passwords" tone="problem" size={28} />
          <Tag at={c('Just', 'c2b')} text="only hashes" size={28} />
          <Tag at={c('guess', 'c2b')} text="so: guess" size={28} solid />
        </div>
      </Ov>

      {/* ── 03 guessing machine ── */}
      <Ov a={c('Blend', 'c3a')} b={S('c3b')}><GuessLoop /></Ov>
      <Ov a={c('gaming', 'c3b')} b={S('c4a')} y={OY - 10}>
        <W1000>
          <Ticker keys={[{ t: 0, v: 0 }, { t: c('twenty', 'c3b'), v: 21975500000, dur: 1.0 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 92, color: look.problem, letterSpacing: '-0.03em', transformOrigin: 'center' }} />
          <div style={{ fontFamily: FONT.mono, fontWeight: 800, fontSize: 24, letterSpacing: '0.16em', color: look.inkSoft }}>GUESSES PER SECOND</div>
          <Footnote at={c('second', 'c3b')} text="hashcat benchmark · one RTX 4090 · SHA-256 (fast hash)" />
        </W1000>
      </Ov>

      {/* ── 04 the list (world dimmed, list full stage) ── */}
      <Ov a={S('c4a')} b={S('c4c')} y={820}>
        <W1000>
          <Tag at={c('leaked', 'c4a')} text="start with what already leaked" size={28} solid />
          {t >= c('One', 'c4b') - 0.1 && <LeakList />}
          <Footnote at={c('One', 'c4b')} text="Have I Been Pwned · Pwned Passwords · checked Oct 9, 2026" />
        </W1000>
      </Ov>
      <Ov a={S('c4c')} b={S('c4e')} y={820}>
        <W1000>
          <Tag at={c('symbols', 'c4c')} text="everyone adds symbols the same way" size={26} tone="problem" />
          <Tricks />
          {t >= c('built', 'c4d') && <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 8 }}><Tag at={c('built', 'c4d')} text="rules built into the list" size={24} /><Stamp at={c('instantly', 'c4d')} text="CRACKED" size={56} rot={-6} /></div>}
          <Footnote at={c('Capital', 'c4c')} text={'NIST SP 800-63B: "password" → "Password1!" is how people respond to symbol rules'} />
        </W1000>
      </Ov>
      <Ov a={S('c4e')} b={br.start + 0.1} y={OY - 20}><W1000><BigText at={c('survive', 'c4e')} lines={['HOW DOES ANY', 'PASSWORD SURVIVE?']} size={70} align="center" /></W1000></Ov>

      {/* ── Teyro mid bridge ── */}
      <TeyroBridge at={br.start} until={S('back') + 0.2} line="Learn coding and AI, a few minutes a day" chips={['Coding', 'AI', 'A few minutes a day']}
        chipTimes={[c('Coding', 'bridge'), c('lessons', 'bridge'), c('minutes', 'bridge')]} beats={[c('Quick', 'bridge'), c('Teyro', 'bridge'), c('Okay', 'back')]} />

      {/* ── 05 salt ── */}
      <Ov a={c('same', 'c5a')} b={c('tables', 'c5b')}><div style={{ display: 'flex', gap: 14 }}><Tag at={c('same', 'c5a')} text="same password = same hash" size={28} tone="problem" /><Badge at={c('both', 'c5b')} text="CRACK 1, GET 2" /></div></Ov>
      <Ov a={c('tables', 'c5b')} b={S('c5c')}><Rainbow /></Ov>
      <Ov a={SALT_AT} b={S('c6a')}>
        <W1000>
          <div style={{ display: 'flex', gap: 14 }}><Tag at={SALT_AT} text="+ salt" size={30} solid /><Tag at={c('user', 'c5c')} text="random per user" size={26} /><Tag at={c('totally', 'c5c')} text="pre-made tables: useless" tone="good" size={26} /></div>
          <Footnote at={c('mixed', 'c5c')} text="OWASP Password Storage Cheat Sheet · example salts, real SHA-256 outputs" />
        </W1000>
      </Ov>

      {/* ── 06 slow on purpose ── */}
      <Ov a={SLOW_AT} b={c('card', 'c6c')}><div style={{ display: 'flex', gap: 14 }}><Tag at={SLOW_AT} text="bcrypt" size={32} tone="good" solid /><Tag at={c('Argon', 'c6b')} text="Argon2" size={32} tone="good" solid /></div></Ov>
      <Ov a={c('card', 'c6c')} b={S('t1')} y={OY - 10}>
        <W1000>
          <Strike text="21,975,500,000 / s" at={c('card', 'c6c')} strikeAt={c('drops', 'c6c')} replace="184,000 / s" replaceAt={c('hundred', 'c6c')} size={70} />
          <Footnote at={c('drops', 'c6c')} text="hashcat · one RTX 4090 · SHA-256 vs bcrypt (lowest benchmark setting) · ≈119,000× slower" />
        </W1000>
      </Ov>

      {/* ── 07 what works (Remi on, side stage) ── */}
      <Ov a={c('Symbols', 't1')} b={S('t2')} x={SX} y={1170}><Strike text="SYMBOLS" at={c('Symbols', 't1')} strikeAt={c('list', 't1')} replace="LENGTH" replaceAt={c('Length', 't1')} size={84} /></Ov>
      <Ov a={c('seven', 't2')} b={S('t3')} x={SX} y={1170}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 600 }}>
          <Tag at={c('seven', 't2')} text="7,776-word list" size={26} />
          {t >= c('three', 't2') && <Ticker keys={[{ t: 0, v: 0 }, { t: c('three', 't2'), v: 3656158440062976, dur: 1.0 }]} format={fmt.int} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 56, color: look.good, transformOrigin: 'center' }} />}
          <Footnote at={c('combinations', 't2')} width={600} text="EFF large wordlist · 7,776⁴ combinations" />
        </div>
      </Ov>
      <Ov a={S('t3')} b={S('t4')} x={SX} y={1170}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <Split at={c('fast', 't3')} rightAt={c('slow', 't3')} w={600} h={160}
            left={{ title: 'Fast hash', tone: 'problem', body: <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: look.problem }}>≈ 2 days</div> }}
            right={{ title: 'Slow hash', tone: 'good', body: <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 44, color: look.good }}>{t >= c('centuries', 't3') ? '≈ 630 yrs' : '…'}</div> }} />
          <Footnote at={c('days', 't3')} width={600} text="every combination on one RTX 4090 · computed from the hashcat benchmark" />
        </div>
      </Ov>
      <Ov a={c('NIST', 't4')} b={S('t5')} x={SX} y={1160}>
        <div style={{ width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><ShieldCheck size={34} color={look.accent} /><span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: look.ink }}>NIST says</span></div>
          <Tag at={c('stop', 't4')} text="no forced symbol rules" size={26} tone="good" />
          <Tag at={c('fifteen', 't4')} text="min 15 characters" size={26} tone="good" solid />
          <Footnote at={c('standards', 't4')} width={600} text="NIST SP 800-63B rev 4 (Aug 2025)" />
        </div>
      </Ov>
      <Ov a={c('Correct', 't5')} b={S('cav')} x={SX} y={1160}>
        <div style={{ width: 600, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>{['correct', 'horse', 'battery', 'staple'].map((w, i) => <Tag key={w} at={c(['Correct', 'horse', 'battery', 'staple'][i], 't5')} text={w} size={24} />)}</div>
          <Badge at={c('Leaked', 't5')} text="LEAKED 4,173×" />
          <Footnote at={c('Leaked', 't5')} width={600} text="Have I Been Pwned · Pwned Passwords · checked Oct 9, 2026" />
        </div>
      </Ov>
      <Ov a={S('cav')} b={S('recap')} x={SX} y={1170}>
        <Checklist width={560} size={28} items={[{ text: 'never reuse it', at: c('reuse', 'cav'), check: c('everywhere', 'cav') }, { text: 'password manager', at: c('manager', 'cav'), check: c('easy', 'cav') }]} />
      </Ov>

      {/* ── recap (Remi on) ── */}
      <At x={SX} y={1060}>
        {t < S('punch') && (
          <div style={{ opacity: 1 - prog(t, S('punch') - 0.25, S('punch')) }}>
            <Recap width={580} titleAt={S('recap')} items={[
              { text: 'Sites blend it', at: c('Sites', 'recap') }, { text: 'Hackers steal blends', at: c('Hackers', 'recap') }, { text: 'Guess from leaks', at: c('guess', 'recap') },
              { text: 'Salt + slow hashes', at: c('Salt', 'recap') }, { text: 'Length beats symbols', at: c('length', 'recap') },
            ]} />
          </div>
        )}
      </At>

      {/* ── punchline ── */}
      {t >= S('punch') && t < S('cta') && (
        <AbsoluteFill style={{ opacity: 1 - prog(t, S('cta') - 0.2, S('cta')) }}>
          <At x={540} y={700} w={1000}><BigText at={c("Don't", 'punch')} lines={["DON'T BE CLEVER."]} size={100} align="center" color={look.inkSoft} /></At>
          <At x={540} y={960} w={1060}>
            {t >= c('Be', 'punch') && (() => {
              const k = pop(frame, fps, c('Be', 'punch'), { damping: 10 });
              const stretch = prog(t, c('long', 'punch'), c('long', 'punch') + 0.6);
              return <div style={{ textAlign: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: 150, letterSpacing: `${-0.03 + stretch * 0.12}em`, color: look.accent, transform: `scale(${k})`, whiteSpace: 'nowrap' }}>BE LO{'O'.repeat(Math.round(stretch * 3))}NG.</div>;
            })()}
          </At>
        </AbsoluteFill>
      )}

      {/* ── Teyro outro + loop back to the hook/cover ── */}
      <TeyroOutro at={S('cta')} until={end - 0.45} headline="The fun way to finish learning coding and AI." ask="Search Teyro" />
      <LoopBack from={end - 0.45} dur={0.4}>
        <AbsoluteFill style={{ background: LB.bg }}>
          <Backdrop />
          <div style={{ position: 'absolute', left: Z.gutter + 10, right: Z.gutter + 10, top: 400, textAlign: 'center' }}>
            {['STOP ADDING', 'SYMBOLS'].map((l) => <div key={l} style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 132, lineHeight: 0.95, letterSpacing: '-0.035em', color: LB.ink }}>{l}</div>)}
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 400 + 2 * 132 + 120 + 22, display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34 }}>
              <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 52, color: LB.problem }}>if you don't want to get hacked</div>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 620 }}>
                  <div style={{ fontFamily: FONT.mono, fontSize: 17, fontWeight: 700, letterSpacing: '0.1em', color: LB.inkSoft, marginBottom: 6 }}>PASSWORD</div>
                  <div style={{ height: 110, borderRadius: 14, border: `2.5px solid ${LB.accent}`, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 18px', fontFamily: FONT.mono, fontWeight: 700, fontSize: 58, color: LB.ink }}>P@ssw0rd!</div>
                </div>
                <div style={{ position: 'absolute', right: -30, top: -20, padding: '10px 29px', border: `7.5px solid ${LB.problem}`, borderRadius: 15, color: LB.problem, fontFamily: FONT.display, fontWeight: 700, fontSize: 84, letterSpacing: '0.04em', transform: 'rotate(-10deg)', background: 'rgba(255,255,255,0.85)' }}>STOP</div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </LoopBack>

      {/* ── host + captions ── */}
      <Host on={[[S('h3'), S('c1b') - 0.3], [S('t1'), S('punch') - 0.1]]}
        poses={[
          { t: 0, p: 'think' }, { t: c('hackers', 'h3'), p: 'wow' }, { t: c('follow', 'h3'), p: 'point' }, { t: S('c1a'), p: 'explain' }, { t: c('strange', 'c1a'), p: 'think' }, { t: c('away', 'c1a'), p: 'wow' },
          { t: S('t1'), p: 'pointUp' }, { t: c('Length', 't1'), p: 'wow' }, { t: S('t2'), p: 'point' }, { t: S('t3'), p: 'explain' }, { t: c('centuries', 't3'), p: 'wow' },
          { t: S('t4'), p: 'pointUp' }, { t: S('t5'), p: 'think' }, { t: c('Leaked', 't5'), p: 'wow' }, { t: S('cav'), p: 'explain' }, { t: S('recap'), p: 'point' }, { t: c('length', 'recap'), p: 'wow' },
        ]} />
      <Captions hideBetween={[[br.start, S('back') + 0.2]]} />
    </AbsoluteFill>
  );
};

/* ───────────── sound design ───────────── */
const SFX: SfxCue[] = [
  { t: 0.05, s: 'boom' }, { t: c('symbols', 'h1'), s: 'tick' }, { t: c('hacked', 'h1'), s: 'error', v: 0.8 },
  ...ticks(['Capital', 'Number', 'Symbol'].map((w) => c(w, 'h2')), 'pop'), { t: c('box', 'h2'), s: 'success', v: 0.6 }, { t: c('leaked', 'h2'), s: 'error' }, { t: c('leaked', 'h2') + 0.05, s: 'count' },
  { t: c('hackers', 'h3'), s: 'glitch', v: 0.6 }, { t: c('think', 'h3'), s: 'swoosh' }, { t: WORLD_AT, s: 'whoosh' },
  ...CHAPTERS.flatMap(([id]) => revealCues(S(id)).map((x) => ({ ...x, v: 0.55 }))),
  { t: c('type', 'c1a'), s: 'type', v: 0.6 }, { t: c('away', 'c1a'), s: 'swoosh' },
  { t: S('c1b') - 0.2, s: 'whoosh', v: 0.6 }, { t: c('Same', 'c1b'), s: 'shatter', v: 0.5 }, { t: c('out', 'c1b'), s: 'pop' }, { t: c('un-blend', 'c1b'), s: 'error', v: 0.6 },
  { t: c('keeps', 'c1c') - 0.4, s: 'whoosh', v: 0.6 }, ...ticks([0, 1, 2, 3].map((i) => c('keeps', 'c1c') + i * 0.15)), { t: c('match', 'c1c'), s: 'success', v: 0.6 },
  { t: c('hacked', 'c2a'), s: 'glitch' }, { t: c('hacked', 'c2a') + 0.05, s: 'error' }, { t: c('walk', 'c2a'), s: 'whoosh' }, { t: c('millions', 'c2a'), s: 'tick' },
  ...ticks([c('No', 'c2b'), c('Just', 'c2b'), c('guess', 'c2b')], 'pop'),
  ...ticks([c('Blend', 'c3a'), c('Compare', 'c3a')]), { t: c('Wrong', 'c3a'), s: 'error', v: 0.5 }, { t: c('Next', 'c3a'), s: 'tick' },
  { t: c('twenty', 'c3b'), s: 'count' }, { t: c('billion', 'c3b'), s: 'boom', v: 0.6 },
  { t: c('One', 'c4b'), s: 'pop' }, { t: c('Seen', 'c4b'), s: 'count' }, { t: c('password', 'c4b'), s: 'pop' }, { t: c('Fifty', 'c4b'), s: 'pop' },
  ...ticks([c('same', 'c4c'), c('Capital', 'c4c'), c('zero', 'c4c'), c('end', 'c4c')], 'pop'), { t: c('built', 'c4d'), s: 'tick' }, { t: c('instantly', 'c4d'), s: 'error' },
  { t: c('survive', 'c4e'), s: 'boom', v: 0.6 },
  { t: S('bridge'), s: 'chime' }, { t: S('back'), s: 'whoosh', v: 0.6 },
  { t: S('c5a') - 0.1, s: 'whoosh', v: 0.6 }, { t: c('same', 'c5a'), s: 'tick' }, { t: c('Crack', 'c5b'), s: 'error', v: 0.6 }, { t: c('tables', 'c5b'), s: 'pop' },
  { t: SALT_AT, s: 'success', v: 0.7 }, { t: c('totally', 'c5c'), s: 'glitch', v: 0.5 },
  { t: S('c6a') - 0.1, s: 'whoosh', v: 0.6 }, { t: c('fast', 'c6a') - 0.6, s: 'riser', v: 0.5 }, { t: SLOW_AT, s: 'success', v: 0.6 }, { t: c('Argon', 'c6b'), s: 'pop' },
  { t: c('card', 'c6c') - 0.4, s: 'whoosh', v: 0.6 }, { t: c('drops', 'c6c'), s: 'shatter', v: 0.6 }, { t: c('hundred', 'c6c'), s: 'count' },
  { t: c('Symbols', 't1'), s: 'tick' }, { t: c('list', 't1'), s: 'swoosh' }, { t: c('Length', 't1'), s: 'boom', v: 0.7 },
  ...ticks([c('four', 't2'), c('random', 't2'), c('words', 't2'), c('words', 't2') + 0.35], 'type'), { t: c('three', 't2'), s: 'count' },
  { t: c('fast', 't3'), s: 'swoosh' }, { t: c('slow', 't3'), s: 'swoosh' }, { t: c('centuries', 't3'), s: 'success', v: 0.7 },
  { t: c('stop', 't4'), s: 'pop' }, { t: c('fifteen', 't4'), s: 'pop' },
  ...ticks(['Correct', 'horse', 'battery', 'staple'].map((w) => c(w, 't5'))), { t: c('Leaked', 't5'), s: 'error' },
  { t: c('everywhere', 'cav'), s: 'success', v: 0.5 }, { t: c('easy', 'cav'), s: 'success', v: 0.5 },
  ...revealCues(S('recap')).map((x) => ({ ...x, v: 0.5 })), ...ticks(['Sites', 'Hackers', 'guess', 'Salt', 'length'].map((w) => c(w, 'recap')), 'pop'),
  { t: c("Don't", 'punch'), s: 'boom', v: 0.6 }, { t: c('long', 'punch'), s: 'boom', v: 0.8 },
  { t: S('cta'), s: 'whoosh' }, { t: S('cta') + 0.6, s: 'pop' },
];

export const M3: React.FC = () => (
  <MotionProvider look="lab" vo={vo}>
    <Scene />
    <SoundLayer slug={SLUG} sfx={SFX} />
  </MotionProvider>
);
