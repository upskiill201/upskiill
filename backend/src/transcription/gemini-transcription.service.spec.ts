import { Test, TestingModule } from '@nestjs/testing';
import { GeminiTranscriptionService } from './gemini-transcription.service';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';

const creds = {
  apiKey: 'test-key',
  baseUrl: 'https://generativelanguage.googleapis.com',
  model: 'gemini-2.0-flash',
  providerId: 'provider-1',
  inputCostPer1k: 0,
  outputCostPer1k: 0,
};

function jsonResponse(body: unknown, init: Partial<Response> = {}): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers(),
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
    ...init,
  } as Response;
}

describe('GeminiTranscriptionService', () => {
  let service: GeminiTranscriptionService;
  let aiConfig: { resolveRawGeminiCredentials: jest.Mock };
  let budget: { checkCourseImport: jest.Mock; record: jest.Mock };
  let fetchMock: jest.Mock;

  beforeEach(async () => {
    aiConfig = {
      resolveRawGeminiCredentials: jest.fn().mockResolvedValue(creds),
    };
    budget = {
      checkCourseImport: jest.fn().mockResolvedValue({ allow: true }),
      record: jest.fn().mockResolvedValue(undefined),
    };
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeminiTranscriptionService,
        { provide: AiConfigService, useValue: aiConfig },
        { provide: AiBudgetService, useValue: budget },
      ],
    }).compile();

    service = module.get(GeminiTranscriptionService);
  });

  it('throws a clear error when no Gemini provider is configured', async () => {
    aiConfig.resolveRawGeminiCredentials.mockResolvedValue(null);
    await expect(
      service.transcribe('https://cdn.example/video.mp4'),
    ).rejects.toThrow('No active Gemini provider configured');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses when the course-import AI budget has been reached, never calling Gemini', async () => {
    budget.checkCourseImport.mockResolvedValue({
      allow: false,
      reason: 'COURSE_IMPORT_CALL_CAP',
    });
    await expect(
      service.transcribe('https://cdn.example/video.mp4'),
    ).rejects.toThrow('Course-import AI budget reached');
    expect(aiConfig.resolveRawGeminiCredentials).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('walks the full upload -> poll -> generate -> cleanup flow and returns the transcript', async () => {
    const videoHeaders = new Headers({
      'content-type': 'video/mp4',
      'content-length': '1000',
    });
    const uploadStartHeaders = new Headers({
      'x-goog-upload-url': 'https://upload.example/session-abc',
    });

    fetchMock
      // 1. download the video
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: videoHeaders,
        body: {},
      } as unknown as Response)
      // 2. start resumable upload
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: uploadStartHeaders,
      } as unknown as Response)
      // 3. upload the bytes, finalize
      .mockResolvedValueOnce(
        jsonResponse({
          file: {
            name: 'files/abc123',
            uri: 'https://generativelanguage.googleapis.com/files/abc123',
            state: 'PROCESSING',
          },
        }),
      )
      // 4. poll status -> now ACTIVE
      .mockResolvedValueOnce(
        jsonResponse({
          name: 'files/abc123',
          uri: 'https://generativelanguage.googleapis.com/files/abc123',
          state: 'ACTIVE',
          mimeType: 'video/mp4',
        }),
      )
      // 5. generateContent
      .mockResolvedValueOnce(
        jsonResponse({
          candidates: [
            {
              content: {
                parts: [
                  { text: 'Welcome to the course. ' },
                  { text: 'Today we cover hooks.' },
                ],
              },
            },
          ],
          usageMetadata: { promptTokenCount: 500, candidatesTokenCount: 42 },
        }),
      )
      // 6. delete (cleanup, best-effort)
      .mockResolvedValueOnce({ ok: true, status: 200 } as unknown as Response);

    const result = await service.transcribe('https://cdn.example/video.mp4');

    expect(result.text).toBe('Welcome to the course. Today we cover hooks.');
    expect(fetchMock).toHaveBeenCalledTimes(6);

    // The generate call must reference the uploaded file, not re-send bytes.
    const generateCall = fetchMock.mock.calls[4] as [string, RequestInit];
    expect(generateCall[0]).toContain(':generateContent');
    const generateBody = JSON.parse(generateCall[1].body as string) as {
      contents: { parts: { file_data?: { file_uri: string } }[] }[];
    };
    expect(generateBody.contents[0].parts[0].file_data?.file_uri).toBe(
      'https://generativelanguage.googleapis.com/files/abc123',
    );

    // Cleanup must target the uploaded file's own name.
    const deleteCall = fetchMock.mock.calls[5] as [string, RequestInit];
    expect(deleteCall[0]).toContain('files/abc123');
    expect(deleteCall[1].method).toBe('DELETE');

    expect(budget.record).toHaveBeenCalledWith(
      'provider-1',
      'COURSE_IMPORT',
      { inputTokens: 500, outputTokens: 42 },
      { inputCostPer1k: 0, outputCostPer1k: 0 },
    );
  });

  it('fails clearly when the video has no reported content-length', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'video/mp4' }),
      body: {},
    } as unknown as Response);

    await expect(
      service.transcribe('https://cdn.example/video.mp4'),
    ).rejects.toThrow('did not report a size');
  });

  it('fails clearly when Gemini marks the uploaded file FAILED', async () => {
    const videoHeaders = new Headers({
      'content-type': 'video/mp4',
      'content-length': '1000',
    });
    const uploadStartHeaders = new Headers({
      'x-goog-upload-url': 'https://upload.example/session-abc',
    });

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: videoHeaders,
        body: {},
      } as unknown as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        headers: uploadStartHeaders,
      } as unknown as Response)
      .mockResolvedValueOnce(
        jsonResponse({
          file: {
            name: 'files/bad',
            uri: 'https://x/files/bad',
            state: 'PROCESSING',
          },
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          name: 'files/bad',
          uri: 'https://x/files/bad',
          state: 'FAILED',
        }),
      );

    await expect(
      service.transcribe('https://cdn.example/video.mp4'),
    ).rejects.toThrow('failed to process the uploaded video');
  });

  it('surfaces a download failure without attempting any Gemini calls', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 403,
      headers: new Headers(),
      body: null,
    } as unknown as Response);

    await expect(
      service.transcribe('https://cdn.example/video.mp4'),
    ).rejects.toThrow('Could not download video');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
