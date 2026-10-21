import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: hard messages',
  summary: 'Bad news, a clear no, and feedback about the work. A quick check before Zanele tries AI for her edits.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write bad news and a clear no', 'Write specific feedback'],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday',
      beats: [
        { speaker: 'zanele', text: 'Mr Kamau replied in one line: "Thanks for telling me early. Keep me posted."' },
        { speaker: 'achieng', text: 'That\'s what early news buys you. Now, Brian\'s reply?' },
        { speaker: 'zanele', text: '"14 July works." And Felix sent a fixed export with no blanks.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: hard messages.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a bad-news email.',
        lines: ['The news', 'The cause', 'What it means', 'What you\'re doing', 'When they\'ll hear next'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Mr Kamau reply?',
        options: [
          { text: '"Thanks for telling me early. Keep me posted."' },
          { text: '"Why didn\'t you tell me sooner?"', why: 'She told him the same day.' },
          { text: '"Cancel the rollout."', why: 'He thanked her.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill is this?',
        groups: ['Saying no', 'Feedback'],
        items: [
          { text: '"I can\'t start this Friday."', group: 0 },
          { text: '"14 orders had no date."', group: 1 },
          { text: '"What I can do instead is..."', group: 0 },
          { text: '"Could you filter for blanks?"', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About what fraction of feedback made performance worse in Kluger and DeNisi\'s review? (Type a word, like "half".)',
        answers: ['a third', 'third', 'one third', '1/3'],
        placeholder: 'A fraction',
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'My manager wants me on a second project. I said "I\'ll try".',
        prompt: "Zanele\'s best reply?",
        options: [
          { text: 'If you can\'t, say so: the no, one reason, what you can do instead, and a question. "I\'ll try" sounds like yes.' },
          { text: '"I\'ll try" is perfect.', why: 'It sounds like yes.' },
          { text: 'Ignore the request.', why: 'Answer it clearly.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Feedback rule.',
        template: 'About the [[1]], never the [[2]].',
        blanks: [['work', 'task'], ['person']],
        distractors: ['weather', 'budget'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the message to its first line.',
        pairs: [
          ['Bad news', '"Week 9: late deliveries rose to 28%"'],
          ['Saying no', '"I can\'t start the dashboards this Friday"'],
          ['Feedback', '"14 orders in Monday\'s export had no date"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens a bad-news email?',
        lines: [
          'Late deliveries rose to 28% in week 9.',
          'Two drivers left for a courier firm.',
          'I am so, so sorry, I feel terrible, this is all my fault...',
          'I\'ll send week 10 next Tuesday.',
        ],
        bug: 2,
        fix: 'One line owning it, then the plan.',
        explanation: 'A long apology makes it about the writer.',
      },
      {
        kind: 'mcq',
        prompt: 'What is the "MUM effect"?',
        options: [
          { text: 'Our reluctance to pass on bad news' },
          { text: 'Writing to your mother', why: 'It\'s about bad news.' },
          { text: 'Staying silent in meetings', why: 'It\'s about bad news.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What date did Brian accept for the weekly summary? (e.g. 3 March)',
        answers: ['14 July', 'July 14', '14 july', 'july 14', '14/7'],
        placeholder: 'A date',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the three is hardest for you: bad news, saying no, or feedback? Why?',
    starters: ['Hardest for me is...'],
  },
  notes: 'Checkpoint for Chapter 5 lessons 1-4.',
};

export default lesson;
