import { OpenAiCompatibleAdapter } from './openai-compatible.adapter';

function jsonResponse(body: unknown): Response {
  return {
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
  } as Response;
}

describe('OpenAiCompatibleAdapter', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  const adapter = new OpenAiCompatibleAdapter({
    apiKey: 'test-key',
    model: 'test-model',
    baseUrl: 'https://api.example.com/v1',
  });

  it('requests json_object mode without embedding a schema when none is given', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ choices: [{ message: { content: 'hi' } }] }),
    );

    await adapter.complete({
      system: 'You are a test.',
      messages: [{ role: 'user', content: 'hello' }],
      maxOutputTokens: 100,
      timeoutMs: 5000,
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.messages[0]).toEqual({
      role: 'system',
      content: 'You are a test.',
    });
    expect(body.response_format).toBeUndefined();
  });

  it('embeds the exact field-name schema into the system message when one is given', async () => {
    // Regression test: json_object mode only guarantees valid JSON syntax,
    // not any particular shape — Groq was observed inventing its own field
    // names ({Learn, Apply, ...}) when the schema was only ever passed as a
    // structured param it silently ignored, never as text it actually reads.
    fetchMock.mockResolvedValue(
      jsonResponse({ choices: [{ message: { content: '{}' } }] }),
    );
    const schema = {
      type: 'object',
      properties: { description: { type: 'string' } },
      required: ['description'],
    };

    await adapter.complete({
      system: 'You are a test.',
      messages: [{ role: 'user', content: 'hello' }],
      maxOutputTokens: 100,
      timeoutMs: 5000,
      jsonSchema: schema,
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body.messages[0].role).toBe('system');
    expect(body.messages[0].content).toContain('You are a test.');
    expect(body.messages[0].content).toContain(JSON.stringify(schema));
    expect(body.response_format).toEqual({ type: 'json_object' });
  });
});
