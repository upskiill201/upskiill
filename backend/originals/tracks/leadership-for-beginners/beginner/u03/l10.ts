import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10 — Chapter Challenge: the kick-off, and Carmen's surprise new priority. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the kick-off',
  summary: 'Day 55. The launch kick-off is going perfectly, until Carmen walks in. "Great news! The CEO wants a TikTok challenge for chili-lime too. Same launch date." Five faces turn to Lucía, again.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 3 tool in one live moment',
    'Handle a new priority without breaking the plan',
    'Say "yes, if" to your boss instead of "yes" or "no"',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 55, 11:02 a.m. The kick-off.',
      beats: [
        { speaker: 'carmen', text: 'Sorry to interrupt! Great news: the CEO loves chili-lime. She wants a TikTok challenge too. Same launch date. You can do that, right?' },
        { speaker: 'narrator', text: 'Marta\'s pen stops. Tomás looks at the one-pager on the screen. Twenty-two days to launch. Nothing on that page has room for a TikTok challenge.' },
        { speaker: 'diego', text: '(under his breath) And there it is.' },
        { speaker: 'narrator', text: 'Old Lucía would say "yes, of course" and stay up until 2 a.m. for three weeks. You\'re with Lucía.' },
      ],
    },
  ],
  apply: {
    scenario: 'The kick-off, 11:02 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s Lucía\'s best first response to Carmen?',
        options: [
          { text: '"Love that she\'s excited. Can I come back to you by 3 p.m. with what it would take?"' },
          { text: '"Yes, of course!"', why: 'A promise made before asking the team. Chapter 2\'s mistake again.' },
          { text: '"No, we\'re too busy."', why: 'A flat no to your boss, in front of the team, with no options.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool helps with Carmen\'s request?',
        groups: ['Priorities', 'Decisions', 'Expectations'],
        items: [
          { text: 'What would we pause to make room?', group: 0 },
          { text: 'Is the launch date a one-way door?', group: 1 },
          { text: 'What does "a TikTok challenge" look like, done?', group: 2 },
          { text: 'Rank it against the launch email', group: 0 },
          { text: 'Who decides the trade-off: Carmen', group: 1 },
          { text: 'Who would own it, by when?', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'carmen',
        message: 'So, can you do it or not?',
        prompt: 'Lucía\'s best answer (at 3 p.m.)?',
        options: [
          { text: 'We\'ll try our best!', why: '"Do your best" isn\'t a plan.' },
          { text: 'Ask Diego, he\'s been here longest.', why: 'It\'s her team. She owns the answer.' },
          { text: 'Yes, if we pause the launch email extras and push the challenge to July 1. Or: launch date stays, no challenge. Your call.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Instead of "yes" or "no", Lucía says "yes, ___". (one word)',
        answers: ['if', 'If'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Lucía\'s response in order.',
        lines: ['Thank Carmen, ask for until 3 p.m.', 'Ask the team what it would take', 'Offer options with trade-offs', 'Update the one-pager'],
      },
      {
        kind: 'mcq',
        prompt: 'Why give Carmen options instead of one answer?',
        options: [
          { text: 'To avoid deciding anything', why: 'Lucía decides what to recommend. Carmen decides priorities.' },
          { text: 'To confuse her', why: 'Clear options do the opposite.' },
          { text: 'The trade-off is her call to make, with clear information' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s 3 p.m. message to Carmen. Which line sets the team up to fail?',
        lines: [
          'Option A: TikTok challenge on July 1, launch stays June 17.',
          'Option B: launch June 17, no challenge this round.',
          'Option C: both on June 17, and the team works weekends.',
        ],
        bug: 2,
        fix: 'My recommendation: Option A. The challenge works better once the bags are in shops.',
        explanation: 'Offering the team\'s weekends as an option makes it the one bosses pick.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Which chapter?',
        pairs: [
          ['Thank people for bad news', 'Chapter 2'],
          ['Yes, if', 'Chapter 3'],
          ['Leading your friend', 'Chapter 1'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Carmen picks Option A. What should Lucía do next?',
        options: [
          { text: 'Do the TikTok challenge herself to protect the team', why: 'Chapter 1\'s trap.' },
          { text: 'Update the one-pager: new owner, new date, and tell the team what changed and why' },
          { text: 'Nothing, it\'s July', why: 'Unwritten changes cause the Day 45 confusion again.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 3, in one line.',
        template: 'One clear [[1]]. One [[2]] per piece. Every new yes needs a [[3]].',
        blanks: [['goal', 'direction'], ['owner'], ['no', 'trade-off']],
        distractors: ['wish', 'weekend'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Lucía\'s answer to Carmen.',
        tiles: ['Yes,', 'if', 'we', 'move', 'it', 'to', 'July.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone added work to your plate without taking anything off. What would a "yes, if" answer have sounded like?',
    starters: ['They asked me to...', 'Yes, if...'],
  },
  deepen: {
    title: 'Next: Day 70',
    summary: 'The plan holds. Then, in the Day 70 review, Diego says something about Sofía\'s campaign idea in front of everyone. Everyone laughs. Except Sofía. Lucía knows she has to say something, and has no idea what. Chapter 4: When it gets hard.',
  },
  notes: 'Chapter 3 challenge. Managing up with trade-offs ("yes, if") and decision rights; prioritisation and stop-doing; clear ownership. Fictional dates and CEO request.',
};

export default lesson;
