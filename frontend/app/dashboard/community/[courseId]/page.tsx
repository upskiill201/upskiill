'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, MessageSquare, BookOpen, Flame, Crown, AlertCircle,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import PostCard, { PostCardSkeleton } from '@/components/community/PostCard';
import PostComposer from '@/components/community/PostComposer';
import TeyMascot from '@/components/community/TeyMascot';
import shared from '@/components/community/community.module.css';
import styles from './CommunityPage.module.css';
import {
  getCommunityByCourse,
  getCommunityPosts,
  type CommunityOverview,
  type CommunityPost,
} from '@/lib/communityApi';

const TYPE_FILTERS = [
  { value: '', label: 'All' },
  { value: 'QUESTION', label: 'Questions' },
  { value: 'DISCUSSION', label: 'Discussions' },
  { value: 'WIN', label: 'Wins' },
  { value: 'TIP', label: 'Tips' },
  { value: 'RESOURCE', label: 'Resources' },
  { value: 'POLL', label: 'Polls' },
];

export default function CommunityPage() {
  // useSearchParams needs a Suspense boundary under static prerender
  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} style={{ height: 140 }} />
          <PostCardSkeleton />
        </div>
      }
    >
      <CommunityPageInner />
    </Suspense>
  );
}

function CommunityPageInner() {
  const routeParams = useParams<{ courseId: string }>();
  const courseId = routeParams.courseId;
  const searchParams = useSearchParams();
  const lessonParam = searchParams.get('lesson');
  const lessonTitleParam = searchParams.get('lessonTitle');

  const [community, setCommunity] = React.useState<CommunityOverview | null>(null);
  const [posts, setPosts] = React.useState<CommunityPost[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [state, setState] = React.useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [tab, setTab] = React.useState<'feed' | 'members'>('feed');

  const [typeFilter, setTypeFilter] = React.useState('');
  const [sort, setSort] = React.useState<'new' | 'top' | 'unanswered'>('new');
  const composerDefaultOpen = searchParams.get('compose') === '1';

  // Load community identity once
  React.useEffect(() => {
    let alive = true;
    setState('loading');
    getCommunityByCourse(courseId)
      .then((c) => {
        if (!alive) return;
        setCommunity(c);
        setState('ready');
      })
      .catch((err) => {
        if (!alive) return;
        setErrorMsg(err instanceof Error ? err.message : 'Could not load this community.');
        setState('error');
      });
    return () => {
      alive = false;
    };
  }, [courseId]);

  const loadPosts = React.useCallback(
    async (p: number, replace: boolean) => {
      if (!community) return;
      try {
        const res = await getCommunityPosts(community.id, {
          sort,
          type: typeFilter || undefined,
          lessonId: lessonParam ?? undefined,
          page: p,
        });
        setTotal(res.total);
        setPage(p);
        setPosts((prev) => (replace ? res.posts : [...prev, ...res.posts]));
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'Could not load posts.');
        setState('error');
      }
    },
    [community, sort, typeFilter, lessonParam],
  );

  React.useEffect(() => {
    void loadPosts(1, true);
  }, [loadPosts]);

  if (state === 'error') {
    return (
      <div className={styles.page}>
        <div className={shared.errorBanner}>
          <AlertCircle size={28} />
          <span>{errorMsg || 'Something went wrong.'}</span>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (state === 'loading' || !community) {
    return (
      <div className={styles.page}>
        <div className={`${shared.skeletonLine} ${shared.skeletonLineLong}`} style={{ height: 140 }} />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.cover}>
          {community.course?.thumbnailUrl && (
            <Image src={community.course.thumbnailUrl} alt="" fill className={styles.coverImg} />
          )}
        </div>
        <div className={styles.headerBody}>
          {community.course?.thumbnailUrl ? (
            <Image
              src={community.course.thumbnailUrl}
              alt=""
              width={76}
              height={76}
              className={styles.thumb}
            />
          ) : (
            <div className={styles.thumb}>
              <Avatar size="xl" name={community.name} />
            </div>
          )}
          <div className={styles.titleBlock}>
            <span className={styles.communityKicker}>Course community</span>
            <h1 className={styles.title}>{community.name}</h1>
            <div className={styles.statsRow}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <MessageSquare size={14} /> {community.stats.totalPosts} posts
              </span>
            </div>
          </div>

          <div className={styles.faces}>
            <div className={styles.faceStack}>
              {community.membersPreview.slice(0, 6).map((m) => (
                <Avatar key={m.id} src={m.avatarUrl ?? undefined} name={m.fullName} size="sm" ring />
              ))}
            </div>
            <div className={styles.facesMeta}>
              <span className={styles.facesCount}>{community.stats.totalMembers}</span>
              <span className={styles.facesLabel}>members</span>
            </div>
            {community.isModerator ? (
              <span className={styles.joinedPill}>
                <Crown size={14} /> You teach this
              </span>
            ) : (
              <span className={styles.joinedPill}>
                <Users size={14} /> Joined
              </span>
            )}
          </div>
        </div>

        <nav className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${tab === 'feed' ? styles.tabActive : ''}`}
            onClick={() => setTab('feed')}
          >
            Feed
          </button>
          <button
            className={`${styles.tabBtn} ${tab === 'members' ? styles.tabActive : ''}`}
            onClick={() => setTab('members')}
          >
            Members · {community.stats.totalMembers}
          </button>
        </nav>
      </header>

      {tab === 'feed' && (
        <>
          {/* ── Lesson deep-link filter banner ──────────────────────────── */}
          {lessonParam && (
            <div className={styles.lessonFilter}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                <BookOpen size={15} />
                Discussions for lesson:{' '}
                {lessonTitleParam || (posts[0]?.lesson?.title ?? 'selected lesson')}
              </span>
              <Link href={`/dashboard/community/${courseId}`} className={styles.clearFilterBtn}>
                show all posts
              </Link>
            </div>
          )}

          <PostComposer
            key={lessonParam ?? 'all'}
            community={community}
            defaultOpen={composerDefaultOpen}
            lessonLink={
              lessonParam
                ? { id: lessonParam, title: lessonTitleParam ?? 'this lesson' }
                : null
            }
            onPosted={() => void loadPosts(1, true)}
          />

          {/* ── Controls ─────────────────────────────────────────────────── */}
          <div className={styles.controls}>
            <div className={styles.chipRow}>
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`${styles.filterChip} ${typeFilter === f.value ? styles.filterChipActive : ''}`}
                  onClick={() => setTypeFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {!lessonParam && (
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                aria-label="Sort posts"
              >
                <option value="new">Latest activity</option>
                <option value="top">Most liked</option>
                <option value="unanswered">Unanswered</option>
              </select>
            )}
          </div>

          {/* ── Posts list ──────────────────────────────────────────────── */}
          {posts.length === 0 && sort !== 'new' ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : posts.length === 0 ? (
            <EmptyState
              icon={<TeyMascot size={96} />}
              title="It's quiet in here"
              description={
                lessonParam
                  ? 'No discussions for this lesson yet — be the first to ask something.'
                  : 'No posts yet — be the first! Ask a question or share what you are learning.'
              }
            />
          ) : (
            <div className={styles.postList}>
              {posts.map((p) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <PostCard post={p} isModerator={community.isModerator} onDeleted={(id) => setPosts((prev) => prev.filter((x) => x.id !== id))} />
                </motion.div>
              ))}

              {posts.length < total && (
                <button
                  className={styles.loadMoreBtn}
                  disabled={false}
                  onClick={() => void loadPosts(page + 1, false)}
                >
                  Load more posts
                </button>
              )}
            </div>
          )}
        </>
      )}

      {tab === 'members' && (
        <MembersPanel communityId={community.id} />
      )}
    </div>
  );
}

/** Members tab — paginated roster with creator badge. */
function MembersPanel({ communityId }: { communityId: string }) {
  const [members, setMembers] = React.useState<
    Array<{ id: string; fullName: string; avatarUrl: string | null; isCreator: boolean; streakDays: number; xp: number }>
  >([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [state, setState] = React.useState<'loading' | 'error' | 'done'>('loading');

  const loadPage = React.useCallback(async (p: number, replace: boolean) => {
    try {
      const { getMembers } = await import('@/lib/communityApi');
      const res = await getMembers(communityId, '', p);
      setTotal(res.total);
      setPage(p);
      setMembers((prev) => (replace ? res.members : [...prev, ...res.members]));
      setState('done');
    } catch {
      setState('error');
    }
  }, [communityId]);

  React.useEffect(() => {
    void loadPage(1, true);
  }, [loadPage]);

  if (state === 'error') {
    return (
      <div className={shared.errorBanner}>
        Could not load members.
        <Button variant="outline" onClick={() => void loadPage(1, true)}>Try again</Button>
      </div>
    );
  }
  if (state === 'loading') {
    return (
      <div className={styles.membersPanel}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.memberCard}>
            <div className={shared.skeletonAvatar} style={{ width: 40, height: 40 }} />
            <div className={shared.skeletonLine} style={{ flex: 1 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={styles.membersPanel}>
        {members.map((m) => (
          <div key={m.id} className={styles.memberCard}>
            <Avatar src={m.avatarUrl ?? undefined} name={m.fullName} size="md" />
            <div className={styles.memberInfo}>
              <div className={styles.memberName}>{m.fullName}</div>
              <div className={styles.memberMeta}>
                {m.isCreator ? (
                  <Crown size={12} color="var(--brand-blue)" />
                ) : (
                  <Flame size={12} />
                )}
                {m.isCreator ? 'Creator' : `${m.streakDays}-day streak`}
              </div>
            </div>
            {m.isCreator && <span className={styles.creatorTag}>CREATOR</span>}
          </div>
        ))}
      </div>
      {members.length < total && (
        <button
          className={styles.loadMoreBtn}
          style={{ alignSelf: 'center', marginTop: 8 }}
          onClick={() => void loadPage(page + 1, false)}
        >
          Show more
        </button>
      )}
    </>
  );
}
