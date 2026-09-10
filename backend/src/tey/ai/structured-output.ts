import { z } from 'zod';

/**
 * Validation for anything a model returns.
 *
 * Nothing an LLM produces reaches a learner or the database unvalidated. A
 * model that returns prose where JSON was asked for, or a 400-character
 * "title", is an ordinary Tuesday — not an exception worth propagating.
 */

/**
 * Trim BEFORE validating.
 *
 * zod applies .min()/.max() to the untrimmed string, so `.trim().min(3)` would
 * accept "  x  ". Piping makes the bound apply to what actually reaches the
 * learner's lock screen.
 */
const trimmed = (min: number, max: number) =>
  z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(min).max(max));

export const NudgeCopySchema = z.object({
  // Bounds match the push budgets in message-templates.ts. A model that
  // ignores the length instruction fails validation and we fall back to a
  // template rather than shipping a truncated sentence.
  title: trimmed(3, 60),
  body: trimmed(3, 140),
});
export type NudgeCopy = z.infer<typeof NudgeCopySchema>;

export const ConversationReplySchema = z.object({
  intent: trimmed(0, 64),
  response: trimmed(1, 1000),
  action: trimmed(0, 64).optional(),
  tone: trimmed(0, 64).optional(),
});
export type ConversationReply = z.infer<typeof ConversationReplySchema>;

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: string };

/**
 * Parses and validates model output.
 *
 * Tolerates the two things models reliably do to JSON: wrapping it in a
 * ```json fence, and adding a sentence before or after it. Everything beyond
 * that is a failure, and a failure means the caller uses a template.
 */
export function parseStructured<T>(
  raw: string | null,
  schema: z.ZodType<T>,
): ParseResult<T> {
  if (!raw || raw.trim() === '') {
    return { ok: false, reason: 'EMPTY_RESPONSE' };
  }

  const candidate = extractJson(raw);
  if (candidate === null) return { ok: false, reason: 'NO_JSON_FOUND' };

  let parsed: unknown;
  try {
    parsed = JSON.parse(candidate);
  } catch {
    return { ok: false, reason: 'INVALID_JSON' };
  }

  const result = schema.safeParse(parsed);
  if (!result.success) {
    const first = result.error.issues[0];
    return {
      ok: false,
      reason: `SCHEMA_MISMATCH:${first?.path.join('.') || 'root'}`,
    };
  }

  return { ok: true, value: result.data };
}

/** Pulls the first JSON object out of a response that may be wrapped in prose. */
function extractJson(raw: string): string | null {
  const text = raw.trim();

  // ```json … ``` or plain ``` … ```
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(text);
  if (fenced?.[1]) return fenced[1].trim();

  if (text.startsWith('{')) return text;

  // Fall back to the outermost braces.
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end > start) return text.slice(start, end + 1);

  return null;
}
