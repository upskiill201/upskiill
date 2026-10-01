/* Teyro App Store / launch screenshots generator.
 * Renders 8 portrait screens (1290x2796, iOS 6.9") from HTML with Playwright.
 *   cd frontend && NODE_PATH=./node_modules node ../marketing/app-store-screens/build.cjs
 * Output: marketing/app-store-screens/out/teyro-0N.png
 */
const path = require('path');
const fs = require('fs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const si = require('react-icons/si');
const lu = require('react-icons/lu');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '../..');
const PUB = 'file:///' + path.join(ROOT, 'frontend/public').replace(/\\/g, '/') + '/';
const img = (p) => encodeURI(PUB + p);
const ic = (lib, name, size, color, extra = {}) =>
  renderToStaticMarkup(React.createElement(lib[name], { size, color, ...extra }));
const L = (name, size = 20, color = 'currentColor', sw) => ic(lu, name, size, color, sw ? { strokeWidth: sw } : {});
const S = (name, size = 64, color = '#fff') => ic(si, name, size, color);

const TEY = {
  wave: img('User onbarding Assets/Tey_welcome.webp'),
  cheer: img('dashboard tey.webp'),
  think: img('User onbarding Assets/tey/thinking.webp'),
  flame: img('User onbarding Assets/tey/flame.webp'),
  peek: img('lesson Player/Hi there tey.webp'),
  crown: img('User onbarding Assets/tey/badge.webp'),
  tablet: img('User onbarding Assets/tey/tablet.webp'),
  fist: img('User onbarding Assets/tey/bell.webp'),
};
const ICON = {
  burn: img('Icons/burn.png'), gem: img('Icons/gem.png'), coin: img('Icons/Coin.png'),
  heart: img('Icons/heart.png'), chest: img('Tressure box.webp'),
  home: img('Icons/home-button.png'), learn: img('Icons/my-learning.png'),
  board: img('Icons/Leaderboard.png'), store: img('Icons/store.png'), me: img('Icons/user-profile.png'),
  quests: img('Icons/Quests.png'), freeze: img('art/items/freeze.svg'),
};

/* ---------- shared pieces ---------- */
const status = (dark) => `
  <div class="sb ${dark ? 'sb-dark' : ''}"><span class="sb-t">9:41</span><div class="island"></div>
  <span class="sb-r">${L('LuSignal', 17, 'currentColor', 2.6)}${L('LuWifi', 17, 'currentColor', 2.6)}${L('LuBatteryFull', 22, 'currentColor', 2)}</span></div>`;

const phone = (inner, { fc, fd, dark = false, style = '', cls = '' }) => `
  <div class="phone ${cls}" style="--fc:${fc};--fd:${fd};${style}">
    <i class="pb pb1"></i><i class="pb pb2"></i><i class="pb pb3"></i><i class="pb pb4"></i>
    <div class="screen ${dark ? 'dark' : ''}">${status(dark)}${inner}</div>
  </div>`;

const headline = (top, pill, bottom, { c1, c2, lip, sub = '', y = 200, size = 132 }) => `
  <div class="hl" style="top:${y}px;--hs:${size}px">
    ${top ? `<div class="hl-l">${top}</div>` : ''}
    <div class="pill" style="--c1:${c1};--c2:${c2};--lip:${lip}"><span>${pill}</span></div>
    ${bottom ? `<div class="hl-l">${bottom}</div>` : ''}
    ${sub ? `<div class="hl-sub">${sub}</div>` : ''}
  </div>`;

const brace = (txt, { x, y, size = 200, rot = -12, c = '#8FA2FF', d = '#3D4FC9' }) =>
  `<div class="brace" style="left:${x}px;top:${y}px;font-size:${size}px;transform:rotate(${rot}deg);--bc:${c};--bd:${d}">${txt}</div>`;

const sparkle = (x, y, s = 60, c = '#fff', o = 0.9) =>
  `<div class="spark" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px;opacity:${o}">${L('LuSparkle', s, c, 1.5)}</div>`;

const btn3d = (label, bg, lip, extra = '') =>
  `<div class="b3" style="--bg:${bg};--lip:${lip};${extra}">${label}</div>`;

const code = (lines) => lines.join('\n');
const k = (t) => `<span class="k">${t}</span>`;
const f = (t) => `<span class="fn">${t}</span>`;
const s = (t) => `<span class="st">${t}</span>`;
const n = (t) => `<span class="nu">${t}</span>`;
const c = (t) => `<span class="cm">${t}</span>`;
const tg = (t) => `<span class="tg">${t}</span>`;
const at = (t) => `<span class="at">${t}</span>`;

/* ---------- screens ---------- */
const screens = [];

/* 1 — hero: learn coding & AI the fun way */
screens.push(`
<section class="shot" style="background:
  radial-gradient(1100px 900px at 85% 18%, #1F46C9 0%, transparent 60%),
  radial-gradient(900px 900px at 0% 100%, #0B2E8A 0%, transparent 60%),
  linear-gradient(180deg,#081033 0%,#0A1A55 55%,#0B2A8F 100%)">
  <div class="floor" style="background:linear-gradient(160deg,#2E5BFF 0%,#1C3BD6 60%,#132A9E 100%);transform:skewY(-14deg);top:2150px"></div>
  ${brace('{ }', { x: 1010, y: 110, size: 150, rot: 12 })}
  ${sparkle(120, 170, 54, '#AFC0FF', .8)}
  ${headline('Learn', 'Coding &amp; AI', 'the Fun Way', { c1: '#5B78FF', c2: '#3D5AFE', lip: '#2638C4', y: 230 })}
  <div class="pw" style="left:380px;top:900px;transform:perspective(3000px) rotateX(16deg) rotateY(-18deg) rotateZ(8deg) scale(2.2)">
  ${phone(`
    <div class="ls-top">${L('LuX', 24, '#94A3B8', 2.6)}<div class="prog"><i style="width:48%"></i></div>
      <span class="hearts"><img src="${ICON.heart}">5</span></div>
    <div class="phase">${L('LuDumbbell', 13, '#3D5AFE', 2.6)} APPLY</div>
    <div class="q">How many times does this loop run?</div>
    <pre class="code">${code([`${k('for')} i ${k('in')} ${f('range')}(${n('3')}, ${n('8')}):`, `    ${f('print')}(${s('"Hello"')})`])}</pre>
    <div class="opts">
      <div class="opt sel"><b>A</b>5</div><div class="opt"><b>B</b>4</div>
      <div class="opt"><b>C</b>8</div><div class="opt"><b>D</b>6</div>
    </div>
    <div class="ls-foot">${btn3d('CHECK', '#58CC02', '#46A302', 'width:100%')}</div>
  `, { fc: '#7E97FF', fd: '#3148D6' })}
  </div>
  <img class="tey" src="${TEY.wave}" style="left:-40px;top:1700px;width:660px">
</section>`);

/* 2 — outcomes: from zero to builder */
const floatCard = (inner, st, bc) =>
  `<div class="fcard" style="${st};--bc:${bc}"><pre>${inner}</pre></div>`;
screens.push(`
<section class="shot" style="background:
  radial-gradient(1000px 800px at 10% 12%, #0E5A3A 0%, transparent 60%),
  radial-gradient(900px 900px at 100% 70%, #183E86 0%, transparent 60%),
  linear-gradient(180deg,#05140F 0%,#071A24 60%,#082A1C 100%)">
  <div class="floor" style="background:linear-gradient(150deg,#58CC02 0%,#2FA84F 45%,#1B7A5A 100%);transform:skewY(18deg);top:2350px;opacity:.95"></div>
  ${headline('Go from', 'Zero to Builder', '', { c1: '#6FDB1C', c2: '#58CC02', lip: '#3F8F00', y: 230, sub: 'Every lesson ends with a skill<br>you can actually use' })}
  ${brace('&lt;/&gt;', { x: 960, y: 890, size: 120, rot: -14, c: '#7BE08A', d: '#1F8A3E' })}
  <div class="stage" style="top:1060px;height:1300px">
    ${floatCard(`${k('def')} ${f('greet')}(name):\n    ${f('print')}(${s('f"Hi, {name}!"')})`, 'left:130px;top:40px;transform:perspective(1800px) rotateX(28deg) rotateZ(-6deg)', '#58CC02')}
    ${floatCard(`${c('# Prompt')}\nSummarize this report in\n3 bullets for my manager.`, 'left:620px;top:190px;transform:perspective(1800px) rotateX(28deg) rotateZ(5deg);opacity:.75', '#A78BFA')}
    ${floatCard(`${tg('&lt;h1&gt;')}My first website${tg('&lt;/h1&gt;')}\n${tg('&lt;button&gt;')}Hire me${tg('&lt;/button&gt;')}`, 'left:40px;top:380px;transform:perspective(1800px) rotateX(28deg) rotateZ(-3deg)', '#38BDF8')}
    ${floatCard(`${k('import')} requests\nprices = ${f('scrape')}(url)`, 'left:560px;top:560px;transform:perspective(1800px) rotateX(28deg) rotateZ(4deg);opacity:.8', '#FB923C')}
  </div>
  <div class="correct" style="left:70px;top:1850px;transform:perspective(2600px) rotateX(16deg) rotateZ(-4deg)">
    <div class="cr-h">${L('LuCircleCheck', 64, '#58A700', 2.6)}<span>Nice! That's right.</span>${L('LuFlag', 40, '#58A700', 2.4)}</div>
    <p>range(3, 8) counts 3, 4, 5, 6, 7 — so the loop runs 5 times.</p>
    <div class="cr-chips"><span class="chip"><img src="${ICON.gem}">+15 XP</span><span class="chip"><img src="${ICON.burn}">12 day streak</span></div>
    ${btn3d('CONTINUE', '#58CC02', '#46A302', 'width:100%;font-size:52px;height:130px;border-radius:32px')}
  </div>
  <img class="tey" src="${TEY.cheer}" style="left:820px;top:1470px;width:440px;transform:rotate(6deg)">
</section>`);

/* 3 — breadth: coding & AI in one app */
const tile = (icon, bg) => `<div class="tile" style="background:${bg}">${icon}</div>`;
const shelf = (tiles, lip, st = '') => `<div class="shelf" style="--lip:${lip};${st}">${tiles.join('')}</div>`;
screens.push(`
<section class="shot" style="background:
  radial-gradient(1200px 900px at 50% 58%, #6A2A12 0%, transparent 65%),
  linear-gradient(180deg,#07080F 0%,#120C12 30%,#3A1A10 60%,#2B1640 100%)">
  <div class="floor" style="background:linear-gradient(170deg,#8B7CF6 0%,#7B61FF 50%,#5B4BD8 100%);transform:skewY(-10deg);top:2330px"></div>
  ${headline('One App for', 'Coding &amp; AI', '', { c1: '#FF8A4C', c2: '#F2692E', lip: '#B8461A', y: 210,
    sub: 'Python, websites, vibe coding, automation,<br>AI agents, prompting &amp; more' })}
  ${brace('{ }', { x: 1000, y: 950, size: 130, rot: 10, c: '#F5D0B5', d: '#8A5A3C' })}
  ${sparkle(110, 1020, 50, '#FFD2B0', .7)}
  <div class="shelves">
    ${shelf([tile(S('SiHtml5', 118), '#E34F26'), tile(S('SiCss', 118), '#1572B6'), tile(S('SiJavascript', 118, '#1A1A1A'), '#F7DF1E'), tile(S('SiReact', 118, '#61DAFB'), '#20232A')], '#3D5AFE', 'width:1000px')}
    ${shelf([tile(S('SiPython', 118, '#FFD43B'), '#3776AB'), tile(S('SiPandas', 118), '#150458'), tile(S('SiJupyter', 118), '#F37626'), tile(S('SiSelenium', 118), '#43B02A')], '#FACC15', 'width:1120px')}
    ${shelf([tile(S('SiOpenai', 118), '#111111'), tile(S('SiClaude', 118), '#D97757'), tile(S('SiGooglegemini', 118), '#5B6FE0'), tile(S('SiPerplexity', 118), '#1B8E9C')], '#2DD4BF', 'width:1120px')}
    ${shelf([tile(S('SiZapier', 118), '#FF4F00'), tile(S('SiYoutube', 118), '#FF0000'), tile(S('SiReplit', 118), '#F26207')], '#FB923C', 'width:860px')}
  </div>
</section>`);

/* 4 — build real projects */
screens.push(`
<section class="shot" style="background:
  radial-gradient(1000px 900px at 80% 40%, #3B2A8C 0%, transparent 60%),
  radial-gradient(800px 700px at 0% 75%, #4A1E52 0%, transparent 60%),
  linear-gradient(180deg,#0B0A22 0%,#161240 55%,#221A5E 100%)">
  <div class="floor" style="background:linear-gradient(160deg,#B4A5FF 0%,#8B7CF6 45%,#6A56F0 100%);transform:skewY(-12deg);top:2420px"></div>
  ${headline('Build', 'Real Projects', 'from an Idea', { c1: '#9A86FF', c2: '#7B61FF', lip: '#4B3BD1', y: 220 })}
  <div class="tag" style="left:80px;top:1080px"><div class="tag-i" style="background:#fff;color:#7B61FF">${L('LuCodeXml', 64, '#7B61FF', 2.6)}</div><div><b>Your</b><br>Code</div></div>
  <div class="dash" style="left:155px;top:1240px;width:4px;height:140px"></div>
  <div class="tag" style="left:720px;top:880px"><div class="tag-i" style="background:#fff">${L('LuGlobe', 64, '#7B61FF', 2.6)}</div><div><b>Live</b><br>Website</div></div>
  <div class="dash" style="left:795px;top:1040px;width:4px;height:120px"></div>
  <div class="pw" style="left:40px;top:1400px;transform:perspective(3000px) rotateY(16deg) rotateZ(-4deg) scale(1.7)">
  ${phone(`
    <div class="ed-tabs"><span>${L('LuX', 16, '#94A3B8', 2.6)}</span><span>Lesson</span><span class="on">Code</span><span>Preview</span></div>
    <div class="ed-file">${L('LuFileCode', 15, '#E34F26', 2.4)} index.html</div>
    <pre class="ed">${[
      `${tg('&lt;header&gt;')}`,
      `  ${tg('&lt;h1&gt;')}Ada's Bakery${tg('&lt;/h1&gt;')}`,
      `  ${tg('&lt;p&gt;')}Fresh bread,`,
      `  baked daily.${tg('&lt;/p&gt;')}`,
      `  ${tg('&lt;button')} ${at('class')}=${s('"cta"')}${tg('&gt;')}`,
      `    Order now`,
      `  ${tg('&lt;/button&gt;')}`,
      `${tg('&lt;/header&gt;')}`,
      ``,
      `${tg('&lt;style&gt;')}`,
      `  ${at('.cta')} {`,
      `    background: ${n('#F2692E')};`,
      `    border-radius: ${n('14px')};`,
      `  }`,
      `${tg('&lt;/style&gt;')}`,
    ].map((l, i) => `<i>${i + 1}</i>${l}`).join('\n')}</pre>
    <div class="kb"><span>&lt;</span><span>&gt;</span><span>/</span><span>=</span><span>"</span><span>{</span><span>}</span><span>;</span></div>
  `, { fc: '#C9C0FF', fd: '#8C7EE8' })}
  </div>
  <div class="pw" style="left:620px;top:1180px;transform:perspective(3000px) rotateY(-14deg) rotateZ(3deg) scale(1.72)">
  ${phone(`
    <div class="web">
      <div class="w-nav"><b>Ada's Bakery</b>${L('LuMenu', 22, '#3A2A20', 2.6)}</div>
      <div class="w-hero"><div class="w-bread"></div><div class="w-bread b2"></div></div>
      <h3>Fresh bread,<br>baked daily.</h3>
      <p>Sourdough, croissants &amp; cakes made every morning in Lagos.</p>
      <div class="w-cta">Order now</div>
      <div class="w-cards"><div><i></i><b>Sourdough</b><span>$6</span></div><div><i class="c2"></i><b>Croissant</b><span>$3</span></div></div>
    </div>
  `, { fc: '#9A86FF', fd: '#4B3BD1' })}
  </div>
  <div class="run" style="left:760px;top:2440px">${btn3d(`${L('LuPlay', 54, '#fff', 3)} RUN`, '#58CC02', '#46A302', 'width:380px;height:150px;font-size:66px;border-radius:40px;gap:20px')}</div>
</section>`);

/* 5 — bite-size lessons, 4 phases */
const qcard = (inner, st) => `<div class="qc" style="${st}">${inner}</div>`;
screens.push(`
<section class="shot" style="background:
  radial-gradient(1000px 800px at 90% 45%, #0B4F7A 0%, transparent 60%),
  radial-gradient(900px 900px at 0% 20%, #13205A 0%, transparent 60%),
  linear-gradient(180deg,#060818 0%,#0A1530 60%,#0B2A48 100%)">
  <div class="floor" style="background:linear-gradient(170deg,#6ED3FF 0%,#1CB0F6 50%,#0E8FD0 100%);transform:skewY(-6deg);top:2560px"></div>
  ${brace('?', { x: 1080, y: 1880, size: 200, rot: 14, c: '#8FD8FF', d: '#1D6C99' })}${sparkle(90, 120, 60, '#8FD8FF', .7)}
  ${headline('Learn Faster with', 'Bite-Size Lessons', '', { c1: '#4CC4FF', c2: '#1CB0F6', lip: '#0A7FBF', y: 230, size: 116 })}
  <div class="phases" style="top:760px">
    <span>Learn</span>${L('LuChevronRight', 40, '#6ED3FF', 3)}<span>Apply</span>${L('LuChevronRight', 40, '#6ED3FF', 3)}<span>Reflect</span>${L('LuChevronRight', 40, '#6ED3FF', 3)}<span>Deepen</span>
  </div>
  ${qcard(`
    <div class="qc-t">Display "Welcome" on the screen</div>
    <div class="qc-code"><span class="blank">print</span>(<span class="st">"Welcome"</span>)</div>
    <div class="toks"><span>show</span><span class="ghost"></span><span>display</span></div>
    <span class="tok-lift">print</span>
  `, 'left:150px;top:930px;width:990px;transform:rotate(-2deg)')}
  ${qcard(`
    <div class="qc-t">Which prompt gets a better answer?</div>
    <div class="pr">"Write about dogs."</div>
    <div class="pr ok">"Write a 3-line poem about a loyal dog, for kids aged 6."${L('LuCircleCheck', 50, '#58A700', 2.6)}</div>
  `, 'left:70px;top:1500px;width:900px;transform:rotate(1.5deg)')}
  ${qcard(`
    <div class="qc-t">Tap the line with the bug</div>
    <div class="lines"><div><i>1</i>print("Hello")</div><div class="bad"><i>2</i>print(Goodbye)</div><div><i>3</i>print("See you!")</div></div>
  `, 'left:170px;top:2140px;width:990px;transform:rotate(-1.5deg)')}
  <img class="tey" src="${TEY.think}" style="left:880px;top:1360px;width:470px">
</section>`);

/* 6 — daily habit / streak */
const days = [];
for (let i = 0; i < 2; i++) days.push('<i class="e"></i>'); // Sep 2026 starts on Tuesday (Mon-first grid)
for (let d = 1; d <= 30; d++) {
  const on = d <= 26;
  const col = (d + 1) % 7; // 0 = Mon
  const start = on && (d === 1 || col === 0);
  const end = on && (d === 26 || col === 6);
  days.push(`<i class="${on ? 'on' : ''} ${start ? 's' : ''} ${end ? 'x' : ''} ${d === 26 ? 'today' : ''}">${d}</i>`);
}
screens.push(`
<section class="shot" style="background:
  radial-gradient(1100px 900px at 70% 10%, #8A3A0A 0%, transparent 60%),
  radial-gradient(900px 700px at 0% 60%, #3A1606 0%, transparent 60%),
  linear-gradient(180deg,#1A0A04 0%,#0C0806 55%,#0B0A14 100%)">
  <div class="floor" style="background:linear-gradient(170deg,#FFB27A 0%,#FF8A5C 45%,#F2692E 100%);transform:skewY(-5deg);top:2640px"></div>
  <svg class="zig" viewBox="0 0 1290 1500" style="top:600px">
    <defs><linearGradient id="zg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#7A3A10" stop-opacity=".2"/><stop offset=".5" stop-color="#FF8A3D"/><stop offset="1" stop-color="#FFC24B"/></linearGradient></defs>
    <path d="M-40 1320 L260 1080 L420 1180 L720 760 L860 880 L1130 360" fill="none" stroke="url(#zg)" stroke-width="70" stroke-linejoin="miter" stroke-linecap="butt"/>
    <path d="M1060 330 L1230 230 L1200 430 Z" fill="#FFC24B"/>
  </svg>
  <div class="pw" style="left:170px;top:-120px;transform:perspective(3200px) rotateX(10deg) rotateY(-16deg) rotateZ(-7deg) scale(2.1)">
  ${phone(`
    <div class="st-h">${L('LuX', 22, '#94A3B8', 2.6)}<b>Streak</b>${L('LuShare', 20, '#94A3B8', 2.4)}</div>
    <div class="st-big"><div><div class="st-n">42</div><div class="st-l">day streak!</div><div class="st-s">Streak safe. See you tomorrow.</div></div><img src="${ICON.burn}"></div>
    <div class="st-cal-ph"></div>
    <div class="st-row"><img src="${ICON.freeze}"><div><b>Streak Freeze equipped</b><span>Miss a day without losing it</span></div></div>
    <div class="st-goal"><div><b>Next goal: 50 days</b><span>8 to go</span></div><div class="prog o"><i style="width:84%"></i></div></div>
  `, { fc: '#FF9A5C', fd: '#C8531E' })}
  </div>
  <div class="cal" style="left:330px;top:720px;transform:perspective(2600px) rotateY(-10deg) rotateZ(-5deg)">
    <div class="cal-h">${L('LuChevronLeft', 44, '#94A3B8', 3)}<b>September 2026</b>${L('LuChevronRight', 44, '#94A3B8', 3)}</div>
    <div class="cal-w"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
    <div class="cal-g">${days.join('')}</div>
  </div>
  <img class="tey" src="${TEY.flame}" style="left:870px;top:1560px;width:400px">
  ${headline('Build a Daily', 'Learning Habit', '', { c1: '#FFA05E', c2: '#FF8A3D', lip: '#C2561A', y: 2180 })}
</section>`);

/* 7 — AI path */
screens.push(`
<section class="shot" style="background:
  radial-gradient(1000px 800px at 10% 8%, #7A2A12 0%, transparent 55%),
  radial-gradient(1000px 900px at 100% 60%, #561B4F 0%, transparent 60%),
  linear-gradient(180deg,#120812 0%,#0C0A1C 55%,#160B26 100%)">
  <div class="floor" style="background:linear-gradient(160deg,#FF9BC8 0%,#F472B6 45%,#8B7CF6 100%);transform:skewY(-9deg);top:2440px"></div>
  ${headline('Make', 'AI Work for You', '', { c1: '#FF8CC1', c2: '#F0609E', lip: '#B83372', y: 220, sub: 'At work, at school &amp; in everyday life' })}
  ${sparkle(1060, 200, 90, '#FFB3D6', .9)}${sparkle(1150, 330, 44, '#FFB3D6', .6)}
  <div class="pw" style="left:230px;top:930px;transform:perspective(3000px) rotateY(-8deg) rotateZ(-2deg) scale(2.0)">
  ${phone(`
    <div class="stats"><span class="cs">${L('LuSparkles', 18, '#fff', 2.4)}</span><span style="color:#F97316"><img src="${ICON.burn}">12</span><span style="color:#2563EB"><img src="${ICON.gem}">340</span><span style="color:#D97706"><img src="${ICON.coin}">250</span></div>
    <div class="unit-ph"></div>
    <div class="path">
      <img class="pd" src="${img('lesson-assets/pedestal-completed.svg')}" style="left:160px;top:0">
      <img class="pd" src="${img('lesson-assets/pedestal-completed.svg')}" style="left:70px;top:95px">
      <img class="pd" src="${img('lesson-assets/pedestal-active.svg')}" style="left:140px;top:195px">
      <img class="pd" src="${img('lesson-assets/pedestal-locked.svg')}" style="left:230px;top:470px">
    </div>
    <div class="nav"><img src="${ICON.home}" class="on"><img src="${ICON.learn}"><img src="${ICON.board}"><img src="${ICON.store}"><img src="${ICON.me}"></div>
  `, { fc: '#FFA3CD', fd: '#D05390' })}
  </div>
  <div class="unit" style="left:120px;top:1260px">
    <span>Unit 2 · AI for Everyday Life</span><b>Build your first AI agent</b>
  </div>
  <div class="pop" style="left:260px;top:1880px">
    <div class="pop-h"><b>Plan a trip with AI</b><span>Lesson 3</span></div>
    <p>Turn one prompt into a full itinerary, budget &amp; packing list.</p>
    ${btn3d('START', '#3D5AFE', '#2638C4', 'width:100%;height:120px;font-size:46px;border-radius:30px')}
  </div>
  <img class="tey" src="${TEY.peek}" style="left:860px;top:1440px;width:470px;transform:scaleX(-1)">
</section>`);

/* 8 — gamified: leagues, coins, chests */
const trophies = ['bronze', 'silver', 'gold', 'sapphire', 'ruby', 'emerald', 'amethyst'];
const row = (r, name, xp, av, opts = {}) => `
  <div class="lb ${opts.me ? 'me' : ''}" style="${opts.st || ''}"><i>${r}</i><span class="av" style="background:${av}">${name[0]}</span>
  <div class="lb-n"><b>${name}</b>${opts.streak ? `<span><img src="${ICON.burn}">${opts.streak} days</span>` : ''}</div><em>${xp} XP</em></div>`;
screens.push(`
<section class="shot" style="background:
  radial-gradient(1100px 900px at 50% 40%, #0F4F8F 0%, transparent 62%),
  linear-gradient(180deg,#050B1E 0%,#08214A 60%,#0B3A78 100%)">
  <div class="floor" style="background:linear-gradient(160deg,#7FD4FF 0%,#38A8F0 50%,#1E7BD8 100%);transform:skewY(12deg);top:2380px"></div>
  ${headline('Turn Learning', 'into a Game', '', { c1: '#5FC3FF', c2: '#38A8F0', lip: '#1A73BC', y: 220, sub: 'Earn XP, win Coins, open chests<br>&amp; climb weekly leagues' })}
  <div class="pw" style="left:250px;top:1000px;transform:perspective(3000px) rotateY(-10deg) rotateZ(2deg) scale(1.95)">
  ${phone(`
    <div class="lg-gap"></div>
    <div class="lg-t"><b>Sapphire</b> League</div>
    <div class="lg-s">Top 10 advance to the next league</div>
    <div class="lg-c"><span>${L('LuTimer', 15, '#2563EB', 2.6)} 3 days left</span><span>${L('LuGift', 15, '#475569', 2.6)} Rewards</span></div>
    <div class="lb-ph"></div>
        ${row(10, 'ArrayOfSunshine', 541, '#14B8A6')}
    <div class="promo">${L('LuTriangle', 13, '#58A700', 3)} Promotion zone ${L('LuTriangle', 13, '#58A700', 3)}</div>
    ${row(11, 'NullPointer', 498, '#8B5CF6')}
    ${row(12, 'py_ninja', 455, '#F97316')}
  `, { fc: '#7CCBFF', fd: '#2A7FC8' })}
  </div>
  <div class="troph" style="top:1170px">${trophies.map((t) => `<img src="${img(`Leagues/league-${t}.png`)}" class="${t === 'sapphire' ? 'big' : ''}">`).join('')}</div>
  <div class="lbx" style="left:130px;top:1790px">
    ${row(6, 'boolean_brain', 773, '#3D5AFE', { streak: 42, st: 'transform:scale(.96);opacity:.9' })}
    ${row(7, 'You', 727, '#58CC02', { me: true, streak: 12 })}
  </div>
  <img class="float" src="${ICON.chest}" style="left:-40px;top:2380px;width:420px;transform:rotate(-8deg)">
  <img class="float" src="${ICON.coin}" style="left:1030px;top:1560px;width:170px;transform:rotate(14deg)">
  <img class="float" src="${ICON.coin}" style="left:1120px;top:1740px;width:110px;transform:rotate(-10deg)">
  <img class="float" src="${ICON.gem}" style="left:70px;top:1560px;width:130px;transform:rotate(-12deg)">
</section>`);

/* ---------- styles ---------- */
const css = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#000;font-family:'Plus Jakarta Sans',Inter,sans-serif}
.shot{position:relative;width:1290px;height:2796px;overflow:hidden;color:#fff}
.floor{position:absolute;left:-200px;width:1700px;height:1400px;box-shadow:0 -30px 80px rgba(0,0,0,.35)}
.hl{position:absolute;left:0;right:0;text-align:center;z-index:5;font-size:var(--hs);font-weight:800;letter-spacing:-.035em;line-height:1.08}
.hl-l{background:linear-gradient(180deg,#fff 30%,#D9E0F2 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))}
.pill{display:inline-block;margin:16px 0 30px;padding:4px 44px 18px;border-radius:44px;background:linear-gradient(180deg,var(--c1),var(--c2));
  box-shadow:inset 0 5px 0 rgba(255,255,255,.35),inset 0 -6px 0 rgba(0,0,0,.12),0 14px 0 var(--lip),0 0 0 6px rgba(255,255,255,.14),0 30px 50px rgba(0,0,0,.35)}
.pill span{color:#fff;text-shadow:0 5px 0 rgba(0,0,0,.14)}
.hl-sub{margin-top:26px;font-size:50px;font-weight:600;letter-spacing:-.01em;line-height:1.3;color:rgba(255,255,255,.86)}
.brace{position:absolute;z-index:3;font-weight:800;font-family:'JetBrains Mono',monospace;color:var(--bc);letter-spacing:-.1em;
  text-shadow:1px 1px 0 var(--bd),2px 2px 0 var(--bd),3px 3px 0 var(--bd),4px 4px 0 var(--bd),5px 5px 0 var(--bd),6px 6px 0 var(--bd),7px 7px 0 var(--bd),8px 8px 0 var(--bd),10px 16px 30px rgba(0,0,0,.5)}
.spark{position:absolute;z-index:3}
.tey{position:absolute;z-index:8;filter:drop-shadow(0 30px 40px rgba(0,0,0,.45))}
.float{position:absolute;z-index:8;filter:drop-shadow(0 26px 30px rgba(0,0,0,.45))}
.pw{position:absolute;z-index:4;transform-origin:0 0}
/* phone */
.phone{position:relative;width:414px;height:868px;border-radius:64px;padding:12px;background:linear-gradient(135deg,color-mix(in srgb,var(--fc) 80%,#fff) 0%,var(--fc) 40%,var(--fc) 100%);
  box-shadow:inset 0 2px 1px rgba(255,255,255,.7),inset 0 -2px 2px rgba(0,0,0,.18),-7px 6px 0 var(--fd),-12px 10px 0 color-mix(in srgb,var(--fd) 80%,#000),-40px 50px 70px rgba(0,0,0,.55)}
.pb{position:absolute;width:5px;border-radius:3px;background:var(--fd)}
.pb1{left:-4px;top:150px;height:34px}.pb2{left:-4px;top:210px;height:62px}.pb3{left:-4px;top:285px;height:62px}.pb4{right:-4px;top:240px;height:96px}
.screen{position:relative;width:390px;height:844px;border-radius:52px;overflow:hidden;background:#fff;color:#1F2A44;font-family:'Plus Jakarta Sans',sans-serif}
.screen.dark{background:#0F172A;color:#E2E8F0}
.sb{height:54px;display:flex;align-items:center;justify-content:space-between;padding:6px 30px 0 40px;font:700 16px 'Inter',sans-serif;color:#0F172A;position:relative}
.sb-dark{color:#fff}
.island{position:absolute;left:50%;top:11px;transform:translateX(-50%);width:122px;height:35px;border-radius:20px;background:var(--fc);box-shadow:inset 0 -2px 3px rgba(0,0,0,.15)}
.island::after{content:'';position:absolute;right:14px;top:11px;width:13px;height:13px;border-radius:50%;background:color-mix(in srgb,var(--fd) 60%,#fff);opacity:.7}
.sb-r{display:flex;gap:5px;align-items:center}
/* lesson */
.ls-top{display:flex;align-items:center;gap:14px;padding:14px 20px 0}
.prog{flex:1;height:16px;border-radius:10px;background:#E5E7EB;overflow:hidden}
.prog i{display:block;height:100%;border-radius:10px;background:#58CC02;box-shadow:inset 0 4px 0 rgba(255,255,255,.35)}
.prog.o i{background:#FF8A3D}
.hearts{display:flex;align-items:center;gap:4px;font-weight:800;color:#FF4B4B;font-size:17px}.hearts img{width:24px}
.phase{display:inline-flex;align-items:center;gap:6px;margin:26px 20px 0;padding:6px 12px;border-radius:10px;background:#EEF2FF;color:#3D5AFE;font-weight:800;font-size:12px;letter-spacing:.08em}
.q{font-size:25px;font-weight:800;line-height:1.25;padding:12px 20px 0;letter-spacing:-.02em}
.code{margin:18px 20px 0;padding:18px;border-radius:18px;background:#0F172A;color:#E2E8F0;font:600 16.5px/1.6 'JetBrains Mono',monospace;box-shadow:inset 0 -4px 0 rgba(0,0,0,.4)}
.k{color:#C084FC}.fn{color:#60A5FA}.st{color:#FBBF24}.nu{color:#34D399}.cm{color:#94A3B8}.tg{color:#F472B6}.at{color:#7DD3FC}
.opts{display:flex;flex-direction:column;gap:12px;padding:22px 20px 0}
.opt{display:flex;align-items:center;gap:16px;height:62px;padding:0 16px;border:2px solid #E2E8F0;border-bottom-width:5px;border-radius:18px;font-weight:800;font-size:22px}
.opt b{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;border:2px solid #E2E8F0;font-size:14px;color:#94A3B8}
.opt.sel{border-color:#3D5AFE;background:#EEF2FF;color:#3D5AFE}.opt.sel b{border-color:#3D5AFE;color:#3D5AFE}
.ls-foot{position:absolute;left:20px;right:20px;bottom:36px}
.b3{display:flex;align-items:center;justify-content:center;height:56px;border-radius:16px;background:var(--bg);box-shadow:inset 0 3px 0 rgba(255,255,255,.25),0 6px 0 var(--lip);color:#fff;font-weight:800;letter-spacing:.06em;font-size:19px}
/* screen 2 */
.stage{position:absolute;left:0;right:0}
.fcard{position:absolute;width:640px;padding:30px 36px;border-radius:30px;background:#111a2e;border:4px solid var(--bc);box-shadow:0 14px 0 color-mix(in srgb,var(--bc) 55%,#000),0 40px 60px rgba(0,0,0,.5)}
.fcard pre{font:600 34px/1.55 'JetBrains Mono',monospace;color:#E2E8F0;white-space:pre}
.correct{position:absolute;z-index:6;width:1060px;padding:56px 60px 60px;border-radius:52px;background:#D7FFB8;box-shadow:0 18px 0 #9BDB6A,0 50px 80px rgba(0,0,0,.5)}
.cr-h{display:flex;align-items:center;gap:22px;color:#3F8F00;font-size:66px;font-weight:800;letter-spacing:-.02em}.cr-h span{flex:1}
.correct p{margin:22px 0 28px;font-size:42px;font-weight:600;line-height:1.4;color:#3F8F00}
.cr-chips{display:flex;gap:18px;margin-bottom:40px}
.chip{display:flex;align-items:center;gap:12px;padding:12px 26px;border-radius:40px;background:#fff;color:#1F2A44;font-size:36px;font-weight:800;box-shadow:0 5px 0 rgba(63,143,0,.25)}
.chip img{width:44px}
/* screen 3 */
.shelves{position:absolute;left:0;right:0;top:1060px;display:flex;flex-direction:column;align-items:center;gap:74px;z-index:4}
.shelf{display:flex;justify-content:center;gap:30px;padding:30px;border-radius:44px;background:#1C1F29;border:5px solid var(--lip);box-shadow:0 22px 0 var(--lip),0 60px 70px rgba(0,0,0,.5);transform:perspective(2000px) rotateX(20deg)}
.tile{width:220px;height:220px;border-radius:40px;display:grid;place-items:center;box-shadow:inset 0 5px 0 rgba(255,255,255,.22),inset 0 -8px 0 rgba(0,0,0,.25),0 10px 18px rgba(0,0,0,.4)}
/* screen 4 */
.tag{position:absolute;z-index:6;display:flex;align-items:center;gap:26px;font-size:62px;line-height:1.02;font-weight:600;color:rgba(255,255,255,.9)}
.tag b{font-weight:800;color:#fff}
.tag-i{width:150px;height:150px;border-radius:50%;display:grid;place-items:center;box-shadow:0 10px 0 #C9C0FF,0 30px 40px rgba(0,0,0,.4)}
.dash{position:absolute;z-index:5;background:repeating-linear-gradient(180deg,rgba(255,255,255,.8) 0 14px,transparent 14px 26px)}
.dash[style*="height:4px"]{background:repeating-linear-gradient(90deg,rgba(255,255,255,.8) 0 14px,transparent 14px 26px)}
.ed-tabs{display:flex;align-items:center;gap:18px;padding:12px 20px;font-weight:700;font-size:15px;color:#64748B;border-bottom:1px solid #E2E8F0}
.ed-tabs .on{color:#3D5AFE;box-shadow:0 3px 0 #3D5AFE;padding-bottom:4px}
.ed-file{display:flex;align-items:center;gap:6px;padding:12px 20px;font:600 13px 'JetBrains Mono',monospace;color:#475569;background:#F5F7FB}
.ed{padding:14px 16px;font:600 14.5px/1.75 'JetBrains Mono',monospace;color:#1F2A44;white-space:pre}
.ed i{display:inline-block;width:26px;color:#CBD5E1;font-style:normal}
.ed .tg{color:#D6336C}.ed .at{color:#2563EB}.ed .st{color:#B45309}.ed .nu{color:#059669}
.kb{position:absolute;left:0;right:0;bottom:0;height:120px;background:#E9ECF3;display:flex;gap:6px;padding:14px 10px;justify-content:center}
.kb span{width:38px;height:46px;border-radius:8px;background:#fff;display:grid;place-items:center;font:700 18px 'JetBrains Mono',monospace;box-shadow:0 2px 0 #B8BFCC}
.web{padding:0 18px;background:#FFF8F0;height:790px;color:#3A2A20}
.w-nav{display:flex;justify-content:space-between;align-items:center;padding:12px 2px 14px;font-size:18px}
.w-hero{height:230px;border-radius:24px;background:linear-gradient(135deg,#FFD9A8,#F2A65A);position:relative;overflow:hidden}
.w-bread{position:absolute;left:40px;top:70px;width:190px;height:110px;border-radius:55px 55px 40px 40px;background:linear-gradient(180deg,#C8742E,#9A4F1A);box-shadow:inset 0 10px 0 rgba(255,255,255,.18)}
.w-bread::after{content:'';position:absolute;left:40px;top:30px;width:110px;height:8px;border-radius:4px;background:rgba(255,230,190,.6);box-shadow:0 22px 0 rgba(255,230,190,.5)}
.w-bread.b2{left:190px;top:110px;width:150px;height:90px}
.web h3{font-size:34px;line-height:1.1;font-weight:800;letter-spacing:-.03em;margin:22px 0 10px}
.web p{font-size:15px;line-height:1.5;color:#7A5A48}
.w-cta{display:inline-block;margin:18px 0 22px;padding:14px 26px;border-radius:14px;background:#F2692E;color:#fff;font-weight:800;font-size:17px;box-shadow:0 5px 0 #B8461A}
.w-cards{display:flex;gap:12px}
.w-cards div{flex:1;background:#fff;border-radius:18px;padding:12px;box-shadow:0 3px 0 #F0DCC8}
.w-cards i{display:block;height:74px;border-radius:12px;background:linear-gradient(135deg,#E9B27A,#B86A2E);margin-bottom:8px}
.w-cards i.c2{background:linear-gradient(135deg,#FFE0A3,#E3A145)}
.w-cards b{display:block;font-size:15px}.w-cards span{font-size:14px;color:#F2692E;font-weight:800}
.run{position:absolute;z-index:7;filter:drop-shadow(0 30px 40px rgba(0,0,0,.45))}
/* screen 5 */
.phases{position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:10px;z-index:5}
.phases span{padding:14px 26px;border-radius:40px;background:rgba(110,211,255,.14);border:3px solid rgba(110,211,255,.45);font-size:40px;font-weight:800;color:#DDF4FF}
.qc{position:absolute;z-index:5;background:#fff;color:#1F2A44;border-radius:44px;padding:44px 48px 48px;border:5px solid #1CB0F6;box-shadow:0 16px 0 #0A7FBF,0 50px 70px rgba(0,0,0,.5)}
.qc-t{font-size:44px;font-weight:700;letter-spacing:-.01em;margin-bottom:28px}
.qc-code{padding:26px 30px;border-radius:24px;background:#F5F7FB;border:3px solid #E2E8F0;font:600 46px 'JetBrains Mono',monospace}
.qc-code .st{color:#D6336C}
.blank{background:#DBEAFE;border-radius:10px;padding:0 6px;color:#1F2A44}
.toks{display:flex;gap:26px;margin-top:30px}
.toks span{padding:18px 34px;border-radius:24px;border:3px solid #E2E8F0;border-bottom-width:8px;font:700 40px 'JetBrains Mono',monospace}
.toks .ghost{width:240px;background:#F1F5F9;border-color:#F1F5F9}
.tok-lift{position:absolute;left:250px;bottom:80px;padding:24px 42px;border-radius:28px;background:#EAF6FF;border:5px solid #1CB0F6;border-bottom-width:12px;font:700 54px 'JetBrains Mono',monospace;transform:rotate(-6deg);box-shadow:0 30px 40px rgba(12,74,110,.3)}
.pr{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:26px 30px;border-radius:26px;border:3px solid #E2E8F0;border-bottom-width:8px;font-size:38px;font-weight:600;line-height:1.35;margin-top:20px;color:#64748B}
.pr.ok{border-color:#58CC02;background:#D7FFB8;color:#3F8F00;font-weight:700}.pr svg{flex:none}
.lines{border-radius:24px;border:3px solid #E2E8F0;overflow:hidden;font:600 42px/1 'JetBrains Mono',monospace}
.lines div{padding:22px 26px;border-top:2px solid #EEF2F7}.lines div:first-child{border-top:0}
.lines i{font-style:normal;color:#94A3B8;margin-right:28px}
.lines .bad{background:#FFDFE0;color:#D92D2D}
/* screen 6 */
.zig{position:absolute;left:0;width:1290px;height:1500px;z-index:2;filter:drop-shadow(0 20px 20px rgba(0,0,0,.4))}
.st-h{display:flex;justify-content:space-between;align-items:center;padding:12px 22px;font-size:18px}
.st-big{display:flex;justify-content:space-between;align-items:center;padding:18px 24px 10px}
.st-n{font-size:64px;font-weight:800;line-height:1;color:#FF8A3D;letter-spacing:-.04em}
.st-l{font-size:24px;font-weight:800}.st-s{font-size:14px;color:#64748B;margin-top:6px;font-weight:600}
.st-big img{width:110px}
.st-cal-ph{height:360px}
.st-row{display:flex;gap:14px;align-items:center;margin:14px 20px 0;padding:16px;border-radius:20px;border:2px solid #E2E8F0;border-bottom-width:5px}
.st-row img{width:44px}.st-row b{display:block;font-size:16px}.st-row span{font-size:13px;color:#64748B;font-weight:600}
.st-goal{margin:14px 20px 0;padding:16px;border-radius:20px;background:#FFF4EC}
.st-goal>div:first-child{display:flex;justify-content:space-between;margin-bottom:10px;font-size:15px}.st-goal span{color:#C2561A;font-weight:700}
.cal{position:absolute;z-index:6;width:820px;padding:44px 40px 40px;border-radius:48px;background:#fff;color:#1F2A44;border:5px solid #FF9A5C;box-shadow:-16px 16px 0 #C8531E,0 60px 80px rgba(0,0,0,.5)}
.cal-h{display:flex;justify-content:space-between;align-items:center;font-size:42px;margin-bottom:24px}
.cal-w,.cal-g{display:grid;grid-template-columns:repeat(7,1fr);row-gap:14px;text-align:center}
.cal-w span{font-size:28px;font-weight:700;color:#94A3B8}
.cal-g i{font-style:normal;height:80px;display:grid;place-items:center;font-size:32px;font-weight:700;color:#94A3B8}
.cal-g i.on{background:#FF8A3D;color:#fff}
.cal-g i.s{border-radius:40px 0 0 40px}.cal-g i.x{border-radius:0 40px 40px 0}.cal-g i.s.x{border-radius:40px}
.cal-g i.today{background:#FF6A1A;box-shadow:inset 0 0 0 5px #FFD0B0}
/* screen 7 */
.stats{display:flex;justify-content:space-between;align-items:center;padding:10px 22px;font-weight:800;font-size:17px}
.stats span{display:flex;align-items:center;gap:5px}.stats img{width:24px}
.cs{width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,#A78BFA,#6352FF);justify-content:center;box-shadow:0 3px 0 #4B3BD1}
.unit-ph{height:110px}
.path{position:relative;height:520px}
.pd{position:absolute;width:118px}
.nav{position:absolute;left:0;right:0;bottom:0;height:90px;border-top:2px solid #EEF2F7;display:flex;justify-content:space-around;align-items:center;padding-bottom:18px;background:#fff}
.nav img{width:34px;opacity:.9}.nav img.on{padding:5px;width:46px;border-radius:12px;border:2px solid #93C5FD;background:#EFF6FF}
.unit{position:absolute;z-index:6;width:1050px;padding:36px 50px;border-radius:40px;background:linear-gradient(180deg,#F472B6,#E0529A);box-shadow:0 16px 0 #A8316D,0 40px 60px rgba(0,0,0,.45);transform:rotate(-3deg)}
.unit span{display:block;font-size:34px;font-weight:700;opacity:.9}.unit b{display:block;font-size:54px;font-weight:800;letter-spacing:-.02em;margin-top:6px}
.pop{position:absolute;z-index:6;width:900px;padding:44px 48px 52px;border-radius:44px;background:#fff;color:#1F2A44;border:5px solid #C4B5FD;box-shadow:0 16px 0 #8B7CF6,0 50px 70px rgba(0,0,0,.5)}
.pop::before{content:'';position:absolute;left:190px;top:-30px;width:50px;height:50px;background:#fff;border-left:5px solid #C4B5FD;border-top:5px solid #C4B5FD;transform:rotate(45deg)}
.pop-h{display:flex;justify-content:space-between;align-items:center}.pop-h b{font-size:52px;letter-spacing:-.02em}
.pop-h span{padding:8px 22px;border-radius:30px;border:3px solid #E2E8F0;font-size:30px;font-weight:700;color:#64748B}
.pop p{font-size:36px;font-weight:600;color:#64748B;line-height:1.4;margin:16px 0 36px}
/* screen 8 */
.lg-gap{height:120px}
.lg-t{text-align:center;font-size:30px;font-weight:800;letter-spacing:-.02em}.lg-t b{color:#2563EB}
.lg-s{text-align:center;font-size:15px;color:#64748B;font-weight:600;margin-top:4px}
.lg-c{display:flex;justify-content:center;gap:10px;margin-top:14px}
.lg-c span{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:20px;border:2px solid #E2E8F0;font-size:14px;font-weight:700;color:#475569}
.lg-c span:first-child{border-color:#93C5FD;color:#2563EB}
.lb-ph{height:300px}
.lb{display:flex;align-items:center;gap:12px;padding:12px 20px;border-bottom:1px solid #F1F5F9}
.lb i{font-style:normal;width:24px;font-weight:800;color:#64748B;font-size:16px}
.av{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:800;font-size:18px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.2)}
.lb-n{flex:1}.lb-n b{display:block;font-size:16px}.lb-n span{display:flex;align-items:center;gap:3px;font-size:12px;color:#F97316;font-weight:700}.lb-n img{width:14px}
.lb em{font-style:normal;font-weight:800;color:#2563EB;font-size:15px}
.promo{display:flex;justify-content:center;align-items:center;gap:8px;padding:12px;font-weight:800;color:#58A700;font-size:15px}
.troph{position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:22px;z-index:7}
.troph img{width:130px;filter:drop-shadow(0 16px 20px rgba(0,0,0,.45))}
.troph img.big{width:250px;filter:drop-shadow(0 0 50px rgba(96,165,250,.9)) drop-shadow(0 20px 20px rgba(0,0,0,.4))}
.lbx{position:absolute;z-index:7;width:1030px;display:flex;flex-direction:column;gap:22px;transform:rotate(-2deg)}
.lbx .lb{background:#fff;color:#1F2A44;border-radius:36px;padding:30px 40px;gap:28px;border:5px solid #BFDBFE;box-shadow:0 14px 0 #93C5FD,0 40px 60px rgba(0,0,0,.45)}
.lbx .lb i{font-size:40px;width:50px}.lbx .av{width:100px;height:100px;font-size:44px}
.lbx .lb-n b{font-size:44px}.lbx .lb-n span{font-size:30px;gap:8px}.lbx .lb-n img{width:32px}.lbx .lb em{font-size:42px}
.lbx .lb.me{border-color:#58CC02;background:#F0FFE4;box-shadow:0 14px 0 #46A302,0 40px 60px rgba(0,0,0,.45)}
.lbx .lb.me em{color:#3F8F00}
`;

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@600;700&family=JetBrains+Mono:wght@600;700;800&display=block" rel="stylesheet">
<style>${css}</style></head><body>${screens.join('\n')}</body></html>`;

(async () => {
  const outDir = path.join(__dirname, 'out');
  fs.mkdirSync(outDir, { recursive: true });
  const htmlPath = path.join(outDir, 'screens.html');
  fs.writeFileSync(htmlPath, html);
  const only = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1290, height: 2796 }, deviceScaleFactor: 1 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const shots = await page.$$('section.shot');
  for (let i = 0; i < shots.length; i++) {
    if (only && !only.includes(i + 1)) continue;
    const file = path.join(outDir, `teyro-0${i + 1}.png`);
    await shots[i].screenshot({ path: file });
    console.log('wrote', file);
  }
  await browser.close();
})();
