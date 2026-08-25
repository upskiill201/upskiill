'use client';

/**
 * Layout-true shimmer skeletons for each Earnings tab. Each mirrors the
 * real content's anatomy so nothing jumps when data lands.
 */

import styles from './earnings.module.css';

function Sk({ className }: { className: string }) {
  return <div className={`${styles.skBlock} ${className}`} aria-hidden />;
}

export function OverviewSkeleton() {
  return (
    <div className={styles.skStack}>
      <div className={styles.skBalanceCard}>
        <Sk className={styles.skBlock} />
        <div style={{ flex: 1 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <Sk className={styles.skRowCard} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.skSegRow}>
        {[0, 1, 2, 3].map((i) => (
          <Sk key={i} className={styles.skSeg} />
        ))}
      </div>
      <Sk className={styles.skChart} />
      <Sk className={styles.skChart} />
      <Sk className={styles.skRowCard} />
      <Sk className={styles.skRowCard} />
      <Sk className={styles.skRowCard} />
    </div>
  );
}

export function TransactionsSkeleton() {
  return (
    <div className={styles.skStack}>
      <Sk className={styles.skBanner} />
      <div className={styles.skSegRow}>
        {[0, 1, 2, 3].map((i) => (
          <Sk key={i} className={styles.skSeg} />
        ))}
      </div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Sk key={i} className={styles.skRowCard} />
      ))}
    </div>
  );
}

export function PayoutsSkeleton() {
  return (
    <div className={styles.skStack}>
      <div className={styles.skBalanceCard}>
        <div style={{ flex: 1 }}>
          <Sk className={styles.skField} />
        </div>
      </div>
      <Sk className={styles.skBanner} />
      {[0, 1, 2].map((i) => (
        <Sk key={i} className={styles.skRowCard} />
      ))}
    </div>
  );
}

export function PaymentInfoSkeleton() {
  return (
    <div className={styles.skStack}>
      <Sk className={styles.skBanner} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {[0, 1, 2, 3].map((i) => (
          <Sk key={i} className={styles.skField} />
        ))}
      </div>
      <Sk className={styles.skBanner} />
    </div>
  );
}

export function ReportsSkeleton() {
  return (
    <div className={styles.skStack}>
      {[0, 1, 2].map((i) => (
        <Sk key={i} className={styles.skRowCard} />
      ))}
    </div>
  );
}

export function InlineError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className={styles.bannerError} role="alert">
      {message}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#b71c1c', fontWeight: 800, cursor: 'pointer' }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
