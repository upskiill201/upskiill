#!/usr/bin/env node
/**
 * Keyword finder with no paid tool: expands each course's seed phrases through
 * Google autocomplete (what people actually type) and sorts the result.
 *
 *   node scripts/seo/keywords.mjs                     # every course in keyword-seeds.json
 *   node scripts/seo/keywords.mjs budgeting-for-beginners
 *
 * Writes scripts/seo/out/keywords/<slug>.json and .md (git-ignored).
 *
 * What it cannot tell you: search volume. The score is how many different
 * expansions suggested the phrase and how high they ranked it, which tracks how
 * commonly it is typed. Check promising ones in Search Console later.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const OUT = path.join(HERE, 'out', 'keywords');
const SEEDS = JSON.parse(fs.readFileSync(path.join(HERE, 'keyword-seeds.json'), 'utf8'));
const COURSES = JSON.parse(fs.readFileSync(path.join(HERE, 'data', 'courses.json'), 'utf8')).courses;

const DELAY = 130;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');
const PREFIX = ['how to', 'what is', 'why', 'can', 'is', 'best', 'free', 'when to', 'should i'];
const SUFFIX = ['for beginners', 'free', 'course', 'app', 'online', 'tips', 'examples', 'vs', 'alternative', 'template',
  'pdf', 'step by step', 'for students', 'for adults', 'in 2026', 'near me', 'jobs', 'salary', 'certificate', 'books'];
// Suggestions differ by country, so each seed is also asked from these markets.
const MARKETS = ['gb', 'in', 'ng', 'ph', 'ca', 'au', 'ke', 'za', 'pk'];

async function suggest(q, gl = 'us', hl = 'en') {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}&hl=${hl}&gl=${gl}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (res.status === 429) { await sleep(5000 * (attempt + 1)); continue; }
      if (!res.ok) return [];
      const json = await res.json();
      return Array.isArray(json[1]) ? json[1] : [];
    } catch { await sleep(1000); }
  }
  return [];
}

const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const toks = (s) => norm(s).replace(/[^a-z0-9\s]/g, ' ').split(' ').filter(Boolean);

function blogIndex() {
  const dir = path.join(ROOT, 'content', 'blog');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') && !f.startsWith('_')).map((f) => {
    const slug = f.replace(/\.mdx$/, '');
    return { slug, tokens: new Set(toks(slug.replace(/-/g, ' '))) };
  });
}
const STOP = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'and', 'is', 'i', 'my', 'how', 'what', 'do', 'you', 'can', 'with']);
function covered(kw, idx) {
  const t = toks(kw).filter((w) => !STOP.has(w));
  if (t.length < 2) return null;
  let best = null, bestScore = 0;
  for (const p of idx) {
    const hit = t.filter((w) => p.tokens.has(w)).length / t.length;
    if (hit > bestScore) { bestScore = hit; best = p.slug; }
  }
  return bestScore >= 0.85 ? best : null;
}

const LOCAL_RE = /\b(near me|in (india|nigeria|kenya|ghana|uk|usa|canada|australia|philippines|pakistan|south africa|hindi|urdu|tamil|telugu|bangla|tagalog|singapore|dubai|uae|germany|france|chennai|delhi|mumbai|pune|bangalore|hyderabad|lagos|nairobi|london|manila))\b/;
function intent(kw) {
  const k = norm(kw);
  if (LOCAL_RE.test(k)) return 'local';
  if (/\b(vs|versus|alternative|alternatives|like|better than|review|reviews|compare)\b/.test(k)) return 'compare';
  if (/\b(template|calculator|worksheet|spreadsheet|excel|sheet|printable|pdf|checklist|planner|app|apps|software|tool|tools)\b/.test(k)) return 'tool';
  if (/\b(salary|jobs?|career|careers|hiring|resume)\b/.test(k)) return 'career';
  if (/\b(course|courses|class|classes|certificate|certification|bootcamp|training|tutorial|lessons?|learn|study|free)\b/.test(k)) return 'learn';
  if (/^(how|what|why|when|can|is|are|does|do|should|which)\b/.test(k)) return 'question';
  return 'other';
}
const PAGE = {
  local: 'local page (only with real local facts)',
  compare: 'comparison page / blog',
  tool: 'blog post (+ template)',
  career: 'blog post',
  learn: 'blog post or course page',
  question: 'blog post',
  other: 'review by hand',
};

async function run(slug) {
  const cfg = SEEDS[slug];
  const course = COURSES.find((c) => c.slug === slug);
  if (!cfg || !course) throw new Error(`no seeds/course for ${slug}`);
  const idx = blogIndex();
  const found = new Map();
  const add = (kw, rank, seed, gl) => {
    const k = norm(kw);
    if (!k || k.length > 90) return;
    const e = found.get(k) ?? { score: 0, seeds: new Set(), markets: new Set() };
    e.score += Math.max(1, 11 - rank);
    e.seeds.add(seed);
    e.markets.add(gl);
    found.set(k, e);
  };
  let calls = 0;
  const q = async (text, seed, gl = 'us') => {
    const r = await suggest(text, gl);
    calls++;
    r.forEach((s, i) => add(s, i, seed, gl));
    await sleep(DELAY);
  };
  for (const seed of cfg.seeds) {
    await q(seed, seed);
    for (const a of ALPHA) await q(`${seed} ${a}`, seed);
    for (const p of PREFIX) await q(`${p} ${seed}`, seed);
    for (const s of SUFFIX) await q(`${seed} ${s}`, seed);
    for (const gl of MARKETS) {
      await q(seed, seed, gl);
      await q(`${seed} in`, seed, gl);
    }
  }
  const must = cfg.must.map((m) => m.toLowerCase());
  const rows = [...found.entries()]
    .filter(([k]) => must.some((m) => k.includes(m)))
    .map(([kw, e]) => {
      const cov = covered(kw, idx);
      const it = intent(kw);
      return {
        keyword: kw,
        score: e.score,
        seeds: e.seeds.size,
        markets: [...e.markets],
        intent: it,
        coveredBy: cov,
        page: cov ? `already covered: /blog/${cov}` : PAGE[it],
      };
    })
    .sort((a, b) => b.score - a.score);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(rows, null, 1));
  const by = (i) => rows.filter((r) => r.intent === i && !r.coveredBy);
  const md = [
    `# ${course.title}: keywords`,
    '',
    `${rows.length} keywords from ${calls} autocomplete calls. ${rows.filter((r) => r.coveredBy).length} already match an existing post.`,
    '',
  ];
  for (const i of ['question', 'learn', 'tool', 'compare', 'career', 'local', 'other']) {
    const list = by(i).slice(0, 25);
    if (!list.length) continue;
    md.push(`## ${i} (${by(i).length})`, '', '| keyword | score | markets |', '| --- | --- | --- |',
      ...list.map((r) => `| ${r.keyword} | ${r.score} | ${r.markets.length} |`), '');
  }
  fs.writeFileSync(path.join(OUT, `${slug}.md`), md.join('\n'));
  console.log(`${slug}: ${rows.length} keywords, ${calls} calls`);
}

const wanted = process.argv.slice(2).filter((a) => !a.startsWith('-'));
for (const slug of wanted.length ? wanted : Object.keys(SEEDS)) await run(slug);
