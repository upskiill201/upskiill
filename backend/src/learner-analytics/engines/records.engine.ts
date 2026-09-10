import { DailyActivityRow, PersonalRecords } from '../learner-analytics.types';

/** Personal bests over whatever activity range the orchestrator fetched (see learner-analytics.service.ts's HISTORY_WINDOW_DAYS cap). Real historical maxima only — never fabricated. */
export function computeRecords(
  dailyActivity: DailyActivityRow[],
  longestStreakDays: number,
): PersonalRecords {
  let bestXpDay: PersonalRecords['bestXpDay'] = null;
  let bestLessonsDay: PersonalRecords['bestLessonsDay'] = null;
  let bestTimeDay: PersonalRecords['bestTimeDay'] = null;

  for (const row of dailyActivity) {
    if (row.xpEarned > 0 && (!bestXpDay || row.xpEarned > bestXpDay.value)) {
      bestXpDay = { date: row.date, value: row.xpEarned };
    }
    if (
      row.lessonsCompleted > 0 &&
      (!bestLessonsDay || row.lessonsCompleted > bestLessonsDay.value)
    ) {
      bestLessonsDay = { date: row.date, value: row.lessonsCompleted };
    }
    if (
      row.timeSpentSeconds > 0 &&
      (!bestTimeDay || row.timeSpentSeconds > bestTimeDay.seconds)
    ) {
      bestTimeDay = { date: row.date, seconds: row.timeSpentSeconds };
    }
  }

  return {
    longestStreakDays,
    bestXpDay,
    bestLessonsDay,
    bestTimeDay,
    hasAnyRecord: Boolean(
      bestXpDay || bestLessonsDay || bestTimeDay || longestStreakDays > 0,
    ),
  };
}
