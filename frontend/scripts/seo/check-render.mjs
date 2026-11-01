// Fetches every new/changed blog post from the local dev server and reports non-200 responses.
import { execSync } from 'node:child_process';
const base = process.argv[2] ?? 'http://localhost:3000';
const slugs = execSync('git status --porcelain -- content/blog', { encoding: 'utf8' }).split('\n')
  .filter((l) => l.trim().endsWith('.mdx')).map((l) => l.trim().split('/').pop().replace('.mdx', ''));
let bad = 0, i = 0;
async function worker() {
  while (i < slugs.length) {
    const s = slugs[i++];
    try {
      const r = await fetch(`${base}/blog/${s}`);
      const t = await r.text();
      if (r.status !== 200 || !t.includes('<h1')) { bad++; console.log(s, r.status); }
    } catch (e) { bad++; console.log(s, 'ERR', e.message); }
  }
}
await Promise.all([worker(), worker(), worker()]);
console.log(`${slugs.length} pages rendered, ${bad} problems`);
