#!/usr/bin/env node
/**
 * Turns a course's keyword list (out/keywords/<slug>.json) into a page map:
 * which page each keyword is answered by, and which are left for later or
 * skipped on purpose. Writes docs/seo/keyword-maps/<slug>.md (committed).
 *
 *   node scripts/seo/keyword-map.mjs budgeting-for-beginners
 *
 * The rules per course live in RULES below; first match wins, so order matters.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..', '..');

const RULES = {
  'budgeting-for-beginners': [
    ['skip', 'Not about learning to budget (brands, one-off projects, insurance, finance jobs)',
      /budget direct|certificate of currency|insurance|wedding|renovation|japan|trip|monarch|xero|ramsey|cbo|variance|forecast|budget vs plan|jobs?\b|advisor|retirement|retire|pension|fixed income|mortgage|business/],
    ['backlog', 'Local-language or meaning searches (need real local facts first)',
      /hindi|urdu|spanish|tamil|india|kenya|london|nigeria|ghana|meaning|definition|near me|in 20\d\d in/],
    ['backlog', 'Books, videos and Reddit (needs a reviewed list; next batch)',
      /\bbooks?\b|youtube|reddit|podcast|video|tiktok/],
    ['/blog/how-to-budget-to-pay-off-debt', null, /debt|pay off|loan|credit card/],
    ['/blog/can-chatgpt-make-a-budget', null, /chatgpt|ai|gpt|artificial/],
    ['/blog/zero-based-budgeting-for-beginners', null, /zero/],
    ['/blog/why-budgeting-is-important', null, /why|importan|benefit|necessary|help you|purpose/],
    ['/blog/how-to-budget-for-groceries', null, /grocer|food/],
    ['/blog/weekly-vs-monthly-budget', null, /weekly|biweekly|by paycheck|monthly or/],
    ['/blog/how-to-budget-on-a-low-income', null, /low.?income|small income|poor|tight|broke|minimum wage|little money|paycheck to paycheck|limited income/],
    ['/blog/monthly-budget-template', null, /template|excel|google sheets|spreadsheet|sheet|worksheet|printable|planner|calculator|pdf|tracker|categories|list|example|vs actual|notion/],
    ['/blog/50-30-20-rule-budget', null, /50.?30.?20|envelope|zero.?based|zero budget|method|system|rule|pay yourself|percent/],
    ['/blog/how-to-budget-a-salary', null, /salary|\d+k\b|paycheck|take.?home|wage|biweekly|weekly|income|after tax|groceries|variable|non monthly/],
    ['/blog/how-to-budget-as-a-student', null, /college|university|student|school|20s|young|teen|graduate|first job|first apartment/],
    ['/blog/how-to-budget-as-a-couple-or-family', null, /family|couple|household|married|kids|single|mom|parent|husband|wife|partner/],
    ['/blog/best-budgeting-tools-for-beginners', null, /\bapps?\b|software|tools?\b|online|free budget|app for/],
    ['/blog/how-to-budget-for-beginners', null, /./],
  ],
};

const slug = process.argv[2];
const rules = RULES[slug];
if (!rules) throw new Error(`no rules for ${slug}`);
const rows = JSON.parse(fs.readFileSync(path.join(HERE, 'out', 'keywords', `${slug}.json`), 'utf8'));
const groups = new Map();
for (const r of rows) {
  const rule = rules.find(([, , re]) => re.test(r.keyword));
  const [target, reason] = rule;
  const key = target === 'skip' ? `skip: ${reason}` : target === 'backlog' ? `later: ${reason}` : target;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(r);
}
const lines = [
  `# Keyword map: ${slug}`,
  '',
  `${rows.length} keywords found with scripts/seo/keywords.mjs, each assigned to one page or deliberately left out.`,
  '',
  '| Page or decision | Keywords |',
  '| --- | ---: |',
  ...[...groups.entries()].map(([k, v]) => `| ${k} | ${v.length} |`),
  '',
];
for (const [k, v] of groups) {
  lines.push(`## ${k}`, '', `${v.length} keywords. Highest scoring first:`, '',
    v.slice(0, 40).map((r) => `- ${r.keyword} (${r.score})`).join('\n'), '');
}
const outDir = path.join(REPO, 'docs', 'seo', 'keyword-maps');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, `${slug}.md`), lines.join('\n'));
for (const [k, v] of groups) console.log(String(v.length).padStart(4), k);
