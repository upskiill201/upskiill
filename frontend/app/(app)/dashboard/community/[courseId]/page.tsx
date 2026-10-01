'use client';

/**
 * A course community — Skool's group, Duolingo's feel.
 *
 *   group header (cover · name · privacy · members · posts · facepile ·
 *   Invite · Classroom)
 *   tabs: Community · Classroom · Members · Leaderboards
 *   Community: composer, category chips (same icons/colours as the posts),
 *   sort, the feed; right rail: About + 30-day leaderboard
 *
 * Fast: the first paint is one bootstrap request, cached by SWR (and the
 * persisted SWR cache), so coming back to a community paints instantly and
 * refreshes quietly. Every tap has a sound.
 */

import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { useParams, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle, BookOpen, Check, GraduationCap, Hash, Lock, MessagesSquare, PanelRight,
  Trophy, UserPlus, Users, X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import PostCard, { PostCardSkeleton, TYPE_ICON } from '@/components/community/PostCard';
import PostComposer from '@/components/community/PostComposer';
import CommunityRail, { formatCount } from '@/components/community/CommunityRail';
import LeaderboardPanel, { leaderboardsKey } from '@/components/community/LeaderboardPanel';
import Avatar from '@/components/ui/Avatar';
import MemberAvatar from '@/components/community/MemberAvatar';
import ProfileLink from '@/components/community/ProfileLink';
import PostTypeArt from '@/components/community/PostTypeArt';
import CommunityLocked, { communityLockFrom } from '@/components/community/CommunityLocked';
import TeyMascot from '@/components/community/TeyMascot';
import { getCachedUser } from '@/lib/user-cache';
import { setHomeCourse } from '@/lib/homeCourse';
import { fetcher } from '@/lib/swr';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { setFollowing } from '@/lib/social';
import shared from '@/components/community/community.module.css';
import { pickCommunityPostsEmptyLine } from '@/lib/tey/emptyStateVoice';
import styles from './CommunityPage.module.css';
import {
  getCommunityPosts,
  getMembers,
  type CommunityBootstrap,
  type CommunityOverview,
  type CommunityPost,
  type LeaderboardBundle,
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
    <div className={styles.page} aria-busy="true" aria-label="Loading community">
      <div className={`${styles.hero} ${styles.heroSkeleton}`} />
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

  // One request for the first paint (identity, first page of posts, the
  // rail's board), cached — revisits paint from cache and revalidate.
  const bootstrapKey = `/api/community/course/${courseId}/bootstrap?sort=new${lessonParam ? `&lessonId=${encodeURIComponent(lessonParam)}` : ''}`;
  const boot = useSWR<CommunityBootstrap>(bootstrapKey, fetcher, { revalidateOnFocus: false, dedupingInterval: 20_000 });
  const community = boot.data?.community ?? null;

  const [tab, setTab] = React.useState<Tab>('feed');
  const [typeFilter, setTypeFilter] = React.useState('');
  const [sort, setSort] = React.useState<'new' | 'top' | 'unanswered'>('new');
  // Posts for a non-default view (a chip, a sort, a later page). Null means
  // "show the bootstrap's first page".
  const [override, setOverride] = React.useState<{ posts: CommunityPost[]; total: number; page: number } | null>(null);
  const [removed, setRemoved] = React.useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [railOpen, setRailOpen] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  const me = React.useMemo(() => getCachedUser(), []);

  const base = boot.data?.posts;
  const view = override ?? (base ? { posts: base.posts, total: base.total, page: base.page } : null);
  const posts = (view?.posts ?? []).filter((p) => !removed.has(p.id));
  const total = Math.max(0, (view?.total ?? 0) - removed.size);

  const showToast = React.useCallback((text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const loadPosts = React.useCallback(
    async (opts: { page: number; replace: boolean; sort: typeof sort; type: string }) => {
      if (!community) return;
      if (opts.replace) setRefreshing(true);
      else setLoadingMore(true);
      try {
        const res = await getCommunityPosts(community.id, {
          sort: opts.sort,
          type: opts.type || undefined,
          lessonId: lessonParam ?? undefined,
          page: opts.page,
        });
        setOverride((prev) => ({
          posts: opts.replace ? res.posts : [...(prev?.posts ?? view?.posts ?? []), ...res.posts],
          total: res.total,
          page: opts.page,
        }));
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Could not load posts.');
        playSound('nodeLocked');
      } finally {
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [community, lessonParam, showToast, view?.posts],
  );

  const pickType = (value: string, index: number) => {
    if (value === typeFilter) return;
    playSound('navTap', index);
    playHaptic('selection', false);
    setTypeFilter(value);
    if (!value && sort === 'new') setOverride(null);
    else void loadPosts({ page: 1, replace: true, sort, type: value });
  };

  const pickSort = (value: typeof sort) => {
    playSound('navTap', 2);
    setSort(value);
    if (value === 'new' && !typeFilter) setOverride(null);
    else void loadPosts({ page: 1, replace: true, sort: value, type: typeFilter });
  };

  const pickTab = (t: Tab, i: number) => {
    playSound('navTap', i);
    playHaptic('selection', false);
    setTab(t);
  };

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
    playSound('navTap', 3);
    setTab('leaderboards');
    setRailOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleted = React.useCallback((id: string) => {
    setRemoved((prev) => new Set(prev).add(id));
  }, []);

  // Not seated yet — two lessons earn the seat. Show how close, not a wall.
  const lock = boot.error && !boot.data ? communityLockFrom(boot.error) : null;
  if (lock) {
    return (
      <div className={styles.page}>
        <CommunityLocked lock={lock} />
      </div>
    );
  }

  if (boot.error && !boot.data) {
    return (
      <div className={styles.page}>
        <div className={shared.errorBanner}>
          <AlertCircle size={28} />
          <span>{boot.error instanceof Error ? boot.error.message : 'Could not load this community.'}</span>
          <Button variant="outline" onClick={() => void boot.mutate()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (!community) return <PageSkeleton />;

  return (
    <div className={styles.page}>
      <CommunityHero
        community={community}
        onInfo={() => setRailOpen(true)}
        onToast={showToast}
        onLevel={openLeaderboards}
      />

      <nav className={styles.tabs} aria-label="Community sections">
        <button className={`${styles.tabBtn} ${tab === 'feed' ? styles.tabActive : ''}`} onClick={() => pickTab('feed', 0)}>
          <MessagesSquare size={18} strokeWidth={2.5} aria-hidden="true" /> Community
        </button>
        {community.course && (
          <Link
            href="/dashboard"
            className={styles.tabBtn}
            onClick={() => {
              // Classroom = this course's lesson path on home (Duolingo's
              // path), not the old course overview.
              playSound('navTap', 1);
              if (community.course) setHomeCourse(community.course.id);
            }}
          >
            <GraduationCap size={18} strokeWidth={2.5} aria-hidden="true" /> Classroom
          </Link>
        )}
        <button className={`${styles.tabBtn} ${tab === 'members' ? styles.tabActive : ''}`} onClick={() => pickTab('members', 2)}>
          <Users size={18} strokeWidth={2.5} aria-hidden="true" /> Members
        </button>
        <button
          className={`${styles.tabBtn} ${tab === 'leaderboards' ? styles.tabActive : ''}`}
          onClick={() => pickTab('leaderboards', 3)}
        >
          <Trophy size={18} strokeWidth={2.5} aria-hidden="true" /> Leaderboards
        </button>
      </nav>

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          {tab === 'feed' && (
            <>
              {lessonParam && (
                <div className={styles.lessonFilter}>
                  <span className={styles.lessonFilterText}>
                    <BookOpen size={16} strokeWidth={2.5} />
                    Discussions for: {lessonTitleParam || (posts[0]?.lesson?.title ?? 'this lesson')}
                  </span>
                  <Link href={`/dashboard/community/${courseId}`} className={styles.clearFilterBtn}>
                    Show all
                  </Link>
                </div>
              )}

              <PostComposer
                key={lessonParam ?? 'all'}
                community={community}
                defaultOpen={composerDefaultOpen}
                lessonLink={lessonParam ? { id: lessonParam, title: lessonTitleParam ?? 'this lesson' } : null}
                onPosted={() => {
                  playSound('post');
                  setTypeFilter('');
                  setSort('new');
                  setOverride(null);
                  setRemoved(new Set());
                  void boot.mutate();
                }}
              />

              <div className={styles.controls}>
                <div className={styles.chipRow} role="tablist" aria-label="Categories">
                  {TYPE_FILTERS.map((f, i) => {
                    const Icon = f.value ? TYPE_ICON[f.value] ?? Hash : null;
                    return (
                      <button
                        key={f.value}
                        role="tab"
                        aria-selected={typeFilter === f.value}
                        className={`${styles.filterChip} ${typeFilter === f.value ? styles.filterChipActive : ''}`}
                        onClick={() => pickType(f.value, i)}
                      >
                        {Icon && f.value && <PostTypeArt postType={f.value} size={20} fallback={Icon} />}
                        {f.label}
                      </button>
                    );
                  })}
                </div>
                {!lessonParam && (
                  <select
                    className={styles.sortSelect}
                    value={sort}
                    onChange={(e) => pickSort(e.target.value as typeof sort)}
                    aria-label="Sort posts"
                  >
                    <option value="new">Latest</option>
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
                      onCategoryClick={(t) => pickType(t, 1)}
                    />
                  ))}

                  {posts.length < total && (
                    <button
                      className={styles.loadMoreBtn}
                      disabled={loadingMore}
                      onClick={() => {
                        playSound('navTap', 4);
                        void loadPosts({ page: (view?.page ?? 1) + 1, replace: false, sort, type: typeFilter });
                      }}
                    >
                      {loadingMore ? 'Loading…' : 'Load more posts'}
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {tab === 'members' && <MembersPanel communityId={community.id} currentUserId={me?.id} />}

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
            leaderboard={boot.data?.leaderboard}
            currentUserId={me?.id}
            onSeeLeaderboards={openLeaderboards}
          />
        </aside>
      </div>

      {/* ── Mobile rail drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {railOpen && (
          <>
            <motion.button
              className={styles.scrim}
              aria-label="Close community info"
              onClick={() => {
                playSound('menuClose');
                setRailOpen(false);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className={styles.drawer}
              role="dialog"
              aria-label="Community info"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            >
              <div className={styles.drawerHead}>
                <span className={styles.drawerTitle}>About & leaderboard</span>
                <button
                  className={styles.drawerClose}
                  onClick={() => {
                    playSound('menuClose');
                    setRailOpen(false);
                  }}
                  aria-label="Close"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
              <div className={styles.drawerRail}>
                <CommunityRail
                  community={community}
                  leaderboard={boot.data?.leaderboard}
                  currentUserId={me?.id}
                  onSeeLeaderboards={openLeaderboards}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles.toast}
            role="status"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Skool's group header: cover, name, who's here, and the two actions. */
/** The illustrated cover's floating tiles: [post type, left %, top %, size, tilt]. */
const COVER_TILES: [string, number, number, number, number][] = [
  ['QUESTION', 6, 22, 56, -12],
  ['WIN', 19, 58, 64, 8],
  ['TIP', 33, 14, 48, 10],
  ['DISCUSSION', 62, 16, 52, -8],
  ['POLL', 76, 54, 60, 12],
  ['CHALLENGE', 89, 18, 50, -6],
  ['RESOURCE', 47, 62, 44, -10],
];

function CommunityHero({
  community,
  onInfo,
  onToast,
  onLevel,
}: {
  community: CommunityOverview;
  onInfo: () => void;
  onToast: (text: string) => void;
  onLevel: () => void;
}) {
  const thumb = community.course?.thumbnailUrl;
  const instructor = community.course?.instructor ?? null;
  const { data: referral } = useSWR<{ code: string }>('/api/referrals/me', fetcher, { revalidateOnFocus: false });
  // Same key the Leaderboards tab reads — one request serves both.
  const { data: boards } = useSWR<LeaderboardBundle>(leaderboardsKey(community.id), fetcher, { revalidateOnFocus: false });
  const level = boards?.me ?? null;
  const [copied, setCopied] = React.useState(false);
  const extra = Math.max(0, community.stats.totalMembers - community.membersPreview.length);

  const invite = async () => {
    playHaptic('light', false);
    const link = `${window.location.origin}/signup${referral?.code ? `?ref=${referral.code}` : ''}`;
    const text = `Join me in the ${community.name} community on Teyro: ${link}`;
    if (navigator.share) {
      playSound('menuOpen');
      try {
        await navigator.share({ title: community.name, text, url: link });
      } catch {
        // Cancelled.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      playSound('toggleOn');
      onToast('Invite link copied');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      playSound('nodeLocked');
    }
  };

  return (
    <section className={styles.hero} aria-label={community.name}>
      <div className={`${styles.cover} ${thumb ? '' : styles.coverDrawn}`}>
        {thumb ? (
          <Image src={thumb} alt="" fill sizes="(max-width: 768px) 100vw, 1100px" className={styles.coverImg} priority />
        ) : (
          <>
            {COVER_TILES.map(([type, left, top, size, tilt]) => (
              <span
                key={type}
                className={styles.coverTile}
                style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, transform: `rotate(${tilt}deg)` }}
                aria-hidden="true"
              >
                <PostTypeArt postType={type} size={size} />
              </span>
            ))}
            <Image src="/art/ui/community.svg" alt="" width={120} height={120} className={styles.coverArt} priority />
          </>
        )}
      </div>

      <div className={styles.heroBody}>
        <div className={styles.groupMark}>
          {thumb ? (
            <Image src={thumb} alt="" width={80} height={80} className={styles.groupMarkImg} />
          ) : (
            <span className={styles.groupMarkLetter}>{community.name.charAt(0).toUpperCase()}</span>
          )}
        </div>

        <div className={styles.heroText}>
          <h1 className={styles.communityName}>{community.name}</h1>
          {community.description && <p className={styles.heroDesc}>{community.description}</p>}
          <div className={styles.heroMeta}>
            <span>
              <Lock size={14} strokeWidth={2.5} aria-hidden="true" /> Private
            </span>
            <span>
              <Users size={14} strokeWidth={2.5} aria-hidden="true" /> <b>{formatCount(community.stats.totalMembers)}</b> members
            </span>
            <span>
              <MessagesSquare size={14} strokeWidth={2.5} aria-hidden="true" /> <b>{formatCount(community.stats.totalPosts)}</b> posts
            </span>
            {instructor && (
              <span className={styles.heroHost}>
                <ProfileLink userId={instructor.id} label={`${instructor.fullName}'s profile`}>
                  <Avatar src={instructor.avatarUrl ?? undefined} name={instructor.fullName} size="xs" />
                </ProfileLink>
                Run by <ProfileLink userId={instructor.id}><b>{instructor.fullName}</b></ProfileLink>
              </span>
            )}
          </div>
          <div className={styles.heroFoot}>
            {community.membersPreview.length > 0 && (
              <div className={styles.heroFaces}>
                {community.membersPreview.slice(0, 6).map((m) => (
                  <ProfileLink key={m.id} userId={m.id} label={`${m.fullName}'s profile`}>
                    <MemberAvatar name={m.fullName} src={m.avatarUrl} size="sm" plain />
                  </ProfileLink>
                ))}
                {extra > 0 && <span className={styles.heroFacesMore}>+{formatCount(extra)} learning together</span>}
              </div>
            )}
            {level && (
              <button type="button" className={styles.levelChip} onClick={onLevel} aria-label={`Your level: ${level.level}, ${level.levelName}. Open leaderboards`}>
                <span className={styles.levelChipNum}>{level.level}</span>
                <span className={styles.levelChipText}>
                  <span className={styles.levelChipName}>{level.levelName}</span>
                  <span className={styles.levelChipTrack}>
                    <span className={styles.levelChipFill} style={{ width: `${Math.round(level.levelProgress * 100)}%` }} />
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className={styles.heroActions}>
          <button type="button" className={styles.inviteBtn} onClick={() => void invite()}>
            {copied ? <Check size={18} strokeWidth={3} /> : <UserPlus size={18} strokeWidth={2.75} />}
            {copied ? 'Copied' : 'Invite'}
          </button>
          <button type="button" className={styles.infoBtn} onClick={() => { playSound('menuOpen'); onInfo(); }} aria-label="About and leaderboard">
            <PanelRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

interface Member {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  isCreator: boolean;
  streakDays: number;
  xp: number;
  level?: number;
  isFollowing?: boolean;
}

/** Members tab — the roster, with levels and a follow button (Skool's members page). */
function MembersPanel({ communityId, currentUserId }: { communityId: string; currentUserId?: string }) {
  const [pages, setPages] = React.useState(1);
  const first = useSWR<{ total: number; members: Member[] }>(`/api/community/${communityId}/members?page=1&q=`, fetcher);
  const [more, setMore] = React.useState<Member[]>([]);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [following, setFollowingIds] = React.useState<Record<string, boolean>>({});

  const members = [...(first.data?.members ?? []), ...more];
  const total = first.data?.total ?? 0;

  const loadMore = async () => {
    setLoadingMore(true);
    playSound('navTap', 4);
    try {
      const res = await getMembers(communityId, '', pages + 1);
      setMore((m) => [...m, ...res.members]);
      setPages((p) => p + 1);
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleFollow = async (m: Member) => {
    const next = !(following[m.id] ?? m.isFollowing ?? false);
    setFollowingIds((f) => ({ ...f, [m.id]: next }));
    playSound(next ? 'toggleOn' : 'toggleOff');
    playHaptic('light', false);
    try {
      await setFollowing(m.id, next);
    } catch {
      setFollowingIds((f) => ({ ...f, [m.id]: !next }));
      playSound('nodeLocked');
    }
  };

  if (first.error && !first.data) {
    return (
      <div className={shared.errorBanner}>
        Could not load members.
        <Button variant="outline" onClick={() => void first.mutate()}>
          Try again
        </Button>
      </div>
    );
  }

  if (!first.data) {
    return (
      <div className={styles.membersPanel} aria-busy="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={styles.memberCard}>
            <div className={shared.skeletonAvatar} style={{ width: 48, height: 48 }} />
            <div className={shared.skeletonLine} style={{ flex: 1 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={styles.membersPanel}>
        {members.map((m) => {
          const isMe = m.id === currentUserId;
          const isFollowing = following[m.id] ?? m.isFollowing ?? false;
          return (
            <div key={m.id} className={styles.memberCard}>
              <ProfileLink userId={m.id} label={`${m.fullName}'s profile`}>
                <MemberAvatar userId={m.id} name={m.fullName} src={m.avatarUrl} level={m.level} size="md" />
              </ProfileLink>
              <div className={styles.memberInfo}>
                <div className={styles.memberName}>
                  <ProfileLink userId={m.id}>{m.fullName}</ProfileLink>
                  {m.isCreator && <span className={styles.creatorTag}>Creator</span>}
                </div>
                <div className={styles.memberMeta}>
                  {m.streakDays > 0 && (
                    <span className={styles.memberStreak}>
                      <Image src="/Icons/burn.png" alt="" width={14} height={14} /> {m.streakDays}
                    </span>
                  )}
                  <span>{m.xp.toLocaleString()} XP</span>
                </div>
              </div>
              {!isMe && (
                <button
                  type="button"
                  className={isFollowing ? styles.followingBtn : styles.followBtn}
                  onClick={() => void toggleFollow(m)}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {members.length < total && (
        <button className={styles.loadMoreBtn} onClick={() => void loadMore()} disabled={loadingMore}>
          {loadingMore ? 'Loading…' : 'Show more'}
        </button>
      )}
    </>
  );
}
