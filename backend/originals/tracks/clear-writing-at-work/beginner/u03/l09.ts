import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: plain checklist v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Plain checklist v3',
  summary: 'Zanele adds the point-first checks to her list. Five new lines about asks, subjects and replies. Tap each one.',
  minutes: 11,
  outcomes: [
    'Add point-first checks to your checklist',
    'Link each check to a lesson from this chapter',
    'Use them on a real request',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Zanele\'s plain checklist v3',
      text: 'Checks 1 to 10, plus: 11. Can I finish "I need them to..."? 12. Is the ask in the subject and the first line? 13. BLUF: bottom line, why, cost, next? 14. Is it easy to reply: closed question or options, deadline with reason, attachments? 15. One ask, or numbered asks with the urgent one first?',
      hotspots: [
        { phrase: '"I need them to..."', note: 'Lesson 1: Mrs Achieng\'s question.' },
        { phrase: 'in the subject and the first line', note: 'Lesson 4: a subject that works unopened.' },
        { phrase: 'BLUF', note: 'Lesson 2: bottom line up front.' },
        { phrase: 'easy to reply', note: 'Lesson 6: Emeka\'s template.' },
        { phrase: 'numbered asks with the urgent one first', note: 'Lesson 7: Brian\'s seven questions.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v3 adds: "I need them to...", ask in subject and first line, BLUF, easy replies, one ask.',
    },
  ],
  apply: {
    scenario: 'Plain checklist v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['"I need them to..."', 'What do you want them to do?'],
          ['BLUF', 'Bottom line up front'],
          ['Easy to reply', 'Make responding easy'],
          ['Numbered asks', 'One ask per message'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on v3 in total?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['"I need them to..."', 'Ask in subject and first line', 'BLUF', 'Easy to reply', 'One ask or numbered asks'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s new on v3?',
        options: [
          { text: 'Checks about plain words', why: 'That was v2.' },
          { text: 'Nothing', why: 'v3 adds point-first checks.' },
          { text: 'Checks about asks, subjects and replies' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which version added this check?',
        groups: ['v1 or v2', 'v3'],
        items: [
          { text: 'Phone test', group: 0 },
          { text: 'BLUF', group: 1 },
          { text: 'Doer first', group: 0 },
          { text: 'Easy to reply', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'felix',
        message: 'Fifteen checks? For one email?',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Yes, every email, even "thanks".', why: 'Match effort to stakes.' },
          { text: 'Only for emails that matter. And most checks take a second once they\'re a habit.' },
          { text: 'You\'re right, I\'ll stop.', why: 'It\'s working.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 14.',
        template: 'Closed question or [[1]], deadline with a [[2]], attachments.',
        blanks: [['options'], ['reason']],
        distractors: ['threats', 'joke'],
      },
      {
        kind: 'findBug',
        prompt: 'Which check in this copy of v3 is wrong?',
        lines: [
          'Can I finish "I need them to..."?',
          'Is the ask in the last line, after the background?',
          'BLUF?',
          'Easy to reply?',
        ],
        bug: 1,
        fix: 'Is the ask in the subject and the first line?',
        explanation: 'That\'s the buried ask.',
      },
      {
        kind: 'mcq',
        prompt: 'Which check would have fixed Brian\'s seven-question email?',
        options: [
          { text: 'One ask, or numbered asks with the urgent one first' },
          { text: 'Phone test', why: 'Partly, but numbering is the fix.' },
          { text: 'Plain swaps', why: 'The problem was the asks.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What does the B in BLUF stand for?',
        answers: ['bottom', 'Bottom'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Add point-first checks to your own list. Run them on a request you need to send.',
    starters: ['I changed...'],
  },
  notes: 'Plain checklist v3 (fictional) adds Chapter 3 checks.',
};

export default lesson;
