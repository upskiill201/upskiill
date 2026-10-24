import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './ai-everyday-productivity/beginner/u01';
import u02 from './ai-everyday-productivity/beginner/u02';
import u03 from './ai-everyday-productivity/beginner/u03';
import u04 from './ai-everyday-productivity/beginner/u04';
import u05 from './ai-everyday-productivity/beginner/u05';

/**
 * AI Tools for Everyday Productivity — storyline "Lucía's Impossible Month".
 * A SHORT Original (5 chapters × 10 lessons) in the AI set. Lucía (Mexico
 * City, marketing lead at Nopal) has thirty days to throw her parents' 35th
 * anniversary in Oaxaca, find a new flat, learn enough Portuguese to open a
 * São Paulo meeting, and do her job. Ada coaches her by voice note; Marta is
 * the sceptic, Tomás trusts AI too much, Sofía checks sources, Carmen sets
 * the deadline. Device: Lucía's prompt cards, v1–v5.
 *
 * Practice: every chapter has Prompt Lab cards (a practice AI, no real AI
 * calls: Phase One guard) and every Deepen is a real task to try in the
 * learner's own tool. Tool-neutral: no products named.
 *
 * Running cast: Lucía, Ada, Marta, Tomás, Sofía, Carmen (CastIds); Mamá
 * (Rosa), Papá (Ernesto), Mateo, Doña Lupe, Señor Ibarra (narrated).
 * Outline: docs/originals/ai-everyday-productivity-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'ai-tools-for-everyday-productivity',
  title: 'AI Tools for Everyday Productivity',
  category: 'AI',
  format: 'short',
  description:
    'Use AI chat tools for research, writing, studying, planning and problem-solving in everyday life: better prompts, checked facts, your own voice, and the judgement to know when not to use them.',
  levels: [
    {
      level: 1,
      slug: 'ai-tools-for-everyday-productivity',
      title: 'AI Tools for Everyday Productivity',
      thumbnailUrl: '/originals/ai-tools-for-everyday-productivity.jpg',
      subtitle: "Lucía's Impossible Month: thirty days, four big jobs, one AI assistant",
      shortDescription:
        'Most people try an AI tool once, get a vague answer and give up. Learn the prompt recipe, research and check facts, write in your own voice, study with AI as a tutor, and plan your way out of a week where everything breaks.',
      description:
        "It's Sunday night in Mexico City and Lucía has written four things on the fridge: her parents' 35th anniversary party in Oaxaca (she volunteered), a new flat (her landlord is selling), Portuguese (her boss wants her to open a meeting in São Paulo), and her actual job. Thirty days. Her first AI answer says absolutely nothing. Over the month she learns to get useful answers, compare flats without believing every number, write a complaint that gets a refund and a speech that makes her dad cry, study a language with AI as a tutor instead of a crutch, and rescue a party when the venue is double-booked. Practise every skill in the Prompt Lab, then try it on your own life the same day.",
      startingPoint: "You can use a phone or a computer. You don't need to have used an AI tool before.",
      endOutcome: 'Use AI tools to complete real tasks (research, writing, studying, planning and problem-solving) more effectively, and know when not to trust them.',
      outcomes: [
        'Get a useful first answer from any AI chat tool with a simple prompt recipe',
        'Research, compare and summarise with AI, and check what it tells you',
        'Write and edit messages, emails and speeches with AI in your own voice',
        'Study with AI as a tutor that quizzes you instead of doing the thinking',
        'Plan, decide and solve everyday problems with AI, and know when not to use it',
      ],
      skills: ['AI tools', 'Prompting', 'Productivity', 'Research', 'Writing', 'Planning'],
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
