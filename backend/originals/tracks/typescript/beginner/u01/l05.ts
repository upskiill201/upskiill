import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5 — Checkpoint 1, the last free lesson. Reviews lessons 1–4. Story beat: Femi's quiz at the coffee machine. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Femi\'s quiz',
  summary: 'The coffee machine, Friday. Femi has five quick questions, and Grace has to answer them in code. Everything from your first four lessons, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you know where JavaScript and TypeScript came from', 'Write console.log() lines without help', 'Fix a simple type error'],
  learn: [
    {
      kind: 'story',
      title: 'The coffee machine',
      beats: [
        { speaker: 'narrator', text: 'Friday, 8:55. Femi is waiting by the coffee machine with his phone out.' },
        { speaker: 'femi', text: 'Pop quiz. If you get them all, I\'m buying the coffees. If you don\'t, you\'re buying.' },
        { speaker: 'grace', text: 'I was a nurse for eighteen years, Femi. I have survived much worse than a quiz.' },
        { speaker: 'narrator', text: 'Priya, Grace\'s manager, wanders over with her mug. "Can I watch? I never understand what the developers are on about."' },
        { speaker: 'tey', text: 'Let\'s see if the first week stuck. History, console.log, and one type error to fix.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: Femi\'s quiz.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Who first built JavaScript, and where?',
        options: [
          { text: 'Anders Hejlsberg at Microsoft', why: 'He led TypeScript, much later. JavaScript came from Brendan Eich at Netscape.' },
          { text: 'Brendan Eich at Netscape' },
          { text: 'Femi at Kinwell', why: 'Femi wishes. It was Brendan Eich at Netscape, in 1995.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Show Coffee is on Femi',
        starter: '',
        solution: 'console.log("Coffee is on Femi");\n',
        hint: 'console.log("...") with the words inside the quotes.',
        checks: [{ message: 'Show Coffee is on Femi', outputIncludes: 'Coffee is on Femi' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each year to what happened.',
        pairs: [
          ['1995', 'JavaScript is born'],
          ['2012', 'TypeScript is released'],
          ['Every year since 1995', 'Every browser runs JavaScript'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that will cause an error.',
        language: 'typescript',
        lines: ['console.log("Friday");', 'console.log("2 coffees);', 'console.log(2);'],
        bug: 1,
        fix: 'console.log("2 coffees");',
        explanation: 'The text is missing its closing quote.',
      },
      {
        kind: 'mcq',
        prompt: 'What does TypeScript do before your code runs?',
        options: [
          { text: 'Checks that every value matches its label, like number or text' },
          { text: 'Makes it run faster', why: 'TypeScript is about catching mistakes, not speed.' },
          { text: 'Sends it to Microsoft', why: 'Nothing is sent anywhere. The checking happens right where you write the code.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this show?',
        code: 'console.log("Coffees:");\nconsole.log(2);',
        language: 'typescript',
        options: [
          { text: 'Coffees: 2 on one line', why: 'Two console.log lines show two lines.' },
          { text: 'An error: numbers need quotes', why: 'Numbers never need quotes.' },
          { text: 'Coffees: on one line, then 2 on the next' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the type error so the code shows 2',
        starter: 'let coffees: number = 1;\ncoffees = "two";\nconsole.log(coffees);\n',
        solution: 'let coffees: number = 1;\ncoffees = 2;\nconsole.log(coffees);\n',
        hint: 'coffees is labelled number. A number has no quotes.',
        checks: [
          { message: 'No type errors', noTypeErrors: true },
          { message: 'Show 2', outputEquals: '2' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'JavaScript or TypeScript?',
        groups: ['JavaScript', 'TypeScript'],
        items: [
          { text: 'Built into every browser', group: 0 },
          { text: 'Released by Microsoft in 2012', group: 1 },
          { text: 'Checks labels like : number', group: 1 },
          { text: 'First version in about ten days', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Grace\'s answer.',
        language: 'typescript',
        template: '[[1]].[[2]]("I win the coffees")[[3]]',
        blanks: [['console'], ['log'], [';']],
        distractors: ['Console', 'print', ':'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'priya',
        message: 'So, Grace, in one sentence: what is TypeScript?',
        options: [
          { text: 'A brand-new language with nothing to do with JavaScript.', why: 'TypeScript is built on JavaScript: every JavaScript program is TypeScript.' },
          { text: 'A type of spreadsheet.', why: 'Grace is building something to replace the spreadsheet, but TypeScript is a programming language.' },
          { text: 'JavaScript with labels for what things are, so mistakes are caught before the code runs.' },
        ],
        answer: 2,
      },
      {
        kind: 'writeCode',
        prompt: 'Show this exactly: Quiz score on one line, then 5 on the next',
        starter: '',
        solution: 'console.log("Quiz score");\nconsole.log(5);\n',
        hint: 'Two console.log lines. The second one is a number, so no quotes.',
        checks: [{ message: 'Quiz score, then 5', outputEquals: 'Quiz score\n5' }],
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished your first checkpoint. What surprised you most this week: the history, the code, or the red lines?',
    starters: ['What surprised me was...', 'I didn\'t expect...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a three-line program about your week: what you learned, how many lessons you did, and what you want to build.',
  },
  notes: 'Checkpoint 1 = last free lesson (playbook §3). Reviews l01–l04: program, console.log, quotes, JavaScript history (1995, Eich, Netscape), TypeScript (2012, Microsoft, Hejlsberg), first type error (TS2322).',
};

export default lesson;
