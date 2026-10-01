import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { AUTHORS } from '@/lib/blog/authors';
import { getPostsByAuthor, toSummary } from '@/lib/blog/posts';
import { buildCanonical } from '@/lib/blog/site';
import PostGrid from '@/components/features/blog/PostGrid';
import styles from '../../BlogIndex.module.css';
import authorStyles from './AuthorPage.module.css';

export const revalidate = 3600;
export const dynamicParams = false;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) return {};

  return {
    title: `${author.name} — Teyro Blog`,
    description: author.bio.slice(0, 158),
    alternates: {
      canonical: buildCanonical(`/blog/author/${author.slug}`),
    },
    openGraph: {
      title: `${author.name} — Teyro Blog`,
      description: author.bio,
      url: `/blog/author/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(author.slug).map(toSummary);

  return (
    <div className={styles.page}>
      <div className={styles.band}>
        <div className={styles.container}>
          {/* ── Author header ── */}
          <header className={authorStyles.header}>
            {author.avatarUrl ? (
              <Image
                src={author.avatarUrl}
                alt=""
                width={88}
                height={88}
                className={authorStyles.avatar}
                priority
              />
            ) : (
              <span className={`${authorStyles.avatar} ${authorStyles.avatarFallback}`}>
                {author.name.charAt(0)}
              </span>
            )}
            <div>
              <p className={styles.kicker}>Author</p>
              <h1 className={authorStyles.name}>{author.name}</h1>
              <p className={authorStyles.role}>{author.role}</p>
            </div>
          </header>
          <p className={authorStyles.bio}>{author.bio}</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* ── Posts ── */}
        <section aria-label={`Articles by ${author.name}`}>
          {posts.length > 0 ? (
            <PostGrid posts={posts} priorityCount={3} />
          ) : (
            <div className={styles.emptyState}>
              <p>No articles published yet — check back soon.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
