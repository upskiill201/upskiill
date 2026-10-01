'use client';

/**
 * CommunityWelcomeScene — the learner's first look at their course community,
 * played once, the moment their second completed lesson earns them a seat.
 *
 * This is the only scene in the engine that is a short *flow* rather than a
 * single beat, and deliberately so: a community is the one reward that means
 * nothing until you understand what it's for. A passive "You've joined!"
 * splash gets dismissed and forgotten. So each beat invites one small action
 * — pick why you're here, like a real post from the room — and the room
 * answers — and in beat 4 they follow their first classmates. Five beats, all
 * of them short.
 *
 * Everything here is real and nothing here pretends. The member count, the
 * faces and the sample post all come from the server payload that seated the
 * learner, and the like in beat 3 writes to that post for real. Only beat 2's
 * choice gates its CTA; the like never does, because forcing it would mean
 * every new member liked the same post on their way in.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Users, Check, UserCheck, UserPlus } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import PostTypeArt from '@/components/community/PostTypeArt';
import { categoryLabel } from '@/components/community/PostCard';
import { setFollowing } from '@/lib/social';
import SceneShell from '../SceneShell';
import CelebrationMascot from '../CelebrationMascot';
import { CountUpNumber } from '../ScenePrimitives';
import styles from '../Scene.module.css';
import local from '../CommunityWelcome.module.css';
import { togglePostLike } from '@/lib/communityApi';
import type { CelebrationScene } from '@/context/CelebrationContext';
import { playSound } from '@/lib/audio/lessonSounds';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';

type CommunityWelcomeInput = Extract<CelebrationScene, { kind: 'COMMUNITY_WELCOME' }>;

interface Props {
  scene: CommunityWelcomeInput;
  onAdvance: () => void;
}

type Reason = 'stuck' | 'win' | 'help';

const REASONS: Array<{
  id: Reason;
  icon: React.ReactNode;
  title: string;
  sub: string;
  /** What the room says back — each names the concrete next action. */
  reply: string;
}> = [
  {
    id: 'stuck',
    icon: <PostTypeArt postType="QUESTION" size={42} />,
    title: 'To get unstuck',
    sub: 'Ask when something does not click',
    reply:
      'Post it as a Question. People who hit the same wall two lessons ago answer fastest — and every lesson has a "Discuss this lesson" button that files your question in the right place.',
  },
  {
    id: 'win',
    icon: <PostTypeArt postType="WIN" size={42} />,
    title: 'To share what I build',
    sub: 'Post the thing you just made',
    reply:
      'Post it as a Win. Wins are the posts people actually read here — they are proof the course works, and they are how the rest of the room learns your name.',
  },
  {
    id: 'help',
    icon: <PostTypeArt postType="TIP" size={42} />,
    title: 'To help other learners',
    sub: 'Answer questions, share what worked',
    reply:
      'Open the Questions filter and look for the unanswered ones. Answering is also the fastest way up the leaderboard — comments and the likes they earn both score.',
  },
];

/** Faces orbit positions around the cover tile (percentages of the stage). */
const ORBIT = [
  { top: '-6%', left: '-4%', size: 40 },
  { top: '4%', left: '86%', size: 34 },
  { top: '62%', left: '-12%', size: 34 },
  { top: '78%', left: '78%', size: 40 },
  { top: '-10%', left: '48%', size: 30 },
  { top: '92%', left: '32%', size: 30 },
];

export default function CommunityWelcomeScene({ scene, onAdvance }: Props) {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState<Reason | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(scene.samplePost?.likeCount ?? 0);
  const likeBusy = useRef(false);
  // Beat 4's follows are real follows — the same call as a profile's button.
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const toggleFollow = async (id: string) => {
    const next = !followed[id];
    setFollowed((f) => ({ ...f, [id]: next }));
    playSound(next ? 'toggleOn' : 'toggleOff');
    playHaptic(next ? 'success' : 'light', false);
    try {
      await setFollowing(id, next);
    } catch {
      setFollowed((f) => ({ ...f, [id]: !next }));
    }
  };

  /**
   * The like in beat 3 is a REAL like on a REAL post — the learner is already
   * a member by the time this scene plays, so it counts exactly as it would on
   * the community page: the author is notified and earns their +2 points.
   *
   * Teaching the gesture with a button that quietly does nothing would be the
   * one dishonest thing in the whole flow. Failures revert in silence rather
   * than throwing an error dialog over a celebration.
   */
  const toggleRealLike = async (postId: string) => {
    if (likeBusy.current) return;
    likeBusy.current = true;
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => Math.max(0, c + (next ? 1 : -1)));
    playSound('shine');
    playHaptic('light', false);
    try {
      const res = await togglePostLike(postId, liked);
      setLiked(res.liked);
      setLikeCount(res.likeCount);
    } catch {
      setLiked(!next);
      setLikeCount((c) => Math.max(0, c + (next ? -1 : 1)));
    } finally {
      likeBusy.current = false;
    }
  };

  useEffect(() => {
    celebrationHaptic('win');
    playSound('achievement');
  }, []);

  const goNext = () => {
    playSound('statTick', step + 1);
    playHaptic('light', false);
    setStep((s) => s + 1);
  };

  // Navigating away must also advance() — the scene is a full-page overlay and
  // would otherwise stay mounted on top of the community it just opened.
  const enterCommunity = () => {
    scene.onEnter();
    onAdvance();
  };

  const totalSteps = 5;
  const dots = (
    <div className={local.steps} aria-hidden>
      {Array.from({ length: totalSteps }, (_, i) => (
        <span
          key={i}
          className={`${local.stepDot} ${
            i === step ? local.stepDotActive : i < step ? local.stepDotDone : ''
          }`}
        />
      ))}
    </div>
  );

  // ── Beat 1: the room, and that you are in it ───────────────────────────
  if (step === 0) {
    return (
      <SceneShell cta={{ text: 'STEP INSIDE', onClick: goNext, variant: 'blue' }} onSkip={onAdvance}>
        {dots}

        <div className={local.doorStage}>
          <motion.div
            initial={reducedMotion ? false : { scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            style={{ width: '100%', height: '100%' }}
          >
            {scene.thumbnailUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element -- course
                 thumbnails are arbitrary S3/CloudFront keys. */
              <img className={local.coverTile} src={scene.thumbnailUrl} alt="" />
            ) : (
              <div className={local.coverFallback}>{scene.name.charAt(0).toUpperCase()}</div>
            )}
          </motion.div>

          {scene.members.slice(0, ORBIT.length).map((m, i) => (
            <motion.div
              key={m.id}
              className={local.orbitFace}
              style={{ top: ORBIT[i].top, left: ORBIT[i].left }}
              initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Avatar
                src={m.avatarUrl ?? undefined}
                name={m.fullName}
                size={ORBIT[i].size >= 40 ? 'sm' : 'xs'}
              />
            </motion.div>
          ))}
        </div>

        <h1 className={styles.headline}>
          You’re in the <span className={styles.headlineBlue}>{scene.courseTitle}</span> community
        </h1>

        <p className={local.memberLine}>
          <Users size={17} />
          <span className={local.memberCount}>
            <CountUpNumber value={scene.memberCount} from={Math.max(0, scene.memberCount - 1)} duration={0.9} />
          </span>
          {scene.memberCount === 1 ? 'learner' : 'learners'} in here
          {scene.postCount > 0 && ` · ${scene.postCount} post${scene.postCount === 1 ? '' : 's'}`}
        </p>

        <p className={styles.subhead}>
          Two lessons in, you’ve earned your seat. This is where the people doing this course with
          you are.
        </p>
      </SceneShell>
    );
  }

  // ── Beat 2: what do you want out of it? (interactive) ──────────────────
  if (step === 1) {
    const picked = REASONS.find((r) => r.id === reason);
    return (
      <SceneShell
        cta={{
          text: picked ? 'GOT IT' : 'PICK ONE',
          onClick: goNext,
          variant: 'blue',
          disabled: !picked,
        }}
        onSkip={onAdvance}
      >
        {dots}
        <h1 className={styles.headline}>What brings you in?</h1>
        <p className={styles.subhead}>Pick one. You can do all three later.</p>

        <div className={local.choiceGrid}>
          {REASONS.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`${local.choice} ${reason === r.id ? local.choiceSelected : ''}`}
              aria-pressed={reason === r.id}
              onClick={() => {
                setReason(r.id);
                playSound('shine');
                playHaptic('light', false);
              }}
            >
              <span className={`${local.choiceIcon} ${local.artIcon}`}>{r.icon}</span>
              <span className={local.choiceBody}>
                <span className={local.choiceTitle}>{r.title}</span>
                <span className={local.choiceSub}>{r.sub}</span>
              </span>
              {reason === r.id && <Check size={20} className={local.choiceCheck} />}
            </button>
          ))}
        </div>

        {picked && (
          <motion.p
            className={local.reply}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {picked.reply}
          </motion.p>
        )}
      </SceneShell>
    );
  }

  // ── Beat 3: a real post, and a like that actually lands ────────────────
  if (step === 2) {
    const post = scene.samplePost;
    return (
      <SceneShell
        cta={{
          // Never gated on the like. Requiring it would mean every new member
          // liked this same post on their way in — inflating its count, paying
          // its author points nobody meant, and firing a notification each
          // time. An invitation, not a toll.
          text: liked ? 'NICE — NEXT' : 'CONTINUE',
          onClick: goNext,
          variant: 'blue',
        }}
        onSkip={onAdvance}
      >
        {dots}
        <h1 className={styles.headline}>
          {post ? 'This is a post' : 'The room is brand new'}
        </h1>
        <p className={styles.subhead}>
          {post
            ? 'Every post is one question, one win, or one lesson learned. Liking one takes a second and tells the author it landed.'
            : 'Nobody has posted here yet — which means the first post is yours to write.'}
        </p>

        {post && (
          <motion.div
            className={local.postPreview}
            initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          >
            <div className={local.postHead}>
              <Avatar
                src={post.authorAvatarUrl ?? undefined}
                name={post.authorName}
                size="sm"
              />
              <div>
                <div className={local.postAuthor}>{post.authorName}</div>
                <div className={local.postMeta}>
                  <PostTypeArt postType={post.postType} size={16} /> {categoryLabel(post.postType)}
                </div>
              </div>
            </div>

            {post.title && <h2 className={local.postTitle}>{post.title}</h2>}
            <p className={local.postExcerpt}>{post.excerpt}</p>

            <div className={local.postFooter}>
              <button
                type="button"
                className={`${local.likeBtn} ${liked ? local.likeBtnOn : ''}`}
                aria-pressed={liked}
                onClick={() => void toggleRealLike(post.id)}
              >
                <Image src={liked ? '/art/ui/like.svg' : '/art/ui/like-off.svg'} alt="" width={20} height={20} />
                {likeCount > 0 ? likeCount : 'Like'}
              </button>
              <span className={local.postStat}>
                <Image src="/art/ui/comment.svg" alt="" width={20} height={20} /> {post.commentCount}
              </span>
            </div>
          </motion.div>
        )}

        {post && !liked && (
          <p className={local.tapHint}>Go on, try it — this one is real.</p>
        )}
      </SceneShell>
    );
  }

  // ── Beat 4: learning is better with friends (interactive) ──────────────
  if (step === 3) {
    const classmates = scene.members.filter((m) => m.id !== scene.instructor?.id).slice(0, 4);
    const anyFollowed = Object.values(followed).some(Boolean);
    return (
      <SceneShell
        cta={{ text: anyFollowed ? 'NICE — NEXT' : 'CONTINUE', onClick: goNext, variant: 'blue' }}
        onSkip={onAdvance}
      >
        {dots}
        <h1 className={styles.headline}>
          Learning is better with <span className={styles.headlineBlue}>friends</span>
        </h1>
        <p className={styles.subhead}>
          Follow the people learning this with you. You&apos;ll keep each other going.
        </p>

        <div className={local.perks}>
          <div className={local.perk}>
            <Image src="/Icons/burn.png" alt="" width={36} height={36} />
            <span>See their streaks</span>
          </div>
          <div className={local.perk}>
            <Image src="/art/ui/medal-1.svg" alt="" width={36} height={36} />
            <span>Race them on the leaderboard</span>
          </div>
          <div className={local.perk}>
            <Image src="/art/ui/like.svg" alt="" width={36} height={36} />
            <span>Cheer each other&apos;s wins</span>
          </div>
        </div>

        {classmates.length > 0 ? (
          <ul className={local.friendList}>
            {classmates.map((m, i) => (
              <motion.li
                key={m.id}
                className={local.friendRow}
                initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 380, damping: 26 }}
              >
                <Avatar src={m.avatarUrl ?? undefined} name={m.fullName} size="sm" />
                <span className={local.friendName}>{m.fullName}</span>
                <button
                  type="button"
                  className={followed[m.id] ? local.followingBtn : local.followBtn}
                  aria-pressed={!!followed[m.id]}
                  onClick={() => void toggleFollow(m.id)}
                >
                  {followed[m.id] ? <UserCheck size={16} strokeWidth={2.75} /> : <UserPlus size={16} strokeWidth={2.75} />}
                  {followed[m.id] ? 'Following' : 'Follow'}
                </button>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className={local.tapHint}>You&apos;re one of the first here. Invite a friend from the community page.</p>
        )}
      </SceneShell>
    );
  }

  // ── Beat 5: how to be useful here, then in you go ──────────────────────
  return (
    <SceneShell
      cta={{ text: 'SAY HI', onClick: enterCommunity, variant: 'green' }}
      secondaryCta={{ text: 'MAYBE LATER', onClick: onAdvance }}
      onSkip={onAdvance}
    >
      {dots}
      <h1 className={styles.headline}>
        Three ways to <span className={styles.headlineAccent}>be useful</span> here
      </h1>

      <div className={local.ruleList}>
        <div className={local.rule}>
          <span className={`${local.ruleIcon} ${local.artIcon}`}>
            <PostTypeArt postType="QUESTION" size={34} />
          </span>
          <div>
            <div className={local.ruleTitle}>Ask the stuck question</div>
            <div className={local.ruleSub}>
              The one you think is too basic is the one five other people also have.
            </div>
          </div>
        </div>
        <div className={local.rule}>
          <span className={`${local.ruleIcon} ${local.artIcon}`}>
            <PostTypeArt postType="WIN" size={34} />
          </span>
          <div>
            <div className={local.ruleTitle}>Show the work, not the plan</div>
            <div className={local.ruleSub}>
              A screenshot of something half-finished beats a paragraph about what you intend to
              build.
            </div>
          </div>
        </div>
        <div className={local.rule}>
          <span className={`${local.ruleIcon} ${local.artIcon}`}>
            <PostTypeArt postType="DISCUSSION" size={34} />
          </span>
          <div>
            <div className={local.ruleTitle}>Answer one before you ask one</div>
            <div className={local.ruleSub}>
              It costs two minutes and it is how this room stays worth being in.
            </div>
          </div>
        </div>
      </div>

      <p className={local.pointsNote}>
        All three earn <b>community points</b> — posts, comments and the likes they pick up. Points
        are what the leaderboard ranks, and they’re counted separately from your learning XP.
      </p>

      {/* A quiet sign-off, not a joke: this scene's voice teaches the room's
          rules and stays out of Tey's usual mischief on purpose (see the file
          header). The mascot appears here only as visual continuity with the
          rest of the Celebration Engine — no speech bubble, no pooled line. */}
      <CelebrationMascot pose="hug" entrance="puff" size={64} />
    </SceneShell>
  );
}
