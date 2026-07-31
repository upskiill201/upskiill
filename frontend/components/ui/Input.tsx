import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';
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
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {props.required && (
            <span aria-hidden="true" style={{ color: 'var(--error-red, #ef4444)', marginLeft: '0.25rem' }}>
              *
            </span>
          )}
        </label>
      )}
      
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
        <span id={`${id}-error`} className={`${styles.errorText} flex items-center gap-1`} role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </span>
      ) : hint ? (
        <span id={`${id}-hint`} className={styles.hintText}>{hint}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
