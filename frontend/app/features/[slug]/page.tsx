import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  getAllFeatureSlugs,
  getFeatureBySlug,
} from '@/lib/features/posts';
import JsonLd from '@/components/features/blog/JsonLd';
import styles from './FeaturePage.module.css';

export const revalidate = 3600;
export const dynamicParams = true;

interface FeaturePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getFeatureBySlug(slug);
  if (!page) return {};
  const { title, meta_description, keyword } = page.frontmatter;
  return {
    title,
    description: meta_description,
    keywords: keyword,
    alternates: { canonical: `/features/${slug}` },
  };
}

export default async function FeatureDetailPage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const page = getFeatureBySlug(slug);
  if (!page) notFound();

  const { frontmatter: fm, content } = page;

  let jsonLdData: Record<string, unknown>[] = [];
  if (fm.json_ld) {
    try {
      const parsed =
        typeof fm.json_ld === 'string' ? JSON.parse(fm.json_ld) : fm.json_ld;
      jsonLdData = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      /* ignore */
    }
  }

  return (
    <div className={styles.page}>
      {jsonLdData.length > 0 && <JsonLd data={jsonLdData} />}

      {/* Hero */}
      <header
        className={styles.hero}
        style={{ '--hero-color': fm.color } as React.CSSProperties}
      >
        <div className={styles.heroInner}>
          <Link href="/features" className={styles.back}>
            <ArrowLeft size={16} strokeWidth={3} />
            All Features
          </Link>
          <div className={styles.heroIcon}>{fm.icon}</div>
          <span className={styles.kicker}>{fm.keyword}</span>
          <h1 className={styles.title}>{fm.title}</h1>
          <p className={styles.subtitle}>{fm.meta_description}</p>
          <div className={styles.heroBadges}>
            <span className={styles.badge}>
              {fm.reading_time} min read
            </span>
            <span className={styles.badge}>
              {fm.word_count.toLocaleString()} words
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className={styles.container}>
        <article className={styles.article}>
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
        </article>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Try {fm.keyword} today</h2>
          <p className={styles.ctaText}>
            Join thousands of learners building real skills with daily 15-minute missions.
            Start free â€” no credit card needed.
          </p>
          <Link href="/onboarding/0" className={styles.ctaButton}>
            Start your free streak
            <ArrowRight size={18} strokeWidth={3} />
          </Link>
        </section>
      </div>
    </div>
  );
}