'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
};

const iconMap = {
  success: <CheckCircle className={styles.iconSuccess} size={20} />,
  error: <XCircle className={styles.iconError} size={20} />,
  info: <Info className={styles.iconInfo} size={20} />,
  warning: <AlertTriangle className={styles.iconWarning} size={20} />,
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 4000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Wait for exit animation
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${styles[type]} ${isLeaving ? styles.leaving : ''}`} role="alert" aria-live="assertive">
      <div className={styles.iconWrapper}>
        {iconMap[type]}
      </div>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>
      <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};
