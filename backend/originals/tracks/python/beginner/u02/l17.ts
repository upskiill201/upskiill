import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17 — Common variable mistakes: quotes around names, using before storing, = vs ==, typos. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common variable mistakes',
  summary: 'Arjun keeps a list of the variable mistakes he still makes after eight years. He shares it with Ada, on the condition that she never shows his client.',
  minutes: 11,
  outcomes: [
    'Spot the five most common variable mistakes',
    'Tell which error each one causes',
    'Fix them quickly',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'print("share") prints the value of share.',
          isFact: false,
          explain: 'Myth. In quotes it\'s just the word share. To print the value, drop the quotes: print(share).',
        },
        {
          text: 'You can use a variable on a line above the one that creates it.',
          isFact: false,
          explain: 'Myth. Python runs top to bottom, so print(pot) before pot = ... is a NameError.',
        },
        {
          text: 'A typo in a variable name creates a brand-new variable when you store to it.',
          isFact: true,
          explain: 'Fact, and sneaky. memebrs = 12 makes a new variable; members is still 11, and no error tells you.',
        },
        {
          text: 'share == 25000 stores 25000 in share.',
          isFact: false,
          explain: 'Myth. == asks "are these equal?" and gives True or False. One = stores.',
        },
      ],
    },
    {
      kind: 'tryIt',
      title: 'The silent typo',
      caption: 'No error, wrong answer. Find the typo.',
      code: 'members = 11\nmemebrs = members + 1  # Bisi\'s friend joins\nshare = 25000\nprint(members * share)\n',
      challenge: 'Fix the typo so the pot includes the new member: 300000.',
    },
  ],
  apply: {
    scenario: "Arjun's list of mistakes.",
    items: [
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'share = 25000\nprint("share")',
        language: 'python',
        options: [
          { text: '25000', why: 'The quotes make it the word, not the variable.' },
          { text: 'share' },
          { text: 'NameError', why: 'Text in quotes is always fine to print.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Fix the silent typo so the pot is 300000',
        starter: 'members = 11\nmemebrs = members + 1\nshare = 25000\nprint(members * share)\n',
        solution: 'members = 11\nmembers = members + 1\nshare = 25000\nprint(members * share)\n',
        hint: 'Spell members correctly on line 2.',
        checks: [
          { message: 'Print 300000', outputEquals: '300000' },
          { message: 'members is 12', expr: 'members == 12' },
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which error does it cause?',
        groups: ['NameError', 'No error, wrong result'],
        items: [
          { text: 'print(pot) before pot = 100', group: 0 },
          { text: 'memebrs = 12 (typo when storing)', group: 1 },
          { text: 'print(memebrs) when it was never stored', group: 0 },
          { text: 'print("pot") instead of print(pot)', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line is in the wrong place?',
        language: 'python',
        lines: ['print(pot)', 'members = 11', 'pot = members * 25000'],
        bug: 0,
        fix: 'Move print(pot) to the end',
        explanation: 'pot doesn\'t exist yet on line 1: NameError.',
      },
      {
        kind: 'writeCode',
        prompt: 'Make it print the value of pot, not the word pot',
        starter: 'pot = 275000\nprint("pot")\n',
        solution: 'pot = 275000\nprint(pot)\n',
        hint: 'Remove the quotes.',
        checks: [{ message: 'Print 275000', outputEquals: '275000' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the mistake to the fix.',
        pairs: [
          ['print("share")', 'Drop the quotes'],
          ['print(pot) on line 1', 'Move it below pot = ...'],
          ['memebrs = 12', 'Fix the spelling'],
          ['share == 25000 to store', 'Use one ='],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which mistake is the hardest to notice?',
        options: [
          { text: 'Using a name before it exists', why: 'That one shouts: NameError.' },
          { text: 'A missing bracket', why: 'That one shouts too: SyntaxError.' },
          { text: 'A typo when storing, because Python quietly makes a new variable' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Store, don\'t compare.',
        language: 'python',
        template: 'share [[1]] 25000',
        blanks: [['=']],
        distractors: ['==', '==='],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'How do you catch the silent typo if there\'s no error?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Predict the answer before running. If the output surprises you, print the variables and look.' },
          { text: 'You can\'t.', why: 'Predicting and checking catches it.' },
          { text: 'Never use variables.', why: 'Variables are worth it. Check your output.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which error does print(totl) give if totl was never stored? (two words or one)',
        answers: ['NameError', 'name error'],
        placeholder: 'Error name',
      },
    ],
  },
  reflect: {
    prompt: 'The silent typo gives no error, just a wrong answer. Where in life are silent mistakes more dangerous than loud ones?',
    starters: ['A silent mistake...', 'I check for it by...'],
  },
  deepen: {
    title: 'Editors catch typos',
    summary: 'Code editors like VS Code underline names you only use once, which is often a typo. You\'ll set one up in Chapter 12.',
  },
  notes: 'NameError on using an unbound name (Built-in Exceptions: NameError). Assignment to a misspelled name binds a new name silently. == is comparison (Python Language Reference §6.10). 12 * 25000 = 300000.',
};

export default lesson;
