import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { CheckCircle2, ChevronDown, FileText, Folder, FlaskConical, GitBranch, GitCommitHorizontal, GitMerge, GitPullRequest, MousePointer2, Package, Rocket } from 'lucide-react';
import { AbsoluteFill } from 'remotion';
import { BODY, C, DISPLAY, E, MONO, Q, k, last, lerp, shake, sp } from './lib';
import { Burst, Confetti, Odo, Shock, Smear, Words, pop } from './fx';
import { NightBg } from './common';

const GH = { bg: '#0D1117', card: '#161B22', line: '#30363D', text: '#E6EDF3', dim: '#8B949E', link: '#4493F8' };

/** Big left-column headline that swaps on cues, with a mono caption typed under it. */
const Head: React.FC<{ t: number; items: { at: number; word: string; dot: string; cap: string }[]; x?: number; y?: number; size?: number }> = ({ t, items, x = 100, y = 330, size = 140 }) => {
  const i = last(t, items.map((d) => d.at));
  if (i < 0) return null;
  const it = items[i], next = items[i + 1];
  const capN = Math.floor(k(t, it.at + 0.15, it.at + 0.6, E.linear) * it.cap.length);
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <Words key={i} t={t} text={it.word} at={it.at} out={next ? next.at - 0.14 : undefined} size={size} by="char" stagger={0.026} hi={{ [it.word.length - 1]: it.dot }} />
      <div style={{ marginTop: 18, fontFamily: MONO, fontSize: 30, color: GH.dim, height: 40 }}>{it.cap.slice(0, capN)}<span style={{ opacity: capN < it.cap.length ? 1 : 0, color: GH.text }}>▍</span></div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 8–12 s  Push → the repo assembles. Review → a pull request is approved and merged.
// ════════════════════════════════════════════════════════════════════════════
const FILES: [string, boolean, string][] = [
  ['.github/workflows', true, 'Add CI workflow'],
  ['src', true, 'Add login page'],
  ['.gitignore', false, 'Ignore node_modules'],
  ['README.md', false, 'Write the README'],
  ['index.html', false, 'Initial commit'],
];

export const SGitHub: React.FC<{ t: number }> = ({ t }) => {
  const enter = sp(t, Q.push, { damping: 15, stiffness: 120, mass: 0.9 });
  const exit = k(t, 11.66, 12.0, E.inExpo);
  const pr = sp(t, Q.pr, { damping: 16, stiffness: 140, mass: 0.8 });
  const prSlide = k(t, Q.pr - 0.05, Q.pr + 0.22, E.outExpo);
  const merged = t >= Q.merged;
  const sh = shake(t, [[Q.merged, 0.5]]);
  const commits = 9 + k(t, Q.push + 0.35, Q.push + 0.9, E.outCubic) * 3;
  // cursor: glides in, presses the merge button on the beat
  const cur = k(t, 10.55, 10.9, E.inOutCubic);
  const press = t > 10.9 && t < 11.04;

  return (
    <AbsoluteFill style={{ background: GH.bg }}>
      <NightBg t={t} hue="#1F6FEB" hue2={C.ghPurple} floor={false} />
      <Smear amt={exit * 70} id="ghx" style={{ transform: `translateX(${-exit * 2600}px) translate(${sh.x}px, ${sh.y}px)` }}>
        <Head t={t} items={[{ at: Q.push, word: 'Push.', dot: C.blue, cap: 'git push origin main' }, { at: Q.pr, word: 'Review.', dot: C.green, cap: 'Pull request #42' }, { at: Q.merged, word: 'Ship.', dot: C.ghPurple, cap: 'Merged into main' }]} />
        {/* commits flying up into the repo */}
        {[0, 1, 2].map((i) => {
          const p = k(t, Q.push + i * 0.07, Q.push + 0.42 + i * 0.07, E.inOutCubic);
          if (p <= 0 || p >= 1) return null;
          const x = lerp(260, 1000, p), y = lerp(1080, 320, p) - Math.sin(p * Math.PI) * 220;
          return <div key={i} style={{ position: 'absolute', left: x - 18, top: y - 18, width: 36, height: 36, borderRadius: '50%', border: `8px solid ${C.blue}`, background: '#fff', boxShadow: `0 0 30px ${C.blue}`, boxSizing: 'border-box' }} />;
        })}
        {/* repo card */}
        <div style={{ position: 'absolute', left: 760, top: 150, width: 1050, height: 570, perspective: 1600 }}>
          <div style={{ width: '100%', height: '100%', background: GH.card, border: `2px solid ${GH.line}`, borderRadius: 22, boxShadow: '0 40px 120px rgba(0,0,0,0.55)', transform: `translateY(${(1 - enter) * 260}px) rotateX(${(1 - enter) * 38}deg) scale(${0.86 + enter * 0.14})`, opacity: Math.min(1, enter * 2), overflow: 'hidden', fontFamily: BODY, filter: t > Q.pr ? `brightness(${1 - pr * 0.35})` : undefined }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '26px 32px', borderBottom: `2px solid ${GH.line}` }}>
              <FaGithub size={46} color={GH.text} />
              <span style={{ fontSize: 30, color: GH.link }}>you</span><span style={{ fontSize: 30, color: GH.dim }}>/</span><span style={{ fontSize: 30, color: GH.link, fontWeight: 700 }}>my-first-repo</span>
              <span style={{ fontSize: 20, color: GH.dim, border: `2px solid ${GH.line}`, borderRadius: 999, padding: '3px 14px' }}>Public</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#21262D', border: `2px solid ${GH.line}`, borderRadius: 12, padding: '8px 18px', fontSize: 24, color: GH.text, fontWeight: 600 }}><GitBranch size={24} />main<ChevronDown size={20} /></div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, color: GH.text }}><GitCommitHorizontal size={28} color={GH.dim} /><Odo value={commits} size={26} color={GH.text} weight={700} font={BODY} /> commits</div>
            </div>
            <div style={{ margin: '0 32px', border: `2px solid ${GH.line}`, borderRadius: 14, overflow: 'hidden' }}>
              {FILES.map(([name, dir, msg], i) => {
                const p = pop(t, Q.files[i]);
                return (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 18, height: 70, padding: '0 22px', borderTop: i ? `2px solid ${GH.line}` : 'none', fontSize: 24, transform: `translateX(${(1 - p) * -40}px)`, opacity: Math.min(1, p * 1.5), background: Math.exp(-(t - Q.files[i]) * 6) > 0.05 && t > Q.files[i] ? `rgba(68,147,248,${Math.exp(-(t - Q.files[i]) * 6) * 0.25})` : 'transparent' }}>
                    {dir ? <Folder size={28} color="#54AEFF" fill="#54AEFF" /> : <FileText size={28} color={GH.dim} />}
                    <span style={{ color: GH.text, width: 300 }}>{name}</span>
                    <span style={{ color: GH.dim, flex: 1 }}>{msg}</span>
                    <span style={{ color: GH.dim }}>now</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* pull request card */}
        {t >= Q.pr - 0.05 && (
          <Smear amt={(1 - prSlide) * 40} id="prx" style={{ transform: `translateX(${(1 - prSlide) * 1300}px) rotate(${(1 - pr) * -5}deg)` }}>
            <div style={{ position: 'absolute', left: 700, top: 500, width: 1120, height: 500, background: GH.card, border: `3px solid ${merged ? C.ghPurple : GH.line}`, borderRadius: 24, boxShadow: `0 50px 140px rgba(0,0,0,0.6), 0 0 ${merged ? 80 * Math.exp(-(t - Q.merged) * 3) : 0}px ${C.ghPurple}`, padding: '34px 40px', fontFamily: BODY, boxSizing: 'border-box' }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: GH.text }}>Add login page <span style={{ color: GH.dim, fontWeight: 400 }}>#42</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 18 }}>
                <StatePill t={t} merged={merged} />
                <span style={{ fontSize: 23, color: GH.dim }}><b style={{ color: GH.text }}>you</b> {merged ? 'merged' : 'wants to merge'} 3 commits into <Code>main</Code> from <Code>feature/login</Code></span>
              </div>
              <div style={{ height: 2, background: GH.line, margin: '26px 0' }} />
              {/* review */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: Math.min(1, pop(t, Q.approve) * 1.4), transform: `translateY(${(1 - pop(t, Q.approve)) * 20}px)` }}>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#EF4444)', display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 24, color: '#fff' }}>AO</div>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: C.ghGreen, display: 'grid', placeItems: 'center', transform: `scale(${pop(t, Q.approve + 0.06)})` }}><CheckCircle2 size={34} color="#fff" /></div>
                <span style={{ fontSize: 26, color: GH.text }}><b>teammate</b> <span style={{ color: GH.dim }}>approved these changes</span></span>
                <span style={{ marginLeft: 'auto', fontSize: 24, color: GH.text, background: '#21262D', borderRadius: 14, padding: '10px 20px', border: `2px solid ${GH.line}` }}>“Looks great. Ship it!”</span>
              </div>
              {/* merge box */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 34, padding: '22px 26px', borderRadius: 16, border: `2px solid ${merged ? C.ghPurple : C.ghGreen}`, background: merged ? 'rgba(137,87,229,0.12)' : 'rgba(35,134,54,0.10)' }}>
                {merged ? <GitMerge size={40} color={C.ghPurple} /> : <CheckCircle2 size={40} color={C.ghGreen} />}
                <span style={{ fontSize: 26, color: GH.text, fontWeight: 600 }}>{merged ? 'Pull request successfully merged and closed' : 'This branch has no conflicts with the base branch'}</span>
                <div style={{ marginLeft: 'auto', padding: '14px 28px', borderRadius: 12, background: merged ? C.ghPurple : C.ghGreen, color: '#fff', fontWeight: 700, fontSize: 26, transform: `scale(${press ? 0.93 : 1 + (merged ? Math.exp(-(t - Q.merged) * 8) * 0.08 : 0)})`, whiteSpace: 'nowrap' }}>{merged ? 'Merged' : 'Merge pull request'}</div>
              </div>
            </div>
            {t > 10.5 && t < 11.5 && (
              <div style={{ position: 'absolute', left: lerp(1900, 1640, cur), top: lerp(1100, 905, cur), transform: `scale(${press ? 0.85 : 1})`, opacity: 1 - k(t, 11.2, 11.45) }}>
                <MousePointer2 size={56} color="#fff" fill="#0D1117" strokeWidth={2.2} />
              </div>
            )}
            <Shock t={t} at={Q.merged} x={1640} y={910} r={520} color={C.ghPurple} width={18} />
            <Burst t={t} at={Q.merged} x={1640} y={910} n={16} dist={360} colors={['#fff', C.ghPurple, '#D2A8FF']} />
            <Confetti t={t} at={Q.merged} x={1640} y={880} n={40} colors={[C.ghPurple, '#D2A8FF', '#fff', C.green, C.gold]} spread={900} />
          </Smear>
        )}
      </Smear>
    </AbsoluteFill>
  );
};

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ fontFamily: MONO, fontSize: 21, color: GH.link, background: 'rgba(56,139,253,0.15)', borderRadius: 8, padding: '3px 10px' }}>{children}</span>;
const StatePill: React.FC<{ t: number; merged: boolean }> = ({ t, merged }) => {
  const s = merged ? 1 + Math.exp(-(t - Q.merged) * 7) * 0.35 : 1;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 999, background: merged ? C.ghPurple : C.ghGreen, color: '#fff', fontWeight: 700, fontSize: 24, transform: `scale(${s})`, transformOrigin: '0 50%' }}>
      {merged ? <GitMerge size={26} /> : <GitPullRequest size={26} />}{merged ? 'Merged' : 'Open'}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// 12–16 s  Automate. The workflow file types itself; jobs go green on the snare roll.
// ════════════════════════════════════════════════════════════════════════════
const YAML: [number, [string, string][]][] = [
  [0, [['name', '#7DD3FC'], [': ', '#8B98C9'], ['CI', '#86EFAC']]],
  [0, [['on', '#7DD3FC'], [': ', '#8B98C9'], ['[push, pull_request]', '#F9A8D4']]],
  [0, [['jobs', '#7DD3FC'], [':', '#8B98C9']]],
  [1, [['build-and-test', '#7DD3FC'], [':', '#8B98C9']]],
  [2, [['runs-on', '#7DD3FC'], [': ', '#8B98C9'], ['ubuntu-latest', '#86EFAC']]],
  [2, [['steps', '#7DD3FC'], [':', '#8B98C9']]],
  [3, [['- run', '#C4B5FD'], [': ', '#8B98C9'], ['npm test', '#86EFAC']]],
];
const JOBS = [
  { name: 'build', icon: Package, start: 13.55 },
  { name: 'test', icon: FlaskConical, start: 14.12 },
  { name: 'deploy', icon: Rocket, start: 14.85 },
];
const JX = [1150, 1420, 1690], JY = 610;

export const SActions: React.FC<{ t: number }> = ({ t }) => {
  const enter = k(t, 12.0, 12.32, E.outExpo);
  const tense = k(t, 15.55, 15.98, E.inCubic);
  const sh = shake(t, [[Q.checks[0], 0.35], [Q.checks[1], 0.45], [Q.checks[2], 0.6], [15.7, 0.5], [15.85, 0.7]]);
  const iris = k(t, 15.72, 16.0, E.inExpo);
  const passed = pop(t, Q.allPassed);
  return (
    <AbsoluteFill>
      <NightBg t={t} speed={200 + tense * 600} />
      <Smear amt={(1 - enter) * 60} id="actx" style={{ transform: `translateX(${(1 - enter) * 1800}px) translate(${sh.x}px, ${sh.y}px) rotate(${sh.r}deg) scale(${1 - tense * 0.06})` }}>
        <div style={{ position: 'absolute', left: 110, top: 70 }}>
          <Words t={t} text="Automate." at={12.02} size={190} by="char" stagger={0.026} hi={{ 8: C.cyan }} />
        </div>
        {/* editor */}
        <div style={{ position: 'absolute', left: 110, top: 340, width: 830, height: 580, borderRadius: 24, background: '#0A0F24', border: '2px solid #1E2A55', boxShadow: '0 40px 120px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '20px 26px', borderBottom: '2px solid #1E2A55' }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{ width: 18, height: 18, borderRadius: '50%', background: c }} />)}
            <span style={{ marginLeft: 18, fontFamily: MONO, fontSize: 22, color: '#8B98C9' }}>.github/workflows/<b style={{ color: '#E8ECFF' }}>ci.yml</b></span>
          </div>
          <div style={{ padding: '22px 0' }}>
            {YAML.map(([ind, toks], i) => {
              const p = k(t, Q.yaml[i], Q.yaml[i] + 0.22, E.outExpo);
              const live = t >= Q.yaml[i] && (i === YAML.length - 1 || t < Q.yaml[i + 1]);
              return (
                <div key={i} style={{ display: 'flex', height: 62, alignItems: 'center', fontFamily: MONO, fontSize: 32, opacity: p, transform: `translateX(${(1 - p) * -50}px)`, background: live ? 'rgba(99,82,255,0.16)' : 'transparent' }}>
                  <span style={{ width: 80, textAlign: 'right', paddingRight: 26, color: '#3B4A80' }}>{i + 1}</span>
                  <span style={{ paddingLeft: ind * 36 }}>{toks.map(([s, c], j) => <span key={j} style={{ color: c }}>{s}</span>)}</span>
                  {live && <span style={{ marginLeft: 4, width: 16, height: 38, background: '#E8ECFF', opacity: Math.floor(t * 6) % 2 ? 1 : 0.2 }} />}
                </div>
              );
            })}
          </div>
        </div>
        {/* run panel */}
        <div style={{ position: 'absolute', left: 1000, top: 340, width: 830, height: 580, borderRadius: 24, background: 'rgba(13,17,23,0.92)', border: '2px solid #1E2A55', boxShadow: '0 40px 120px rgba(0,0,0,0.5)', transform: `scale(${0.9 + pop(t, 12.6, true) * 0.1})`, opacity: k(t, 12.5, 12.8) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '24px 30px', borderBottom: '2px solid #1E2A55', fontFamily: BODY }}>
            <Spinner t={t} done={t >= Q.allPassed} size={34} />
            <span style={{ fontSize: 30, fontWeight: 700, color: '#E6EDF3' }}>CI</span>
            <span style={{ fontSize: 24, color: '#8B949E' }}>· Add login page · run #18</span>
          </div>
        </div>
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {[0, 1].map((i) => {
            const p = k(t, Q.checks[i], Q.checks[i] + 0.3, E.outCubic);
            return (
              <g key={i}>
                <line x1={JX[i] + 80} y1={JY} x2={JX[i + 1] - 80} y2={JY} stroke="#2A3566" strokeWidth={8} strokeLinecap="round" strokeDasharray="2 16" />
                <line x1={JX[i] + 80} y1={JY} x2={JX[i] + 80 + (JX[i + 1] - JX[i] - 160) * p} y2={JY} stroke={C.green} strokeWidth={8} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${C.green})` }} />
              </g>
            );
          })}
        </svg>
        {JOBS.map((j, i) => <Job key={j.name} t={t} i={i} />)}
        <div style={{ position: 'absolute', left: 1040, top: 790, width: 750, display: 'flex', alignItems: 'center', gap: 16, padding: '20px 26px', borderRadius: 18, background: 'rgba(88,204,2,0.14)', border: `3px solid ${C.green}`, fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: '#fff', transform: `scale(${passed}) translateY(${(1 - passed) * 30}px)`, opacity: Math.min(1, passed * 2) }}>
          <CheckCircle2 size={40} color={C.green} strokeWidth={3} />All checks have passed
        </div>
      </Smear>
      {/* the last check swells into the drop */}
      {iris > 0 && <div style={{ position: 'absolute', left: JX[2] - 2400 * iris, top: JY - 2400 * iris, width: 4800 * iris, height: 4800 * iris, borderRadius: '50%', background: C.blue }} />}
    </AbsoluteFill>
  );
};

const Job: React.FC<{ t: number; i: number }> = ({ t, i }) => {
  const j = JOBS[i];
  const done = t >= Q.checks[i];
  const running = t >= j.start && !done;
  const p = pop(t, 12.8 + i * 0.12, true);
  const hit = done ? Math.exp(-(t - Q.checks[i]) * 7) : 0;
  const Icon = j.icon;
  const col = done ? C.green : running ? C.orange : '#3B4A80';
  return (
    <>
      <div style={{ position: 'absolute', left: JX[i] - 92, top: JY - 92, width: 184, height: 184, borderRadius: 32, background: done ? 'rgba(88,204,2,0.16)' : '#0A0F24', border: `4px solid ${col}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, transform: `scale(${p * (1 + hit * 0.18)})`, boxShadow: `0 0 ${10 + hit * 80}px ${col}` }}>
        <Icon size={58} color={done ? '#fff' : '#9AA6D6'} strokeWidth={2.2} />
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 26, color: '#E8ECFF' }}>{j.name}</span>
      </div>
      <div style={{ position: 'absolute', left: JX[i] + 52, top: JY - 132, transform: `scale(${done ? pop(t, Q.checks[i]) : 0})` }}>
        <div style={{ width: 76, height: 76, borderRadius: '50%', background: C.green, display: 'grid', placeItems: 'center', border: '5px solid #0A0F24' }}>
          <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - k(t, Q.checks[i] + 0.04, Q.checks[i] + 0.2)} /></svg>
        </div>
      </div>
      {running && <div style={{ position: 'absolute', left: JX[i] + 58, top: JY - 126 }}><Spinner t={t} done={false} size={64} /></div>}
      <Shock t={t} at={Q.checks[i]} x={JX[i] + 90} y={JY - 94} r={260} color={C.green} width={12} dur={0.5} />
      <Burst t={t} at={Q.checks[i]} x={JX[i] + 90} y={JY - 94} n={10} dist={200} colors={['#fff', C.green]} len={50} thick={6} dur={0.4} />
    </>
  );
};

const Spinner: React.FC<{ t: number; done: boolean; size: number }> = ({ t, done, size }) => done
  ? <CheckCircle2 size={size} color={C.green} strokeWidth={3} />
  : (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ transform: `rotate(${t * 540}deg)` }}>
      <circle cx="20" cy="20" r="15" stroke="#3B4A80" strokeWidth="5" fill="none" />
      <circle cx="20" cy="20" r="15" stroke={C.orange} strokeWidth="5" fill="none" strokeDasharray="30 100" strokeLinecap="round" />
    </svg>
  );

