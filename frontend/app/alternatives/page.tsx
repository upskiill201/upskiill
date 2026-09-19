import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Zap, Trophy, Shield } from 'lucide-react';
import { getAllLandingPages } from '@/lib/landing/posts';
import { buildCanonical } from '@/lib/blog/site';
import JsonLd from '@/components/features/blog/JsonLd';
import styles from './LandingHub.module.css';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Teyro vs Competitors — The Better Way to Learn Skills',
  description:
    'Honest comparison of Teyro against Duolingo, Skillshare, Khan Academy, Udemy, and Coursera. See why learners switch to Teyro for daily skill building.',
  alternates: { canonical: '/alternatives' },
};

export default function AlternativesHubPage() {
  const pages = getAllLandingPages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Teyro vs Competitors',
    url: buildCanonical('/alternatives'),
    description:
      'Honest comparison of Teyro against Duolingo, Skillshare, Khan Academy, Udemy, and Coursera. See why learners switch to Teyro for daily skill building.',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Teyro',
      url: buildCanonical('/'),
    },
  };

  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <div className={styles.container}>
        {/* ── Hero ── */}
        <header className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.kicker}>Compare</span>
            <h1 className={styles.title}>
              The Best Learning Platform Alternatives
            </h1>
            <p className={styles.subtitle}>
              Honest, in-depth comparisons of Teyro against the most popular
              learning platforms. No spin — just what actually determines
              outcomes: completion rate, daily consistency, and whether the
              format produces applied skill.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <Shield size={28} strokeWidth={2} />
                <span className={styles.statValue}>5</span>
                <span className={styles.statLabel}>Platforms Compared</span>
              </div>
              <div className={styles.stat}>
                <Zap size={28} strokeWidth={2} />
                <span className={styles.statValue}>15 min</span>
                <span className={styles.statLabel}>Daily Sessions</span>
              </div>
              <div className={styles.stat}>
                <Trophy size={28} strokeWidth={2} />
                <span className={styles.statValue}>0</span>
                <span className={styles.statLabel}>Courses to Buy</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Intro ── */}
        <section className={styles.intro}>
          <p>
            Most learning platforms sell you access. Teyro builds your
            ability. The comparisons below focus on what actually determines
            outcomes: completion rate, daily consistency, and whether the
            format produces applied skill — not just knowledge.
          </p>
          <p>
            Every comparison is written honestly, including where the
            competitor genuinely excels. If you&apos;re considering switching,
            start here to find the comparison that matters to you.
          </p>
        </section>

        {/* ── All Alternatives Grid ── */}
        <section className={styles.grid} aria-labelledby="alternatives-heading">
          <h2 id="alternatives-heading" className={styles.sectionHeading}>
            Platform Comparisons
          </h2>
          <div className={styles.cards}>
            {pages.map((page) => (
              <Link
                href={`/alternatives/${page.slug}`}
                key={page.slug}
                className={styles.card}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {page.frontmatter.title}
                  </h3>
                  <p className={styles.cardDescription}>
                    {page.frontmatter.meta_description}
                  </p>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardMetaItem}>
                      {page.frontmatter.reading_time} min read
                    </span>
                    <span className={styles.cardMetaDot}>·</span>
                    <span className={styles.cardMetaItem}>
                      {page.frontmatter.word_count.toLocaleString()} words
                    </span>
                  </div>
                  <span className={styles.cardCta}>
                    Read comparison
                    <ArrowRight size={14} strokeWidth={3} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why Teyro ── */}
        <section className={styles.whySection}>
          <h2 className={styles.sectionHeading}>Why Learners Switch</h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <h3>Built for completion</h3>
              <p>
                Most platforms sell access and hope you finish. Teyro&apos;s
                daily missions and streaks are engineered to make you
                complete — not just enroll.
              </p>
            </div>
            <div className={styles.whyCard}>
              <h3>No courses to buy</h3>
              <p>
                There&apos;s no catalog to browse, no $200 course to purchase,
                and no decision paralysis. Just one daily mission, every day.
              </p>
            </div>
            <div className={styles.whyCard}>
              <h3>Practical skills first</h3>
              <p>
                Every skill track is designed around applied practice —
                coding, business, AI, communication — not theory you&apos;ll
                forget.
              </p>
            </div>
            <div className={styles.whyCard}>
              <h3>Free to start</h3>
              <p>
                Teyro&apos;s free tier includes full daily missions, streaks,
                and XP. No credit card needed to build a real learning habit.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Stop consuming. Start building.</h2>
          <p className={styles.ctaText}>
            Your first mission takes 15 minutes. That&apos;s all it takes to know
            Teyro is different.
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
