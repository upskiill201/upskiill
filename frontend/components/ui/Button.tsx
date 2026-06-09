import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  'aria-label'?: string;
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
  'aria-label': ariaLabel,
}: ButtonProps) {
  const [justActivated, setJustActivated] = useState(false);

  // Trigger shimmer when the button goes from disabled to active
  useEffect(() => {
    if (!disabled && !loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setJustActivated(true);
      const timer = setTimeout(() => setJustActivated(false), 600);
      return () => clearTimeout(timer);
    }
  }, [disabled, loading]);

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
      <div className="relative z-10 flex items-center justify-center gap-2 w-full h-full">
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
      </div>

      {/* Shimmer Effect */}
      <AnimatePresence>
        {justActivated && variant === 'primary' && (
          <motion.div
            initial={{ x: '-100%', opacity: 0.5 }}
            animate={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 z-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
            style={{ transform: 'skewX(-20deg)' }}
          />
        )}
      </AnimatePresence>
    </>
  );

  const motionProps = {
    whileTap: !disabled && !loading ? { scale: 0.97 } : undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style: { ...style, overflow: 'hidden' } as any, // Needed for shimmer
  };

  if (href && !disabled && !loading) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a 
          className={classes} 
          id={id}
          aria-label={ariaLabel}
          {...motionProps}
        >
          {content}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
      id={id}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
