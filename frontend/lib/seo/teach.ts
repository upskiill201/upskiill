import data from '@/content/seo/teach-data.json';
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';

/**
 * Creator-recruitment location pages: /teach/<skill>/<place>.
 *
 * Every page is backed by numbers only that place has (BLS pay and jobs for
 * US states and metros; World Bank + exchange rate for countries). A place
 * without data gets no page — that rule is what keeps ~1,000 pages from being
 * doorway pages. Data comes from scripts/seo/build-teach-data.mjs; metros
 * appear as the BLS fetch completes.
 */

export type TeachSkill = 'coding' | 'ai';
export const TEACH_SKILLS: TeachSkill[] = ['coding', 'ai'];
export const CREATOR_SHARE_PCT = 70; // backend EarningsService default agreement
export const MIN_PAYOUT_USD = 50;
export const CLEARING_DAYS = 14;
export const APPLY_HREF = '/creator/onboarding';

/**
 * A worked example, always labelled as one — never a promise. Paid courses are
 * subscriptions: one price becomes a monthly plan (lib/pricing-engine), and the
 * creator keeps their share of every monthly payment.
 */
export const EXAMPLE_PRICE_USD = 60; // the creator's price = the yearly plan
export const EXAMPLE_MONTHLY_USD = calculateCoursePricingLadder(EXAMPLE_PRICE_USD).monthly.price;
export const EXAMPLE_KEEP_USD = Math.round(EXAMPLE_MONTHLY_USD * CREATOR_SHARE_PCT) / 100;

export const SKILL_COPY: Record<
  TeachSkill,
  { label: string; noun: string; jobsQuery: string; occupation: string; teach: string[] }
> = {
  coding: {
    label: 'Coding',
    noun: 'coding',
    jobsQuery: 'online coding teacher jobs',
    occupation: 'software developers',
    teach: [
      'Programming fundamentals for complete beginners',
      'Web development: HTML, CSS, JavaScript, React',
      'Mobile apps',
      'Backend, APIs and databases',
      'Interview prep and real-world software practice',
    ],
  },
  ai: {
    label: 'AI',
    noun: 'AI',
    jobsQuery: 'AI tutor jobs',
    occupation: 'data scientists',
    teach: [
      'Using AI tools well at work',
      'Prompting and AI-assisted coding',
      'Building AI agents',
      'Automations with AI and no-code tools',
      'Machine learning and data fundamentals',
    ],
  },
};

type UsRow = (typeof data.us)[number];
type CountryRow = (typeof data.countries)[number] & {
  short?: string;
  population?: number;
  internetPct?: number;
  gdpPerCapita?: number;
};

export interface TeachPlace {
  slug: string;
  kind: 'state' | 'metro' | 'country';
  /** For headings: "Texas", "Austin, TX", "Kenya" */
  name: string;
  /** Mid-sentence: "the Austin–Round Rock–San Marcos area", "the UK" */
  inSentence: string;
  region: string;
  stateSlug?: string;
  us?: UsRow;
  country?: CountryRow;
  skills: TeachSkill[];
}

export const STATE_ABBR: Record<string, string> = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA', '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC',
  '12': 'FL', '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA', '20': 'KS', '21': 'KY',
  '22': 'LA', '23': 'ME', '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS', '29': 'MO', '30': 'MT',
  '31': 'NE', '32': 'NV', '33': 'NH', '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH',
  '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI', '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI', '56': 'WY',
};

const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function metroNames(row: UsRow) {
  // "Austin-Round Rock-San Marcos, TX" → city "Austin", state "TX"
  const [cities, states = ''] = row.name.split(', ');
  const city = cities.split('-')[0].trim();
  const st = states.split('-')[0].trim();
  return { city, st, full: cities.replace(/-/g, '–') };
}

function hasSkill(row: { devMedian: number | null; devJobs: number | null; dsMedian: number | null; dsJobs: number | null }, skill: TeachSkill) {
  return skill === 'coding' ? row.devMedian != null && row.devJobs != null : row.dsMedian != null && row.dsJobs != null;
}

function build(): TeachPlace[] {
  const states = new Map<string, TeachPlace>();
  const places: TeachPlace[] = [];

  for (const row of data.us.filter((r) => r.type === 'state')) {
    const place: TeachPlace = {
      // The state gets a suffix so /washington-dc stays the metro.
      slug: row.name === 'Washington' ? 'washington-state' : slugify(row.name),
      kind: 'state',
      name: row.name,
      inSentence: row.name,
      region: 'United States',
      us: row,
      skills: TEACH_SKILLS.filter((s) => hasSkill(row, s)),
    };
    states.set(row.stateCode, place);
    places.push(place);
  }

  for (const row of data.us.filter((r) => r.type === 'metro')) {
    const { city, st, full } = metroNames(row);
    places.push({
      slug: slugify(`${city}-${st}`),
      kind: 'metro',
      name: `${city}, ${st}`,
      inSentence: `the ${full} area`,
      region: 'United States',
      stateSlug: states.get(row.stateCode)?.slug,
      us: row,
      skills: TEACH_SKILLS.filter((s) => hasSkill(row, s)),
    });
  }

  for (const c of data.countries as CountryRow[]) {
    // The US is covered state by state; a country page needs World Bank data.
    if (c.iso3 === 'USA' || c.population == null || c.usdRate == null) continue;
    const display = c.name.replace(/^the /, '');
    places.push({
      slug: c.slug,
      kind: 'country',
      name: display.charAt(0).toUpperCase() + display.slice(1),
      inSentence: c.short ?? c.name,
      region: c.region,
      country: c,
      skills: [...TEACH_SKILLS],
    });
  }

  // A state slug must never shadow a country or metro slug.
  const seen = new Set<string>();
  return places.filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)));
}

export const TEACH_PLACES = build();
const BY_SLUG = new Map(TEACH_PLACES.map((p) => [p.slug, p]));

export function getTeachPlace(skill: string, slug: string): TeachPlace | null {
  if (!TEACH_SKILLS.includes(skill as TeachSkill)) return null;
  const place = BY_SLUG.get(slug);
  return place && place.skills.includes(skill as TeachSkill) ? place : null;
}

export function teachParams() {
  return TEACH_PLACES.flatMap((p) => p.skills.map((skill) => ({ skill, place: p.slug })));
}

export const teachPath = (skill: TeachSkill, place: TeachPlace) => `/teach/${skill}/${place.slug}`;

export const TEACH_SOURCES = {
  bls: `${data.bls.source}, May ${data.bls.year} estimates`,
  blsYear: data.bls.year,
  worldBank: data.worldBank.source,
  fx: `${data.fx.source}, ${data.fx.date}`,
  generatedAt: data.generatedAt,
};

/* ── Derived numbers ─────────────────────────────────────────────────── */

function metric(p: TeachPlace, skill: TeachSkill) {
  if (!p.us) return null;
  return skill === 'coding'
    ? { median: p.us.devMedian!, jobs: p.us.devJobs! }
    : { median: p.us.dsMedian!, jobs: p.us.dsJobs! };
}

/** Rank by median pay among places of the same kind (1 = highest). */
export function payRank(p: TeachPlace, skill: TeachSkill) {
  const peers = TEACH_PLACES.filter((q) => q.kind === p.kind && q.skills.includes(skill));
  const sorted = peers.map((q) => ({ q, m: metric(q, skill)!.median })).sort((a, b) => b.m - a.m);
  return { rank: sorted.findIndex((x) => x.q === p) + 1, of: sorted.length };
}

export function jobsRank(p: TeachPlace, skill: TeachSkill) {
  const peers = TEACH_PLACES.filter((q) => q.kind === p.kind && q.skills.includes(skill));
  const sorted = peers.map((q) => ({ q, m: metric(q, skill)!.jobs })).sort((a, b) => b.m - a.m);
  return { rank: sorted.findIndex((x) => x.q === p) + 1, of: sorted.length };
}

export function usStats(p: TeachPlace, skill: TeachSkill) {
  const m = metric(p, skill);
  if (!m) return null;
  const state = p.stateSlug ? BY_SLUG.get(p.stateSlug) : undefined;
  const stateMetric = state ? metric(state, skill) : null;
  return {
    ...m,
    hourly: Math.round(m.median / 2080),
    pay: payRank(p, skill),
    size: jobsRank(p, skill),
    state,
    vsState: stateMetric?.median ? Math.round(((m.median - stateMetric.median) / stateMetric.median) * 100) : null,
  };
}

export function countryStats(p: TeachPlace) {
  const c = p.country;
  if (!c) return null;
  const keep = EXAMPLE_KEEP_USD;
  return {
    currency: c.currency,
    rate: c.usdRate!,
    keepUsd: keep,
    keepLocal: keep * c.usdRate!,
    population: c.population!,
    internetPct: c.internetPct ?? null,
    gdpPerCapita: c.gdpPerCapita ?? null,
    gdpMonthly: c.gdpPerCapita ? c.gdpPerCapita / 12 : null,
    year: (c as { wbYear?: string }).wbYear ?? null,
    mobileMoney: c.mobileMoney ?? [],
  };
}

/** Other pages worth linking from this one — the hierarchy, made walkable. */
export function nearby(p: TeachPlace, skill: TeachSkill, limit = 6): TeachPlace[] {
  const has = (q: TeachPlace) => q !== p && q.skills.includes(skill);
  let pool: TeachPlace[];
  if (p.kind === 'state') pool = TEACH_PLACES.filter((q) => has(q) && q.kind === 'metro' && q.stateSlug === p.slug);
  else if (p.kind === 'metro')
    pool = [
      ...TEACH_PLACES.filter((q) => has(q) && q.slug === p.stateSlug),
      ...TEACH_PLACES.filter((q) => has(q) && q.kind === 'metro' && q.stateSlug === p.stateSlug),
    ];
  else pool = TEACH_PLACES.filter((q) => has(q) && q.kind === 'country' && q.region === p.region);

  if (pool.length < limit) {
    const fill = TEACH_PLACES.filter(
      (q) => has(q) && !pool.includes(q) && q.kind === (p.kind === 'country' ? 'country' : 'state'),
    ).sort((a, b) => (metric(b, skill)?.jobs ?? b.country?.population ?? 0) - (metric(a, skill)?.jobs ?? a.country?.population ?? 0));
    pool = [...pool, ...fill];
  }
  return pool.slice(0, limit);
}

/* ── Formatting ──────────────────────────────────────────────────────── */

export const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;
export const num = (n: number) => Math.round(n).toLocaleString('en-US');
export const pct = (n: number) => `${Math.round(n)}%`;
export function money(n: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: n >= 100 ? 0 : 2,
    }).format(n);
  } catch {
    return `${currency} ${num(n)}`;
  }
}
export function bigNum(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} billion`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} million`;
  return num(n);
}
export const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};
