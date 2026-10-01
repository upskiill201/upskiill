#!/usr/bin/env node
/**
 * Complaint miner — keyword research from competitors' 1–2 star reviews.
 *
 *   node scripts/seo/mine-complaints.mjs            # all competitors
 *   node scripts/seo/mine-complaints.mjs mimo sololearn
 *
 * Why: marketers phrase problems one way, frustrated users phrase them
 * another, and search queries follow the users. Every recurring complaint is
 * a page ("how to learn to code without running out of hearts").
 *
 * Source: Apple's public customer-review RSS feed plus the reviews the App
 * Store web page server-renders (no key; the feed is often empty, the page
 * gives ~20 per storefront). Google Play has no public review API, so it is not
 * covered here.
 *
 * Writes two files:
 *   content/seo/complaints.json   — theme counts per competitor. The
 *                                   /alternatives pages read this, so it only
 *                                   holds aggregates, never review text.
 *   scripts/seo/out/complaints.md — the research report, with review excerpts
 *                                   and repeated phrases. Git-ignored: it is
 *                                   for the founder, not for publishing.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const JSON_OUT = path.join(ROOT, 'content', 'seo', 'complaints.json');
const REPORT_OUT = path.join(ROOT, 'scripts', 'seo', 'out', 'complaints.md');

// App Store ids — keys match lib/seo/competitors.ts.
const APPS = {
  duolingo: 570060128,
  mimo: 1133960732,
  sololearn: 1210079064,
  brilliant: 913335252,
  codecademy: 1376029326,
  datacamp: 1263413087,
  udemy: 562413829,
  coursera: 736535961,
  'khan-academy': 469863705,
  'linkedin-learning': 1084807225,
  'programming-hub': 1049691226,
};

// English-speaking storefronts where Teyro's learners are.
const COUNTRIES = ['us', 'gb', 'in', 'ng', 'ca', 'au'];
const PAGES = 10; // Apple caps the feed at 10 pages of 50

// Each theme is a page type waiting to happen. Order matters only for the
// report; a review can land in several themes.
export const THEMES = [
  {
    id: 'paywall',
    label: 'Paywalls and subscription price',
    re: /paywall|subscri|pay to|pro version|premium|price|expensive|overpriced|money|charg|refund|free trial|cancel|\$\d/,
  },
  {
    id: 'limits',
    label: 'Hearts, energy or daily limits cut practice short',
    re: /\bhearts?\b|energy|\blives\b|run(ning)? out|wait (\d+ )?hours?|limit(ed|s)? (on )?(how|lessons|practice)|can'?t practi[cs]e/,
  },
  {
    id: 'ads',
    label: 'Too many ads',
    re: /\bads?\b|advert/,
  },
  {
    id: 'bugs',
    label: 'Bugs, crashes and lost progress',
    re: /\bbugs?\b|bugg|crash|glitch|freez|lost (all )?(my )?progress|progress (is |was )?(gone|lost|reset|deleted)|won'?t (load|open)|doesn'?t (load|work)|logged me out|keeps? logging/,
  },
  {
    id: 'shallow',
    label: 'Too basic to build anything real',
    re: /too (easy|basic|simple)|not practical|can'?t (actually )?(code|build|write)|no real (projects?|coding)|only (syntax|theory)|shallow|surface|repetitive|same (questions|thing)|memoriz/,
  },
  {
    id: 'streak',
    label: 'Losing a streak unfairly',
    re: /streak/,
  },
  {
    id: 'content-errors',
    label: 'Wrong answers or content errors',
    re: /wrong answer|marked (it |me )?(as )?wrong|incorrect|error in|mistakes? in|typo|outdated/,
  },
  {
    id: 'support',
    label: 'No reply from support',
    re: /customer (service|support)|support (team)?(never|doesn'?t|didn'?t)|no response|never (replied|responded)|contact/,
  },
  {
    id: 'redesign',
    label: 'A redesign or update made it worse',
    re: /new (update|design|layout|version)|latest update|since the update|redesign|used to be (good|great|better)/,
  },
];

const STOP = new Set(
  'the a an and or but to of in on for it is was this that i my me you your with app be have has had not so they them just are at as from its it\'s im i\'m do does did can will would all very if no get got out up now there when what which than then one'.split(
    ' ',
  ),
);

async function fetchJson(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'teyro-seo-research/1.0' } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === 2) {
        console.warn(`  ! ${url}: ${err.message}`);
        return null;
      }
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
  return null;
}

// The review page server-renders ~20 reviews as JSON. It keeps working when
// the RSS feed comes back empty, which it does for many apps.
async function fetchPageReviews(appId, cc) {
  try {
    const res = await fetch(`https://apps.apple.com/${cc}/app/id${appId}?see-all=reviews`, {
      headers: { 'user-agent': 'Mozilla/5.0 (teyro-seo-research)' },
    });
    if (!res.ok) return [];
    const html = await res.text();
    return html
      .split('"$kind":"Review"')
      .slice(1)
      .map((chunk) => {
        const field = (name) => chunk.match(new RegExp(`"${name}":"((?:[^"\\\\]|\\\\.)*)"`))?.[1];
        const rating = Number(chunk.match(/"rating":(\d)/)?.[1]);
        const decode = (s) => (s ? JSON.parse(`"${s}"`) : '');
        return {
          id: field('id'),
          rating,
          title: decode(field('title')),
          body: decode(field('contents')),
          date: field('date')?.slice(0, 10) ?? '',
          country: cc,
        };
      })
      .filter((r) => r.id && r.rating);
  } catch {
    return [];
  }
}

async function fetchReviews(appId) {
  const seen = new Set();
  const reviews = [];
  for (const cc of COUNTRIES) {
    for (const r of await fetchPageReviews(appId, cc)) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      reviews.push(r);
    }
    for (let page = 1; page <= PAGES; page++) {
      const data = await fetchJson(
        `https://itunes.apple.com/${cc}/rss/customerreviews/page=${page}/id=${appId}/sortby=mostrecent/json`,
      );
      const entries = data?.feed?.entry;
      if (!Array.isArray(entries) || entries.length === 0) break;
      for (const e of entries) {
        const id = e.id?.label;
        const rating = Number(e['im:rating']?.label);
        if (!id || !rating || seen.has(id)) continue;
        seen.add(id);
        reviews.push({
          rating,
          title: e.title?.label ?? '',
          body: e.content?.label ?? '',
          date: e.updated?.label?.slice(0, 10) ?? '',
          country: cc,
        });
      }
    }
  }
  return reviews;
}

function ngrams(text, n) {
  const words = text
    .toLowerCase()
    .replace(/['’]/g, '').replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const out = [];
  for (let i = 0; i + n <= words.length; i++) {
    const gram = words.slice(i, i + n);
    if (STOP.has(gram[0]) || STOP.has(gram[n - 1])) continue;
    out.push(gram.join(' '));
  }
  return out;
}

function analyse(reviews) {
  const low = reviews.filter((r) => r.rating <= 2);
  const themes = THEMES.map((t) => {
    const hits = low.filter((r) => t.re.test(`${r.title} ${r.body}`.toLowerCase()));
    return { id: t.id, label: t.label, count: hits.length, examples: hits.slice(0, 4) };
  });

  const counts = new Map();
  for (const r of low) {
    const grams = new Set([...ngrams(r.body, 2), ...ngrams(r.body, 3), ...ngrams(r.body, 4)]);
    for (const g of grams) counts.set(g, (counts.get(g) ?? 0) + 1);
  }
  const phrases = [...counts.entries()]
    .filter(([, c]) => c >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25);

  const dates = low.map((r) => r.date).filter(Boolean).sort();
  return {
    reviewed: reviews.length,
    lowStar: low.length,
    from: dates[0] ?? null,
    to: dates[dates.length - 1] ?? null,
    themes,
    phrases,
  };
}

function excerpt(text, max = 220) {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

async function main() {
  const wanted = process.argv.slice(2);
  const keys = wanted.length ? wanted.filter((k) => k in APPS) : Object.keys(APPS);
  if (keys.length === 0) {
    console.error(`Unknown competitor. Known: ${Object.keys(APPS).join(', ')}`);
    process.exit(1);
  }

  // Merge into the existing snapshot so a partial run keeps the others.
  const snapshot = fs.existsSync(JSON_OUT)
    ? JSON.parse(fs.readFileSync(JSON_OUT, 'utf8'))
    : { generatedAt: null, source: 'Apple App Store public reviews', competitors: {} };
  const report = [
    `# Competitor complaint report`,
    ``,
    `Generated ${new Date().toISOString().slice(0, 10)} from 1–2★ App Store reviews (${COUNTRIES.join(', ')}).`,
    `Every theme with real volume is a candidate page. Use the exact phrasing below in titles and H2s.`,
    ``,
  ];

  for (const key of keys) {
    process.stdout.write(`${key}… `);
    const reviews = await fetchReviews(APPS[key]);
    const a = analyse(reviews);
    console.log(`${a.reviewed} reviews, ${a.lowStar} at 1–2★`);

    snapshot.competitors[key] = {
      appStoreId: APPS[key],
      reviewed: a.reviewed,
      lowStar: a.lowStar,
      from: a.from,
      to: a.to,
      themes: Object.fromEntries(a.themes.map((t) => [t.id, t.count])),
    };

    report.push(`## ${key} — ${a.lowStar} low-star of ${a.reviewed} (${a.from} → ${a.to})`, ``);
    for (const t of [...a.themes].sort((x, y) => y.count - x.count)) {
      if (t.count === 0) continue;
      const share = a.lowStar ? Math.round((t.count / a.lowStar) * 100) : 0;
      report.push(`### ${t.label} — ${t.count} (${share}%)`);
      for (const ex of t.examples) {
        report.push(`- ${ex.rating}★ ${ex.country} · **${excerpt(ex.title, 80)}** — ${excerpt(ex.body)}`);
      }
      report.push('');
    }
    if (a.phrases.length) {
      report.push(`**Repeated phrases:** ${a.phrases.map(([p, c]) => `"${p}" ×${c}`).join(', ')}`, '');
    }
  }

  snapshot.generatedAt = new Date().toISOString().slice(0, 10);
  snapshot.themes = Object.fromEntries(THEMES.map((t) => [t.id, t.label]));
  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.mkdirSync(path.dirname(REPORT_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
  fs.writeFileSync(REPORT_OUT, `${report.join('\n')}\n`);
  console.log(`\nWrote ${path.relative(ROOT, JSON_OUT)} and ${path.relative(ROOT, REPORT_OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
