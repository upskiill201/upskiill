/**
 * Version-tolerant readers for Stripe objects. Pro pins dahlia, where period
 * dates live on subscription items and an invoice's subscription sits under
 * `parent`. Older shapes still arrive in webhook payloads created by an
 * endpoint on an older version, so every reader accepts both. Handlers
 * re-fetch objects with the pinned client anyway; these are the backstop.
 */

type Loose = Record<string, any>;

export function toDate(seconds: number | null | undefined): Date | null {
  return typeof seconds === 'number' && seconds > 0 ? new Date(seconds * 1000) : null;
}

export function idOf(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && typeof (value as Loose).id === 'string') {
    return (value as Loose).id;
  }
  return null;
}

/** Current billing period of a subscription. */
export function periodOf(sub: Loose): { start: Date | null; end: Date | null } {
  const item = sub?.items?.data?.[0];
  return {
    start: toDate(item?.current_period_start ?? sub?.current_period_start),
    end: toDate(item?.current_period_end ?? sub?.current_period_end),
  };
}

/** Price id the subscription bills (first item). */
export function priceIdOf(sub: Loose): string | null {
  return idOf(sub?.items?.data?.[0]?.price);
}

export function subscriptionIdOfInvoice(invoice: Loose): string | null {
  return (
    idOf(invoice?.parent?.subscription_details?.subscription) ??
    idOf(invoice?.subscription)
  );
}

/**
 * The period an invoice pays for, from its line item. invoice.period_* are
 * the invoice's own dates (for a renewal, the period that just ended), so
 * they would credit revenue to the wrong month.
 */
export function servicePeriodOfInvoice(invoice: Loose): { start: Date | null; end: Date | null } {
  const line = invoice?.lines?.data?.find((l: Loose) => l?.period) ?? invoice?.lines?.data?.[0];
  return {
    start: toDate(line?.period?.start ?? invoice?.period_start),
    end: toDate(line?.period?.end ?? invoice?.period_end),
  };
}

/** Sum of discount amounts on an invoice, in minor units. */
export function discountOfInvoice(invoice: Loose): number {
  const amounts: Loose[] = invoice?.total_discount_amounts ?? [];
  return amounts.reduce((sum, d) => sum + (Number(d?.amount) || 0), 0);
}

/** Sum of tax on an invoice, in minor units (both old and new shapes). */
export function taxOfInvoice(invoice: Loose): number {
  if (Array.isArray(invoice?.total_taxes)) {
    return invoice.total_taxes.reduce((s: number, t: Loose) => s + (Number(t?.amount) || 0), 0);
  }
  return Number(invoice?.tax) || 0;
}

export function metadataOf(obj: Loose): Record<string, string> {
  const meta = obj?.metadata;
  return meta && typeof meta === 'object' ? (meta as Record<string, string>) : {};
}

/** True when a Stripe object was created by Teyro Pro (not legacy course billing). */
export function isProObject(obj: Loose): boolean {
  return metadataOf(obj).teyro_product === 'pro';
}
