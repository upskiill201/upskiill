'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Flame, 
  Shield, 
  Star, 
  ChevronDown, 
  ChevronRight, 
  Edit3, 
  Calendar, 
  Search, 
  Gift, 
  Share2, 
  Copy, 
  Check, 
  Award,
  Info,
  Zap,
  X,
  CheckCircle2,
  Camera,
  UserPlus,
  UserCheck,
  Loader2,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { StatsBar } from '@/components/ui/StatsBar';
import { useGamification } from '@/context/GamificationContext';
import { playHaptic } from '@/lib/haptics';
import { getCachedUser, setCachedUser } from '@/lib/user-cache';
import styles from './Profile.module.css';

interface Classmate {
  id: string;
  name: string;
  avatar: string;
  course: string;
  streak: number;
  isFollowing?: boolean;
}

// Achievement card type returned from API
interface AchievementCard {
  id: string;
  title: string;
  iconSrc: string | null;
  badgeBg: string;
  level: number;
  current: number;
  target: number;
  description: string;
  xpReward: number;
  isUnlocked: boolean;
  isClaimed: boolean;
  unlockedAt: string | null;
  maxLevel: number;
  unlockedLevels: { level: number; claimed: boolean; unlockedAt: string }[];
}

const MOCK_CLASSMATES: Classmate[] = [
  { id: '1', name: 'Amina Bello', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100', course: 'Advanced Product Design UX', streak: 12 },
  { id: '2', name: 'Kofi Mensah', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100', course: 'Fullstack Web Development', streak: 8 },
  { id: '3', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100', course: 'Advanced Product Design UX', streak: 15 },
  { id: '4', name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100', course: 'Business Strategy & AI', streak: 5 },
];

export default function StudentProfilePage() {
  const { streakDays, xp, refresh } = useGamification();

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [joinedDate, setJoinedDate] = useState('Joined July 2026');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [activeSocialTab, setActiveSocialTab] = useState<'following' | 'followers'>('following');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isClassmatesModalOpen, setIsClassmatesModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Editable form inputs
  const [editNameInput, setEditNameInput] = useState('');
  const [editUsernameInput, setEditUsernameInput] = useState('');
  const [editBioInput, setEditBioInput] = useState('');
  const [editAvatarInput, setEditAvatarInput] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Classmates & followers state
  const [classmates, setClassmates] = useState<Classmate[]>(MOCK_CLASSMATES);
  const [followingList, setFollowingList] = useState<Classmate[]>([]);
  const [followersList, setFollowersList] = useState<Classmate[]>([]);

  useEffect(() => {
    // Hydrate cached profile on client mount safely to prevent SSR hydration mismatch
    const cached = getCachedUser();
    if (cached?.fullName) {
      setDisplayName(cached.fullName);
      setEditNameInput(cached.fullName);
    }
    if (cached?.email) {
      const u = cached.email.split('@')[0];
      setUsername(u);
      setEditUsernameInput(u);
    }
    if (cached?.avatarUrl) {
      setAvatarUrl(cached.avatarUrl);
      setEditAvatarInput(cached.avatarUrl);
    }
  }, []);

  // Fetch user profile info from backend
  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/profile', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.fullName) {
          setDisplayName(data.fullName);
          setEditNameInput(data.fullName);
          setCachedUser(data);
        }
        if (data.username) {
          setUsername(data.username);
          setEditUsernameInput(data.username);
        }
        if (data.avatarUrl) {
          setAvatarUrl(data.avatarUrl);
          setEditAvatarInput(data.avatarUrl);
        }
        if (data.profile?.bio) {
          setBio(data.profile.bio);
          setEditBioInput(data.profile.bio);
        }
        if (data.followersCount !== undefined) setFollowersCount(data.followersCount);
        if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
        if (data.createdAt) {
          const date = new Date(data.createdAt);
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          setJoinedDate(`Joined ${monthNames[date.getMonth()]} ${date.getFullYear()}`);
        }
      }
    } catch (err) {
      console.error('Failed loading profile data', err);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Fetch real social connections
  const fetchSocialData = useCallback(async () => {
    try {
      const [classmatesRes, followingRes, followersRes] = await Promise.all([
        fetch('/api/social/classmates', { credentials: 'include' }),
        fetch('/api/social/following', { credentials: 'include' }),
        fetch('/api/social/followers', { credentials: 'include' }),
      ]);
      if (classmatesRes.ok) {
        const data = await classmatesRes.json();
        if (Array.isArray(data) && data.length > 0) setClassmates(data);
      }
      if (followingRes.ok) {
        const data = await followingRes.json();
        if (Array.isArray(data)) setFollowingList(data);
      }
      if (followersRes.ok) {
        const data = await followersRes.json();
        if (Array.isArray(data)) setFollowersList(data);
      }
    } catch (err) {
      console.error('Failed fetching social data', err);
    }
  }, []);

  useEffect(() => {
    fetchSocialData();
  }, [fetchSocialData]);

  // Compute default fallback achievements based on live user stats
  const getFallbackAchievements = useCallback((): AchievementCard[] => [
    {
      id: 'wildfire',
      title: 'Wildfire',
      iconSrc: '/Icons/burn.png',
      badgeBg: '#FF4B4B',
      level: 1,
      current: Math.min(streakDays || 1, 3),
      target: 3,
      description: 'Reach a 3 day streak',
      xpReward: 20,
      isUnlocked: (streakDays || 0) >= 3,
      isClaimed: false,
      unlockedAt: null,
      maxLevel: 5,
      unlockedLevels: [],
    },
    {
      id: 'sage',
      title: 'Sage',
      iconSrc: '/Icons/gem.png',
      badgeBg: '#22C55E',
      level: 1,
      current: Math.min(xp || 13, 100),
      target: 100,
      description: 'Earn 100 XP',
      xpReward: 20,
      isUnlocked: (xp || 0) >= 100,
      isClaimed: false,
      unlockedAt: null,
      maxLevel: 5,
      unlockedLevels: [],
    },
    {
      id: 'champion',
      title: 'Champion',
      iconSrc: null,
      badgeBg: '#8B5CF6',
      level: 1,
      current: 0,
      target: 1,
      description: 'Unlock Leaderboards by completing 10 lessons',
      xpReward: 20,
      isUnlocked: false,
      isClaimed: false,
      unlockedAt: null,
      maxLevel: 5,
      unlockedLevels: [],
    },
  ], [streakDays, xp]);

  // Achievements state initialized with client fallback so UI is immediately visible
  const [achievements, setAchievements] = useState<AchievementCard[]>([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [claimToast, setClaimToast] = useState<{ show: boolean; xp: number; badge: string }>({ show: false, xp: 0, badge: '' });

  // Update fallback whenever stats update
  useEffect(() => {
    setAchievements(getFallbackAchievements());
  }, [getFallbackAchievements]);

  // Fetch live achievements from backend via /api rewrite proxy
  const fetchAchievements = useCallback(async () => {
    try {
      setAchievementsLoading(true);
      const res = await fetch('/api/gamification/achievements', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.cards && data.cards.length > 0) {
          setAchievements(data.cards);
        }
      }
    } catch (err) {
      console.error('Failed loading achievements from API, using client stats fallback', err);
    } finally {
      setAchievementsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  // Claim achievement reward
  const handleClaim = async (badgeId: string, level: number, badgeTitle: string, xpReward: number) => {
    playHaptic('medium');
    setClaimingId(`${badgeId}-${level}`);
    try {
      const res = await fetch('/api/gamification/achievements/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ badgeId, level }),
      });
      if (res.ok) {
        await fetchAchievements();
        await refresh();
        setClaimToast({ show: true, xp: xpReward, badge: badgeTitle });
        setTimeout(() => setClaimToast({ show: false, xp: 0, badge: '' }), 3500);
        return;
      }
    } catch (err) {
      console.error('Failed claiming achievement reward via API', err);
    } finally {
      setClaimingId(null);
    }

    // Local state fallback claim if network API claim endpoint is unauthenticated or unreachable
    setAchievements(prev => prev.map(a => a.id === badgeId && a.level === level ? { ...a, isClaimed: true } : a));
    setClaimToast({ show: true, xp: xpReward, badge: badgeTitle });
    setTimeout(() => setClaimToast({ show: false, xp: 0, badge: '' }), 3500);
  };

  // Handle Avatar Photo File Upload to AWS S3 & CloudFront via /api/upload/avatar
  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAvatar(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setEditAvatarInput(data.url);
          playHaptic('medium');
        }
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed uploading photo');
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Toggle Follow / Unfollow on another student
  const handleToggleFollow = async (targetUserId: string, isCurrentlyFollowing: boolean) => {
    playHaptic('medium');
    // Optimistic UI update
    setClassmates(prev =>
      prev.map(c => (c.id === targetUserId ? { ...c, isFollowing: !isCurrentlyFollowing } : c))
    );

    try {
      const endpoint = `/api/social/${isCurrentlyFollowing ? 'unfollow' : 'follow'}/${targetUserId}`;
      const res = await fetch(endpoint, {
        method: isCurrentlyFollowing ? 'DELETE' : 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
        fetchSocialData();
      }
    } catch (err) {
      console.error('Failed toggling follow status', err);
    }
  };

  const handleSaveProfile = async () => {
    playHaptic('medium');
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fullName: editNameInput,
          username: editUsernameInput,
          avatarUrl: editAvatarInput,
          bio: editBioInput,
        }),
      });
      if (res.ok) {
        setDisplayName(editNameInput);
        setUsername(editUsernameInput);
        if (editAvatarInput) setAvatarUrl(editAvatarInput);
        if (editBioInput) setBio(editBioInput);
        await fetchProfile();
      }
    } catch (err) {
      console.error('Failed updating profile', err);
    }
    setIsEditModalOpen(false);
  };

  const handleShareWhatsApp = () => {
    playHaptic('light');
    const shareText = `Join me on Teyro to build real-world skills together! Sign up here: https://teyro.app/signup?ref=${username}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleCopyInviteLink = () => {
    playHaptic('medium');
    const inviteLink = `https://teyro.app/signup?ref=${username}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Badge icon renderer (handles both image-based and icon-based badges)
  const renderBadgeIcon = (badge: AchievementCard) => {
    if (badge.iconSrc) {
      return <Image src={badge.iconSrc} width={26} height={26} alt={badge.title} />;
    }
    if (badge.id === 'champion') return <Shield size={22} color="#FFFFFF" />;
    if (badge.id === 'sharpshooter') return <Zap size={22} color="#FFFFFF" />;
    return <Award size={22} color="#FFFFFF" />;
  };

  return (
    <div className={styles.pageContainer}>
      {/* ── XP CLAIM TOAST ── */}
      {claimToast.show && (
        <div className={styles.claimToast}>
          <CheckCircle2 size={18} color="#22C55E" />
          <span>+{claimToast.xp} XP claimed for <strong>{claimToast.badge}</strong>!</span>
        </div>
      )}

      {/* ── TOP HEADER GAMIFICATION STATS BAR (ALL FIVE LIVE STATS) ── */}
      <div className={styles.topHeaderBar}>
        {/* All stats: streak, coins, XP, hearts & level — live from gamification context */}
        <StatsBar />

        {/* User Profile Avatar Circle */}
        <div className={styles.userDropdownTrigger} onClick={() => setIsEditModalOpen(true)}>
          <div className={styles.userAvatarBadge}>
            {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
          </div>
          <ChevronDown size={16} color="#64748B" />
        </div>
      </div>

      {/* ── MAIN PROFILE GRID (MIDDLE COLUMN + RIGHT SIDEBAR) ── */}
      <div className={styles.profileGrid}>
        {/* MIDDLE COLUMN */}
        <div className={styles.middleColumn}>
          {/* 1. WELCOME BACK MASCOT BANNER CARD (60% IMAGE / 40% TEXT SPLIT) */}
          <div className={styles.welcomeBanner}>
            {/* Image Container (60% width on left with mascot popping out at top) */}
            <div className={styles.welcomeImageContainer}>
              <div className={styles.welcomeMascot}>
                <Image 
                  src="/User onbarding Assets/step_15_image_desktop.webp" 
                  alt="Tey Mascot Celebrating"
                  fill
                  sizes="250px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>

            {/* Text Container (40% width on right) */}
            <div className={styles.welcomeTextContainer}>
              <h2 className={styles.welcomeTitle}>
                Welcome back,<br />
                {displayName ? `${displayName}! 👋` : <span className="inline-block w-28 h-6 bg-slate-200 animate-pulse rounded-md align-middle my-1" />}
              </h2>
              <p className={styles.welcomeSubtitle}>
                Consistency today,<br />
                mastery tomorrow.
              </p>
            </div>
          </div>

          {/* 2. USER IDENTITY PROFILE SECTION (No container box border, matches UI design) */}
          <div className={styles.identityCard}>
            <div className={styles.identityMainRow}>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                {/* Avatar with star badge */}
                <div className={styles.avatarWrapper}>
                  {avatarUrl ? (
                    <Avatar src={avatarUrl || undefined} name={displayName || 'User'} size="lg" />
                  ) : (
                    <div className={styles.avatarCircle}>
                      {displayName ? displayName.charAt(0).toUpperCase() : <span className="inline-block w-6 h-6 bg-slate-200 animate-pulse rounded-full" />}
                    </div>
                  )}
                  <div className={styles.avatarStarBadge}>
                    <Star size={12} className="fill-[#FFD700] text-[#FFD700]" />
                  </div>
                </div>

                <div className={styles.identityDetails}>
                  <h1 className={styles.identityName}>
                    {displayName || <span className="inline-block w-36 h-6 bg-slate-200 animate-pulse rounded-md" />}
                  </h1>
                  <div className={styles.handleRow}>
                    <span>{username ? `@${username}` : <span className="inline-block w-20 h-4 bg-slate-200 animate-pulse rounded" />}</span>
                    <Edit3 
                      size={15} 
                      className={styles.pencilIcon} 
                      onClick={() => { playHaptic('light'); setIsEditModalOpen(true); }} 
                    />
                  </div>
                  <div className={styles.joinedRow}>
                    <Calendar size={14} />
                    <span>{joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Flag + Edit on Right */}
              <div className={styles.identityRightMeta}>
                <span style={{ fontSize: '1.4rem' }}>🇺🇸</span>
                <Edit3 
                  size={16} 
                  className={styles.pencilIcon} 
                  onClick={() => { playHaptic('light'); setIsEditModalOpen(true); }} 
                />
              </div>
            </div>

            {/* Social Followers Row */}
            <div className={styles.socialCountRow}>
              <span className={styles.socialCountLink} onClick={() => setIsClassmatesModalOpen(true)}>
                {followingCount} Following
              </span>
              <span>·</span>
              <span className={styles.socialCountLink} onClick={() => setIsClassmatesModalOpen(true)}>
                {followersCount} Followers
              </span>
            </div>
          </div>

          {/* 3. LINKEDIN SHOWCASE BANNER CARD */}
          <div className={styles.linkedinCard}>
            <div className={styles.linkedinContent}>
              <h3 className={styles.linkedinTitle}>Add your Teyro Score to LinkedIn!</h3>
              <p className={styles.linkedinSubtitle}>Showcase your learning journey and achievements.</p>
              {/* 3D Button GET STARTED */}
              <button 
                className={styles.btn3dBlue}
                onClick={() => { playHaptic('medium'); handleShareWhatsApp(); }}
              >
                GET STARTED
              </button>
            </div>
            <div className={styles.linkedinGraphic}>
              <Image 
                src="/User onbarding Assets/Step_14_image_desktop.webp" 
                alt="Teyro LinkedIn Mascot"
                fill
                sizes="260px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>


          {/* 5. ACHIEVEMENTS SECTION */}
          <div>
            <div className={styles.sectionHeader}>
              <span style={{ margin: 0 }}>Achievements</span>
              <span 
                className={styles.viewAllLink}
                onClick={() => { playHaptic('light'); setIsAchievementsModalOpen(true); }}
              >
                VIEW ALL
              </span>
            </div>

            <div className={styles.achievementsList}>
              {achievementsLoading ? (
                // Skeleton placeholders while loading
                [0, 1, 2].map((i) => (
                  <div key={i} className={styles.achievementItem} style={{ opacity: 0.5 }}>
                    <div className={styles.badgeLevelBox} style={{ backgroundColor: '#E2E8F0' }} />
                    <div className={styles.badgeDetails}>
                      <div style={{ height: 14, width: '60%', backgroundColor: '#E2E8F0', borderRadius: 6, marginBottom: 8 }} />
                      <div style={{ height: 14, width: '100%', backgroundColor: '#E2E8F0', borderRadius: 9999 }} />
                    </div>
                  </div>
                ))
              ) : (
                achievements.slice(0, 3).map((badge) => (
                  <div key={badge.id} className={styles.achievementItem}>
                    <div 
                      className={styles.badgeLevelBox} 
                      style={{ backgroundColor: badge.badgeBg }}
                    >
                      {renderBadgeIcon(badge)}
                      <span className={styles.badgeLevelTag}>LEVEL {badge.level}</span>
                    </div>

                    <div className={styles.badgeDetails}>
                      <div className={styles.badgeHeaderRow}>
                        <h3 className={styles.badgeTitle}>{badge.title}</h3>
                        {badge.isUnlocked && !badge.isClaimed ? (
                          <button
                            className={styles.claimBtn}
                            onClick={() => handleClaim(badge.id, badge.level, badge.title, badge.xpReward)}
                            disabled={claimingId === `${badge.id}-${badge.level}`}
                          >
                            {claimingId === `${badge.id}-${badge.level}` ? '...' : `+${badge.xpReward} XP`}
                          </button>
                        ) : (
                          <span className={styles.badgeProgressNum}>{badge.current}/{badge.target}</span>
                        )}
                      </div>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${Math.round((badge.current / badge.target) * 100)}%` }} />
                      </div>
                      <p className={styles.badgeSub}>{badge.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className={styles.rightSidebar}>
          {/* 1. FOLLOWING / FOLLOWERS TAB CARD */}
          <div className={`${styles.card} ${styles.socialTabsCard}`}>
            <div className={styles.tabHeader}>
              <button 
                className={`${styles.tabBtn} ${activeSocialTab === 'following' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveSocialTab('following')}
              >
                FOLLOWING
              </button>
              <button 
                className={`${styles.tabBtn} ${activeSocialTab === 'followers' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveSocialTab('followers')}
              >
                FOLLOWERS
              </button>
            </div>

            <div className={styles.socialTabBody}>
              <div className={styles.classmatesClusterGraphic}>
                <Image 
                  src="/User onbarding Assets/step_15_image_desktop.webp" 
                  alt="Classmates Group"
                  fill
                  sizes="300px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <p className={styles.socialTabCaption}>
                Learning is more fun and effective when you connect with others.
              </p>
            </div>
          </div>

            {/* 2. ADD FRIENDS CARD */}
            <div className={`${styles.card} ${styles.addFriendsCard}`}>
              <h3 className={styles.cardHeading}>Add friends</h3>

              <div className={styles.friendOptionRow} onClick={() => setIsClassmatesModalOpen(true)}>
                <div className={styles.friendOptionLeft}>
                  <div className={styles.friendIconBox}>
                    <Search size={18} color="#0172FD" />
                  </div>
                  <div className={styles.friendTextGroup}>
                    <span className={styles.friendTitle}>Find friends</span>
                    <span className={styles.friendSub}>Connect with others</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#94A3B8" />
              </div>

              <div className={styles.friendOptionRow} onClick={handleShareWhatsApp}>
                <div className={styles.friendOptionLeft}>
                  <div className={styles.friendIconBox} style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0', color: '#16A34A' }}>
                    <Gift size={18} />
                  </div>
                  <div className={styles.friendTextGroup}>
                    <span className={styles.friendTitle}>Invite friends</span>
                    <span className={styles.friendSub}>Earn rewards together</span>
                  </div>
                </div>
                <ChevronRight size={16} color="#94A3B8" />
              </div>
            </div>

          {/* 3. INVITE FRIENDS & EARN REWARDS BLUE CARD */}
          <div className={styles.inviteBlueCard}>
            <h3 className={styles.inviteBlueTitle}>Invite friends,<br />earn rewards!</h3>
            <p className={styles.inviteBlueSub}>
              You and your friend get 100 XP when they join Teyro.
            </p>

            {/* 3D Button INVITE NOW */}
            <button 
              className={styles.btn3dWhite}
              onClick={handleShareWhatsApp}
            >
              INVITE NOW
            </button>

            <div className={styles.inviteBlueGraphic}>
              <Image 
                src="/User onbarding Assets/Step_10_image.webp" 
                alt="Teyro Trophy Reward"
                fill
                sizes="120px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* 4. FOOTER LINKS & COPYRIGHT */}
          <div>
            <div className={styles.footerLinksRow}>
              <span className={styles.footerLink}>ABOUT</span>
              <span>·</span>
              <span className={styles.footerLink}>BLOG</span>
              <span>·</span>
              <span className={styles.footerLink}>STORE</span>
              <span>·</span>
              <span className={styles.footerLink}>CAREERS</span>
              <span>·</span>
              <span className={styles.footerLink}>INVESTORS</span>
              <span>·</span>
              <span className={styles.footerLink}>TERMS</span>
              <span>·</span>
              <span className={styles.footerLink}>PRIVACY</span>
            </div>

            <div className={styles.copyrightBlock}>
              <Image 
                src="/teyro-logo-blue.png" 
                alt="Teyro" 
                width={75} 
                height={22} 
                className={styles.teyroLogoFooter}
                style={{ width: 'auto', height: 'auto' }}
              />
              <span className={styles.copyrightText}>© 2026 Teyro. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}

      {/* EDIT PROFILE MODAL WITH PHOTO UPLOADER */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        size="md"
      >
        <div style={{ padding: '0.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', marginBottom: '1.25rem', textAlign: 'center' }}>
            Edit Profile
          </h2>

          {/* Hidden File Input for Avatar */}
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handleAvatarFileChange} 
          />

          {/* Avatar Photo Camera Upload Circle */}
          <div 
            className={styles.avatarUploadWrapper} 
            onClick={() => fileInputRef.current?.click()}
            title="Click to change profile photo"
          >
            {editAvatarInput ? (
              <img src={editAvatarInput} alt={editNameInput} className={styles.avatarUploadImage} />
            ) : (
              <div className={styles.avatarCircle} style={{ width: '100%', height: '100%', fontSize: '2rem' }}>
                {editNameInput ? editNameInput.charAt(0).toUpperCase() : 'U'}
              </div>
            )}

            {isUploadingAvatar ? (
              <div className={styles.avatarUploadSpinner}>
                <Loader2 size={24} className="animate-spin" />
              </div>
            ) : (
              <div className={styles.avatarUploadOverlay}>
                <Camera size={20} />
                <span>CHANGE</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                Display Name
              </label>
              <input 
                type="text"
                value={editNameInput}
                onChange={(e) => setEditNameInput(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '0.75rem',
                  border: '1.5px solid #CBD5E1',
                  padding: '0 1rem',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                Username
              </label>
              <input 
                type="text"
                value={editUsernameInput}
                onChange={(e) => setEditUsernameInput(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '0.75rem',
                  border: '1.5px solid #CBD5E1',
                  padding: '0 1rem',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                Bio / Headline
              </label>
              <textarea 
                value={editBioInput}
                onChange={(e) => setEditBioInput(e.target.value)}
                placeholder="Share a short bio with your classmates..."
                rows={3}
                style={{
                  width: '100%',
                  borderRadius: '0.75rem',
                  border: '1.5px solid #CBD5E1',
                  padding: '0.75rem 1rem',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setIsEditModalOpen(false)} style={{ flex: 1 }}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveProfile} style={{ flex: 1 }}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* CLASSMATES & FOLLOWERS MODAL */}
      <Modal
        isOpen={isClassmatesModalOpen}
        onClose={() => setIsClassmatesModalOpen(false)}
        size="md"
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: 0 }}>
            Classmates & Connections ({classmates.length})
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '0.25rem', marginBottom: '1rem' }}>
            Students sharing your enrolled courses. Follow friends to build your learning network!
          </p>

          <div className={styles.classmatesList}>
            {classmates.map((cm) => (
              <div key={cm.id} className={styles.classmateRow}>
                <div className={styles.classmateInfo}>
                  <Avatar src={cm.avatar} name={cm.name} size="sm" />
                  <div>
                    <h4 className={styles.classmateName}>{cm.name}</h4>
                    <p className={styles.classmateCourse}>{cm.course}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className={styles.classmateStreak}>
                    <Flame size={14} />
                    <span>{cm.streak}d streak</span>
                  </div>
                  <button
                    className={cm.isFollowing ? styles.followingBtn : styles.followBtn}
                    onClick={() => handleToggleFollow(cm.id, !!cm.isFollowing)}
                  >
                    {cm.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* ACHIEVEMENTS MODAL */}
      <Modal
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
        size="lg"
      >
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.5rem' }}>
            All Achievements
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Earn XP, maintain streaks, and complete lessons to unlock badges!
          </p>

          <div className={styles.achievementsList}>
            {achievements.map((badge) => (
              <div key={badge.id} className={styles.achievementItem}>
                <div 
                  className={styles.badgeLevelBox} 
                  style={{ backgroundColor: badge.badgeBg }}
                >
                  {renderBadgeIcon(badge)}
                  <span className={styles.badgeLevelTag}>LEVEL {badge.level}</span>
                </div>

                <div className={styles.badgeDetails}>
                  <div className={styles.badgeHeaderRow}>
                    <h3 className={styles.badgeTitle}>{badge.title}</h3>
                    {badge.isUnlocked && !badge.isClaimed ? (
                      <button
                        className={styles.claimBtn}
                        onClick={() => { handleClaim(badge.id, badge.level, badge.title, badge.xpReward); }}
                        disabled={claimingId === `${badge.id}-${badge.level}`}
                      >
                        {claimingId === `${badge.id}-${badge.level}` ? '...' : `CLAIM +${badge.xpReward} XP`}
                      </button>
                    ) : badge.isClaimed ? (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22C55E', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <CheckCircle2 size={14} /> Claimed
                      </span>
                    ) : (
                      <span className={styles.badgeProgressNum}>{badge.current}/{badge.target}</span>
                    )}
                  </div>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: `${Math.round((badge.current / badge.target) * 100)}%` }} />
                  </div>
                  <p className={styles.badgeSub}>{badge.description}</p>
                  {/* Level progression pill row */}
                  {badge.maxLevel > 1 && (
                    <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                      {Array.from({ length: badge.maxLevel }).map((_, i) => {
                        const lvl = i + 1;
                        const isUnlockedLvl = badge.unlockedLevels.some((u) => u.level === lvl);
                        const isClaimedLvl = badge.unlockedLevels.some((u) => u.level === lvl && u.claimed);
                        return (
                          <span
                            key={lvl}
                            style={{
                              fontSize: '0.6rem',
                              fontWeight: 800,
                              padding: '0.1rem 0.4rem',
                              borderRadius: 9999,
                              backgroundColor: isClaimedLvl ? badge.badgeBg : isUnlockedLvl ? '#FEF08A' : '#E2E8F0',
                              color: isClaimedLvl ? '#fff' : isUnlockedLvl ? '#713F12' : '#94A3B8',
                            }}
                          >
                            LVL {lvl}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
