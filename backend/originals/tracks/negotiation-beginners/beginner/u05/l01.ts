import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: "The budget is tight." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"The budget is tight"',
  summary: 'Review day. Ada makes her ask perfectly: ₦480,000, because her role has grown and the market range supports it. Tobi smiles, and says the sentence she dreaded.',
  minutes: 11,
  outcomes: [
    'See that a first "no" is often not the end',
    'Separate "no" from "not like this" or "not now"',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Review day',
      beats: [
        { speaker: 'narrator', text: 'Tobi praises her work. Ada says: "I\'d like to propose ₦480,000 a month, because my role now includes the design system."' },
        { speaker: 'narrator', text: 'She adds: "Similar roles in Lagos pay ₦400,000 to ₦550,000." Then she stops talking. Five long seconds.' },
        { speaker: 'narrator', text: 'Tobi: "You deserve more, honestly. But the budget is tight this quarter. I can\'t do ₦480,000."' },
        { speaker: 'ada', text: '(inside her head) He said no. Say "OK, no problem" and leave.' },
        { speaker: 'tey', text: 'Wait. He said "this quarter" and "₦480,000". That\'s not "no". That\'s "not like this, not now".' },
        { speaker: 'tey', text: 'This chapter: handling no, conceding well, getting it in writing, asking without backlash, and what happens after the deal.' },
      ],
      choice: {
        prompt: 'What should Ada say next?',
        options: [
          { text: '"Thank you for being honest. Is it the amount, or the timing? What could work this quarter?"', outcome: 'Right. She treats the no as information and keeps the talk open.', best: true },
          { text: '"OK, no problem."', outcome: 'She leaves with nothing, when Tobi just said she deserves more.' },
          { text: '"Then I\'ll take the other job."', outcome: 'A threat, in the first minute. It turns a talk into a standoff.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Listen to the words in a no. "Not this quarter" and "not that much" are invitations to keep talking.',
    },
  ],
  apply: {
    scenario: 'Review day.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What did Tobi\'s "no" actually mean?',
        options: [
          { text: 'Not ₦480,000, and not this quarter' },
          { text: 'Never', why: 'He said she deserves more.' },
          { text: 'Yes', why: 'He said he can\'t do ₦480,000 now.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A real no, or "not like this"?',
        groups: ['Real no', 'Not like this'],
        items: [
          { text: '"The budget is tight this quarter."', group: 1 },
          { text: '"We\'re closing the team."', group: 0 },
          { text: '"I can\'t do that number."', group: 1 },
          { text: '"Pay is fixed by law for this role."', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the words to what they invite.',
        pairs: [
          ['"This quarter"', 'Ask about next quarter'],
          ['"Not ₦480,000"', 'Ask what amount could work'],
          ['"You deserve more"', 'Ask how to get there'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'He said no. I feel stupid for asking.',
        prompt: "Tey's best reply?",
        options: [
          { text: 'He said you deserve more. That\'s not a no to you; it\'s a puzzle about money and timing. Solve it with him.' },
          { text: 'You should feel stupid.', why: 'Asking well is never stupid.' },
          { text: 'Quit today.', why: 'There\'s a deal still to find.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The next question.',
        template: '"Is it the [[1]], or the [[2]]?"',
        blanks: [['amount'], ['timing']],
        distractors: ['weather', 'office'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada asked for ₦480,000. She earns ₦350,000. What rise was that, in naira a month?',
        answers: ['130000', '130,000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why is "Then I\'ll take the other job" a bad move here?',
        options: [
          { text: 'It\'s a threat in the first minute, and it turns a talk into a standoff' },
          { text: 'It\'s always wrong to mention alternatives', why: 'Calm context can be fine; threats aren\'t.' },
          { text: 'It\'s a good move', why: 'Tobi was open; a threat closes him down.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s planned reply gives up too soon?',
        lines: [
          'Thank you for being honest.',
          'Is it the amount, or the timing?',
          'Actually, forget I asked.',
          'What could work this quarter?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'He\'s still open; she shouldn\'t withdraw.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter teaches.',
        lines: ['Handling no', 'Conceding well', 'Getting it in writing', 'Asking without backlash', 'After the deal'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds of silence did Ada hold after her ask?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time you heard "no" and stopped. What did the exact words suggest you could have asked next?',
    starters: ['They said...', 'I could have asked...'],
  },
  deepen: {
    title: 'No is often "not yet"',
    summary: 'In many negotiations the first answer is a starting position. Treat it as information: what exactly is the obstacle, and what would remove it?',
  },
  notes: 'Fictional review: ask ₦480,000 (from ₦350,000); Tobi: budget tight this quarter. Range ₦400,000–₦550,000 (illustrative).',
};

export default lesson;
