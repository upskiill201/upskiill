export interface UseCaseFrontmatter {
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

export interface UseCasePage {
  slug: string;
  frontmatter: UseCaseFrontmatter;
  content: string;
}
