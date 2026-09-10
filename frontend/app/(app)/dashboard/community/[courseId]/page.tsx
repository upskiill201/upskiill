'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  MessageSquare, BookOpen, Flame, Crown, AlertCircle, PanelRight, X,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import PostCard, { PostCardSkeleton } from '@/components/community/PostCard';
import PostComposer from '@/components/community/PostComposer';
import CommunityRail from '@/components/community/CommunityRail';
import LeaderboardPanel from '@/components/community/LeaderboardPanel';
import TeyMascot from '@/components/community/TeyMascot';
import { getCachedUser } from '@/lib/user-cache';
import shared from '@/components/community/community.module.css';
import { pickCommunityPostsEmptyLine } from '@/lib/tey/emptyStateVoice';
import styles from './CommunityPage.module.css';
import {
  getCommunityBootstrap,
  getCommunityPosts,
  type CommunityOverview,
  type CommunityPost,
  type LeaderboardBoard,
} from '@/lib/communityApi';

/** Category chips — Skool's row above the feed, backed by post types. */
const TYPE_FILTERS = [
  { value: '', label: 'All' },
  { value: 'QUESTION', label: 'Questions' },
  { value: 'WIN', label: 'Wins' },
  { value: 'DISCUSSION', label: 'Discussion' },
  { value: 'TIP', label: 'Tips' },
  { value: 'RESOURCE', label: 'Resources' },
  { value: 'POLL', label: 'Polls' },
  { value: 'ANNOUNCEMENT', label: 'Announcements' },
];

type Tab = 'feed' | 'members' | 'leaderboards';

export default function CommunityPage() {
  // useSearchParams needs a Suspense boundary under static prerender.
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CommunityPageInner />
    </Suspense>
  );
}

function PageSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={shared.skeletonAvatar} style={{ width: 40, height: 40, borderRadius: 10 }} />
        <div className={`${shared.skeletonLine} ${shared.skeletonLineShort}`} />
      </div>
      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
        <div className={styles.railCol} />
      </div>
    </div>
  );
}

function CommunityPageInner() {
  const routeParams = useParams<{ courseId: string }>();
  const courseId = routeParams.courseId;
  const searchParams = useSearchParams();
  const lessonParam = searchParams.get('lesson');
  const lessonTitleParam = searchParams.get('lessonTitle');
  const composerDefaultOpen = searchParams.get('compose') === '1';

  const [community, setCommunity] = React.useState<CommunityOverview | null>(null);
  const [posts, setPosts] = React.useState<CommunityPost[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [leaderboard, setLeaderboard] = React.useState<LeaderboardBoard | null | undefined>(
    undefined,
  );
  const [state, setState] = React.useState<'loading' | 'error' | 'ready'>('loading');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [tab, setTab] = React.useState<Tab>('feed');
  const [typeFilter, setTypeFilter] = React.useState('');
  const [sort, setSort] = React.useState<'new' | 'top' | 'unanswered'>('new');
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [railOpen, setRailOpen] = React.useState(false);

  const me = React.useMemo(() => getCachedUser(), []);

  // The first paint is ONE request: identity, first page of posts and the rail
  // board all arrive together. Every later change (a chip, a sort, a new page)
  // only refetches the post list.
  const bootstrapped = React.useRef(false);
  // Declared above the bootstrap effect because that effect resets it when the
  // learner moves to a different community.
  const filterKey = `${sort}|${typeFilter}`;
  const lastFilterKey = React.useRef(filterKey);

  React.useEffect(() => {
    let alive = true;
    bootstrapped.current = false;
    setState('loading');
    // A fresh community starts on the default view. Without this reset, moving
    // from one community to another kept the old chip highlighted while the
    // bootstrap fetched unfiltered posts — the controls lying about the list.
    setTypeFilter('');
    setSort('new');
    setTab('feed');
    lastFilterKey.current = 'new|';
    getCommunityBootstrap(courseId, {
      sort: 'new',
      lessonId: lessonParam ?? undefined,
    })
      .then((data) => {
        if (!alive) return;
        setCommunity(data.community);
        setPosts(data.posts.posts);
        setTotal(data.posts.total);
        setPage(data.posts.page);
        setLeaderboard(data.leaderboard);
        setState('ready');
        bootstrapped.current = true;
      })
      .catch((err) => {
        if (!alive) return;
        setErrorMsg(err instanceof Error ? err.message : 'Could not load this community.');
        setState('error');
      });
    return () => {
      alive = false;
    };
  }, [courseId, lessonParam]);

  const loadPosts = React.useCallback(
    async (p: number, replace: boolean) => {
      if (!community) return;
      if (replace) setRefreshing(true);
      else setLoadingMore(true);
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
      } finally {
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [community, sort, typeFilter, lessonParam],
  );

  // Refetch on filter/sort change only — the bootstrap already delivered the
  // default view, and refetching it immediately would double every page load.
  React.useEffect(() => {
    if (!bootstrapped.current) return;
    if (lastFilterKey.current === filterKey) return;
    lastFilterKey.current = filterKey;
    void loadPosts(1, true);
  }, [filterKey, loadPosts]);

  // Escape closes the mobile rail drawer, and the body must not scroll behind it.
  React.useEffect(() => {
    if (!railOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setRailOpen(false);
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [railOpen]);

  const openLeaderboards = React.useCallback(() => {
    setTab('leaderboards');
    setRailOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleted = React.useCallback((id: string) => {
    setPosts((prev) => prev.filter((x) => x.id !== id));
    setTotal((t) => Math.max(0, t - 1));
  }, []);

  if (state === 'error') {
    return (
      <div className={styles.page}>
        <div className={shared.errorBanner}>
          <AlertCircle size={28} />
          <span>{errorMsg || 'Something went wrong.'}</span>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (state === 'loading' || !community) return <PageSkeleton />;

  const thumb = community.course?.thumbnailUrl;

  return (
    <div className={styles.page}>
      {/* ── Identity + rail trigger ───────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.identity}>
          {thumb ? (
            <Image src={thumb} alt="" width={40} height={40} className={styles.identityThumb} />
          ) : (
            <Avatar name={community.name} size="md" />
          )}
          <div className={styles.identityText}>
            <span className={styles.communityKicker}>Course community</span>
            <h1 className={styles.communityName}>{community.name}</h1>
          </div>
        </div>

        <button
          type="button"
          className={styles.railTrigger}
          onClick={() => setRailOpen(true)}
          aria-label="Show community info and leaderboard"
        >
          <PanelRight size={16} />
          <span className={styles.railTriggerLabel}>Info</span>
        </button>
      </div>

      <nav className={styles.tabs} aria-label="Community sections">
        <button
          className={`${styles.tabBtn} ${tab === 'feed' ? styles.tabActive : ''}`}
          onClick={() => setTab('feed')}
        >
          Community
        </button>
        {community.course && (
          <Link href={`/learn/${community.course.id}`} className={styles.tabBtn}>
            Classroom
          </Link>
        )}
        <button
          className={`${styles.tabBtn} ${tab === 'members' ? styles.tabActive : ''}`}
          onClick={() => setTab('members')}
        >
          Members
        </button>
        <button
          className={`${styles.tabBtn} ${tab === 'leaderboards' ? styles.tabActive : ''}`}
          onClick={() => setTab('leaderboards')}
        >
          Leaderboards
        </button>
      </nav>

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          {tab === 'feed' && (
            <>
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
                  lessonParam ? { id: lessonParam, title: lessonTitleParam ?? 'this lesson' } : null
                }
                onPosted={() => void loadPosts(1, true)}
              />

              <div className={styles.controls}>
                <div className={styles.chipRow}>
                  {TYPE_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      className={`${styles.filterChip} ${
                        typeFilter === f.value ? styles.filterChipActive : ''
                      }`}
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

              {posts.length === 0 ? (
                <EmptyState
                  icon={<TeyMascot size={96} />}
                  title={typeFilter ? 'Nothing here yet' : "It's quiet in here"}
                  description={pickCommunityPostsEmptyLine(lessonParam ? 'lesson' : typeFilter ? 'filter' : 'general')}
                />
              ) : (
                <div className={`${styles.postList} ${refreshing ? styles.listDim : ''}`}>
                  {posts.map((p) => (
                    <PostCard
                      key={p.id}
                      post={p}
                      isModerator={community.isModerator}
                      currentUserId={me?.id}
                      onDeleted={handleDeleted}
                      onCategoryClick={setTypeFilter}
                    />
                  ))}

                  {posts.length < total && (
                    <button
                      className={styles.loadMoreBtn}
                      disabled={loadingMore}
                      onClick={() => void loadPosts(page + 1, false)}
                    >
                      {loadingMore ? 'Loading…' : 'Load more posts'}
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {tab === 'members' && <MembersPanel communityId={community.id} />}

          {tab === 'leaderboards' && (
            <LeaderboardPanel
              communityId={community.id}
              currentUserId={me?.id}
              currentUserName={me?.fullName}
              currentUserAvatarUrl={me?.avatarUrl}
            />
          )}
        </div>

        <aside className={styles.railCol}>
          <CommunityRail
            community={community}
            leaderboard={leaderboard}
            currentUserId={me?.id}
            onSeeLeaderboards={openLeaderboards}
          />
        </aside>
      </div>

      {/* ── Mobile rail drawer ────────────────────────────────────────────── */}
      {railOpen && (
        <>
          <button
            className={styles.scrim}
            aria-label="Close community info"
            onClick={() => setRailOpen(false)}
          />
          <div className={styles.drawer} role="dialog" aria-label="Community info">
            <div className={styles.drawerHead}>
              <span className={styles.drawerTitle}>About & leaderboard</span>
              <button
                className={styles.drawerClose}
                onClick={() => setRailOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className={styles.drawerRail}>
              <CommunityRail
                community={community}
                leaderboard={leaderboard}
                currentUserId={me?.id}
                onSeeLeaderboards={openLeaderboards}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/** Members tab — paginated roster with creator badge. */
function MembersPanel({ communityId }: { communityId: string }) {
  const [members, setMembers] = React.useState<
    Array<{
      id: string;
      fullName: string;
      avatarUrl: string | null;
      isCreator: boolean;
      streakDays: number;
      xp: number;
    }>
  >([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [state, setState] = React.useState<'loading' | 'error' | 'done'>('loading');

  const loadPage = React.useCallback(
    async (p: number, replace: boolean) => {
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
    },
    [communityId],
  );

  React.useEffect(() => {
    void loadPage(1, true);
  }, [loadPage]);

  if (state === 'error') {
    return (
      <div className={shared.errorBanner}>
        Could not load members.
        <Button variant="outline" onClick={() => void loadPage(1, true)}>
          Try again
        </Button>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className={styles.membersPanel}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
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
                <span>·</span>
                <MessageSquare size={12} />
                {m.xp} XP
              </div>
            </div>
            {m.isCreator && <span className={styles.creatorTag}>CREATOR</span>}
          </div>
        ))}
      </div>
      {members.length < total && (
        <button
          className={styles.loadMoreBtn}
          style={{ alignSelf: 'center', marginTop: 12 }}
          onClick={() => void loadPage(page + 1, false)}
        >
          Show more
        </button>
      )}
    </>
  );
}
