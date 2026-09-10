/**
 * Query-param types for the learner-analytics endpoints. Kept as plain
 * string-literal unions rather than class-validator DTOs — matches
 * `progress.controller.ts`'s convention of individual `@Query()` string
 * params (not a bound DTO class) for simple GET query strings; the
 * controller validates/defaults these itself.
 */
export type ActivityPeriod = '7d' | '30d' | '3m' | 'all';
export type ActivityMetric = 'xp' | 'time' | 'lessons' | 'activity';
