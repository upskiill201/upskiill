// Checks new/changed blog posts: title <= 70, description <= 160, internal /blog and /courses links resolve.
// node scripts/seo/check-posts.mjs        (all untracked or modified .mdx in content/blog)
import fs from 'node:fs';
import { execSync } from 'node:child_process';
const dir = 'content/blog/';
const slugs = new Set(fs.readdirSync(dir).map((f) => f.replace('.mdx', '')));
const courses = new Set(JSON.parse(fs.readFileSync('scripts/seo/data/courses.json', 'utf8')).courses.map((c) => c.slug));
const files = execSync('git status --porcelain -- content/blog', { encoding: 'utf8' }).split('\n')
  .filter((l) => l.trim().endsWith('.mdx')).map((l) => l.slice(3).trim().replace(/^frontend\//, '').replace(/^content\/blog\//, ''));
let bad = 0;
for (const f of files) {
  const t = fs.readFileSync(dir + f, 'utf8');
  const title = t.match(/^title: "(.*)"/m)?.[1] ?? '';
  const d = t.match(/^description: "(.*)"/m)?.[1] ?? '';
  const issues = [];
  if (title.length > 70 || !title) issues.push(`title ${title.length}`);
  if (d.length > 160 || !d) issues.push(`description ${d.length}`);
  for (const m of t.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)) if (!slugs.has(m[1])) issues.push(`broken /blog/${m[1]}`);
  for (const m of t.matchAll(/\]\(\/courses\/([a-z0-9-]+)\)/g)) if (!courses.has(m[1])) issues.push(`unknown course ${m[1]}`);
  if (/href: \/courses\/([a-z0-9-]+)/.test(t) && !courses.has(t.match(/href: \/courses\/([a-z0-9-]+)/)[1])) issues.push('cta course unknown');
  if (issues.length) { bad++; console.log(f, issues.join('; ')); }
}
console.log(`${files.length} posts checked, ${bad} with issues`);
