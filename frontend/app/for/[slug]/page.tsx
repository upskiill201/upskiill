import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  getAllUseCaseSlugs,
  getUseCaseBySlug,
} from '@/lib/use-cases/posts';
import JsonLd from '@/components/features/blog/JsonLd';
import styles from './ForPage.module.css';

export const revalidate = 3600;
export const dynamicParams = true;

interface ForPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ForPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUseCaseBySlug(slug);
  if (!page) return {};
  const { title, meta_description, keyword } = page.frontmatter;
  return {
    title,
    description: meta_description,
    keywords: keyword,
    alternates: { canonical: `/for/${slug}` },
  };
}

export default async function ForDetailPage({ params }: ForPageProps) {
  const { slug } = await params;
  const page = getUseCaseBySlug(slug);
  if (!page) notFound();

  const { frontmatter: fm, content } = page;

  let jsonLdData: Record<string, unknown>[] = [];
  if (fm.json_ld) {
    try {
      const parsed =
        typeof fm.json_ld === 'string' ? JSON.parse(fm.json_ld) : fm.json_ld;
      jsonLdData = Array.isArray(parsed) ? parsed : [parsed];
    } catch { /* ignore */ }
  }

  return (
    <div className={styles.page}>
      {jsonLdData.length > 0 && <JsonLd data={jsonLdData} />}

      <header
        className={styles.hero}
        style={{ '--hero-color': fm.color } as React.CSSProperties}
      >
        <div className={styles.heroInner}>
          <Link href="/for" className={styles.back}>
            <ArrowLeft size={16} strokeWidth={3} />
            All Use Cases
          </Link>
          <div className={styles.heroIcon}>{fm.icon}</div>
          <span className={styles.kicker}>{fm.keyword}</span>
          <h1 className={styles.title}>{fm.title}</h1>
          <p className={styles.subtitle}>{fm.meta_description}</p>
          <div className={styles.heroBadges}>
            <span className={styles.badge}>{fm.reading_time} min read</span>
            <span className={styles.badge}>{fm.word_count.toLocaleString()} words</span>
          </div>
        </div>
      </header>

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

        <section className={styles.ctaSection}>
          <div className={styles.ctaEmoji}>{fm.icon}</div>
          <h2 className={styles.ctaTitle}>Ready to get started?</h2>
          <p className={styles.ctaText}>
            Join thousands of learners already building skills on Teyro.
            Free to start â€” no credit card needed.
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