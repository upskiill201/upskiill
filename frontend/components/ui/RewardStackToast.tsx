'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RewardStackToast.module.css';

export interface RewardToastItem {
  id: string;
  icon: string;
  title: string;
  desc?: string;
}

interface RewardToastContextType {
  showRewardToast: (toast: Omit<RewardToastItem, 'id'>) => void;
}

const RewardToastContext = createContext<RewardToastContextType | undefined>(undefined);

export const RewardToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<RewardToastItem[]>([]);

  const showRewardToast = useCallback((toast: Omit<RewardToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <RewardToastContext.Provider value={{ showRewardToast }}>
      {children}
      <div className={styles.toastStack}>
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className={styles.toastItem}
            >
              <div className={styles.toastIcon}>{t.icon}</div>
              <div className={styles.toastContent}>
                <span className={styles.toastTitle}>{t.title}</span>
                {t.desc && <span className={styles.toastDesc}>{t.desc}</span>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </RewardToastContext.Provider>
  );
};

export const useRewardToast = () => {
  const context = useContext(RewardToastContext);
  if (!context) {
    throw new Error('useRewardToast must be used within RewardToastProvider');
  }
  return context;
};
