import { Test, TestingModule } from '@nestjs/testing';
import {
  AUDIO_BYTES_PER_SECOND,
  CHUNK_SECONDS,
  GroqWhisperTranscriptionService,
  MAX_AUDIO_BYTES,
} from './groq-whisper-transcription.service';
import { AiConfigService } from '../tey/ai/ai-config.service';
import { AiBudgetService } from '../tey/ai/ai-budget.service';

/**
 * Covers the two gating checks — the actual safety-critical logic (never
 * spend budget or touch Drive/Groq once either refuses). The download ->
 * ffmpeg -> upload happy path deliberately isn't mocked here: it needs
 * `fs`, `fs/promises`, and `child_process` all mocked together, and Jest's
 * automocking of Node's *built-in* modules (as opposed to regular npm
 * packages) proved unreliable in practice — several attempts at a full
 * mocked happy-path test hung indefinitely regardless of how the fake
 * streams/process were wired up. That flow is real shell-out + file I/O
 * anyway, exactly the kind of thing better proven by the actual live
 * small-scale course-import test than by a fragile mock of three Node
 * built-ins at once.
 */
describe('GroqWhisperTranscriptionService', () => {
  let service: GroqWhisperTranscriptionService;
  let aiConfig: { resolveRawCourseImportCredentials: jest.Mock };
  let budget: { checkCourseImport: jest.Mock; record: jest.Mock };
  let fetchMock: jest.Mock;

  beforeEach(async () => {
    aiConfig = {
      resolveRawCourseImportCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://api.groq.com/openai/v1',
        model: 'openai/gpt-oss-20b',
        providerId: 'provider-1',
        inputCostPer1k: 0,
        outputCostPer1k: 0,
      }),
    };
    budget = {
      checkCourseImport: jest.fn().mockResolvedValue({ allow: true }),
      record: jest.fn().mockResolvedValue(undefined),
    };
    fetchMock = jest.fn();
    global.fetch = fetchMock as unknown as typeof fetch;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroqWhisperTranscriptionService,
        { provide: AiConfigService, useValue: aiConfig },
        { provide: AiBudgetService, useValue: budget },
      ],
    }).compile();

    service = module.get(GroqWhisperTranscriptionService);
  });

  it('refuses when the course-import AI budget has been reached, before touching Drive or Groq', async () => {
    budget.checkCourseImport.mockResolvedValue({
      allow: false,
      reason: 'COURSE_IMPORT_CALL_CAP',
    });

    await expect(
      service.transcribe('https://cdn.example/video.mp4'),
    ).rejects.toThrow('Course-import AI budget reached');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('throws a clear error when no course-import provider is configured', async () => {
    aiConfig.resolveRawCourseImportCredentials.mockResolvedValue(null);

    await expect(
      service.transcribe('https://cdn.example/video.mp4'),
    ).rejects.toThrow('No active course-import AI provider configured');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // The chunk duration is derived from the bitrate we encode at, so these
  // constants have to stay consistent with each other. Raising the bitrate
  // without re-deriving CHUNK_SECONDS would put every chunk of a long
  // lesson back over Groq's cap — the exact failure chunking exists to fix.
  describe('chunk sizing', () => {
    it('keeps a full-length chunk under the provider cap', () => {
      expect(CHUNK_SECONDS * AUDIO_BYTES_PER_SECOND).toBeLessThan(
        MAX_AUDIO_BYTES,
      );
    });

    it('splits into chunks long enough to be worth the extra requests', () => {
      // A chunk far shorter than the cap allows would multiply Groq calls
      // (and rate-limit exposure) for no reason.
      expect(CHUNK_SECONDS).toBeGreaterThan(30 * 60);
    });
  });
});
