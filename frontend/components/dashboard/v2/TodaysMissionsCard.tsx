'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { gsap } from 'gsap';
import { Clock, BookOpen, Sparkles, Check } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation, RewardCurrency } from '@/context/RewardAnimationContext';
import { GamificationIcon } from '@/components/ui/GamificationIcon';
import { usePathname } from 'next/navigation';
import { playHaptic } from '@/lib/haptics';
import { useHerald } from '@/context/HeraldContext';
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
  const { triggerRewardAnimation } = useRewardAnimation();
  const pathname = usePathname();
  const { enqueueHeraldNotification, registerNativeWidget, unregisterNativeWidget } = useHerald();

  // Register this widget as visible — Herald suppresses its banner when this card is on screen
  useEffect(() => {
    registerNativeWidget('mission-card');
    return () => unregisterNativeWidget('mission-card');
  }, [registerNativeWidget, unregisterNativeWidget]);

  const [missions, setMissions] = useState<MissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [shakingId, setShakingId] = useState<string | null>(null);
  const [activeParticle, setActiveParticle] = useState<{ id: string; text: string } | null>(null);
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
        setMissions(prev => {
          const next = prev.map(m => {
            const update = updatedList.find((u: any) => u.userMissionId === m.id);
            if (update) {
              const isDone = update.progress >= update.target || update.status === 'COMPLETED';

              // Herald signal: mission just became claimable
              if (isDone && !m.isCompleted && !m.isClaimed) {
                const transitionKey = `${m.id}-${Math.floor(Date.now() / 60000)}`;
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

  // GSAP Flying Coin / XP particle animation to top nav balance pill
  const animateRewardFlight = (cardElement: HTMLElement | null, rewardType: string) => {
    if (typeof window === 'undefined') return;

    const targetId = rewardType === 'XP' ? 'stat-pill-gem' : 'stat-pill-coin';
    const targetElem = document.getElementById(targetId);

    const particle = document.createElement('img');
    particle.src = rewardType === 'XP' ? '/Icons/gem.png' : '/Icons/Coin.png';
    particle.style.position = 'fixed';
    particle.style.width = '32px';
    particle.style.height = '32px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';

    // Starting position from button/card
    const startRect = cardElement ? cardElement.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 32, height: 32 };
    const startX = startRect.left + startRect.width / 2 - 16;
    const startY = startRect.top + 10;

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    document.body.appendChild(particle);

    // Target position top navbar
    const endRect = targetElem ? targetElem.getBoundingClientRect() : { left: window.innerWidth - 120, top: 20 };
    const endX = endRect.left + 10;
    const endY = endRect.top + 10;

    // Curved bezier flight timeline using GSAP
    gsap.timeline({
      onComplete: () => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        // Scale bump on top nav balance pill target upon arrival
        if (targetElem) {
          gsap.timeline()
            .to(targetElem, { scale: 1.25, duration: 0.15, ease: 'power2.out' })
            .to(targetElem, { scale: 1, duration: 0.25, ease: 'bounce.out' });
        }
      },
    })
      .to(particle, {
        duration: 0.75,
        x: endX - startX,
        y: endY - startY,
        scale: 1.2,
        rotation: 360,
        ease: 'power2.inOut',
      })
      .to(particle, { opacity: 0, duration: 0.15 }, '-=0.15');
  };

  // Trigger All 3 Missions Claimed Celebration
  const triggerCelebration = () => {
    setShowCelebrationBanner(true);
    playHaptic('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Claim Mission Reward Handler
  const handleClaim = async (missionItem: MissionItem, e: React.MouseEvent<HTMLButtonElement>) => {
    playHaptic('medium');
    setClaimingId(missionItem.id);

    const buttonTarget = e.currentTarget;

    if (missionItem.id.startsWith('m')) {
      await fetchMissions();
      return;
    }

    try {
      const endpoint = `/api/v2/missions/${missionItem.id}/claim`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = res.headers.get('content-type')?.includes('application/json')
        ? await res.json()
        : {};

      if (res.ok && data.success) {
        playHaptic('success');

        const rewardCurrency = missionItem.reward.type === 'GEMS' ? 'COINS' : (missionItem.reward.type as RewardCurrency);
        triggerRewardAnimation({
          originElement: buttonTarget,
          rewards: [{ currency: rewardCurrency, amount: missionItem.reward.amount }],
        });

        setActiveParticle({
          id: missionItem.id,
          text: `+${missionItem.reward.amount} ${rewardCurrency}! 🎉`,
        });

        setTimeout(() => setActiveParticle(null), 1400);

        // Permanently lock local mission state to claimed
        setMissions((prev) => {
          const updated = prev.map((m) =>
            m.id === missionItem.id
              ? { ...m, isClaimed: true, isCompleted: true, status: 'CLAIMED' as const }
              : m,
          );

          // Check if all 3 missions are now claimed
          const allClaimed = updated.every((m) => m.isClaimed || m.status === 'CLAIMED');
          if (allClaimed || data.allMissionsClaimed) {
            setTimeout(() => {
              triggerCelebration();
              triggerRewardAnimation({
                originElement: buttonTarget,
                rewards: [{ currency: 'COINS', amount: 15 }],
              });
            }, 800);
          }

          return updated;
        });

        // Refresh global balance context in navbar
        if (refresh) {
          await refresh();
        }
      } else if (res.status === 410) {
        // Mission expired — refetch today's missions set
        setShakingId(missionItem.id);
        setTimeout(() => setShakingId(null), 500);
        await fetchMissions();
      } else if (res.status === 409 || data.error === 'ALREADY_CLAIMED') {
        setMissions((prev) =>
          prev.map((m) =>
            m.id === missionItem.id
              ? { ...m, isClaimed: true, isCompleted: true, status: 'CLAIMED' as const }
              : m,
          ),
        );
      } else {
        setShakingId(missionItem.id);
        setTimeout(() => setShakingId(null), 500);
      }
    } catch (err) {
      console.error('Error claiming mission reward:', err);
      setShakingId(missionItem.id);
      setTimeout(() => setShakingId(null), 500);
    } finally {
      setClaimingId(null);
    }
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
          <Sparkles size={20} color="#0172FD" />
          <h2 className={styles.sectionTitle}>TODAY&apos;S MISSIONS</h2>
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
            const isClaiming = claimingId === m.id;
            const isShaking = shakingId === m.id;
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
                {/* Floating Reward Particle */}
                {activeParticle?.id === m.id && (
                  <div className={styles.particlePopup}>{activeParticle.text}</div>
                )}

                <div className={`${styles.iconWrap} ${iconClass}`}>{icon}</div>
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

                <div className={styles.rewardRow}>
                  <span className={styles.rewardBadge}>
                    <Image src={getRewardIcon(displayRewardType)} alt={displayRewardType} width={15} height={15} />
                    +{m.reward.amount} {displayRewardType}
                  </span>
                </div>

                {/* Mission Action / Claim Button / Permanent Claimed Label */}
                {isClaimed ? (
                  <span className={styles.claimedTag}>
                    <Check size={16} /> Claimed ✓
                  </span>
                ) : isCompleted ? (
                  <button
                    type="button"
                    onClick={(e) => handleClaim(m, e)}
                    disabled={isClaiming}
                    className={`${styles.claimBtn3D} ${isShaking ? styles.claimBtnShake : ''}`}
                  >
                    {isClaiming ? 'Claiming...' : 'CLAIM REWARD'}
                  </button>
                ) : (
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#94A3B8', marginTop: '0.25rem' }}>
                    In Progress
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
