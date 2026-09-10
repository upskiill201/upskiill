'use client';

import { Info } from 'lucide-react';
import type { MomoCountry } from '@/lib/mesomb-countries.client';
import styles from './unlock.module.css';

interface CountryOperatorPickerProps {
  countries: MomoCountry[];
  countryCode: string;
  onCountryChange: (code: string) => void;
  operatorCode?: string;
  onOperatorChange: (code: string) => void;
  disabled?: boolean;
}

/**
 * Mobile Money market picker — a native select for the country
 * ("Cameroon (+237)", text only, NO emoji flags) plus radio-chip operators.
 * Countries the MeSomb account can't collect from stay visible but
 * disabled with a "coming soon" note (never silently hidden).
 */
export default function CountryOperatorPicker({
  countries,
  countryCode,
  onCountryChange,
  operatorCode,
  onOperatorChange,
  disabled = false,
}: CountryOperatorPickerProps) {
  const country = countries.find((c) => c.code === countryCode);

  return (
    <div role="group" aria-label="Mobile Money country and operator">
      <label className={styles.pickerLabel} htmlFor="unlock-momo-country">
        Country
      </label>
      <select
        id="unlock-momo-country"
        className={styles.countrySelect}
        value={countryCode}
        disabled={disabled}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code} disabled={!c.enabled}>
            {c.name} ({c.dialCode}){!c.enabled ? ' — coming soon' : ''}
          </option>
        ))}
      </select>

      {country && (
        <>
          <span
            className={styles.pickerLabel}
            style={{ display: 'block', marginTop: 10 }}
            id="unlock-momo-operators-label"
          >
            Operator
          </span>
          <div
            className={styles.opChips}
            role="radiogroup"
            aria-labelledby="unlock-momo-operators-label"
          >
            {country.operators.map((op) => {
              const active = op.code === operatorCode;
              return (
                <button
                  key={op.code}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={`${styles.opChip} ${active ? styles.opChipActive : ''}`}
                  disabled={disabled || !country.enabled}
                  onClick={() => onOperatorChange(op.code)}
                >
                  {op.label}
                </button>
              );
            })}
          </div>
          {country.operators.some((op) => !op.verified) && (
            <p
              style={{
                margin: '8px 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-muted, #94a3b8)',
              }}
            >
              <Info size={12} />
              Availability confirmed when you pay — pick another if your provider declines.
            </p>
          )}
        </>
      )}
    </div>
  );
}
