/**
 * The worked pricing example on /teach/how-it-works. Kept out of the
 * 'use client' visuals so the server-rendered sections read real numbers:
 * a server file importing a value from a client module gets a client
 * reference, not the value.
 */
import { calculateCoursePricingLadder } from '@/lib/pricing-engine';

/** The price a creator sets — the yearly plan. Monthly is derived from it. */
export const EXAMPLE_COURSE_PRICE = 60;
export const CREATOR_SHARE = 0.7;
const ladder = calculateCoursePricingLadder(EXAMPLE_COURSE_PRICE);
export const EXAMPLE_MONTHLY = ladder.monthly.price;
export const EXAMPLE_YEARLY = ladder.yearly.price;
export const EXAMPLE_KEEP_MONTHLY = Math.round(EXAMPLE_MONTHLY * CREATOR_SHARE * 100) / 100;
