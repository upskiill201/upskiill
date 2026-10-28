import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 9. Myth or Fact: what to build next, and keeping your own skills. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'What to build next',
  summary: 'Saturday morning, hours before the dinner. Benny has a list of 40 new features. Hazel has one question for Tey: "Now that I can build things, how do I get better, not just bigger?"',
  minutes: 11,
  outcomes: [
    'Choose the next feature by real need',
    'Keep learning to read code, not just prompt',
    'Plan your next three builds',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'The best next feature is the one your users keep asking for, or keep struggling without.', isFact: true, explain: 'Parents asked for one thing all week: "remind me the night before my gig." That\'s next. The fan wall can wait (again).' },
        { text: 'More features always make an app better.', isFact: false, explain: 'Every feature is more to test, secure and fix. Small and solid beats big and shaky.' },
        { text: 'If the AI writes the code, you never need to understand any of it.', isFact: false, explain: 'You\'ve been learning all along: diffs, errors, rules. Keep going. Reading code makes you faster and safer with any tool.' },
        { text: 'Asking the AI to explain its code, and sometimes writing small bits yourself, keeps your own skills growing.', isFact: true, explain: 'Try one small change by hand each week. You\'ll be surprised how much you can already read.' },
        { text: 'Your first app is the hardest. The next one reuses everything: the stack, the card, tests.md, CLAUDE.md.', isFact: true, explain: 'Hazel\'s next app (lesson booking for her private students) will take days, not weeks.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Next steps for learning: a coding course (like Python or HTML & CSS) so you can read code more easily, and a deeper course on working with AI coding agents.',
    },
  ],
  apply: {
    scenario: 'Benny\'s 40 ideas.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which feature should the band app get next?',
        options: [
          { text: 'A fan wall', why: 'Fun, but nobody is struggling without it.' },
          { text: 'A reminder the night before your gig, which parents keep asking for' },
          { text: 'A video chat', why: 'Big, risky, and nobody asked.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Grows your skills, or only grows the app?',
        groups: ['Grows your skills', 'Only grows the app'],
        items: [
          { text: 'Asking it to explain a change line by line', group: 0 },
          { text: 'Adding a feature nobody asked for', group: 1 },
          { text: 'Making one small change by hand each week', group: 0 },
          { text: 'Approving without reading', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'I have 40 ideas! Can we build them all this summer?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'All 40, at once!', why: 'That\'s the 14-file mess from Chapter 2.' },
          { text: 'Let\'s ask the parents which three would help most, and build those, one at a time.' },
          { text: 'No more ideas ever.', why: 'Ideas are good. Choose by real need.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s advice.',
        template: 'Small and [[1]] beats big and [[2]].',
        blanks: [['solid'], ['shaky']],
        distractors: ['fancy', 'fast'],
      },
      {
        kind: 'mcq',
        prompt: 'Hazel\'s next app is lesson booking for her private students. What can she reuse?',
        options: [
          { text: 'The stack, her brief card, tests.md, CLAUDE.md and the security pass' },
          { text: 'Nothing, every app is new', why: 'The stack, the card and the checklists all carry over.' },
          { text: 'Only the logo', why: 'Much more than that.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Hazel\'s summer plan is risky?',
        lines: [
          'Ask parents which features help most.',
          'Build the top one in layers, with tests.',
          'Stop reading diffs, I know what I\'m doing now.',
          'One small hand-edit a week.',
        ],
        bug: 2,
        fix: 'Keep reading diffs. Confidence is when mistakes slip through.',
        explanation: 'The habits are what made the app trustworthy. They don\'t expire.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'The feature parents kept asking for: a ... the night before their gig. (One word.)',
        answers: ['reminder', 'reminders'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the next step to what it gives you.',
        pairs: [
          ['An HTML & CSS or Python course', 'Read code more easily'],
          ['A course on AI coding agents', 'Deeper agent habits'],
          ['A second small app', 'Practice with everything reused'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 5: how should the reminder feature be built?',
        options: [
          { text: 'In layers: a brief, plan first, one step at a time, tested and committed' },
          { text: 'All at once, it\'s small', why: 'Even small features go in layers.' },
          { text: 'Straight on main, live', why: 'Branch first: main is live.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'I didn\'t trust this robot at the start. Do you know what I trust now?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'The robot.', why: 'Not quite. Ruth trusts the checking.' },
          { text: 'Nothing.', why: 'Ruth signed off. She trusts something.' },
          { text: 'Not the AI. The checking: the brief, the tests, the diffs, the rules.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Write your next three builds: one tiny, one useful to someone you know, one a bit scary. Which one first?',
    starters: ['Tiny:', 'Useful:', 'Scary:'],
  },
  deepen: {
    title: 'Plan your next build',
    summary: 'Pick the next feature your app\'s users actually need. Write its brief with a done-when, put it on a branch, and build it in layers with the whole card.',
  },
  notes: 'Teyro course names referenced exist as Originals (Python for Beginners, HTML & CSS, Working with AI Coding Agents); some are on branches not yet live, so the callout names topics generically.',
};

export default lesson;
