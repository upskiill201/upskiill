import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getAllUseCasePages } from '@/lib/use-cases/posts';
import { buildCanonical } from '@/lib/blog/site';
import JsonLd from '@/components/features/blog/JsonLd';
import styles from './ForHub.module.css';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Who Is Teyro For? Use Cases for Every Type of Learner',
  description:
    'Teyro works for learners, course creators, and community-driven skill builders. See which use case fits you best and start your free streak today.',
  alternates: { canonical: '/for' },
};

export default function ForHubPage() {
  const pages = getAllUseCasePages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Teyro Use Cases',
    url: buildCanonical('/for'),
    description:
      'Teyro use cases: practical learners, course creators, passive income creators, and community-focused learners.',
    isPartOf: { '@type': 'WebSite', name: 'Teyro', url: buildCanonical('/') },
  };

  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />
      <div className={styles.container}>

        {/* Hero */}
        <header className={styles.hero}>
          <span className={styles.kicker}>Who is Teyro for?</span>
          <h1 className={styles.title}>Learning That Fits Your Goals</h1>
          <p className={styles.subtitle}>
            Whether you are building practical skills, creating courses for income,
            or connecting with a learning community â€” Teyro is designed to make you succeed.
          </p>
          <Link href="/onboarding/0" className={styles.heroCta}>
            Get started free
            <ArrowRight size={18} strokeWidth={3} />
          </Link>
        </header>

        {/* Use-case grid */}
        <section className={styles.grid} aria-labelledby="usecases-heading">
          <h2 id="usecases-heading" className={styles.sectionHeading}>
            Find Your Fit
          </h2>
          <div className={styles.cards}>
            {pages.map((page) => (
              <Link
                href={`/for/${page.slug}`}
                key={page.slug}
                className={styles.card}
                style={{ '--card-color': page.frontmatter.color } as React.CSSProperties}
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
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Your first mission is waiting</h2>
          <p className={styles.ctaText}>
            15 minutes. Real skill. Zero cost to start.
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