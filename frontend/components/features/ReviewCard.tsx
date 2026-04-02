'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { StarRating } from '../ui/StarRating';
import styles from './ReviewCard.module.css';

export type ReviewCardProps = {
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount?: number;
  isInstructorResponse?: boolean;
  instructorName?: string;
  instructorAvatar?: string;
  instructorComment?: string;
};

export const ReviewCard = ({
  userName,
  userAvatar,
  rating,
  date,
  comment,
  helpfulCount = 0,
  isInstructorResponse = false,
  instructorName,
  instructorAvatar,
  instructorComment,
}: ReviewCardProps) => {
  const [likes, setLikes] = useState(helpfulCount);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  return (
    <div className={styles.reviewWrapper}>
      <div className={styles.reviewCard}>
        {/* Header: Avatar, Name, More Actions */}
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <Avatar src={userAvatar} name={userName} size="md" />
            <div className={styles.nameDate}>
              <h4 className={styles.userName}>{userName}</h4>
              <span className={styles.date}>{date}</span>
            </div>
          </div>
          <button className={styles.moreBtn} aria-label="More actions">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Rating Section */}
        <div className={styles.ratingRow}>
          <StarRating value={rating} size="sm" />
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        </div>

        {/* Comment Text */}
        <div className={styles.commentContent}>
          <p className={styles.comment}>{comment}</p>
        </div>

        {/* Footer: Helpful feedback */}
        <div className={styles.footer}>
          <span className={styles.helpfulText}>Was this review helpful?</span>
          <div className={styles.actions}>
            <button 
              className={`${styles.actionBtn} ${hasLiked ? styles.active : ''}`}
              onClick={handleLike}
            >
              <ThumbsUp size={14} className={styles.icon} />
              <span>{likes}</span>
            </button>
            <button className={styles.actionBtn}>
              <ThumbsDown size={14} className={styles.icon} />
            </button>
            <button className={styles.reportBtn}>Report</button>
          </div>
        </div>
      </div>

      {/* Optional: Instructor Response Section */}
      {isInstructorResponse && instructorComment && (
        <div className={styles.instructorResponse}>
          <div className={styles.instructorHeader}>
            <Avatar src={instructorAvatar} name={instructorName || "Instructor"} size="sm" ring />
            <div className={styles.instructorInfo}>
              <span className={styles.instructorName}>{instructorName} <span className={styles.badge}>Instructor</span></span>
              <span className={styles.responseLabel}>Response from instructor</span>
            </div>
          </div>
          <p className={styles.instructorComment}>{instructorComment}</p>
        </div>
      )}
    </div>
  );
};
