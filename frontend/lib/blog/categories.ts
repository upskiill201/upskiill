import type { Category } from './types';

// Category registry — each entry is a landing page at /blog/category/[slug]
// targeting a broader head term, while individual posts rank for long-tail.
// Accent colors come from the Teyro brand palette (docs/08-color-system.md);
// the blue tracks the shipped product blue (--color-brand), like the homepage.

const tey = (pose: string) => `/User onbarding Assets/tey/${pose}.webp`;

export const CATEGORIES: Category[] = [
  {
    slug: 'study-techniques',
    name: 'Study Techniques',
    shortLabel: 'Study',
    description:
      'Evidence-based study methods — active recall, spaced repetition, note-taking and more.',
    seoIntro:
      'Stop re-reading and start remembering. This collection covers the study techniques with the strongest evidence behind them — active recall, spaced repetition, interleaving and the Feynman technique — explained in plain language so you can apply them to your next study session today.',
    accentColor: '#0172FD',
    mascots: [tey('thinking'), tey('searching'), tey('tablet')],
  },
  {
    slug: 'language-learning',
    name: 'Language Learning',
    shortLabel: 'Languages',
    description: 'Practical strategies for learning a new language and actually sticking with it.',
    seoIntro:
      'Learning a language is a marathon of small daily wins. These guides break down vocabulary retention, listening practice and habit design so you can make real progress in minutes a day — not hours you will never get back.',
    accentColor: '#22C55E',
    mascots: [tey('waving'), tey('welcome'), tey('cheering')],
  },
  {
    slug: 'productivity-focus',
    name: 'Productivity & Focus',
    shortLabel: 'Focus',
    description:
      'Habits, consistency and time management for people who are learning alongside a busy life.',
    seoIntro:
      'Most people do not fail at learning because the material is hard — they fail because life gets in the way. These guides cover streaks, habit stacking, deep focus and realistic scheduling designed for learners with jobs, families and limited willpower.',
    accentColor: '#F59E0B',
    mascots: [tey('clock'), tey('flame'), tey('bell')],
  },
  {
    slug: 'ai-learning',
    name: 'AI & Learning',
    shortLabel: 'AI',
    description: 'How AI-personalized learning works, and how to use it to learn faster.',
    seoIntro:
      'AI is changing how people learn — from personalized lesson paths to instant feedback. These guides explain what AI-powered learning actually does well, where it falls short, and how to combine it with proven learning science.',
    accentColor: '#6352FF',
    mascots: [tey('tablet'), tey('thinking'), tey('pointing')],
  },
  {
    slug: 'exam-prep',
    name: 'Exams & Test Prep',
    shortLabel: 'Exams',
    description: 'Study plans, memory strategies and exam-day tactics for high-stakes tests.',
    seoIntro:
      'High-stakes exams reward strategy as much as knowledge. From revision timetables to practice testing and managing exam-day nerves, these guides help you walk into the test room prepared — and calm.',
    accentColor: '#EF4444',
    mascots: [tey('badge'), tey('clock'), tey('cheering')],
  },
  {
    slug: 'skill-building',
    name: 'Skill Building & Careers',
    shortLabel: 'Skills',
    description: 'Project-based learning, portfolios and job-ready skills that actually get hired.',
    seoIntro:
      'Courses get you knowledge; projects get you hired. These guides cover deliberate practice, building a portfolio that stands out, and turning online learning into real career momentum.',
    accentColor: '#9333EA',
    mascots: [tey('pointing'), tey('podium'), tey('badge')],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryOrThrow(slug: string): Category {
  const category = getCategory(slug);
  if (!category) {
    throw new Error(`Unknown blog category "${slug}" — add it to lib/blog/categories.ts`);
  }
  return category;
}
