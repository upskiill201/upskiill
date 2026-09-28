'use client';

/**
 * /creator/community — the creator runs each course community from here, as
 * its admin (Skool's admin view, Duolingo's look):
 *
 *   Post        announcements and challenges straight to members
 *   To answer   learners' questions still waiting for the creator's reply
 *   Recent · Pinned · Announcements   pin, lock, remove, reply
 *   Members     levels and streaks; mute someone for a day, a week, a month
 *   About       the community's description
 */

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR, { useSWRConfig } from 'swr';
import {
  Flame,
  Lock,
  LockOpen,
  Megaphone,
  MessageCircle,
  MessageCircleQuestion,
  Pin,
  PinOff,
  Search,
  Send,
  Trash2,
  Trophy,
  Users,
  VolumeX,
} from 'lucide-react';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import { ago, studioFetch, studioKeys, studioSend } from '@/lib/creator/studio';
import { CourseSwitcher, useStudioCourse } from '../CourseSwitcher';
import {
  EmptyCard,
  ErrorCard,
  PageHead,
  PersonAvatar,
  Pill,
  Sheet,
  Skel,
  StatTile,
  studio as s,
  useToast,
} from '../StudioParts';
import { PostSheet } from './PostSheet';
import {
  POST_ART,
  POST_TYPE_LABEL,
  type ManagedCommunity,
  type Member,
  type MembersPayload,
  type QueuePayload,
  type QueuePost,
} from './types';

type Tab = 'questions' | 'recent' | 'pinned' | 'announcements' | 'members' | 'about';
const TABS: { id: Tab; label: string }[] = [
  { id: 'questions', label: 'To answer' },
  { id: 'recent', label: 'Recent' },
  { id: 'pinned', label: 'Pinned' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'members', label: 'Members' },
  { id: 'about', label: 'About' },
];

export function CommunityAdmin() {
  useStandaloneSound();
  const params = useSearchParams();
  const { mutate: globalMutate } = useSWRConfig();
  const { courses: allCourses, course, setCourse, loading, error, reload } = useStudioCourse({ publishedOnly: true });
  const managed = useSWR<ManagedCommunity[]>(studioKeys.communities, studioFetch);
  const [tab, setTab] = useState<Tab>('questions');
  // ?post= (from a lesson's questions) opens that post straight away.
  const [openPost, setOpenPost] = useState<string | null>(() => params.get('post'));
  const [composer, setComposer] = useState(false);
  const toast = useToast();

  const community = managed.data?.find((c) => c.course.id === course?.id) ?? null;
  const courses = allCourses.filter((c) => managed.data?.some((m) => m.course.id === c.id) ?? true);

  const refreshAll = () => {
    void managed.mutate();
    void globalMutate(studioKeys.badges);
    void globalMutate((key) => typeof key === 'string' && key.includes('/manage/'));
  };

  if (error || managed.error) {
    return (
      <div className={s.page}>
        <PageHead title="Community" />
        <ErrorCard
          message="Your communities didn’t load."
          onRetry={() => {
            void reload();
            void managed.mutate();
          }}
        />
      </div>
    );
  }
  if (loading || !managed.data) {
    return (
      <div className={s.page} aria-busy="true">
        <Skel h={56} w="50%" />
        <div className={s.stats}>
          {[0, 1, 2, 3].map((i) => (
            <Skel key={i} h={112} r={18} />
          ))}
        </div>
        <Skel h={320} />
      </div>
    );
  }
  if (!course || !community) {
    return (
      <div className={s.page}>
        <PageHead title="Community" />
        <EmptyCard pose="waving" title="Your community opens when a course goes live">
          Every live course gets its own community. Learners join after their second lesson, and you’re its admin.
        </EmptyCard>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <PageHead
        title="Community"
        sub={`You’re the admin of ${community.name}. Learners see your posts and replies with a CREATOR badge.`}
        actions={
          <>
            <CourseSwitcher courses={courses} course={course} onPick={setCourse} />
            <button
              type="button"
              className={s.btnPrimary}
              onClick={() => {
                setComposer(true);
                playSound('start');
              }}
            >
              <Megaphone size={16} aria-hidden="true" /> Post
            </button>
          </>
        }
      />

      <div className={s.stats}>
        <StatTile icon={<Users size={18} />} label="Members" value={community.members} onClick={() => setTab('members')} />
        <StatTile
          icon={<MessageCircle size={18} />}
          tone="var(--success-green)"
          label="Posts this week"
          value={community.postsThisWeek}
          onClick={() => setTab('recent')}
        />
        <StatTile
          icon={<MessageCircleQuestion size={18} />}
          tone={community.unanswered > 0 ? 'var(--error-red)' : 'var(--success-green)'}
          label="Waiting for you"
          value={community.unanswered}
          foot={community.unanswered > 0 ? 'Questions without your answer' : 'All answered'}
          onClick={() => setTab('questions')}
        />
        <StatTile
          icon={<VolumeX size={18} />}
          tone="var(--text-muted)"
          label="Muted"
          value={community.muted}
          foot="Can read, can’t post"
          onClick={() => setTab('members')}
        />
      </div>

      <nav className={s.chips} aria-label="Community sections">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className={`${s.chip} ${tab === t.id ? s.chipOn : ''}`}
            aria-current={tab === t.id ? 'page' : undefined}
            onClick={() => {
              setTab(t.id);
              playSound('navTap', i);
            }}
          >
            {t.label}
            {t.id === 'questions' && community.unanswered > 0 && <span className={s.chipCount}>{community.unanswered}</span>}
          </button>
        ))}
      </nav>

      {tab === 'members' ? (
        <MembersPanel communityId={community.id} onChange={refreshAll} toast={toast.show} />
      ) : tab === 'about' ? (
        <AboutPanel community={community} onSaved={() => { void managed.mutate(); toast.show('Saved'); }} />
      ) : (
        <QueuePanel
          communityId={community.id}
          tab={tab}
          onOpen={setOpenPost}
          onChange={refreshAll}
          toast={toast.show}
        />
      )}

      {openPost && (
        <PostSheet
          postId={openPost}
          onClose={() => setOpenPost(null)}
          onReplied={() => {
            refreshAll();
            toast.show('Reply posted');
          }}
        />
      )}
      <Composer
        open={composer}
        communityId={community.id}
        onClose={() => setComposer(false)}
        onPosted={() => {
          setComposer(false);
          refreshAll();
          setTab('announcements');
          toast.show('Posted to your community');
        }}
      />
      {toast.node}
    </div>
  );
}

/* ── the moderation list ─────────────────────────────────────────────── */

function QueuePanel({
  communityId,
  tab,
  onOpen,
  onChange,
  toast,
}: {
  communityId: string;
  tab: Exclude<Tab, 'members' | 'about'>;
  onOpen: (id: string) => void;
  onChange: () => void;
  toast: (m: string) => void;
}) {
  const { data, error, mutate } = useSWR<QueuePayload>(studioKeys.communityPosts(communityId, tab), studioFetch);
  const [busy, setBusy] = useState<string | null>(null);

  const act = async (post: QueuePost, what: 'pin' | 'lock' | 'remove') => {
    if (what === 'remove' && !window.confirm('Remove this post? Learners won’t see it any more.')) return;
    setBusy(post.id);
    try {
      if (what === 'remove') await studioSend(`/api/posts/${post.id}`, 'DELETE');
      else
        await studioSend(`/api/posts/${post.id}/${what}`, 'POST', {
          value: what === 'pin' ? !post.isPinned : !post.isLocked,
        });
      playSound(what === 'remove' ? 'cardBack' : 'toggleOn');
      playHaptic('light', false);
      toast(
        what === 'remove'
          ? 'Post removed'
          : what === 'pin'
            ? post.isPinned ? 'Unpinned' : 'Pinned to the top'
            : post.isLocked ? 'Comments open again' : 'Comments locked',
      );
      await mutate();
      onChange();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'That didn’t work. Try again.');
    } finally {
      setBusy(null);
    }
  };

  if (error) return <ErrorCard message={error.message || 'Posts didn’t load.'} onRetry={() => void mutate()} />;
  if (!data) {
    return (
      <div className={s.list} aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className={s.row}>
            <Skel h={48} w={48} r={14} />
            <span className={s.rowMain}>
              <Skel h={16} w="50%" />
              <Skel h={12} w="80%" />
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (data.posts.length === 0) {
    const copy: Record<string, [string, string]> = {
      questions: ['Every question has your answer', 'New questions from learners land here until you reply.'],
      recent: ['No posts yet', 'Start things off with an announcement or a challenge.'],
      pinned: ['Nothing pinned', 'Pin a post to keep it at the top of everyone’s feed.'],
      announcements: ['No announcements yet', 'Tap POST to share news, a tip or a weekly challenge.'],
    };
    const [title, body] = copy[tab];
    return (
      <EmptyCard pose={tab === 'questions' ? 'cheering' : 'waving'} title={title}>
        {body}
      </EmptyCard>
    );
  }

  return (
    <div className={s.list}>
      {data.posts.map((p) => (
        <div key={p.id} className={`${s.row} ${s.rowWrap}`} aria-busy={busy === p.id} style={{ alignItems: 'flex-start' }}>
          <PostBadge type={p.postType} />
          <button type="button" className={s.rowMain} style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }} onClick={() => onOpen(p.id)}>
            <span className={s.rowTitle} style={{ whiteSpace: 'normal' }}>
              {p.title || p.excerpt.slice(0, 90)}
            </span>
            {p.title && (
              <span style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.excerpt}
              </span>
            )}
            <span className={s.rowMeta}>
              <span>
                {p.author.fullName}
                {p.author.isCreator && ' (you)'}
              </span>
              <span>{ago(p.createdAt)}</span>
              <span>
                <MessageCircle size={13} aria-hidden="true" /> {p.commentCount}
              </span>
              {p.lesson && <span>Lesson: {p.lesson.title}</span>}
              {p.isPinned && (
                <span style={{ color: 'var(--warning)', fontWeight: 800 }}>
                  <Pin size={13} aria-hidden="true" /> Pinned
                </span>
              )}
              {p.isLocked && (
                <span>
                  <Lock size={13} aria-hidden="true" /> Locked
                </span>
              )}
            </span>
          </button>
          <span className={s.rowSide}>
            {p.postType === 'QUESTION' && !p.answeredByYou && !p.author.isCreator ? (
              <button type="button" className={`${s.btnPrimary} ${s.btnSm}`} onClick={() => onOpen(p.id)}>
                Answer
              </button>
            ) : (
              <button type="button" className={`${s.btn} ${s.btnSm}`} onClick={() => onOpen(p.id)}>
                Open
              </button>
            )}
            <button
              type="button"
              className={`${s.iconBtn} ${p.isPinned ? s.iconBtnOn : ''}`}
              aria-label={p.isPinned ? 'Unpin' : 'Pin to top'}
              title={p.isPinned ? 'Unpin' : 'Pin to top'}
              disabled={busy === p.id}
              onClick={() => void act(p, 'pin')}
            >
              {p.isPinned ? <PinOff size={16} /> : <Pin size={16} />}
            </button>
            <button
              type="button"
              className={`${s.iconBtn} ${p.isLocked ? s.iconBtnOn : ''}`}
              aria-label={p.isLocked ? 'Open comments' : 'Lock comments'}
              title={p.isLocked ? 'Open comments' : 'Lock comments'}
              disabled={busy === p.id}
              onClick={() => void act(p, 'lock')}
            >
              {p.isLocked ? <LockOpen size={16} /> : <Lock size={16} />}
            </button>
            {!p.author.isCreator && (
              <button
                type="button"
                className={s.iconBtn}
                aria-label="Remove post"
                title="Remove post"
                disabled={busy === p.id}
                onClick={() => void act(p, 'remove')}
                style={{ color: 'var(--error-red)' }}
              >
                <Trash2 size={16} />
              </button>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

function PostBadge({ type }: { type: string }) {
  return POST_ART.has(type) ? (
    <Image src={`/art/posts/${type}.svg`} alt={POST_TYPE_LABEL[type] ?? type} width={48} height={48} style={{ flexShrink: 0 }} />
  ) : (
    <span className={s.statIcon} style={{ width: 48, height: 48 }} aria-hidden="true">
      <MessageCircle size={20} />
    </span>
  );
}

/* ── members ──────────────────────────────────────────────────────────── */

function MembersPanel({ communityId, onChange, toast }: { communityId: string; onChange: () => void; toast: (m: string) => void }) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'muted'>('all');
  const [muting, setMuting] = useState<Member | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);
  const { data, error, mutate } = useSWR<MembersPayload>(studioKeys.communityMembers(communityId, query, filter), studioFetch, {
    keepPreviousData: true,
  });

  const setMute = async (m: Member, days: 1 | 7 | 30 | null) => {
    try {
      await studioSend(`/api/communities/${communityId}/members/${m.id}/mute`, 'POST', { days });
      playSound(days === null ? 'toggleOn' : 'toggleOff');
      toast(days === null ? `${m.fullName} can post again` : `${m.fullName} is muted for ${days === 1 ? 'a day' : `${days} days`}`);
      setMuting(null);
      await mutate();
      onChange();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'That didn’t work.');
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <label className={s.search}>
          <Search size={16} aria-hidden="true" />
          <span className={s.srOnly}>Search members</span>
          <input className={s.input} placeholder="Search members" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <div className={s.chips} role="group" aria-label="Filter members">
          {(['all', 'muted'] as const).map((f, i) => (
            <button
              key={f}
              type="button"
              className={`${s.chip} ${filter === f ? s.chipOn : ''}`}
              onClick={() => {
                setFilter(f);
                playSound('navTap', i);
              }}
            >
              {f === 'all' ? 'Everyone' : 'Muted'}
            </button>
          ))}
        </div>
      </div>
      {error && !data ? (
        <ErrorCard message={error.message || 'Members didn’t load.'} onRetry={() => void mutate()} />
      ) : !data ? (
        <Skel h={240} />
      ) : data.members.length === 0 ? (
        <EmptyCard pose="searching" title={filter === 'muted' ? 'Nobody is muted' : 'No members found'}>
          {filter === 'muted' ? 'Mute is there for the rare bad actor. Hopefully you never need it.' : 'Learners join after their second lesson.'}
        </EmptyCard>
      ) : (
        <div className={s.list}>
          {data.members.map((m) => (
            <div key={m.id} className={`${s.row} ${s.rowWrap}`}>
              <PersonAvatar face={m} size={44} />
              <Link href={m.isCreator ? '/creator/profile' : `/creator/students/${m.id}`} className={s.rowMain} style={{ color: 'inherit', textDecoration: 'none' }}>
                <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className={s.rowTitle}>{m.fullName}</span>
                  {m.isCreator ? <Pill tone="var(--color-brand)">Creator</Pill> : <Pill tone="var(--brand-purple)">Level {m.level}</Pill>}
                </span>
                <span className={s.rowMeta}>
                  {m.streakDays > 0 && (
                    <span style={{ color: 'var(--warning)', fontWeight: 800 }}>
                      <Flame size={13} aria-hidden="true" /> {m.streakDays}
                    </span>
                  )}
                  <span>Joined {ago(m.joinedAt)}</span>
                  {m.mutedUntil && (
                    <span style={{ color: 'var(--error-red)', fontWeight: 800 }}>
                      <VolumeX size={13} aria-hidden="true" /> Muted until {new Date(m.mutedUntil).toLocaleDateString()}
                    </span>
                  )}
                </span>
              </Link>
              {!m.isCreator && (
                <span className={s.rowSide}>
                  {m.mutedUntil ? (
                    <button type="button" className={`${s.btn} ${s.btnSm}`} onClick={() => void setMute(m, null)}>
                      Unmute
                    </button>
                  ) : (
                    <button type="button" className={`${s.btn} ${s.btnSm}`} style={{ color: 'var(--text-secondary)' }} onClick={() => setMuting(m)}>
                      <VolumeX size={14} aria-hidden="true" /> Mute
                    </button>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <Sheet open={!!muting} onClose={() => setMuting(null)} title={muting ? `Mute ${muting.fullName}?` : 'Mute'}>
        <p className={s.sub}>They can still read, learn and react, but can’t post or comment until the mute ends. They aren’t told who muted them.</p>
        <div style={{ display: 'grid', gap: 8 }}>
          {([1, 7, 30] as const).map((d) => (
            <button key={d} type="button" className={s.btn} onClick={() => muting && void setMute(muting, d)}>
              {d === 1 ? 'For a day' : d === 7 ? 'For a week' : 'For 30 days'}
            </button>
          ))}
        </div>
      </Sheet>
    </>
  );
}

/* ── about ────────────────────────────────────────────────────────────── */

function AboutPanel({ community, onSaved }: { community: ManagedCommunity; onSaved: () => void }) {
  const [text, setText] = useState(community.description ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setText(community.description ?? ''), [community.id, community.description]);
  const save = async () => {
    setBusy(true);
    setError(null);
    try {
      await studioSend(`/api/communities/${community.id}/manage`, 'PATCH', { description: text });
      playSound('profileSaved');
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Didn’t save.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={s.card} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label className={s.label}>
        About this community
        <textarea
          className={s.textarea}
          value={text}
          maxLength={600}
          placeholder="What this community is for, and how you’d like people to use it."
          onChange={(e) => setText(e.target.value)}
        />
        <span className={s.hint}>Shown on the community page. {600 - text.length} left.</span>
      </label>
      {error && (
        <div className={s.errorBox} role="alert">
          <span>{error}</span>
        </div>
      )}
      <button
        type="button"
        className={s.btnPrimary}
        style={{ alignSelf: 'flex-start' }}
        disabled={busy || text === (community.description ?? '')}
        onClick={() => void save()}
      >
        {busy ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}

/* ── composer ─────────────────────────────────────────────────────────── */

const COMPOSE_TYPES = [
  { type: 'ANNOUNCEMENT', label: 'Announcement', hint: 'News, updates, a new lesson. Members get notified.', icon: Megaphone },
  { type: 'CHALLENGE', label: 'Challenge', hint: 'A task for the week. Learners reply with what they made.', icon: Trophy },
  { type: 'DISCUSSION', label: 'Discussion', hint: 'Ask the community something. Get people talking.', icon: MessageCircle },
] as const;

function Composer({
  open,
  communityId,
  onClose,
  onPosted,
}: {
  open: boolean;
  communityId: string;
  onClose: () => void;
  onPosted: () => void;
}) {
  const [type, setType] = useState<(typeof COMPOSE_TYPES)[number]['type']>('ANNOUNCEMENT');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (open) setError(null);
  }, [open]);

  const post = async () => {
    if (busy || !body.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await studioSend(`/api/communities/${communityId}/posts`, 'POST', {
        postType: type,
        ...(title.trim() ? { title: title.trim() } : {}),
        contentText: body.trim(),
      });
      playSound('post');
      playHaptic('success', false);
      setTitle('');
      setBody('');
      onPosted();
    } catch (e) {
      playSound('wrong');
      setError(e instanceof Error ? e.message : 'That didn’t post.');
    } finally {
      setBusy(false);
    }
  };

  const current = COMPOSE_TYPES.find((t) => t.type === type)!;
  return (
    <Sheet open={open} onClose={onClose} title="Post to your community">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
        {COMPOSE_TYPES.map((t) => (
          <button
            key={t.type}
            type="button"
            className={`${s.chip} ${type === t.type ? s.chipOn : ''}`}
            style={{ flexDirection: 'column', height: 'auto', padding: '10px 6px', gap: 6 }}
            onClick={() => {
              setType(t.type);
              playSound('select');
            }}
          >
            <Image src={`/art/posts/${t.type}.svg`} alt="" width={36} height={36} />
            {t.label}
          </button>
        ))}
      </div>
      <span className={s.hint}>{current.hint}</span>
      <label className={s.label}>
        Title
        <input className={s.input} value={title} maxLength={150} onChange={(e) => setTitle(e.target.value)} placeholder="Optional" />
      </label>
      <label className={s.label}>
        Message
        <textarea className={s.textarea} value={body} maxLength={8000} onChange={(e) => setBody(e.target.value)} style={{ minHeight: 140 }} />
      </label>
      {error && (
        <div className={s.errorBox} role="alert">
          <span>{error}</span>
        </div>
      )}
      <div className={s.sheetActions}>
        <button type="button" className={s.btn} onClick={onClose}>
          Cancel
        </button>
        <button type="button" className={s.btnPrimary} disabled={busy || !body.trim()} onClick={() => void post()}>
          <Send size={16} aria-hidden="true" /> {busy ? 'Posting…' : 'Post'}
        </button>
      </div>
    </Sheet>
  );
}
