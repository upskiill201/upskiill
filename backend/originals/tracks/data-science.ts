import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './data-science/beginner/u01';
import u02 from './data-science/beginner/u02';
import u03 from './data-science/beginner/u03';

/**
 * Data Science for Beginners — storyline "Zanele's First Dataset". A SHORT
 * Original: one level, 5 chapters × 10 lessons, a 5-week countdown to Mr
 * Kamau on the map. Every lesson runs pandas in the learner's browser on the
 * built-in practice files (frontend/public/python/teyro_datasets.py).
 * Outline and research: docs/originals/data-science-for-beginners-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'data-science-for-beginners',
  title: 'Data Science for Beginners',
  category: 'Coding',
  format: 'short',
  description:
    'Start from zero and answer a real question with real data. Learn Python and pandas in your browser: load, clean, summarise, compare and explain a dataset honestly.',
  levels: [
    {
      level: 1,
      slug: 'data-science-for-beginners',
      title: 'Data Science for Beginners',
      subtitle: "Zanele's First Dataset: 1 in 3 deliveries is late, and five weeks to find out why",
      shortDescription:
        'Learn data science from zero with Python and pandas: ask a good question, clean messy data, find what\'s normal, spot real patterns and tell an honest data story.',
      description:
        "Mr Kamau, the CEO of Synergix, has a problem: 1 in 3 deliveries arrives late, and nobody knows why. Emeka is sure it's one driver. Zanele, the spreadsheet genius, has five weeks and a file of 400 deliveries. She has never written a line of code. Follow her from her first line of Python to the presentation in Mr Kamau's office. You'll write real code in every lesson, right in your browser: load the data with pandas, clean what Felix broke, find averages that don't lie, compare like with like, and tell the difference between a pattern and a cause. Ten minutes a lesson, made for your phone, ready on the bus.",
      startingPoint:
        'Total beginners. No coding, no maths beyond percentages, nothing to install: the code runs in your browser.',
      endOutcome:
        'Take a real dataset from question to answer: load it, clean it, summarise it, compare groups and present an honest finding.',
      outcomes: [
        'Write your first Python and load a dataset with pandas',
        'Clean messy data: duplicates, blanks, typos and wrong types',
        'Use means, medians, rates and groupby without being fooled',
        'Filter, sort and compare groups fairly',
        'Tell correlation from causation',
        'Present a clear, honest data story',
      ],
      skills: ['Python', 'pandas', 'Data cleaning', 'Data analysis', 'Statistics', 'Data storytelling'],
      upcomingUnits: 2,
      units: [u01, u02, u03],
    },
  ],
};

export default track;
