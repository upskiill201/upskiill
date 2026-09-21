// Landing page content model — for /alternatives/[slug] routes.
// Dedicated competitor comparison/alternative pages.

export interface LandingJsonLd {
  '@context'?: string;
  '@graph'?: Array<Record<string, unknown>>;
  [key: string]: unknown;
}

export interface LandingFrontmatter {
  title: string;
  slug: string;
  meta_description: string;
  word_count: number;
  reading_time: number;
  keyword: string;
  json_ld: string | LandingJsonLd;
}

export interface LandingPage {
  slug: string;
  frontmatter: LandingFrontmatter;
  content: string;
}
