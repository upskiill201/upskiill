'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';
import styles from './CategoryCard.module.css';

export type CategoryCardProps = {
  name: string;
  icon: LucideIcon;
  image?: string; // Optional image background
  courseCount: number;
  studentCount?: number;
  href: string;
  color?: string; // Theme color
};

export const CategoryCard = ({
  name,
  icon: Icon,
  image,
  courseCount,
  studentCount,
  href,
  color = '#3D5AFE',
}: CategoryCardProps) => {
  return (
    <Link 
      href={href} 
      className={styles.card} 
      style={{ '--cat-color': color } as React.CSSProperties}
    >
      {/* Background Image / Gradient */}
      <div className={styles.imageWrapper}>
        {image ? (
          <Image 
            src={image} 
            alt={name} 
            fill 
            className={styles.bgImage} 
            sizes="(max-width: 768px) 100vw, 300px"
          />
        ) : (
          <div className={styles.fallbackBg} />
        )}
        <div className={styles.vignette} />
      </div>

      {/* Floating Glass Icon */}
      <div className={styles.floatingIcon}>
        <div className={styles.iconGlass}>
          <Icon size={24} strokeWidth={2} />
        </div>
      </div>

      {/* Content Overlay (Glassmorphism) */}
      <div className={styles.glassContent}>
        <div className={styles.contentInner}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.meta}>
            <span className={styles.count}>{courseCount.toLocaleString()} Courses</span>
            {studentCount && (
              <>
                <span className={styles.dot}>·</span>
                <span className={styles.studentCount}>{(studentCount / 1000).toFixed(1)}k Learners</span>
              </>
            )}
          </div>
          
          <div className={styles.hoverAction}>
             <span>Browse {name}</span>
             <ArrowRight size={14} />
          </div>
        </div>
      </div>
      
      {/* Outer Border Glow */}
      <div className={styles.glowBorder} />
    </Link>
  );
};
