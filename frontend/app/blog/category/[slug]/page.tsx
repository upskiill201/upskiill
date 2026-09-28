import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/blog/categories';
import { getPostsByCategory, toSummary } from '@/lib/blog/posts';
import { buildCanonical } from '@/lib/blog/site';
import PostGrid from '@/components/features/blog/PostGrid';
import styles from '../../BlogIndex.module.css';

export const revalidate = 3600;
// Registry-driven: only registered categories render; unknown slugs 404.
export const dynamicParams = false;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};

  return {
    title: `${category.name} — Teyro Blog`,
    description: category.description,
    alternates: {
      canonical: buildCanonical(`/blog/category/${category.slug}`),
    },
    openGraph: {
      title: `${category.name} — Teyro Blog`,
      description: category.description,
      url: `/blog/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug).map(toSummary);

  return (
    <div className={styles.page}>
      {/* ── Category hero ── */}
      <header
        className={styles.band}
        style={{ '--accent': category.accentColor } as React.CSSProperties}
      >
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <Link href="/blog" className={styles.backLink}>
              <ArrowLeft size={16} strokeWidth={3} />
              All articles
            </Link>
            <p className={styles.kicker}>Topic</p>
            <h1 className={styles.title}>{category.name}</h1>
            <p className={styles.subtitle}>{category.seoIntro}</p>
            <p className={styles.count}>
              {posts.length} {posts.length === 1 ? 'guide' : 'guides'}
            </p>
            <nav className={styles.topics} aria-label="Other blog topics">
              {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className={styles.topic}
                  style={{ '--accent': c.accentColor } as React.CSSProperties}
                >
                  <span className={styles.topicDot} aria-hidden="true" />
                  {c.shortLabel}
                </Link>
              ))}
            </nav>
          </div>
          {category.mascots[0] && (
            <div className={styles.categoryArt} aria-hidden="true">
              <span className={styles.heroDisc} />
              <Image
                src={category.mascots[0]}
                alt=""
                width={300}
                height={450}
                priority
                className={styles.heroTey}
              />
            </div>
          )}
        </div>
      </header>

      <div className={styles.container}>
        {posts.length > 0 ? (
          <PostGrid posts={posts} priorityCount={3} />
        ) : (
          <div className={styles.emptyState}>
            <p>No articles in this topic yet — check back soon.</p>
            <Link href="/blog" className={styles.backLink}>
              Browse all articles
              <ArrowRight size={16} strokeWidth={3} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
