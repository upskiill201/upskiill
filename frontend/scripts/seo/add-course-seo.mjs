// Adds COURSE_SEO entries from a JSON file: node scripts/seo/add-course-seo.mjs entries.json
// Apostrophes are written as the typographic ’ so the TypeScript string literals never break.
import fs from 'node:fs';
const entries = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const f = 'lib/seo/courseSeo.ts';
let c = fs.readFileSync(f, 'utf8');
const q = (s) => s.replace(/'/g, '’');
let block = '';
for (const [slug, e] of Object.entries(entries)) {
  if (c.includes(`'${slug}':`)) { console.log('exists', slug); continue; }
  if (e.title.length > 60) console.log('LONG TITLE', slug, e.title.length);
  if (e.description.length > 160) console.log('LONG DESC', slug, e.description.length);
  block += `  '${slug}': {\n    title: '${q(e.title)}',\n    description:\n      '${q(e.description)}',\n  },\n`;
}
c = c.replace(/\n\};\s*$/, `\n${block}};\n`);
fs.writeFileSync(f, c);
