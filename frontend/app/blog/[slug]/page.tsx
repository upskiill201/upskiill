import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ChevronRight, Clock, CalendarDays, RefreshCw } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, toSummary } from '@/lib/blog/posts';
import { getCategoryOrThrow } from '@/lib/blog/categories';
import { getAuthorOrDefault } from '@/lib/blog/authors';
import { buildCanonical, formatDate, SITE_URL } from '@/lib/blog/site';
import CoverImage from '@/components/features/blog/CoverImage';
import TableOfContents from '@/components/features/blog/TableOfContents';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import ShareButtons from '@/components/features/blog/ShareButtons';
import AuthorBio from '@/components/features/blog/AuthorBio';
import PostGrid from '@/components/features/blog/PostGrid';
import JsonLd from '@/components/features/blog/JsonLd';
import proseStyles from '../prose.module.css';
import styles from './PostPage.module.css';

export const revalidate = 3600;
export const dynamicParams = true;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, description, publishedDate, updatedDate, tags } = post.frontmatter;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${slug}`,
      title,
      description,
      publishedTime: publishedDate,
      modifiedTime: updatedDate ?? publishedDate,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter: fm } = post;
  const category = getCategoryOrThrow(fm.category);
  const author = getAuthorOrDefault(fm.authorSlug);
  const related = getRelatedPosts(post, 3).map(toSummary);
  const canonical = buildCanonical(`/blog/${slug}`);
  const ogImageUrl = buildCanonical(`/blog/${slug}/opengraph-image`);
  const showToc = post.toc.length >= 4;

  /* ── Structured data ──────────────────────────────────────────────── */

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fm.title,
    description: fm.description,
    image: [
      ...(fm.coverImage ? [buildCanonical(fm.coverImage)] : []),
      ogImageUrl,
    ],
    datePublished: fm.publishedDate,
    dateModified: fm.updatedDate ?? fm.publishedDate,
    author: { '@type': 'Organization', name: author.name, url: buildCanonical(`/blog/author/${author.slug}`) },
    publisher: {
      '@type': 'Organization',
      name: 'Teyro',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/teyro-logo-blue.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    ...(fm.tags && fm.tags.length > 0 ? { keywords: fm.tags.join(', ') } : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: buildCanonical('/blog') },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: buildCanonical(`/blog/category/${category.slug}`),
      },
      { '@type': 'ListItem', position: 4, name: fm.title, item: canonical },
    ],
  };

  const faqSchema =
    fm.faq && fm.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: fm.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null;

  /* ── Page ─────────────────────────────────────────────────────────── */

  return (
    <div className={styles.page}>
      {/* Structured data */}
      <JsonLd data={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]} />

      <div className={styles.container}>
        <article>
          {/* ── Breadcrumb ── */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.crumbLink}>
              Home
            </Link>
            <ChevronRight size={13} className={styles.crumbSep} aria-hidden="true" />
            <Link href="/blog" className={styles.crumbLink}>
              Blog
            </Link>
            <ChevronRight size={13} className={styles.crumbSep} aria-hidden="true" />
            <Link href={`/blog/category/${category.slug}`} className={styles.crumbLink}>
              {category.name}
            </Link>
          </nav>

          {/* ── Header ── */}
          <header className={styles.header}>
            <span className={styles.categoryPill} style={{ background: category.accentColor }}>
              {category.name}
            </span>
            <h1 className={styles.title}>{fm.title}</h1>
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <CalendarDays size={14} strokeWidth={2.5} />
                <time dateTime={fm.publishedDate}>{formatDate(fm.publishedDate)}</time>
              </span>
              {fm.updatedDate && fm.updatedDate !== fm.publishedDate && (
                <span className={styles.metaItem}>
                  <RefreshCw size={14} strokeWidth={2.5} />
                  Updated <time dateTime={fm.updatedDate}>{formatDate(fm.updatedDate)}</time>
                </span>
              )}
              <span className={styles.metaItem}>
                <Clock size={14} strokeWidth={2.5} />
                {post.readingTimeMinutes} min read
              </span>
            </div>
          </header>

          {/* ── Cover ── */}
          <div className={styles.coverWrap}>
            <CoverImage src={fm.coverImage} alt={fm.title} slug={slug} title={fm.title} priority />
          </div>

          {/* ── Body (+ TOC sidebar on long posts) ── */}
          <div className={showToc ? styles.bodyGrid : styles.bodySingle}>
            <div className={`${proseStyles.prose} ${styles.articleBody}`}>
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>
            {showToc && (
              <aside className={styles.tocCol}>
                <TableOfContents items={post.toc} />
              </aside>
            )}
          </div>

          {/* ── FAQ (accordion + FAQPage schema) ── */}
          {fm.faq && fm.faq.length > 0 && <FaqAccordion items={fm.faq} />}

          {/* ── Conversion + social ── */}
          <CtaBlock cta={fm.cta} />
          <ShareButtons url={canonical} title={fm.title} />
          <AuthorBio author={author} />
        </article>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-heading">
            <h2 id="related-heading" className={styles.relatedHeading}>
              Keep reading
            </h2>
            <PostGrid posts={related} />
          </section>
        )}
      </div>
    </div>
  );
}
