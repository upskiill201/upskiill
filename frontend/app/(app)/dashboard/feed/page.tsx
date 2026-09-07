'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles, HelpCircle, Trophy, Megaphone, LayoutGrid,
  BookOpen, Flame, AlertCircle, PencilLine, ChevronRight,
  Users, TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import PostCard, { PostCardSkeleton } from '@/components/community/PostCard';
import TeyMascot from '@/components/community/TeyMascot';
import shared from '@/components/community/community.module.css';
import { pickFeedEmptyLine } from '@/lib/tey/emptyStateVoice';
import styles from './FeedPage.module.css';
import {
  getFeed,
  getDiscover,
  getMyCommunities,
  type FeedItem,
  type CommunityOverview,
  type MyCommunity,
} from '@/lib/communityApi';

const FILTERS = [
  { value: 'all', label: 'All', icon: <LayoutGrid size={13} /> },
  { value: 'question', label: 'Questions', icon: <HelpCircle size={13} /> },
  { value: 'win', label: 'Wins', icon: <Trophy size={13} /> },
  { value: 'announcement', label: 'Announcements', icon: <Megaphone size={13} /> },
];

/** Icon + tint class per structured reason — the floating tab on each card. */
const REASON_STYLES: Record<string, { icon: React.ReactNode; tint: string }> = {
  announcement: { icon: <Megaphone size={12} />, tint: styles.tabAnnouncement },
  unanswered: { icon: <HelpCircle size={12} />, tint: styles.tabUnanswered },
  win: { icon: <Trophy size={12} />, tint: styles.tabWin },
  active: { icon: <Flame size={12} />, tint: styles.tabActive },
  course: { icon: <BookOpen size={12} />, tint: styles.tabCourse },
  general: { icon: <Sparkles size={12} />, tint: styles.tabGeneral },
};

export default function FeedPage() {
  const router = useRouter();
  // Most recent community — used by the composer-first trigger card. The feed
  // page itself never renders PostComposer (it has no community context), so
  // the trigger routes into that community with the composer expanded.
  const [composerTarget, setComposerTarget] = React.useState<CommunityOverview | null>(null);
  const composerReady = React.useRef(false);
  const [items, setItems] = React.useState<FeedItem[]>([]);
  const [page, setPage] = React.useState(1);
  const [typeFilter, setTypeFilter] = React.useState('all');
  const [state, setState] = React.useState<'loading' | 'error' | 'ready'>('loading');
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const initialLoaded = React.useRef(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [discover, setDiscover] = React.useState<Awaited<ReturnType<typeof getDiscover>> | null>(null);
  const [myCommunities, setMyCommunities] = React.useState<CommunityOverview[]>([]);

  const loadFeed = React.useCallback(async (p: number, replace: boolean, type: string) => {
    // First load gets skeletons; filter switches just dim the existing list —
    // blanking to skeletons on every chip tap read as "slow".
    const firstLoad = replace && !initialLoaded.current;
    if (firstLoad) setState('loading');
    else if (replace) setRefreshing(true);
    try {
      const res = await getFeed({ page: p, type });
      setItems((prev) => (replace ? res.items : [...prev, ...res.items]));
      setPage(p);
      setState('ready');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not load your feed.');
      if (firstLoad) setState('error');
    } finally {
      initialLoaded.current = true;
      setLoadingMore(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    void loadFeed(1, true, typeFilter);
  }, [loadFeed, typeFilter]);

  // Discover rail + my communities — ONE call each, in parallel.
  React.useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const [d, mine] = await Promise.all([
          getDiscover(),
          getMyCommunities().catch(() => ({ communities: [] as MyCommunity[] })),
        ]);
        if (!alive) return;
        setDiscover(d);

        const overviews: CommunityOverview[] = [];
        for (const c of mine.communities.slice(0, 5)) {
          overviews.push({
            id: c.id,
            name: c.name,
            description: null,
            memberCount: c.memberCount,
            course: c.course
              ? {
                  id: c.course.id,
                  title: c.course.title,
                  slug: '',
                  thumbnailUrl: c.course.thumbnailUrl,
                  instructorId: c.course.instructorId,
                  instructor: null,
                }
              : null,
            stats: { totalPosts: c.totalPosts, totalMembers: c.memberCount },
            myMembership: { role: c.isModerator ? 'ADMIN' : 'MEMBER', joinedAt: null },
            isModerator: c.isModerator,
            membersPreview: [],
          });
        }
        setMyCommunities(overviews);
        if (!composerReady.current) {
          composerReady.current = true;
          setComposerTarget(overviews[0] ?? null);
        }
      } catch {
        /* rail is optional */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const totalLoaded = items.length;

  return (
    <div className={styles.page}>
      {/* Mobile quick-switcher — my communities as a horizontal chip scroller.
          Desktop hides this; the right rail carries the same list. */}
      {myCommunities.length > 0 && (
        <nav className={styles.mobileStrip} aria-label="My communities">
          {myCommunities.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/community/${c.course?.id ?? ''}`}
              className={styles.stripChip}
            >
              {c.course?.thumbnailUrl ? (
                <Image
                  src={c.course.thumbnailUrl}
                  alt=""
                  width={34}
                  height={34}
                  className={styles.stripThumb}
                />
              ) : (
                <span className={styles.stripThumbFallback}>{c.name.charAt(0)}</span>
              )}
              <span className={styles.stripName}>{c.name}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* ── Main column ───────────────────────────────────────────────────── */}
      <div className={styles.mainCol}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Your Feed</h1>
            <p className={styles.pageSub}>
              The best of your learning communities, picked for you
            </p>
          </div>
          {totalLoaded > 0 && (
            <span className={styles.liveChip}>
              <span className={styles.liveDot} />
              {totalLoaded} fresh {totalLoaded === 1 ? 'post' : 'posts'}
            </span>
          )}
        </header>

        {/* Composer-first trigger card (Facebook pattern) — routes into your
            most recent community with the composer pre-expanded. */}
        {composerTarget?.course?.id && (
          <button
            className={styles.composerCard}
            onClick={() => {
              const courseId = composerTarget.course?.id;
              if (courseId) router.push(`/dashboard/community/${courseId}?compose=1`);
            }}
          >
            <Avatar size="md" name="You" />
            <span className={styles.composerPlaceholder}>
              What did you learn today?
            </span>
            <span className={styles.composerCta}>
              <PencilLine size={15} /> Post
            </span>
          </button>
        )}

        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterChip} ${typeFilter === f.value ? styles.filterActive : ''}`}
              onClick={() => setTypeFilter(f.value)}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {state === 'error' && (
          <div className={shared.errorBanner}>
            <AlertCircle size={28} />
            <span>{errorMsg}</span>
            <Button variant="outline" onClick={() => void loadFeed(1, true, typeFilter)}>
              Try again
            </Button>
          </div>
        )}

        {state === 'loading' && items.length === 0 && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}

        {state !== 'loading' && items.length === 0 && (
          <EmptyState
            icon={<TeyMascot size={96} />}
            title="Your feed is waiting to come alive"
            description={pickFeedEmptyLine()}
            action={
              <Button variant="primary" onClick={() => (window.location.href = '/dashboard/explore')}>
                Explore courses
              </Button>
            }
          />
        )}

        {items.length > 0 && (
          <div className={`${styles.feedList} ${refreshing ? styles.feedRefreshing : ''}`}>
            {items.map((item) => (
              <FeedRow key={`${item.community.id}-${item.post.id}`} item={item} />
            ))}

            {state === 'ready' && (
              <button
                className={styles.loadMoreBtn}
                disabled={loadingMore}
                onClick={() => void loadFeed(page + 1, false, typeFilter)}
              >
                {loadingMore ? 'Loading…' : 'Load more posts'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Right rail ────────────────────────────────────────────────────── */}
      <aside className={styles.rail}>
        {myCommunities.length > 0 && (
          <div className={styles.railCard}>
            <h3 className={styles.railTitle}>
              <Users size={13} /> My communities
            </h3>
            <div className={styles.communitiesList}>
              {myCommunities.map((c) => (
                <Link
                  key={c.id}
                  href={`/dashboard/community/${c.course?.id ?? ''}`}
                  className={styles.railItem}
                >
                  {c.course?.thumbnailUrl ? (
                    <Image
                      src={c.course.thumbnailUrl}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.railThumb}
                    />
                  ) : (
                    <span className={styles.railThumbFallback}>{c.name.charAt(0)}</span>
                  )}
                  <div className={styles.railItemMain}>
                    <div className={styles.railItemTitle}>{c.name}</div>
                    <div className={styles.railItemSub}>
                      {c.stats.totalMembers} {c.stats.totalMembers === 1 ? 'member' : 'members'}
                    </div>
                  </div>
                  <ChevronRight size={15} className={styles.railChevron} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {discover && discover.continueLearning.length > 0 && (
          <div className={styles.railCard}>
            <h3 className={styles.railTitle}>
              <TrendingUp size={13} /> Continue learning
            </h3>
            {discover.continueLearning.map((card) => (
              <Link
                key={card.courseId}
                href={`/learn/${card.courseId}`}
                className={styles.railItem}
              >
                {card.thumbnailUrl ? (
                  <Image
                    src={card.thumbnailUrl}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.railThumb}
                  />
                ) : (
                  <span className={styles.railThumbFallback}>
                    <BookOpen size={16} />
                  </span>
                )}
                <div className={styles.railItemMain}>
                  <div className={styles.railItemTitle}>{card.courseTitle}</div>
                  <div className={styles.progressRow}>
                    <div className={styles.progressTrack}>
                      <div className={styles.progressFill} style={{ width: `${card.progressPct}%` }} />
                    </div>
                    <span className={styles.progressPct}>{card.progressPct}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {discover && discover.questions.length > 0 && (
          <div className={styles.railCard}>
            <h3 className={styles.railTitle}>
              <HelpCircle size={13} /> Help your community
            </h3>
            {discover.questions.map((q) => (
              <Link
                key={q.postId}
                href={
                  q.courseId
                    ? `/dashboard/community/${q.courseId}/p/${q.postId}`
                    : '/dashboard/feed'
                }
                className={styles.railItem}
              >
                <span className={`${styles.railIconTile} ${styles.tileBlue}`}>
                  <HelpCircle size={16} />
                </span>
                <div className={styles.railItemMain}>
                  <div className={styles.railItemTitle}>{q.title}</div>
                  <div className={styles.railItemSub}>{q.communityName}</div>
                </div>
                <span className={styles.answerPill}>Answer</span>
              </Link>
            ))}
          </div>
        )}

        {discover?.activeDiscussion && (
          <div className={styles.railCard}>
            <h3 className={styles.railTitle}>
              <Flame size={13} /> Active discussion
            </h3>
            <Link
              href={
                discover.activeDiscussion.courseId
                  ? `/dashboard/community/${discover.activeDiscussion.courseId}/p/${discover.activeDiscussion.postId}`
                  : '/dashboard/feed'
              }
              className={styles.railItem}
            >
              <span className={`${styles.railIconTile} ${styles.tileFlame}`}>
                <Flame size={16} />
              </span>
              <div className={styles.railItemMain}>
                <div className={styles.railItemTitle}>{discover.activeDiscussion.title}</div>
                <div className={styles.railItemSub}>
                  {discover.activeDiscussion.commentCount} replies ·{' '}
                  {discover.activeDiscussion.likeCount} likes
                </div>
              </div>
              <ChevronRight size={15} className={styles.railChevron} />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}

/**
 * One feed row: the reason this post surfaced, then the SAME card the
 * community renders. The feed used to carry a second, hand-rolled card that
 * drifted from PostCard on every change — likes behaved differently, the
 * commenter facepile was missing, and the two surfaces stopped looking
 * related.
 */
function FeedRow({ item }: { item: FeedItem }) {
  const reason = REASON_STYLES[item.reasonKind] ?? REASON_STYLES.general;
  const href = item.community.courseId
    ? `/dashboard/community/${item.community.courseId}/p/${item.post.id}`
    : '/dashboard/feed';

  return (
    <div className={styles.feedRow}>
      <span className={`${styles.reasonTab} ${reason.tint}`}>
        {reason.icon} {item.reason}
      </span>
      <PostCard
        post={item.post}
        detailHref={href}
        origin={{
          name: item.community.name,
          courseId: item.community.courseId,
          courseThumbnailUrl: item.community.courseThumbnailUrl,
        }}
      />
    </div>
  );
}
