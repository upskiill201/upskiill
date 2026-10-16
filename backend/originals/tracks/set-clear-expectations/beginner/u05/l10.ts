import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Final Challenge: launch night, and Mr Rao's unwritten deal. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: launch night',
  summary: 'Day 30, 10:30 p.m. 1,100 orders. Then Mr Rao, first line: "Wonderful. Also, I assume fixes are free for the next three months?" Kavya, still awake, messages: "I could build back-in-stock alerts tonight!" Two expectations, one night. The last test.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every tool from the course in one final moment',
    'Handle an unwritten expectation from a client, honestly',
    'Protect your team on its best day',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 30, 10:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Mr Rao\'s email, first line: "Wonderful. Also, I assume fixes are free for the next three months?" Nothing about that was ever agreed. Nothing about it was ever said. It\'s his unwritten deal.' },
        { speaker: 'kavya', text: '(in the team chat) Red kurtas sold out! I could build back-in-stock alerts tonight! Like an hour?' },
        { speaker: 'narrator', text: 'Joel is asleep, as agreed: launch-day shift ended at 9. Arjun is exhausted and very happy. Thirty days ago, he would have said "of course" to both. You\'re with Arjun.' },
      ],
    },
  ],
  apply: {
    scenario: 'Launch night, 10:30 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Arjun reply to Kavya?',
        options: [
          { text: '"Brilliant idea, and you\'ve earned sleep. It goes top of the January list. Tonight we celebrate."' },
          { text: '"Go for it!"', why: 'An unplanned build at 10:30 p.m. on launch night.' },
          { text: '"No, stop suggesting things."', why: 'Shuts down a good idea and a great person.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool from the course?',
        groups: ['Chapters 1 and 2', 'Chapter 3', 'Chapters 4 and 5'],
        items: [
          { text: 'Definition of done', group: 0 },
          { text: 'Early 30% check', group: 1 },
          { text: 'The unwritten deal', group: 2 },
          { text: 'One owner per piece', group: 0 },
          { text: 'Won\'t this time', group: 1 },
          { text: 'Can\'t, or won\'t?', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(Writing the first line back to Mr Rao...)',
        prompt: 'Arjun\'s best first line?',
        options: [
          { text: '"Of course, three months free!"', why: 'Says yes to an expectation that was never checked.' },
          { text: '"No, nothing is free."', why: 'True-ish, cold, and on his happiest night.' },
          { text: '"Thank you! Any bugs in what we built are fixed free for 30 days; new features and changes are quoted separately."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Mr Rao\'s "free fixes" was part of his psychological ___. (one word)',
        answers: ['contract', 'Contract'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s 30 days in order.',
        lines: ['Day 1: the four-word brief', 'Day 6: two checkouts', 'Day 12: what good looks like', 'Day 20: the loyalty call', 'Day 30: launch'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Arjun do about the "free fixes" lesson for next time?',
        options: [
          { text: 'Nothing; it\'s sorted now', why: 'Write it in, or it surprises him again.' },
          { text: 'Never work with Mr Rao again', why: 'Mr Rao just wants clarity too.' },
          { text: 'Writes the support terms into the Day 1 agreement for January' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s launch-night message to the team. Which line forgets the course?',
        lines: [
          '1,100 orders. Every must on our list: met.',
          'Kavya, if you\'re up anyway, could you just look at the alerts tonight?',
          'Joel\'s checkout: zero failed payments. Thank you both.',
        ],
        bug: 1,
        fix: 'Back-in-stock alerts: top of the January list.',
        explanation: '"If you\'re up anyway" is a quiet, unplanned expectation on launch night.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their 30-day story.',
        pairs: [
          ['Kavya', 'From "done" at 80% to every must met'],
          ['Joel', 'From silent to "stuck, looking"'],
          ['Arjun', 'From "obviously" to written down'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mr Rao replies: "Fair. 30 days. January, same team?" What should Arjun do?',
        options: [
          { text: '"Same as before!"', why: 'That carries the old gaps forward.' },
          { text: 'Say yes, and send a fresh Day 1 agreement with intent, owners, done, support terms and pay' },
          { text: 'Ask Kavya and Joel to start tomorrow', why: 'It starts Jan 3. Rest first.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course, in one line.',
        template: 'If it\'s only in your [[1]], it isn\'t an expectation. Write it, show it, [[2]] it, and keep it.',
        blanks: [['head'], ['check']],
        distractors: ['email', 'hide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s last line of the night.',
        tiles: ['Every', 'must:', 'met.', 'Go', 'to', 'sleep.'],
        distractors: ['Build.'],
      },
    ],
  },
  reflect: {
    prompt: 'Look back at the whole course. Which one habit will you use this week, and with whom?',
    starters: ['The habit I\'ll use is...', 'With...'],
  },
  deepen: {
    title: 'Your Day 1',
    summary: 'You\'ve finished How to Set Clear Expectations. Pick one thing you\'re handing to someone this week. Write the brief with intent, done, owner, an example and a check-in. Then ask them to say it back.',
  },
  notes: 'Final challenge: synthesis of the whole course. Explicit support/warranty terms as part of client expectations (common freelance practice). Fictional events.',
};

export default lesson;
