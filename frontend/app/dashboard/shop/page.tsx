'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import { useRewardAnimation } from '@/context/RewardAnimationContext';
import { useComingSoon } from '@/app/dashboard/layout';
import { RightSidebar } from '@/components/layout/RightSidebar';
import { StatsBar } from '@/components/ui/StatsBar';
import dashStyles from '../Page.module.css';
import styles from './Shop.module.css';

export default function ShopPage() {
  const { coins, lives, maxLives, streakFreezeBank, buyShopItem } = useGamification();
  const { triggerRewardAnimation } = useRewardAnimation();
  const { triggerComingSoon } = useComingSoon();

  const [pendingItem, setPendingItem] = useState<'REFILL_HEARTS' | 'STREAK_FREEZE' | null>(null);
  const [showInsufficientModal, setShowInsufficientModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isHeartsFull = lives >= maxLives;
  const isFreezeMaxed = streakFreezeBank >= 2;
  const coinIcon = coins > 0 ? '/Icons/Coin.png' : '/Icons/Coin_empty.png';

  const handleInitiateBuy = (itemKey: 'REFILL_HEARTS' | 'STREAK_FREEZE') => {
    const cost = itemKey === 'REFILL_HEARTS' ? 120 : 200;
    if (coins < cost) {
      setShowInsufficientModal(true);
    } else {
      setPendingItem(itemKey);
    }
  };

  const handleConfirmPurchase = async (e?: React.MouseEvent) => {
    if (!pendingItem || isSubmitting) return;
    setIsSubmitting(true);
    const itemPurchased = pendingItem;
    const result = await buyShopItem(pendingItem);
    setIsSubmitting(false);
    setPendingItem(null);

    if (result.success) {
      setToastMessage(result.message);
      if (itemPurchased === 'REFILL_HEARTS') {
        triggerRewardAnimation({
          originElement: e?.currentTarget as HTMLElement,
          rewards: [{ currency: 'HEARTS', amount: maxLives - lives }],
        });
      } else if (itemPurchased === 'STREAK_FREEZE') {
        triggerRewardAnimation({
          originElement: e?.currentTarget as HTMLElement,
          rewards: [{ currency: 'STREAK', amount: 1 }],
        });
      }
      setTimeout(() => setToastMessage(null), 3500);
    } else {
      setToastMessage(result.message);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className={dashStyles.container}>
      <div className={dashStyles.dashboardGrid}>
        {/* MIDDLE COLUMN: SHOP CONTENT */}
        <div className={dashStyles.middleColumn}>
          <div className={styles.pageWrapper}>
            {/* LIVE STATS BAR — candy-3D pills in per-stat colors, matching the shop coin card style */}
            <div className={styles.topStats}>
              <StatsBar variant="pill" />
            </div>

            {/* SHOP HEADER */}
            <div className={styles.shopHeader}>
              <div className={styles.shopTitleRow}>
                <h1 className={styles.shopTitle}>Shop</h1>
              </div>
            </div>

            {/* CATEGORY 1: HEARTS */}
            <section className={styles.categorySection}>
              <h2 className={styles.categoryHeading}>Hearts</h2>
              <hr className={styles.divider} />

              <div className={styles.itemList}>
                {/* ITEM 1: REFILL HEARTS */}
                <div className={styles.itemCard}>
                  <div className={styles.itemLeft}>
                    <div className={`${styles.iconBox} ${styles.iconBoxHeart}`}>
                      <Image src="/Icons/heart.png" alt="Refill Hearts" width={48} height={48} />
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemTitleRow}>
                        <h3 className={styles.itemTitle}>Refill Hearts</h3>
                      </div>
                      <p className={styles.itemDescription}>
                        Get full hearts so you can worry less about making mistakes in a lesson
                      </p>
                    </div>
                  </div>

                  {isHeartsFull ? (
                    <button type="button" className={styles.fullBtn} disabled>
                      FULL
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleInitiateBuy('REFILL_HEARTS')}
                      className={styles.buyBtn}
                    >
                      <span>GET FOR:</span>
                      <Image src={coinIcon} alt="Coins" width={18} height={18} />
                      <span>120</span>
                    </button>
                  )}
                </div>

                {/* ITEM 2: UNLIMITED HEARTS (PREMIUM) */}
                <div className={styles.itemCard}>
                  <div className={styles.itemLeft}>
                    <div className={`${styles.iconBox} ${styles.iconBoxUnlimited}`}>
                      <Image src="/Icons/heart.png" alt="Unlimited Hearts" width={48} height={48} style={{ filter: 'hue-rotate(90deg) saturate(2)' }} />
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemTitleRow}>
                        <h3 className={styles.itemTitle}>Unlimited Hearts</h3>
                      </div>
                      <p className={styles.itemDescription}>
                        Never run out of hearts with Super Teyro!
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerComingSoon('Unlimited Hearts (Super Teyro)')}
                    className={styles.trialBtn}
                  >
                    FREE TRIAL
                  </button>
                </div>
              </div>
            </section>

            {/* CATEGORY 2: POWER-UPS */}
            <section className={styles.categorySection}>
              <h2 className={styles.categoryHeading}>Power-Ups</h2>
              <hr className={styles.divider} />

              <div className={styles.itemList}>
                {/* ITEM 3: STREAK FREEZE */}
                <div className={styles.itemCard}>
                  <div className={styles.itemLeft}>
                    <div className={`${styles.iconBox} ${styles.iconBoxFreeze}`}>
                      <Image src="/Icons/burn.png" alt="Streak Freeze" width={46} height={46} style={{ filter: 'hue-rotate(180deg) brightness(1.2)' }} />
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemTitleRow}>
                        <h3 className={styles.itemTitle}>Streak Freeze</h3>
                        <span className={styles.equippedBadge}>{streakFreezeBank} / 2 EQUIPPED</span>
                      </div>
                      <p className={styles.itemDescription}>
                        Streak Freeze allows your streak to remain in place for one full day of inactivity.
                      </p>
                    </div>
                  </div>

                  {isFreezeMaxed ? (
                    <button type="button" className={styles.fullBtn} disabled>
                      MAX EQUIPPED
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleInitiateBuy('STREAK_FREEZE')}
                      className={styles.buyBtn}
                    >
                      <span>GET FOR:</span>
                      <Image src={coinIcon} alt="Coins" width={18} height={18} />
                      <span>200</span>
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT COLUMN: STATS & SOCIAL SIDEBAR */}
        <RightSidebar />
      </div>

      {/* PURCHASE CONFIRMATION MODAL */}
      <AnimatePresence>
        {pendingItem && (
          <div className={styles.modalBackdrop} onClick={() => setPendingItem(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={styles.modalCard}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={styles.modalTitle}>
                Purchase {pendingItem === 'REFILL_HEARTS' ? 'Refill Hearts' : 'Streak Freeze'}?
              </h3>

              <p className={styles.modalText}>
                {pendingItem === 'REFILL_HEARTS'
                  ? 'Restore all your hearts back to full 5 hearts instantly?'
                  : 'Equip 1 Streak Freeze to protect your streak on missed days?'}
              </p>

              <div className={styles.modalCostBox}>
                <div className={styles.costItem}>
                  <span className={styles.costLabel}>Cost</span>
                  <span className={styles.costValue}>
                    <Image src={coinIcon} alt="Coins" width={20} height={20} />
                    {pendingItem === 'REFILL_HEARTS' ? 120 : 200} Coins
                  </span>
                </div>
                <div className={styles.costItem}>
                  <span className={styles.costLabel}>Your Balance</span>
                  <span className={styles.costValue}>
                    <Image src={coinIcon} alt="Coins" width={20} height={20} />
                    {coins} Coins
                  </span>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setPendingItem(null)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPurchase}
                  disabled={isSubmitting}
                  className={styles.confirmBtn}
                >
                  {isSubmitting ? 'BUYING...' : 'BUY NOW'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INSUFFICIENT COINS MODAL */}
      <AnimatePresence>
        {showInsufficientModal && (
          <div className={styles.modalBackdrop} onClick={() => setShowInsufficientModal(false)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={styles.modalCard}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className={styles.modalTitle}>Not Enough Coins</h3>
              <p className={styles.modalText}>
                Finish more lessons or complete daily goals to earn more Coins!
              </p>
              <button
                type="button"
                onClick={() => setShowInsufficientModal(false)}
                className={styles.confirmBtn}
                style={{ width: '100%' }}
              >
                CONTINUE LEARNING
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={styles.toast}
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
