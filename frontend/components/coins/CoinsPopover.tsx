'use client';

/**
 * Coins popover — the stats-bar preview of the real shop, not a static ad for
 * two hardcoded items. It reads the same catalog the shop page uses (shared
 * + prefetched by StatsBar so opening it feels instant), rotates through
 * everything worth showing a few at a time, and can complete a cheap
 * purchase (power-up or chest) right here through the same Shop Engine scene
 * the shop page hands off to — buying shouldn't require a page nav.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AlertCircle, Lock, RefreshCw, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGamification } from '@/context/GamificationContext';
import { useShopEngine } from '@/context/ShopEngineContext';
import { playHaptic } from '@/lib/haptics';
import ShopItemArt from '@/components/shop-engine/ShopItemArt';
import { newIdempotencyKey, openChest, purchaseItem, ShopError } from '@/lib/shop/api';
import { prefetchCatalog, invalidateCatalogCache } from '@/lib/shop/previewCache';
import type { ShopCatalog, ShopItem } from '@/lib/shop/types';
import styles from './CoinsPopover.module.css';

interface CoinsPopoverProps {
  onClose?: () => void;
}

const PAGE_SIZE = 3;
const ROTATE_MS = 5000;

/** Everything worth showing here, personalized items first, no duplicates. */
function buildPreviewPool(catalog: ShopCatalog): ShopItem[] {
  const seen = new Set<string>();
  const pool: ShopItem[] = [];
  const add = (items: ShopItem[]) => {
    for (const item of items) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      pool.push(item);
    }
  };
  add(catalog.recommendations.map((r) => r.item));
  if (catalog.weeklySpecial) add([catalog.weeklySpecial.item]);
  add(catalog.featured);
  add(catalog.dailyRotation.items);
  add(catalog.alwaysStocked);
  return pool;
}

export default function CoinsPopover({ onClose }: CoinsPopoverProps) {
  const router = useRouter();
  const { coins, refresh } = useGamification();
  const { shopScene } = useShopEngine();

  const [catalog, setCatalog] = useState<ShopCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const load = useCallback(() => {
    prefetchCatalog()
      .then((data) => {
        setCatalog(data);
        setError(null);
      })
      .catch((e) => setError(e instanceof ShopError ? e.message : 'Could not load the shop.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load, reloadToken]);

  const pool = useMemo(() => (catalog ? buildPreviewPool(catalog) : []), [catalog]);
  const totalPages = Math.max(1, Math.ceil(pool.length / PAGE_SIZE));
  // Pool can shrink (fresh catalog after a purchase) — clamp at render time
  // instead of an effect so there's no dangling stale-page flash.
  const safePageIndex = pageIndex >= totalPages ? 0 : pageIndex;

  // Auto-rotate through the pool. Paused while a card is hovered/being
  // bought, and skipped entirely if there's nothing to page through.
  useEffect(() => {
    if (totalPages <= 1 || paused) return;
    const id = setInterval(() => {
      setPageIndex((p) => (p + 1) % totalPages);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [totalPages, paused]);

  const visibleItems = pool.slice(
    safePageIndex * PAGE_SIZE,
    safePageIndex * PAGE_SIZE + PAGE_SIZE,
  );

  const goToShop = useCallback(() => {
    playHaptic('medium');
    if (onClose) onClose();
    router.push('/dashboard/shop');
  }, [onClose, router]);

  const handleGoToShop = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToShop();
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    setReloadToken((n) => n + 1);
  };

  const handleItemClick = useCallback(
    async (item: ShopItem) => {
      // Locked, sold out, grant-only, or already-owned cosmetics have nothing
      // to buy from here — the shop page explains why and what to do next.
      if (!item.unlock.unlocked || item.blockedReason || busyItemId) {
        goToShop();
        return;
      }

      playHaptic('medium');
      setBusyItemId(item.id);
      const coinsBefore = coins;
      const key = newIdempotencyKey();

      try {
        if (item.category === 'CHEST') {
          const result = await openChest(item.id, key);
          invalidateCatalogCache();
          if (onClose) onClose();
          shopScene({
            kind: 'CHEST_REVEAL',
            chestName: result.chest.name,
            accent: result.chest.accent,
            rarity: result.reward.rarity,
            coins: result.reward.coins,
            substituted: result.reward.substituted,
            item: result.reward.item
              ? {
                  id: result.reward.item.id,
                  name: result.reward.item.name,
                  rarity: result.reward.item.rarity,
                  art: result.reward.item.art,
                  slot: result.reward.item.slot,
                }
              : null,
            coinsAfter: result.coins,
            onComplete: () => void refresh(),
          });
          return;
        }

        const result = await purchaseItem(item.id, key);
        invalidateCatalogCache();
        if (onClose) onClose();
        shopScene({
          kind: 'PURCHASE_SUCCESS',
          itemId: result.itemId,
          itemName: result.itemName,
          rarity: result.rarity,
          art: result.art,
          slot: item.slot,
          price: result.price,
          coinsBefore,
          coinsAfter: result.coins,
          message: result.message,
          onEquip: undefined,
          onComplete: () => void refresh(),
        });
      } catch (e) {
        setError(e instanceof ShopError ? e.message : 'That purchase did not go through.');
        setBusyItemId(null);
      }
    },
    [busyItemId, coins, goToShop, onClose, refresh, shopScene],
  );

  return (
    <div className={styles.popoverCard} role="dialog" aria-label="Coins Popover">
      {/* Top Hero Header (Golden/Amber Banner) */}
      <div className={styles.heroHeader}>
        <div className={styles.heroTopRow}>
          <div className={styles.heroTextGroup}>
            <h3 className={styles.heroTitle}>{coins.toLocaleString()} Coins</h3>
            <p className={styles.heroSubtitle}>
              Spend your coins in the Shop to protect your streak & unlock boosts!
            </p>
          </div>

          <div className={styles.coinIconWrap}>
            <Image
              src="/Icons/Coin.png"
              alt="Coins"
              width={48}
              height={48}
              className={styles.coinImg}
              priority
            />
          </div>
        </div>
      </div>

      {/* Popover Content Cards */}
      <div
        className={styles.cardContent}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className={styles.shopItemSkeleton} />
          ))}

        {!loading && error && (
          <div className={styles.errorRow}>
            <AlertCircle size={16} strokeWidth={2.4} />
            <span>{error}</span>
            <button type="button" className={styles.retryLink} onClick={handleRetry}>
              <RefreshCw size={12} strokeWidth={2.6} />
              Retry
            </button>
          </div>
        )}

        {!loading && !error && catalog && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={safePageIndex}
              className={styles.pageGroup}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {visibleItems.map((item) => {
                const locked = !item.unlock.unlocked;
                const isBusy = busyItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className={styles.shopItemCard}
                    onClick={() => void handleItemClick(item)}
                    role="button"
                    tabIndex={0}
                    aria-disabled={isBusy}
                  >
                    <ShopItemArt
                      art={item.art}
                      category={item.category}
                      rarity={item.rarity}
                      size="sm"
                      locked={locked}
                    />
                    <div className={styles.itemText}>
                      <div className={styles.itemHeaderRow}>
                        <h4 className={styles.itemTitle}>{item.name}</h4>
                        {locked ? (
                          <span className={styles.lockedBadge}>
                            <Lock size={10} strokeWidth={2.6} />
                            {item.unlock.current}/{item.unlock.target}
                          </span>
                        ) : item.owned && item.slot ? (
                          <span className={styles.unlockedBadge}>OWNED</span>
                        ) : (
                          <span className={styles.priceBadge}>
                            <Image src="/Icons/Coin.png" alt="" width={12} height={12} />
                            {isBusy ? '...' : item.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <p className={styles.itemSubtitle}>
                        {locked ? item.unlock.label : item.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              {visibleItems.length === 0 && (
                <p className={styles.itemSubtitle}>The shop is fully stocked — check it out!</p>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className={styles.dots} role="tablist" aria-label="More shop items">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === safePageIndex}
                aria-label={`Show items ${i + 1} of ${totalPages}`}
                className={i === safePageIndex ? styles.dotActive : styles.dot}
                onClick={(e) => {
                  e.stopPropagation();
                  setPageIndex(i);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Popover Action Button (Go to Shop) */}
      <div className={styles.footerRow}>
        <button type="button" onClick={handleGoToShop} className={styles.actionBtn3D}>
          <ShoppingBag size={18} />
          <span>VISIT SHOP</span>
        </button>
      </div>
    </div>
  );
}
