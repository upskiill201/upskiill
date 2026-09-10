import {
  aiFetch,
  AiCompletionRequest,
  AiCompletionResult,
  AiProvider,
  AiProviderError,
  AiProviderOptions,
  classifyStatus,
} from '../ai-provider.interface';

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: (
        | { text?: string }
        | { functionCall?: { name?: string; args?: Record<string, unknown> } }
      )[];
    };
    finishReason?: string;
  }[];
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
  };
  modelVersion?: string;
}

const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Google Gemini.
 *
 * Seeded as the default for early beta: the free tier is generous enough to
 * run Tey's message generation at pre-revenue volume, and it has native
 * structured output (`responseSchema`) rather than the "please reply in JSON"
 * prompt-and-hope that most free models offer.
 *
 * Shape differences worth knowing: the API key is a query parameter, the
 * system prompt is `systemInstruction`, roles are `user`/`model` rather than
 * `user`/`assistant`, and content is a parts array.
 */
export class GeminiAdapter implements AiProvider {
  readonly kind = 'GEMINI' as const;
  readonly model: string;

  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(opts: AiProviderOptions) {
    this.apiKey = opts.apiKey;
    this.model = opts.model;
    this.baseUrl = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '');
  }

  async complete(req: AiCompletionRequest): Promise<AiCompletionResult> {
    const body: Record<string, unknown> = {
      systemInstruction: { parts: [{ text: req.system }] },
      contents: req.messages.map((m) => ({
        // Gemini says 'model' where the rest of the world says 'assistant'.
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: req.maxOutputTokens,
        ...(req.temperature !== undefined
          ? { temperature: req.temperature }
          : {}),
        ...(req.jsonSchema
          ? {
              responseMimeType: 'application/json',
              responseSchema: toGeminiSchema(req.jsonSchema),
            }
          : {}),
      },
    };

    if (req.tools?.length) {
      body.tools = [
        {
          functionDeclarations: req.tools.map((t) => ({
            name: t.name,
            description: t.description,
            parameters: toGeminiSchema(t.parameters),
          })),
        },
      ];
    }

    const url =
      `${this.baseUrl}/models/${encodeURIComponent(this.model)}:generateContent` +
      `?key=${encodeURIComponent(this.apiKey)}`;

    const res = await aiFetch(
      url,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
      req.timeoutMs,
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new AiProviderError(
        `Gemini request failed (${res.status}): ${detail.slice(0, 200)}`,
        classifyStatus(res.status),
        res.status,
      );
    }

    const json = (await res.json()) as GeminiResponse;
    const candidate = json.candidates?.[0];
    const parts = candidate?.content?.parts ?? [];

    const text =
      parts
        .map((p) => ('text' in p ? (p.text ?? '') : ''))
        .join('')
        .trim() || null;

    const toolCalls = parts
      .filter(
        (p): p is { functionCall: { name?: string; args?: Record<string, unknown> } } =>
          'functionCall' in p && !!p.functionCall,
      )
      .map((p, i) => ({
        // Gemini does not issue call ids; synthesize a stable one.
        id: `gemini-${i}`,
        name: p.functionCall.name ?? '',
        args: p.functionCall.args ?? {},
      }));

    return {
      text,
      toolCalls,
      usage: {
        inputTokens: json.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: json.usageMetadata?.candidatesTokenCount ?? 0,
      },
      model: json.modelVersion ?? this.model,
      finishReason: mapFinishReason(candidate?.finishReason),
    };
  }
}

/**
 * Gemini accepts a JSON-Schema subset with UPPERCASE type names and rejects
 * `additionalProperties` outright. Passing a standard schema through unchanged
 * produces a 400 that reads like a model error rather than a shape error.
 */
function toGeminiSchema(schema: Record<string, unknown>): Record<string, unknown> {
  const convert = (node: unknown): unknown => {
    if (Array.isArray(node)) return node.map(convert);
    if (!node || typeof node !== 'object') return node;

    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (key === 'additionalProperties') continue;
      if (key === 'type' && typeof value === 'string') {
        out.type = value.toUpperCase();
        continue;
      }
      out[key] = convert(value);
    }
    return out;
  };

  return convert(schema) as Record<string, unknown>;
}

function mapFinishReason(
  reason: string | undefined,
): AiCompletionResult['finishReason'] {
  switch (reason) {
    case 'STOP':
      return 'stop';
    case 'MAX_TOKENS':
      return 'length';
    case 'SAFETY':
    case 'RECITATION':
    case 'PROHIBITED_CONTENT':
      return 'filter';
    default:
      return 'stop';
  }
}
