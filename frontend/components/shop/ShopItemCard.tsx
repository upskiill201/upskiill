'use client';

/**
 * One shop item, in every state it can be in.
 *
 * Locked items are shown, not hidden — with the requirement and a progress
 * bar, because a locked Legendary at 12/25 lessons is the goal that sends
 * someone back to a lesson. Hiding it would remove the only reason the
 * catalogue motivates anything.
 */

import React, { useMemo } from 'react';
import Image from 'next/image';
import { Check, Lock } from 'lucide-react';
import ShopItemArt from '../shop-engine/ShopItemArt';
import { rarityStyle } from '@/lib/shop/cosmetics';
import type { ShopItem } from '@/lib/shop/types';
import { pickShopMessage } from '@/lib/tey/shopVoice';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import styles from './ShopItemCard.module.css';

interface ShopItemCardProps {
  item: ShopItem;
  onBuy: (item: ShopItem) => void;
  /** `tile` for grids, `row` for list sections. */
  variant?: 'tile' | 'row';
  /** Reason this item is being surfaced ("Your hearts are running low"). */
  reason?: string;
  busy?: boolean;
  /**
   * Tapped while it can't be bought (locked, too few coins, at the cap).
   * Duolingo explains instead of greying out, so the page can say why.
   */
  onBlocked?: (item: ShopItem, message: string) => void;
}

export default function ShopItemCard({
  item,
  onBuy,
  variant = 'tile',
  reason,
  busy = false,
  onBlocked,
}: ShopItemCardProps) {
  const tone = rarityStyle(item.rarity);
  const locked = !item.unlock.unlocked;
  const buyable = item.blockedReason === null && !busy;

  const blockedMessage = useMemo(
    () => (item.blockedReason ? pickShopMessage(item.blockedReasonCode ?? undefined, item.blockedReason) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [item.id, item.blockedReasonCode, item.blockedReason],
  );

  const explain = () => {
    playSound('nodeLocked');
    playHaptic('light', false);
    onBlocked?.(item, locked ? `${item.unlock.label} to unlock this.` : blockedMessage ?? 'Not available right now.');
  };

  const buy = () => {
    if (!buyable) return explain();
    playSound('select');
    playHaptic('medium', false);
    onBuy(item);
  };

  // Owned stackables still show a count; owned one-times are simply done.
  const ownedLabel = item.soldOut
    ? 'OWNED'
    : item.quantity > 0
      ? `${item.quantity}${item.maxStorage ? ` / ${item.maxStorage}` : ''} HELD`
      : null;

  return (
    <article
      className={[
        styles.card,
        styles[variant],
        locked ? styles.cardLocked : '',
        item.prestige ? styles.cardPrestige : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--rarity': tone.color, '--wash': tone.wash } as React.CSSProperties}
    >
      <div className={styles.artSlot}>
        <ShopItemArt
          art={item.art}
          category={item.category}
          rarity={item.rarity}
          size={variant === 'tile' ? 'lg' : 'md'}
          locked={locked}
        />
        {locked && (
          <span className={styles.lockPin} aria-hidden>
            <Lock size={13} strokeWidth={2.8} />
          </span>
        )}
        {item.equipped && (
          <span className={styles.equippedPin} aria-label="Equipped">
            <Check size={13} strokeWidth={3} />
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{item.name}</h3>
          {item.rarity !== 'COMMON' && <span className={styles.rarity}>{tone.label}</span>}
        </div>

        <p className={styles.desc}>{item.description}</p>
        {reason && <p className={styles.reason}>{reason}</p>}

        {/* Locked: show exactly how far off it is. */}
        {locked ? (
          <div className={styles.unlockBlock}>
            <div className={styles.unlockTrack}>
              <span className={styles.unlockFill} style={{ width: `${item.unlock.percent}%` }} />
            </div>
            <span className={styles.unlockLabel}>
              {item.unlock.label} · {item.unlock.current.toLocaleString()} /{' '}
              {item.unlock.target.toLocaleString()}
            </span>
          </div>
        ) : (
          ownedLabel && <span className={styles.ownedChip}>{ownedLabel}</span>
        )}

        {item.activeUntil && new Date(item.activeUntil) > new Date() && (
          <span className={styles.activeChip}>Active now</span>
        )}
      </div>

      <div className={styles.action}>
        {item.grantOnly ? (
          <span className={styles.grantOnly}>
            <Lock size={12} strokeWidth={2.8} />
            Earned only
          </span>
        ) : locked ? (
          <button type="button" className={styles.lockedBtn} aria-disabled="true" onClick={explain}>
            <Lock size={14} strokeWidth={2.8} aria-hidden="true" />
            LOCKED
          </button>
        ) : item.soldOut ? (
          <button type="button" className={styles.ownedBtn} disabled>
            OWNED
          </button>
        ) : (
          <>
            {item.discountPercent > 0 && (
              <span className={styles.strikePrice}>{item.basePrice.toLocaleString()}</span>
            )}
            <button
              type="button"
              className={buyable ? styles.buyBtn : styles.buyBtnDisabled}
              onClick={buy}
              aria-disabled={!buyable}
              disabled={busy}
              title={item.blockedReason ?? undefined}
            >
              <Image src="/Icons/Coin.png" alt="" width={17} height={17} />
              <span>{item.price.toLocaleString()}</span>
            </button>
            {/* The blocker is stated rather than left to a disabled button —
                "72 more coins needed" is actionable, a grey button is not.
                Picked once per (item, reason) pair via useMemo below the
                effect boundary — a list re-render must not reroll the line
                the learner is mid-reading. */}
            {item.blockedReason && !busy && (
              <span className={styles.blockedNote}>{blockedMessage}</span>
            )}
          </>
        )}
      </div>
    </article>
  );
}
