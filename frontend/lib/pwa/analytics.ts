/**
 * Install & notification funnel events.
 *
 * Thin typed wrapper over lib/analytics.ts `captureEvent` — no second
 * analytics system, no new transport. The point of the wrapper is the union
 * type: these event names are a funnel that gets read as a sequence in
 * PostHog, and a typo in one of them silently produces a hole in the chart
 * that nobody notices for a month.
 *
 * Naming follows the convention already in the codebase (`onboarding_started`,
 * `waitlist_joined`): snake_case, object-then-past-tense-verb.
 */

import { captureEvent } from '@/lib/analytics';
import type { InstallMethod, PwaBrowser, PwaPlatform } from './platform';

export type InstallFunnelEvent =
  // ── Gateway ──
  | 'start_page_viewed'
  | 'start_learning_clicked'
  | 'install_flow_started'
  // ── Android / native prompt ──
  | 'android_install_prompt_available'
  | 'android_install_prompt_shown'
  | 'android_install_accepted'
  | 'android_install_dismissed'
  | 'pwa_installed'
  // ── iOS guide ──
  | 'ios_install_guide_started'
  | 'ios_install_step_viewed'
  | 'ios_install_guide_completed'
  // ── Launch ──
  | 'installed_pwa_opened'
  /**
   * The handoff out of the gateway and into onboarding — the join between this
   * funnel and the onboarding one, so it keeps the name the brief specifies
   * rather than a near-miss synonym.
   *
   * CAUTION: CreatorOnboardingShell already emits `onboarding_started` for the
   * *creator* flow. Two different funnels under one event name cannot be told
   * apart in PostHog after the fact, so every emission from the learner side
   * carries `flow: 'learner'` and must continue to. Renaming the creator one
   * would be cleaner and would break whatever already charts it, so the
   * discriminator lives here instead.
   */
  | 'onboarding_started'
  // ── Notifications ──
  | 'notification_screen_viewed'
  | 'notification_enable_clicked'
  | 'notification_permission_granted'
  | 'notification_permission_denied'
  | 'push_subscription_success'
  | 'push_subscription_failed';

/**
 * Shared dimensions. Every funnel event carries the environment it happened
 * in, because "the install funnel converts badly" is meaningless until it is
 * split by platform and browser — and by `install_method`, which is what
 * separates "we showed a one-tap prompt" from "we asked them to work a menu".
 */
export interface InstallEventContext {
  platform?: PwaPlatform;
  browser?: PwaBrowser;
  install_method?: InstallMethod;
  standalone?: boolean;
  [key: string]: unknown;
}

export function trackInstallEvent(
  event: InstallFunnelEvent,
  context: InstallEventContext = {},
): void {
  // captureEvent already queues before PostHog loads and swallows its own
  // failures, so this never needs a try/catch of its own and never blocks.
  captureEvent(event, context);
}
