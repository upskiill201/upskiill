/**
 * The standardized activity-event schema (spec §5).
 *
 * Two producers, one store:
 *  - SERVER events are authoritative. Anything the backend already knows
 *    (a completed lesson, an enrollment) is recorded server-side, because a
 *    client-reported completion is both untrustworthy and duplicative.
 *  - CLIENT events cover only what the backend cannot observe (a lesson opened
 *    but never finished, an app launch). They arrive via POST /tey/events.
 *
 * The split is a security boundary, not a convention: CLIENT_REPORTABLE_EVENTS
 * is the allowlist enforced by the ingest DTO.
 */

export const SERVER_EVENT_TYPES = [
  'user_signed_up',
  'user_logged_in',
  'lesson_completed',
  'course_enrolled',
  'course_completed',
  'streak_extended',
  'daily_goal_completed',
] as const;

export const CLIENT_EVENT_TYPES = [
  'app_opened',
  'lesson_opened',
  'lesson_started',
  'lesson_abandoned',
  'course_opened',
  'quiz_started',
  'quiz_failed',
] as const;

export type ServerEventType = (typeof SERVER_EVENT_TYPES)[number];
export type ClientEventType = (typeof CLIENT_EVENT_TYPES)[number];
export type TeyEventType = ServerEventType | ClientEventType;

/** Allowlist for POST /tey/events. A server-only type here would be a hole. */
export const CLIENT_REPORTABLE_EVENTS: readonly string[] = CLIENT_EVENT_TYPES;

export type TeyEventSource = 'SERVER' | 'CLIENT';

export interface RecordEventInput {
  userId: string;
  eventType: TeyEventType;
  source: TeyEventSource;
  entityType?: string | null;
  entityId?: string | null;
  props?: Record<string, unknown> | null;
  idempotencyKey?: string | null;
  occurredAt: Date;
  /** Falls back to the user's persisted zone when omitted. */
  localDate?: string;
}

/**
 * How far in the past a client is allowed to backdate an event. An unclamped
 * client clock is how you get a lesson "completed" in 2071 sitting permanently
 * at the top of the [userId, occurredAt DESC] index.
 */
export const MAX_EVENT_BACKDATE_MS = 7 * 24 * 60 * 60 * 1000;

/** Per-request batch ceiling for the ingest endpoint. */
export const MAX_EVENT_BATCH = 50;
