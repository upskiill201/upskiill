// Usage: node fix-meta.mjs   (edits the source .txt files in posts/ for the slugs below)
import fs from 'node:fs';
const fixes = {
  'building-a-personal-brand-at-work': { desc: 'Your personal brand is what people say about you. Build a reputation at work: pick strengths, deliver consistently and share your work.' },
  'find-common-ground': { desc: 'Finding common ground builds connection fast. Learn to listen for clues, ask about interests, share small details and connect with different people.' },
  'hidden-job-market': { desc: 'Many roles are filled through networks and referrals before ads appear. Learn how to tap the hidden job market with outreach and networking.' },
};
const dir = new URL('./posts/', import.meta.url);
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.txt'))) {
  let s = fs.readFileSync(new URL(f, dir), 'utf8'), changed = false;
  for (const [slug, fx] of Object.entries(fixes)) {
    const i = s.indexOf(`=== ${slug}\n`);
    if (i < 0) continue;
    const end = s.indexOf('\n---\n', i);
    let head = s.slice(i, end);
    if (fx.title) head = head.replace(/^title: .*$/m, `title: ${fx.title}`);
    if (fx.desc) head = head.replace(/^desc: .*$/m, `desc: ${fx.desc}`);
    s = s.slice(0, i) + head + s.slice(end);
    changed = true;
  }
  if (changed) fs.writeFileSync(new URL(f, dir), s);
}
