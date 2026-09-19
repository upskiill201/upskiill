import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { z } from 'zod';
import type { LandingPage, LandingFrontmatter } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'landing');

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  meta_description: z.string().min(1),
  word_count: z.number().int().positive(),
  reading_time: z.number().int().positive(),
  keyword: z.string().min(1),
  json_ld: z.union([z.string(), z.record(z.unknown())]),
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
    slug: parsed.data.slug,
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
    .filter((p) => true); // no draft flag in this schema

  return pages.sort((a, b) => a.slug.localeCompare(b.slug));
});

export const getAllLandingSlugs = cache((): string[] =>
  getAllLandingPages().map((p) => p.slug),
);

export const getLandingBySlug = cache(
  (slug: string): LandingPage | undefined =>
    getAllLandingPages().find((p) => p.slug === slug),
);
