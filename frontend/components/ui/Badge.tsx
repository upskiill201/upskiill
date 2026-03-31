import React from 'react';
import styles from './Badge.module.css';

type BadgeProps = {
  variant?: 'blue' | 'yellow' | 'green' | 'red' | 'grey' | 'purple' | 'dark';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export default function Badge({
  variant = 'blue',
  size = 'md',
  icon,
  children,
}: BadgeProps) {
  const classes = [styles.badge, styles[variant], styles[size]]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}
