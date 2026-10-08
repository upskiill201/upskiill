/**
 * Long videos become bite-size parts.
 *
 * Teyro lessons hold a video of at most 15 minutes (MAX_VIDEO_SECONDS). A
 * longer course video isn't re-encoded: it's split into N lessons that each
 * play a clip of the same file ("Part 2 of 3" plays 12:40–25:10), and each
 * part's exercises are written from its own slice of the transcript.
 *
 * Parts aim for COURSE_IMPORT_PART_MINUTES (12 by default): about the most
 * speech one lesson-generation call can read on the free AI tier, so a part
 * is never written from only its opening minutes. Boundaries move to the
 * nearest pause between Whisper segments, so a part never starts mid-word.
 */

import { MAX_VIDEO_SECONDS } from '../lesson/lesson-blocks.util';

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface LessonPart {
  /** 1-based. */
  index: number;
  count: number;
  startSec: number;
  endSec: number;
}

const DEFAULT_PART_MINUTES = 12;
/** How far a boundary may move to land on a pause between sentences. */
const SNAP_WINDOW_SEC = 45;
/** A pause shorter than this is just two words; prefer a real gap. */
const MIN_GAP_SEC = 0.3;

export function partTargetSeconds(): number {
  const minutes = Number(process.env.COURSE_IMPORT_PART_MINUTES);
  const safe =
    Number.isFinite(minutes) && minutes >= 3
      ? Math.min(minutes, MAX_VIDEO_SECONDS / 60)
      : DEFAULT_PART_MINUTES;
  return Math.round(safe * 60);
}

/** Does a file this long need splitting at all? */
export function needsParts(durationSec: number | null | undefined): boolean {
  return typeof durationSec === 'number' && durationSec > MAX_VIDEO_SECONDS;
}

/** How many parts a file this long becomes (1 = a whole-file lesson). */
export function partCountFor(durationSec: number | null | undefined): number {
  if (!needsParts(durationSec)) return 1;
  return Math.ceil((durationSec as number) / partTargetSeconds());
}

/**
 * Equal-length parts, each boundary snapped to the nearest gap between
 * segments within ±45s, never letting a part exceed 15 minutes. Returns []
 * for a file that doesn't need splitting.
 */
export function planParts(
  durationSec: number | null | undefined,
  segments?: TranscriptSegment[] | null,
): LessonPart[] {
  if (!needsParts(durationSec)) return [];
  const total = Math.floor(durationSec as number);
  const count = partCountFor(total);
  const gaps = segmentGaps(segments);

  const bounds = [0];
  for (let i = 1; i < count; i++) {
    const ideal = (total * i) / count;
    const prev = bounds[i - 1];
    // Never further than 15 min from the previous boundary, and leave room
    // for the parts still to come.
    const max = Math.min(prev + MAX_VIDEO_SECONDS, total - 1);
    const min = Math.max(prev + 1, total - (count - i) * MAX_VIDEO_SECONDS);
    const snapped = nearestGap(gaps, ideal) ?? ideal;
    bounds.push(Math.round(clamp(snapped, min, max)));
  }
  bounds.push(total);

  // The last part can still overrun if the snaps all leaned early; pull the
  // boundaries back toward even spacing rather than ship an over-long clip.
  for (let i = count - 1; i >= 1; i--) {
    if (bounds[i + 1] - bounds[i] > MAX_VIDEO_SECONDS) {
      bounds[i] = bounds[i + 1] - MAX_VIDEO_SECONDS;
    }
  }

  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    count,
    startSec: bounds[i],
    endSec: bounds[i + 1],
  }));
}

/**
 * The words spoken in [startSec, endSec). With Whisper segments, the
 * segments whose midpoint falls inside the range; without them (a provider
 * that returns plain text, or an older import), a proportional cut of the
 * text at word boundaries — approximate, but it keeps each part's content
 * about its own part instead of the whole video's opening.
 */
export function sliceTranscript(
  transcript: string,
  segments: TranscriptSegment[] | null | undefined,
  startSec: number,
  endSec: number,
  totalSec: number,
): string {
  if (segments && segments.length > 0) {
    const text = segments
      .filter((s) => {
        const mid = (s.start + s.end) / 2;
        return mid >= startSec && mid < endSec;
      })
      .map((s) => s.text.trim())
      .filter(Boolean)
      .join(' ');
    if (text.trim()) return text;
  }
  if (!(totalSec > 0)) return transcript;
  const from = wordBoundary(
    transcript,
    Math.floor((transcript.length * startSec) / totalSec),
  );
  const to = wordBoundary(
    transcript,
    Math.floor((transcript.length * endSec) / totalSec),
  );
  return transcript.slice(from, to).trim();
}

/** Reads Whisper segments out of untyped JSON (a DB Json column). */
export function asSegments(raw: unknown): TranscriptSegment[] | null {
  if (!Array.isArray(raw)) return null;
  const out = raw
    .filter(
      (s): s is TranscriptSegment =>
        !!s &&
        typeof s === 'object' &&
        typeof (s as TranscriptSegment).start === 'number' &&
        typeof (s as TranscriptSegment).end === 'number' &&
        typeof (s as TranscriptSegment).text === 'string',
    )
    .map((s) => ({ start: s.start, end: s.end, text: s.text }));
  return out.length > 0 ? out : null;
}

export function partTitle(
  base: string,
  part: { index: number; count: number },
): string {
  return `${base} (Part ${part.index} of ${part.count})`;
}

/* ── helpers ─────────────────────────────────────────────────────────── */

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

/** Midpoints of the pauses between consecutive segments. */
function segmentGaps(segments?: TranscriptSegment[] | null): number[] {
  if (!segments || segments.length < 2) return [];
  const sorted = [...segments].sort((a, b) => a.start - b.start);
  const gaps: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const gap = sorted[i].start - sorted[i - 1].end;
    // Whisper often reports touching segments (gap 0) at sentence ends; a
    // segment edge is still a sentence edge, so it counts — a real pause wins.
    gaps.push(
      gap >= MIN_GAP_SEC
        ? (sorted[i - 1].end + sorted[i].start) / 2
        : sorted[i].start,
    );
  }
  return gaps;
}

function nearestGap(gaps: number[], ideal: number): number | null {
  let best: number | null = null;
  for (const g of gaps) {
    if (Math.abs(g - ideal) > SNAP_WINDOW_SEC) continue;
    if (best === null || Math.abs(g - ideal) < Math.abs(best - ideal)) best = g;
  }
  return best;
}

/** Moves an index forward to the next whitespace so no word is cut. */
function wordBoundary(text: string, index: number): number {
  if (index <= 0) return 0;
  if (index >= text.length) return text.length;
  const next = text.slice(index).search(/\s/);
  return next === -1 ? text.length : index + next;
}
