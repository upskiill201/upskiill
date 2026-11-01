#!/usr/bin/env node
/**
 * Turns the compact post sources in scripts/seo/posts/*.txt into MDX files in content/blog.
 *
 *   node scripts/seo/build-posts.mjs [course-slug ...]
 *
 * Source format (one file per course, many posts per file):
 *
 *   === the-post-slug
 *   title: ...
 *   desc: ...
 *   tags: a, b, c
 *   cat: skill-building            (optional, default skill-building)
 *   rel: existing-slug, other-slug (optional, existing posts to link in "More guides")
 *   q: Question? | Answer.
 *   q: Question? | Answer.
 *   ---
 *   markdown body (intro paragraph, ## Direct answer, sections, ## The bottom line)
 *
 * The builder adds frontmatter, the CTA, a "Where Teyro fits" section, the money disclaimer for
 * Money courses, and a "More guides" list (sibling posts + related + the course).
 * It never overwrites a post it did not build itself (ledger: posts/built.json).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const BLOG = path.resolve(HERE, '..', '..', 'content', 'blog');
const COURSES = JSON.parse(fs.readFileSync(path.join(HERE, 'data', 'courses.json'), 'utf8')).courses;
const DATE = '2026-10-26';
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const wanted = process.argv.slice(2);
const LEDGER = path.join(HERE, 'posts', 'built.json');
const built = new Set(fs.existsSync(LEDGER) ? JSON.parse(fs.readFileSync(LEDGER, 'utf8')) : []);
const existing = new Set(fs.readdirSync(BLOG).filter((f) => f.endsWith('.mdx')).map((f) => f.replace('.mdx', '')));

function parse(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  return raw.split(/^=== /m).filter((b) => b.trim()).map((block) => {
    const [head, ...rest] = block.split('\n');
    const text = rest.join('\n');
    const [meta, ...bodyParts] = text.split(/^---$/m);
    const p = { slug: head.trim(), faq: [], body: bodyParts.join('---').trim() };
    for (const line of meta.split('\n')) {
      const m = line.match(/^(title|desc|tags|cat|rel|q):\s*(.*)$/);
      if (!m) continue;
      if (m[1] === 'q') { const [q, ...a] = m[2].split('|'); p.faq.push([q.trim(), a.join('|').trim()]); }
      else p[m[1]] = m[2].trim();
    }
    return p;
  });
}

let written = 0, skipped = 0;
const postsDir = path.join(HERE, 'posts');
for (const f of fs.readdirSync(postsDir).filter((x) => x.endsWith('.txt'))) {
  const slug = f.replace('.txt', '');
  if (wanted.length && !wanted.includes(slug)) continue;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) { console.error(`no course for ${f}`); process.exitCode = 1; continue; }
  const posts = parse(path.join(postsDir, f));
  posts.forEach((p, i) => {
    const out = path.join(BLOG, `${p.slug}.mdx`);
    if (fs.existsSync(out) && !built.has(p.slug)) { skipped++; console.log(`skip (exists, hand-written): ${p.slug}`); return; }
    if (!p.title || !p.desc || !p.body) { console.error(`incomplete: ${p.slug}`); process.exitCode = 1; return; }
    const sib = [1, 2, 3].map((k) => posts[(i + k) % posts.length]).filter((x) => x && x.slug !== p.slug);
    const rel = (p.rel ?? '').split(',').map((s) => s.trim()).filter((s) => s && existing.has(s));
    const links = [...new Set([...sib.map((s) => `- [${s.title.replace(/:.*$/, '')}](/blog/${s.slug})`),
      ...rel.map((s) => `- [${s.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())}](/blog/${s})`)])];
    links.push(`- [${course.title} course](/courses/${course.slug})`);
    const fits = `## Where Teyro fits\n\nTeyro's [${course.title}](/courses/${course.slug}) course turns this into short lessons you can play in a few minutes a day. It has ${course.lessons} lessons, and you can start free.\n`;
    let body = p.body;
    const idx = body.indexOf('## The bottom line');
    body = idx >= 0 ? `${body.slice(0, idx).trim()}\n\n${fits}\n${body.slice(idx).trim()}` : `${body}\n\n${fits}`;
    if (course.category === 'Money') body += '\n\n*This is general education, not personal financial advice.*';
    const fm = [
      '---',
      `title: "${esc(p.title)}"`,
      `description: "${esc(p.desc)}"`,
      `publishedDate: "${DATE}"`,
      `category: ${p.cat ?? 'skill-building'}`,
      `tags: [${p.tags}]`,
      'authorSlug: teyro-team',
      'draft: false',
      'cta:',
      `  title: "Learn it by playing"`,
      `  text: "${esc(course.title)} turns this into short, playable lessons. Free to start."`,
      `  href: /courses/${course.slug}`,
      `  label: "See the ${esc(course.title)} course"`,
      'faq:',
      ...p.faq.flatMap(([q, a]) => [`  - question: "${esc(q)}"`, `    answer: "${esc(a)}"`]),
      '---',
      '',
    ].join('\n');
    fs.writeFileSync(out, `${fm}\n${body}\n\n## More guides\n\n${links.join('\n')}\n`);
    existing.add(p.slug);
    built.add(p.slug);
    written++;
  });
}
fs.writeFileSync(LEDGER, JSON.stringify([...built].sort(), null, 1));
console.log(`${written} posts written, ${skipped} skipped`);
