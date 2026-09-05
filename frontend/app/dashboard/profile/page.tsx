'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Flame,
  Star,
  ChevronDown,
  ChevronRight,
  Edit3,
  Calendar,
  Search,
  Gift,
  Copy,
  Check,
  Info,
  CheckCircle2,
  Camera,
  Loader2,
  MapPin,
  Settings as SettingsIcon,
  KeyRound,
  Volume2,
  Music,
  LogOut,
  AlertTriangle,
  Trash2,
  Headphones,
  BookCheck,
  CalendarCheck,
  Trophy,
  Zap,
  Lock,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import CosmeticFrame from '@/components/cosmetics/CosmeticFrame';
import CosmeticBackdrop from '@/components/cosmetics/CosmeticBackdrop';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { StatsBar } from '@/components/ui/StatsBar';
import { useGamification } from '@/context/GamificationContext';
import { useAudio } from '@/lib/audio/useAudio';
import { playHaptic } from '@/lib/haptics';
import { getCachedUser, setCachedUser, clearCachedUser } from '@/lib/user-cache';
import { markAchievementSeen } from '@/lib/achievements';
import { BadgeGlyph, BADGE_UNITS } from '@/components/achievements/badgeArt';
import styles from './Profile.module.css';

interface Classmate {
  id: string;
  name: string;
  avatar: string | null;
  course?: string;
  streak?: number;
  isFollowing?: boolean;
}

// ── Achievement collection types — mirror backend AchievementsService ──
// Achievements are pure milestones: the badge itself is the reward, so a tier
// carries no currency payload — only its name, goal and unlock state.

interface AchievementTier {
  level: number;
  target: number;
  name: string;
  description: string;
  isUnlocked: boolean;
  /** Unlocked but not yet viewed — renders the NEW ribbon until seen. */
  isNew: boolean;
  unlockedAt: string | null;
}

// One tiered badge family (Wildfire, Sage, Champion, Sharpshooter, Explorer, Marathon)
interface AchievementData {
  id: string;
  title: string;
  category: string;
  badgeBg: string;
  currentMetricVal: number;
  currentTier: number;
  maxTier: number;
  isCompleted: boolean;
  nextTarget: number;
  nextDescription: string;
  tiers: AchievementTier[];
}

interface AchievementTotals {
  unlocked: number;
  total: number;
}

// Live stats block returned alongside the cards — feeds the Statistics row
interface ProfileMetrics {
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  lessonsCompleted: number;
  firstTryCorrectAnswers: number;
  coursesEnrolled: number;
  daysStudied: number;
}

// Daily goal tiers — mirrors the backend's dailyGoalXp validation (20|50|100|200)
const DAILY_GOALS = [
  { value: 20, label: 'Casual', tagline: 'A little every day' },
  { value: 50, label: 'Regular', tagline: 'Build a solid habit' },
  { value: 100, label: 'Serious', tagline: 'Stay locked in' },
  { value: 200, label: 'Intense', tagline: 'All-in, no excuses' },
] as const;

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,30}$/;

const COUNTRIES = [
  'Algeria', 'Argentina', 'Australia', 'Bangladesh', 'Brazil', 'Canada',
  'China', 'Colombia', 'Egypt', 'Ethiopia', 'France', 'Germany', 'Ghana',
  'India', 'Indonesia', 'Italy', 'Japan', 'Kenya', 'Malaysia', 'Mexico',
  'Morocco', 'Nepal', 'Netherlands', 'Nigeria', 'Pakistan', 'Peru',
  'Philippines', 'Poland', 'Russia', 'Rwanda', 'Saudi Arabia', 'Senegal',
  'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden',
  'Switzerland', 'Tanzania', 'Thailand', 'Turkey', 'Uganda', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam',
  'Zambia', 'Zimbabwe',
];

type UsernameStatus = 'idle' | 'invalid' | 'checking' | 'available' | 'taken';
type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export default function StudentProfilePage() {
  const { streakDays, xp } = useGamification();
  const { isSfxEnabled, setSfxEnabled, isMusicEnabled, setMusicEnabled } = useAudio();

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState<string>('');
  const [dailyGoalXp, setDailyGoalXp] = useState<number>(20);
  const [joinedDate, setJoinedDate] = useState('Joined recently');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [followingCount, setFollowingCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [activeSocialTab, setActiveSocialTab] = useState<'following' | 'followers'>('following');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isClassmatesModalOpen, setIsClassmatesModalOpen] = useState(false);
  // Tap-to-inspect achievement tile (badge family + tier)
  const [achievementDetail, setAchievementDetail] = useState<{
    badge: AchievementData;
    tier: AchievementTier;
  } | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Editable form inputs
  const [editNameInput, setEditNameInput] = useState('');
  const [editUsernameInput, setEditUsernameInput] = useState('');
  const [editBioInput, setEditBioInput] = useState('');
  const [editCountryInput, setEditCountryInput] = useState('');
  const [editDailyGoalInput, setEditDailyGoalInput] = useState<number>(20);
  const [editAvatarInput, setEditAvatarInput] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save + username availability states
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');
  const [usernameMessage, setUsernameMessage] = useState('');

  // Danger zone state
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Social data state (real data only — skeletons while loading, empty state when none)
  const [classmates, setClassmates] = useState<Classmate[]>([]);
  const [followingList, setFollowingList] = useState<Classmate[]>([]);
  const [followersList, setFollowersList] = useState<Classmate[]>([]);
  const [socialLoading, setSocialLoading] = useState(true);

  useEffect(() => {
    // Hydrate cached profile on client mount safely to prevent SSR hydration mismatch
    const cached = getCachedUser();
    if (cached?.fullName) {
      setDisplayName(cached.fullName);
      setEditNameInput(cached.fullName);
    }
    if (cached?.email) setEmail(cached.email);
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
        }
        if (data.email) setEmail(data.email);

        // Prefer the stored @handle; fall back to the email prefix
        const storedUsername = data.profile?.username || data.email?.split('@')[0];
        if (storedUsername && !username) {
          setUsername(storedUsername);
          setEditUsernameInput(storedUsername);
        }

        if (data.avatarUrl !== undefined && data.avatarUrl !== null) {
          setAvatarUrl(data.avatarUrl);
          setEditAvatarInput(data.avatarUrl);
        }
        if (data.profile?.bio) {
          setBio(data.profile.bio);
          setEditBioInput(data.profile.bio);
        }
        if (data.profile?.location) {
          setCountry(data.profile.location);
          setEditCountryInput(data.profile.location);
        }
        if (data.studentProfile?.dailyGoalXp) {
          setDailyGoalXp(data.studentProfile.dailyGoalXp);
          setEditDailyGoalInput(data.studentProfile.dailyGoalXp);
        }
        if (data.followersCount !== undefined) setFollowersCount(data.followersCount);
        if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
        if (data.createdAt) {
          const date = new Date(data.createdAt);
          const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          setJoinedDate(`Joined ${monthNames[date.getMonth()]} ${date.getFullYear()}`);
        }
        setCachedUser(data);
      }
    } catch (err) {
      console.error('Failed loading profile data', err);
    }
  }, [username]);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        if (Array.isArray(data)) setClassmates(data);
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
    } finally {
      setSocialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSocialData();
  }, [fetchSocialData]);

  // ── USERNAME LIVE AVAILABILITY CHECK (debounced) ──
  useEffect(() => {
    if (!isEditModalOpen) return;
    const candidate = editUsernameInput.trim().toLowerCase().replace(/^@/, '');

    if (!candidate || candidate === username) {
      setUsernameStatus('idle');
      setUsernameMessage('');
      return;
    }
    if (!USERNAME_PATTERN.test(candidate)) {
      setUsernameStatus('invalid');
      setUsernameMessage('3-30 characters, letters, numbers and underscores only.');
      return;
    }

    setUsernameStatus('checking');
    setUsernameMessage('Checking availability…');

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/profile/check-username/${encodeURIComponent(candidate)}`,
          { credentials: 'include' }
        );
        if (res.ok) {
          const data = await res.json();
          setUsernameStatus(data.available ? 'available' : 'taken');
          setUsernameMessage(data.message || (data.available ? `@${candidate} is available!` : 'Username is already taken.'));
        } else {
          setUsernameStatus('idle');
          setUsernameMessage('');
        }
      } catch {
        setUsernameStatus('idle');
        setUsernameMessage('');
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [editUsernameInput, isEditModalOpen, username]);

  // Achievements — the milestone collection, live from the backend (no client
  // fallback; skeletons cover loading and a retry banner covers failures).
  const [achievements, setAchievements] = useState<AchievementData[]>([]);
  const [totals, setTotals] = useState<AchievementTotals | null>(null);
  const [metrics, setMetrics] = useState<ProfileMetrics | null>(null);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [achievementsError, setAchievementsError] = useState<string | null>(null);

  // Fetch the live collection from the backend via /api rewrite proxy
  const fetchAchievements = useCallback(async () => {
    try {
      setAchievementsLoading(true);
      setAchievementsError(null);
      const res = await fetch('/api/gamification/achievements', {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error(`Achievements request failed (${res.status})`);
      }
      const data = await res.json();
      if (!Array.isArray(data.achievements)) {
        throw new Error('Unexpected achievements response');
      }
      setAchievements(data.achievements);
      // Server-computed totals, with a client-side fallback for older payloads
      if (data.totals) {
        setTotals(data.totals);
      } else {
        const allTiers = data.achievements.flatMap((a: AchievementData) => a.tiers);
        setTotals({
          unlocked: allTiers.filter((t: AchievementTier) => t.isUnlocked).length,
          total: allTiers.length,
        });
      }
      if (data.metrics) setMetrics(data.metrics);
    } catch (err) {
      console.error('Failed loading achievements from API', err);
      setAchievementsError('Could not load your achievements.');
    } finally {
      setAchievementsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  // Every tier is one collectible tile — badge registry order, then level.
  const collection = useMemo(
    () => achievements.flatMap((badge) => badge.tiers.map((tier) => ({ badge, tier }))),
    [achievements]
  );

  const formatUnlockDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  /** Progress toward a specific tier's target, capped at the target itself. */
  const tierProgress = (badge: AchievementData, tier: AchievementTier) =>
    Math.min(badge.currentMetricVal, tier.target);

  // Tap a tile → detail modal. Viewing an unseen unlock clears its NEW ribbon
  // locally and marks it seen so Herald stops surfacing it.
  const openAchievementDetail = (badge: AchievementData, tier: AchievementTier) => {
    playHaptic('light');
    setAchievementDetail({ badge, tier });
    if (tier.isUnlocked && tier.isNew) {
      setAchievements((prev) =>
        prev.map((b) =>
          b.id !== badge.id
            ? b
            : { ...b, tiers: b.tiers.map((t) => (t.level === tier.level ? { ...t, isNew: false } : t)) }
        )
      );
      markAchievementSeen(badge.id, tier.level).then((ok) => {
        if (ok) window.dispatchEvent(new CustomEvent('achievement:refresh'));
      });
    }
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
        const errData = await res.json().catch(() => ({}));
        setSaveError(errData.error || 'Failed uploading photo. Try a JPG or PNG under 5MB.');
        setSaveState('error');
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Toggle Follow / Unfollow — re-syncs all three lists from the server
  const handleToggleFollow = async (targetUserId: string, isCurrentlyFollowing: boolean) => {
    playHaptic('light');
    try {
      const endpoint = `/api/social/${isCurrentlyFollowing ? 'unfollow' : 'follow'}/${targetUserId}`;
      const res = await fetch(endpoint, {
        method: isCurrentlyFollowing ? 'DELETE' : 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.followingCount !== undefined) setFollowingCount(data.followingCount);
        if (data.followersCount !== undefined) setFollowersCount(data.followersCount);
        fetchSocialData();
      }
    } catch (err) {
      console.error('Failed toggling follow status', err);
    }
  };

  const handleSaveProfile = async () => {
    playHaptic('medium');
    setSaveState('saving');
    setSaveError(null);

    // Block saving an unavailable/invalid handle
    if (usernameStatus === 'taken' || usernameStatus === 'checking') {
      setSaveState('error');
      setSaveError(usernameMessage || 'That username is not available.');
      return;
    }

    try {
      const candidateUsername = editUsernameInput.trim().toLowerCase().replace(/^@/, '');
      const body: Record<string, unknown> = {
        fullName: editNameInput.trim(),
        bio: editBioInput.trim(),
        location: editCountryInput || '',
        dailyGoalXp: editDailyGoalInput,
      };
      if (candidateUsername && candidateUsername !== username) {
        body.username = candidateUsername;
      }
      if (editAvatarInput && editAvatarInput !== avatarUrl) {
        body.avatarUrl = editAvatarInput;
      }

      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setSaveState('saved');
        playHaptic('success');
        if (data.profile?.username) setUsername(data.profile.username);
        setDisplayName(data.fullName ?? editNameInput.trim());
        setBio(data.profile?.bio ?? '');
        setCountry(data.profile?.location ?? editCountryInput);
        setDailyGoalXp(data.studentProfile?.dailyGoalXp ?? editDailyGoalInput);
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
        setCachedUser(data);
        setTimeout(() => {
          setIsEditModalOpen(false);
          setSaveState('idle');
        }, 900);
        return;
      }

      const errData = await res.json().catch(() => ({}));
      const rawMessage = errData.message;
      const friendly = Array.isArray(rawMessage) ? rawMessage[0] : rawMessage;
      setSaveState('error');
      setSaveError(friendly || 'Could not save your changes. Please try again.');
    } catch (err) {
      console.error('Failed updating profile', err);
      setSaveState('error');
      setSaveError('Network error — check your connection and try again.');
    }
  };

  // ── SETTINGS MODAL ACTIONS ──
  const handleLogout = async () => {
    clearCachedUser();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore network errors — still redirect
    }
    window.location.href = '/login';
  };

  const openDeleteConfirmation = () => {
    playHaptic('medium');
    setDeleteConfirmText('');
    setDeleteError(null);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch('/api/profile', { method: 'DELETE', credentials: 'include' });
      if (res.ok) {
        clearCachedUser();
        window.location.href = '/';
        return;
      }
      const errData = await res.json().catch(() => ({}));
      setDeleteError(errData.message || 'Could not delete your account. Please try again.');
    } catch (err) {
      console.error('Failed deleting account', err);
      setDeleteError('Network error — please try again.');
    } finally {
      setIsDeleting(false);
    }
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

  // Collection tile — unlocked tiers show their full-color medal and unlock
  // date; locked tiers are greyed silhouettes with a lock pin and live
  // progress toward that tier's goal. Achievements carry no currency reward —
  // the medal IS the reward.
  const renderCollectionTile = (badge: AchievementData, tier: AchievementTier) => {
    const isLocked = !tier.isUnlocked;
    const unit = BADGE_UNITS[badge.id as keyof typeof BADGE_UNITS] ?? 'points';
    const progress = tierProgress(badge, tier);
    return (
      <button
        key={`${badge.id}_${tier.level}`}
        type="button"
        className={`${styles.achvTile} ${isLocked ? styles.achvTileLocked : ''}`}
        onClick={() => openAchievementDetail(badge, tier)}
        aria-label={
          isLocked
            ? `${tier.name} — locked. ${progress} of ${tier.target} ${unit}`
            : `${tier.name} — unlocked`
        }
      >
        {tier.isNew && <span className={styles.achvNewChip}>NEW</span>}

        <div
          className={`${styles.achvMedal} ${isLocked ? styles.achvMedalLocked : ''}`}
          style={
            isLocked
              ? undefined
              : {
                  background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 42%), ${badge.badgeBg}`,
                }
          }
        >
          <BadgeGlyph badgeId={badge.id} size={26} color={isLocked ? '#94A3B8' : '#FFFFFF'} />
          {isLocked && (
            <span className={styles.achvLockPin}>
              <Lock size={10} strokeWidth={3} />
            </span>
          )}
        </div>

        <span className={`${styles.achvTileName} ${isLocked ? styles.achvTileNameLocked : ''}`}>
          {tier.name}
        </span>

        {isLocked ? (
          <>
            <span className={styles.achvTileProgress}>
              {progress.toLocaleString()} / {tier.target.toLocaleString()} {unit}
            </span>
            <div className={styles.achvMiniTrack}>
              <div
                className={styles.achvMiniFill}
                style={{ width: `${Math.round((progress / Math.max(1, tier.target)) * 100)}%` }}
              />
            </div>
          </>
        ) : (
          <span className={styles.achvTileDate}>
            {tier.unlockedAt ? formatUnlockDate(tier.unlockedAt) : 'Unlocked'}
          </span>
        )}
      </button>
    );
  };

  const activeTabList = activeSocialTab === 'following' ? followingList : followersList;

  // Statistics values — live context for streak/XP, backend metrics for the rest.
  const statsLoading = achievementsLoading && metrics === null;
  const statBoxes = [
    {
      key: 'streak',
      icon: <Image src="/Icons/burn.png" width={22} height={22} alt="" className={styles.statIconImg} />,
      value: streakDays ?? 0,
      label: 'Day Streak',
      pill: null as string | null,
    },
    {
      key: 'longest',
      icon: <Trophy size={20} color="#F59E0B" />,
      value: metrics?.longestStreak ?? 0,
      label: 'Longest Streak',
      pill: 'PERSONAL BEST',
    },
    {
      key: 'xp',
      icon: <Image src="/Icons/gem.png" width={22} height={22} alt="" className={styles.statIconImg} />,
      value: xp ?? 0,
      label: 'Total XP',
      pill: null,
    },
    {
      key: 'lessons',
      icon: <BookCheck size={20} color="#0172FD" />,
      value: metrics?.lessonsCompleted ?? 0,
      label: 'Lessons Done',
      pill: null,
    },
    {
      key: 'days',
      icon: <CalendarCheck size={20} color="#8B5CF6" />,
      value: metrics?.daysStudied ?? 0,
      label: 'Days Studied',
      pill: null,
    },
  ];

  // Reusable person row for the sidebar tabs
  const renderPersonRow = (person: Classmate) => (
    <div key={person.id} className={styles.personRow}>
      <div className={styles.personInfo}>
        <Avatar src={person.avatar || undefined} name={person.name} size="sm" />
        <div>
          <h4 className={styles.personName}>{person.name}</h4>
          <p className={styles.personSub}>
            <Flame size={11} /> {person.streak ?? 0}d streak
          </p>
        </div>
      </div>
      <button
        className={person.isFollowing ? styles.followingBtn : styles.followBtn}
        onClick={() => handleToggleFollow(person.id, !!person.isFollowing)}
      >
        {person.isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );

  return (
    <div className={styles.pageContainer}>
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
                {displayName ? `${displayName}!` : <span className="inline-block w-28 h-6 bg-slate-200 animate-pulse rounded-md align-middle my-1" />}
              </h2>
              <p className={styles.welcomeSubtitle}>
                Consistency today,<br />
                mastery tomorrow.
              </p>
            </div>
          </div>

          {/* 2. USER IDENTITY PROFILE SECTION (No container box border, matches UI design) */}
          {/* Wrapped in the equipped shop backdrop — renders as-is when the
              learner owns none, so the layout is unchanged by default. */}
          <CosmeticBackdrop>
          <div className={styles.identityCard}>
            <div className={styles.identityMainRow}>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                {/* Avatar with star badge */}
                <div className={styles.avatarWrapper}>
                  {/* Renders the equipped shop frame around the avatar, or
                      the avatar untouched when nothing is equipped. */}
                  <CosmeticFrame>
                    {avatarUrl ? (
                      <Avatar src={avatarUrl || undefined} name={displayName || 'User'} size="lg" />
                    ) : (
                      <div className={styles.avatarCircle}>
                        {displayName ? displayName.charAt(0).toUpperCase() : <span className="inline-block w-6 h-6 bg-slate-200 animate-pulse rounded-full" />}
                      </div>
                    )}
                  </CosmeticFrame>
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
                    <SettingsIcon
                      size={15}
                      className={styles.pencilIcon}
                      aria-label="Open settings"
                      onClick={() => { playHaptic('light'); setIsSettingsModalOpen(true); }}
                    />
                  </div>
                  <div className={styles.joinedRow}>
                    <Calendar size={14} />
                    <span>{joinedDate}</span>
                  </div>
                  {country && (
                    <div className={styles.joinedRow}>
                      <MapPin size={14} />
                      <span>{country}</span>
                    </div>
                  )}
                  {bio && <p className={styles.bioLine}>{bio}</p>}
                </div>
              </div>

              {/* Settings gear + Edit pencil on Right */}
              <div className={styles.identityRightMeta}>
                <button
                  className={styles.settingsChip}
                  onClick={() => { playHaptic('light'); setIsSettingsModalOpen(true); }}
                  aria-label="Open settings"
                >
                  <SettingsIcon size={16} />
                  <span>SETTINGS</span>
                </button>
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
          </CosmeticBackdrop>

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


          {/* 4. STATISTICS — LIVE LEARNING NUMBERS (DUOLINGO-STYLE STAT BOXES) */}
          <div>
            <div className={styles.sectionHeader}>
              <span style={{ margin: 0 }}>Statistics</span>
            </div>

            <div className={styles.statsRow}>
              {statBoxes.map((box) => (
                <div key={box.key} className={styles.statCard}>
                  <div className={styles.statCardTop}>
                    <span className={styles.statIconWrapper}>{box.icon}</span>
                    <div className={styles.statValueGroup}>
                      {statsLoading ? (
                        <span className={`${styles.statNum} ${styles.statNumSkeleton}`}>&nbsp;</span>
                      ) : (
                        <span className={styles.statNum}>{box.value.toLocaleString()}</span>
                      )}
                      <span className={styles.statLbl}>{box.label}</span>
                    </div>
                  </div>
                  {box.pill && (
                    <span className={`${styles.statFooterPill} ${styles.statPillOrange}`}>{box.pill}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. ACHIEVEMENTS — PERMANENT MILESTONE COLLECTION */}
          <div id="achievements">
            <div className={styles.sectionHeader}>
              <span style={{ margin: 0 }}>Achievements</span>
              {!achievementsLoading && totals && (
                <span className={styles.achvUnlockedPill}>
                  {totals.unlocked} / {totals.total} unlocked
                </span>
              )}
            </div>

            {achievementsLoading ? (
              // Skeleton tiles while loading
              <div className={styles.achvGrid}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`${styles.achvTile} ${styles.achvTileLocked}`} style={{ pointerEvents: 'none' }}>
                    <div className={`${styles.achvMedal} ${styles.achvMedalLocked}`} />
                    <div style={{ height: 12, width: '55%', backgroundColor: '#E2E8F0', borderRadius: 6 }} />
                  </div>
                ))}
              </div>
            ) : achievementsError ? (
              // Error state with retry
              <div className={styles.achievementError}>
                <AlertTriangle size={16} />
                <span>{achievementsError}</span>
                <button className={styles.retryBtn} onClick={fetchAchievements}>RETRY</button>
              </div>
            ) : (
              // The collection — every tier, locked silhouettes included,
              // so learners can see what's left to earn.
              <div className={styles.achvGrid}>
                {collection.map(({ badge, tier }) => renderCollectionTile(badge, tier))}
              </div>
            )}
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
                FOLLOWING ({followingList.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeSocialTab === 'followers' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveSocialTab('followers')}
              >
                FOLLOWERS ({followersList.length})
              </button>
            </div>

            <div className={styles.socialTabBody}>
              {socialLoading ? (
                // Skeleton rows while loading
                [0, 1].map((i) => (
                  <div key={i} className={styles.personRow}>
                    <div className={styles.personInfo}>
                      <div className={styles.skeletonCircle} />
                      <div style={{ flex: 1 }}>
                        <div className={styles.skeletonLine} style={{ width: '70%' }} />
                        <div className={styles.skeletonLine} style={{ width: '45%' }} />
                      </div>
                    </div>
                  </div>
                ))
              ) : activeTabList.length > 0 ? (
                <div className={styles.personList}>
                  {activeTabList.slice(0, 4).map(renderPersonRow)}
                  {activeTabList.length > 4 && (
                    <button
                      className={styles.viewAllPeopleLink}
                      onClick={() => setIsClassmatesModalOpen(true)}
                    >
                      VIEW ALL {activeTabList.length}
                    </button>
                  )}
                </div>
              ) : (
                <>
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
                    Learning is more fun when you connect with others.
                  </p>
                </>
              )}
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

            <div className={styles.inviteActionsRow}>
              {/* 3D Button INVITE NOW */}
              <button
                className={styles.btn3dWhite}
                onClick={handleShareWhatsApp}
              >
                INVITE NOW
              </button>
              <button
                className={styles.copyLinkBtn}
                onClick={handleCopyInviteLink}
                aria-label="Copy invite link"
              >
                {copiedToast ? <Check size={16} color="#22C55E" /> : <Copy size={16} />}
              </button>
            </div>

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

      {/* EDIT PROFILE MODAL WITH PHOTO UPLOADER, GOAL PICKER & COUNTRY */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => { if (saveState !== 'saving') setIsEditModalOpen(false); }}
        title="Edit Profile"
        size="md"
      >
        <div style={{ padding: '0.25rem' }}>
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
              <label className={styles.formLabel}>Display Name</label>
              <input
                type="text"
                value={editNameInput}
                maxLength={100}
                onChange={(e) => setEditNameInput(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div>
              <label className={styles.formLabel}>Username</label>
              <input
                type="text"
                value={editUsernameInput}
                maxLength={30}
                onChange={(e) => setEditUsernameInput(e.target.value)}
                className={`${styles.formInput} ${
                  usernameStatus === 'available' ? styles.inputSuccess :
                  usernameStatus === 'taken' || usernameStatus === 'invalid' ? styles.inputError : ''
                }`}
              />
              {usernameMessage && (
                <p className={
                  usernameStatus === 'available' ? styles.hintAvailable :
                  usernameStatus === 'taken' || usernameStatus === 'invalid' ? styles.hintTaken :
                  styles.hintNeutral
                }>
                  {usernameStatus === 'checking' && <Loader2 size={12} className="animate-spin" />}
                  {usernameStatus === 'available' && <Check size={12} />}
                  {(usernameStatus === 'taken' || usernameStatus === 'invalid') && <AlertTriangle size={12} />}
                  <span>{usernameStatus === 'available' ? `@${editUsernameInput.replace(/^@/, '')} is available` : usernameMessage}</span>
                </p>
              )}
            </div>

            <div>
              <label className={styles.formLabel}>
                Bio / Headline
                <span className={styles.charCounter}>{editBioInput.length}/300</span>
              </label>
              <textarea
                value={editBioInput}
                onChange={(e) => setEditBioInput(e.target.value.slice(0, 300))}
                placeholder="Share a short bio with your classmates..."
                rows={3}
                maxLength={300}
                className={styles.formTextarea}
              />
            </div>

            <div>
              <label className={styles.formLabel}>Country</label>
              <select
                value={editCountryInput}
                onChange={(e) => setEditCountryInput(e.target.value)}
                className={styles.formSelect}
              >
                <option value="">Not specified</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Daily goal picker — Duolingo-style commitment tiers */}
            <div>
              <label className={styles.formLabel}>Daily Goal</label>
              <div className={styles.goalGrid}>
                {DAILY_GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    className={`${styles.goalCard} ${editDailyGoalInput === goal.value ? styles.goalCardSelected : ''}`}
                    onClick={() => { setEditDailyGoalInput(goal.value); playHaptic('light'); }}
                  >
                    <span className={styles.goalValue}>{goal.value}</span>
                    <span className={styles.goalUnit}>XP / DAY</span>
                    <span className={styles.goalLabel}>{goal.label.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              <p className={styles.goalTagline}>
                {DAILY_GOALS.find((g) => g.value === editDailyGoalInput)?.tagline}
              </p>
            </div>

            {saveState === 'error' && saveError && (
              <div className={styles.saveErrorBanner}>
                <AlertTriangle size={16} />
                <span>{saveError}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Button variant="secondary" onClick={() => setIsEditModalOpen(false)} style={{ flex: 1 }}>
                Cancel
              </Button>
              <button
                className={`${styles.btnSave3d} ${saveState === 'saved' ? styles.btnSaveSaved : ''}`}
                onClick={handleSaveProfile}
                disabled={saveState === 'saving' || usernameStatus === 'taken' || usernameStatus === 'checking'}
              >
                {saveState === 'saving' && <Loader2 size={16} className="animate-spin" />}
                {saveState === 'saved' && <Check size={16} />}
                {saveState === 'saving' ? 'SAVING…' : saveState === 'saved' ? 'SAVED!' : 'SAVE CHANGES'}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* SETTINGS MODAL — ACCOUNT / PREFERENCES / DANGER ZONE */}
      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Settings"
        size="md"
      >
        <div className={styles.settingsBody}>
          {/* ACCOUNT */}
          <div className={styles.settingsSectionLabel}>Account</div>
          <div className={styles.settingsGroup}>
            <div className={styles.settingsRow}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#F0F7FF', color: '#0172FD' }}>
                <Info size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Email</span>
                <span className={styles.settingsRowSub}>{email || 'Not available'}</span>
              </div>
            </div>

            <Link href="/forgot-password" className={styles.settingsRow} style={{ textDecoration: 'none' }}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#FFF7ED', color: '#FF9600' }}>
                <KeyRound size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Password</span>
                <span className={styles.settingsRowSub}>Change via email reset link</span>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </Link>

            <div className={styles.settingsRow}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#F8FAFC', color: '#64748B' }}>
                <Calendar size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Member since</span>
                <span className={styles.settingsRowSub}>{joinedDate.replace('Joined ', '')}</span>
              </div>
            </div>
          </div>

          {/* PREFERENCES */}
          <div className={styles.settingsSectionLabel}>Preferences</div>
          <div className={styles.settingsGroup}>
            <button
              className={styles.settingsRow}
              onClick={() => { playHaptic('light'); setIsSettingsModalOpen(false); setIsEditModalOpen(true); }}
            >
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#FEF9C3', color: '#EAB308' }}>
                <Zap size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Daily goal</span>
                <span className={styles.settingsRowSub}>{dailyGoalXp} XP per day · {DAILY_GOALS.find(g => g.value === dailyGoalXp)?.label}</span>
              </div>
              <span className={styles.rowActionLink}>EDIT</span>
            </button>

            <div className={styles.settingsRow}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#F0FDF4', color: '#58CC02' }}>
                <Volume2 size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Sound effects</span>
                <span className={styles.settingsRowSub}>Button clicks and correct-answer chimes</span>
              </div>
              <button
                className={`${styles.toggleSwitch} ${isSfxEnabled ? styles.toggleOn : ''}`}
                role="switch"
                aria-checked={isSfxEnabled}
                aria-label="Toggle sound effects"
                onClick={(e) => { e.stopPropagation(); setSfxEnabled(!isSfxEnabled); playHaptic('light'); }}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            <div className={styles.settingsRow}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#FFF7ED', color: '#FF9600' }}>
                <Music size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Background music</span>
                <span className={styles.settingsRowSub}>Ambient loops while you learn</span>
              </div>
              <button
                className={`${styles.toggleSwitch} ${isMusicEnabled ? styles.toggleOn : ''}`}
                role="switch"
                aria-checked={isMusicEnabled}
                aria-label="Toggle background music"
                onClick={(e) => { e.stopPropagation(); setMusicEnabled(!isMusicEnabled); playHaptic('light'); }}
              >
                <span className={styles.toggleKnob} />
              </button>
            </div>

            <Link href="/audio-settings" className={styles.settingsRow} style={{ textDecoration: 'none' }}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#ECFEFF', color: '#06B6D4' }}>
                <Headphones size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Audio settings</span>
                <span className={styles.settingsRowSub}>Volumes, individual sounds and more</span>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </Link>
          </div>

          {/* DANGER ZONE */}
          <div className={styles.settingsSectionLabelDanger}>Danger Zone</div>
          <div className={`${styles.settingsGroup} ${styles.dangerGroup}`}>
            <button className={styles.settingsRow} onClick={handleLogout}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#F8FAFC', color: '#64748B' }}>
                <LogOut size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={styles.settingsRowTitle}>Log out</span>
                <span className={styles.settingsRowSub}>End this session on this device</span>
              </div>
              <ChevronRight size={16} color="#94A3B8" />
            </button>

            <button className={styles.settingsRow} onClick={openDeleteConfirmation}>
              <div className={styles.settingsRowIcon} style={{ backgroundColor: '#FEF2F2', color: '#EF4444' }}>
                <Trash2 size={17} />
              </div>
              <div className={styles.settingsRowText}>
                <span className={`${styles.settingsRowTitle} ${styles.dangerText}`}>Delete account</span>
                <span className={styles.settingsRowSub}>Permanently erase all your data</span>
              </div>
              <ChevronRight size={16} color="#EF4444" />
            </button>
          </div>
        </div>
      </Modal>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => { if (!isDeleting) setIsDeleteModalOpen(false); }}
        title="Delete Account"
        size="sm"
      >
        <div>
          <div className={styles.deleteWarningBanner}>
            <AlertTriangle size={20} />
            <div>
              <strong>This cannot be undone.</strong>
              <p>
                Deleting your account permanently erases your profile, streaks,
                XP, coins, enrollments and progress. There is no recovery.
              </p>
            </div>
          </div>

          <label className={styles.formLabel} htmlFor="delete-confirm-input">
            Type DELETE to confirm
          </label>
          <input
            id="delete-confirm-input"
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value.toUpperCase())}
            placeholder="DELETE"
            className={`${styles.formInput} ${styles.deleteInput}`}
            autoComplete="off"
          />

          {deleteError && (
            <div className={styles.saveErrorBanner} style={{ marginTop: '0.75rem' }}>
              <AlertTriangle size={16} />
              <span>{deleteError}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} style={{ flex: 1 }}>
              Cancel
            </Button>
            <button
              className={styles.btnDelete3d}
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== 'DELETE' || isDeleting}
            >
              {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              {isDeleting ? 'DELETING…' : 'DELETE FOREVER'}
            </button>
          </div>
        </div>
      </Modal>

      {/* CLASSMATES & FOLLOWERS MODAL */}
      <Modal
        isOpen={isClassmatesModalOpen}
        onClose={() => setIsClassmatesModalOpen(false)}
        title={`Classmates & Connections (${classmates.length})`}
        size="md"
      >
        <div>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: 0, marginBottom: '1rem' }}>
            Students sharing your enrolled courses. Follow friends to build your learning network!
          </p>

          {socialLoading ? (
            <div className={styles.classmatesList}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles.personRow}>
                  <div className={styles.personInfo}>
                    <div className={styles.skeletonCircle} />
                    <div style={{ flex: 1 }}>
                      <div className={styles.skeletonLine} style={{ width: '60%' }} />
                      <div className={styles.skeletonLine} style={{ width: '40%' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : classmates.length === 0 ? (
            <div className={styles.emptyStateBlock}>
              <div className={styles.emptyStateGraphic}>
                <Image
                  src="/User onbarding Assets/step_15_image_desktop.webp"
                  alt="No classmates yet"
                  fill
                  sizes="220px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h4 className={styles.emptyStateTitle}>No classmates yet</h4>
              <p className={styles.emptyStateText}>
                Enroll in a course to find students learning alongside you.
              </p>
              <Link href="/dashboard/explore" className={styles.btn3dBlueEmptyState}>
                EXPLORE COURSES
              </Link>
            </div>
          ) : (
            <div className={styles.classmatesList}>
              {classmates.map((cm) => (
                <div key={cm.id} className={styles.classmateRow}>
                  <div className={styles.classmateInfo}>
                    <Avatar src={cm.avatar || undefined} name={cm.name} size="sm" />
                    <div>
                      <h4 className={styles.classmateName}>{cm.name}</h4>
                      <p className={styles.classmateCourse}>{cm.course}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className={styles.classmateStreak}>
                      <Flame size={14} />
                      <span>{cm.streak ?? 0}d streak</span>
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
          )}
        </div>
      </Modal>

      {/* ACHIEVEMENT DETAIL MODAL — one collectible, plus its badge-family ladder */}
      <Modal
        isOpen={achievementDetail !== null}
        onClose={() => setAchievementDetail(null)}
        title="Achievement"
        size="sm"
      >
        {achievementDetail && (() => {
          const { badge, tier } = achievementDetail;
          const unit = BADGE_UNITS[badge.id as keyof typeof BADGE_UNITS] ?? 'points';
          const progress = tierProgress(badge, tier);
          const nextLockedLevel = badge.tiers.find((t) => !t.isUnlocked)?.level ?? null;
          return (
            <div>
              {/* Hero medallion + identity */}
              <div className={styles.achvDetailHero}>
                <div
                  className={`${styles.achvDetailMedal} ${!tier.isUnlocked ? styles.achvMedalLocked : ''}`}
                  style={
                    tier.isUnlocked
                      ? {
                          background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35) 0%, transparent 42%), ${badge.badgeBg}`,
                        }
                      : undefined
                  }
                >
                  <BadgeGlyph badgeId={badge.id} size={40} color={tier.isUnlocked ? '#FFFFFF' : '#94A3B8'} />
                </div>
                <h2 className={styles.achvDetailName}>{tier.name}</h2>
                <span className={styles.achvDetailCategory}>
                  {badge.title} · Tier {tier.level} of {badge.maxTier}
                </span>
                <p className={styles.achvDetailDesc}>{tier.description}</p>

                {tier.isUnlocked ? (
                  <span className={`${styles.achvStatusRow} ${styles.achvStatusUnlocked}`}>
                    <CheckCircle2 size={15} />
                    Unlocked {tier.unlockedAt ? formatUnlockDate(tier.unlockedAt) : ''}
                  </span>
                ) : (
                  <div className={styles.achvProgressBlock}>
                    <div className={styles.achvTrack}>
                      <div
                        className={styles.achvFill}
                        style={{ width: `${Math.round((progress / Math.max(1, tier.target)) * 100)}%` }}
                      />
                    </div>
                    <span className={styles.achvProgressCaption}>
                      Progress: {progress.toLocaleString()} / {tier.target.toLocaleString()} {unit}
                    </span>
                  </div>
                )}
              </div>

              {/* Badge-family ladder — every tier of this medal */}
              <h4 className={styles.achvLadderLabel}>{badge.title} collection</h4>
              <div className={styles.achvLadder}>
                {badge.tiers.map((t) => {
                  const isNext = !t.isUnlocked && t.level === nextLockedLevel;
                  return (
                    <div
                      key={t.level}
                      className={`${styles.achvLadderRow} ${
                        t.isUnlocked
                          ? styles.achvLadderRowUnlocked
                          : isNext
                            ? styles.achvLadderRowNext
                            : ''
                      }`}
                    >
                      <span
                        className={`${styles.achvLadderDot} ${!t.isUnlocked ? styles.achvLadderDotLocked : ''}`}
                        style={t.isUnlocked ? { backgroundColor: badge.badgeBg } : undefined}
                      >
                        {t.isUnlocked ? (
                          <Check size={11} strokeWidth={3.5} />
                        ) : (
                          <Lock size={10} strokeWidth={3} />
                        )}
                      </span>
                      <div className={styles.achvLadderMain}>
                        <span className={styles.achvLadderName}>{t.name}</span>
                        <span className={styles.achvLadderDesc}>{t.description}</span>
                      </div>
                      {t.isUnlocked ? (
                        <span className={`${styles.achvLadderState} ${styles.achvLadderStateUnlocked}`}>
                          {t.unlockedAt ? formatUnlockDate(t.unlockedAt) : 'Unlocked'}
                        </span>
                      ) : isNext ? (
                        <span className={styles.achvLadderState}>
                          {progress.toLocaleString()} / {t.target.toLocaleString()}
                        </span>
                      ) : (
                        <span className={styles.achvLadderState}>
                          <Lock size={11} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
