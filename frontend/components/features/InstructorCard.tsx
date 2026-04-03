'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Users, PlayCircle, ExternalLink } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import styles from './InstructorCard.module.css';

export interface InstructorCardProps {
  id: string;
  name: string;
  avatar?: string;
  professionalTitle: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  bioSnippet?: string;
  socialLinks?: {
    linkedin?: string;
    website?: string;
  };
}

export const InstructorCard = ({
  id,
  name,
  avatar,
  professionalTitle,
  rating,
  studentsCount,
  coursesCount,
  bioSnippet,
  socialLinks,
}: InstructorCardProps) => {
  return (
    <div className={styles.card}>
      {/* HEADER AREA */}
      <div className={styles.avatarSection}>
        <div className={styles.avatarGlow} />
        <Avatar 
          src={avatar} 
          name={name} 
          size="xl" 
          ring 
          className={styles.avatar} 
        />
        {socialLinks?.linkedin && (
           <a 
             href={socialLinks.linkedin} 
             target="_blank" 
             rel="noopener noreferrer" 
             className={styles.socialLink}
             aria-label="Connect on LinkedIn"
           >
             <FaLinkedin size={14} />
           </a>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.professionalTitle}>{professionalTitle}</p>

        {/* STATS GRID */}
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <Star size={14} className={styles.iconStar} fill="currentColor" />
            <span className={styles.statVal}>{rating.toFixed(1)}</span>
            <span className={styles.statLabel}>Rating</span>
          </div>
          <div className={styles.statItem}>
            <Users size={14} className={styles.iconUsers} />
            <span className={styles.statVal}>
              {studentsCount >= 1000 ? `${(studentsCount / 1000).toFixed(0)}k+` : studentsCount}
            </span>
            <span className={styles.statLabel}>Students</span>
          </div>
          <div className={styles.statItem}>
             <PlayCircle size={14} className={styles.iconCourses} />
             <span className={styles.statVal}>{coursesCount}</span>
             <span className={styles.statLabel}>Courses</span>
          </div>
        </div>

        {bioSnippet && (
          <p className={styles.bioSnippet} title={bioSnippet}>
            {bioSnippet}
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className={styles.footer}>
        <Link href={`/instructor/${id}`} className={styles.fullLink}>
          <Button variant="outline" fullWidth className={styles.profileBtn} rightIcon={<ExternalLink size={14} />}>
            View Full Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};
