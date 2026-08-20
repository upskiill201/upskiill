'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  MoreHorizontal,
  BadgeCheck,
  Crown,
  Users,
  BookOpen,
  Star,
  UserPlus,
  UserCheck,
  Play,
  ArrowRight,
  ChevronRight,
  GraduationCap,
  MapPin,
  Globe,
  Trophy,
  Gem,
  Code2,
  AlertCircle
} from 'lucide-react';
import { FaJs, FaPython, FaReact, FaNodeJs } from 'react-icons/fa6';
import styles from './CreatorProfile.module.css';

interface CreatorCourse {
  id: string;
  slug: string;
  title: string;
  description?: string;
  level: string;
  lessonsCount: number;
  studentsCount: number;
  rating: number;
  category: string;
  thumbnailUrl?: string | null;
  iconType?: string;
}

interface CreatorAchievement {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface CreatorProfileData {
  id: string;
  fullName: string;
  username: string;
  avatarUrl: string;
  isVerified: boolean;
  creatorStatus: string;
  headline: string;
  bio: string;
  about: string;
  location: string;
  languages: string[];
  skills: string[];
  yearsOfExperience: number;
  followersCount: number;
  followingCount: number;
  coursesCount: number;
  learnersCount: number;
  rating: number;
  isFollowing: boolean;
  featuredCourse: CreatorCourse | null;
  courses: CreatorCourse[];
  achievements: CreatorAchievement[];
}

export default function CreatorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const rawUsername = typeof params?.username === 'string' ? params.username : '';

  const [creator, setCreator] = useState<CreatorProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  useEffect(() => {
    async function loadCreator() {
      if (!rawUsername) {
        setIsLoading(false);
        setNotFound(true);
        return;
      }

      try {
        setIsLoading(true);
        setNotFound(false);
        const res = await fetch(`/api/profile/creator/${encodeURIComponent(rawUsername)}`);
        if (res.ok) {
          const data = await res.json();
          setCreator(data);
          setIsFollowing(data.isFollowing || false);
          setFollowersCount(data.followersCount || 0);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Failed to load creator profile:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadCreator();
  }, [rawUsername]);

  const handleToggleFollow = async () => {
    if (!creator || isFollowLoading) return;
    try {
      setIsFollowLoading(true);
      const newStatus = !isFollowing;
      setIsFollowing(newStatus);
      setFollowersCount((prev) => (newStatus ? prev + 1 : Math.max(0, prev - 1)));

      const res = await fetch(`/api/profile/follow/${encodeURIComponent(creator.id)}`, {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isFollowing !== undefined) {
          setIsFollowing(data.isFollowing);
          if (data.followersCount !== undefined) {
            setFollowersCount(data.followersCount);
          }
        }
      }
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    } finally {
      setIsFollowLoading(false);
    }
  };

  const getSkillLabel = (skill: any): string => {
    if (!skill) return '';
    if (typeof skill === 'string') return skill;
    if (typeof skill === 'object' && skill !== null) {
      return skill.name || skill.skill || skill.title || skill.label || '';
    }
    return String(skill || '');
  };

  const renderSkillIcon = (skill: any) => {
    const label = getSkillLabel(skill);
    const s = label.toLowerCase();
    if (s.includes('javascript') || s === 'js') {
      return (
        <div className={`${styles.skillIconWrap} ${styles.iconJs}`}>
          <FaJs size={11} />
        </div>
      );
    }
    if (s.includes('python')) {
      return (
        <div className={`${styles.skillIconWrap} ${styles.iconPython}`}>
          <FaPython size={11} />
        </div>
      );
    }
    if (s.includes('react')) {
      return (
        <div className={`${styles.skillIconWrap} ${styles.iconReact}`}>
          <FaReact size={11} />
        </div>
      );
    }
    if (s.includes('typescript') || s === 'ts') {
      return <div className={`${styles.skillIconWrap} ${styles.iconTs}`}>TS</div>;
    }
    if (s.includes('node')) {
      return (
        <div className={`${styles.skillIconWrap} ${styles.iconNode}`}>
          <FaNodeJs size={11} />
        </div>
      );
    }
    return (
      <div className={`${styles.skillIconWrap} ${styles.iconCode}`}>
        <Code2 size={11} />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={styles.pageWrap}>
        <div className={styles.container} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div className="w-8 h-8 border-3 border-[#0172FD] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (notFound || !creator) {
    return (
      <div className={styles.pageWrap}>
        <div className={styles.container}>
          <div className={styles.topNav}>
            <button className={styles.navBtn} onClick={() => router.back()} aria-label="Go back">
              <ChevronLeft size={20} />
            </button>
          </div>
          <div className={styles.notFoundWrap}>
            <AlertCircle size={44} className="text-[#94A3B8]" />
            <h1 className={styles.notFoundTitle}>Creator Not Found</h1>
            <p className={styles.notFoundDesc}>
              We couldn&apos;t find a creator profile for &ldquo;{rawUsername}&rdquo;. The creator might have changed their username or doesn&apos;t exist.
            </p>
            <Link href="/explore" className={styles.exploreBtn}>
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const featured = creator.featuredCourse;
  const firstName = creator.fullName.split(' ')[0];

  return (
    <div className={styles.pageWrap}>
      <div className={styles.container}>
        {/* ── TOP NAV BAR ── */}
        <div className={styles.topNav}>
          <button className={styles.navBtn} onClick={() => router.back()} aria-label="Go back">
            <ChevronLeft size={20} />
          </button>
          <button
            className={styles.navBtn}
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: `${creator.fullName} - Teyro Creator Profile`,
                    url: window.location.href,
                  })
                  .catch(() => {});
              }
            }}
            aria-label="More options"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* ── RESPONSIVE DESKTOP / MOBILE LAYOUT ── */}
        <div className={styles.desktopLayout}>
          {/* LEFT SIDEBAR / HERO SECTION */}
          <div className={styles.sidebarCol}>
            <div className={styles.heroCardDesktop}>
              <div className={styles.avatarWrap}>
                <Image
                  src={
                    creator.avatarUrl ||
                    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(creator.fullName)}`
                  }
                  alt={creator.fullName}
                  width={110}
                  height={110}
                  className={styles.avatarImg}
                  unoptimized
                />
              </div>

              <div className={styles.heroContent}>
                <div className={styles.nameRow}>
                  <h1 className={styles.creatorName}>{creator.fullName}</h1>
                  {creator.isVerified && <BadgeCheck size={18} className={styles.verifiedBadge} />}
                </div>

                <p className={styles.creatorHeadline}>{creator.headline}</p>

                {creator.creatorStatus === 'founding_creator' && (
                  <div className={styles.foundingBadge}>
                    <Crown size={12} />
                    <span>Founding Creator</span>
                  </div>
                )}

                <p className={styles.creatorBio}>{creator.bio}</p>
              </div>
            </div>

            {/* ── STATS BAR CARD ── */}
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <Users size={14} className={styles.statIcon} />
                  <span className={styles.statValue}>
                    {creator.learnersCount >= 1000
                      ? `${(creator.learnersCount / 1000).toFixed(1).replace('.0', '')}K`
                      : creator.learnersCount}
                  </span>
                </div>
                <span className={styles.statLabel}>Learners</span>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <BookOpen size={14} className={styles.statIcon} />
                  <span className={styles.statValue}>{creator.coursesCount}</span>
                </div>
                <span className={styles.statLabel}>Courses</span>
              </div>

              <div className={styles.statItem}>
                <div className={styles.statHeader}>
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className={styles.statValue}>{creator.rating}</span>
                </div>
                <span className={styles.statLabel}>Rating</span>
              </div>

              <button
                className={`${styles.followBtn} ${isFollowing ? styles.followingActive : ''}`}
                onClick={handleToggleFollow}
                disabled={isFollowLoading}
              >
                {isFollowing ? (
                  <>
                    <UserCheck size={14} />
                    <span className={styles.followBtnText}>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    <span className={styles.followBtnText}>Follow</span>
                  </>
                )}
              </button>
            </div>

            {/* ── ABOUT CARD (IN SIDEBAR ON DESKTOP) ── */}
            <div className={styles.aboutCard}>
              <div className={styles.cardHeadRow}>
                <h3 className={styles.cardHeadTitle}>About</h3>
              </div>
              <p className={styles.aboutText}>
                {isAboutExpanded || creator.about.length <= 130
                  ? creator.about
                  : `${creator.about.slice(0, 130)}...`}
              </p>
              {creator.about.length > 130 && (
                <button
                  className={styles.readMoreBtn}
                  onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                >
                  {isAboutExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>

            {/* ── FOOTER INFO STRIP ── */}
            <div className={styles.footerInfoStrip}>
              <div className={styles.footerInfoItem}>
                <GraduationCap size={15} className={styles.footerInfoIcon} />
                <span>{creator.yearsOfExperience}+ Years Experience</span>
              </div>

              <div className={styles.footerInfoItem}>
                <MapPin size={15} className={styles.footerInfoIcon} />
                <span>{creator.location}</span>
              </div>

              <div className={styles.footerInfoItem}>
                <Globe size={15} className={styles.footerInfoIcon} />
                <span>{creator.languages.join(' · ')}</span>
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT AREA */}
          <div className={styles.mainContentCol}>
            {/* ── WHAT I TEACH ── */}
            <div className={styles.skillsSection}>
              <h2 className={styles.sectionTitle}>What I teach</h2>
              <div className={styles.skillsGrid}>
                {creator.skills.map((skill, i) => {
                  const label = getSkillLabel(skill);
                  if (!label) return null;
                  return (
                    <div key={i} className={`${styles.skillPill} ${i === 0 ? styles.skillPrimary : ''}`}>
                      {renderSkillIcon(skill)}
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── FEATURED COURSE CARD ── */}
            {featured && (
              <div className={styles.featuredCard}>
                <div className={styles.featuredTop}>
                  <div className={styles.featuredVisual}>
                    <div className={styles.featuredVisualInner}>
                      <Code2 size={26} className="text-[#0172FD]" />
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className={styles.playCircle}>
                      <Play size={10} className="fill-white translate-x-0.5" />
                    </div>
                  </div>

                  <div className={styles.featuredInfo}>
                    <span className={styles.featuredPill}>Featured Course</span>
                    <h3 className={styles.featuredTitle}>{featured.title}</h3>
                    {featured.description && (
                      <p className={styles.featuredDesc}>{featured.description}</p>
                    )}

                    <div className={styles.featuredMeta}>
                      <span className={styles.metaItem}>
                        <Star size={11} className="text-amber-500 fill-amber-500" />
                        {featured.rating}
                      </span>
                      <span>•</span>
                      <span className={styles.metaItem}>
                        <Users size={11} className="text-[#0172FD]" />
                        {featured.studentsCount >= 1000
                          ? `${(featured.studentsCount / 1000).toFixed(1).replace('.0', '')}K learners`
                          : `${featured.studentsCount} learners`}
                      </span>
                      <span>•</span>
                      <span>{featured.level}</span>
                    </div>
                  </div>
                </div>

                <Link href={`/courses/${featured.slug || featured.id}`} className={styles.startBtn}>
                  <span>Start Learning</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            )}

            {/* ── COURSES BY CREATOR ── */}
            {creator.courses.length > 0 && (
              <div className={styles.coursesSection}>
                <div className={styles.sectionHeaderRow}>
                  <h2 className={styles.sectionTitle}>Courses by {firstName}</h2>
                  <Link
                    href={`/explore?creator=${encodeURIComponent(creator.username)}`}
                    className={styles.viewAllLink}
                  >
                    <span>View all</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>

                <div className={styles.coursesList}>
                  {creator.courses.map((c) => (
                    <Link
                      key={c.id}
                      href={`/courses/${c.slug || c.id}`}
                      className={styles.courseItemCard}
                    >
                      <div
                        className={`${styles.courseThumb} ${
                          c.iconType === 'js'
                            ? styles.thumbJs
                            : c.iconType === 'python'
                            ? styles.thumbPython
                            : styles.thumbGeneral
                        }`}
                      >
                        {c.iconType === 'js' ? (
                          <FaJs size={22} />
                        ) : c.iconType === 'python' ? (
                          <FaPython size={22} />
                        ) : c.iconType === 'react' ? (
                          <FaReact size={22} />
                        ) : (
                          <Code2 size={22} />
                        )}
                      </div>

                      <div className={styles.courseItemInfo}>
                        <h3 className={styles.courseItemTitle}>{c.title}</h3>
                        <span className={styles.courseItemSub}>
                          {c.level} • {c.lessonsCount} lessons
                        </span>
                        <div className={styles.courseItemMeta}>
                          <span className="flex items-center gap-1">
                            <Star size={10} className="text-amber-500 fill-amber-500" />
                            {c.rating}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users size={10} className="text-[#0172FD]" />
                            {c.studentsCount >= 1000
                              ? `${(c.studentsCount / 1000).toFixed(1).replace('.0', '')}K learners`
                              : `${c.studentsCount} learners`}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={16} className={styles.courseItemChevron} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── ACHIEVEMENTS CARD ── */}
            <div className={styles.achievementsCard}>
              <div className={styles.cardHeadRow}>
                <h3 className={styles.cardHeadTitle}>Achievements</h3>
                <span className={styles.viewAllLink}>View all</span>
              </div>

              <div className={styles.achievementsList}>
                {creator.achievements.map((ach) => (
                  <div key={ach.id} className={styles.achievementBadge}>
                    <div
                      className={`${styles.achievementIconWrap} ${
                        ach.color === 'purple'
                          ? styles.badgePurple
                          : ach.color === 'amber'
                          ? styles.badgeAmber
                          : styles.badgeBlue
                      }`}
                    >
                      {ach.icon === 'diamond' ? (
                        <Gem size={18} />
                      ) : ach.icon === 'users' ? (
                        <Users size={18} />
                      ) : (
                        <Trophy size={18} />
                      )}
                    </div>
                    <span className={styles.achievementLabel}>{ach.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

