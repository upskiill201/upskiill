import Image from 'next/image';
import { LEARNER_ENTRY } from '@/lib/launch';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Clock } from 'lucide-react';
import { getAllPosts, toSummary } from '@/lib/blog/posts';
import { CATEGORIES, getCategoryOrThrow } from '@/lib/blog/categories';
import { formatDate } from '@/lib/blog/site';
import CoverImage from '@/components/features/blog/CoverImage';
import BlogIndexClient from '@/components/features/blog/BlogIndexClient';
import CtaBlock from '@/components/features/blog/CtaBlock';
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Teyro Blog — Learning Science, Study Tips & Skill Building',
    url: 'https://teyro.app/blog',
    description:
      'Evidence-based study techniques, memory science and productivity guides — plus how Teyro turns them into bite-sized, gamified lessons that make learning stick.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Teyro',
      url: 'https://teyro.app',
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero band ── */}
      <header className={styles.band}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>The Teyro Blog</p>
            <h1 className={styles.title}>
              Learn smarter. <em>Remember longer.</em>
            </h1>
            <p className={styles.subtitle}>
              Learning science made practical — study techniques, focus strategies and
              skill-building guides, backed by the research behind Teyro&apos;s bite-sized lessons.
            </p>
            <nav className={styles.topics} aria-label="Blog topics">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className={styles.topic}
                  style={{ '--accent': c.accentColor } as React.CSSProperties}
                >
                  <span className={styles.topicDot} aria-hidden="true" />
                  {c.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.heroArt} aria-hidden="true">
            <span className={styles.heroDisc} />
            <Image
              src="/User onbarding Assets/tey/tablet.webp"
              alt=""
              width={330}
              height={578}
              priority
              className={styles.heroTey}
            />
            <span className={`${styles.heroChip} ${styles.heroChipTop}`}>
              <Image src="/Icons/burn.png" alt="" width={24} height={24} />
              15 min a day
            </span>
            <span className={`${styles.heroChip} ${styles.heroChipBottom}`}>
              <Image src="/art/ui/xp-bolt.svg" alt="" width={22} height={22} />
              {posts.length} free guides
            </span>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {/* ── Featured (latest post) ── */}
        {featured && featuredCategory && (
          <Link
            href={`/blog/${featured.slug}`}
            className={styles.featured}
            style={
              {
                '--accent': featuredCategory.accentColor,
              } as React.CSSProperties
            }
          >
            <div className={styles.featuredCover}>
              <CoverImage
                src={featured.frontmatter.coverImage}
                alt=""
                slug={featured.slug}
                title={featured.frontmatter.title}
                categorySlug={featuredCategory.slug}
                size="hero"
                priority
              />
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.featuredTags}>
                <span className={styles.newTag}>New</span>
                <span className={styles.featuredCategory}>{featuredCategory.name}</span>
              </div>
              <h2 className={styles.featuredTitle}>{featured.frontmatter.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.frontmatter.description}</p>
              <div className={styles.featuredMeta}>
                <span>{formatDate(featured.frontmatter.publishedDate)}</span>
                <span className={styles.metaDot} aria-hidden="true" />
                <span className={styles.readTime}>
                  <Clock size={14} strokeWidth={2.5} />
                  {featured.readingTimeMinutes} min read
                </span>
              </div>
              <span className={styles.featuredBtn}>
                Read article
                <ArrowRight size={18} strokeWidth={3} />
              </span>
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

        {/* ── About (head-term copy for search, below the fold for people) ── */}
        <section className={styles.about} aria-labelledby="about-heading">
          <h2 id="about-heading" className={styles.aboutHeading}>
            About the Teyro Blog
          </h2>
          <div className={styles.aboutBody}>
            <p>
              This is where Teyro breaks down the research behind how people actually learn, and
              turns it into guides you can use the same day you read them. Every article here starts
              from a real question — how spaced repetition works, whether a Udemy certificate means
              anything to an employer, how to build a study habit that survives a busy week — and
              answers it with evidence instead of generic advice, because vague tips are easy to
              write and hard to act on.
            </p>
            <p>
              The posts are organized into six practical areas: <strong>study techniques</strong>{' '}
              like active recall and spaced repetition, <strong>language learning</strong>{' '}
              strategies for building real fluency, <strong>productivity and focus</strong> habits
              for people learning alongside a full life, <strong>AI and learning</strong> guides on
              what personalized, AI-driven lessons actually do well, <strong>exam prep</strong>{' '}
              tactics for high-stakes tests, and <strong>skill-building</strong> guides on turning
              online courses into a portfolio that gets you hired. You will also find honest,
              head-to-head comparisons of platforms like Udemy, Coursera, DataCamp and Pluralsight,
              so you can decide where to spend your time and money before you commit either.
            </p>
            <p>
              Every guide ties back to the same underlying idea Teyro is built on: short, daily,
              gamified practice beats long, passive video sessions for almost everyone. If you want
              to put that into practice rather than just read about it,{' '}
              <Link href={LEARNER_ENTRY.href}>Teyro</Link> turns these study techniques into 15-minute
              daily lessons with streaks and XP, so the habit — not just the knowledge — actually
              sticks.
            </p>
          </div>
        </section>

        <CtaBlock />
      </div>
    </div>
  );
}
