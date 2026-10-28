import fs from 'node:fs';
import path from 'node:path';
const dir = 'content/blog';
const toks = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
const SITE = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => new Set(toks(f.replace(/-/g, ' ') + ' ' + fs.readFileSync(path.join(dir, f), 'utf8').split('\n---')[0])));
const C = JSON.parse(fs.readFileSync('scripts/seo/data/topical-concepts.json', 'utf8'));
const seen = new Set(); let n = 0;
for (const [slug, list] of Object.entries(C)) {
  const gaps = list.filter((c) => !seen.has(c) && SITE.filter((s) => toks(c).every((w) => s.has(w))).length <= 1);
  gaps.forEach((g) => seen.add(g));
  n += gaps.length;
  console.log(`${slug}: ${gaps.join(' | ')}`);
}
console.log('TOTAL', n);
