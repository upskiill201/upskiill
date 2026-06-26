import React, { forwardRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './Textarea.module.css';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  id,
  name,
  label,
  error,
  hint,
  className = '',
  maxLength,
  onChange,
  value,
  rows = 4,
  required,
  ...props
}, ref) => {
  const [charCount, setCharCount] = useState(
    typeof value === 'string' ? value.length : 0
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    if (onChange) onChange(e);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && (
            <span aria-hidden="true" style={{ color: 'var(--error-red, #ef4444)', marginLeft: '4px' }}>
              *
            </span>
          )}
        </label>
      )}
      
      <div className={styles.textareaContainer}>
        <textarea
          ref={ref}
          id={id}
          name={name}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          rows={rows}
          className={`
            ${styles.textarea}
            ${error ? styles.errorTextarea : ''}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          required={required}
          {...props}
        />
        
        {maxLength && (
          <span className={styles.counter}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      
      {error ? (
        <div id={`${id}-error`} className={styles.errorText} role="alert" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertTriangle size={14} aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : hint ? (
        <span id={`${id}-hint`} className={styles.hintText}>{hint}</span>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
