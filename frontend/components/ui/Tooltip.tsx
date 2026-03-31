'use client';

import React, { useState } from 'react';
import styles from './Tooltip.module.css';

export type TooltipProps = {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, 200); // 200ms delay to avoid flashing
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  return (
    <div 
      className={styles.container} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltip} ${styles[position]}`} role="tooltip">
          {content}
          <div className={`${styles.arrow} ${styles[`${position}Arrow`]}`} />
        </div>
      )}
    </div>
  );
};
