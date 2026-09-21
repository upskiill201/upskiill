/**
 * Centralized email/lifecycle configuration. Every env-var read for this
 * system goes through here — nothing else in `src/email` or its listeners
 * should touch `process.env` directly, so a future flag doesn't end up
 * scattered across a dozen files.
 */

export type EmailMode = 'production' | 'staging' | 'development';

function bool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value === 'true';
}

export const emailConfig = {
  /** Master switch. false = nothing is ever sent, everything logs as SKIPPED. */
  get enabled(): boolean {
    return bool(process.env.EMAIL_ENABLED, true);
  },

  get mode(): EmailMode {
    const m = process.env.EMAIL_MODE;
    if (m === 'production' || m === 'staging' || m === 'development') return m;
    return process.env.NODE_ENV === 'production' ? 'production' : 'development';
  },

  /**
   * In non-production modes, every outbound email is redirected here instead
   * of the real recipient (subject gets a `[to: real@address]` prefix) unless
   * EMAIL_ALLOW_REAL_RECIPIENTS_IN_DEV=true. Prevents a staging deploy from
   * mailing real users.
   */
  get testRecipient(): string | null {
    return process.env.EMAIL_TEST_RECIPIENT || null;
  },

  get allowRealRecipientsInDev(): boolean {
    return bool(process.env.EMAIL_ALLOW_REAL_RECIPIENTS_IN_DEV, false);
  },

  get appUrl(): string {
    return process.env.APP_URL || 'https://teyro.app';
  },

  get resendApiKey(): string {
    return process.env.RESEND_API_KEY || '';
  },

  /** Signing secret for unsubscribe / one-click-preference links. */
  get unsubscribeSecret(): string {
    return (
      process.env.EMAIL_UNSUBSCRIBE_SECRET ||
      process.env.JWT_SECRET ||
      'dev-unsubscribe-secret'
    );
  },

  // ── Feature flags — each lifecycle flow can be killed independently ──────
  get streakReminderEnabled(): boolean {
    return bool(process.env.EMAIL_STREAK_REMINDER_ENABLED, true);
  },
  get weeklyDigestEnabled(): boolean {
    return bool(process.env.EMAIL_WEEKLY_DIGEST_ENABLED, true);
  },
  get abandonedCheckoutEnabled(): boolean {
    return bool(process.env.EMAIL_ABANDONED_CHECKOUT_ENABLED, true);
  },
  get reengagementEnabled(): boolean {
    return bool(process.env.EMAIL_REENGAGEMENT_ENABLED, true);
  },
  get achievementEmailEnabled(): boolean {
    return bool(process.env.EMAIL_ACHIEVEMENT_ENABLED, true);
  },
  get leagueResultsEnabled(): boolean {
    return bool(process.env.EMAIL_LEAGUE_RESULTS_ENABLED, true);
  },
  get creatorDigestEnabled(): boolean {
    return bool(process.env.EMAIL_CREATOR_DIGEST_ENABLED, true);
  },

  /**
   * Emails whose triggering event happened before this date are never sent.
   * Safe-activation guard for existing users: deploying this system must not
   * suddenly email everyone "you've been inactive for 14 days". Defaults to
   * "now" at process boot, i.e. only forward-looking events qualify unless
   * explicitly overridden.
   */
  get lifecycleActivationDate(): Date {
    const raw = process.env.EMAIL_LIFECYCLE_ACTIVATION_DATE;
    if (raw) {
      const d = new Date(raw);
      if (!Number.isNaN(d.getTime())) return d;
    }
    return EmailConfigBootDate;
  },

  // ── Scheduler / worker tuning ─────────────────────────────────────────────
  get schedulerEnabled(): boolean {
    if (process.env.EMAIL_SCHEDULER_ENABLED === 'true') return true;
    if (process.env.EMAIL_SCHEDULER_ENABLED === 'false') return false;
    return process.env.NODE_ENV === 'production';
  },
  get jobBatchSize(): number {
    return Number(process.env.EMAIL_JOB_BATCH_SIZE) || 25;
  },
  get workerConcurrency(): number {
    return Number(process.env.EMAIL_WORKER_CONCURRENCY) || 5;
  },
} as const;

/** Frozen at module load — the activation-date fallback. */
const EmailConfigBootDate = new Date();
