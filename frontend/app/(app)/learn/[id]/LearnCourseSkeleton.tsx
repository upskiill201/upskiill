'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Skeleton from '@/components/ui/Skeleton';
import styles from './LearnCourse.module.css';

export default function LearnCourseSkeleton() {
  // We'll generate 3 dummy sections for the timeline
  const dummySections = [1, 2, 3];

  return (
    <div className={styles.container}>
      {/* ── TOP HEADER ROW ────────────────────────────────── */}
      <div className={styles.topHeaderRow}>
        <div className={styles.backLink} style={{ pointerEvents: 'none', color: '#CBD5E1' }}>
          <ArrowLeft size={16} />
          <span>Back to My Learning</span>
        </div>
        
        {/* Placeholder for StatsBar */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <Skeleton width={120} height={36} borderRadius="20px" />
          <Skeleton width={80} height={36} borderRadius="20px" />
        </div>
      </div>

      {/* ── TWO-COLUMN GRID ───────────────────────────────── */}
      <div className={styles.dashboardGrid}>
        
        {/* LEFT COLUMN: course card + sections */}
        <div className={styles.middleColumn}>
          
          {/* ── COURSE INFO CARD SKELETON ───────────────────────── */}
          <div className={styles.courseHeaderCard} style={{ cursor: 'default' }}>
            <div className={styles.mainCardArea}>
              {/* Thumbnail skeleton */}
              <div className={styles.cardImageWrap} style={{ background: 'transparent' }}>
                <Skeleton width="100%" height="100%" borderRadius="12px" />
              </div>

              {/* Text area skeleton */}
              <div className={styles.cardTextPart}>
                <Skeleton width={80} height={24} borderRadius="6px" style={{ marginBottom: '8px' }} />
                <Skeleton width="80%" height={32} borderRadius="8px" style={{ marginBottom: '12px' }} />
                <Skeleton width="100%" height={20} borderRadius="6px" style={{ marginBottom: '6px' }} />
                <Skeleton width="60%" height={20} borderRadius="6px" style={{ marginBottom: '16px' }} />

                <div className={styles.metaRow}>
                  <Skeleton width={100} height={24} borderRadius="6px" />
                  <Skeleton width={100} height={24} borderRadius="6px" />
                  <Skeleton width={100} height={24} borderRadius="6px" />
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTIONS TIMELINE SKELETON ──────────────────────── */}
          <div className={styles.timelineContainer}>
            {/* Vertical road line skeleton */}
            <div className={styles.roadLine}>
              <div className={styles.roadLineFill} style={{ height: '0%' }} />
            </div>

            {dummySections.map((_, sIdx) => (
              <div key={sIdx} className={styles.timelineRow}>
                {/* Road node */}
                <div className={`${styles.timelineNode} ${styles.nodeLocked}`}>
                  <Skeleton width="100%" height="100%" borderRadius="50%" />
                </div>

                {/* Section card */}
                <div className={`${styles.sectionCard} ${styles.sectionCardLocked}`}>
                  <div className={styles.sectionLeft}>
                    <div className={styles.sectionMeta}>
                      <Skeleton width={80} height={20} borderRadius="4px" />
                      <Skeleton width={100} height={20} borderRadius="4px" />
                    </div>

                    <Skeleton width="50%" height={24} borderRadius="6px" style={{ marginTop: '8px', marginBottom: '8px' }} />
                    <Skeleton width="90%" height={16} borderRadius="4px" style={{ marginBottom: '12px' }} />

                    {/* Unlock badge skeleton */}
                    <div className={styles.unlockBadge} style={{ background: 'transparent', padding: 0, border: 'none' }}>
                       <Skeleton width={120} height={24} borderRadius="12px" />
                    </div>
                  </div>

                  {/* Right: button skeleton */}
                  <div className={styles.sectionRight}>
                    <Skeleton width={140} height={44} borderRadius="12px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: skeleton for RightSidebar widgets */}
        <div className={styles.rightColumn}>
          {/* Skeleton representation of gamification side widgets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <Skeleton width="100%" height={250} borderRadius="24px" />
             <Skeleton width="100%" height={300} borderRadius="24px" />
          </div>
        </div>

      </div>
    </div>
  );
}
