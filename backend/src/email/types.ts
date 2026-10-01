/** Strong types for the email domain — see docs/email-system.md §Event taxonomy. */

/** Matches EmailLog.category / EmailPreference's opt-out granularity. */
export enum EmailCategory {
  TRANSACTIONAL = 'TRANSACTIONAL',
  SECURITY = 'SECURITY',
  LEARNING = 'LEARNING',
  ENGAGEMENT = 'ENGAGEMENT',
  REENGAGEMENT = 'REENGAGEMENT',
  CONVERSION = 'CONVERSION',
  PAYMENT = 'PAYMENT',
  CREATOR = 'CREATOR',
  DIGEST = 'DIGEST',
  MARKETING = 'MARKETING',
}

/** TRANSACTIONAL/SECURITY can never be suppressed by a user preference. */
export function isAlwaysOn(category: EmailCategory): boolean {
  return (
    category === EmailCategory.TRANSACTIONAL ||
    category === EmailCategory.SECURITY
  );
}

export enum EmailAudience {
  STUDENT = 'STUDENT',
  CREATOR = 'CREATOR',
  ALL = 'ALL',
}

export enum EmailChannel {
  EMAIL = 'EMAIL',
  // Reserved for future channels — the dispatch pipeline (eligibility ->
  // template -> personalize -> send -> log) is channel-agnostic by design;
  // adding PUSH/WHATSAPP later means a new provider, not a new pipeline.
  PUSH = 'PUSH',
  WHATSAPP = 'WHATSAPP',
}

/** Product events the lifecycle engine reacts to. Only listed events are
 *  actually wired to a listener today — see docs/email-system.md §Events
 *  implemented for which ones fire in production. */
export enum EmailEvent {
  USER_REGISTERED = 'USER_REGISTERED',
  EMAIL_VERIFICATION_REQUIRED = 'EMAIL_VERIFICATION_REQUIRED',
  USER_ONBOARDED = 'USER_ONBOARDED',
  PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
  EMAIL_CHANGED = 'EMAIL_CHANGED',

  CHECKOUT_STARTED = 'CHECKOUT_STARTED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  CHECKOUT_ABANDONED_STAGE = 'CHECKOUT_ABANDONED_STAGE',

  COURSE_ENROLLED = 'COURSE_ENROLLED',
  ACHIEVEMENT_UNLOCKED = 'ACHIEVEMENT_UNLOCKED',
  LEAGUE_SETTLED = 'LEAGUE_SETTLED',
  STREAK_AT_RISK = 'STREAK_AT_RISK',
  WEEKLY_DIGEST_DUE = 'WEEKLY_DIGEST_DUE',
  REENGAGEMENT_DUE = 'REENGAGEMENT_DUE',

  PAYOUT_INITIATED = 'PAYOUT_INITIATED',
  PAYOUT_COMPLETED = 'PAYOUT_COMPLETED',
  PAYOUT_FAILED = 'PAYOUT_FAILED',
  CREATOR_NEW_STUDENT = 'CREATOR_NEW_STUDENT',
}

export interface TemplateMeta {
  templateKey: string;
  category: EmailCategory;
  audience: EmailAudience;
  channel: EmailChannel;
  /** false = registered but intentionally unsupported today (see spec §46) — dispatch refuses to send it. */
  enabled: boolean;
  description: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
}

/** Every template renderer has this shape: typed data in, subject+html out. */
export type TemplateRenderer<TData> = (data: TData) => RenderedEmail;

// ── Shared building blocks for template data ────────────────────────────

export interface BaseEmailData {
  firstName: string;
  /** Included by the layout when the category is not TRANSACTIONAL/SECURITY. */
  unsubscribeUrl?: string;
  preferencesUrl?: string;
}
