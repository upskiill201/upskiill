/* eslint-disable @next/next/no-img-element -- satori renders plain <img> */
import type { ReactNode } from 'react';
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
 * The certificate the founder approved on 2026-10-18 ("Option B: Bold"),
 * rebuilt for satori. Like the share cards (app/s/_art), every block sits at
 * a computed position — satori's flow layout drifts next to absolute art —
 * and hex values live here because a rendered PNG can't read CSS variables.
 *
 * Everything printed is the server snapshot in `cert.data`.
 */

const INK = '#071233';
const SLATE = '#64748B';
const MUTED = '#94A3B8';
const BLUE = '#0172FD';
const BLUE_DEEP = '#0050B3';
const NAVY = '#003478';
const GOLD = '#F59E0B';
const GOLD_LIGHT = '#FDE68A';

const PANEL_W = 540;
const CONTENT_X = 630;
const CONTENT_W = 880;

function abs(style: Record<string, number | string>): Record<string, number | string> {
  return { position: 'absolute', display: 'flex', ...style };
}

// ─── Left panel ──────────────────────────────────────────────────────────────

function Rays() {
  let d = '';
  const n = 22;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const b = a + Math.PI / n;
    d += `M1000 1000 L${(1000 + 1400 * Math.cos(a)).toFixed(1)} ${(1000 + 1400 * Math.sin(a)).toFixed(1)} L${(1000 + 1400 * Math.cos(b)).toFixed(1)} ${(1000 + 1400 * Math.sin(b)).toFixed(1)} Z `;
  }
  return (
    <svg width={2000} height={2000} viewBox="0 0 2000 2000" style={{ position: 'absolute', left: -730, top: -620, opacity: 0.12 }}>
      <path d={d} fill="#FFFFFF" />
    </svg>
  );
}

function Seal({ size, tey }: { size: number; tey: string }) {
  const n = 28;
  const R = size / 2;
  const r = R * 0.88;
  let pts = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 ? r : R;
    pts += `${(R + rr * Math.cos(a)).toFixed(1)},${(R + rr * Math.sin(a)).toFixed(1)} `;
  }
  const h = Math.round(size * 1.18);
  return (
    <div style={{ display: 'flex', position: 'relative', width: size, height: h }}>
      <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`} style={{ position: 'absolute', left: 0, top: 0 }}>
        <path d={`M${size * 0.3} ${size * 0.7} L${size * 0.2} ${size * 1.16} L${size * 0.33} ${size * 1.06} L${size * 0.42} ${size * 1.17} L${size * 0.48} ${size * 0.75}Z`} fill={NAVY} />
        <path d={`M${size * 0.7} ${size * 0.7} L${size * 0.8} ${size * 1.16} L${size * 0.67} ${size * 1.06} L${size * 0.58} ${size * 1.17} L${size * 0.52} ${size * 0.75}Z`} fill={BLUE_DEEP} />
      </svg>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', left: 0, top: 0 }}>
        <defs>
          <linearGradient id="seal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={GOLD_LIGHT} />
            <stop offset="1" stopColor={GOLD} />
          </linearGradient>
        </defs>
        <polygon points={pts} fill="url(#seal)" stroke="#D97706" strokeWidth={3} />
        <circle cx={R} cy={R} r={R * 0.72} fill="#FFFBEB" stroke={GOLD} strokeWidth={5} />
        <circle cx={R} cy={R} r={R * 0.64} fill="none" stroke="#FCD34D" strokeWidth={2} strokeDasharray="4 6" />
      </svg>
      <img src={tey} width={Math.round(size * 0.52)} height={Math.round(size * 0.52 * 1.163)} alt="" style={abs({ left: Math.round(size * 0.24), top: Math.round(size * 0.15) })} />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 202,
        height: 104,
        borderRadius: 22,
        background: '#FFFFFF',
        boxShadow: `0 6px 0 ${NAVY}`,
      }}
    >
      <div style={{ display: 'flex', fontSize: value.length > 5 ? 36 : 42, fontWeight: 800, color: INK, lineHeight: 1.05 }}>{value}</div>
      <div style={{ display: 'flex', marginTop: 4, fontSize: 16, fontWeight: 800, letterSpacing: 2, color: SLATE }}>{label.toUpperCase()}</div>
    </div>
  );
}

function stats(cert: Certificate): { value: string; label: string }[] {
  const d = cert.data;
  const out = [
    { value: String(d.lessons), label: 'Lessons' },
    { value: practiceTime(d.minutes), label: 'Practice' },
  ];
  out.push(d.xp > 0 ? { value: d.xp.toLocaleString('en-US'), label: 'XP earned' } : { value: String(d.chapters), label: 'Chapters' });
  out.push(
    d.bestStreak > 0
      ? { value: String(d.bestStreak), label: 'Best streak' }
      : d.xp > 0
        ? { value: String(d.chapters), label: 'Chapters' }
        : { value: d.isOriginal ? 'Original' : 'Course', label: 'Teyro' },
  );
  return out;
}

// ─── Right side ──────────────────────────────────────────────────────────────

const PHASES: { label: string; color: string; icon: IconName }[] = [
  { label: 'Learn', color: BLUE, icon: 'bookOpen' },
  { label: 'Apply', color: '#22C55E', icon: 'target' },
  { label: 'Reflect', color: '#9333EA', icon: 'lightbulb' },
  { label: 'Deepen', color: GOLD, icon: 'layers' },
];

function PhaseChip({ label, color, icon }: (typeof PHASES)[number]) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 18px 12px 12px',
        marginRight: 16,
        borderRadius: 999,
        background: '#FFFFFF',
        border: '3px solid #E2E8F0',
        boxShadow: '0 5px 0 #E2E8F0',
      }}
    >
      <div style={{ display: 'flex', width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', background: color }}>
        <LucideIcon name={icon} size={24} color="#FFFFFF" strokeWidth={2.6} />
      </div>
      <div style={{ display: 'flex', marginLeft: 12, fontSize: 22, fontWeight: 800, color: INK }}>{label}</div>
      <div style={{ display: 'flex', marginLeft: 10, width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', background: '#22C55E' }}>
        <LucideIcon name="check" size={16} color="#FFFFFF" strokeWidth={4} />
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
    <div style={{ display: 'flex', padding: 10, borderRadius: 14, background: '#FFFFFF', border: '3px solid #E2E8F0' }}>
      <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges">
        <path d={d} fill={INK} />
      </svg>
    </div>
  );
}

function nameSize(name: string): number {
  if (name.length <= 16) return 110;
  if (name.length <= 24) return 88;
  return 70;
}

function titleSize(title: string): number {
  if (title.length <= 26) return 56;
  if (title.length <= 40) return 48;
  return 42;
}

/** Rough wrapped line count across the content column (Jakarta ExtraBold ≈ 0.55em per glyph). */
function lines(text: string, size: number, width = CONTENT_W): number {
  return Math.max(1, Math.ceil((text.length * size * 0.55) / width));
}

/** Rows the skills pills wrap into (each pill ≈ text + icon + padding). */
function skillRows(skills: string[]): number {
  let rows = 1;
  let x = 0;
  for (const s of skills) {
    const w = s.length * 20 * 0.55 + 74;
    if (x > 0 && x + w > CONTENT_W) {
      rows += 1;
      x = 0;
    }
    x += w + 12;
  }
  return skills.length ? rows : 0;
}

export function CertificateArt({ cert, assets }: { cert: Certificate; assets: CertificateAssets }) {
  const d = cert.data;
  const { width, height } = CERTIFICATE_SIZE;
  const nSize = nameSize(d.learnerName);
  const tSize = titleSize(d.courseTitle);
  const meta = [d.isOriginal ? 'A Teyro Original' : 'A Teyro course', d.category, `${d.chapters} chapter${d.chapters === 1 ? '' : 's'}`]
    .filter(Boolean)
    .join('  ·  ');

  // Vertical rhythm of the right column, top to bottom.
  let y = 92;
  const at: Record<string, number> = {};
  at.eyebrow = y;
  y += 32 + 34;
  at.certifies = y;
  y += 36;
  at.name = y;
  y += Math.round(nSize * 1.02);
  at.bar = y + 4;
  y += 40;
  at.completed = y;
  y += 38;
  at.title = y;
  y += lines(d.courseTitle, tSize) * Math.round(tSize * 1.05) + 10;
  at.meta = y;
  y += 32 + 30;
  if (d.skills.length) {
    at.skillsLabel = y;
    y += 30;
    at.skills = y;
    y += skillRows(d.skills) * 56 + 18;
  }
  at.phasesLabel = y;
  y += 30;
  at.phases = y;

  const label = (text: string, top: number): ReactNode => (
    <div style={abs({ left: CONTENT_X, top, fontSize: 18, fontWeight: 800, letterSpacing: 3, color: MUTED })}>{text}</div>
  );

  return (
    <div style={{ width, height, display: 'flex', position: 'relative', overflow: 'hidden', fontFamily: 'Jakarta', color: INK, background: '#FFFDF7' }}>
      {/* ── Left: the blue trophy panel ── */}
      <div
        style={abs({
          left: 0,
          top: 0,
          width: PANEL_W,
          height,
          overflow: 'hidden',
          backgroundImage: `linear-gradient(170deg, #2B8CFF 0%, ${BLUE_DEEP} 70%, ${NAVY} 100%)`,
        })}
      >
        <Rays />
        <svg width={940} height={940} viewBox="0 0 940 940" style={{ position: 'absolute', left: -200, top: -50 }}>
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity={0.35} />
              <stop offset="0.6" stopColor="#FFFFFF" stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={470} cy={470} r={470} fill="url(#glow)" />
        </svg>
        <div style={abs({ left: 228, top: 84, width: 84, height: 84, borderRadius: 24, overflow: 'hidden', boxShadow: `0 0 0 5px rgba(255,255,255,0.9), 0 8px 0 5px ${NAVY}` })}>
          <img src={assets.tile} width={84} height={84} alt="" />
        </div>
        <div style={abs({ left: 120, top: 228 })}>
          <Seal size={300} tey={assets.tey} />
        </div>
        <div style={abs({ left: 0, top: 612, width: PANEL_W, justifyContent: 'center', fontSize: 22, fontWeight: 800, letterSpacing: 5, color: 'rgba(255,255,255,0.92)' })}>
          COURSE COMPLETE
        </div>
        <div style={abs({ left: 60, top: 674, width: 420, flexWrap: 'wrap', justifyContent: 'space-between' })}>
          {stats(cert).map((s, i) => (
            <div key={s.label} style={{ display: 'flex', marginBottom: i < 2 ? 16 : 0 }}>
              <Stat value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: the certificate ── */}
      <svg width={width - PANEL_W} height={height} viewBox={`0 0 ${width - PANEL_W} ${height}`} style={{ position: 'absolute', left: PANEL_W, top: 0 }}>
        <rect x={34} y={34} width={width - PANEL_W - 68} height={height - 68} rx={30} fill="none" stroke={GOLD} strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" />
      </svg>

      <div style={abs({ left: CONTENT_X, top: at.eyebrow, fontSize: 26, fontWeight: 800, letterSpacing: 6, color: BLUE })}>CERTIFICATE OF COMPLETION</div>
      <div style={abs({ left: CONTENT_X, top: at.certifies, fontSize: 26, fontWeight: 700, color: SLATE })}>This certifies that</div>
      <div style={abs({ left: CONTENT_X, top: at.name, width: CONTENT_W, fontFamily: 'Baloo', fontSize: nSize, fontWeight: 800, lineHeight: 1, color: INK })}>
        {d.learnerName}
      </div>
      <div style={abs({ left: CONTENT_X, top: at.bar, width: 440, height: 8, borderRadius: 8, backgroundImage: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD})` })} />
      <div style={abs({ left: CONTENT_X, top: at.completed, fontSize: 26, fontWeight: 700, color: SLATE })}>has completed the course</div>
      <div style={abs({ left: CONTENT_X, top: at.title, width: CONTENT_W, fontSize: tSize, fontWeight: 800, lineHeight: 1.05, letterSpacing: -tSize * 0.02, color: BLUE })}>
        {d.courseTitle}
      </div>
      <div style={abs({ left: CONTENT_X, top: at.meta, fontSize: 24, fontWeight: 700, color: '#475569' })}>{meta}</div>

      {d.skills.length > 0 && label('SKILLS PRACTISED', at.skillsLabel)}
      {d.skills.length > 0 && (
        <div style={abs({ left: CONTENT_X, top: at.skills, width: CONTENT_W, flexWrap: 'wrap' })}>
          {d.skills.map((s) => (
            <div
              key={s}
              style={{ display: 'flex', alignItems: 'center', margin: '0 12px 12px 0', padding: '10px 18px', borderRadius: 14, background: '#F1F5F9', fontSize: 20, fontWeight: 700, color: '#334155' }}
            >
              <LucideIcon name="sparkle" size={18} color={BLUE} fill={BLUE} />
              <div style={{ display: 'flex', marginLeft: 10 }}>{s}</div>
            </div>
          ))}
        </div>
      )}

      {label('EVERY LESSON, ALL FOUR PHASES', at.phasesLabel)}
      <div style={abs({ left: CONTENT_X, top: at.phases })}>
        {PHASES.map((p) => (
          <PhaseChip key={p.label} {...p} />
        ))}
      </div>

      {/* ── Footer: signature, credential ID, QR ── */}
      <div style={abs({ left: CONTENT_X, top: height - 84 - 92, width: 380, flexDirection: 'column' })}>
        <div style={{ display: 'flex', fontFamily: 'Signature', fontSize: d.signer.name.length > 18 ? 44 : 54, color: BLUE_DEEP, lineHeight: 1, marginLeft: 4 }}>{d.signer.name}</div>
        <div style={{ display: 'flex', height: 3, background: '#CBD5E1', marginTop: 6 }} />
        <div style={{ display: 'flex', marginTop: 10, fontSize: 20, fontWeight: 700, color: SLATE }}>
          {`${d.signer.title}  ·  ${formatCertificateDate(cert.completedAt)}`}
        </div>
      </div>
      <div style={abs({ left: width - 90 - 520, top: height - 84 - 142, width: 520, justifyContent: 'flex-end', alignItems: 'flex-end' })}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: 18 }}>
          <div style={{ display: 'flex', fontSize: 18, fontWeight: 700, color: SLATE }}>Credential ID</div>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>{credentialId(cert.code)}</div>
          <div style={{ display: 'flex', marginTop: 10, fontSize: 18, fontWeight: 700, color: SLATE }}>Verify at</div>
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 800, color: BLUE }}>{`teyro.app/c/${cert.code}`}</div>
        </div>
        <QR text={verifyUrl(cert.code)} size={118} />
      </div>

      {cert.revoked && (
        <div style={abs({ left: CONTENT_X - 30, top: 470, width: 940, justifyContent: 'center', transform: 'rotate(-12deg)' })}>
          <div style={{ display: 'flex', padding: '16px 48px', border: '8px solid #EF4444', borderRadius: 20, color: '#EF4444', fontSize: 72, fontWeight: 800, letterSpacing: 8, background: 'rgba(255,255,255,0.85)' }}>
            REVOKED
          </div>
        </div>
      )}
    </div>
  );
}
