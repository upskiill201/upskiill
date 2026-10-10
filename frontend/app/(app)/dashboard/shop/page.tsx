'use client';

/**
 * The Shop — laid out like Duolingo's.
 *
 * One list, in the order a learner shops: your stuff (the shop stats), hearts,
 * power-ups, what's here for a limited time, chests, style (cosmetics, as a
 * grid you can see), collections, then your locker. Rows, not a wall of
 * cards: art on the left, a chunky price button on the right. A button that
 * can't be used still answers a tap — with a soft "not yet" and the reason.
 *
 * Every purchase hands off to the Shop Engine for the reveal, so the moment
 * always feels the same wherever it was triggered from.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, ChevronDown, RefreshCw, Sparkles, Zap } from 'lucide-react';
import { useGamification } from '@/context/GamificationContext';
import { useShopEngine } from '@/context/ShopEngineContext';
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
import { CATEGORY_LABELS } from '@/lib/shop/cosmetics';
import { getLastCatalog, rememberCatalog } from '@/lib/shop/previewCache';
import type { ShopCatalog, ShopItem } from '@/lib/shop/types';
import { pickShopMessage } from '@/lib/tey/shopVoice';
import { playSound } from '@/lib/audio/lessonSounds';
import { playHaptic } from '@/lib/haptics';
import styles from './Shop.module.css';

const STYLE_CATEGORIES = ['FRAME', 'BACKGROUND', 'CELEBRATION_FX', 'XP_FX'];

export default function ShopPage() {
  const reducedMotion = useReducedMotion();
  const { refresh } = useGamification();
  const { shopScene } = useShopEngine();

  // A revisit paints the last catalog right away and refreshes underneath —
  // it used to show the loading screen on every visit while it re-fetched.
  const [catalog, setCatalog] = useState<ShopCatalog | null>(() => getLastCatalog());
  const [loading, setLoading] = useState(() => getLastCatalog() === null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; tone: 'ok' | 'bad' } | null>(null);
  const [styleTab, setStyleTab] = useState<string>('FRAME');
  const [openOdds, setOpenOdds] = useState<string | null>(null);
  /** Bumped on every catalog reload so the locker re-reads what's owned. */
  const [lockerToken, setLockerToken] = useState(0);

  const visitClaimed = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((text: string, tone: 'ok' | 'bad' = 'ok') => {
    setToast({ text, tone });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const data = await fetchCatalog();
      rememberCatalog(data);
      setCatalog(data);
      setLockerToken((n) => n + 1);
    } catch (e) {
      setLoadError(e instanceof ShopError ? e.message : 'Could not load the shop. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Daily visit bonus — claimed once per day, server-side. The ref guards
  // against React StrictMode double-mounting firing it twice on dev.
  useEffect(() => {
    if (visitClaimed.current) return;
    visitClaimed.current = true;
    registerVisit()
      .then((res) => {
        if (res.rewarded && res.reward) {
          playSound('collect', 2);
          showToast(`+${res.reward} coins · day ${res.visitStreak} of visiting`);
          void refresh();
          setCatalog((prev) => (prev ? { ...prev, coins: res.coins } : prev));
        }
      })
      .catch(() => {
        /* The visit bonus is a nicety; never block the shop on it. */
      });
  }, [refresh, showToast]);

  const onBlocked = useCallback((_item: ShopItem, message: string) => showToast(message, 'bad'), [showToast]);

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
            chestArt: item.art,
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
        playSound('nodeLocked');
        showToast(
          e instanceof ShopError ? pickShopMessage(e.code, e.message) : 'That purchase did not go through.',
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
      playSound('select');
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
        playSound('nodeLocked');
        showToast(e instanceof ShopError ? pickShopMessage(e.code, e.message) : 'Could not claim that.', 'bad');
      } finally {
        setBusyItemId(null);
      }
    },
    [busyItemId, load, refresh, shopScene, showToast],
  );

  // ── Derived lists ─────────────────────────────────────────────────────────

  const byCategory = useMemo(() => {
    const m = new Map<string, ShopItem[]>();
    for (const c of catalog?.categories ?? []) m.set(c.category, c.items);
    return m;
  }, [catalog]);

  const allItems = useMemo(() => [...byCategory.values()].flat(), [byCategory]);
  // "Why this, now" lines from the server's recommendations, shown on the
  // item's own row instead of a second copy of it.
  const reasonFor = useMemo(
    () => new Map((catalog?.recommendations ?? []).map((r) => [r.item.id, r.reason])),
    [catalog],
  );
  const hearts = allItems.find((i) => i.id === 'REFILL_HEARTS') ?? null;
  // Unlocked first, then the ones you're working toward.
  const powerUps = (byCategory.get('POWER_UP') ?? [])
    .filter((i) => i.id !== 'REFILL_HEARTS')
    .sort((a, b) => Number(b.unlock.unlocked) - Number(a.unlock.unlocked));
  const styleCats = STYLE_CATEGORIES.filter((c) => (byCategory.get(c) ?? []).length > 0);
  const activeStyle = styleCats.includes(styleTab) ? styleTab : styleCats[0];
  const ownedCount = allItems.filter((i) => i.owned).length;
  const activeBoosts = allItems.filter((i) => i.activeUntil && new Date(i.activeUntil).getTime() > Date.now());

  // ── Loading / error states ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className={styles.shop} aria-busy="true" aria-label="Loading the shop">
        <div className={styles.main}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonStats} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={styles.skeletonRow} />
          ))}
        </div>
      </div>
    );
  }

  if (loadError || !catalog) {
    return (
      <div className={styles.shop}>
        <div className={styles.main}>
          <div className={styles.errorState} role="alert">
            <AlertCircle size={32} strokeWidth={2.5} />
            <h2>The shop didn&apos;t load</h2>
            <p>{loadError}</p>
            <button type="button" className={styles.retryBtn} onClick={() => void load()}>
              <RefreshCw size={16} strokeWidth={2.75} />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const weekly = catalog.weeklySpecial;
  const hasLimited = !!weekly || catalog.dailyRotation.items.length > 0;

  return (
    <div className={styles.shop}>
      <div className={styles.main}>
        <h1 className={`${styles.title} ${styles.oTitle}`}>Shop</h1>

        {/* ── Event banner ── */}
        {catalog.event && (
          <section
            className={`${styles.eventBanner} ${styles.oEvent}`}
            style={{ '--accent': catalog.event.accent } as React.CSSProperties}
          >
            <Sparkles size={20} strokeWidth={2.5} />
            <div>
              <h2 className={styles.eventName}>{catalog.event.name}</h2>
              <p className={styles.eventTagline}>{catalog.event.tagline}</p>
            </div>
            {catalog.event.discountPercent > 0 && (
              <span className={styles.eventDiscount}>-{catalog.event.discountPercent}%</span>
            )}
          </section>
        )}

        {/* ── Hearts ── */}
        {hearts && (
          <section className={`${styles.section} ${styles.oHearts}`}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Hearts</h2>
              <span className={styles.heartRow} aria-label={`${catalog.lives} of ${catalog.maxLives} hearts`}>
                {Array.from({ length: catalog.maxLives }).map((_, i) => (
                  <Image
                    key={i}
                    src="/art/items/heart.svg"
                    alt=""
                    width={22}
                    height={22}
                    className={i < catalog.lives ? undefined : styles.heartEmpty}
                  />
                ))}
              </span>
            </div>
            <div className={styles.list}>
              <ShopItemCard
                item={hearts}
                reason={reasonFor.get(hearts.id)}
                variant="row"
                onBuy={handleBuy}
                onBlocked={onBlocked}
                busy={busyItemId === hearts.id}
              />
            </div>
          </section>
        )}

        {/* ── Power-ups ── */}
        {powerUps.length > 0 && (
          <section className={`${styles.section} ${styles.oPower}`}>
            <h2 className={styles.sectionTitle}>Power-ups</h2>
            <div className={styles.list}>
              {powerUps.map((item) => (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  reason={reasonFor.get(item.id)}
                  variant="row"
                  onBuy={handleBuy}
                  onBlocked={onBlocked}
                  busy={busyItemId === item.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Limited time ── */}
        {hasLimited && (
          <section className={`${styles.section} ${styles.oLimited}`}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Limited time</h2>
              <CountdownPill ms={catalog.dailyRotation.resetsInMs} label="New picks in" />
            </div>

            <div className={styles.list}>
              {weekly && (
                <ShopItemCard
                  key={`weekly-${weekly.item.id}`}
                  item={weekly.item}
                  reason={`This week only: ${weekly.discountPercent}% off`}
                  variant="row"
                  onBuy={handleBuy}
                  onBlocked={onBlocked}
                  busy={busyItemId === weekly.item.id}
                />
              )}
              {catalog.dailyRotation.items.map((item) => (
                <ShopItemCard
                  key={`daily-${item.id}`}
                  item={item}
                  variant="row"
                  onBuy={handleBuy}
                  onBlocked={onBlocked}
                  busy={busyItemId === item.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Chests ── */}
        {catalog.chests.some((c) => c.item) && (
          <section className={`${styles.section} ${styles.oChests}`}>
            <h2 className={styles.sectionTitle}>Chests</h2>
            <div className={styles.list}>
              {catalog.chests.map(
                (chest) =>
                  chest.item && (
                    <div key={chest.tier} className={styles.chestRow}>
                      <ShopItemCard
                        item={chest.item}
                        variant="row"
                        onBuy={handleBuy}
                        onBlocked={onBlocked}
                        busy={busyItemId === chest.item.id}
                      />
                      {/* Odds are published before the spend, not after. */}
                      <button
                        type="button"
                        className={styles.oddsToggle}
                        aria-expanded={openOdds === chest.tier}
                        onClick={() => {
                          playSound(openOdds === chest.tier ? 'menuClose' : 'menuOpen');
                          setOpenOdds((t) => (t === chest.tier ? null : chest.tier));
                        }}
                      >
                        What&apos;s inside
                        <ChevronDown
                          size={16}
                          strokeWidth={2.75}
                          className={openOdds === chest.tier ? styles.chevOpen : ''}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openOdds === chest.tier && (
                          <motion.ul
                            className={styles.odds}
                            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <li className={styles.oddsFloor}>Always at least {chest.coinFloor} coins</li>
                            {chest.odds.map((row) => (
                              <li key={row.label}>
                                <span>{row.label}</span>
                                <strong>{row.percent}%</strong>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ),
              )}
            </div>
          </section>
        )}

        {/* ── Style (cosmetics) ── */}
        {styleCats.length > 0 && activeStyle && (
          <section className={`${styles.section} ${styles.oStyle}`}>
            <h2 className={styles.sectionTitle}>Style</h2>
            <div className={styles.tabs} role="tablist" aria-label="Style categories">
              {styleCats.map((cat, i) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeStyle === cat}
                  className={activeStyle === cat ? styles.tabOn : styles.tab}
                  onClick={() => {
                    playSound('navTap', i);
                    playHaptic('selection', false);
                    setStyleTab(cat);
                  }}
                >
                  {CATEGORY_LABELS[cat] ?? cat}
                </button>
              ))}
            </div>
            <div className={styles.grid} role="tabpanel">
              {(byCategory.get(activeStyle) ?? []).map((item) => (
                <ShopItemCard
                  key={item.id}
                  item={item}
                  onBuy={handleBuy}
                  onBlocked={onBlocked}
                  busy={busyItemId === item.id}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── Collections ── */}
        {catalog.collections.length > 0 && (
          <section className={`${styles.section} ${styles.oCollections}`}>
            <h2 className={styles.sectionTitle}>Collections</h2>
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
                      Complete the set to unlock {collection.rewardItem?.name}. It can&apos;t be bought.
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Right rail on desktop; on phones these slot into the list ── */}
      <aside className={styles.rail} aria-label="Your stuff">
        {/* Shop stats — what you hold right now. */}
        <section className={`${styles.statsCard} ${styles.oStats}`} aria-label="Your stuff">
          <h2 className={styles.railTitle}>Your stuff</h2>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <Image src="/Icons/Coin.png" alt="" width={30} height={30} />
              <span className={styles.statNum}>{catalog.coins.toLocaleString()}</span>
              <span className={styles.statLabel}>Coins</span>
            </div>
            <div className={styles.stat}>
              <Image src="/art/items/heart.svg" alt="" width={30} height={30} />
              <span className={styles.statNum}>
                {catalog.lives}/{catalog.maxLives}
              </span>
              <span className={styles.statLabel}>Hearts</span>
            </div>
            <div className={styles.stat}>
              <Image src="/art/items/freeze.svg" alt="" width={30} height={30} />
              <span className={styles.statNum}>
                {catalog.streakFreezeBank}/{catalog.freezeCap}
              </span>
              <span className={styles.statLabel}>Freezes</span>
            </div>
            <div className={styles.stat}>
              <Image src="/art/ui/bag.svg" alt="" width={30} height={30} />
              <span className={styles.statNum}>{ownedCount}</span>
              <span className={styles.statLabel}>Items owned</span>
            </div>
          </div>
          {activeBoosts.map((b) => (
            <div key={b.id} className={styles.boostRow}>
              <Zap size={18} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
              <span>{b.name} active</span>
              <CountdownPill ms={new Date(b.activeUntil as string).getTime() - Date.now()} label="Ends in" />
            </div>
          ))}
        </section>

        {catalog.goals.length > 0 && (
          <section className={`${styles.railCard} ${styles.oGoals}`} aria-label="Working toward">
            <h2 className={styles.railTitle}>Working toward</h2>
            {catalog.goals.map((goal) => {
              const percent = Math.min(100, Math.round((goal.current / Math.max(1, goal.target)) * 100));
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
          </section>
        )}

        <section className={`${styles.railCard} ${styles.oLocker}`} aria-label="Your locker">
          <h2 className={styles.railTitle}>Your locker</h2>
          <InventoryLocker refreshToken={lockerToken} onError={(message) => showToast(message, 'bad')} />
        </section>
      </aside>

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
