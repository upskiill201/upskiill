export interface FeatureFrontmatter {
  title: string;
  slug: string;
  meta_description: string;
  keyword: string;
  word_count: number;
  reading_time: number;
  icon: string;
  color: string;
  json_ld?: string | Record<string, unknown>;
}

export interface FeaturePage {
  slug: string;
  frontmatter: FeatureFrontmatter;
  content: string;
}
