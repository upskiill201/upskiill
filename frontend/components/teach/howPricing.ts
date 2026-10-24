/**
 * The worked pay example on /teach/how-it-works. Kept out of the
 * 'use client' visuals so the server-rendered sections read real numbers:
 * a server file importing a value from a client module gets a client
 * reference, not the value.
 *
 * Creators are paid from the Teyro Pro pool (lib/launch.ts): a yearly Pro
 * learner pays $5.00 a month, half of it is the creators' pool, shared by
 * the minutes they spend in each course. Always labelled as an example.
 */
import {
  CREATOR_POOL_PCT,
  POOL_PER_YEARLY_LEARNER_USD,
  PRO_MONTHLY_USD,
  PRO_YEARLY_PER_MONTH_USD,
  PRO_YEARLY_USD,
} from '@/lib/launch';

export const POOL_PCT = CREATOR_POOL_PCT;
export const PRO_YEARLY = PRO_YEARLY_USD;
export const PRO_MONTHLY = PRO_MONTHLY_USD;
/** A yearly Pro learner's payment, per month. */
export const PRO_MONTH = PRO_YEARLY_PER_MONTH_USD;
/** One yearly learner who spends all their learning time in your course, per month. */
export const EXAMPLE_KEEP_MONTHLY = POOL_PER_YEARLY_LEARNER_USD;
