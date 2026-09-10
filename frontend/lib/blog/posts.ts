import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { z } from 'zod';
import type { BlogPost, PostSummary } from './types';
import { getCategoryOrThrow } from './categories';
import { getAuthorOrDefault } from './authors';
import { extractToc } from './toc';

// Server-only loader over frontend/content/blog/*.mdx.
// Publishing a post = dropping an .mdx file here and pushing — Vercel
// rebuilds and every page below /blog is statically regenerated.

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedDate must be YYYY-MM-DD'),
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

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production' || process.env.NEXT_PHASE === 'phase-production-build';
}

function loadPostFromFile(fileName: string): BlogPost | null {
  const slug = fileName.replace(/\.mdx$/, '');
  const fullPath = path.join(CONTENT_DIR, fileName);

  let raw: string;
  try {
    raw = fs.readFileSync(fullPath, 'utf8');
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const parsed = FrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(
      `[blog] Skipping "${fileName}" — invalid frontmatter:`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    );
    return null;
  }

  // Validate category exists in the registry (typo guard)
  try {
    getCategoryOrThrow(parsed.data.category);
  } catch (e) {
    console.warn(`[blog] Skipping "${fileName}" — ${(e as Error).message}`);
    return null;
  }

  return {
    slug,
    frontmatter: parsed.data,
    content,
    readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    toc: extractToc(content),
  };
}

export const getAllPosts = cache((): BlogPost[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const posts = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map(loadPostFromFile)
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => !p.frontmatter.draft || !isProduction());

  // Newest first
  return posts.sort(
    (a, b) =>
      b.frontmatter.publishedDate.localeCompare(a.frontmatter.publishedDate) ||
      a.slug.localeCompare(b.slug)
  );
});

export const getAllPostSlugs = cache((): string[] =>
  getAllPosts().map((p) => p.slug)
);

export const getPostBySlug = cache((slug: string): BlogPost | undefined =>
  getAllPosts().find((p) => p.slug === slug)
);

export const getPostsByCategory = cache((categorySlug: string): BlogPost[] =>
  getAllPosts().filter((p) => p.frontmatter.category === categorySlug)
);

export const getPostsByAuthor = cache((authorSlug: string): BlogPost[] =>
  getAllPosts().filter((p) => getAuthorOrDefault(p.frontmatter.authorSlug).slug === authorSlug)
);

/** Same category first, then most recent others. Excludes the post itself. */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const sameCategory = getPostsByCategory(post.frontmatter.category).filter(
    (p) => p.slug !== post.slug
  );
  const rest = getAllPosts().filter(
    (p) => p.slug !== post.slug && p.frontmatter.category !== post.frontmatter.category
  );
  return [...sameCategory, ...rest].slice(0, count);
}

/** Serializable DTO for client components (BlogIndexClient search/filter). */
export function toSummary(post: BlogPost): PostSummary {
  const category = getCategoryOrThrow(post.frontmatter.category);
  return {
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    publishedDate: post.frontmatter.publishedDate,
    updatedDate: post.frontmatter.updatedDate,
    categorySlug: category.slug,
    categoryName: category.name,
    tags: post.frontmatter.tags ?? [],
    readingTimeMinutes: post.readingTimeMinutes,
    coverImage: post.frontmatter.coverImage,
  };
}
