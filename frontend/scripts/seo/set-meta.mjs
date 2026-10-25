// node scripts/seo/set-meta.mjs file.json  where file is {slug:{title?,description?}} - rewrites frontmatter.
import fs from 'node:fs';
const m = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const [s, v] of Object.entries(m)) {
  const f = `content/blog/${s}.mdx`;
  let t = fs.readFileSync(f, 'utf8');
  if (v.title) t = t.replace(/^title: ".*"/m, `title: "${v.title}"`);
  if (v.description) t = t.replace(/^description: ".*"/m, `description: "${v.description}"`);
  fs.writeFileSync(f, t);
}
