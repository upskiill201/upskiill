import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Chapter Challenge: "My cousin's developer can do it in a week." */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the cousin\'s developer',
  summary: 'Day 24. The comeback code is live in testing. Then Mr Rao, by email, first line: "My cousin\'s developer says full loyalty points take one week. Why did you say three?" Arjun\'s stomach drops. Kavya and Joel are copied in.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 4 tool in one live moment',
    'Hold a realistic expectation under pressure, without getting defensive',
    'Protect your team\'s estimate in front of them',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 24, 9:10 a.m.',
      beats: [
        { speaker: 'narrator', text: 'The email\'s first line: "My cousin\'s developer says full loyalty points take one week. Why did you say three?" Below it, a screenshot of the cousin\'s shop: points, but no Hindi, no gold level, no birthday rewards.' },
        { speaker: 'joel', text: '(private message to Arjun) That was my estimate. Should I say I was wrong?' },
        { speaker: 'narrator', text: 'Arjun could cave: "We\'ll try for a week!" He could get defensive: "Your cousin\'s developer is wrong." Or he could do something better. Kavya and Joel are reading every word he sends. You\'re with Arjun.' },
      ],
    },
  ],
  apply: {
    scenario: 'Day 24, 9:10 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Arjun tell Joel first?',
        options: [
          { text: '"Your estimate was for a different thing: points, gold levels, birthdays, in two languages. I stand by it. I\'ll handle the reply."' },
          { text: '"Maybe say you were wrong, to keep him happy."', why: 'Throws Joel\'s honest estimate under the bus.' },
          { text: '"Ignore it."', why: 'Joel is worried. Back him up, out loud.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 4 tool helps?',
        groups: ['Line one', 'Options', 'Unwritten deal'],
        items: [
          { text: 'Start with the answer, not a defence', group: 0 },
          { text: '"Simple points in a week; full points in three"', group: 1 },
          { text: 'Does Mr Rao assume points come free later?', group: 2 },
          { text: '"Diwali launch stays Day 28"', group: 0 },
          { text: '"Which matters more?"', group: 1 },
          { text: 'Ask what he expects in January', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: '(Writing the first line back to Mr Rao...)',
        prompt: 'Arjun\'s best first line?',
        options: [
          { text: '"With respect, your cousin\'s developer doesn\'t understand the scope."', why: 'Defensive, and it criticises his family.' },
          { text: '"We\'ll try to do it in a week!"', why: 'Caving. "Try" is heard as yes.' },
          { text: '"Simple points (like your cousin\'s) take about a week; the gold levels, birthdays and Hindi you asked for take three."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The two estimates were for two ___ things. (one word)',
        answers: ['different', 'Different'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s reply in order.',
        lines: ['Line one: why the estimates differ', 'Offer options: simple now, or full in January', 'Launch Day 28 stays', 'Ask which matters more'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is backing Joel\'s estimate in front of the team important?',
        options: [
          { text: 'To show who\'s boss', why: 'It\'s about honest estimates.' },
          { text: 'It isn\'t; clients come first', why: 'Honest estimates protect the client too.' },
          { text: 'If honest estimates get thrown away under pressure, people start giving hopeful ones' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s reply. Which line breaks Chapter 4?',
        lines: [
          'Simple points like your cousin\'s take about a week.',
          'Honestly, Joel may have overestimated, sorry.',
          'Option: simple points in January\'s first week, full version by the end of January.',
        ],
        bug: 1,
        fix: 'Your version, with gold levels and Hindi, takes about three.',
        explanation: 'Joel\'s estimate was right for what was asked. Don\'t apologise it away.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the tool.',
        pairs: [
          ['"I stand by it."', 'Backing an honest estimate'],
          ['"Simple in a week, full in three"', 'Options with trade-offs'],
          ['"Which matters more?"', 'Giving the choice back'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Mr Rao replies: "Ah. Then simple points in the first week of January." What should Arjun do?',
        options: [
          { text: 'Start simple points now, to impress him', why: 'It\'s January. Diwali comes first.' },
          { text: 'Add it to the January list with that date, thank him, and tell the team what changed' },
          { text: 'Nothing; it\'s January\'s problem', why: 'Write it down, or it gets remembered differently.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4, in one line.',
        template: 'When it changes, find the [[1]], show the [[2]], and let them choose.',
        blanks: [['need'], ['options', 'trade-offs', 'cost']],
        distractors: ['blame', 'cousin'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s message to Joel.',
        tiles: ['I', 'stand', 'by', 'your', 'estimate.'],
        distractors: ['doubt'],
      },
    ],
  },
  reflect: {
    prompt: 'Has someone ever compared your estimate with someone else\'s cheaper, faster one? What were the two estimates really for?',
    starters: ['They compared...', 'The real difference was...'],
  },
  deepen: {
    title: 'Next: Day 29',
    summary: 'Diwali eve. Launch is tomorrow. At 9 p.m., Arjun runs the final checklist: the order emails don\'t send in Hindi. Joel\'s piece. Joel has gone quiet. Chapter 5: Launch, and what we learned.',
  },
  notes: 'Chapter 4 challenge. Comparing estimates for different scopes; backing team estimates; options and trade-offs; answer-first to a first-line reader. Fictional events.',
};

export default lesson;
