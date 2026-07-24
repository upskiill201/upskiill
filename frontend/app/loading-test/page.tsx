'use client';

import React, { useState } from 'react';
import TeyroBrandedLoader, { TEY_MICROCOPY_POOL, MascotPose } from '@/components/ui/TeyroBrandedLoader';
import styles from './LoadingTest.module.css';

export default function LoadingTestPage() {
  const [lineIndex, setLineIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [selectedPose, setSelectedPose] = useState<MascotPose>('random');
  const [overrideMessage, setOverrideMessage] = useState<string | undefined>(undefined);
  const [showControlsBar, setShowControlsBar] = useState(true);

  const handleNextLine = () => {
    setOverrideMessage(undefined);
    setLineIndex((prev) => (prev + 1) % TEY_MICROCOPY_POOL.length);
  };

  const handlePrevLine = () => {
    setOverrideMessage(undefined);
    setLineIndex((prev) => (prev - 1 + TEY_MICROCOPY_POOL.length) % TEY_MICROCOPY_POOL.length);
  };

  const handleRandomLine = () => {
    setOverrideMessage(undefined);
    const rand = Math.floor(Math.random() * TEY_MICROCOPY_POOL.length);
    setLineIndex(rand);
  };

  const handleSimulate8s = () => {
    setOverrideMessage("Still loading — checking your connection...");
  };

  const handleSimulate15s = () => {
    setOverrideMessage("This is taking longer than usual. Please check your internet connection.");
  };

  const poses: { label: string; value: MascotPose }[] = [
    { label: '🎲 Random Pose', value: 'random' },
    { label: '📖 Reading', value: 'reading' },
    { label: '🪑 Sitting', value: 'sitting' },
    { label: '🧍 Standing', value: 'standing' },
    { label: '😴 Sleeping', value: 'sleeping' },
    { label: '💻 Working', value: 'working' },
  ];

  return (
    <div className={styles.wrapper}>
      {/* ── LIVE LOADER PREVIEW ── */}
      <TeyroBrandedLoader
        isVisible={true}
        fullScreen={isFullScreen}
        mascotPose={selectedPose}
        forcePoolIndex={overrideMessage ? undefined : lineIndex}
        microcopyOverride={overrideMessage}
        onRetry={() => alert("Reload button clicked!")}
      />

      {/* ── FLOATING TEST CONTROLS BAR ── */}
      {showControlsBar ? (
        <div className={styles.controlBar}>
          <div className={styles.counter}>
            Teyro Loader Tester ({lineIndex + 1}/{TEY_MICROCOPY_POOL.length})
          </div>

          {/* WebM Pose Selector Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', width: '100%', justifyContent: 'center', marginBottom: '4px' }}>
            {poses.map((p) => (
              <button
                key={p.value}
                onClick={() => setSelectedPose(p.value)}
                style={{
                  background: selectedPose === p.value ? '#0172FD' : '#1E293B',
                  color: 'white',
                  border: selectedPose === p.value ? '1.5px solid #38BDF8' : '1px solid #334155',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button onClick={handlePrevLine} className={styles.btn}>
            {"◀ Prev Line"}
          </button>

          <button onClick={handleNextLine} className={styles.btn}>
            {"Next Line ▶"}
          </button>

          <button onClick={handleRandomLine} className={`${styles.btn} ${styles.btnBlue}`}>
            {"🎲 Random Line"}
          </button>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className={`${styles.btn} ${isFullScreen ? styles.btnPurple : styles.btnGreen}`}
          >
            {isFullScreen ? "Mode: Full Screen" : "Mode: Workspace"}
          </button>

          <button onClick={handleSimulate8s} className={`${styles.btn} ${styles.btnAmber}`}>
            {"8s Connection Msg"}
          </button>

          <button onClick={handleSimulate15s} className={`${styles.btn} ${styles.btnRed}`}>
            {"15s Timeout + Reload"}
          </button>

          <button onClick={() => setShowControlsBar(false)} className={`${styles.btn} ${styles.btnGhost}`}>
            {"🙈 Hide Controls"}
          </button>
        </div>
      ) : (
        /* Tiny non-intrusive floating pill when controls are hidden */
        <button onClick={() => setShowControlsBar(true)} className={styles.showControlsBtn}>
          {"⚙️ Show Controls"}
        </button>
      )}
    </div>
  );
}
