import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  getAllLandingSlugs,
  getLandingBySlug,
} from '@/lib/landing/posts';
import { FaqItem } from '@/lib/blog/types';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import styles from './LandingPage.module.css';

export const revalidate = 3600;
export const dynamicParams = true;

interface LandingPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingBySlug(slug);
  if (!page) return {};

  const { title, meta_description, reading_time } = page.frontmatter;

  return {
    title,
    description: meta_description,
    other: {
      'word-count': String(page.frontmatter.word_count),
      'reading-time': `${reading_time} min read`,
    },
  };
}

export default async function AlternativesLandingPage({
  params,
}: LandingPageProps) {
  const { slug } = await params;
  const page = getLandingBySlug(slug);
  if (!page) notFound();

  const { frontmatter: fm, content } = page;

  // Parse JSON-LD for structured data injection
  let jsonLdData: Record<string, unknown>[] = [];
  if (fm.json_ld) {
    try {
      const parsed =
        typeof fm.json_ld === 'string' ? JSON.parse(fm.json_ld) : fm.json_ld;
      if (Array.isArray(parsed)) {
        jsonLdData = parsed;
      } else {
        jsonLdData = [{ parsed }];
      }
    } catch {
      console.warn(`[landing] Failed to parse JSON-LD for "${slug}"`);
    }
  }

  // Extract FAQ from content's H3 "FAQ" section for schema (fallback)
  const faqItems: FaqItem[] = extractFaqFromContent(content);

  return (
    <div className={styles.page}>
      {jsonLdData.length > 0 && <JsonLd data={jsonLdData} />}
      <div className={styles.container}>
        <article className={styles.article}>
          {/* ── Hero ── */}
          <header className={styles.hero}>
            <h1 className={styles.title}>{fm.title}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.heroStat}>{fm.reading_time} min read</span>
              <span className={styles.heroStatDot}>·</span>
              <span className={styles.heroStat}>
                {fm.word_count.toLocaleString()} words
              </span>
              <span className={styles.heroStatDot}>·</span>
              <span className={styles.heroStat}>{fm.keyword}</span>
            </div>
          </header>

          {/* ── Body ── */}
          <div className={styles.body}>
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {/* ── CTA ── */}
          <CtaBlock
            cta={{
              title: 'Start Your Free Learning Streak',
              text: 'Join thousands of learners building real skills with daily 15-minute missions.',
              href: '/onboarding/0',
              label: 'Start Free',
            }}
          />
        </article>
      </div>
    </div>
  );
}

function extractFaqFromContent(content: string): FaqItem[] {
  const faqSection = content.match(/## (Frequently Asked Questions|FAQ)[\s\S]*$/i);
  if (!faqSection) return [];

  const faqItems: FaqItem[] = [];
  const qaRegex = /###\s+(What|How|Why|When|Who|Which|Is|Are|Can|Do|Does|Should|Will|Would|Could|Can you|How does|How long|How to|Where|Why does|What is|What are|What should|Where can|Where to|Why is)\s+[^\n]+/g;
  let match;
  while ((match = qaRegex.exec(faqSection[0])) !== null) {
    const question = match[0].replace(/^###\s+/, '').trim();
    // Find answer: text between this ### and next ### or end
    const afterMatch = faqSection[0].slice(match.index + match[0].length);
    const nextH = afterMatch.match(/^[\s\S]*?(?=###\s|\n##\s|\z)/);
    const answer = nextMatch
      ? nextMatch[0].replace(/^[\s\n]+/, '').trim()
      : '';
    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }
  return faqItems;
}
