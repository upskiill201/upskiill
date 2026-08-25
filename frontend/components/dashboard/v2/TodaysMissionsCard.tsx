'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Clock, BookOpen, Check, ArrowRight } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { usePathname } from 'next/navigation';
import { GamificationIcon } from '@/components/ui/GamificationIcon';
import { playHaptic } from '@/lib/haptics';
import { useHerald } from '@/context/HeraldContext';
import { useCelebration } from '@/context/CelebrationContext';
import { toCelebrationCurrency, type CelebrationCurrency } from '@/components/celebration/currency';
import styles from './TodaysMissionsCard.module.css';

interface MissionReward {
  type: 'XP' | 'COINS' | 'GEMS';
  amount: number;
}

interface MissionItem {
  id: string;
  title: string;
  objectiveType: string;
  currentProgress: number;
  targetValue: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'CLAIMED' | 'EXPIRED';
  isCompleted: boolean;
  isClaimed: boolean;
  reward: MissionReward;
}

// Fallback mission data matching updated backend default templates
const getFallbackMissions = (): MissionItem[] => [
  {
    id: 'm1',
    title: 'Complete 1 lesson',
    objectiveType: 'LESSON_COUNT',
    currentProgress: 0,
    targetValue: 1,
    status: 'IN_PROGRESS',
    isCompleted: false,
    isClaimed: false,
    reward: { type: 'XP', amount: 20 },
  },
  {
    id: 'm2',
    title: 'Earn 20 XP',
    objectiveType: 'XP_EARNED',
    currentProgress: 10,
    targetValue: 20,
    status: 'IN_PROGRESS',
    isCompleted: false,
    isClaimed: false,
    reward: { type: 'COINS', amount: 10 },
  },
  {
    id: 'm3',
    title: 'Stay on your streak',
    objectiveType: 'STREAK_ACTIVE',
    currentProgress: 1,
    targetValue: 1,
    status: 'COMPLETED',
    isCompleted: true,
    isClaimed: false,
    reward: { type: 'COINS', amount: 5 },
  },
];

export default function TodaysMissionsCard() {
  const { refresh } = useGamification();
  const { celebrate } = useCelebration();
  const pathname = usePathname();
  const { enqueueHeraldNotification, registerNativeWidget, unregisterNativeWidget } = useHerald();

  // Register this widget as visible — Herald suppresses its banner when this card is on screen
  useEffect(() => {
    registerNativeWidget('mission-card');
    return () => unregisterNativeWidget('mission-card');
  }, [registerNativeWidget, unregisterNativeWidget]);

  const [missions, setMissions] = useState<MissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [resetTimer, setResetTimer] = useState('12h 45m');
  const [isWarningReset, setIsWarningReset] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Countdown timer to midnight in user's local timezone
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      const diffMs = nextMidnight.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setResetTimer(`${hours}h ${mins}m`);
      // Highlight reset timer in warning mode if under 1 hour remains
      setIsWarningReset(hours < 1);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Today's Missions from backend API
  const fetchMissions = useCallback(async () => {
    try {
      setLoading(true);
      const offset = new Date().getTimezoneOffset();
      const endpoint = `/api/v2/missions/today?timezoneOffset=${offset}`;

      const res = await fetch(endpoint, {
        credentials: 'include',
        cache: 'no-store', // Fix: prevent Next.js from returning stale cached missions
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.missions) && data.missions.length > 0) {
          setMissions(data.missions);

          // Check if all missions are already claimed
          const allClaimed = data.missions.every((m: MissionItem) => m.isClaimed || m.status === 'CLAIMED');
          setShowCelebrationBanner(allClaimed);
          return;
        }
      }
      setMissions(getFallbackMissions());
    } catch (err) {
      console.error('Failed to fetch today missions:', err);
      setMissions(getFallbackMissions());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMissions();
    
    const handleFocus = () => fetchMissions();
    const handleMissionRefresh = () => fetchMissions();
    
    const handleMissionUpdate = (e: any) => {
      const updatedList = e.detail;
      if (updatedList && Array.isArray(updatedList)) {
        // Same local-day bucket HeraldContext.checkClaimables uses, so both
        // producers dedupe against one session key (no double banners).
        const now = new Date();
        const localDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
          now.getDate()
        ).padStart(2, '0')}`;
        setMissions(prev => {
          const next = prev.map(m => {
            const update = updatedList.find((u: any) => u.userMissionId === m.id);
            if (update) {
              const isDone = update.progress >= update.target || update.status === 'COMPLETED';

              // Herald signal: mission just became claimable
              if (isDone && !m.isCompleted && !m.isClaimed) {
                const transitionKey = `mission-${m.id}-${localDay}`;
                const rewardType = m.reward.type === 'GEMS' ? 'COINS' : m.reward.type as 'XP' | 'COINS';
                enqueueHeraldNotification({
                  id: `herald-mission-${m.id}-${Date.now()}`,
                  type: 'MISSION',
                  entityId: m.id,
                  transitionKey,
                  title: m.title,
                  subtitle: `+${m.reward.amount} ${rewardType}`,
                  rewardType,
                  rewardAmount: m.reward.amount,
                  missionId: m.id,
                });
              }

              return {
                ...m,
                currentProgress: update.progress,
                targetValue: update.target,
                status: update.status,
                isCompleted: isDone
              };
            }
            return m;
          });
          return next;
        });
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);
    window.addEventListener('mission:refresh', handleMissionRefresh);
    window.addEventListener('missions:updated', handleMissionUpdate);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      window.removeEventListener('mission:refresh', handleMissionRefresh);
      window.removeEventListener('missions:updated', handleMissionUpdate);
    };
  }, [fetchMissions, pathname]);

  // Claim Mission Reward Handler — full-page Celebration Engine sequence:
  // QUEST scene (mission rows + shine on the completed one) → CLAIM scene
  // (server-first claim, then Tey's toss-into-balance choreography).
  const handleClaim = (missionItem: MissionItem) => {
    playHaptic('medium');
    const currency = toCelebrationCurrency(missionItem.reward.type);
    celebrate([
      {
        kind: 'QUEST',
        headline: 'Mission complete!',
        subhead: `Daily Mission: "${missionItem.title}"`,
        ctaText: 'CLAIM',
        rows: missions.map((m) => ({
          id: m.id,
          label: m.title,
          current: m.id === missionItem.id ? m.targetValue : m.currentProgress,
          target: m.targetValue,
          highlight: m.id === missionItem.id,
          reward: { currency: toCelebrationCurrency(m.reward.type), amount: m.reward.amount },
        })),
      },
      {
        kind: 'CLAIM',
        title: `+${missionItem.reward.amount} ${currency}`,
        subtitle: `Daily Mission: "${missionItem.title}" Completed!`,
        rewards: [{ currency, amount: missionItem.reward.amount }],
        claim: async () => {
          // Let failures propagate — the scene degrades to an error state
          // instead of celebrating a reward that was never persisted.
          const res = await fetch(
            `/api/v2/missions/${missionItem.id}/claim?timezoneOffset=${new Date().getTimezoneOffset()}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            }
          );
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body?.message || 'Could not claim this mission.');
          }
          const data: {
            userBalances?: { xp?: number; coins?: number };
          } = await res.json().catch(() => ({}));
          window.dispatchEvent(new CustomEvent('mission:refresh'));
          await refresh();
          // Exact post-claim balances drive the count-up — the backend also
          // pays a +15 coin bonus when this was the last unclaimed mission.
          const balances: Partial<Record<CelebrationCurrency, number>> = {};
          if (typeof data?.userBalances?.xp === 'number') balances.XP = data.userBalances.xp;
          if (typeof data?.userBalances?.coins === 'number') balances.COINS = data.userBalances.coins;
          return balances;
        },
        onComplete: () => void fetchMissions(),
      },
    ]);
  };

  /**
   * Official Teyro Icon Rules:
   * - Streak Icon: /Icons/burn.png
   * - XP Icon: /Icons/gem.png
   */
  const getMissionIcon = (type: string, title: string) => {
    const titleLower = title.toLowerCase();
    if (type === 'STREAK_ACTIVE' || titleLower.includes('streak')) {
      return {
        icon: <Image src="/Icons/burn.png" alt="Streak" width={28} height={28} style={{ objectFit: 'contain' }} />,
        iconClass: styles.iconRed,
      };
    }
    if (type === 'XP_EARNED' || titleLower.includes('xp')) {
      return {
        icon: <Image src="/Icons/gem.png" alt="XP Points" width={28} height={28} style={{ objectFit: 'contain' }} />,
        iconClass: styles.iconYellow,
      };
    }
    return {
      icon: <BookOpen size={24} className="text-[#0172FD]" />,
      iconClass: styles.iconBlue,
    };
  };

  const getRewardIcon = (rewardType: string) => {
    if (rewardType === 'COINS' || rewardType === 'GEMS') return '/Icons/Coin.png';
    return '/Icons/gem.png'; // Default for XP
  };

  return (
    <div ref={containerRef} className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h2 className={styles.sectionTitle}>DAILY MISSIONS</h2>
        </div>
        <div className={`${styles.resetTimer} ${isWarningReset ? styles.resetTimerWarning : ''}`}>
          <Clock size={15} />
          <span>Resets in {resetTimer}</span>
        </div>
      </div>

      {/* All 3 Missions Claimed Celebratory Banner */}
      {showCelebrationBanner && (
        <div className={styles.allClaimedBanner}>
          <span className={styles.allClaimedText}>
            <GamificationIcon type="burn" size={22} />
            All 3 missions claimed today! You&apos;re on fire! 🔥
          </span>
        </div>
      )}

      <div className={styles.missionsGrid}>
        {loading && missions.length === 0 ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={styles.missionCard}
              style={{ opacity: 0.6 }}
            >
              <div className={`${styles.iconWrap} ${styles.skeleton}`} />
              <div className={styles.skeleton} style={{ height: 16, width: '70%', borderRadius: 4 }} />
              <div className={styles.skeleton} style={{ height: 12, width: '100%', borderRadius: 9999 }} />
            </div>
          ))
        ) : (
          missions.map((m) => {
            const pct = Math.min(100, Math.round((m.currentProgress / m.targetValue) * 100));
            const { icon, iconClass } = getMissionIcon(m.objectiveType, m.title);
            const isClaimed = m.isClaimed || m.status === 'CLAIMED';
            const isCompleted = m.isCompleted || m.status === 'COMPLETED' || m.currentProgress >= m.targetValue;
            const isReadyToClaim = isCompleted && !isClaimed;
            const displayRewardType = m.reward.type === 'GEMS' ? 'COINS' : m.reward.type;

            return (
              <div
                key={m.id}
                onMouseEnter={() => playHaptic('light')}
                className={[
                  styles.missionCard,
                  isReadyToClaim ? styles.missionCardReady : '',
                  isClaimed ? styles.missionCardClaimed : '',
                ].join(' ')}
              >
                <div className={`${styles.iconWrap} ${iconClass}`}>{icon}</div>

                <div className={styles.missionContent}>
                  <h3 className={styles.missionTitle}>{m.title}</h3>

                  {/* Tactile 3D Progress Bar */}
                  <div className={styles.progressContainer}>
                    <div className={styles.progressTrack3D}>
                      <div
                        className={[
                          styles.progressFill3D,
                          isCompleted ? styles.progressFillCompleted : '',
                        ].join(' ')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className={styles.progressText}>
                      {m.currentProgress} / {m.targetValue}
                    </span>
                  </div>
                </div>

                <div className={styles.missionActionCol}>
                  <div className={styles.rewardRow}>
                    <span className={styles.rewardBadge}>
                      <Image src={getRewardIcon(displayRewardType)} alt={displayRewardType} width={14} height={14} />
                      +{m.reward.amount} {displayRewardType}
                    </span>
                  </div>

                  {/* Mission Action / Claim Button / Permanent Claimed Label */}
                  {isClaimed ? (
                    <span className={styles.claimedTag}>
                      <Check size={14} strokeWidth={3} /> Claimed
                    </span>
                  ) : isCompleted ? (
                    <button
                      type="button"
                      onClick={() => handleClaim(m)}
                      className={`${styles.claimBtn3D}`}
                    >
                      CLAIM
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8' }}>
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className={styles.unlockBanner}>
        <span className={styles.unlockBannerText}>Complete all quests to unlock chest!</span>
        <div className={styles.unlockBannerIcon}>
          <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}
