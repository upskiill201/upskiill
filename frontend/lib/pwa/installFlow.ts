/**
 * Install-gateway UX state.
 *
 * ── What this is NOT ───────────────────────────────────────────────────────
 * This is not a record of whether Teyro is installed. A stored
 * `userInstalled = true` goes stale the moment the learner uninstalls, clears
 * data, switches browsers, or opens the site on a second device — and a stale
 * "true" is exactly what produces the worst failure mode here: a learner
 * trapped behind an install wall they have already satisfied, or bounced past
 * an install step they never completed.
 *
 * Installed-ness is re-derived every time from `detectStandalone()` in
 * ./platform.ts. What lives here is only *UX progression* — how far through
 * the guide someone got, how many times they backed out of the prompt — so the
 * page can be a little smarter on a return visit without ever being wrong
 * about the thing that matters.
 */

export const INSTALL_FLOW_STORAGE_KEY = 'teyro_install_flow';

export type InstallFlowStage =
  /** On /start, has not pressed Start Learning yet. */
  | 'browsing'
  /** Pressed Start Learning; the platform branch is on screen. */
  | 'install-offered'
  /** The native prompt was shown and dismissed at least once. */
  | 'prompt-dismissed'
  /** The iOS Add-to-Home-Screen guide is open. */
  | 'ios-guide'
  /** `appinstalled` fired, or the learner confirmed they added it by hand. */
  | 'install-reported'
  /** Verified standalone at least once. Still re-derived, never trusted alone. */
  | 'launched-standalone';

export interface InstallFlowState {
  stage: InstallFlowStage;
  /** How many times the native prompt has been dismissed. Caps nagging. */
  dismissCount: number;
  /** Furthest iOS guide step reached (0-based), so a return resumes there. */
  iosGuideStep: number;
  /** ISO timestamp of the last stage write. */
  updatedAt: string;
  /**
   * Set once the learner has genuinely been seen in standalone mode. Used only
   * to soften copy ("welcome back") — never to gate a route.
   */
  everStandalone: boolean;
}

const DEFAULT_STATE: InstallFlowState = {
  stage: 'browsing',
  dismissCount: 0,
  iosGuideStep: 0,
  updatedAt: new Date(0).toISOString(),
  everStandalone: false,
};

/**
 * Three dismissals is where "helpful" turns into "nagging". Past this the
 * gateway stops leading with the prompt and leads with "keep going in your
 * browser" instead — the install offer stays reachable, just no longer first.
 */
export const MAX_PROMPT_NAGS = 3;

export function getInstallFlowState(): InstallFlowState {
  if (typeof window === 'undefined') return { ...DEFAULT_STATE };
  try {
    const raw = window.localStorage.getItem(INSTALL_FLOW_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as Partial<InstallFlowState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    // Corrupt or unreadable (private mode, storage disabled). The gateway must
    // still work perfectly with no memory at all, so fall back to defaults
    // rather than surfacing anything.
    return { ...DEFAULT_STATE };
  }
}

export function saveInstallFlowState(patch: Partial<InstallFlowState>): void {
  if (typeof window === 'undefined') return;
  try {
    const next: InstallFlowState = {
      ...getInstallFlowState(),
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(INSTALL_FLOW_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked — progression memory is a nicety, not a
    // requirement. Never let it throw into a render or a click handler.
  }
}

export function recordPromptDismissed(): void {
  const { dismissCount } = getInstallFlowState();
  saveInstallFlowState({ stage: 'prompt-dismissed', dismissCount: dismissCount + 1 });
}

/** True once the learner has said "no" often enough that we should stop leading with it. */
export function hasDismissedTooOften(): boolean {
  return getInstallFlowState().dismissCount >= MAX_PROMPT_NAGS;
}
