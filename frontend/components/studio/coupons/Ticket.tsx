'use client';

/**
 * A coupon drawn as a ticket: the discount on a coloured stub, then the code
 * (with copy), where it applies, when it ends, and how much of its limit is
 * used. The same ticket previews a coupon while it's being made.
 */

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Copy } from 'lucide-react';
import { Bar, Pill, studio as s } from '../StudioParts';
import { STATUS_LABEL, type CouponDerivedStatus, type CouponDiscountType } from './shared';
import c from './coupons.module.css';

export const STATUS_TONE: Record<CouponDerivedStatus, string> = {
  ACTIVE: 'var(--success-green)',
  SCHEDULED: 'var(--color-brand)',
  PAUSED: 'var(--warning)',
  DISABLED: 'var(--error-red)',
  ARCHIVED: 'var(--text-muted)',
  EXPIRED: 'var(--text-muted)',
  USAGE_LIMIT_REACHED: 'var(--brand-purple)',
};

export function endsLabel(expiresAt: string | null, startsAt?: string | null): string {
  const now = Date.now();
  if (startsAt && Date.parse(startsAt) > now) {
    return `Starts ${new Date(startsAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  }
  if (!expiresAt) return 'No end date';
  const t = Date.parse(expiresAt);
  if (t < now) return `Ended ${new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  const days = Math.ceil((t - now) / 86400000);
  if (days <= 1) return 'Ends today';
  if (days <= 14) return `Ends in ${days} days`;
  return `Ends ${new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
}

export function Ticket({
  code,
  discountType,
  discountValue,
  status,
  courses,
  plans,
  ends,
  used,
  max,
  href,
  onCopy,
  footer,
}: {
  code: string;
  discountType: CouponDiscountType;
  discountValue: number;
  status?: CouponDerivedStatus;
  courses: string;
  plans: string;
  ends: string;
  used?: number;
  max?: number | null;
  href?: string;
  onCopy?: () => void;
  footer?: ReactNode;
}) {
  const tone = status ? STATUS_TONE[status] : 'var(--color-brand)';
  const live = !status || status === 'ACTIVE' || status === 'SCHEDULED';
  const style = { '--tone': live ? 'var(--color-brand)' : tone } as CSSProperties;
  const body = (
    <>
      <span className={c.stub} aria-hidden="true">
        <span className={c.stubValue}>
          {discountType === 'PERCENTAGE' ? `${discountValue || 0}%` : `$${discountValue || 0}`}
        </span>
        <span className={c.stubOff}>OFF</span>
      </span>
      <span className={c.body}>
        {status && (
          <span>
            <Pill tone={tone}>{STATUS_LABEL[status]}</Pill>
          </span>
        )}
        <span className={c.codeRow}>
          <span className={c.code} title={code}>
            {code || 'YOURCODE'}
          </span>
        </span>
        <span className={c.meta}>
          <span>{courses}</span>
          <span>{plans}</span>
          <span>{ends}</span>
        </span>
        {used !== undefined && (
          <span className={c.uses} style={onCopy ? { paddingRight: 48 } : undefined}>
            {max ? <Bar pct={(used / max) * 100} label="Uses" /> : <span />}
            <span>
              {used}
              {max ? ` / ${max}` : ''} used
            </span>
          </span>
        )}
        {footer}
      </span>
    </>
  );
  return (
    <div style={{ position: 'relative' }}>
      {href ? (
        <Link href={href} className={`${c.ticket} ${live ? '' : c.ticketDim}`} style={style}>
          {body}
        </Link>
      ) : (
        <div className={`${c.ticket} ${live ? '' : c.ticketDim}`} style={style}>
          {body}
        </div>
      )}
      {onCopy && (
        <button
          type="button"
          className={s.iconBtn}
          aria-label={`Copy code ${code}`}
          title="Copy code"
          onClick={onCopy}
          style={{ position: 'absolute', right: 12, bottom: 12 }}
        >
          <Copy size={16} />
        </button>
      )}
    </div>
  );
}
