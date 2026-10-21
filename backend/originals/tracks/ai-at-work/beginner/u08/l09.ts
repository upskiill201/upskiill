import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 8 · Lesson 9 — prompting for images. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Prompting for images',
  summary: '"A market" gives you something generic. Five parts of an image prompt give you the cover Ada actually pictured.',
  minutes: 12,
  outcomes: [
    'Write a five-part image prompt',
    'Match the image to the deck\'s style',
    'Steer with small changes, not new prompts',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five parts of an image prompt',
      steps: [
        { title: '1. Subject', body: '"A small fabric stall in an Accra market, a shop owner holding a phone."' },
        { title: '2. Style', body: '"Flat illustration, simple shapes" or "warm documentary photo style". Match your deck.' },
        { title: '3. Mood and light', body: '"Bright morning light, busy but calm."' },
        { title: '4. Composition', body: '"Wide shot, lots of empty space on the left for a title."' },
        { title: '5. What to leave out', body: '"No text, no logos, no brand names."' },
        { title: 'Then steer', body: 'Change one thing at a time: "Same image, warmer colours." Don\'t start over each time.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Subject, style, mood, composition, what to leave out. Then change one thing at a time.',
    },
  ],
  apply: {
    scenario: 'Ada prompts for the deck cover.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five parts.',
        lines: ['Subject', 'Style', 'Mood and light', 'Composition', 'What to leave out'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt gets the best cover image?',
        options: [
          { text: 'A market.', why: 'Generic result.' },
          { text: 'A small fabric stall in an Accra market, owner holding a phone. Flat illustration. Bright morning light. Wide shot with space on the left for a title. No text or logos.' },
          { text: 'The best picture ever.', why: 'No detail.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the prompt part to Ada\'s words.',
        pairs: [
          ['Subject', 'A fabric stall, owner with a phone'],
          ['Style', 'Flat illustration'],
          ['Composition', 'Space on the left for a title'],
          ['Leave out', 'No text or logos'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Steering change, or starting over?',
        groups: ['Steer', 'Start over'],
        items: [
          { text: 'Same image, warmer colours', group: 0 },
          { text: 'Something totally different', group: 1 },
          { text: 'Same, but move the stall right', group: 0 },
          { text: 'Forget all that, try again', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The cover looks too cartoonish next to your clean charts.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'Good point. I\'ll ask for "same scene, simple flat style with our two brand colours" so it matches.' },
          { text: 'I\'ll start a brand-new prompt.', why: 'Steer instead.' },
          { text: 'Covers don\'t matter.', why: 'They set the tone.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Change [[1]] thing at a time. Don\'t [[2]] over.',
        blanks: [['one'], ['start']],
        distractors: ['every', 'give'],
      },
      {
        kind: 'findBug',
        prompt: 'Which part of Ada\'s prompt will likely cause problems?',
        lines: [
          'A fabric stall in an Accra market',
          'Flat illustration, bright morning',
          'With our company logo on the stall sign',
          'Space on the left for a title',
        ],
        bug: 2,
        fix: 'No text or logos; add the logo in the slide tool.',
        explanation: 'Image tools often garble logos and text.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the "leave out" part.',
        tiles: ['No', 'text,', 'no', 'logos'],
        distractors: ['more'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many parts does an image prompt have?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the prompt is this?',
        groups: ['Style', 'Composition'],
        items: [
          { text: 'Warm documentary photo', group: 0 },
          { text: 'Wide shot', group: 1 },
          { text: 'Flat illustration', group: 0 },
          { text: 'Subject on the right', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why leave space on the left?',
        options: [
          { text: 'So the slide title fits without covering the subject' },
          { text: 'It looks artistic', why: 'It\'s for the title.' },
          { text: 'No reason', why: 'It\'s practical.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why match the image style to the deck?',
        options: [
          { text: 'Mixed styles look messy and distract from the message' },
          { text: 'Rules require it', why: 'It\'s about consistency.' },
          { text: 'It doesn\'t matter', why: 'Consistency helps.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write a five-part image prompt for a cover for your next presentation.',
    starters: ['Subject:', 'Leave out:'],
  },
  deepen: { title: 'Try it today', summary: 'Try one five-part image prompt, then steer it twice with single changes.' },
  notes: 'General image-prompting practice; works with most image tools.',
};

export default lesson;
