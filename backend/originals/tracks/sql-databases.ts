import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './sql-databases/beginner/u01';
import u02 from './sql-databases/beginner/u02';
import u03 from './sql-databases/beginner/u03';
import u04 from './sql-databases/beginner/u04';
import u05 from './sql-databases/beginner/u05';

/**
 * SQL and Databases for Beginners — storyline "Save the Starlight". A SHORT
 * Original: one level, 5 chapters × 10 lessons, a countdown to the Starlight
 * Picture House's 100th birthday on the map. Juno, the projectionist, turns
 * Walt's shoebox of index cards into a real booking database, and the app on
 * top of it, one chapter at a time. Every lesson runs real SQLite in the
 * learner's browser (runner: 'sql', frontend/lib/code/sqlRunner.ts) on the
 * practice databases in frontend/public/sql/db (never change them).
 * Outline and cast: docs/originals/sql-databases-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'sql-and-databases-for-beginners',
  title: 'SQL and Databases for Beginners',
  category: 'Coding',
  format: 'short',
  runner: 'sql',
  description:
    'Learn SQL from zero by building a real booking database: create tables, ask questions, join, total, and protect your data, running real queries in your browser.',
  levels: [
    {
      level: 1,
      slug: 'sql-and-databases-for-beginners',
      title: 'SQL and Databases for Beginners',
      subtitle: 'Save the Starlight: a 100-year-old cinema, one seat sold twice, and seven weeks to build the database that saves it',
      shortDescription:
        'Learn SQL the fun way: build a real booking database for a 100-year-old cinema, running real queries in every lesson, right on your phone.',
      description:
        "Chicago, seven weeks before the Starlight Picture House turns 100. On a sold-out Casablanca night, seat G7 is sold twice, a developer offers $2.4 million for the building, and the bank will only fix the roof if the cinema can prove its numbers. All the owner has is a shoebox of index cards. Follow Juno, the projectionist, as she turns that shoebox into a real database, and the booking app on top of it, one chapter at a time. You'll write real SQL in every lesson, right in your browser: design tables, add data, ask questions with SELECT and WHERE, join tables, total the takings for the bank, and lock the data down so no seat is ever sold twice again. Ten minutes a lesson, made for your phone.",
      startingPoint:
        'Total beginners. You have never written SQL or any code. Nothing to install: real SQLite runs in your browser.',
      endOutcome:
        'Design a small database, fill it, query it with joins and totals, change it safely, and explain how an app uses it.',
      outcomes: [
        'Design tables with the right columns, types and keys',
        'Add, change and delete data safely',
        'Ask precise questions with SELECT, WHERE and ORDER BY',
        'Combine tables with JOIN and LEFT JOIN',
        'Summarise data with COUNT, SUM, AVG and GROUP BY',
        'Protect data with constraints, transactions and indexes',
      ],
      skills: ['SQL', 'SQLite', 'Database design', 'Joins', 'Aggregation', 'Data integrity'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/sql-and-databases-for-beginners.jpg',
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
