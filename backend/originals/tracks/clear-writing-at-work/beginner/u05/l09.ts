import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: plain checklist v5. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Plain checklist v5',
  summary: 'The last five checks, for hard messages and the final edit. Zanele\'s checklist is complete: 25 checks. Tap each new one.',
  minutes: 11,
  outcomes: [
    'Add hard-message checks to your checklist',
    'Link each check to a lesson from this chapter',
    'Use the full checklist on a real message',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Zanele\'s plain checklist v5',
      text: 'Checks 1 to 20, plus: 21. Bad news: is it early, first, with a plan and a next update? 22. Saying no: is the no in plain words, with an alternative? 23. Feedback: what I saw, what it caused, what would help? 24. If AI helped, have I checked every fact and kept private data out? 25. Final check: read aloud, read as them, facts, recipients, and am I calm?',
      hotspots: [
        { phrase: 'Bad news', note: 'Lessons 1 and 2: week 9 and the five steps.' },
        { phrase: 'the no in plain words', note: 'Lesson 3: saying no to Brian.' },
        { phrase: 'what I saw, what it caused', note: 'Lesson 4: feedback to Felix.' },
        { phrase: 'If AI helped', note: 'Lesson 6: Noy and Zhang, and three rules.' },
        { phrase: 'am I calm', note: 'Lesson 7: wait until morning.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v5 adds: bad news early, a clear no, specific feedback, checked AI edits, and the final check.',
    },
  ],
  apply: {
    scenario: 'Plain checklist v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['Bad news early', 'Week 9'],
          ['A clear no', 'Saying no to Brian'],
          ['Saw, caused, would help', 'Feedback to Felix'],
          ['Read aloud, read as them', 'The final check'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on the finished list?',
        answers: ['25', 'twenty-five', 'twenty five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['Bad news', 'Saying no', 'Feedback', 'AI edits', 'Final check'],
      },
      {
        kind: 'mcq',
        prompt: 'Which check is new on v5?',
        options: [
          { text: 'If AI helped, have I checked every fact?' },
          { text: 'Do the headings tell the story?', why: 'That was v4.' },
          { text: 'Is the ask in the subject line?', why: 'That was v3.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes v5 or fails it?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Bad news sent the same day, with a plan', group: 0 },
          { text: '"I\'ll try" when you mean no', group: 1 },
          { text: 'AI-edited email with every number checked', group: 0 },
          { text: 'Feedback that says "be more careful"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Twenty-five checks for every email? That\'ll take all day.',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'Most take seconds, and you only need the ones that fit. Hard messages get the full list; a quick yes needs three.' },
          { text: 'Yes, every check on every email.', why: 'Match the checks to the message.' },
          { text: 'Skip the list entirely.', why: 'It catches real mistakes.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 23.',
        template: 'What I [[1]], what it [[2]], what would help.',
        blanks: [['saw'], ['caused']],
        distractors: ['wanted', 'cost'],
      },
      {
        kind: 'findBug',
        prompt: 'Felix\'s message fails which check?',
        lines: [
          'Subject: Van 4 is off the road until Friday',
          'The gearbox failed on Tuesday\'s route.',
          'Orders move to vans 2 and 5 until then.',
          'Honestly, whoever drove it last really wrecked it.',
        ],
        bug: 3,
        fix: 'Delete it.',
        explanation: 'Blame fails check 21 and the final check: it adds heat, no information.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check number covers AI edits?',
        answers: ['24', 'twenty-four', 'twenty four'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does check 25 ask last?',
        options: [
          { text: 'Am I calm?' },
          { text: 'Is it long enough?', why: 'It asks if you\'re calm.' },
          { text: 'Did AI write it?', why: 'That\'s check 24.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Print or save the full 25 checks. Which five will you use most?',
    starters: ['My five are...'],
  },
  deepen: {
    title: 'A checklist you outgrow',
    summary: 'Checklists help most while habits form. After a few months, many checks happen without thinking, and the list is there for the hard days.',
  },
  notes: 'Plain checklist v5 (checks 21 to 25), complete list of 25.',
};

export default lesson;
