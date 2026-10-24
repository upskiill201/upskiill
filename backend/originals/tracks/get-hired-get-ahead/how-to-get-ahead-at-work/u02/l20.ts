import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 20 — Chapter Challenge: the six-month salary review approaches. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: worth more',
  summary: 'Month six is close: the salary review Clinton negotiated, after probation. He sends Ngozi his one-page summary. Her reply: "This is exactly the kind of record promotions are built on. Let\'s talk next week." Everything from this chapter.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole value toolkit together', 'Show impact on one page', 'Finish your impact record'],
  learn: [
    {
      kind: 'story',
      title: 'The reply',
      beats: [
        { speaker: 'narrator', text: 'End of month five. Clinton sends Ngozi his one-page summary: results by goal, the payout fix, Kemi, and what he wants next.' },
        { speaker: 'ngozi', text: 'This is exactly the kind of record promotions are built on. Your probation review is next week. Let\'s talk properly then.' },
        { speaker: 'clinton', text: '(to himself) Promotion? Already? Should I ask for it?' },
        { speaker: 'tey', text: 'That\'s next chapter. First, let\'s put this one together.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your career-growth kit so far',
      steps: [
        { title: 'Piece 1', body: 'A first-90-days kit.' },
        { title: 'Piece 2 (this chapter)', body: 'An impact record.' },
        { title: 'Next chapter: The promotion conversation', body: 'Month six. Clinton asks for a promotion, and hears two words he didn\'t want: "not yet".' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: worth more.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Why did Ngozi call Clinton\'s summary promotion material?',
        options: [
          { text: 'It was long', why: 'It was one page.' },
          { text: 'Results tied to goals, value beyond his team, and a clear next step' },
          { text: 'He worked late', why: 'Hours weren\'t in it.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s chapter in order.',
        lines: ['Couldn\'t answer "What did that change?"', 'Found the team\'s goals', 'Protected focus time and said "not now"', 'Fixed the problem nobody owned', 'Sent a one-page summary'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Clinton\'s approach, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'Focus blocks for Goal 1', group: 0 },
          { text: 'Saying yes to everything', group: 1 },
          { text: 'Sharing results usefully', group: 0 },
          { text: 'Fixing things secretly', group: 1 },
          { text: 'Onboarding Kemi', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the activity-only line.',
        lines: ['Failed confirmations 8% to 5%.', 'Attended lots of meetings.', 'Payout report fixed with finance.'],
        bug: 1,
        explanation: 'Activity, not impact.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to the product manager\'s new request.',
        from: 'clinton',
        message: 'Another team asks for a "quick" feature not on our goals. What do I say?',
        options: [
          { text: '"Sure!" (then works midnight)', why: 'Kind "not now" with an alternative.' },
          { text: '"No."', why: 'Kind and helpful.' },
          { text: '"Sounds useful. We\'re focused on our Q3 goals, but I can show your team where the data is. Want 20 minutes?"' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['Eleven tasks, no answer', 'Busy isn\'t valuable'],
          ['The Monday payout report', 'Own the problem nobody owns'],
          ['Midnight in month five', 'Renegotiate priorities'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which kind of value was onboarding Kemi?',
        options: [
          { text: 'Making others better' },
          { text: 'Rare skills', why: 'Making others better.' },
          { text: 'None', why: 'Making others better is real value.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Goal-tied work gets noticed', group: 0 },
          { text: 'Good work speaks for itself', group: 1 },
          { text: 'You can lead without a title', group: 0 },
          { text: 'Helping others is a distraction', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter rules.',
        template: 'Know the [[1]]. Make results [[2]]. Own what nobody [[3]].',
        blanks: [['goals'], ['visible'], ['owns']],
        distractors: ['gossip', 'secret', 'wants'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which month is Clinton\'s probation review? Month ___ (a number)',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What always breaks a focus block?',
        options: [
          { text: 'A meeting invite', why: 'Can wait.' },
          { text: 'A newsletter', why: 'Can wait.' },
          { text: 'A real production problem' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Five months in. What does "valuable" mean to you now?',
        options: [
          { text: 'Being the busiest.', why: 'Busy isn\'t valuable.' },
          { text: 'Moving the goals that matter, being reliable, making others better, and saying so clearly.' },
          { text: 'Never saying no.', why: 'A kind "not now" adds value.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Look at your impact record. If you had a review next week, what would you say you want next?',
    starters: ['I want to...', 'Because...'],
  },
  deepen: {
    title: 'Your kit, piece 2',
    summary: 'Finish your impact record and send a monthly summary to your manager, teacher or mentor. End with what you want next.',
  },
  notes: 'Chapter Challenge. Ngozi (CastId ngozi) speaks. The probation/salary review after six months was negotiated in How to Get Hired, Ch5.',
};

export default lesson;
