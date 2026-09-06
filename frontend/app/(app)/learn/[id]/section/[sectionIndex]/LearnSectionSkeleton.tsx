'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Skeleton from '@/components/ui/Skeleton';
import styles from './SectionView.module.css';

export default function LearnSectionSkeleton() {
  // Generate 5 dummy map items to show the serpentine path
  const dummyNodes = [0, 1, 2, 3, 4];

  const getSerpentineMultiplier = (index: number) => {
    const period = index % 8;
    switch (period) {
      case 0: return 0;      // Center
      case 1: return 2.2;    // Right
      case 2: return 3.6;    // Extreme Right
      case 3: return 2.2;    // Right
      case 4: return 0;      // Center
      case 5: return -3.6;   // Extreme Left
      case 6: return -2.2;   // Left
      case 7: return 0;      // Center
      default: return 0;
    }
  };

  return (
    <div className={styles.container}>
      {/* ── TOP STATS ROW SKELETON ── */}
      <div className={styles.topRow}>
        <div className={styles.backLink} style={{ pointerEvents: 'none', color: '#CBD5E1' }}>
          <ArrowLeft size={16} />
          <span>Back to Course</span>
        </div>

        {/* Stats bar skeleton placeholder */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton width={120} height={36} borderRadius="20px" />
          <Skeleton width={80} height={36} borderRadius="20px" />
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div className={styles.grid}>
        
        {/* MAIN COLUMN */}
        <div className={styles.mainColumn}>
          
          {/* Duolingo Green Header Skeleton */}
          <div className={styles.duolingoHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.headerBackBtn} style={{ cursor: 'default' }}>
                <ArrowLeft size={18} strokeWidth={3} />
                <Skeleton width={120} height={14} borderRadius="4px" />
              </div>
              <div className={styles.headerTitleText} style={{ marginTop: '8px' }}>
                <Skeleton width="60%" height={28} borderRadius="6px" />
              </div>
            </div>
            
            <div className={styles.guidebookBtn} style={{ cursor: 'default', background: 'rgba(255,255,255,0.2)' }}>
              <Skeleton width={100} height={20} borderRadius="4px" />
            </div>
          </div>

          {/* Serpentine Map Container Skeleton */}
          <div className={styles.journeyPathContainer} style={{ overflow: 'hidden' }}>
            {dummyNodes.map((_, idx) => {
              const multiplier = getSerpentineMultiplier(idx);
              return (
                <div 
                  key={idx} 
                  className={styles.journeyNodeRow}
                  style={{ height: '150px' }}
                >
                  <div 
                    className={styles.duoPlatformAnchor}
                    style={{ '--offset-multiplier': multiplier } as React.CSSProperties}
                  >
                    <div className={`${styles.duoPedestal} ${styles.duoPedestalLocked}`}>
                      <Skeleton width="100%" height="100%" borderRadius="50%" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR COLUMN */}
        <div className={styles.sidebarColumn}>
          {/* Section Progress Card Skeleton */}
          <div className={styles.sidebarCard}>
            <h4 className={styles.sidebarCardTitle}>Section Progress</h4>
            <div className={styles.progressHeaderRow}>
              <div className={styles.donutContainer}>
                 <Skeleton width={90} height={90} borderRadius="50%" />
              </div>

              <div className={styles.progressStatsList}>
                <Skeleton width="80%" height={24} style={{ marginBottom: '12px' }} />
                <Skeleton width="60%" height={20} style={{ marginBottom: '12px' }} />
                <Skeleton width="100%" height={32} />
              </div>
            </div>
            <Skeleton width="100%" height={48} borderRadius="16px" style={{ marginTop: '16px' }} />
          </div>

          {/* Message Card Skeleton */}
          <div className={styles.messageCard}>
            <div className={styles.messageCardContent} style={{ width: '100%' }}>
              <Skeleton width="50%" height={16} style={{ marginBottom: '12px' }} />
              <Skeleton width="100%" height={40} style={{ marginBottom: '16px' }} />
              <Skeleton width="100%" height={44} borderRadius="16px" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
