'use client';

/**
 * Linked from "your payment failed" emails and pushes. Billing portal links
 * expire within minutes, so emails point here and a fresh one is made on tap.
 */

import { useEffect, useState } from 'react';
import { proApi, ProApiError } from '@/lib/pro/api';
import styles from '@/components/pro/ProPaywall.module.css';

export default function UpdateCardPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    proApi
      .portal('payment_method_update', '/dashboard')
      .then(({ url }) => window.location.assign(url))
      .catch((err) => setError(err instanceof ProApiError ? err.message : 'Could not open billing. Try again.'));
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.scroll}>
        <div className={styles.viewWrap}>
          <div className={styles.panel}>
            <h1 className={styles.panelTitle}>{error ? 'Billing is unavailable' : 'Opening secure billing…'}</h1>
            <p className={styles.panelBody}>
              {error ?? 'You can update your card there. You will come straight back.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
