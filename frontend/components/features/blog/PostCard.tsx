import Image from 'next/image';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import type { PostSummary } from '@/lib/blog/types';
import { getCategory } from '@/lib/blog/categories';
import { formatDate } from '@/lib/blog/site';
import CoverImage from './CoverImage';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: PostSummary;
  /** Set on the above-the-fold image for LCP */
  priority?: boolean;
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  const category = getCategory(post.categorySlug);

  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.cover}>
        <CoverImage
          src={post.coverImage}
          alt=""
          slug={post.slug}
          title={post.title}
          priority={priority}
        />
        {category && (
          <span
            className={styles.categoryPill}
            style={{
              background: `${category.accentColor}14`,
              color: category.accentColor,
            }}
          >
            {category.shortLabel}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.description}</p>
        <div className={styles.meta}>
          <span>{formatDate(post.publishedDate)}</span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.readTime}>
            <Clock size={13} strokeWidth={2.5} />
            {post.readingTimeMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
