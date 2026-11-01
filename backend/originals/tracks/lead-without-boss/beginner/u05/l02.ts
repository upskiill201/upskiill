import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Myth or Fact: the trust equation (Maister, Green & Galford, The Trusted Advisor). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'How trust adds up',
  summary: 'Remi asks Mrs Achieng why people ended up trusting a 22-year-old they\'d never met. She laughs. "It wasn\'t your cleverness, young man." Tey has an equation for what it was.',
  minutes: 11,
  outcomes: [
    'Know the four parts of the trust equation',
    'Know why self-orientation lowers trust fastest',
    'See which parts you can build this week',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'People trust you mainly because you\'re clever.', isFact: false, explain: 'Myth. In The Trusted Advisor (2000), David Maister, Charles Green and Robert Galford describe trust as more than competence. Their "trust equation" has four parts: credibility, reliability, intimacy, and self-orientation.' },
        { text: 'Reliability means doing what you said, again and again.', isFact: true, explain: 'Fact. Reliability is built over time, by repeated experiences: the Friday update, every Friday; the ticket numbers Felix asked for, every week.' },
        { text: 'Intimacy in the trust equation means being friends outside work.', isFact: false, explain: 'Myth. Here, intimacy means people feel safe sharing things with you: Emeka admitting he felt awkward asking his manager, Zanele telling Remi she was overloaded. It\'s about safety, not friendship.' },
        { text: 'High self-orientation lowers trust.', isFact: true, explain: 'Fact. Self-orientation is how much you seem focused on yourself: your credit, your career, your agenda. In the equation it divides everything else, so it can undo a lot of good. That\'s why "Kamau wants YOU" was a trap.' },
        { text: 'You can calculate someone\'s trust exactly with the equation.', isFact: false, explain: 'Myth. The equation is a way of thinking, not real maths. Its value is that it shows the levers: you can build the top three, and keep the bottom one low.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Trust = (credibility + reliability + intimacy) divided by self-orientation. Build the top three. Keep the focus on them, not you.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Mrs Achieng.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are the four parts of the trust equation?',
        options: [
          { text: 'Title, salary, age, confidence', why: 'None of those.' },
          { text: 'Credibility, reliability, intimacy, self-orientation' },
          { text: 'Speed, charm, humour, looks', why: 'Not the research.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Trust is mainly about cleverness', group: 0 },
          { text: 'Self-orientation lowers trust', group: 1 },
          { text: 'Intimacy means being friends outside work', group: 0 },
          { text: 'Reliability is built over time', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'achieng',
        message: 'So why did they trust you, young man?',
        prompt: 'Remi\'s best answer?',
        options: [
          { text: 'I kept small promises every week, people could tell me hard things, and I tried to make it about them, not me.' },
          { text: 'Because I\'m good with numbers.', why: 'Credibility helped, but it was only one part.' },
          { text: 'Because Brian backed me.', why: 'A sponsor helped. Trust came from what Remi did.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The part of the trust equation that divides the rest: self-___. (one word)',
        answers: ['orientation', 'Orientation'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Remi\'s six weeks.',
        pairs: [
          ['Credibility', '"I don\'t know yet, I\'ll find out."'],
          ['Reliability', 'The Friday update, every Friday'],
          ['Intimacy', 'Emeka admitting the sign-off'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was "Kamau wants YOU" a trust trap?',
        options: [
          { text: 'Kamau is scary', why: 'It\'s about how others see Remi.' },
          { text: 'It wasn\'t a trap', why: 'It could have undone six weeks.' },
          { text: 'Taking the stage alone would have raised his self-orientation' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s week. Which move raises self-orientation?',
        lines: [
          'Send the Friday update, same shape as always.',
          'Add a slide about my career goals to the Kamau review.',
          'Ask Njeri what she\'d like to say on Friday.',
        ],
        bug: 1,
        fix: 'Add a slide on how the fix will keep running.',
        explanation: 'A slide about himself, in the team\'s moment.',
      },
      {
        kind: 'orderLines',
        prompt: 'Build the trust equation in order.',
        lines: ['Credibility', 'plus reliability', 'plus intimacy', 'divided by self-orientation'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Build the top [[1]]. Keep the focus on [[2]], not you.',
        blanks: [['three'], ['them']],
        distractors: ['one', 'me'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Mrs Achieng\'s verdict.',
        tiles: ['It', 'wasn\'t', 'your', 'cleverness.'],
        distractors: ['title.'],
      },
    ],
  },
  reflect: {
    prompt: 'Which part of the trust equation is your strongest? Which one could you work on this month?',
    starters: ['My strongest is...', 'I could work on...'],
  },
  deepen: {
    title: 'Lower one number',
    summary: 'In your next conversation, spend it entirely on the other person: their problem, their goal. Notice how differently they respond.',
  },
  notes: 'David H. Maister, Charles H. Green & Robert M. Galford, The Trusted Advisor (2000): Trust = (Credibility + Reliability + Intimacy) / Self-Orientation; presented as a conceptual model, not a measurement.',
};

export default lesson;
