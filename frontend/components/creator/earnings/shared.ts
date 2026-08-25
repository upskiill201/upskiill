'use client';

/**
 * Shared money formatting + types for the earnings feature.
 * Backend amounts are INTEGER minor units (cents) — never feed raw minors
 * into display helpers expecting dollars.
 */

export const money = (minor: number): string =>
  `$${(minor / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const moneyShort = (minor: number): string => {
  const d = minor / 100;
  if (Math.abs(d) >= 1000) return `$${(d / 1000).toFixed(1)}k`;
  return `$${d.toFixed(d % 1 === 0 ? 0 : 2)}`;
};

export interface AgreementInfo {
  tier: 'STANDARD' | 'FOUNDING';
  creatorSharePct: number;
  isFounding: boolean;
  effectiveFrom?: string | null;
}

export interface Balances {
  lifetimeEarned: number;
  pendingClearing: number;
  reservedForPayout: number;
  available: number;
  totalPaidOut: number;
  reserveDays: number;
  minPayoutMinor: number;
  currency: string;
}

export type TxType = 'SALE' | 'RENEWAL' | 'REFUND' | 'CHARGEBACK' | 'REVERSAL' | 'ADJUSTMENT';

export interface EarningsTx {
  id: string;
  publicId: string;
  type: TxType;
  occurredAt: string;
  courseId: string | null;
  courseTitle: string | null;
  studentRef: string | null;
  orderId: string | null;
  provider: string;
  providerReference: string | null;
  grossMinor: number;
  discountMinor: number;
  feeMinor: number;
  netMinor: number;
  currency: string;
  creatorSharePct: number;
  creatorAmountMinor: number;
  teyroAmountMinor: number;
  relatedTransactionId: string | null;
  reason: string | null;
}
