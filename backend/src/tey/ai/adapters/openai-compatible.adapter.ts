import {
  aiFetch,
  AiCompletionRequest,
  AiCompletionResult,
  AiProvider,
  AiProviderError,
  AiProviderOptions,
  classifyStatus,
} from '../ai-provider.interface';

interface ChatCompletionResponse {
  choices?: {
    message?: {
      content?: string | null;
      tool_calls?: {
        id: string;
        function?: { name?: string; arguments?: string };
      }[];
    };
    finish_reason?: string;
  }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
  model?: string;
}

/**
 * OpenAI-compatible chat completions.
 *
 * This single adapter carries most of the free-tier story: OpenAI, OpenRouter,
 * Groq, NVIDIA NIM, DeepSeek, Together, and anything self-hosted behind
 * vLLM / Ollama / LM Studio all speak this shape. The only thing that varies
 * is `baseUrl`, which is exactly why the spec insists it be configurable
 * rather than assumed.
 */
export class OpenAiCompatibleAdapter implements AiProvider {
  readonly kind = 'OPENAI_COMPATIBLE' as const;
  readonly model: string;

  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(opts: AiProviderOptions) {
    if (!opts.baseUrl) {
      throw new AiProviderError(
        'baseUrl is required for an OpenAI-compatible provider',
        'BAD_REQUEST',
      );
    }
    this.apiKey = opts.apiKey;
    this.model = opts.model;
    this.baseUrl = opts.baseUrl.replace(/\/+$/, '');
  }

  async complete(req: AiCompletionRequest): Promise<AiCompletionResult> {
    // json_object rather than json_schema: strict schema mode is not supported
    // by most of the OpenAI-compatible fleet, and we validate the result
    // ourselves anyway (structured-output.ts). But json_object mode only
    // guarantees *valid JSON syntax* — unlike Gemini's native responseSchema,
    // it enforces no field names at all, so a model left to invent its own
    // shape reliably will (confirmed live: Groq returned {Learn, Apply,
    // Reflect, Deepen} instead of our schema's actual field names, with
    // otherwise perfectly good content). The schema has to be spelled out in
    // the text itself, since that's the only thing this mode actually reads.
    const systemContent = req.jsonSchema
      ? `${req.system}\n\nRespond with ONLY a JSON object matching exactly this schema (these exact field names, no others, no wrapper object):\n${JSON.stringify(req.jsonSchema)}`
      : req.system;

    const body: Record<string, unknown> = {
      model: this.model,
      messages: [
        { role: 'system', content: systemContent },
        ...req.messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: req.maxOutputTokens,
      ...(req.temperature !== undefined ? { temperature: req.temperature } : {}),
      // Only sent when asked for: a provider/model that doesn't know the
      // field could reject the whole request.
      ...(req.reasoningEffort ? { reasoning_effort: req.reasoningEffort } : {}),
    };

    if (req.jsonSchema) {
      body.response_format = { type: 'json_object' };
    }

    if (req.tools?.length) {
      body.tools = req.tools.map((t) => ({
        type: 'function',
        function: {
          name: t.name,
          description: t.description,
          parameters: t.parameters,
        },
      }));
    }

    const res = await aiFetch(
      `${this.baseUrl}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body),
      },
      req.timeoutMs,
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new AiProviderError(
        `OpenAI-compatible request failed (${res.status}): ${detail.slice(0, 200)}`,
        classifyStatus(res.status),
        res.status,
      );
    }

    const json = (await res.json()) as ChatCompletionResponse;
    const choice = json.choices?.[0];

    return {
      text: choice?.message?.content ?? null,
      toolCalls: (choice?.message?.tool_calls ?? []).map((c) => ({
        id: c.id,
        name: c.function?.name ?? '',
        args: safeParseArgs(c.function?.arguments),
      })),
      usage: {
        inputTokens: json.usage?.prompt_tokens ?? 0,
        outputTokens: json.usage?.completion_tokens ?? 0,
      },
      model: json.model ?? this.model,
      finishReason: mapFinishReason(choice?.finish_reason),
    };
  }
}

/** Tool arguments arrive as a JSON string; a malformed one is not fatal. */
function safeParseArgs(raw: string | undefined): Record<string, unknown> {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === 'object'
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function mapFinishReason(
  reason: string | undefined,
): AiCompletionResult['finishReason'] {
  switch (reason) {
    case 'stop':
      return 'stop';
    case 'length':
      return 'length';
    case 'tool_calls':
    case 'function_call':
      return 'tool_use';
    case 'content_filter':
      return 'filter';
    default:
      return 'stop';
  }
}
