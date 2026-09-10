'use client';

import type { MomoCountry } from '@/lib/mesomb-countries.client';
import styles from './unlock.module.css';

interface PhoneFieldProps {
  fieldId: string;
  country: MomoCountry;
  value: string;
  onChange: (value: string) => void;
  /** Optional blur hook — used for early inline validation. */
  onBlur?: () => void;
  error?: string | null;
  disabled?: boolean;
}

/**
 * Mobile Money payer-number input: dial-prefix chip + tel input with the
 * country's example number as placeholder, inline error wired through
 * aria-invalid/aria-describedby.
 */
export default function PhoneField({
  fieldId,
  country,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}: PhoneFieldProps) {
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <label className={styles.pickerLabel} htmlFor={fieldId}>
        Your {country.name} number
      </label>
      <div className={styles.phoneRow}>
        <span className={styles.dialChip} aria-hidden="true">
          {country.dialCode}
        </span>
        <input
          id={fieldId}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={country.phoneExample}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => {
            if (value.trim()) onBlur?.();
          }}
          className={`${styles.phoneInput} ${error ? styles.phoneInputInvalid : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {error && (
        <p id={errorId} className={styles.fieldError} style={{ marginTop: 6 }}>
          {error}
        </p>
      )}
    </div>
  );
}
