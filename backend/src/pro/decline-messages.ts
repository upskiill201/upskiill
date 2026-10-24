/**
 * What a learner sees when their card is declined. Fraud-flavoured codes get
 * the generic line on purpose: telling a card tester "stolen card" or
 * "wrong CVC" helps them, not the learner.
 */
const GENERIC = 'Your card was declined. Try another card or payment method.';

const MESSAGES: Record<string, string> = {
  insufficient_funds: "Your card doesn't have enough funds. Try another card.",
  expired_card: 'Your card has expired. Try another card.',
  incorrect_number: 'That card number looks wrong. Check it and try again.',
  invalid_number: 'That card number looks wrong. Check it and try again.',
  incorrect_cvc: "The security code doesn't match. Check it and try again.",
  invalid_cvc: "The security code doesn't match. Check it and try again.",
  invalid_expiry_month: 'The expiry date looks wrong. Check it and try again.',
  invalid_expiry_year: 'The expiry date looks wrong. Check it and try again.',
  processing_error: 'Something went wrong while processing your card. Please try again.',
  authentication_required: 'Your bank needs you to confirm this. Please try again and approve it.',
  card_not_supported: "This card doesn't support this kind of payment. Try another card.",
  currency_not_supported: "This card can't pay in US dollars. Try another card.",
};

const FRAUD_CODES = new Set([
  'fraudulent',
  'lost_card',
  'stolen_card',
  'pickup_card',
  'restricted_card',
  'merchant_blacklist',
  'security_violation',
  'stop_payment_order',
]);

export function declineMessage(code?: string | null, declineCode?: string | null): string {
  const key = declineCode || code || '';
  if (FRAUD_CODES.has(key)) return GENERIC;
  return MESSAGES[key] ?? GENERIC;
}
