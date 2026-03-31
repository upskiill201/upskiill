import React from 'react';
import styles from './EmptyState.module.css';

export type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className={styles.container}>
      {icon && (
        <div className={styles.iconWrapper}>
          {icon}
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && (
        <div className={styles.actionWrapper}>
          {action}
        </div>
      )}
    </div>
  );
};
