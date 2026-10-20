import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 1 — opens the chapter: "Show me something you built." Picking a first project. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Show me something you built"',
  summary: 'At her campus talk, Brenda Fon says one line Clinton can\'t forget: "Don\'t tell me you can build things. Show me something you built." His GitHub has three tutorial projects. So does everyone else\'s.',
  minutes: 12,
  outcomes: ['Explain why showing beats telling in applications', 'Spot a real problem worth building something for', 'Choose a first project you can actually finish'],
  learn: [
    {
      kind: 'story',
      title: 'The careers talk',
      beats: [
        { speaker: 'narrator', text: 'Thursday, 4pm. Seven months to graduation. Lecture hall 3 is full. Brenda Fon from Njangi Pay is talking about how she hires graduates.' },
        { speaker: 'brenda', text: 'Last year we had 900 applications for twelve graduate roles. Everyone says they can code, design, analyse. So here\'s my advice: don\'t tell me you can build things. Show me something you built.' },
        { speaker: 'narrator', text: 'Clinton opens his GitHub on his phone. A to-do list app. A weather app. A calculator. All from YouTube tutorials. The student next to him has the same three.' },
        { speaker: 'narrator', text: 'That night, at home, his mum is at the kitchen table with a school exercise book, frowning. Her njangi: twelve women, 25,000 francs each a month.' },
        { speaker: 'clinton', text: 'Mum, what\'s wrong?' },
        { speaker: 'narrator', text: '"Mama Bih says she paid in March. The book says she didn\'t. Every month, the same argument."' },
      ],
      choice: {
        prompt: 'What should Clinton build to show Brenda?',
        options: [
          {
            text: 'A small tracker for his mum\'s njangi: who paid, when, and who\'s next.',
            outcome: 'A real problem, real users, and a story nobody else has. It\'s small enough to finish in a few weeks. This is the project the whole chapter follows.',
            best: true,
          },
          {
            text: 'A full banking app, to really impress Njangi Pay.',
            outcome: 'Six months later it\'s still half built. Huge projects rarely get finished, and a half-built app proves less than a small finished one.',
          },
          {
            text: 'A fourth tutorial project, but a harder one.',
            outcome: 'A harder copy is still a copy. Brenda sees hundreds. A real problem solved is what she remembers.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Proof beats claims. One small thing you built for real people says more than any list of skills.',
    },
  ],
  apply: {
    scenario: 'Clinton picks his first real project.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was Brenda\'s advice?',
        options: [
          { text: 'Get top grades', why: 'She didn\'t mention grades. She asked for proof.' },
          { text: 'Show something you built, don\'t just say you can build' },
          { text: 'Apply to as many jobs as possible', why: 'Her point was about standing out, not volume.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first project, or not?',
        groups: ['Good first project', 'Not a good first project'],
        items: [
          { text: 'A tracker for his mum\'s njangi', group: 0 },
          { text: 'A complete banking app', group: 1 },
          { text: 'A sign-up sheet for the meet-up', group: 0 },
          { text: 'A copy of a YouTube to-do app', group: 1 },
          { text: 'A fixtures sheet for the football captains', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'A njangi tracker is too small. Njangi Pay builds apps for 200,000 groups!',
        options: [
          { text: 'Small and finished beats big and half-built. And it\'s the exact problem they solve.' },
          { text: 'You\'re right, build something huge.', why: 'Huge projects rarely get finished. Finished is what counts.' },
          { text: 'Then don\'t build anything.', why: 'Then he has nothing to show.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why are tutorial projects weak proof?',
        options: [
          { text: 'They\'re against the rules', why: 'They\'re fine for learning. They just don\'t stand out.' },
          { text: 'Everyone has the same ones, and they don\'t show you solving a real problem' },
          { text: 'Recruiters can\'t open them', why: 'They can. They\'ve just seen the same ones hundreds of times.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the njangi problem to the detail.',
        pairs: [
          ['Who has the problem', 'Twelve women in his mum\'s njangi'],
          ['What goes wrong', 'Arguments about who paid'],
          ['How it\'s tracked now', 'A school exercise book'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the project idea Clinton will probably never finish.',
        lines: ['A one-page tracker: who paid this month, and who\'s next.', 'A full social network for every njangi in Cameroon.', 'A reminder message the treasurer can send each month.'],
        bug: 1,
        explanation: 'Too big for a first project. Start with one group, one problem.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Brenda\'s advice.',
        template: 'Don\'t [[1]] me you can build things. [[2]] me something you built.',
        blanks: [['tell'], ['Show']],
        distractors: ['email', 'Ask', 'Give'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes the njangi tracker a story nobody else has?',
        options: [
          { text: 'It solves a real problem for real people Clinton knows' },
          { text: 'It uses the newest technology', why: 'The tech matters less than the real problem and real users.' },
          { text: 'It took a long time', why: 'Time doesn\'t make a story. A real problem solved does.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A Cameroonian rotating savings group is called a ___. (one word)',
        answers: ['njangi', 'njangui', 'tontine'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Proof or claim?',
        groups: ['Proof', 'Claim'],
        items: [
          { text: 'A tracker my mum\'s njangi uses every month', group: 0 },
          { text: '"I\'m a skilled developer"', group: 1 },
          { text: 'A fixtures sheet the faculty uses', group: 0 },
          { text: '"I can build anything"', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the people around you: family, church, shop, club, group chat. What small problem keeps coming up that you could help fix?',
    starters: ['A problem I keep seeing is...', 'It affects...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask three people you know: "What\'s one annoying thing you track on paper or in your head?" Write down every answer. One of them could be your first project.',
  },
  notes: '"900 applications for twelve graduate roles" is the fictional Njangi Pay\'s figure, said by a character, not a market statistic. Njangi (also njangui; tontine in francophone Cameroon) = rotating savings and credit association. 25,000 XAF a month is a plausible contribution. Mama Bih is a named extra.',
};

export default lesson;
