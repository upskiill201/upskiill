'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Heart, Users, Clock, BookOpen, ChevronRight, ShoppingCart, Check, Lock } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { StarRating } from '../ui/StarRating';
import { ProgressBar } from '../ui/ProgressBar';
import { useCart } from '@/context/CartContext';
import { playHaptic } from '@/lib/haptics';
import styles from './CourseCard.module.css';

export type CourseCardProps = {
  id: string;
  title: string;
  slug?: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar?: string;
  rating: number;
  reviewCount: number;
  studentsCount?: number; // Added
  totalHours: number;
  totalLessons: number;
  price: number;
  originalPrice?: number;
  discountPercentage?: number; // e.g. 50
  isBestseller?: boolean;
  isNew?: boolean;
  isFree?: boolean;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  category?: string;
  shortDescription?: string; // Added for hover stat
  isEnrolled?: boolean;
  progress?: number;
  className?: string; // For layout overrides
};

export const CourseCard = ({
  id,
  title,
  slug,
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
}: CourseCardProps) => {
  const { addItem, isInCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const identifier = slug || id;
  const linkHref = `/courses/${identifier}`;
  const inCart = isInCart(id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Was a bare setState with no acknowledgment at all — a meaningful
    // commitment (saving a course to come back to) deserves at least a
    // tactile click, not a silent icon-fill swap.
    playHaptic('selection');
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      playHaptic('medium');
      // The context expects: id, title, thumbnail, instructorName, price
      addItem({
        id,
        title,
        thumbnail,
        instructorName,
        price,
      });
    }
  };

  return (
    <div className={`${styles.cardWrapper} ${className}`}>
      <Link href={linkHref} className={styles.card}>
        {/* THUMBNAIL AREA */}
        <div className={styles.thumbnailWrapper}>
          <Image 
            src={thumbnail} 
            alt={title} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.thumbnail} 
          />
          <div className={styles.imageOverlay} />
          
          {/* Top Badges */}
          <div className={styles.topBadges}>
            {isBestseller && <Badge variant="yellow">Bestseller</Badge>}
            {isNew && !isBestseller && <Badge variant="blue">New</Badge>}
            {category && <span className={styles.categoryBadge}>{category}</span>}
          </div>

          {/* Wishlist Icon */}
          {!isEnrolled && (
            <motion.button
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
              onClick={toggleWishlist}
              aria-label="Add to wishlist"
              whileTap={{ scale: 0.85 }}
              animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2.5} />
            </motion.button>
          )}
          
          {/* Preview Button (slides up on hover) */}
          <div className={styles.previewBtnWrapper}>
            <div className={styles.previewBtn}>
              <Play size={14} fill="currentColor" /> Preview Course
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className={styles.content}>
          <h3 className={styles.title} title={title}>{title}</h3>
          
          <div className={styles.instructor}>
            <Avatar 
              src={instructorAvatar} 
              name={instructorName} 
              size="xs" 
            />
            <span className={styles.instructorName}>{instructorName}</span>
          </div>

          {/* If enrolled, progress bar might be shown instead of rating */}
          {!isEnrolled && (
            <div className={styles.ratingRow}>
              <strong className={styles.ratingNumber}>{rating.toFixed(1)}</strong>
              <StarRating value={rating} size="sm" />
              <span className={styles.reviewCount}>({reviewCount.toLocaleString()})</span>
            </div>
          )}

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}><Clock size={12} className={styles.metaIcon} /> {totalHours}h</div>
            <div className={styles.metaItem}><BookOpen size={12} className={styles.metaIcon} /> {totalLessons} lessons</div>
            {level && <div className={styles.metaItem}>• {level}</div>}
            {studentsCount && studentsCount > 0 && (
              <div className={styles.metaItem}>
                <Users size={12} className={styles.metaIcon} style={{ marginLeft: '4px' }} /> 
                {(studentsCount / 1000).toFixed(1)}k students
              </div>
            )}
          </div>

          {/* SHORT DESCRIPTION (visible on hover through css) */}
          {shortDescription && !isEnrolled && (
            <p className={styles.shortDescription}>{shortDescription}</p>
          )}

          <div className={styles.bottomRow}>
            {isEnrolled ? (
              <div className={styles.progressSection}>
                <div className={styles.progressTextWrapper}>
                  <span className={styles.progressLabel}>Overall Progress</span>
                  <span className={styles.progressValue}>{progress}%</span>
                </div>
                <div className={styles.progressWrapper}>
                  <ProgressBar value={progress} size="sm" color="green" />
                </div>
                <div className={styles.ctaEnrolled}>
                  Continue Learning <ChevronRight size={14} />
                </div>
              </div>
            ) : (
              <div className={styles.pricingSection}>
                <div className={styles.pricing}>
                  {isFree ? (
                    <span className={styles.priceFree}>Free</span>
                  ) : (
                    <Badge variant="purple" size="sm" icon={<Lock size={11} />}>Premium</Badge>
                  )}
                </div>
                {!isFree && (
                  <motion.button
                    className={`${styles.addToCartBtn} ${inCart ? styles.inCart : ''}`}
                    onClick={handleAddToCart}
                    title={inCart ? "In Cart" : "Add to Cart"}
                    whileTap={{ scale: 0.85 }}
                    animate={inCart ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {inCart ? <Check size={16} /> : <ShoppingCart size={16} />}
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
