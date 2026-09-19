// Landing page content model — for /alternatives/[slug] routes.
// Dedicated competitor comparison/alternative pages, separate from blog content.

export interface LandingFaqItem {
  question: string;
  answer: string;
}

export interface LandingCtaOverride {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}

export interface LandingFrontmatter {
  title: string;
  description: string;
  publishedDate: string;
  updatedDate?: string;
  draft?: boolean;
  cta?: LandingCtaOverride;
  faq?: LandingFaqItem[];
}

export interface LandingPage {
  slug: string;
  frontmatter: LandingFrontmatter;
  content: string;
}
