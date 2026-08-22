'use client';

import { useMemo, useRef, useState } from 'react';
import { Search, FileText } from 'lucide-react';
import type { PostSummary } from '@/lib/blog/types';
import PostCard from './PostCard';
import styles from './BlogIndexClient.module.css';

interface BlogIndexClientProps {
  posts: PostSummary[];
  categories: { slug: string; shortLabel: string; name: string }[];
  /** The latest post is rendered as a hero above the grid — hidden from the
   * default grid view so it doesn't appear twice. */
  featuredSlug?: string;
}

const PAGE_SIZE = 9;

export default function BlogIndexClient({ posts, categories, featuredSlug }: BlogIndexClientProps) {
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFiltering = category !== 'all' || query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== 'all' && p.categorySlug !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, category, query]);

  // Default view: featured hero already shows the newest post up top.
  const gridPosts = useMemo(() => {
    if (isFiltering) return filtered;
    return filtered.filter((p) => p.slug !== featuredSlug);
  }, [filtered, isFiltering, featuredSlug]);

  const visible = gridPosts.slice(0, visibleCount);
  const hasMore = gridPosts.length > visibleCount;

  function handleQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setVisibleCount(PAGE_SIZE), 200);
  }

  function selectCategory(slug: string) {
    setCategory(slug);
    setVisibleCount(PAGE_SIZE);
  }

  function clearFilters() {
    setCategory('all');
    setQuery('');
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className={styles.section} aria-label="All articles">
      {/* ── Toolbar: category pills + search ── */}
      <div className={styles.toolbar}>
        <div className={styles.pills} role="tablist" aria-label="Filter by category">
          <button
            type="button"
            role="tab"
            aria-selected={category === 'all'}
            className={`${styles.pill} ${category === 'all' ? styles.pillActive : ''}`}
            onClick={() => selectCategory('all')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              role="tab"
              aria-selected={category === c.slug}
              className={`${styles.pill} ${category === c.slug ? styles.pillActive : ''}`}
              onClick={() => selectCategory(c.slug)}
            >
              {c.shortLabel}
            </button>
          ))}
        </div>

        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} aria-hidden="true" />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search articles…"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            aria-label="Search articles"
          />
        </div>
      </div>

      {/* ── Grid ── */}
      {visible.length > 0 ? (
        <>
          <div className={styles.grid}>
            {visible.map((post, i) => (
              <PostCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button
                type="button"
                className={styles.loadMoreBtn}
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              >
                Load more articles
              </button>
              <p className={styles.loadMoreHint}>
                Showing {visible.length} of {gridPosts.length}
              </p>
            </div>
          )}
        </>
      ) : (
        /* ── Actionable empty state ── */
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <FileText size={28} strokeWidth={2} />
          </div>
          <h3 className={styles.emptyTitle}>No articles found</h3>
          <p className={styles.emptyText}>
            Nothing matches {query.trim() ? `“${query.trim()}”` : 'this filter'} yet. Try a
            different search or category.
          </p>
          <button type="button" className={styles.emptyBtn} onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
