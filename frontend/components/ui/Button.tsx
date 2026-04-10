import React from 'react';
import Link from 'next/link';
import Spinner from './Spinner';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  href,
  children,
  className = '',
  style,
  id,
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && (
        <Spinner 
          color={variant === 'primary' || variant === 'danger' ? 'white' : variant === 'secondary' ? 'blue' : 'grey'} 
          size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'} 
        />
      )}
      {!loading && leftIcon && (
        <span className={styles.iconLeft}>{leftIcon}</span>
      )}
      <span className={loading ? styles.loadingText : ''}>{children}</span>
      {!loading && rightIcon && (
        <span className={styles.iconRight}>{rightIcon}</span>
      )}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes} style={style} id={id}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      style={style}
      id={id}
    >
      {content}
    </button>
  );
}
