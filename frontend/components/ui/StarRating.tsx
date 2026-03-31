'use client';

import React, { useState } from 'react';
import { FaStar, FaStarHalfStroke, FaRegStar } from 'react-icons/fa6';
import styles from './StarRating.module.css';

export type StarRatingProps = {
  value: number;             // e.g. 4.7
  max?: number;              // default 5
  reviewCount?: number;      // shows "(2,456 reviews)"
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;     // enables clicking to set rating
  onChange?: (rating: number) => void;
};

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  max = 5,
  reviewCount,
  size = 'md',
  interactive = false,
  onChange,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (!interactive) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    if (!interactive || !onChange) return;
    onChange(index);
  };

  // The visual rating is either the hovered value (if interactive) or the actual value
  const displayRating = hoverRating !== null ? hoverRating : value;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      const isFilled = displayRating >= i;
      // Handle half-stars for read-only view (if value has a decimal part)
      const isHalf = !isFilled && displayRating >= i - 0.5 && displayRating < i;

      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          className={`${styles.starBtn} ${interactive ? styles.interactive : ''}`}
          disabled={!interactive}
          aria-label={`Rate ${i} stars`}
        >
          {isFilled ? (
            <FaStar className={styles.filled} />
          ) : isHalf ? (
            <FaStarHalfStroke className={styles.filled} />
          ) : (
            <FaRegStar className={styles.empty} />
          )}
        </button>
      );
    }
    return stars;
  };

  return (
    <div className={`${styles.container} ${styles[size]}`} onMouseLeave={handleMouseLeave}>
      <div className={styles.starsWrapper}>
        {renderStars()}
      </div>
      {reviewCount !== undefined && (
        <span className={styles.reviewCount}>({reviewCount.toLocaleString()} reviews)</span>
      )}
    </div>
  );
};
