import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getAllFeaturePages } from '@/lib/features/posts';
import { buildCanonical } from '@/lib/blog/site';
import JsonLd from '@/components/features/blog/JsonLd';
import styles from './FeatureHub.module.css';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Teyro Features â€” Everything Built to Make Learning Stick',
  description:
    'Explore all Teyro features: streaks, XP, leagues, daily chests, reflection prompts, and more. Every feature is built to turn daily sessions into lasting skills.',
  alternates: { canonical: '/features' },
};

const FEATURE_COLORS: Record<string, string> = {
  'short-lessons': '#58cc02',
  'immediate-practice': '#ffc800',
  'reflection-prompts': '#ce82ff',
  'streaks-and-freeze': '#ff4b4b',
  'xp-and-coins': '#ffc800',
  'daily-chests': '#1cb0f6',
  'leagues-leaderboards': '#ff9600',
  'community-qa': '#58cc02',
  'guided-roadmap': '#ce82ff',
  'course-publishing': '#1cb0f6',
  'analytics-dashboard': '#ff9600',
  payouts: '#58cc02',
  'mobile-apps': '#1cb0f6',
  'monthly-quests': '#ff4b4b',
};

export default function FeaturesHubPage() {
  const pages = getAllFeaturePages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Teyro Features',
    url: buildCanonical('/features'),
    description:
      'All Teyro features: streaks, XP, leagues, daily chests, reflection prompts, community Q&A, and more.',
    isPartOf: { '@type': 'WebSite', name: 'Teyro', url: buildCanonical('/') },
  };

  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <div className={styles.container}>
        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroOwl}>ðŸ¦‰</div>
          <span className={styles.kicker}>Features</span>
          <h1 className={styles.title}>
            Everything Built to Make Learning Stick
          </h1>
          <p className={styles.subtitle}>
            Streaks, XP, daily missions, leagues â€” Teyro combines the best of
            gamification with real applied practice. Every feature is designed
            to keep you consistent and make skills actually stick.
          </p>
          <Link href="/onboarding/0" className={styles.heroCta}>
            Start free â€” no card needed
            <ArrowRight size={18} strokeWidth={3} />
          </Link>
        </header>

        {/* Feature grid */}
        <section className={styles.grid} aria-labelledby="features-heading">
          <h2 id="features-heading" className={styles.sectionHeading}>
            All Features
          </h2>
          <div className={styles.cards}>
            {pages.map((page) => {
              const color = page.frontmatter.color ?? FEATURE_COLORS[page.slug] ?? '#58cc02';
              return (
                <Link
                  href={`/features/${page.slug}`}
                  key={page.slug}
                  className={styles.card}
                  style={{ '--card-color': color } as React.CSSProperties}
                >
                  <div className={styles.cardIcon}>{page.frontmatter.icon}</div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{page.frontmatter.title}</h3>
                    <p className={styles.cardDescription}>
                      {page.frontmatter.meta_description}
                    </p>
                    <span className={styles.cardCta}>
                      Learn more
                      <ArrowRight size={14} strokeWidth={3} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaOwl}>ðŸŽ¯</div>
          <h2 className={styles.ctaTitle}>Ready to experience all of this?</h2>
          <p className={styles.ctaText}>
            Start your first 15-minute mission today â€” free, no credit card.
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
