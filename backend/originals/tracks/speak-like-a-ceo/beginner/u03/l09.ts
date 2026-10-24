import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 9. Tap to explore: talk card v3. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Talk card v3',
  summary: 'Lucía adds five checks for building a talk. Tap each one.',
  minutes: 11,
  outcomes: [
    'Add talk-building checks to your card',
    'Link each check to a lesson',
    'Use them to build your next talk',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Lucía\'s talk card v3',
      text: 'Checks 1 to 10, plus: 11. One message, short enough to repeat at dinner? 12. Each slide: one idea, a title that says the point, nothing to read aloud? 13. Open with a moment, close with the message and one action? 14. A signpost at every change of part? 15. Each big number paired with a story or picture?',
      hotspots: [
        { phrase: 'One message', note: 'Lessons 1 and 2: 42 slides, and finding the message.' },
        { phrase: 'nothing to read aloud', note: 'Lessons 3 and 4: Mayer\'s principles.' },
        { phrase: 'Open with a moment', note: 'Lesson 6: structure.' },
        { phrase: 'A signpost', note: 'Lesson 6: signposts.' },
        { phrase: 'paired with a story', note: 'Lesson 7: a story and a number.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'v3 adds: one message, slides that help, open and close, signposts, story with number.',
    },
  ],
  apply: {
    scenario: 'Talk card v3.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the check to the lesson.',
        pairs: [
          ['One message', 'Find your one message'],
          ['Nothing to read aloud', 'Slides that help'],
          ['Signposts', 'Structure and signposts'],
          ['Story with number', 'A story and a number'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many checks are on talk card v3 in total?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the new checks as written.',
        lines: ['One message', 'Slides that help', 'Open and close', 'Signposts', 'Story with number'],
      },
      {
        kind: 'mcq',
        prompt: 'Which check is new on v3?',
        options: [
          { text: 'Is it a recommendation?', why: 'That was v2.' },
          { text: 'A signpost at every change of part?' },
          { text: 'Pause instead of um', why: 'That was v1.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Passes v3 or fails?',
        groups: ['Passes', 'Fails'],
        items: [
          { text: 'Slide title: "38% above target"', group: 0 },
          { text: 'Slide title: "Sales"', group: 1 },
          { text: 'Doña Rosa, then 140 of 200', group: 0 },
          { text: 'A slide of 20 numbers', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'I\'ve got a ten-minute training talk on Friday. Which check first?',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'Check 11. Write your one message before you open the slides. Everything else follows from it.' },
          { text: 'Check 12, the slides, first.', why: 'Message first.' },
          { text: 'None, just start talking.', why: 'Message first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Check 13.',
        template: 'Open with a [[1]], close with the message and one [[2]].',
        blanks: [['moment'], ['action']],
        distractors: ['apology', 'agenda'],
      },
      {
        kind: 'findBug',
        prompt: 'Marta\'s talk plan fails which check?',
        lines: [
          'Message: "The new process saves you an hour a week."',
          'Open: a story about Friday\'s late orders.',
          'Middle: three parts, no links between them.',
          'Close: the message and "try it Monday".',
        ],
        bug: 2,
        fix: 'Add signposts: "That\'s step one. Step two..."',
        explanation: 'Check 14: signposts between parts.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which check number is about stories and numbers?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What does check 12 ask of each slide?',
        options: [
          { text: 'At least six bullets', why: 'One idea, no reading aloud.' },
          { text: 'One idea, a title that says the point, nothing to read aloud' },
          { text: 'A funny picture', why: 'One idea, a point title.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Use checks 11 to 15 to plan a short talk on something you know well.',
    starters: ['Message:...', 'Open:...'],
  },
  deepen: {
    title: 'Build, then rehearse',
    summary: 'A well-built talk is easier to rehearse: you remember a shape, not a script. Chapter 4 is about how it sounds and looks when you deliver it.',
  },
  notes: 'Talk card v3 (checks 11 to 15).',
};

export default lesson;
