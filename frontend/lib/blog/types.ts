// Blog content model — shared types for the MDX-driven /blog section.
// Server loaders in posts.ts validate frontmatter against PostFrontmatterSchema.

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CtaOverride {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}

export interface PostFrontmatter {
  /** Post H1 + meta title basis */
  title: string;
  /** 150-160 char meta description, also used as card excerpt */
  description: string;
  /** ISO date, e.g. '2026-08-22' */
  publishedDate: string;
  /** ISO date — set when a post is meaningfully revised (freshness signal) */
  updatedDate?: string;
  /** Category slug — must exist in categories.ts registry */
  category: string;
  tags?: string[];
  /** Public path e.g. '/blog/covers/my-post.png'. Omit → generated gradient placeholder */
  coverImage?: string;
  /** Author slug from authors.ts registry. Default: 'teyro-team' */
  authorSlug?: string;
  faq?: FaqItem[];
  /** Drafts are excluded from production builds */
  draft?: boolean;
  cta?: CtaOverride;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Full post as loaded server-side — never pass this across the RSC boundary */
export interface BlogPost {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Raw MDX body */
  content: string;
  readingTimeMinutes: number;
  toc: TocItem[];
}

/** Serializable summary safe to hand to client components */
export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  updatedDate?: string;
  categorySlug: string;
  categoryName: string;
  tags: string[];
  readingTimeMinutes: number;
  coverImage?: string;
}

/** Registry entry — one per learning topic the blog targets */
export interface Category {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  /** Intro copy rendered on /blog/category/[slug] for head-term ranking */
  seoIntro: string;
  accentColor: string;
}

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
}
