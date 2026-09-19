import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import {
  getAllLandingSlugs,
  getLandingBySlug,
} from '@/lib/landing/posts';
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

  const { title, meta_description, reading_time, word_count, keyword } =
    page.frontmatter;

  return {
    title,
    description: meta_description,
    other: {
      'word-count': String(word_count),
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

  return (
    <div className={styles.page}>
      {jsonLdData.length > 0 && <JsonLd data={jsonLdData} />}
      <div className={styles.container}>
        <article className={styles.article}>
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
