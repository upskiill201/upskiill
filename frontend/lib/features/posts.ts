import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { z } from 'zod';
import type { FeaturePage, FeatureFrontmatter } from './types';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'features');

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  meta_description: z.string().min(1),
  keyword: z.string().min(1),
  word_count: z.number().int().positive(),
  reading_time: z.number().int().positive(),
  icon: z.string().min(1),
  color: z.string().min(1),
  json_ld: z.union([z.string(), z.record(z.string(), z.unknown())]).optional(),
});

function loadFeaturePageFromFile(fileName: string): FeaturePage | null {
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
      `[features] Skipping "${fileName}" â€” invalid frontmatter:`,
      parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; '),
    );
    return null;
  }
  return {
    slug: parsed.data.slug,
    frontmatter: parsed.data as FeatureFrontmatter,
    content,
  };
}

export const getAllFeaturePages = cache((): FeaturePage[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map(loadFeaturePageFromFile)
    .filter((p): p is FeaturePage => p !== null)
    .sort((a, b) => a.slug.localeCompare(b.slug));
});

export const getAllFeatureSlugs = cache((): string[] =>
  getAllFeaturePages().map((p) => p.slug),
);

export const getFeatureBySlug = cache(
  (slug: string): FeaturePage | undefined =>
    getAllFeaturePages().find((p) => p.slug === slug),
);
