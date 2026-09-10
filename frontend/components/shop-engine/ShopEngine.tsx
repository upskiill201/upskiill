'use client';

/**
 * ShopEngine — root renderer for the Shop Engine.
 *
 * Mounted once at the app root next to the CelebrationEngine, and built the
 * same way: the active scene is a full-page takeover rendered through a
 * portal, the app underneath is never unmounted, and each scene loads on
 * demand so the marketing routes (which never open a shop scene) do not carry
 * the code.
 *
 * Its z-index sits just below the Celebration Engine's, which is the visual
 * half of the rule enforced in ShopEngineContext: celebrations win.
 */

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useShopEngine, type ShopScene } from '@/context/ShopEngineContext';

const ItemUnlockedScene = dynamic(() => import('./scenes/ItemUnlockedScene'), { ssr: false });
const PurchaseSuccessScene = dynamic(() => import('./scenes/PurchaseSuccessScene'), {
  ssr: false,
});
const ChestRevealScene = dynamic(() => import('./scenes/ChestRevealScene'), { ssr: false });
const CollectionCompleteScene = dynamic(() => import('./scenes/CollectionCompleteScene'), {
  ssr: false,
});

let sceneCounter = 0;

export default function ShopEngine() {
  const { activeScene, advance } = useShopEngine();
  const [mounted, setMounted] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeScene) {
      sceneCounter += 1;
      setSceneKey(sceneCounter);
    }
  }, [activeScene]);

  // Escape hatch, matching the Celebration Engine: no scene may ever trap the
  // learner. Every result is already persisted server-side before its scene
  // renders, so skipping only skips animation. Ignored during the entrance
  // beat so it cannot fire by accident.
  useEffect(() => {
    if (!activeScene) return;
    const openedAt = Date.now();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && Date.now() - openedAt > 800) {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeScene, advance]);

  if (!mounted) return null;

  const renderScene = (scene: ShopScene) => {
    switch (scene.kind) {
      case 'ITEM_UNLOCKED':
        return <ItemUnlockedScene scene={scene} onAdvance={advance} />;
      case 'PURCHASE_SUCCESS':
        return <PurchaseSuccessScene scene={scene} onAdvance={advance} />;
      case 'CHEST_REVEAL':
        return <ChestRevealScene scene={scene} onAdvance={advance} />;
      case 'COLLECTION_COMPLETE':
        return <CollectionCompleteScene scene={scene} onAdvance={advance} />;
      default:
        return null;
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      {activeScene && (
        <motion.div
          key={sceneKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 100100 }}
        >
          {renderScene(activeScene)}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
