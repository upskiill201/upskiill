import React, { forwardRef } from 'react';
import styles from './Input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  hint?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  name,
  label,
  leftIcon,
  rightIcon,
  error,
  hint,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      
      <div className={styles.inputContainer}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        
        <input
          ref={ref}
          id={id}
          name={name}
          className={`
            ${styles.input}
            ${leftIcon ? styles.hasLeftIcon : ''}
            ${rightIcon ? styles.hasRightIcon : ''}
            ${error ? styles.errorInput : ''}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        
        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
      
      {error ? (
        <span id={`${id}-error`} className={styles.errorText}>{error}</span>
      ) : hint ? (
        <span id={`${id}-hint`} className={styles.hintText}>{hint}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
