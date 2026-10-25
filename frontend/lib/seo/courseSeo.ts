/**
 * Search-facing titles and descriptions for course pages, chosen from the
 * keyword research (scripts/seo/keywords.mjs → out/keywords/<slug>.md).
 *
 * Why this file exists: the course description in the database is the long
 * story intro ("Kofi has just started university in Kumasi…"), which is what
 * Google was showing as the snippet, and the default title is the same
 * template for every course. Searchers typing "how to budget on a low income"
 * or "python course free" need the topic and the promise in the first words.
 *
 * Titles ≤ 60 characters, descriptions ≤ 160. Claims here come from the
 * course itself and lib/seo/facts.ts: nothing that is not true of the course.
 * A course with no entry keeps the default title and its own description.
 */
export interface CourseSeo {
  title: string;
  description: string;
}

export const COURSE_SEO: Record<string, CourseSeo> = {
  'budgeting-for-beginners': {
    title: 'Budgeting for Beginners: Learn to Budget | Teyro',
    description:
      'Learn how to budget, even on a low income: track your spending, tell needs from wants and build a monthly budget you keep. 50 short lessons, free to start.',
  },
  'python-for-beginners': {
    title: 'Learn Python for Beginners: Free to Start | Teyro',
    description:
      'Learn Python from zero in short daily lessons. Write and run real code in every lesson, right on your phone. 120 lessons, free to start.',
  },
};
