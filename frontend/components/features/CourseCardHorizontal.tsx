'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Users, Clock, BookOpen, ChevronRight, Play } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { StarRating } from '../ui/StarRating';
import { ProgressBar } from '../ui/ProgressBar';
import Button from '../ui/Button';
import styles from './CourseCardHorizontal.module.css';

export type CourseCardHorizontalProps = {
  id: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar?: string;
  rating: number;
  reviewCount: number;
  studentsCount?: number;
  totalHours: number;
  totalLessons: number;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  category?: string;
  shortDescription?: string;
  isEnrolled?: boolean;
  progress?: number;
  className?: string;
};

export const CourseCardHorizontal = ({
  id,
  title,
  thumbnail,
  instructorName,
  instructorAvatar,
  rating,
  reviewCount,
  studentsCount,
  totalHours,
  totalLessons,
  price,
  originalPrice,
  discountPercentage,
  isBestseller,
  isNew,
  isFree,
  level,
  category,
  shortDescription,
  isEnrolled = false,
  progress = 0,
  className = '',
}: CourseCardHorizontalProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const linkHref = `/courses/${id}`;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className={`${styles.cardWrapper} ${className}`}>
      <Link href={linkHref} className={styles.card}>
        {/* THUMBNAIL SECTION (Left) */}
        <div className={styles.thumbnailWrapper}>
          <Image 
            src={thumbnail} 
            alt={title} 
            fill 
            sizes="300px"
            className={styles.thumbnail} 
          />
          <div className={styles.imageOverlay}>
            <div className={styles.playIcon}><Play size={24} fill="currentColor" /></div>
          </div>
          
          {/* Status Badges */}
          <div className={styles.topBadges}>
            {isBestseller && <Badge variant="yellow">Bestseller</Badge>}
            {isNew && !isBestseller && <Badge variant="blue">New</Badge>}
          </div>
        </div>

        {/* CONTENT SECTION (Middle) */}
        <div className={styles.content}>
          <div className={styles.categoryTitleRow}>
            {category && <span className={styles.category}>{category}</span>}
            <h3 className={styles.title} title={title}>{title}</h3>
          </div>
          
          <div className={styles.instructor}>
             <Avatar src={instructorAvatar} name={instructorName} size="xs" />
             <span className={styles.instructorName}>By {instructorName}</span>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.ratingBox}>
              <strong className={styles.ratingNumber}>{rating.toFixed(1)}</strong>
              <StarRating value={rating} size="sm" />
              <span className={styles.reviewCount}>({reviewCount.toLocaleString()})</span>
            </div>
            {studentsCount && studentsCount > 0 && (
              <div className={styles.studentsCount}>
                <Users size={14} className={styles.icon} />
                <span>{(studentsCount / 1000).toFixed(1)}k students</span>
              </div>
            )}
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}><Clock size={14} className={styles.icon} /> {totalHours}h</div>
            <div className={styles.metaItem}><BookOpen size={14} className={styles.icon} /> {totalLessons} lessons</div>
            {level && <div className={styles.metaItem}>• {level}</div>}
          </div>

          {shortDescription && (
            <p className={styles.description}>{shortDescription}</p>
          )}

          {isEnrolled && (
            <div className={styles.progressArea}>
              <div className={styles.progressLabelRow}>
                <span>Current Progress</span>
                <span className={styles.progressVal}>{progress}%</span>
              </div>
              <ProgressBar value={progress} size="sm" color="green" />
            </div>
          )}
        </div>

        {/* PRICING / ACTION SECTION (Right) */}
        <div className={styles.actionSection}>
          {!isEnrolled ? (
            <>
              <div className={styles.pricing}>
                {isFree ? (
                  <span className={styles.priceFree}>Free</span>
                ) : (
                  <>
                    <span className={styles.price}>${price.toFixed(2)}</span>
                    {originalPrice && (
                      <div className={styles.oldPriceBox}>
                        <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
                        {discountPercentage && (
                          <span className={styles.discountTag}>{discountPercentage}% off</span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className={styles.actionBtns}>
                <Button variant="primary" fullWidth>Add to Cart</Button>
                <button 
                  className={`${styles.wishlistBtn} ${isWishlisted ? styles.active : ''}`}
                  onClick={toggleWishlist}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                  <span>{isWishlisted ? "Saved" : "Wishlist"}</span>
                </button>
              </div>
            </>
          ) : (
            <div className={styles.enrolledAction}>
               <Button 
                 variant="secondary" 
                 fullWidth 
                 className={styles.ctaBtn}
                 rightIcon={<ChevronRight size={16} />}
               >
                 Continue Learning
               </Button>
               <span className={styles.lastAccessed}>Updated 2h ago</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
