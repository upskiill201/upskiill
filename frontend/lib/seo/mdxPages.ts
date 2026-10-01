import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { VISUAL_KEYS, type VisualKey } from './facts';

/**
 * Loader for the hand-written SEO pages (content/features, content/use-cases).
 *
 * The schema enforces the page shape that ranks and converts:
 *   answer  — the direct answer, shown above the fold (≤ 100 words)
 *   visual  — the product mock for this exact feature, shown beside it
 *   faq     — rendered on the page AND as FAQPage schema, so they match
 * Word count and reading time are measured, never typed in.
 */

export const ACCENTS = {
  brand: 'var(--color-brand)',
  green: 'var(--success-green)',
  orange: 'var(--warning)',
  purple: 'var(--brand-purple)',
  red: 'var(--error-red)',
} as const;

export type Accent = keyof typeof ACCENTS;

const FaqSchema = z.object({ question: z.string().min(1), answer: z.string().min(1) });

const FrontmatterSchema = z.object({
  title: z.string().min(1).max(70),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  meta_description: z.string().min(50).max(170),
  keyword: z.string().min(1),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  answer: z
    .string()
    .min(1)
    .refine((s) => s.trim().split(/\s+/).length <= 100, 'answer must be 100 words or fewer'),
  visual: z.enum(VISUAL_KEYS as [VisualKey, ...VisualKey[]]),
  /** Says what the mock shows, e.g. that creators see what learners get */
  caption: z.string().optional(),
  /** Public path of the card art (an SVG from /art) */
  art: z.string().startsWith('/').optional(),
  accent: z.enum(Object.keys(ACCENTS) as [Accent, ...Accent[]]).default('brand'),
  audience: z.enum(['learners', 'creators']).default('learners'),
  order: z.number().int().default(100),
  faq: z.array(FaqSchema).default([]),
  /** Internal paths to recommend at the end, e.g. /features/streaks-and-freeze */
  related: z.array(z.string().startsWith('/')).default([]),
});

export type SeoFrontmatter = z.infer<typeof FrontmatterSchema>;

export interface SeoMdxPage {
  slug: string;
  frontmatter: SeoFrontmatter;
  content: string;
  wordCount: number;
  readingMinutes: number;
}

function load(dir: string, label: string, fileName: string): SeoMdxPage | null {
  let raw: string;
  try {
    raw = fs.readFileSync(path.join(dir, fileName), 'utf8');
  } catch {
    return null;
  }
  const { data, content } = matter(raw.replace(/^﻿/, ''));
  const parsed = FrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.warn(
      `[${label}] Skipping "${fileName}" - invalid frontmatter:`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
    );
    return null;
  }
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return {
    slug: parsed.data.slug,
    frontmatter: parsed.data,
    content,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 230)),
  };
}

export function createMdxCollection(folder: string) {
  const dir = path.join(process.cwd(), 'content', folder);
  let cached: SeoMdxPage[] | null = null;

  const all = (): SeoMdxPage[] => {
    if (cached) return cached;
    if (!fs.existsSync(dir)) return [];
    cached = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
      .map((f) => load(dir, folder, f))
      .filter((p): p is SeoMdxPage => p !== null)
      .sort((a, b) => a.frontmatter.order - b.frontmatter.order || a.slug.localeCompare(b.slug));
    return cached;
  };

  return {
    all,
    slugs: () => all().map((p) => p.slug),
    bySlug: (slug: string) => all().find((p) => p.slug === slug),
  };
}
