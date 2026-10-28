// Prints a course's top keywords: node scripts/seo/top.mjs <slug> [n]
import fs from 'node:fs';
const [slug, n = '90'] = process.argv.slice(2);
const r = JSON.parse(fs.readFileSync(new URL(`./out/keywords/${slug}.json`, import.meta.url), 'utf8'));
r.sort((a, b) => b.score - a.score).slice(0, +n).forEach((x) => console.log(`${x.score}\t${x.keyword}${x.coveredBy ? '  [covered]' : ''}`));
