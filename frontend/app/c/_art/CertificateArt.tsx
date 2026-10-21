/* eslint-disable @next/next/no-img-element -- satori renders plain <img> */
import { LucideIcon, type IconName } from './lucideNode';
import QRCode from 'qrcode';
import {
  type Certificate,
  CERTIFICATE_SIZE,
  credentialId,
  formatCertificateDate,
  practiceTime,
  verifyUrl,
} from '@/lib/certificates/types';
import type { CertificateAssets } from './assets';

/**
 * The course certificate, redesigned 2026-10-21 ("Gold Medal"): a navy frame
 * around cream paper, a gold double border and guilloche watermark, a gold
 * medal with the app tile at its heart (never the Tey mascot), and the
 * learner's stats as game-style badges. Like the share cards (app/s/_art),
 * every block sits at a computed position — satori's flow layout drifts next
 * to absolute art — and hex values live here because a rendered PNG can't
 * read CSS variables.
 *
 * Everything printed is the server snapshot in `cert.data`.
 */

const INK = '#071233';
const SLATE = '#64748B';
const BLUE = '#0172FD';
const BLUE_DEEP = '#0050B3';
const NAVY = '#003478';
const NAVY_DARK = '#04163F';
const GOLD = '#F59E0B';
const GOLD_DEEP = '#B45309';
const GOLD_MID = '#FBBF24';
const GOLD_LIGHT = '#FDE68A';
const PAPER = '#FFFCF3';
const GREEN = '#22C55E';
const PURPLE = '#9333EA';

const { width: W, height: H } = CERTIFICATE_SIZE;
const CX = W / 2;
const INSET = 40; // navy frame thickness
const BORDER = 66; // gold border inset

function abs(style: Record<string, number | string>): Record<string, number | string> {
  return { position: 'absolute', display: 'flex', ...style };
}

/** A row centred across the whole canvas. */
function centred(top: number, extra: Record<string, number | string> = {}): Record<string, number | string> {
  return abs({ left: 0, top, width: W, justifyContent: 'center', ...extra });
}

function starPoints(cx: number, cy: number, R: number, r: number, n: number, rot = -Math.PI / 2): string {
  let pts = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 + rot;
    const rr = i % 2 ? r : R;
    pts += `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)} `;
  }
  return pts;
}

// ─── Paper, frame and watermark ──────────────────────────────────────────────

function Corner({ x, y, sx, sy }: { x: number; y: number; sx: 1 | -1; sy: 1 | -1 }) {
  // An L of two gold rules plus a four-point sparkle, mirrored per corner.
  return (
    <g transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
      <path d="M0 70 L0 0 L70 0" fill="none" stroke="url(#gold)" strokeWidth={5} strokeLinecap="round" />
      <path d="M14 46 L14 14 L46 14" fill="none" stroke={GOLD} strokeWidth={2} strokeLinecap="round" />
      <polygon points={starPoints(0, 0, 20, 5, 4, 0)} fill="url(#gold)" stroke={GOLD_DEEP} strokeWidth={1.5} />
    </g>
  );
}

function Backdrop() {
  const bw = W - BORDER * 2;
  const bh = H - BORDER * 2;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', left: 0, top: 0 }}>
      <defs>
        <linearGradient id="frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={BLUE_DEEP} />
          <stop offset="0.55" stopColor={NAVY} />
          <stop offset="1" stopColor={NAVY_DARK} />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} />
          <stop offset="0.45" stopColor={GOLD_MID} />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
        <radialGradient id="paperGlow" cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor={PAPER} />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#frame)" />
      <circle cx={W * 0.12} cy={H * 0.1} r={420} fill="#FFFFFF" fillOpacity={0.05} />
      <circle cx={W * 0.92} cy={H * 0.95} r={380} fill="#FFFFFF" fillOpacity={0.04} />
      <rect x={INSET} y={INSET} width={W - INSET * 2} height={H - INSET * 2} rx={26} fill="url(#paperGlow)" />
      <g
        transform={`translate(${CX} 470)`}
        fill="none"
        stroke={BLUE}
        strokeOpacity={0.06}
        strokeWidth={1.4}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse key={i} cx={0} cy={0} rx={360} ry={118} transform={`rotate(${i * 7.5})`} />
        ))}
      </g>
      <rect x={BORDER} y={BORDER} width={bw} height={bh} rx={14} fill="none" stroke="url(#gold)" strokeWidth={5} />
      <rect x={BORDER + 12} y={BORDER + 12} width={bw - 24} height={bh - 24} rx={8} fill="none" stroke={GOLD} strokeOpacity={0.7} strokeWidth={1.5} />
      {Corner({ x: BORDER, y: BORDER, sx: 1, sy: 1 })}
      {Corner({ x: W - BORDER, y: BORDER, sx: -1, sy: 1 })}
      {Corner({ x: BORDER, y: H - BORDER, sx: 1, sy: -1 })}
      {Corner({ x: W - BORDER, y: H - BORDER, sx: -1, sy: -1 })}
    </svg>
  );
}

// ─── Headline pieces ─────────────────────────────────────────────────────────

function Banner({ text }: { text: string }) {
  const w = 470;
  const h = 58;
  return (
    <div style={{ display: 'flex', position: 'relative', width: w, height: h + 12 }}>
      <svg width={w} height={h + 12} viewBox={`0 0 ${w} ${h + 12}`} style={{ position: 'absolute', left: 0, top: 0 }}>
        <defs>
          <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={GOLD_MID} />
            <stop offset="1" stopColor={GOLD} />
          </linearGradient>
        </defs>
        {/* Tails tuck behind the band, with a notch cut in each end. */}
        <polygon points={`0,14 64,14 64,${h + 12} 0,${h + 12} 22,${(h + 26) / 2}`} fill={GOLD_DEEP} />
        <polygon points={`${w},14 ${w - 64},14 ${w - 64},${h + 12} ${w},${h + 12} ${w - 22},${(h + 26) / 2}`} fill={GOLD_DEEP} />
        <polygon points={`40,${h} 64,${h + 12} 64,${h}`} fill="#7C2D12" />
        <polygon points={`${w - 40},${h} ${w - 64},${h + 12} ${w - 64},${h}`} fill="#7C2D12" />
        <rect x={40} y={0} width={w - 80} height={h} rx={6} fill="url(#band)" />
        <rect x={48} y={7} width={w - 96} height={h - 14} rx={4} fill="none" stroke="#FFFFFF" strokeOpacity={0.55} strokeWidth={1.5} strokeDasharray="3 5" />
      </svg>
      <div style={abs({ left: 40, top: 0, width: w - 80, height: h, alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, letterSpacing: 7, color: '#FFFFFF' })}>
        {text}
      </div>
    </div>
  );
}

function Flourish() {
  const w = 680;
  const m = w / 2;
  return (
    <svg width={w} height={28} viewBox={`0 0 ${w} 28`}>
      <defs>
        <linearGradient id="ruleL" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={m - 40} y2={0}>
          <stop offset="0" stopColor={GOLD} stopOpacity={0} />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
        <linearGradient id="ruleR" gradientUnits="userSpaceOnUse" x1={m + 40} y1={0} x2={w} y2={0}>
          <stop offset="0" stopColor={GOLD} />
          <stop offset="1" stopColor={GOLD} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`M0 14 L${m - 40} 14`} stroke="url(#ruleL)" strokeWidth={4} strokeLinecap="round" />
      <path d={`M${m + 40} 14 L${w} 14`} stroke="url(#ruleR)" strokeWidth={4} strokeLinecap="round" />
      <circle cx={m - 26} cy={14} r={4} fill={GOLD} />
      <circle cx={m + 26} cy={14} r={4} fill={GOLD} />
      <polygon points={starPoints(m, 14, 14, 5, 4, 0)} fill={GOLD} stroke={GOLD_DEEP} strokeWidth={1} />
    </svg>
  );
}

// ─── Stats as game badges ────────────────────────────────────────────────────

type StatIcon = { kind: 'lucide'; name: IconName; color: string } | { kind: 'img'; src: string };

function Stat({ value, label, icon }: { value: string; label: string; icon: StatIcon }) {
  const tint = icon.kind === 'lucide' ? icon.color : GOLD;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 252,
        height: 100,
        margin: '0 10px',
        padding: '0 18px',
        borderRadius: 24,
        background: '#FFFFFF',
        border: '3px solid #E6ECF5',
        boxShadow: '0 6px 0 #DCE4F0',
      }}
    >
      <div style={{ display: 'flex', width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', background: `${tint}1F` }}>
        {icon.kind === 'lucide' ? (
          <LucideIcon name={icon.name} size={32} color={icon.color} strokeWidth={2.4} />
        ) : (
          <img src={icon.src} width={40} height={40} alt="" />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 16 }}>
        <div style={{ display: 'flex', fontSize: value.length > 5 ? 34 : 40, fontWeight: 800, color: INK, lineHeight: 1.05 }}>{value}</div>
        <div style={{ display: 'flex', marginTop: 2, fontSize: 15, fontWeight: 800, letterSpacing: 2, color: SLATE }}>{label.toUpperCase()}</div>
      </div>
    </div>
  );
}

function stats(cert: Certificate, assets: CertificateAssets): { value: string; label: string; icon: StatIcon }[] {
  const d = cert.data;
  const chapters = { value: String(d.chapters), label: d.chapters === 1 ? 'Chapter' : 'Chapters', icon: { kind: 'lucide', name: 'layers', color: GREEN } as StatIcon };
  const out = [
    { value: String(d.lessons), label: 'Lessons', icon: { kind: 'lucide', name: 'bookOpenCheck', color: BLUE } as StatIcon },
    { value: practiceTime(d.minutes), label: 'Practice', icon: { kind: 'lucide', name: 'clock', color: PURPLE } as StatIcon },
  ];
  out.push(d.xp > 0 ? { value: d.xp.toLocaleString('en-US'), label: 'XP earned', icon: { kind: 'img', src: assets.xp } } : chapters);
  out.push(
    d.bestStreak > 0
      ? { value: `${d.bestStreak}d`, label: 'Best streak', icon: { kind: 'img', src: assets.streak } }
      : d.xp > 0
        ? chapters
        : { value: '100%', label: 'Complete', icon: { kind: 'lucide', name: 'sparkle', color: GOLD } },
  );
  return out;
}

// ─── The medal ───────────────────────────────────────────────────────────────

function Medal({ size, tile }: { size: number; tile: string }) {
  const R = size / 2;
  const h = Math.round(size * 1.32);
  const ring = R * 0.8;
  const laurelR = R * 0.62;
  const leaves: { x: number; y: number; deg: number }[] = [];
  for (let i = 0; i < 9; i++) {
    const phi = ((22 + i * 15) * Math.PI) / 180; // from the bottom, up each side
    for (const side of [-1, 1]) {
      const x = R + side * laurelR * Math.sin(phi);
      const y = R + laurelR * Math.cos(phi);
      const deg = side * ((phi * 180) / Math.PI) + (side === -1 ? 90 : -90) + side * 28;
      leaves.push({ x, y, deg });
    }
  }
  const tileSize = Math.round(size * 0.38);
  return (
    <div style={{ display: 'flex', position: 'relative', width: size, height: h }}>
      <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`} style={{ position: 'absolute', left: 0, top: 0 }}>
        <defs>
          <linearGradient id="medalGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={GOLD_LIGHT} />
            <stop offset="0.5" stopColor={GOLD_MID} />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="medalFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BLUE_DEEP} />
            <stop offset="1" stopColor={NAVY_DARK} />
          </linearGradient>
        </defs>
        {/* Ribbon tails */}
        <polygon points={`${size * 0.3},${size * 0.72} ${size * 0.14},${h} ${size * 0.27},${h - size * 0.09} ${size * 0.39},${h - size * 0.02} ${size * 0.5},${size * 0.8}`} fill={BLUE} stroke={GOLD} strokeWidth={3} />
        <polygon points={`${size * 0.7},${size * 0.72} ${size * 0.86},${h} ${size * 0.73},${h - size * 0.09} ${size * 0.61},${h - size * 0.02} ${size * 0.5},${size * 0.8}`} fill={NAVY} stroke={GOLD} strokeWidth={3} />
        {/* Scalloped gold edge, then the navy face */}
        <polygon points={starPoints(R, R, R, R * 0.9, 32)} fill="url(#medalGold)" stroke={GOLD_DEEP} strokeWidth={2} />
        <circle cx={R} cy={R} r={ring} fill="url(#medalFace)" stroke={GOLD_LIGHT} strokeWidth={4} />
        <circle cx={R} cy={R} r={ring - 9} fill="none" stroke={GOLD_MID} strokeOpacity={0.8} strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" />
        <g fill="url(#medalGold)">
          {leaves.map(({ x, y, deg }) => (
            <ellipse key={`${x.toFixed(1)}-${y.toFixed(1)}`} cx={x} cy={y} rx={size * 0.052} ry={size * 0.021} transform={`rotate(${deg.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})`} />
          ))}
        </g>
        <polygon points={starPoints(R, R - laurelR - 2, size * 0.06, size * 0.025, 5)} fill={GOLD_MID} stroke={GOLD_DEEP} strokeWidth={1} />
        <circle cx={R} cy={R} r={tileSize / 2 + 7} fill="#FFFFFF" />
      </svg>
      <div style={abs({ left: R - tileSize / 2, top: R - tileSize / 2, width: tileSize, height: tileSize, borderRadius: tileSize / 2, overflow: 'hidden' })}>
        <img src={tile} width={tileSize} height={tileSize} alt="" />
      </div>
    </div>
  );
}

function QR({ text, size }: { text: string; size: number }) {
  const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const n = qr.modules.size;
  let d = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) if (qr.modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
  }
  return (
    <div style={{ display: 'flex', padding: 9, borderRadius: 14, background: '#FFFFFF', border: `3px solid ${GOLD_LIGHT}` }}>
      <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges">
        <path d={d} fill={INK} />
      </svg>
    </div>
  );
}

// ─── Sizing ──────────────────────────────────────────────────────────────────

/** Baloo 2 ExtraBold runs ≈ 0.56em per glyph; keep the name inside ~1100px. */
function nameSize(name: string): number {
  return Math.max(56, Math.min(118, Math.floor(1100 / (Math.max(1, name.length) * 0.56))));
}

function titleSize(title: string): number {
  if (title.length <= 30) return 56;
  if (title.length <= 44) return 48;
  return 42;
}

const TITLE_W = 1240;
/** Where the body must end so it clears the medal. */
const CONTENT_END = 830;

/** Rough wrapped line count (Jakarta ExtraBold ≈ 0.52em per glyph at these sizes). */
function lines(text: string, size: number, width = TITLE_W): number {
  return Math.max(1, Math.ceil((text.length * size * 0.52) / width));
}

const PHASES: { label: string; color: string }[] = [
  { label: 'Learn', color: BLUE },
  { label: 'Apply', color: GREEN },
  { label: 'Reflect', color: PURPLE },
  { label: 'Deepen', color: GOLD },
];

export function CertificateArt({ cert, assets }: { cert: Certificate; assets: CertificateAssets }) {
  const d = cert.data;
  const nSize = nameSize(d.learnerName);
  const tSize = titleSize(d.courseTitle);
  const meta = [d.isOriginal ? 'A Teyro Original' : 'A Teyro course', d.category, `${d.chapters} chapter${d.chapters === 1 ? '' : 's'}`]
    .filter(Boolean)
    .join('  ·  ');
  const longestSkill = d.skills.reduce((m, s) => Math.max(m, s.length), 0);
  const skillSize = longestSkill > 52 ? 16 : longestSkill > 44 ? 18 : 20;
  const titleLines = lines(d.courseTitle, tSize);

  // Vertical rhythm, top to bottom. A two-line title borrows from the gaps.
  const tight = titleLines > 1 ? 10 : 0;
  let y = 100;
  const at: Record<string, number> = {};
  at.word = y;
  y += 72 + 18;
  at.banner = y;
  y += 70 + 16 - tight;
  at.presented = y;
  y += 38;
  at.name = y;
  y += Math.round(nSize * 1.1); // room for descenders and dots below (Ọ, ẹ)
  at.flourish = y;
  y += 28 + 18 - tight;
  at.completing = y;
  y += 36;
  at.title = y;
  y += titleLines * Math.round(tSize * 1.08) + (titleLines > 1 ? 16 : 8);
  at.meta = y;
  y += 30 + 30 - tight;
  at.stats = y;
  y += 106 + 28 - tight;
  at.skills = y;
  y += Math.ceil(d.skills.length / 2) * 38;

  // A short certificate (one-line name, no skills) centres its body above the medal.
  const slack = Math.max(0, Math.floor((CONTENT_END - y) / 2));
  for (const k of Object.keys(at)) if (k !== 'word' && k !== 'banner') at[k] += slack;

  return (
    <div style={{ width: W, height: H, display: 'flex', position: 'relative', overflow: 'hidden', fontFamily: 'Jakarta', color: INK, background: NAVY }}>
      <Backdrop />

      <div
        style={centred(at.word, {
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: 22,
          lineHeight: 1,
          color: NAVY,
          paddingLeft: 22, // balance the trailing letter-space so the word sits centred
        })}
      >
        CERTIFICATE
      </div>
      <div style={centred(at.banner)}>
        <Banner text="OF ACHIEVEMENT" />
      </div>

      <div style={centred(at.presented, { fontSize: 26, fontWeight: 700, color: SLATE })}>This is proudly presented to</div>
      <div style={centred(at.name, { fontFamily: 'Baloo', fontSize: nSize, fontWeight: 800, lineHeight: 1, color: INK })}>{d.learnerName}</div>
      <div style={centred(at.flourish)}>
        <Flourish />
      </div>

      <div style={centred(at.completing, { fontSize: 24, fontWeight: 700, color: SLATE })}>for completing every lesson of</div>
      <div style={abs({ left: (W - TITLE_W) / 2, top: at.title, width: TITLE_W, justifyContent: 'center', textAlign: 'center', fontSize: tSize, fontWeight: 800, lineHeight: 1.08, letterSpacing: -tSize * 0.02, color: BLUE })}>
        {d.courseTitle}
      </div>
      <div style={centred(at.meta, { alignItems: 'center', fontSize: 22, fontWeight: 700, color: '#475569' })}>
        <div style={{ display: 'flex' }}>{meta}</div>
        <div style={{ display: 'flex', marginLeft: 18, marginRight: 14, width: 6, height: 6, borderRadius: 3, background: '#CBD5E1' }} />
        {PHASES.map((p, i) => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', marginLeft: i ? 12 : 0 }}>
            <div style={{ display: 'flex', width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center', background: p.color }}>
              <LucideIcon name="check" size={12} color="#FFFFFF" strokeWidth={4} />
            </div>
            <div style={{ display: 'flex', marginLeft: 6, fontSize: 20, color: INK }}>{p.label}</div>
          </div>
        ))}
      </div>

      <div style={centred(at.stats)}>
        {stats(cert, assets).map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>

      {d.skills.length > 0 && (
        <div style={abs({ left: 230, top: at.skills, width: W - 460, flexWrap: 'wrap', justifyContent: d.skills.length === 1 ? 'center' : 'flex-start' })}>
          {d.skills.map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', width: d.skills.length === 1 ? 'auto' : (W - 460) / 2, height: 38 }}>
              <div style={{ display: 'flex', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', background: GREEN, flexShrink: 0 }}>
                <LucideIcon name="check" size={15} color="#FFFFFF" strokeWidth={4} />
              </div>
              <div style={{ display: 'flex', marginLeft: 12, fontSize: skillSize, fontWeight: 700, color: '#334155' }}>{s}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Footer: signature · medal · credential ── */}
      <div style={abs({ left: 140, top: H - 214, width: 420, flexDirection: 'column' })}>
        <div style={{ display: 'flex', fontFamily: 'Signature', fontSize: d.signer.name.length > 18 ? 46 : 56, color: BLUE_DEEP, lineHeight: 1, marginLeft: 4 }}>{d.signer.name}</div>
        <div style={{ display: 'flex', height: 3, backgroundImage: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`, marginTop: 6 }} />
        <div style={{ display: 'flex', marginTop: 10, fontSize: 19, fontWeight: 800, color: INK }}>{d.signer.title}</div>
        <div style={{ display: 'flex', marginTop: 2, fontSize: 18, fontWeight: 700, color: SLATE }}>{`Awarded ${formatCertificateDate(cert.completedAt)}`}</div>
      </div>

      <div style={abs({ left: CX - 110, top: H - 268 })}>
        <Medal size={220} tile={assets.tile} />
      </div>

      <div style={abs({ left: W - 140 - 520, top: H - 236, width: 520, justifyContent: 'flex-end', alignItems: 'flex-end' })}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 18 }}>
          <div style={{ display: 'flex', fontSize: 16, fontWeight: 800, letterSpacing: 2, color: SLATE }}>CREDENTIAL ID</div>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>{credentialId(cert.code)}</div>
          <div style={{ display: 'flex', marginTop: 10, fontSize: 16, fontWeight: 800, letterSpacing: 2, color: SLATE }}>VERIFY AT</div>
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 800, color: BLUE }}>{`teyro.app/c/${cert.code}`}</div>
        </div>
        <QR text={verifyUrl(cert.code)} size={112} />
      </div>

      {cert.revoked && (
        <div style={abs({ left: 0, top: 440, width: W, justifyContent: 'center', transform: 'rotate(-12deg)' })}>
          <div style={{ display: 'flex', padding: '16px 48px', border: '8px solid #EF4444', borderRadius: 20, color: '#EF4444', fontSize: 72, fontWeight: 800, letterSpacing: 8, background: 'rgba(255,255,255,0.85)' }}>
            REVOKED
          </div>
        </div>
      )}
    </div>
  );
}
