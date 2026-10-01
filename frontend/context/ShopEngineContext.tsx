'use client';

/**
 * ShopEngineContext — the queue behind the Shop Engine.
 *
 * Same grammar as the Celebration Engine (see CelebrationContext): scenes are
 * queued, played one at a time as full-page takeovers, and advanced by their
 * CTA. It is a separate engine rather than more CelebrationScene variants
 * because the two have different jobs — celebrations report something that
 * already happened, shop scenes are transactional (a purchase to confirm, an
 * unlock to act on) and carry their own follow-up actions.
 *
 * The two never play at once: a shop scene defers while a celebration is on
 * screen, so a lesson's reward chain is never interrupted by a shop banner.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { isCelebrationActive } from './CelebrationContext';
import { fetchPendingUnlocks, markUnlocksSeen } from '@/lib/shop/api';
import type { ShopItem } from '@/lib/shop/types';

// ─── Scenes ──────────────────────────────────────────────────────────────────

export type ShopScene =
  | {
      /**
       * A learning requirement was just met. Fires anywhere in the app, not
       * only in the shop — the whole point is that the learner finds out the
       * moment they earn it, with the price right there.
       */
      kind: 'ITEM_UNLOCKED';
      item: ShopItem;
      /** Jump straight into buying it from the scene. */
      onBuy?: (item: ShopItem) => void;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'PURCHASE_SUCCESS';
      itemId: string;
      itemName: string;
      rarity: string;
      art: string;
      /** Cosmetic slot, or null for power-ups. */
      slot: string | null;
      price: number;
      /** Coin balance after the purchase — the count-down target. */
      coinsAfter: number;
      coinsBefore: number;
      message: string;
      /** Equip straight from the scene, for cosmetics. */
      onEquip?: () => Promise<void> | void;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'CHEST_REVEAL';
      chestName: string;
      /** The chest's own art key (e.g. chest-gold) — drawn from public/art/items. */
      chestArt?: string;
      accent: string;
      rarity: string;
      coins: number;
      substituted: boolean;
      item: { id: string; name: string; rarity: string; art: string; slot: string | null } | null;
      coinsAfter: number;
      onComplete?: () => void;
      dedupeKey?: string;
    }
  | {
      kind: 'COLLECTION_COMPLETE';
      collectionName: string;
      accent: string;
      rewardCoins: number;
      rewardItem: { id: string; name: string; rarity: string; art: string } | null;
      coinsAfter: number;
      onComplete?: () => void;
      dedupeKey?: string;
    };

interface ShopEngineContextValue {
  /** Queue one or more scenes. They play in order, one at a time. */
  shopScene: (input: ShopScene | ShopScene[]) => void;
  advance: () => void;
  closeAll: () => void;
  activeScene: ShopScene | null;
  isPlaying: boolean;
  /** Ask the server whether anything unlocked, and surface it if so. */
  checkUnlocks: () => Promise<void>;
}

const ShopEngineContext = createContext<ShopEngineContextValue | null>(null);

/** dedupeKeys already surfaced this session — cleared on a full reload. */
const surfacedKeys = new Set<string>();

/** How long to wait before re-checking when a celebration is mid-flight. */
const DEFER_MS = 1500;

export function ShopEngineProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<ShopScene[]>([]);
  const [activeScene, setActiveScene] = useState<ShopScene | null>(null);

  // Mirror of activeScene so advance() never needs a side-effecting updater
  // (StrictMode double-invokes those, which would fire onComplete twice).
  const activeSceneRef = useRef<ShopScene | null>(null);
  activeSceneRef.current = activeScene;

  const shopScene = useCallback((input: ShopScene | ShopScene[]) => {
    const incoming = Array.isArray(input) ? input : [input];
    if (incoming.length === 0) return;

    setQueue((prev) => {
      const next = [...prev];
      for (const scene of incoming) {
        if (scene.dedupeKey) {
          if (surfacedKeys.has(scene.dedupeKey)) continue;
          if (next.some((s) => s.dedupeKey === scene.dedupeKey)) continue;
        }
        next.push(scene);
      }
      return next;
    });
  }, []);

  const advance = useCallback(() => {
    const current = activeSceneRef.current;
    if (!current) return; // re-entry guard (double-tap on the CTA)
    activeSceneRef.current = null;
    setActiveScene(null);
    if (current.onComplete) {
      try {
        current.onComplete();
      } catch (e) {
        console.error('ShopScene onComplete failed:', e);
      }
    }
  }, []);

  const closeAll = useCallback(() => {
    activeSceneRef.current = null;
    setQueue([]);
    setActiveScene(null);
  }, []);

  // ── Drain queue → active, yielding to the Celebration Engine ──────────────

  useEffect(() => {
    if (activeScene !== null) return;
    if (queue.length === 0) return;

    // Two full-page takeovers must never stack. Celebrations win: they are
    // the reward for the work the learner just did.
    if (isCelebrationActive()) {
      const timer = setTimeout(() => setQueue((q) => [...q]), DEFER_MS);
      return () => clearTimeout(timer);
    }

    const [next, ...rest] = queue;
    if (next.dedupeKey) surfacedKeys.add(next.dedupeKey);
    setActiveScene(next);
    setQueue(rest);
  }, [queue, activeScene]);

  // ── Unlock detection ──────────────────────────────────────────────────────

  const checkUnlocks = useCallback(async () => {
    try {
      const pending = await fetchPendingUnlocks();
      if (pending.length === 0) return;

      // Mark seen as the scenes are queued, not when they close: a learner who
      // navigates away mid-scene should not be shown the same unlock forever.
      // The item stays in the shop either way — this only controls the takeover.
      void markUnlocksSeen(pending.map((p) => p.item.id)).catch(() => {});

      shopScene(
        pending.map((p) => ({
          kind: 'ITEM_UNLOCKED' as const,
          item: p.item,
          dedupeKey: `shop-unlock-${p.item.id}`,
        })),
      );
    } catch {
      // A failed poll is not worth surfacing — the shop page shows the same
      // unlocks in place, so nothing is lost by staying quiet here.
    }
  }, [shopScene]);

  // Check once on mount, then whenever something that could unlock an item
  // reports in (lesson completion, streak extension, league settlement).
  useEffect(() => {
    const timer = setTimeout(() => {
      void checkUnlocks();
    }, 2500);

    const onCheck = () => void checkUnlocks();
    window.addEventListener('teyro:shop-check-unlocks', onCheck);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('teyro:shop-check-unlocks', onCheck);
    };
  }, [checkUnlocks]);

  // PERF: memoized. An inline object literal here produced a new context
  // value on every render of this provider, which re-renders every consumer
  // beneath it whether or not the underlying state actually changed.
  const value = useMemo(
    () => ({
      shopScene,
      advance,
      closeAll,
      activeScene,
      isPlaying: activeScene !== null,
      checkUnlocks,
    }),
    [
    shopScene,
    advance,
    closeAll,
    activeScene,
    checkUnlocks,
    ]
  );

  return (
    <ShopEngineContext.Provider value={value}>
      {children}
    </ShopEngineContext.Provider>
  );
}

export function useShopEngine() {
  const ctx = useContext(ShopEngineContext);
  if (!ctx) {
    throw new Error('useShopEngine must be used inside <ShopEngineProvider>');
  }
  return ctx;
}

/**
 * Ask the Shop Engine to re-check for unlocks from anywhere, including
 * non-React code (the lesson player, the streak reconciler).
 */
export function requestShopUnlockCheck() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('teyro:shop-check-unlocks'));
}
