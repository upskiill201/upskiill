import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { z } from 'zod';
import type { LandingPage, LandingFrontmatter } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'landing');

const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  publishedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedDate must be YYYY-MM-DD'),
  updatedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  draft: z.boolean().optional(),
  cta:
    z
      .object({
        title: z.string().optional(),
        text: z.string().optional(),
        href: z.string().optional(),
        label: z.string().optional(),
      })
      .optional(),
  faq: z.array(FaqItemSchema).optional(),
});

function loadLandingPageFromFile(fileName: string): LandingPage | null {
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
      `[landing] Skipping "${fileName}" — invalid frontmatter:`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
    );
    return null;
  }

  return {
    slug,
    frontmatter: parsed.data as LandingFrontmatter,
    content,
  };
}

export const getAllLandingPages = cache((): LandingPage[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const pages = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map(loadLandingPageFromFile)
    .filter((p): p is LandingPage => p !== null)
    .filter((p) => !p.frontmatter.draft);

  // Newest first
  return pages.sort(
    (a, b) =>
      b.frontmatter.publishedDate.localeCompare(a.frontmatter.publishedDate) ||
      a.slug.localeCompare(b.slug),
  );
});

export const getAllLandingSlugs = cache((): string[] =>
  getAllLandingPages().map((p) => p.slug),
);

export const getLandingBySlug = cache((slug: string): LandingPage | undefined =>
  getAllLandingPages().find((p) => p.slug === slug),
);
