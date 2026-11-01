import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: interview card v5, the complete card. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Interview card v5',
  summary: 'The finished interview card: everything Remi learned in five weeks, on one page he can reuse for every interview. Tap each section.',
  minutes: 11,
  outcomes: [
    'Read a complete interview preparation card',
    'Link each section to a chapter of this course',
    'Finish your own card',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Remi\'s interview card v5',
      text: 'Open: present, past, future in about a minute. Research: product, ad, company, interviewer, then why us. Stories: six in STAR, real numbers, "I" for my actions. Hard questions: think out loud, a real weakness, a salary range, calm redirects. Final round: "I\'m excited", help the group, clarify jargon, ask about success. After: thank-you the same day, check offers in writing, ask for feedback on a no.',
      hotspots: [
        { phrase: 'present, past, future', note: 'Chapter 1: from four minutes to one.' },
        { phrase: 'then why us', note: 'Chapter 2: Wanjiru\'s smile.' },
        { phrase: 'six in STAR', note: 'Chapter 3: the story bank.' },
        { phrase: 'think out loud', note: 'Chapter 4: the duplicate-orders problem.' },
        { phrase: 'help the group', note: 'Chapter 5: bringing Zanele in.' },
        { phrase: 'ask for feedback on a no', note: 'Savanna Bank\'s feedback fixed his next interview.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Open well, research, tell true stories, handle hard questions, shine in the final round, follow up.',
    },
  ],
  apply: {
    scenario: 'Interview card v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the section to the chapter.',
        pairs: [
          ['Open', 'Tell me about yourself'],
          ['Research', 'Do your homework'],
          ['Stories', 'Your story bank'],
          ['Hard questions', 'The hard questions'],
          ['Final round and after', 'The final round'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the sections of the card.',
        lines: ['Open', 'Research', 'Stories', 'Hard questions', 'Final round', 'After'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v5?',
        options: [
          { text: 'The story bank', why: 'That was v3.' },
          { text: 'The final round and after-the-interview sections' },
          { text: 'Nothing', why: 'v5 completes it.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section is this?',
        groups: ['Stories', 'Final round', 'After'],
        items: [
          { text: 'Real numbers only', group: 0 },
          { text: 'Clarify jargon', group: 1 },
          { text: 'Thank-you the same day', group: 2 },
          { text: 'Help the group', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Will I need this card again after the internship?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No, throw it away.', why: 'It\'s reusable.' },
          { text: 'Only for internships.', why: 'It works for any job.' },
          { text: 'Every interview, for the rest of your career. Just update the stories and the research.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The final round.',
        template: '"I\'m [[1]]", help the [[2]], clarify jargon.',
        blanks: [['excited'], ['group']],
        distractors: ['calm', 'boss'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many stories are in the story bank?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this copy of v5 is wrong?',
        lines: [
          'Open: about a minute.',
          'Stories: STAR, real numbers.',
          'Hard questions: say "anything is fine" for salary.',
          'After: thank-you the same day.',
        ],
        bug: 2,
        fix: 'Hard questions: a researched salary range.',
        explanation: 'That was the round-two mistake.',
      },
      {
        kind: 'mcq',
        prompt: 'Which section would have saved the Savanna Bank interview?',
        options: [
          { text: 'Open: present, past, future in a minute' },
          { text: 'Final round', why: 'It was a phone screen.' },
          { text: 'Salary', why: 'The problem was the opening.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section is this?',
        groups: ['Research', 'Hard questions'],
        items: [
          { text: 'Use the product', group: 0 },
          { text: 'A real weakness', group: 1 },
          { text: 'Look up the interviewer', group: 0 },
          { text: 'Calm redirects', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Finish your own interview card v5 for a job you want.',
    starters: ['Open:...', 'Stories:...'],
  },
  notes: 'Interview card v5 (fictional) summarises the course.',
};

export default lesson;
