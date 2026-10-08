import {
  asSegments,
  needsParts,
  partCountFor,
  partTitle,
  planParts,
  sliceTranscript,
  type TranscriptSegment,
} from './lesson-parts';
import { MAX_VIDEO_SECONDS } from '../lesson/lesson-blocks.util';

const MIN = 60;

/** A segment every 5s across the whole file, each a short sentence. */
function segmentsFor(totalSec: number): TranscriptSegment[] {
  const out: TranscriptSegment[] = [];
  for (let t = 0; t < totalSec; t += 5) {
    out.push({ start: t, end: Math.min(t + 4.2, totalSec), text: `s${t}.` });
  }
  return out;
}

describe('lesson parts', () => {
  const OLD_ENV = process.env.COURSE_IMPORT_PART_MINUTES;
  afterEach(() => {
    if (OLD_ENV === undefined) delete process.env.COURSE_IMPORT_PART_MINUTES;
    else process.env.COURSE_IMPORT_PART_MINUTES = OLD_ENV;
  });

  it('leaves a video of 15 minutes or less whole', () => {
    expect(needsParts(15 * MIN)).toBe(false);
    expect(needsParts(null)).toBe(false);
    expect(planParts(15 * MIN)).toEqual([]);
    expect(partCountFor(10 * MIN)).toBe(1);
  });

  it('splits a long video into ~12-minute parts that cover it end to end', () => {
    const parts = planParts(40 * MIN);
    expect(parts).toHaveLength(4); // ceil(40 / 12)
    expect(parts[0].startSec).toBe(0);
    expect(parts[parts.length - 1].endSec).toBe(40 * MIN);
    for (const [i, p] of parts.entries()) {
      expect(p.index).toBe(i + 1);
      expect(p.count).toBe(4);
      expect(p.endSec - p.startSec).toBeLessThanOrEqual(MAX_VIDEO_SECONDS);
      if (i > 0) expect(p.startSec).toBe(parts[i - 1].endSec);
    }
  });

  it('makes a 16-minute video two parts, not one long one', () => {
    const parts = planParts(16 * MIN);
    expect(parts.map((p) => [p.startSec, p.endSec])).toEqual([
      [0, 8 * MIN],
      [8 * MIN, 16 * MIN],
    ]);
  });

  it('moves a boundary onto the nearest pause between segments', () => {
    const segments: TranscriptSegment[] = [
      { start: 0, end: 470, text: 'first half' },
      // A real pause at 470-474 near the ideal 480s cut.
      { start: 474, end: 960, text: 'second half' },
    ];
    const parts = planParts(16 * MIN, segments);
    expect(parts[0].endSec).toBe(472);
    expect(parts[1].startSec).toBe(472);
  });

  it('never lets snapping push a part over 15 minutes', () => {
    process.env.COURSE_IMPORT_PART_MINUTES = '15';
    // 30:00 at the 15-minute target: two parts of exactly 15:00. A pause
    // 40s late must not make part 1 15:40.
    const segments: TranscriptSegment[] = [
      { start: 0, end: 938, text: 'a' },
      { start: 942, end: 1800, text: 'b' },
    ];
    const parts = planParts(30 * MIN, segments);
    for (const p of parts) {
      expect(p.endSec - p.startSec).toBeLessThanOrEqual(MAX_VIDEO_SECONDS);
    }
  });

  it('honours COURSE_IMPORT_PART_MINUTES, capped at 15', () => {
    process.env.COURSE_IMPORT_PART_MINUTES = '8';
    expect(partCountFor(40 * MIN)).toBe(5);
    process.env.COURSE_IMPORT_PART_MINUTES = '60';
    expect(partCountFor(40 * MIN)).toBe(3);
  });

  it('titles parts', () => {
    expect(partTitle('Hooks', { index: 2, count: 3 })).toBe(
      'Hooks (Part 2 of 3)',
    );
  });

  describe('sliceTranscript', () => {
    it("takes the segments whose middle falls in the part's range", () => {
      const segs = segmentsFor(30);
      expect(sliceTranscript('ignored', segs, 10, 20, 30)).toBe('s10. s15.');
    });

    it('falls back to a proportional cut at word boundaries without segments', () => {
      const text = 'one two three four five six seven eight';
      const firstHalf = sliceTranscript(text, null, 0, 50, 100);
      const secondHalf = sliceTranscript(text, null, 50, 100, 100);
      expect(firstHalf.split(' ').length).toBeGreaterThan(2);
      expect(`${firstHalf} ${secondHalf}`).toBe(text);
      // No word is cut in half.
      for (const w of [...firstHalf.split(' '), ...secondHalf.split(' ')]) {
        expect(text.split(' ')).toContain(w);
      }
    });
  });

  it('reads segments from JSON, ignoring junk', () => {
    expect(asSegments(null)).toBeNull();
    expect(asSegments([{ start: 1 }, 'x'])).toBeNull();
    expect(asSegments([{ start: 0, end: 1, text: 'hi', extra: 1 }])).toEqual([
      { start: 0, end: 1, text: 'hi' },
    ]);
  });
});
