// Temporary validation script for blog posts — safe to delete after use.
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { z } = require('zod');

const FaqItemSchema = z.object({ question: z.string().min(1), answer: z.string().min(1) });
const FrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  coverImage: z.string().optional(),
  authorSlug: z.string().optional(),
  faq: z.array(FaqItemSchema).optional(),
  draft: z.boolean().optional(),
  cta: z
    .object({
      title: z.string().optional(),
      text: z.string().optional(),
      href: z.string().optional(),
      label: z.string().optional(),
    })
    .optional(),
});
const VALID_CATEGORIES = ['study-techniques', 'language-learning', 'productivity-focus', 'ai-learning', 'exam-prep', 'skill-building'];

const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : fs.readdirSync(path.join(__dirname, 'content', 'blog')).filter((f) => f.endsWith('.mdx') && !f.startsWith('_')).map((f) => f.replace(/\.mdx$/, ''));
const allSlugs = fs.readdirSync(path.join(__dirname, 'content', 'blog'))
  .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
  .map((f) => f.replace(/\.mdx$/, ''));

let problems = 0;
for (const slug of targets) {
  const raw = fs.readFileSync(path.join(__dirname, 'content', 'blog', slug + '.mdx'), 'utf8');
  const { data, content } = matter(raw);
  const errs = [];

  const parsed = FrontmatterSchema.safeParse(data);
  if (!parsed.success) errs.push('ZOD: ' + parsed.error.issues.map((i) => i.path.join('.') + ': ' + i.message).join('; '));
  if (!VALID_CATEGORIES.includes(data.category)) errs.push('BAD CATEGORY: ' + data.category);

  if (data.title.length > 60) errs.push(`TITLE ${data.title.length} chars (>60): ${data.title}`);
  if (data.description.length < 140 || data.description.length > 165) errs.push(`DESC ${data.description.length} chars (target 140-165)`);

  // strip fenced code AND inline code before MDX-char checks
  const noFences = content.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
  for (let i = 0; i < noFences.length; i++) {
    const ch = noFences[i];
    if (ch === '{' || ch === '}') {
      errs.push(`CURLY BRACE at offset ${i}: ...${noFences.slice(Math.max(0, i - 40), i + 40)}...`);
      break;
    }
    if (ch === '<') {
      errs.push(`RAW ANGLE BRACKET at offset ${i}: ...${noFences.slice(Math.max(0, i - 40), i + 40)}...`);
      break;
    }
  }

  const links = [...content.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1]);
  for (const l of links) {
    if (l === '/' || l === '/signup' || l === '/courses') continue;
    if (l.startsWith('/blog/')) {
      const target = l.slice('/blog/'.length).replace(/#.*$/, '');
      if (!allSlugs.includes(target)) errs.push('BROKEN INTERNAL LINK: ' + l);
    }
  }

  const words = content.split(/\s+/).length;
  console.log(
    (errs.length ? 'FAIL ' : 'OK   ') +
      `${slug} | words=${words} faqs=${data.faq ? data.faq.length : 0} title=${data.title.length}ch desc=${data.description.length}ch links=[${links.join(', ')}]`
  );
  errs.forEach((e) => console.log('     -> ' + e));
  problems += errs.length;
}
console.log(problems === 0 ? '\nALL CHECKS PASSED' : `\n${problems} PROBLEM(S) FOUND`);
