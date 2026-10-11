/**
 * robots.txt must never again block a public page.
 *
 * The file used to be an allow-list ending in "Disallow: /" for Googlebot and
 * friends, so every page it didn't name (the whole /learn-coding, /learn-ai
 * and /learn-online sections, /courses, /start) was silently uncrawlable
 * while still listed in the sitemap. These tests read the real robots.txt
 * and the real sitemap, apply Google's matching rules, and fail if a sitemap
 * URL is blocked for any crawler, or a private route is open.
 */

import fs from 'fs';
import path from 'path';

// github-slugger is ESM-only and only builds heading anchors; irrelevant here.
jest.mock('github-slugger', () => ({ __esModule: true, default: class { slug(t: string) { return t; } reset() {} } }));

jest.mock('@/lib/courses/public', () => ({
  fetchPublicCourses: async () => [
    { slug: 'the-complete-ai-engineer-bootcamp-2027' },
    { slug: 'learn-git-github-and-github-actions' },
  ],
  coursePath: (slug: string) => `/courses/${slug}`,
}));

import sitemap from '@/app/sitemap';

interface Rule {
  allow: boolean;
  pattern: string;
}
type Groups = { agents: string[]; rules: Rule[] }[];

function parse(text: string): Groups {
  const groups: Groups = [];
  let cur: Groups[number] | null = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    if (!line) continue;
    const [k, ...rest] = line.split(':');
    const key = k.trim().toLowerCase();
    const value = rest.join(':').trim();
    if (key === 'user-agent') {
      if (!cur || !lastWasAgent) {
        cur = { agents: [], rules: [] };
        groups.push(cur);
      }
      cur.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if ((key === 'allow' || key === 'disallow') && cur) {
      lastWasAgent = false;
      if (value) cur.rules.push({ allow: key === 'allow', pattern: value });
    } else {
      lastWasAgent = false;
    }
  }
  return groups;
}

/** Google's matching: `*` wildcard, `$` end anchor, longest pattern wins, Allow wins a tie. */
function matches(pattern: string, pathAndQuery: string): boolean {
  const re = new RegExp(
    '^' +
      pattern
        .replace(/[.+?^${}()|[\]\\]/g, (c) => (c === '$' ? '$' : '\\' + c))
        .replace(/\*/g, '.*'),
  );
  return re.test(pathAndQuery);
}

function allowed(groups: Groups, agent: string, p: string): boolean {
  const a = agent.toLowerCase();
  const named = groups.find((g) => g.agents.includes(a));
  const group = named ?? groups.find((g) => g.agents.includes('*'));
  if (!group) return true;
  let best: Rule | null = null;
  for (const r of group.rules) {
    if (!matches(r.pattern, p)) continue;
    if (!best || r.pattern.length > best.pattern.length || (r.pattern.length === best.pattern.length && r.allow)) best = r;
  }
  return best ? best.allow : true;
}

const robotsText = fs.readFileSync(path.join(__dirname, '../../../public/robots.txt'), 'utf8');
const groups = parse(robotsText);

const SEARCH = ['*', 'Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot', 'Applebot', 'YandexBot'];
const AI = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Meta-ExternalAgent',
];

const PRIVATE = [
  '/dashboard', '/dashboard/profile', '/learn/abc/section/0', '/onboarding/3', '/creator/courses', '/creator/login',
  '/login', '/signup', '/forgot-password', '/reset-password', '/verify-email', '/checkout', '/cart', '/admin/users',
  '/api/courses', '/api/auth/me', '/webhook/tally', '/certificates/abc', '/my-learning', '/shop',
];

describe('robots.txt', () => {
  it('lets every crawler read every URL in the sitemap', async () => {
    const urls = (await sitemap()).map((e) => new URL(e.url));
    expect(urls.length).toBeGreaterThan(1000);
    const blocked: string[] = [];
    for (const u of urls) {
      for (const bot of [...SEARCH, ...AI]) {
        if (!allowed(groups, bot, u.pathname + u.search)) blocked.push(`${bot} ✗ ${u.pathname}`);
      }
    }
    expect(blocked).toEqual([]);
  });

  it('keeps the whole /learn-* family crawlable (it used to be blocked)', () => {
    for (const p of ['/learn-coding', '/learn-coding/alabama', '/learn-ai', '/learn-ai/texas', '/learn-online', '/courses', '/courses/learn-git-github-and-github-actions', '/start', '/creator-profile/someone']) {
      expect(allowed(groups, 'Googlebot', p)).toBe(true);
    }
  });

  it('lets crawlers load the images, fonts and scripts a page needs to render', () => {
    for (const p of ['/_next/static/chunks/app.js', '/_next/static/css/app.css', '/_next/image?url=%2Fa.webp&w=640&q=75', '/mascot.webp', '/hero.avif', '/fonts/x.woff2', '/Icons/burn.png']) {
      expect(allowed(groups, 'Googlebot', p)).toBe(true);
    }
  });

  it('keeps the signed-in app, auth, checkout and internal routes out', () => {
    for (const bot of ['*', 'Googlebot', 'GPTBot', 'ClaudeBot', 'PerplexityBot']) {
      for (const p of PRIVATE) expect(allowed(groups, bot, p)).toBe(false);
    }
  });

  it('points at the sitemap', () => {
    expect(robotsText).toMatch(/^Sitemap: https:\/\/teyro\.app\/sitemap\.xml$/m);
  });
});
