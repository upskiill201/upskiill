import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock } from 'lucide-react';
import { getAllPosts, toSummary } from '@/lib/blog/posts';
import { CATEGORIES, getCategoryOrThrow } from '@/lib/blog/categories';
import { formatDate } from '@/lib/blog/site';
import CoverImage from '@/components/features/blog/CoverImage';
import BlogIndexClient from '@/components/features/blog/BlogIndexClient';
import styles from './BlogIndex.module.css';

// Fully static with hourly ISR — new commits trigger a rebuild that
// regenerates every page, so this mostly guards against stale CDN caches.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Teyro Blog — Learning Science, Study Tips & Skill Building',
  description:
    'Evidence-based study techniques, memory science and productivity guides — plus how Teyro turns them into bite-sized, gamified lessons that make learning stick.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.map(toSummary);

  const featuredCategory = featured ? getCategoryOrThrow(featured.frontmatter.category) : null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* ── Header ── */}
        <header className={styles.header}>
          <p className={styles.kicker}>The Teyro Blog</p>
          <h1 className={styles.title}>Learn smarter. Remember longer.</h1>
          <p className={styles.subtitle}>
            Learning science made practical — study techniques, focus strategies and skill-building
            guides, backed by the research behind Teyro&apos;s bite-sized lessons.
          </p>
        </header>

        {/* ── Featured hero (latest post) ── */}
        {featured && featuredCategory && (
          <Link href={`/blog/${featured.slug}`} className={styles.hero}>
            <div className={styles.heroContent}>
              <span
                className={styles.heroPill}
                style={{
                  background: `${featuredCategory.accentColor}14`,
                  color: featuredCategory.accentColor,
                }}
              >
                {featuredCategory.name}
              </span>
              <h2 className={styles.heroTitle}>{featured.frontmatter.title}</h2>
              <p className={styles.heroExcerpt}>{featured.frontmatter.description}</p>
              <div className={styles.heroMeta}>
                <span>{formatDate(featured.frontmatter.publishedDate)}</span>
                <span className={styles.heroMetaDot}>·</span>
                <span className={styles.heroReadTime}>
                  <Clock size={13} strokeWidth={2.5} />
                  {featured.readingTimeMinutes} min read
                </span>
              </div>
              <span className={styles.heroCta}>
                Read article
                <ArrowRight size={15} strokeWidth={3} />
              </span>
            </div>
            <div className={styles.heroCover}>
              <CoverImage
                src={featured.frontmatter.coverImage}
                alt=""
                slug={featured.slug}
                title={featured.frontmatter.title}
                priority
              />
            </div>
          </Link>
        )}

        {/* ── Filterable grid (client island) ── */}
        <BlogIndexClient
          posts={rest}
          featuredSlug={featured?.slug}
          categories={CATEGORIES.map((c) => ({
            slug: c.slug,
            shortLabel: c.shortLabel,
            name: c.name,
          }))}
        />
      </div>
    </div>
  );
}
