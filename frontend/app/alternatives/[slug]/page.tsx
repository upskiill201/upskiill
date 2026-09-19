import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ArrowRight, ExternalLink } from 'lucide-react';
import {
  getAllLandingSlugs,
  getLandingBySlug,
} from '@/lib/landing/posts';
import { buildCanonical, formatDate, SITE_URL } from '@/lib/blog/site';
import { FaqItem } from '@/lib/blog/types';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
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

  const { title, description, updatedDate, publishedDate } = page.frontmatter;

  return {
    title,
    description,
    alternates: { canonical: `/alternatives/${slug}` },
    openGraph: {
      type: 'website',
      url: `/alternatives/${slug}`,
      title,
      description,
      publishedTime: publishedDate,
      modifiedTime: updatedDate ?? publishedDate,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AlternativesLandingPage({
  params,
}: LandingPageProps) {
  const { slug } = await params;
  const page = getLandingBySlug(slug);
  if (!page) notFound();

  const { frontmatter: fm } = page;
  const canonical = buildCanonical(`/alternatives/${slug}`);

  const faqSchema =
    fm.faq && fm.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: fm.faq.map((item: FaqItem) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className={styles.page}>
      <JsonLd
        data={
          faqSchema
            ? [{ '@context': 'https://schema.org', '@type': 'WebPage', '@id': canonical }, faqSchema]
            : [{ '@context': 'https://schema.org', '@type': 'WebPage', '@id': canonical }]
        }
      />
      <div className={styles.container}>
        <article className={styles.article}>
          {/* ── Header ── */}
          <header className={styles.header}>
            <h1 className={styles.title}>{fm.title}</h1>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <time dateTime={fm.publishedDate}>
                  {formatDate(fm.publishedDate)}
                </time>
              </span>
              {fm.updatedDate && fm.updatedDate !== fm.publishedDate && (
                <span className={styles.metaItem}>
                  Updated <time dateTime={fm.updatedDate}>
                    {formatDate(fm.updatedDate)}
                  </time>
                </span>
              )}
            </div>
          </header>

          {/* ── Body ── */}
          <div className={styles.body}>
            <MDXRemote
              source={page.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {/* ── FAQ (accordion + FAQPage schema) ── */}
          {fm.faq && fm.faq.length > 0 && (
            <FaqAccordion items={fm.faq} />
          )}

          {/* ── CTA ── */}
          <CtaBlock cta={fm.cta} />
        </article>

        {/* ── All Comparisons ── */}
        <aside className={styles.sidebar} aria-labelledby="all-comparisons">
          <h2 id="all-comparisons" className={styles.sidebarHeading}>
            All Comparisons
          </h2>
          <nav className={styles.sidebarNav}>
            <Link href="/alternatives/duolingo-alternative" className={styles.sidebarLink}>
              Duolingo Alternative
            </Link>
            <Link href="/alternatives/skillshare-alternative" className={styles.sidebarLink}>
              Skillshare Alternative
            </Link>
            <Link href="/alternatives/khan-academy-alternative" className={styles.sidebarLink}>
              Khan Academy Alternative
            </Link>
            <Link href="/alternatives/udemy-alternative" className={styles.sidebarLink}>
              Udemy Alternative
            </Link>
            <Link href="/alternatives/coursera-alternative" className={styles.sidebarLink}>
              Coursera Alternative
            </Link>
          </nav>

          <div className={styles.sidebarCta}>
            <ExternalLink href="/onboarding/0" className={styles.sidebarCtaLink}>
              <span>Start your free Teyro streak</span>
              <ArrowRight size={14} strokeWidth={3} />
            </ExternalLink>
          </div>
        </aside>
      </div>
    </div>
  );
}
