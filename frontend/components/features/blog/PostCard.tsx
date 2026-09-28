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
    <Link
      href={`/blog/${post.slug}`}
      className={styles.card}
      style={category ? ({ '--accent': category.accentColor } as React.CSSProperties) : undefined}
    >
      <div className={styles.cover}>
        <CoverImage
          src={post.coverImage}
          alt=""
          slug={post.slug}
          title={post.title}
          categorySlug={post.categorySlug}
          priority={priority}
        />
      </div>

      <div className={styles.body}>
        {category && <span className={styles.category}>{category.name}</span>}
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.description}</p>
        <div className={styles.meta}>
          <span>{formatDate(post.publishedDate)}</span>
          <span className={styles.metaDot} aria-hidden="true" />
          <span className={styles.readTime}>
            <Clock size={14} strokeWidth={2.5} />
            {post.readingTimeMinutes} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
