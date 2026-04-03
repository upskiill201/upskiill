'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart } from 'lucide-react';
import styles from './CartItem.module.css';

export interface CartItemProps {
  courseId: string;
  title: string;
  thumbnail: string;
  instructorName: string;
  price: number;
  originalPrice?: number;
  onRemove: () => void;
  onMoveToWishlist: () => void;
}

export const CartItem = ({
  courseId,
  title,
  thumbnail,
  instructorName,
  price,
  originalPrice,
  onRemove,
  onMoveToWishlist,
}: CartItemProps) => {
  return (
    <div className={styles.container}>
      {/* Thumbnail */}
      <Link href={`/courses/${courseId}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="160px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </Link>

      {/* Main Info */}
      <div className={styles.mainInfo}>
        <Link href={`/courses/${courseId}`} className={styles.titleLink}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <p className={styles.instructor}>By {instructorName}</p>

        {/* Action Links */}
        <div className={styles.actionLinks}>
          <button onClick={onRemove} className={styles.actionBtn}>
            <Trash2 size={14} />
            <span>Remove</span>
          </button>
          <span className={styles.divider}></span>
          <button onClick={onMoveToWishlist} className={styles.actionBtn}>
            <Heart size={14} />
            <span>Save for later</span>
          </button>
        </div>
      </div>

      {/* Pricing */}
      <div className={styles.pricing}>
        <span className={styles.price}>
          {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
        </span>
        {originalPrice && price !== originalPrice && (
          <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};
