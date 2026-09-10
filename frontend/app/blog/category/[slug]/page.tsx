import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
      <div className={styles.container}>
        {/* ── Category header ── */}
        <header className={styles.header} style={{ maxWidth: 720 }}>
          <p className={styles.kicker} style={{ color: category.accentColor }}>
            Category
          </p>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.subtitle}>{category.seoIntro}</p>
        </header>

        {/* ── Posts ── */}
        {posts.length > 0 ? (
          <PostGrid posts={posts} priorityCount={3} />
        ) : (
          <div className={styles.emptyState}>
            <p>No articles in this category yet — check back soon.</p>
            <Link href="/blog" className={styles.backLink}>
              Browse all articles
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
