#!/usr/bin/env node
/**
 * Topical-authority finder (free, no paid tool).
 *
 * Direct keywords tell you what to rank for. This covers the *supporting* topics a site needs
 * to look like an authority: the concepts, terms, comparisons and questions around each course.
 *
 *   1. data/topical-concepts.json: ~16 supporting concepts per course (curated subject map).
 *   2. Coverage: how many existing posts mention each concept in slug, title or tags.
 *   3. Demand: how many autocomplete suggestions Google gives for the bare concept, plus the
 *      questions people type around it ("what is X", "X vs", "X examples", "X mistakes").
 *
 *   node scripts/seo/topical.mjs [slug...]     # --offline skips the Google calls
 *
 * Cache: out/topical-cache.json (resumes after a block). Report: docs/seo/topical-authority.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FRONT = path.resolve(HERE, '..', '..');
const REPO = path.resolve(FRONT, '..');
const KW = path.join(HERE, 'out', 'keywords');
const CACHE = path.join(HERE, 'out', 'topical-cache.json');
const SEEDS = JSON.parse(fs.readFileSync(path.join(HERE, 'keyword-seeds.json'), 'utf8'));
const COURSES = JSON.parse(fs.readFileSync(path.join(HERE, 'data', 'courses.json'), 'utf8')).courses;
const offline = process.argv.includes('--offline');
const wanted = process.argv.slice(2).filter((a) => !a.startsWith('-'));

const STOP = new Set(('a an the to for of in on and or is are was be it its i my me you your we our how what why when where which who ' +
  'do does did can could should would will with without from by as at that this these those not no vs best top free online ' +
  'learn learning course courses tutorial tutorials beginners beginner beginner\'s guide step steps tips ideas example examples ' +
  'easy simple basic basics good new use using make making get getting need want like about into than then also more most ' +
  'work works working app apps way ways people person things thing 2024 2025 2026 near pdf video videos youtube reddit ' +
  'class classes training certificate certification definition meaning').split(' '));
const toks = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
class Blocked extends Error {}

// What the site already says: every blog post's slug + title + tags.
function siteText() {
  const dir = path.join(FRONT, 'content', 'blog');
  const out = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.mdx') || f.startsWith('_')) continue;
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const head = raw.split('\n---')[0];
    out.push(new Set(toks(f.replace(/-/g, ' ') + ' ' + head)));
  }
  return out;
}
const SITE = siteText();
const CONCEPTS = JSON.parse(fs.readFileSync(path.join(HERE, 'data', 'topical-concepts.json'), 'utf8'));
const mentions = (gram) => {
  const t = toks(gram);
  return SITE.filter((s) => t.every((w) => s.has(w))).length;
};

function entities(slug) {
  const file = path.join(KW, `${slug}.json`);
  if (!fs.existsSync(file)) return [];
  const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
  const seedToks = new Set((SEEDS[slug]?.seeds ?? []).flatMap(toks));
  const map = new Map();
  for (const r of rows) {
    if (r.intent === 'local') continue;
    const t = toks(r.keyword);
    const seen = new Set();
    for (const n of [2, 3]) {
      for (let i = 0; i + n <= t.length; i++) {
        const g = t.slice(i, i + n);
        if (STOP.has(g[0]) || STOP.has(g[g.length - 1])) continue;
        if (g.every((w) => seedToks.has(w) || STOP.has(w))) continue; // just the seed again
        if (g.some((w) => /^\d+$/.test(w))) continue;
        const k = g.join(' ');
        if (seen.has(k)) continue;
        seen.add(k);
        const e = map.get(k) ?? { gram: k, kws: 0, score: 0, markets: new Set(), sample: [] };
        e.kws++; e.score += r.score; r.markets.forEach((m) => e.markets.add(m));
        if (e.sample.length < 3) e.sample.push(r.keyword);
        map.set(k, e);
      }
    }
  }
  // Drop a 2-gram when a 3-gram containing it has nearly the same count (keeps the fuller concept).
  const all = [...map.values()].filter((e) => e.kws >= 3);
  const keep = all.filter((e) => !all.some((o) => o !== e && o.gram.length > e.gram.length && o.gram.includes(e.gram) && o.kws >= e.kws * 0.8));
  return keep.map((e) => ({ gram: e.gram, kws: e.kws, score: e.score, markets: e.markets.size, sample: e.sample, mentions: mentions(e.gram) }))
    .sort((a, b) => b.score - a.score);
}

const cache = fs.existsSync(CACHE) ? JSON.parse(fs.readFileSync(CACHE, 'utf8')) : {};
async function suggest(q) {
  if (cache[q]) return cache[q];
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}&hl=en&gl=us`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (res.status === 429 || res.status === 403) {
        if (attempt === 2) throw new Blocked(`Google answered ${res.status}`);
        await sleep(20000 * (attempt + 1));
        continue;
      }
      if (!res.ok) return [];
      const j = await res.json();
      cache[q] = Array.isArray(j[1]) ? j[1] : [];
      await sleep(300);
      return cache[q];
    } catch (e) { if (e instanceof Blocked) throw e; await sleep(1000); }
  }
  return [];
}
const save = () => fs.writeFileSync(CACHE, JSON.stringify(cache));

const FRAMES = (g) => [`what is ${g}`, `${g} meaning`, `${g} examples`, `${g} vs`, `${g} mistakes`, `how to ${g}`, `why ${g}`, `${g} for beginners`];

const slugs = wanted.length ? wanted : Object.keys(CONCEPTS);
const report = {};
let stopped = false;
for (const slug of slugs) {
  const course = COURSES.find((c) => c.slug === slug);
  if (!course || !CONCEPTS[slug]) continue;
  const rows = [];
  try {
    for (const c of CONCEPTS[slug]) {
      const row = { concept: c, mentions: mentions(c), demand: 0, questions: [] };
      if (!offline) {
        await suggest(c);
        for (const f of FRAMES(c)) {
          for (const x of await suggest(f)) {
            const k = x.toLowerCase().trim();
            if (k === f || k === c || !k.includes(c.split(' ')[0])) continue;
            if (!/^(what|how|why|when|is|are|can|does|do|should)\s|\b(vs|versus|meaning|definition|examples?|mistakes|types|steps|rules|checklist|template)\b/.test(k)) continue;
            if (!row.questions.includes(k)) row.questions.push(k);
          }
        }
        row.demand += Math.min(row.questions.length, 60);
      }
      rows.push(row);
    }
  } catch (e) {
    save();
    if (e instanceof Blocked) { console.error(`STOPPED at ${slug}: ${e.message}. Re-run later; the cache keeps progress.`); stopped = true; break; }
    throw e;
  }
  save();
  rows.sort((a, b) => b.demand - a.demand);
  report[slug] = { title: course.title, category: course.category, rows };
  console.log(`${slug}: ${rows.length} concepts, ${rows.filter((r) => r.mentions <= 1).length} not covered`);
}

const md = ['# Topical authority map', '',
  'Supporting topics each course area needs to look like an authority, beyond its direct keywords. Generated by `scripts/seo/topical.mjs` from `scripts/seo/data/topical-concepts.json`.',
  '',
  '- **Posts**: existing blog posts that mention the concept in slug, title or tags. 0-1 = a gap.',
  '- **Demand**: Google autocomplete strength for the concept and the questions around it (relative, not search volume).',
  '- **Questions**: what people type around it. Use them as the H2s/FAQ of the post.',
  ''];
for (const [slug, r] of Object.entries(report)) {
  md.push(`## ${r.title} (${r.category})`, '', '| Concept | Posts | Demand | Questions people type |', '| --- | ---: | ---: | --- |');
  for (const x of r.rows) md.push(`| ${x.concept} | ${x.mentions} | ${x.demand} | ${x.questions.slice(0, 3).join('; ')} |`);
  md.push('');
}
fs.mkdirSync(path.join(REPO, 'docs', 'seo'), { recursive: true });
fs.writeFileSync(path.join(REPO, 'docs', 'seo', 'topical-authority.md'), md.join('\n'));
fs.writeFileSync(path.join(HERE, 'out', 'topical.json'), JSON.stringify(report, null, 1));
console.log('wrote docs/seo/topical-authority.md' + (stopped ? ' (partial, blocked)' : ''));
