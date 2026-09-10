import { AnthropicAdapter } from './anthropic.adapter';
import { GeminiAdapter } from './gemini.adapter';
import { OpenAiCompatibleAdapter } from './openai-compatible.adapter';
import { AiProviderError } from '../ai-provider.interface';

const baseReq = {
  system: 'You are Tey.',
  messages: [{ role: 'user' as const, content: 'Write a nudge.' }],
  maxOutputTokens: 200,
  timeoutMs: 5000,
};

const jsonOk = (body: unknown) => ({
  ok: true,
  status: 200,
  json: async () => body,
  text: async () => JSON.stringify(body),
});

const httpErr = (status: number) => ({
  ok: false,
  status,
  json: async () => ({}),
  text: async () => 'nope',
});

describe('AI adapters', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  describe('OpenAiCompatibleAdapter', () => {
    const make = (baseUrl = 'https://api.example.com/v1') =>
      new OpenAiCompatibleAdapter({ apiKey: 'sk-test', model: 'gpt-x', baseUrl });

    it('refuses to construct without a base URL', () => {
      // Silently pointing at nothing would fail at 8pm rather than at config
      // time, which is the worst possible moment to discover it.
      expect(
        () =>
          new OpenAiCompatibleAdapter({
            apiKey: 'k',
            model: 'm',
            baseUrl: null,
          }),
      ).toThrow(AiProviderError);
    });

    it('honours the configured base URL rather than assuming a vendor', () => {
      // This one field is what makes OpenRouter / Groq / NVIDIA / Ollama all
      // work through a single adapter.
      fetchMock.mockResolvedValue(jsonOk({ choices: [{ message: {} }] }));
      const adapter = make('https://openrouter.ai/api/v1/');
      return adapter.complete(baseReq).then(() => {
        expect(fetchMock.mock.calls[0][0]).toBe(
          'https://openrouter.ai/api/v1/chat/completions',
        );
      });
    });

    it('sends the key as a bearer token', async () => {
      fetchMock.mockResolvedValue(jsonOk({ choices: [{ message: {} }] }));
      await make().complete(baseReq);
      const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>;
      expect(headers.Authorization).toBe('Bearer sk-test');
    });

    it('normalizes usage — the number the cost accounting depends on', async () => {
      fetchMock.mockResolvedValue(
        jsonOk({
          choices: [{ message: { content: 'hi' }, finish_reason: 'stop' }],
          usage: { prompt_tokens: 120, completion_tokens: 30 },
          model: 'gpt-x-2',
        }),
      );

      const result = await make().complete(baseReq);
      expect(result.usage).toEqual({ inputTokens: 120, outputTokens: 30 });
      expect(result.model).toBe('gpt-x-2');
      expect(result.finishReason).toBe('stop');
    });

    it('reports zero usage rather than NaN when the provider omits it', async () => {
      fetchMock.mockResolvedValue(jsonOk({ choices: [{ message: {} }] }));
      const result = await make().complete(baseReq);
      expect(result.usage).toEqual({ inputTokens: 0, outputTokens: 0 });
    });

    it('survives malformed tool arguments', async () => {
      fetchMock.mockResolvedValue(
        jsonOk({
          choices: [
            {
              message: {
                tool_calls: [
                  { id: 't1', function: { name: 'get_streak', arguments: '{oops' } },
                ],
              },
            },
          ],
        }),
      );

      const result = await make().complete(baseReq);
      expect(result.toolCalls[0]).toEqual({
        id: 't1',
        name: 'get_streak',
        args: {},
      });
    });

    it.each([
      [401, 'AUTH'],
      [403, 'AUTH'],
      [429, 'RATE_LIMIT'],
      [400, 'BAD_REQUEST'],
      [503, 'SERVER'],
    ])('classifies a %i as %s', async (status, kind) => {
      // An operator needs to tell a bad key from a model outage.
      fetchMock.mockResolvedValue(httpErr(status));
      await expect(make().complete(baseReq)).rejects.toMatchObject({ kind });
    });
  });

  describe('AnthropicAdapter', () => {
    const make = () =>
      new AnthropicAdapter({ apiKey: 'ak-test', model: 'claude-x' });

    it('uses the native contract, not an OpenAI-shaped one', async () => {
      fetchMock.mockResolvedValue(jsonOk({ content: [] }));
      await make().complete(baseReq);

      const [url, init] = fetchMock.mock.calls[0];
      const headers = init.headers as Record<string, string>;
      const body = JSON.parse(init.body as string);

      expect(url).toContain('/messages');
      // x-api-key plus a required version header — not a bearer token.
      expect(headers['x-api-key']).toBe('ak-test');
      expect(headers['anthropic-version']).toBeTruthy();
      // System is a top-level field, not a message with role 'system'.
      expect(body.system).toBe('You are Tey.');
      expect(body.messages.some((m: { role: string }) => m.role === 'system')).toBe(
        false,
      );
    });

    it('emulates JSON mode with a forced tool, since Anthropic has none', async () => {
      fetchMock.mockResolvedValue(
        jsonOk({
          content: [
            { type: 'tool_use', id: 't1', name: 'respond', input: { title: 'T', body: 'B' } },
          ],
          usage: { input_tokens: 10, output_tokens: 5 },
        }),
      );

      const result = await make().complete({
        ...baseReq,
        jsonSchema: { type: 'object', properties: {} },
      });

      const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
      expect(body.tool_choice).toEqual({ type: 'tool', name: 'respond' });

      // The structured result is surfaced as text, because callers asking for
      // JSON expect to parse `text`.
      expect(JSON.parse(result.text!)).toEqual({ title: 'T', body: 'B' });
      // The synthetic tool is transport, not a real call for the caller to run.
      expect(result.toolCalls).toEqual([]);
    });

    it('normalizes usage from Anthropic field names', async () => {
      fetchMock.mockResolvedValue(
        jsonOk({
          content: [{ type: 'text', text: 'hello' }],
          usage: { input_tokens: 42, output_tokens: 7 },
          stop_reason: 'max_tokens',
        }),
      );

      const result = await make().complete(baseReq);
      expect(result.usage).toEqual({ inputTokens: 42, outputTokens: 7 });
      expect(result.finishReason).toBe('length');
    });
  });

  describe('GeminiAdapter', () => {
    const make = () =>
      new GeminiAdapter({ apiKey: 'g-test', model: 'gemini-2.0-flash' });

    it('passes the key as a query parameter and uses systemInstruction', async () => {
      fetchMock.mockResolvedValue(jsonOk({ candidates: [] }));
      await make().complete(baseReq);

      const [url, init] = fetchMock.mock.calls[0];
      const body = JSON.parse(init.body as string);

      expect(url).toContain(':generateContent');
      expect(url).toContain('key=g-test');
      expect(body.systemInstruction.parts[0].text).toBe('You are Tey.');
    });

    it("renames the assistant role to Gemini's 'model'", async () => {
      fetchMock.mockResolvedValue(jsonOk({ candidates: [] }));
      await make().complete({
        ...baseReq,
        messages: [
          { role: 'user', content: 'hi' },
          { role: 'assistant', content: 'hello' },
        ],
      });

      const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
      expect(body.contents.map((c: { role: string }) => c.role)).toEqual([
        'user',
        'model',
      ]);
    });

    it('uppercases schema types and strips additionalProperties', async () => {
      // Gemini rejects a standard JSON Schema outright, and the resulting 400
      // reads like a model error rather than a shape error.
      fetchMock.mockResolvedValue(jsonOk({ candidates: [] }));
      await make().complete({
        ...baseReq,
        jsonSchema: {
          type: 'object',
          additionalProperties: false,
          properties: { title: { type: 'string' } },
        },
      });

      const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
      const schema = body.generationConfig.responseSchema;
      expect(schema.type).toBe('OBJECT');
      expect(schema.properties.title.type).toBe('STRING');
      expect(schema).not.toHaveProperty('additionalProperties');
      expect(body.generationConfig.responseMimeType).toBe('application/json');
    });

    it('normalizes usage from usageMetadata', async () => {
      fetchMock.mockResolvedValue(
        jsonOk({
          candidates: [
            { content: { parts: [{ text: 'hi' }] }, finishReason: 'STOP' },
          ],
          usageMetadata: { promptTokenCount: 88, candidatesTokenCount: 12 },
        }),
      );

      const result = await make().complete(baseReq);
      expect(result.usage).toEqual({ inputTokens: 88, outputTokens: 12 });
      expect(result.text).toBe('hi');
    });

    it('maps a safety block to a filter finish reason', async () => {
      fetchMock.mockResolvedValue(
        jsonOk({ candidates: [{ content: { parts: [] }, finishReason: 'SAFETY' }] }),
      );
      const result = await make().complete(baseReq);
      expect(result.finishReason).toBe('filter');
    });
  });

  describe('timeouts', () => {
    it('aborts rather than holding a scheduler slot open', async () => {
      // A hung provider would stall every action queued behind it.
      fetchMock.mockImplementation(() => {
        const err = new Error('aborted');
        err.name = 'AbortError';
        return Promise.reject(err);
      });

      const adapter = new GeminiAdapter({ apiKey: 'k', model: 'm' });
      await expect(adapter.complete({ ...baseReq, timeoutMs: 50 })).rejects.toMatchObject(
        { kind: 'TIMEOUT' },
      );
    });
  });
});
