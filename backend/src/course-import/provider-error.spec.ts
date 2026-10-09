import {
  classifyProviderError,
  retryAfterMs,
} from './lesson-content-generation.service';
import { CourseImportError } from './course-import-error';

// The exact shape of the error the live Git import hit on 2026-10-09.
const GROQ_429 =
  'OpenAI-compatible request failed (429): {"error":{"message":"Rate limit reached for model `openai/gpt-oss-120b` in organization org_x service tier `on_demand` on tokens per day (TPD): Limit 200000, Used 199500, Requested 6200. Please try again in 7m12.48s.","type":"tokens","code":"rate_limit_exceeded"}}';

describe('classifyProviderError', () => {
  it("turns Groq's rate limit into AI_RATE_LIMIT, with its wait", () => {
    const e = classifyProviderError(new Error(GROQ_429)) as CourseImportError;
    expect(e).toBeInstanceOf(CourseImportError);
    expect(e.code).toBe('AI_RATE_LIMIT');
    expect(e.retryAfterMs).toBe(432_480);
  });

  it('maps server errors and bad keys too', () => {
    expect(
      (
        classifyProviderError(
          new Error('OpenAI-compatible request failed (503): busy'),
        ) as CourseImportError
      ).code,
    ).toBe('AI_PROVIDER_ERROR');
    expect(
      (
        classifyProviderError(
          new Error('OpenAI-compatible request failed (401): bad key'),
        ) as CourseImportError
      ).code,
    ).toBe('PROVIDER_NOT_CONFIGURED');
  });

  it('leaves errors without an HTTP status alone', () => {
    const err = new Error('socket hang up');
    expect(classifyProviderError(err)).toBe(err);
  });
});

describe('retryAfterMs', () => {
  it.each([
    ['Please try again in 7m12.48s.', 432_480],
    ['try again in 1h2m', 3_720_000],
    ['try again in 850ms', 850],
    ['try again in 20s', 20_000],
    ['no hint here', null],
  ])('%s -> %s', (msg, ms) => {
    expect(retryAfterMs(msg)).toBe(ms);
  });
});
