#!/usr/bin/env node
/**
 * Weekly Search Console review — find the pages to rewrite, not more to write.
 *
 *   GSC_CREDENTIALS=path/to/service-account.json node scripts/seo/gsc-opportunities.mjs
 *
 * Optional env:
 *   GSC_SITE   property, default "sc-domain:teyro.app"
 *   GSC_DAYS   window length, default 28 (compared with the window before it)
 *
 * One-time setup (about 5 minutes):
 *   1. Google Cloud console → create a project → enable "Google Search Console API".
 *   2. IAM → Service accounts → create one → Keys → add JSON key. Keep the file
 *      OUTSIDE the repo (it is a credential).
 *   3. Search Console → Settings → Users and permissions → add the service
 *      account's email as a Restricted user.
 *
 * Output: scripts/seo/out/gsc-<date>.md (git-ignored), four lists:
 *   1. Impressions, zero clicks — Google already shows you; the title loses the
 *      click. Rewrite the title/description to echo the query people typed.
 *   2. Striking distance — positions 8–20 with real demand. Improve the page
 *      (answer in the first 100 words, add the missing subtopic, internal links).
 *   3. Decliners — pages that lost the most clicks vs the previous window.
 *   4. Cannibalisation — one query split across several of our pages.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SITE = process.env.GSC_SITE ?? 'sc-domain:teyro.app';
const DAYS = Number(process.env.GSC_DAYS ?? 28);
const CREDS = process.env.GSC_CREDENTIALS ?? process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Where each public route's copy lives, so the report can show the current title.
const CONTENT_DIRS = {
  blog: 'content/blog',
  features: 'content/features',
  for: 'content/use-cases',
  alternatives: 'content/landing',
};

function b64url(input) {
  return Buffer.from(input).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function accessToken() {
  if (!CREDS || !fs.existsSync(CREDS)) {
    console.error('Set GSC_CREDENTIALS to a service-account JSON key file (see the header of this script).');
    process.exit(1);
  }
  const key = JSON.parse(fs.readFileSync(CREDS, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(`${header}.${claims}`)
    .sign(key.private_key)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Token exchange failed: ${JSON.stringify(json)}`);
  return json.access_token;
}

function isoDaysAgo(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

async function query(token, startDate, endDate, dimensions) {
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: JSON.stringify({ startDate, endDate, dimensions, rowLimit: 25000, startRow }),
      },
    );
    const json = await res.json();
    if (json.error) throw new Error(`${json.error.code} ${json.error.message}`);
    rows.push(...(json.rows ?? []));
    if (!json.rows || json.rows.length < 25000) break;
  }
  return rows;
}

const titleCache = new Map();
function currentTitle(url) {
  if (titleCache.has(url)) return titleCache.get(url);
  let title = null;
  try {
    const { pathname } = new URL(url);
    const [, section, slug] = pathname.split('/');
    const dir = CONTENT_DIRS[section];
    const file = dir && slug ? path.join(ROOT, dir, `${slug}.mdx`) : null;
    if (file && fs.existsSync(file)) {
      const m = fs.readFileSync(file, 'utf8').match(/^title:\s*["']?(.+?)["']?\s*$/m);
      title = m ? m[1] : null;
    } else if (section === 'alternatives' || section === 'for') {
      title = '(programmatic: lib/seo registry)';
    }
  } catch {
    /* not one of ours */
  }
  titleCache.set(url, title);
  return title;
}

const pct = (n) => `${(n * 100).toFixed(1)}%`;
const pos = (n) => n.toFixed(1);
const rel = (url) => url.replace(/^https?:\/\/[^/]+/, '') || '/';

async function main() {
  const token = await accessToken();
  // GSC data lags ~2–3 days; end the window before the gap.
  const end = isoDaysAgo(3);
  const start = isoDaysAgo(3 + DAYS - 1);
  const prevEnd = isoDaysAgo(3 + DAYS);
  const prevStart = isoDaysAgo(3 + DAYS * 2 - 1);

  console.log(`${SITE}: ${start} → ${end} (vs ${prevStart} → ${prevEnd})`);
  const [qp, pagesNow, pagesPrev] = await Promise.all([
    query(token, start, end, ['query', 'page']),
    query(token, start, end, ['page']),
    query(token, prevStart, prevEnd, ['page']),
  ]);

  const rows = qp.map((r) => ({
    query: r.keys[0],
    page: r.keys[1],
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    position: r.position,
  }));

  const zeroClick = rows
    .filter((r) => r.clicks === 0 && r.impressions >= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 40);

  const striking = rows
    .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 30);

  const prevClicks = new Map(pagesPrev.map((r) => [r.keys[0], r.clicks]));
  const decliners = pagesNow
    .map((r) => ({ page: r.keys[0], now: r.clicks, before: prevClicks.get(r.keys[0]) ?? 0 }))
    .filter((r) => r.before >= 5 && r.now < r.before)
    .sort((a, b) => b.before - b.now - (a.before - a.now))
    .slice(0, 20);

  const byQuery = new Map();
  for (const r of rows) {
    if (r.impressions < 10) continue;
    const list = byQuery.get(r.query) ?? [];
    list.push(r);
    byQuery.set(r.query, list);
  }
  const cannibal = [...byQuery.entries()]
    .filter(([, list]) => list.length >= 2)
    .map(([q, list]) => ({ q, list: list.sort((a, b) => a.position - b.position), imp: list.reduce((s, r) => s + r.impressions, 0) }))
    .sort((a, b) => b.imp - a.imp)
    .slice(0, 15);

  const totals = pagesNow.reduce(
    (acc, r) => ({ clicks: acc.clicks + r.clicks, impressions: acc.impressions + r.impressions }),
    { clicks: 0, impressions: 0 },
  );

  const md = [
    `# Search Console opportunities — ${end}`,
    ``,
    `${SITE} · ${start} → ${end} · ${totals.clicks.toLocaleString()} clicks · ${totals.impressions.toLocaleString()} impressions`,
    ``,
    `Rule: rewrite the losers before publishing anything new.`,
    ``,
    `## 1. Impressions, zero clicks — retitle to match the query`,
    ``,
    `| Query | Page | Impr. | Pos. | Current title |`,
    `| --- | --- | ---: | ---: | --- |`,
    ...zeroClick.map((r) => `| ${r.query} | ${rel(r.page)} | ${r.impressions} | ${pos(r.position)} | ${currentTitle(r.page) ?? '—'} |`),
    ``,
    `## 2. Striking distance (positions 8–20) — improve the page`,
    ``,
    `| Query | Page | Impr. | Clicks | CTR | Pos. |`,
    `| --- | --- | ---: | ---: | ---: | ---: |`,
    ...striking.map((r) => `| ${r.query} | ${rel(r.page)} | ${r.impressions} | ${r.clicks} | ${pct(r.ctr)} | ${pos(r.position)} |`),
    ``,
    `## 3. Decliners vs the previous ${DAYS} days`,
    ``,
    `| Page | Clicks before | Clicks now |`,
    `| --- | ---: | ---: |`,
    ...decliners.map((r) => `| ${rel(r.page)} | ${r.before} | ${r.now} |`),
    ``,
    `## 4. Cannibalisation — one query, several of our pages`,
    ``,
    `Pick one page per query, merge or redirect the others, and point internal links at the winner.`,
    ``,
    ...cannibal.map(({ q, list }) => `- **${q}** — ${list.map((r) => `${rel(r.page)} (pos ${pos(r.position)}, ${r.impressions} impr.)`).join(' · ')}`),
    ``,
  ];

  const out = path.join(ROOT, 'scripts', 'seo', 'out', `gsc-${end}.md`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, md.join('\n'));
  console.log(`Wrote ${path.relative(ROOT, out)}`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
