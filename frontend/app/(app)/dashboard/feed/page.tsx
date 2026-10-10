'use client';

/**
 * Community home — your feed across every course community, Skool's
 * "all my groups" with Duolingo's friends.
 *
 *   main: composer trigger, filter chips, the feed (the SAME PostCard the
 *   communities render)
 *   rail: My communities · Friends (who you follow, their streaks, and
 *   classmates to follow) · Help your community · Continue learning
 *
 * Fast: every read is SWR-cached (and persisted), so returning here paints
 * instantly and refreshes quietly; only "load more" waits on the network.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import {
  Sparkles, HelpCircle, Trophy, Megaphone, LayoutGrid, BookOpen, Flame, AlertCircle,
  PencilLine, ChevronRight, Users, TrendingUp, UserPlus, Check,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import PostCard, { PostCardSkeleton } from '@/components/community/PostCard';
import TeyMascot from '@/components/community/TeyMascot';
import PostTypeArt from '@/components/community/PostTypeArt';
import shared from '@/components/community/community.module.css';
import { pickFeedEmptyLine } from '@/lib/tey/emptyStateVoice';
import { fetcher } from '@/lib/swr';
import { getCachedUser } from '@/lib/user-cache';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { setFollowing } from '@/lib/social';
import styles from './FeedPage.module.css';
import { getFeed, type DiscoverPayload, type FeedItem, type MyCommunity } from '@/lib/communityApi';
import { courseHomeHref } from '@/lib/homeCourse';

const FILTERS = [
  { value: 'all', label: 'All', icon: <LayoutGrid size={14} strokeWidth={2.75} /> },
  { value: 'question', label: 'Questions', icon: <PostTypeArt postType="QUESTION" size={20} /> },
  { value: 'win', label: 'Wins', icon: <PostTypeArt postType="WIN" size={20} /> },
  { value: 'announcement', label: 'Announcements', icon: <PostTypeArt postType="ANNOUNCEMENT" size={20} /> },
];

/** Icon + tint class per structured reason — the floating tab on each card. */
const REASON_STYLES: Record<string, { icon: React.ReactNode; tint: string }> = {
  announcement: { icon: <Megaphone size={12} strokeWidth={2.75} />, tint: styles.tabAnnouncement },
  unanswered: { icon: <HelpCircle size={12} strokeWidth={2.75} />, tint: styles.tabUnanswered },
  win: { icon: <Trophy size={12} strokeWidth={2.75} />, tint: styles.tabWin },
  active: { icon: <Flame size={12} strokeWidth={2.75} />, tint: styles.tabActive },
  course: { icon: <BookOpen size={12} strokeWidth={2.75} />, tint: styles.tabCourse },
  general: { icon: <Sparkles size={12} strokeWidth={2.75} />, tint: styles.tabGeneral },
};

interface Person {
  id: string;
  name: string;
  avatar: string | null;
  streak?: number;
  course?: string;
  isFollowing?: boolean;
}

const feedKey = (type: string) => `/api/feed?${type !== 'all' ? `type=${type}&` : ''}page=1`;

export default function FeedPage() {
  const router = useRouter();
  const [typeFilter, setTypeFilter] = React.useState('all');
  // Pages after the first, for the current filter.
  const [more, setMore] = React.useState<{ type: string; items: FeedItem[]; page: number }>({ type: 'all', items: [], page: 1 });
  const [loadingMore, setLoadingMore] = React.useState(false);

  const first = useSWR<{ items: FeedItem[] }>(feedKey(typeFilter), fetcher, { revalidateOnFocus: false, keepPreviousData: true });
  const mine = useSWR<{ communities: MyCommunity[] }>('/api/community/my', fetcher, { revalidateOnFocus: false });
  const discover = useSWR<DiscoverPayload>('/api/feed/discover', fetcher, { revalidateOnFocus: false });

  const extra = more.type === typeFilter ? more.items : [];
  const items = [...(first.data?.items ?? []), ...extra];
  const communities = mine.data?.communities ?? [];
  const composerCourse = communities.find((c) => c.course)?.course ?? null;
  const me = React.useMemo(() => getCachedUser(), []);

  const pickFilter = (value: string, i: number) => {
    if (value === typeFilter) return;
    playSound('navTap', i);
    playHaptic('selection', false);
    setTypeFilter(value);
  };

  const loadMore = async () => {
    setLoadingMore(true);
    playSound('navTap', 4);
    try {
      const next = (more.type === typeFilter ? more.page : 1) + 1;
      const res = await getFeed({ page: next, type: typeFilter });
      setMore((m) => ({ type: typeFilter, items: [...(m.type === typeFilter ? m.items : []), ...res.items], page: next }));
    } catch {
      playSound('nodeLocked');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Mobile quick-switcher — my communities as a chip scroller. */}
      {communities.length > 0 && (
        <nav className={styles.mobileStrip} aria-label="My communities">
          {communities.map((c) => (
            <Link
              key={c.id}
              href={`/dashboard/community/${c.course?.id ?? ''}`}
              className={styles.stripChip}
              onClick={() => playSound('navTap', 2)}
            >
              {c.course?.thumbnailUrl ? (
                <Image src={c.course.thumbnailUrl} alt="" width={34} height={34} className={styles.stripThumb} />
              ) : (
                <span className={styles.stripThumbFallback}>{c.name.charAt(0)}</span>
              )}
              <span className={styles.stripName}>{c.name}</span>
            </Link>
          ))}
        </nav>
      )}

      <div className={styles.mainCol}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Community</h1>
            <p className={styles.pageSub}>What your learning communities are talking about</p>
          </div>
        </header>

        {composerCourse && (
          <button
            className={styles.composerCard}
            onClick={() => {
              playSound('menuOpen');
              router.push(`/dashboard/community/${composerCourse.id}?compose=1`);
            }}
          >
            <Avatar size="md" name={me?.fullName ?? 'You'} src={me?.avatarUrl ?? undefined} />
            <span className={styles.composerPlaceholder}>What did you learn today?</span>
            <span className={styles.composerCta}>
              <PencilLine size={16} strokeWidth={2.75} /> Post
            </span>
          </button>
        )}

        <div className={styles.filterRow} role="tablist" aria-label="Filter the feed">
          {FILTERS.map((f, i) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={typeFilter === f.value}
              className={`${styles.filterChip} ${typeFilter === f.value ? styles.filterActive : ''}`}
              onClick={() => pickFilter(f.value, i)}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {first.error && !first.data ? (
          <div className={shared.errorBanner}>
            <AlertCircle size={28} />
            <span>{first.error instanceof Error ? first.error.message : 'Could not load your feed.'}</span>
            <Button variant="outline" onClick={() => void first.mutate()}>
              Try again
            </Button>
          </div>
        ) : !first.data ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : items.length === 0 ? (
          <EmptyState
            icon={<TeyMascot size={96} />}
            title="Your feed is waiting to come alive"
            description={pickFeedEmptyLine()}
            action={
              <Button variant="primary" onClick={() => router.push('/dashboard/explore')}>
                Explore courses
              </Button>
            }
          />
        ) : (
          <div className={`${styles.feedList} ${first.isValidating && first.data ? styles.feedRefreshing : ''}`}>
            {items.map((item) => (
              <FeedRow key={`${item.community.id}-${item.post.id}`} item={item} />
            ))}
            <button className={styles.loadMoreBtn} disabled={loadingMore} onClick={() => void loadMore()}>
              {loadingMore ? 'Loading…' : 'Load more posts'}
            </button>
          </div>
        )}
      </div>

      {/* ── Right rail ── */}
      <aside className={styles.rail}>
        {communities.length > 0 && (
          <div className={styles.railCard}>
            <h3 className={styles.railTitle}>
              <Users size={14} strokeWidth={2.75} /> My communities
            </h3>
            <div className={styles.communitiesList}>
              {communities.slice(0, 6).map((c) => (
                <Link
                  key={c.id}
                  href={`/dashboard/community/${c.course?.id ?? ''}`}
                  className={styles.railItem}
                  onClick={() => playSound('navTap', 2)}
                >
                  {c.course?.thumbnailUrl ? (
                    <Image src={c.course.thumbnailUrl} alt="" width={40} height={40} className={styles.railThumb} />
                  ) : (
                    <span className={styles.railThumbFallback}>{c.name.charAt(0)}</span>
                  )}
                  <div className={styles.railItemMain}>
                    <div className={styles.railItemTitle}>{c.name}</div>
                    <div className={styles.railItemSub}>
                      {c.memberCount} {c.memberCount === 1 ? 'member' : 'members'} · {c.totalPosts} posts
                    </div>
                  </div>
                  <ChevronRight size={16} className={styles.railChevron} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <FriendsCard />

        {discover.data && discover.data.questions.length > 0 && (
          <div className={styles.railCard}>
            <h3 className={styles.railTitle}>
              <HelpCircle size={14} strokeWidth={2.75} /> Help your community
            </h3>
            {discover.data.questions.map((q) => (
              <Link
                key={q.postId}
                href={q.courseId ? `/dashboard/community/${q.courseId}/p/${q.postId}` : '/dashboard/feed'}
                className={styles.railItem}
                onClick={() => playSound('navTap', 3)}
              >
                <span className={`${styles.railIconTile} ${styles.tileBlue}`}>
                  <HelpCircle size={18} strokeWidth={2.5} />
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

        {discover.data && discover.data.continueLearning.length > 0 && (
          <div className={styles.railCard}>
            <h3 className={styles.railTitle}>
              <TrendingUp size={14} strokeWidth={2.75} /> Continue learning
            </h3>
            {discover.data.continueLearning.map((card) => (
              <Link
                key={card.courseId}
                href={courseHomeHref(card.courseId)}
                className={styles.railItem}
                onClick={() => playSound('start')}
              >
                {card.thumbnailUrl ? (
                  <Image src={card.thumbnailUrl} alt="" width={40} height={40} className={styles.railThumb} />
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
      </aside>
    </div>
  );
}

/**
 * Friends, Duolingo's way: who you follow and their streaks (the nudge to keep
 * yours), and classmates you could follow. Real data from /api/social/*.
 */
function FriendsCard() {
  const following = useSWR<Person[]>('/api/social/following', fetcher, { revalidateOnFocus: false });
  const classmates = useSWR<Person[]>('/api/social/classmates', fetcher, { revalidateOnFocus: false });
  const [followed, setFollowed] = React.useState<Record<string, boolean>>({});

  const friends = Array.isArray(following.data) ? [...following.data].sort((a, b) => (b.streak ?? 0) - (a.streak ?? 0)) : [];
  const suggestions = (Array.isArray(classmates.data) ? classmates.data : []).filter((p) => !p.isFollowing).slice(0, 3);

  const follow = async (p: Person) => {
    setFollowed((f) => ({ ...f, [p.id]: true }));
    playSound('toggleOn');
    playHaptic('light', false);
    try {
      await setFollowing(p.id, true);
    } catch {
      setFollowed((f) => ({ ...f, [p.id]: false }));
      playSound('nodeLocked');
    }
  };

  if (!following.data && !classmates.data) return null;
  if (friends.length === 0 && suggestions.length === 0) return null;

  return (
    <div className={styles.railCard}>
      <h3 className={styles.railTitle}>
        <Flame size={14} strokeWidth={2.75} /> Friends
      </h3>
      {friends.slice(0, 5).map((f) => (
        <Link key={f.id} href={`/dashboard/u/${encodeURIComponent(f.id)}`} className={styles.friendRow} onClick={() => playSound('navTap', 1)}>
          <Avatar src={f.avatar ?? undefined} name={f.name} size="sm" />
          <span className={styles.friendName}>{f.name}</span>
          <span className={`${styles.friendStreak} ${(f.streak ?? 0) > 0 ? '' : styles.friendStreakOut}`}>
            <Image src="/Icons/burn.png" alt="" width={16} height={16} /> {f.streak ?? 0}
          </span>
        </Link>
      ))}
      {suggestions.length > 0 && (
        <>
          <p className={styles.suggestLabel}>People in your courses</p>
          {suggestions.map((p) => (
            <div key={p.id} className={styles.friendRow}>
              <Avatar src={p.avatar ?? undefined} name={p.name} size="sm" />
              <span className={styles.friendName}>
                {p.name}
                {p.course && <span className={styles.friendCourse}>{p.course}</span>}
              </span>
              <button
                type="button"
                className={followed[p.id] ? styles.followedBtn : styles.followSmall}
                onClick={() => !followed[p.id] && void follow(p)}
                aria-label={followed[p.id] ? `Following ${p.name}` : `Follow ${p.name}`}
              >
                {followed[p.id] ? <Check size={16} strokeWidth={3} /> : <UserPlus size={16} strokeWidth={2.75} />}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/**
 * One feed row: the reason this post surfaced, then the SAME card the
 * community renders.
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
