import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 6. Chat with Tey: introducing two people to each other. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Introducing two people to each other',
  summary: 'Saturday morning: Grace is having coffee with Ravi, the developer from the snack table, when Femi walks into the café. Grace says, "This is Femi." Then nothing. Ravi and Femi stare at each other. There\'s a better way.',
  minutes: 11,
  outcomes: [
    'Introduce two people so they have something to talk about',
    'Use the name + detail + connection formula',
    'Step back gracefully once they\'re talking',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: "Saturday, a café in the Northern Quarter. Grace is having coffee with Ravi. Femi walks in. Grace: \"Ravi, this is Femi. Femi, Ravi.\" Ravi: \"Hi.\" Femi: \"Hi.\" Three seconds of silence. What went wrong?",
          replies: ['She only gave names.', 'Nothing? That\'s an introduction.'],
        },
        {
          tey: "Names alone are a door with no handle. A great introduction gives both people a reason to talk. The formula: NAME + one DETAIL about each + the CONNECTION between them.",
          replies: ['Show me.'],
        },
        {
          tey: "\"Ravi, this is Femi, he builds our booking system at Kinwell. Femi, Ravi is a developer too, and he's trying to get into health tech, so you two should definitely talk.\" Now they have a detail, a link and a starting topic.",
          replies: ['What if they have nothing in common?'],
        },
        {
          tey: "There's almost always something: same city, both new, both survived the samosa table. Or give each of them one interesting detail and let them find the link: \"Femi has met everyone in Manchester. Ravi just moved here from Leicester.\"",
          replies: ['Then what?'],
        },
        {
          tey: "Stay for a minute to help it get going. Then, once they're talking, you can step back: \"I'll leave you two to it, I need a refill.\" That's one of the kindest things you can do at an event. People remember who introduced them.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A great introduction: name + one detail about each + the connection. Then let them talk.',
    },
  ],
  apply: {
    scenario: 'Saturday morning. Coffee with Ravi.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "Ravi, this is Femi. Femi, Ravi." fall flat?',
        options: [
          { text: 'Grace said the names in the wrong order', why: 'Order matters less than giving them a link.' },
          { text: 'They didn\'t like each other', why: 'They didn\'t get the chance.' },
          { text: 'Names alone gave them nothing to talk about' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Grace\'s introduction in order.',
        lines: ['Ravi, this is Femi.', 'He builds our booking system at Kinwell.', 'Femi, Ravi is a developer trying to get into health tech.', 'You two should definitely talk.'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Useful in an introduction, or not?',
        groups: ['Useful', 'Not useful'],
        items: [
          { text: 'What each person does, in plain words', group: 0 },
          { text: 'How much each person earns', group: 1 },
          { text: 'Something they have in common', group: 0 },
          { text: 'An embarrassing story about one of them', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: '(arriving) Grace! Who\'s this?',
        prompt: 'Grace\'s introduction?',
        options: [
          { text: 'This is Ravi.', why: 'Names only. Door with no handle.' },
          { text: 'Some guy from the snack table.', why: 'Funny to Grace, less funny to Ravi.' },
          { text: 'This is Ravi, he\'s a developer who just moved here from Leicester and wants to get into health tech. Ravi, Femi knows everyone in Manchester tech.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The formula: name + one detail + the ___ between them. (one word)',
        answers: ['connection', 'link'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Femi and Ravi are deep in conversation. What can Grace do?',
        options: [
          { text: 'Interrupt to remind them she introduced them', why: 'They know.' },
          { text: 'Step back kindly: "I\'ll leave you two to it, I need a refill."' },
          { text: 'Stand there silently for twenty minutes', why: 'Her job here is done.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s introduction. Which line could embarrass someone?',
        lines: [
          'Femi, this is Ravi, a developer from Leicester.',
          'He spent forty minutes pretending to read his emails, ha!',
          'You\'re both into health tech, you should talk.',
        ],
        bug: 1,
        fix: 'He\'s trying to get into health tech.',
        explanation: 'Ravi shared that with Grace, not with everyone. Introduce people at their best.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['What do you do?', 'What + who it helps + detail + question'],
          ['"Just" and "sorry"', 'Words that shrink you'],
          ['Welcome duty', 'A job that gives you a reason to talk'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s introduction formula.',
        template: 'Ravi, this is [[1]], he builds our booking system. Femi, Ravi is a [[2]] too. You two should [[3]].',
        blanks: [['Femi'], ['developer'], ['talk']],
        distractors: ['Priya', 'leave'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s graceful step back.',
        tiles: ['I\'ll', 'leave', 'you', 'two', 'to', 'it.'],
        distractors: ['forever', 'boring'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of two people you know who should meet. Write the introduction: name, one detail each, the connection.',
    starters: ['[Name], this is [Name], who...', 'You should talk because...'],
  },
  deepen: {
    title: 'Introduce one pair a week',
    summary: 'Look for chances to introduce people: at work, at events, online. Being the person who connects others is one of the fastest ways to be remembered warmly.',
  },
  notes: 'Practical introduction etiquette (name + detail + connection). Ravi is a named extra (from lesson 1); Leicester is a real UK city.',
};

export default lesson;
