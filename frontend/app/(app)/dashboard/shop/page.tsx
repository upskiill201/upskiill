'use client';

/**
 * The Shop.
 *
 * Structured around the loop it has to create: you see what you're close to
 * (goals), what's new to you (featured/unlocks), what's leaving (rotation),
 * and what you're collecting (collections). Every purchase hands off to the
 * Shop Engine for the reveal — this page never celebrates inline, so the
 * moment always feels the same wherever it was triggered from.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Gift, Package, RefreshCw, Sparkles, Target, Trophy } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useShopEngine } from '@/context/ShopEngineContext';
import { RightSidebar } from '@/components/layout/RightSidebar';
import ShopItemCard from '@/components/shop/ShopItemCard';
import CountdownPill from '@/components/shop/CountdownPill';
import InventoryLocker from '@/components/shop/InventoryLocker';
import ShopItemArt from '@/components/shop-engine/ShopItemArt';
import {
  claimCollection,
  equipItem,
  fetchCatalog,
  newIdempotencyKey,
  openChest,
  purchaseItem,
  registerVisit,
  ShopError,
} from '@/lib/shop/api';
import { CATEGORY_LABELS, rarityStyle } from '@/lib/shop/cosmetics';
import type { ShopCatalog, ShopItem } from '@/lib/shop/types';
import { pickShopMessage } from '@/lib/tey/shopVoice';
import dashStyles from '../Page.module.css';
import styles from './Shop.module.css';

export default function ShopPage() {
  const { refresh } = useGamification();
  const { shopScene } = useShopEngine();

  const [catalog, setCatalog] = useState<ShopCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; tone: 'ok' | 'bad' } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('POWER_UP');
  /** Bumped on every catalog reload so the locker re-reads what's owned. */
  const [lockerToken, setLockerToken] = useState(0);

  const visitClaimed = useRef(false);

  const showToast = useCallback((text: string, tone: 'ok' | 'bad' = 'ok') => {
    setToast({ text, tone });
    setTimeout(() => setToast(null), 3600);
  }, []);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const data = await fetchCatalog();
      setCatalog(data);
      setLockerToken((n) => n + 1);
    } catch (e) {
      setLoadError(
        e instanceof ShopError ? e.message : 'Could not load the shop. Check your connection.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Daily visit bonus — claimed once per day, server-side. The ref guards
  // against React 18 StrictMode double-mounting firing it twice on dev.
  useEffect(() => {
    if (visitClaimed.current) return;
    visitClaimed.current = true;
    registerVisit()
      .then((res) => {
        if (res.rewarded && res.reward) {
          showToast(`+${res.reward} coins · day ${res.visitStreak} of visiting`);
          void refresh();
          setCatalog((prev) => (prev ? { ...prev, coins: res.coins } : prev));
        }
      })
      .catch(() => {
        /* The visit bonus is a nicety; never block the shop on it. */
      });
  }, [refresh, showToast]);

  // ── Purchase ──────────────────────────────────────────────────────────────

  const handleBuy = useCallback(
    async (item: ShopItem) => {
      if (busyItemId) return;
      setBusyItemId(item.id);
      const coinsBefore = catalog?.coins ?? 0;
      const key = newIdempotencyKey();

      try {
        if (item.category === 'CHEST') {
          const result = await openChest(item.id, key);
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
            onComplete: () => {
              void load();
              void refresh();
            },
          });
          return;
        }

        const result = await purchaseItem(item.id, key);
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
          // Cosmetics can be worn straight from the scene — the gap between
          // buying something and seeing it on yourself is where the reward
          // usually leaks away.
          onEquip: item.slot
            ? async () => {
                await equipItem(result.itemId, true);
              }
            : undefined,
          onComplete: () => {
            void load();
            void refresh();
          },
        });
      } catch (e) {
        showToast(
          e instanceof ShopError
            ? pickShopMessage(e.code, e.message)
            : 'That purchase did not go through.',
          'bad',
        );
        // Re-read: the failure may have been a stale price or a spent balance.
        void load();
      } finally {
        setBusyItemId(null);
      }
    },
    [busyItemId, catalog?.coins, load, refresh, shopScene, showToast],
  );

  const handleClaimCollection = useCallback(
    async (collectionId: string) => {
      if (busyItemId) return;
      setBusyItemId(collectionId);
      try {
        const result = await claimCollection(collectionId);
        shopScene({
          kind: 'COLLECTION_COMPLETE',
          collectionName: result.collection.name,
          accent: result.collection.accent,
          rewardCoins: result.rewardCoins,
          rewardItem: result.rewardItem
            ? {
                id: result.rewardItem.id,
                name: result.rewardItem.name,
                rarity: result.rewardItem.rarity,
                art: result.rewardItem.art,
              }
            : null,
          coinsAfter: result.coins,
          onComplete: () => {
            void load();
            void refresh();
          },
        });
      } catch (e) {
        showToast(
          e instanceof ShopError ? pickShopMessage(e.code, e.message) : 'Could not claim that.',
          'bad',
        );
      } finally {
        setBusyItemId(null);
      }
    },
    [busyItemId, load, refresh, shopScene, showToast],
  );

  const categories = useMemo(
    () => (catalog?.categories ?? []).filter((c) => c.items.length > 0),
    [catalog],
  );

  const visibleCategory = useMemo(
    () => categories.find((c) => c.category === activeCategory) ?? categories[0],
    [categories, activeCategory],
  );

  // ── Loading / error states ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={dashStyles.container}>
        <div className={dashStyles.dashboardGrid}>
          <div className={dashStyles.middleColumn}>
            <div className={styles.pageWrapper}>
              <div className={styles.skeletonHeader} />
              <div className={styles.skeletonRow}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className={styles.skeletonCard} />
                ))}
              </div>
              <div className={styles.skeletonBar} />
              <div className={styles.skeletonRow}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className={styles.skeletonCard} />
                ))}
              </div>
            </div>
          </div>
          <RightSidebar />
        </div>
      </div>
    );
  }

  if (loadError || !catalog) {
    return (
      <div className={dashStyles.container}>
        <div className={dashStyles.dashboardGrid}>
          <div className={dashStyles.middleColumn}>
            <div className={styles.pageWrapper}>
              <div className={styles.errorState}>
                <AlertCircle size={34} strokeWidth={2} />
                <h2>The shop didn&apos;t load</h2>
                <p>{loadError}</p>
                <button type="button" className={styles.retryBtn} onClick={() => void load()}>
                  <RefreshCw size={15} strokeWidth={2.6} />
                  Try again
                </button>
              </div>
            </div>
          </div>
          <RightSidebar />
        </div>
      </div>
    );
  }

  const weekly = catalog.weeklySpecial;

  return (
    <div className={dashStyles.container}>
      <div className={dashStyles.dashboardGrid}>
        <div className={dashStyles.middleColumn}>
          <div className={styles.pageWrapper}>
            <header className={styles.shopHeader}>
              <h1 className={styles.shopTitle}>Shop</h1>
              <span className={styles.balancePill}>
                <Image src="/Icons/Coin.png" alt="Coins" width={20} height={20} />
                {catalog.coins.toLocaleString()}
              </span>
            </header>

            {/* ── Event banner ──────────────────────────────────────────── */}
            {catalog.event && (
              <section
                className={styles.eventBanner}
                style={{ '--accent': catalog.event.accent } as React.CSSProperties}
              >
                <Sparkles size={20} strokeWidth={2.4} />
                <div>
                  <h2 className={styles.eventName}>{catalog.event.name}</h2>
                  <p className={styles.eventTagline}>{catalog.event.tagline}</p>
                </div>
                {catalog.event.discountPercent > 0 && (
                  <span className={styles.eventDiscount}>
                    -{catalog.event.discountPercent}%
                  </span>
                )}
              </section>
            )}

            {/* ── Your locker ───────────────────────────────────────────── */}
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>
                  <Package size={17} strokeWidth={2.6} />
                  Your locker
                </h2>
              </div>
              <InventoryLocker
                refreshToken={lockerToken}
                onError={(message) => showToast(message, 'bad')}
              />
            </section>

            {/* ── Goals ─────────────────────────────────────────────────── */}
            {catalog.goals.length > 0 && (
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>
                    <Target size={17} strokeWidth={2.6} />
                    What you&apos;re working toward
                  </h2>
                </div>
                <div className={styles.goalList}>
                  {catalog.goals.map((goal) => {
                    const percent = Math.min(
                      100,
                      Math.round((goal.current / Math.max(1, goal.target)) * 100),
                    );
                    return (
                      <div key={`${goal.kind}-${goal.itemId ?? 'none'}`} className={styles.goal}>
                        <div className={styles.goalTop}>
                          <span className={styles.goalLabel}>{goal.label}</span>
                          <span className={styles.goalCount}>
                            {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                          </span>
                        </div>
                        <div className={styles.goalTrack}>
                          <span className={styles.goalFill} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── Weekly special ────────────────────────────────────────── */}
            {weekly && (
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>
                    <Trophy size={17} strokeWidth={2.6} />
                    This week only
                  </h2>
                  <CountdownPill ms={weekly.resetsInMs} label="Ends in" />
                </div>
                <div
                  className={styles.weeklyHero}
                  style={
                    {
                      '--rarity': rarityStyle(weekly.item.rarity).color,
                      '--wash': rarityStyle(weekly.item.rarity).wash,
                    } as React.CSSProperties
                  }
                >
                  <div className={styles.weeklyArt}>
                    <ShopItemArt
                      art={weekly.item.art}
                      category={weekly.item.category}
                      rarity={weekly.item.rarity}
                      size="lg"
                      locked={!weekly.item.unlock.unlocked}
                    />
                  </div>
                  <div className={styles.weeklyBody}>
                    <span className={styles.weeklyTag}>
                      −{weekly.discountPercent}% this week
                    </span>
                    <h3 className={styles.weeklyName}>{weekly.item.name}</h3>
                    <p className={styles.weeklyDesc}>{weekly.item.description}</p>
                    {!weekly.item.unlock.unlocked && (
                      <p className={styles.weeklyLocked}>{weekly.item.unlock.label}</p>
                    )}
                  </div>
                  <div className={styles.weeklyAction}>
                    <span className={styles.weeklyStrike}>
                      {weekly.item.basePrice.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      className={styles.weeklyBuy}
                      disabled={weekly.item.blockedReason !== null || busyItemId !== null}
                      onClick={() => void handleBuy(weekly.item)}
                      title={weekly.item.blockedReason ?? undefined}
                    >
                      <Image src="/Icons/Coin.png" alt="" width={18} height={18} />
                      {weekly.item.price.toLocaleString()}
                    </button>
                    {weekly.item.blockedReason && (
                      <span className={styles.weeklyBlocked}>{weekly.item.blockedReason}</span>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* ── Recommended ───────────────────────────────────────────── */}
            {catalog.recommendations.length > 0 && (
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>
                    <Sparkles size={17} strokeWidth={2.6} />
                    Recommended for you
                  </h2>
                </div>
                <div className={styles.grid}>
                  {catalog.recommendations.map(({ reason, item }) => (
                    <ShopItemCard
                      key={`rec-${item.id}`}
                      item={item}
                      reason={reason}
                      onBuy={handleBuy}
                      busy={busyItemId === item.id}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ── Daily rotation ────────────────────────────────────────── */}
            {catalog.dailyRotation.items.length > 0 && (
              <section className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>
                    <RefreshCw size={17} strokeWidth={2.6} />
                    Today&apos;s picks
                  </h2>
                  <CountdownPill ms={catalog.dailyRotation.resetsInMs} />
                </div>
                <div className={styles.grid}>
                  {catalog.dailyRotation.items.map((item) => (
                    <ShopItemCard
                      key={`daily-${item.id}`}
                      item={item}
                      onBuy={handleBuy}
                      busy={busyItemId === item.id}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* ── Mystery chests ────────────────────────────────────────── */}
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>
                  <Gift size={17} strokeWidth={2.6} />
                  Mystery Chests
                </h2>
              </div>
              <div className={styles.grid}>
                {catalog.chests.map(
                  (chest) =>
                    chest.item && (
                      <div key={chest.tier} className={styles.chestWrap}>
                        <ShopItemCard
                          item={chest.item}
                          onBuy={handleBuy}
                          busy={busyItemId === chest.item.id}
                        />
                        {/* Odds are published before the spend, not after. */}
                        <ul className={styles.odds}>
                          <li className={styles.oddsFloor}>
                            Always at least {chest.coinFloor} coins
                          </li>
                          {chest.odds.map((row) => (
                            <li key={row.label}>
                              <span>{row.label}</span>
                              <strong>{row.percent}%</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                )}
              </div>
            </section>

            {/* ── Collections ───────────────────────────────────────────── */}
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>
                  <Trophy size={17} strokeWidth={2.6} />
                  Collections
                </h2>
              </div>
              <div className={styles.collectionList}>
                {catalog.collections.map((collection) => (
                  <div
                    key={collection.id}
                    className={styles.collection}
                    style={{ '--accent': collection.accent } as React.CSSProperties}
                  >
                    <div className={styles.collectionHead}>
                      <div>
                        <h3 className={styles.collectionName}>{collection.name}</h3>
                        <p className={styles.collectionDesc}>{collection.description}</p>
                      </div>
                      <span className={styles.collectionCount}>
                        {collection.ownedCount} / {collection.totalCount}
                      </span>
                    </div>

                    <div className={styles.collectionTrack}>
                      <span
                        className={styles.collectionFill}
                        style={{
                          width: `${Math.round((collection.ownedCount / Math.max(1, collection.totalCount)) * 100)}%`,
                        }}
                      />
                    </div>

                    <div className={styles.collectionItems}>
                      {collection.items.map((item) => (
                        <div key={item.id} className={styles.collectionItem}>
                          <ShopItemArt
                            art={item.art}
                            category={item.category}
                            rarity={item.rarity}
                            size="sm"
                            locked={!item.owned}
                          />
                          <span className={styles.collectionItemName}>{item.name}</span>
                        </div>
                      ))}
                    </div>

                    {collection.claimable ? (
                      <button
                        type="button"
                        className={styles.claimBtn}
                        disabled={busyItemId === collection.id}
                        onClick={() => void handleClaimCollection(collection.id)}
                      >
                        {busyItemId === collection.id
                          ? 'CLAIMING…'
                          : `CLAIM ${collection.rewardCoins} COINS + ${collection.rewardItem?.name ?? 'REWARD'}`}
                      </button>
                    ) : collection.claimed ? (
                      <span className={styles.collectionClaimed}>
                        Claimed · {collection.rewardItem?.name} is yours
                      </span>
                    ) : (
                      <span className={styles.collectionHint}>
                        Complete the set to unlock {collection.rewardItem?.name} — it can&apos;t
                        be bought.
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ── Full catalogue ────────────────────────────────────────── */}
            <section className={styles.section}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>Everything else</h2>
              </div>

              <div className={styles.categoryPills} role="tablist">
                {categories.map((cat) => (
                  <button
                    key={cat.category}
                    type="button"
                    role="tab"
                    aria-selected={visibleCategory?.category === cat.category}
                    className={
                      visibleCategory?.category === cat.category
                        ? styles.pillActive
                        : styles.pill
                    }
                    onClick={() => setActiveCategory(cat.category)}
                  >
                    {CATEGORY_LABELS[cat.category] ?? cat.category}
                  </button>
                ))}
              </div>

              {visibleCategory && (
                <div className={styles.grid}>
                  {visibleCategory.items.map((item) => (
                    <ShopItemCard
                      key={item.id}
                      item={item}
                      onBuy={handleBuy}
                      busy={busyItemId === item.id}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        <RightSidebar />
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={toast.tone === 'bad' ? styles.toastBad : styles.toast}
            role="status"
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
