// Regenerates the "Guides by course" block in public/llms.txt from content/blog frontmatter (cta.href groups posts by course).
//   node scripts/seo/build-llms.mjs
import fs from 'node:fs';
import yaml from 'js-yaml';
const dir = 'content/blog/';
const courses = JSON.parse(fs.readFileSync('scripts/seo/data/courses.json', 'utf8')).courses;
const groups = new Map();
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.mdx') && !x.startsWith('_'))) {
  const fm = yaml.load(fs.readFileSync(dir + f, 'utf8').split(/^---$/m)[1]);
  if (fm.draft) continue;
  const m = fm.cta?.href?.match(/^\/courses\/([a-z0-9-]+)/);
  if (!m) continue;
  (groups.get(m[1]) ?? groups.set(m[1], []).get(m[1])).push({ slug: f.replace('.mdx', ''), title: fm.title });
}
const START = '<!-- guides:start -->', END = '<!-- guides:end -->';
let out = [START, '## Guides by course', '',
  'Plain-language guides grouped by the Teyro course they support. Each guide has a short direct answer, examples and an FAQ.', ''];
for (const c of courses) {
  const list = (groups.get(c.slug) ?? []).sort((a, b) => a.title.localeCompare(b.title));
  if (!list.length) continue;
  out.push(`### ${c.title} ([course](https://teyro.app/courses/${c.slug}))`, '',
    ...list.map((p) => `- [${p.title}](https://teyro.app/blog/${p.slug})`), '');
}
out.push(END);
let s = fs.readFileSync('public/llms.txt', 'utf8');
const block = out.join('\n');
if (s.includes(START)) s = s.replace(new RegExp(`${START}[\s\S]*?${END}`), () => block);
else s = s.replace('## Notes', () => `${block}\n\n## Notes`);
fs.writeFileSync('public/llms.txt', s);
console.log([...groups.values()].reduce((n, l) => n + l.length, 0), 'guides listed in llms.txt');
