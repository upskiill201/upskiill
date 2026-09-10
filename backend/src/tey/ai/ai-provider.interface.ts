/**
 * The one interface every model provider implements.
 *
 * Teyro is pre-revenue, so the model layer has to stay swappable — a free
 * Gemini tier today, something stronger once there is revenue, without
 * touching the decision engine, the templates, or the scheduler.
 *
 * Adapters use global `fetch` rather than vendor SDKs. Three reasons: no
 * lockfile churn, no transitive dependency surface, and exactly one place per
 * provider where the wire format lives.
 */

export const AI_PROVIDER_KINDS = [
  'OPENAI_COMPATIBLE',
  'ANTHROPIC',
  'GEMINI',
] as const;
export type AiProviderKind = (typeof AI_PROVIDER_KINDS)[number];

export interface AiToolSpec {
  name: string;
  description: string;
  /** JSON Schema for the arguments. */
  parameters: Record<string, unknown>;
}

export interface AiMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiCompletionRequest {
  system: string;
  messages: AiMessage[];
  maxOutputTokens: number;
  temperature?: number;
  /**
   * JSON Schema. Each adapter translates this into whatever its provider
   * calls the same idea — response_format, responseSchema, or a forced tool.
   */
  jsonSchema?: Record<string, unknown>;
  tools?: AiToolSpec[];
  /**
   * Hard wall-clock ceiling, enforced with AbortController in every adapter.
   * Non-optional on purpose: a hung provider holding a scheduler slot would
   * stall the whole due queue behind it.
   */
  timeoutMs: number;
}

export interface AiToolCall {
  id: string;
  name: string;
  args: Record<string, unknown>;
}

export interface AiUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface AiCompletionResult {
  text: string | null;
  toolCalls: AiToolCall[];
  /**
   * Normalized across providers. This is where cost accounting either works or
   * silently reports zero, so every adapter has a fixture test for it.
   */
  usage: AiUsage;
  model: string;
  finishReason: 'stop' | 'length' | 'tool_use' | 'filter' | 'error';
}

export interface AiProvider {
  readonly kind: AiProviderKind;
  readonly model: string;
  complete(req: AiCompletionRequest): Promise<AiCompletionResult>;
}

export interface AiProviderOptions {
  apiKey: string;
  model: string;
  baseUrl?: string | null;
}

/** Typed failure, so callers can distinguish "bad key" from "model is down". */
export class AiProviderError extends Error {
  constructor(
    message: string,
    readonly kind:
      | 'AUTH'
      | 'RATE_LIMIT'
      | 'TIMEOUT'
      | 'BAD_REQUEST'
      | 'SERVER'
      | 'UNKNOWN',
    readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'AiProviderError';
  }
}

/** Maps an HTTP status onto the failure taxonomy above. */
export function classifyStatus(status: number): AiProviderError['kind'] {
  if (status === 401 || status === 403) return 'AUTH';
  if (status === 429) return 'RATE_LIMIT';
  if (status >= 500) return 'SERVER';
  if (status >= 400) return 'BAD_REQUEST';
  return 'UNKNOWN';
}

/**
 * Shared fetch with a hard timeout. Every adapter goes through this so the
 * abort behaviour cannot drift between providers.
 */
export async function aiFetch(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new AiProviderError(`Request timed out after ${timeoutMs}ms`, 'TIMEOUT');
    }
    throw new AiProviderError((err as Error).message, 'UNKNOWN');
  } finally {
    clearTimeout(timer);
  }
}
