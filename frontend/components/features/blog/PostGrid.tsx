import type { PostSummary } from '@/lib/blog/types';
import PostCard from './PostCard';
import styles from './PostGrid.module.css';

interface PostGridProps {
  posts: PostSummary[];
  /** How many leading images to lazy-load eagerly (above-the-fold LCP) */
  priorityCount?: number;
}

export default function PostGrid({ posts, priorityCount = 0 }: PostGridProps) {
  if (posts.length === 0) return null;

  return (
    <div className={styles.grid}>
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} priority={i < priorityCount} />
      ))}
    </div>
  );
}
