import {
  aiFetch,
  AiCompletionRequest,
  AiCompletionResult,
  AiProvider,
  AiProviderError,
  AiProviderOptions,
  classifyStatus,
} from '../ai-provider.interface';

interface AnthropicResponse {
  content?: (
    | { type: 'text'; text: string }
    | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
  )[];
  usage?: { input_tokens?: number; output_tokens?: number };
  model?: string;
  stop_reason?: string;
}

const ANTHROPIC_VERSION = '2023-06-01';
const DEFAULT_BASE_URL = 'https://api.anthropic.com/v1';

/**
 * Anthropic's native Messages API.
 *
 * A separate adapter rather than forcing Anthropic through an OpenAI-shaped
 * contract, because the differences are real, not cosmetic: the system prompt
 * is a top-level field rather than a message, content is a block array rather
 * than a string, tool calls are content blocks, and auth is `x-api-key` with a
 * required version header. Pretending otherwise produces an adapter that works
 * until it quietly does not.
 */
export class AnthropicAdapter implements AiProvider {
  readonly kind = 'ANTHROPIC' as const;
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
      model: this.model,
      // Top-level, not a message with role 'system'.
      system: req.system,
      messages: req.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      max_tokens: req.maxOutputTokens,
      ...(req.temperature !== undefined ? { temperature: req.temperature } : {}),
    };

    const tools = [...(req.tools ?? [])];

    // Anthropic has no JSON mode. The idiomatic equivalent is a single forced
    // tool whose schema is the shape we want back — which is also why the
    // result has to be read out of a tool_use block rather than text.
    if (req.jsonSchema && tools.length === 0) {
      tools.push({
        name: 'respond',
        description: 'Respond with structured output.',
        parameters: req.jsonSchema,
      });
      body.tool_choice = { type: 'tool', name: 'respond' };
    }

    if (tools.length > 0) {
      body.tools = tools.map((t) => ({
        name: t.name,
        description: t.description,
        input_schema: t.parameters,
      }));
    }

    const res = await aiFetch(
      `${this.baseUrl}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': ANTHROPIC_VERSION,
        },
        body: JSON.stringify(body),
      },
      req.timeoutMs,
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new AiProviderError(
        `Anthropic request failed (${res.status}): ${detail.slice(0, 200)}`,
        classifyStatus(res.status),
        res.status,
      );
    }

    const json = (await res.json()) as AnthropicResponse;
    const blocks = json.content ?? [];

    const text =
      blocks
        .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim() || null;

    const toolCalls = blocks
      .filter(
        (
          b,
        ): b is {
          type: 'tool_use';
          id: string;
          name: string;
          input: Record<string, unknown>;
        } => b.type === 'tool_use',
      )
      .map((b) => ({ id: b.id, name: b.name, args: b.input ?? {} }));

    // A forced-tool JSON response has no text block, so surface the structured
    // arguments as text — callers asking for JSON expect to parse `text`.
    const structured =
      req.jsonSchema && !text && toolCalls.length > 0
        ? JSON.stringify(toolCalls[0].args)
        : text;

    return {
      text: structured,
      // The synthetic `respond` tool is a transport detail, not a real call.
      toolCalls: req.jsonSchema && toolCalls[0]?.name === 'respond' ? [] : toolCalls,
      usage: {
        inputTokens: json.usage?.input_tokens ?? 0,
        outputTokens: json.usage?.output_tokens ?? 0,
      },
      model: json.model ?? this.model,
      finishReason: mapStopReason(json.stop_reason),
    };
  }
}

function mapStopReason(
  reason: string | undefined,
): AiCompletionResult['finishReason'] {
  switch (reason) {
    case 'end_turn':
    case 'stop_sequence':
      return 'stop';
    case 'max_tokens':
      return 'length';
    case 'tool_use':
      return 'tool_use';
    default:
      return 'stop';
  }
}
