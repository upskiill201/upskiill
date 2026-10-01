import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { ChevronRight, Clock, CalendarDays } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, toSummary } from '@/lib/blog/posts';
import { getCategoryOrThrow } from '@/lib/blog/categories';
import { getAuthorOrDefault } from '@/lib/blog/authors';
import { buildCanonical, formatDate, SITE_URL } from '@/lib/blog/site';
import CoverImage from '@/components/features/blog/CoverImage';
import TableOfContents from '@/components/features/blog/TableOfContents';
import TocDisclosure from '@/components/features/blog/TocDisclosure';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import ShareButtons from '@/components/features/blog/ShareButtons';
import AuthorBio from '@/components/features/blog/AuthorBio';
import PostGrid from '@/components/features/blog/PostGrid';
import JsonLd from '@/components/features/blog/JsonLd';
import { GateLink } from '@/components/launch/GateLink';
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
    image: [...(fm.coverImage ? [buildCanonical(fm.coverImage)] : []), ogImageUrl],
    datePublished: fm.publishedDate,
    dateModified: fm.updatedDate ?? fm.publishedDate,
    author: {
      '@type': 'Organization',
      name: author.name,
      url: buildCanonical(`/blog/author/${author.slug}`),
    },
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: buildCanonical('/blog'),
      },
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

  const accentStyle = {
    '--accent': category.accentColor,
  } as React.CSSProperties;
  const wasUpdated = fm.updatedDate && fm.updatedDate !== fm.publishedDate;

  return (
    <div className={styles.page} style={accentStyle}>
      {/* Scroll-linked reading progress — pure CSS, hidden where unsupported */}
      <span className={styles.progress} aria-hidden="true" />

      {/* Structured data */}
      <JsonLd
        data={
          faqSchema
            ? [articleSchema, breadcrumbSchema, faqSchema]
            : [articleSchema, breadcrumbSchema]
        }
      />

      <article>
        {/* ── Header band ── */}
        <header className={styles.band}>
          <div className={styles.header}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/" className={styles.crumbLink}>
                Home
              </Link>
              <ChevronRight
                size={14}
                strokeWidth={3}
                className={styles.crumbSep}
                aria-hidden="true"
              />
              <Link href="/blog" className={styles.crumbLink}>
                Blog
              </Link>
              <ChevronRight
                size={14}
                strokeWidth={3}
                className={styles.crumbSep}
                aria-hidden="true"
              />
              <Link href={`/blog/category/${category.slug}`} className={styles.crumbLink}>
                {category.name}
              </Link>
            </nav>

            <Link href={`/blog/category/${category.slug}`} className={styles.categoryChip}>
              {category.name}
            </Link>
            <h1 className={styles.title}>{fm.title}</h1>
            <p className={styles.dek}>{fm.description}</p>

            <div className={styles.byline}>
              <Link href={`/blog/author/${author.slug}`} className={styles.author}>
                {author.avatarUrl ? (
                  <Image
                    src={author.avatarUrl}
                    alt=""
                    width={44}
                    height={44}
                    className={styles.authorAvatar}
                  />
                ) : (
                  <span className={styles.authorAvatar}>{author.name.charAt(0)}</span>
                )}
                <span className={styles.authorName}>{author.name}</span>
              </Link>
              <span className={styles.metaItem}>
                <CalendarDays size={16} strokeWidth={2.5} />
                {wasUpdated ? (
                  <>
                    Updated <time dateTime={fm.updatedDate}>{formatDate(fm.updatedDate!)}</time>
                  </>
                ) : (
                  <time dateTime={fm.publishedDate}>{formatDate(fm.publishedDate)}</time>
                )}
              </span>
              <span className={styles.metaItem}>
                <Clock size={16} strokeWidth={2.5} />
                {post.readingTimeMinutes} min read
              </span>
            </div>
          </div>
        </header>

        <div className={styles.container}>
          {/* ── Cover ── */}
          <div className={styles.coverWrap}>
            <CoverImage
              src={fm.coverImage}
              alt={fm.title}
              slug={slug}
              title={fm.title}
              categorySlug={category.slug}
              size="hero"
              priority
            />
          </div>

          {/* ── Body (+ sticky contents on long posts) ── */}
          <div className={showToc ? styles.bodyGrid : styles.bodySingle}>
            <div className={styles.mainCol}>
              {showToc && <TocDisclosure items={post.toc} />}

              <div className={`${proseStyles.prose} ${styles.articleBody}`}>
                <MDXRemote
                  source={post.content}
                  components={{ a: GateLink }}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [rehypeSlug],
                    },
                  }}
                />
              </div>

              {/* ── FAQ (accordion + FAQPage schema) ── */}
              {fm.faq && fm.faq.length > 0 && <FaqAccordion items={fm.faq} />}

              {/* ── Conversion + social ── */}
              <CtaBlock cta={fm.cta} />
              <ShareButtons url={canonical} title={fm.title} />
              <AuthorBio author={author} />
            </div>

            {showToc && (
              <aside className={styles.tocCol}>
                <TableOfContents items={post.toc} />
              </aside>
            )}
          </div>
        </div>
      </article>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-heading">
          <div className={styles.container}>
            <h2 id="related-heading" className={styles.relatedHeading}>
              Keep reading
            </h2>
            <PostGrid posts={related} />
          </div>
        </section>
      )}
    </div>
  );
}
