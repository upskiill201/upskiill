'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Trash2, Shield, RotateCcw, Zap } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem as CartItemComponent } from '../../components/features/CartItem';
import styles from './CartPage.module.css';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, totalPrice, totalItems } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
    }, 300);
  };

  if (totalItems === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <div className={styles.emptyOrb} />
          <div className={styles.emptyIconWrap}>
            <ShoppingCart size={40} />
          </div>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyDesc}>
            Discover world-class courses and start your learning journey today.
          </p>
          <Link href="/courses" className={styles.emptyBtn}>
            Browse Courses →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Background orb */}
      <div className={styles.bgOrb} />

      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/courses" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to Courses
          </Link>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>Shopping Cart</h1>
            <span className={styles.badge}>{totalItems} {totalItems === 1 ? 'course' : 'courses'}</span>
          </div>


        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Left — Items */}
          <div className={styles.itemsCol}>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.itemCard} ${removingId === item.id ? styles.removing : ''}`}
                >
                  {/* Thumbnail */}
                  <div className={styles.itemThumb}>
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} className={styles.thumbImg} />
                    ) : (
                      <div className={styles.thumbPlaceholder}>
                        <Zap size={20} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemInstructor}>by {item.instructorName}</p>
                    <div className={styles.itemTags}>
                      <span className={styles.tag}>Instant Access</span>
                      <span className={styles.tag}>Certificate</span>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className={styles.itemRight}>
                    <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust row */}
            <div className={styles.trustRow}>
              <span className={styles.trustItem}><Shield size={14} /> 30-day guarantee</span>
              <span className={styles.trustItem}><RotateCcw size={14} /> Full refunds</span>
              <span className={styles.trustItem}><Zap size={14} /> Instant enrollment</span>
            </div>
          </div>

          {/* Right — Summary */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              {/* Glow accent */}
              <div className={styles.summaryGlow} />

              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryLines}>
                {items.map(item => (
                  <div key={item.id} className={styles.summaryLine}>
                    <span className={styles.summaryLineName}>{item.title}</span>
                    <span className={styles.summaryLinePrice}>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalAmount}>${totalPrice.toFixed(2)}</span>
              </div>

              <button
                className={styles.checkoutBtn}
                onClick={() => router.push('/checkout')}
              >
                <span>Proceed to Checkout</span>
                <span className={styles.checkoutBtnArrow}>→</span>
              </button>

              <div className={styles.summaryFooter}>
                <Shield size={13} />
                <span>Secured by SSL encryption</span>
              </div>
            </div>

            {/* Promo hint */}
            <div className={styles.promoHint}>
              🎓 All courses include a <strong>verified certificate</strong> upon completion.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
