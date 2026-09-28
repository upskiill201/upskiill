import {
  EmailAudience,
  EmailCategory,
  EmailChannel,
  TemplateMeta,
} from '../types';

/**
 * Explicit registry of every template — implemented or not (spec §46).
 * `enabled: false` entries are real product ideas that don't map to
 * existing Teyro backend behavior yet (see docs/email-system.md §Known
 * limitations for why each one is blocked) — the dispatch service refuses
 * to send them so a future caller can't silently ship a template that was
 * never actually built.
 */
export const TEMPLATE_REGISTRY: Record<string, TemplateMeta> = {
  'auth.verification': {
    templateKey: 'auth.verification',
    category: EmailCategory.TRANSACTIONAL,
    audience: EmailAudience.ALL,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Signup / resend-verification: magic link + 6-digit code.',
  },
  'auth.welcome': {
    templateKey: 'auth.welcome',
    category: EmailCategory.TRANSACTIONAL,
    audience: EmailAudience.ALL,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Sent right after email verification completes.',
  },
  'auth.password-reset': {
    templateKey: 'auth.password-reset',
    category: EmailCategory.SECURITY,
    audience: EmailAudience.ALL,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Forgot-password magic link, student or creator route.',
  },
  'security.email-changed': {
    templateKey: 'security.email-changed',
    category: EmailCategory.SECURITY,
    audience: EmailAudience.ALL,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'No change-email flow exists in auth.service.ts yet — template built, not wired.',
  },
  'security.new-login': {
    templateKey: 'security.new-login',
    category: EmailCategory.SECURITY,
    audience: EmailAudience.ALL,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'No IP/user-agent/session capture exists on login today — would need new columns before this is reliable.',
  },

  'learning.streak-at-risk': {
    templateKey: 'learning.streak-at-risk',
    category: EmailCategory.LEARNING,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Daily batch job — streak alive but no activity logged yet today.',
  },
  'learning.daily-reminder': {
    templateKey: 'learning.daily-reminder',
    category: EmailCategory.ENGAGEMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'Overlaps heavily with the existing Tey push-nudge system — deferred to avoid double-messaging the same moment (see docs).',
  },
  'learning.weekly-summary': {
    templateKey: 'learning.weekly-summary',
    category: EmailCategory.DIGEST,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Weekly batch job — XP, lessons completed, streak, league.',
  },
  'learning.achievement-unlocked': {
    templateKey: 'learning.achievement-unlocked',
    category: EmailCategory.LEARNING,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Fired when checkAndAwardAchievements() creates a new UserAchievement row.',
  },
  'learning.level-up': {
    templateKey: 'learning.level-up',
    category: EmailCategory.LEARNING,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'Level is a derived value (Math.floor(xp/100)+1), not a stored transition — no event fires when it changes today.',
  },
  'learning.league-results': {
    templateKey: 'learning.league-results',
    category: EmailCategory.LEARNING,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Fired from LeagueService.settleCohort() once a cohort settles.',
  },
  'learning.course-progress': {
    templateKey: 'learning.course-progress',
    category: EmailCategory.LEARNING,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'No milestone (25/50/75%) event exists on Enrollment.progress updates yet.',
  },
  'learning.course-completed': {
    templateKey: 'learning.course-completed',
    category: EmailCategory.LEARNING,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'No COURSE_COMPLETED event exists yet — would need a listener added in course.service.ts.',
  },
  'reengagement.inactive': {
    templateKey: 'reengagement.inactive',
    category: EmailCategory.REENGAGEMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Win-back ladder at 3/7/14/30 days away (daily scan); day 30 is the honest "I’ll stop" and nothing sends after it.',
  },

  'course.enrollment': {
    templateKey: 'course.enrollment',
    category: EmailCategory.TRANSACTIONAL,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'Folded into payment.purchase-confirmation for paid enrollments; a free-enrollment variant is not built.',
  },

  'payment.purchase-confirmation': {
    templateKey: 'payment.purchase-confirmation',
    category: EmailCategory.PAYMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Fired from PaymentService.grantCourseAccess() once the transaction commits.',
  },
  'payment.failed': {
    templateKey: 'payment.failed',
    category: EmailCategory.PAYMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Fired from the Stripe invoice.payment_failed webhook handler.',
  },
  'payment.access-ending': {
    templateKey: 'payment.access-ending',
    category: EmailCategory.PAYMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Daily scan — course access that will NOT auto-renew (Mobile Money, cancelled card plans) ends in 3 days, tomorrow, or ended yesterday.',
  },
  'payment.pending': {
    templateKey: 'payment.pending',
    category: EmailCategory.PAYMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'Neither Stripe nor MeSomb flow here surfaces a distinct async-pending state beyond STARTED/webhook resolution.',
  },
  'payment.refund-initiated': {
    templateKey: 'payment.refund-initiated',
    category: EmailCategory.PAYMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'recordStripeRefund() records the ledger entry synchronously on charge.refunded — there is no separate "initiated" state to notify on.',
  },
  'payment.refund-completed': {
    templateKey: 'payment.refund-completed',
    category: EmailCategory.PAYMENT,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'Template built but not wired this pass — see docs Known limitations.',
  },

  'conversion.checkout-abandoned-1': {
    templateKey: 'conversion.checkout-abandoned-1',
    category: EmailCategory.CONVERSION,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Stage 1, ~45 min after CheckoutIntent.status stays STARTED.',
  },
  'conversion.checkout-abandoned-2': {
    templateKey: 'conversion.checkout-abandoned-2',
    category: EmailCategory.CONVERSION,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Stage 2, ~24h later.',
  },
  'conversion.checkout-abandoned-3': {
    templateKey: 'conversion.checkout-abandoned-3',
    category: EmailCategory.CONVERSION,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Stage 3, ~2.5 days later.',
  },
  'conversion.checkout-abandoned-4': {
    templateKey: 'conversion.checkout-abandoned-4',
    category: EmailCategory.CONVERSION,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Stage 4 (final), ~6 days later.',
  },

  'conversion.course-unlock-1': {
    templateKey: 'conversion.course-unlock-1',
    category: EmailCategory.CONVERSION,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Unlock journey stage 1, ~3h after the learner finishes the free lessons of a paid course.',
  },
  'conversion.course-unlock-2': {
    templateKey: 'conversion.course-unlock-2',
    category: EmailCategory.CONVERSION,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Unlock journey stage 2, day 3 — the course’s outcomes and (when real) its learner count.',
  },
  'conversion.course-unlock-3': {
    templateKey: 'conversion.course-unlock-3',
    category: EmailCategory.CONVERSION,
    audience: EmailAudience.STUDENT,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Unlock journey stage 3 (final), day 7 — says it is the last one.',
  },

  'creator.welcome': {
    templateKey: 'creator.welcome',
    category: EmailCategory.CREATOR,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'auth.welcome already covers creator signup with role-aware copy; a distinct creator.welcome is not separately wired.',
  },
  'creator.course-approved': {
    templateKey: 'creator.course-approved',
    category: EmailCategory.CREATOR,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description:
      'CourseReviewStatus transitions exist in the schema but no admin-course-review event/listener wiring was added this pass.',
  },
  'creator.new-student': {
    templateKey: 'creator.new-student',
    category: EmailCategory.CREATOR,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Fired alongside payment.purchase-confirmation, to the course instructor.',
  },
  'creator.earnings-summary': {
    templateKey: 'creator.earnings-summary',
    category: EmailCategory.DIGEST,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: false,
    description: 'Superseded by creator.weekly-digest, which carries earnings plus learners and questions.',
  },
  'creator.weekly-digest': {
    templateKey: 'creator.weekly-digest',
    category: EmailCategory.DIGEST,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Monday batch — last week’s sales, revenue, new learners, lessons done, finishes, and unanswered questions.',
  },

  'payout.initiated': {
    templateKey: 'payout.initiated',
    category: EmailCategory.CREATOR,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Fired from EarningsService.transitionPayout() on PROCESSING.',
  },
  'payout.completed': {
    templateKey: 'payout.completed',
    category: EmailCategory.CREATOR,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description: 'Fired from EarningsService.transitionPayout() on PAID.',
  },
  'payout.failed': {
    templateKey: 'payout.failed',
    category: EmailCategory.CREATOR,
    audience: EmailAudience.CREATOR,
    channel: EmailChannel.EMAIL,
    enabled: true,
    description:
      'Fired from EarningsService.transitionPayout() on FAILED/REJECTED.',
  },
};

export function getTemplateMeta(templateKey: string): TemplateMeta | undefined {
  return TEMPLATE_REGISTRY[templateKey];
}
