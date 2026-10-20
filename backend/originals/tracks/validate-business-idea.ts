import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './validate-business-idea/beginner/u01';
import u02 from './validate-business-idea/beginner/u02';
import u03 from './validate-business-idea/beginner/u03';
import u04 from './validate-business-idea/beginner/u04';
import u05 from './validate-business-idea/beginner/u05';

/**
 * How to Validate a Business Idea — storyline "Clinton's Big Idea".
 * A SHORT Original (founder, 2026-10-20): one level, 5 chapters × 10 lessons.
 * Course 1 of 3 in the Business set (then pricing, then profit and cash flow).
 * Clinton, a first-year student in Buea, wants to launch CampusEats; customer
 * interviews uncover the real problem (laundry in the rainy season) and he
 * tests WashDay by hand before building anything. David is the sceptic who
 * asks "how many?"; Miracle mentors by voice note from Lagos. Outline and
 * research: docs/originals/validate-a-business-idea-outline.md.
 */
const track: OriginalTrackDef = {
  slug: 'validate-a-business-idea',
  title: 'How to Validate a Business Idea',
  category: 'Business',
  format: 'short',
  description:
    'Find out if people will pay before you spend money building it: talk to customers the right way, size the market, run cheap tests and decide with evidence.',
  levels: [
    {
      level: 1,
      slug: 'how-to-validate-a-business-idea',
      title: 'How to Validate a Business Idea',
      subtitle: "Clinton's Big Idea: find out if people will pay before you build",
      shortDescription:
        'Most new businesses fail because nobody needed what they built. Learn to test an idea in days, for almost nothing: real customer conversations, simple market sums, cheap tests and an honest decision.',
      description:
        "Clinton, a first-year student in Buea, has a business idea: CampusEats, food delivery for students. Forty people in his group chats call it genius. Not one has asked how to order. Follow Clinton as he learns to test an idea the way successful founders do: asking about what people already do instead of what they say they'd do, sizing the market with simple sums, checking the competition, and running small tests with real money before building anything. Along the way he discovers the problem students actually have, and it isn't food. Bring an idea of your own: every lesson helps you test it. No business experience needed.",
      startingPoint:
        'You have a business idea, a side-hustle in mind, or you want to understand how new businesses are tested. No experience or money needed.',
      endOutcome:
        'Test any business idea with real evidence (conversations, numbers and small paid tests) and decide whether to go ahead, change it or stop.',
      outcomes: [
        'Turn an idea into a list of assumptions and find the riskiest',
        'Interview customers without leading them or fishing for compliments',
        'Size a market with simple bottom-up sums and map your real competitors',
        'Run cheap tests that measure what people do, not what they say',
        'Decide to go ahead, change or stop, with evidence',
      ],
      skills: ['Idea validation', 'Customer interviews', 'Market research', 'Competitor analysis', 'MVP testing', 'Entrepreneurship'],
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
  ],
};

export default track;
