/**
 * A short memory of this learner's recent lessons, on this device — what
 * personal records ("fastest lesson yet", "best run yet") are measured
 * against. Nothing here is a reward; it only decides which true thing the
 * finish screen points out. The server stays the authority for XP, streaks
 * and completion.
 */

export interface LessonRecord {
  /** Epoch ms when the lesson was finished. */
  at: number;
  lessonId: string;
  /** First-try accuracy 0–100, or null for a lesson with no quiz. */
  accuracy: number | null;
  seconds: number;
  /** Longest run of right answers in a row. */
  bestCombo: number;
}

const KEY = 'teyro:lesson-history:v1';
const KEEP = 50;

export function readHistory(): LessonRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as LessonRecord[]) : [];
    return Array.isArray(list) ? list.filter((r) => r && typeof r.at === 'number') : [];
  } catch {
    return [];
  }
}

export function recordLesson(record: LessonRecord) {
  try {
    const list = [...readHistory(), record].slice(-KEEP);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage blocked — records just won't be noticed on this device.
  }
}
