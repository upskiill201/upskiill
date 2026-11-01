import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 11 — whose project is it? Honesty choice: presenting a tutorial clone as your own. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Whose project is it?',
  summary: 'Clinton wants a second portfolio piece fast. He finds a brilliant budgeting app on GitHub, changes the colours and the name, and it looks amazing. Nobody would ever know. Would they?',
  minutes: 12,
  outcomes: ['Explain why passing off someone else\'s work backfires', 'Credit work you built on, the right way', 'Turn a borrowed starting point into honest proof'],
  learn: [
    {
      kind: 'story',
      title: 'Ten minutes',
      beats: [
        { speaker: 'narrator', text: 'Thursday night. Clinton wants a second project before the Njangi Pay applications open. He finds a beautiful budgeting app on GitHub: charts, categories, everything.' },
        { speaker: 'narrator', text: 'He downloads it, changes the colours to blue, renames it "Clinton\'s Budget Buddy", and puts it at the top of his portfolio. Ten minutes.' },
        { speaker: 'david', text: 'Bro, that\'s amazing. When did you build that?' },
        { speaker: 'clinton', text: '...Tonight.' },
        { speaker: 'tey', text: 'Here\'s what Clinton isn\'t thinking about: interviewers ask "Walk me through how you built this." Code has a history that shows who wrote it. And Brenda\'s team has seen that exact app before, because it\'s popular. Passing off someone else\'s work is the fastest way to lose an offer, and a reputation.' },
      ],
      choice: {
        prompt: 'What should Clinton do with the budgeting app?',
        options: [
          {
            text: 'Take it off his portfolio. If he wants to build on it, credit the original and show exactly what he added.',
            outcome: 'He adds one honest feature, a "njangi contribution" category, and writes: "Built on [original project] by its author; I added contribution tracking for savings groups." Smaller claim, completely safe, and it shows he can work with other people\'s code, which is a real job skill.',
            best: true,
          },
          {
            text: 'Keep it as "his". Nobody checks GitHub that closely.',
            outcome: 'In the interview, Brenda\'s engineer asks about a chart. Clinton can\'t explain how it works. The interview goes quiet. So does his phone afterwards.',
          },
          {
            text: 'Keep it, but say he "worked on it".',
            outcome: 'Vague words around borrowed work still mislead. If he can\'t say exactly what he did, it isn\'t his proof.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Only show what you can explain line by line. If you built on someone else\'s work, name them and say exactly what you added.',
    },
  ],
  apply: {
    scenario: 'Clinton deals with the budgeting app.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is passing off someone else\'s project so risky?',
        options: [
          { text: 'It isn\'t risky if you change the colours', why: 'Colours don\'t change who built it.' },
          { text: 'Interviewers ask you to explain it, and history shows who really wrote it' },
          { text: 'Only because it\'s slow', why: 'It\'s fast. That\'s the trap.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or misleading?',
        groups: ['Honest', 'Misleading'],
        items: [
          { text: '"Built on [project] by its author; I added contribution tracking."', group: 0 },
          { text: 'Renaming someone\'s app and calling it yours', group: 1 },
          { text: '"Followed a tutorial to learn charts" (in a learning section)', group: 0 },
          { text: '"I worked on it" for an app you only downloaded', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'brenda',
        message: 'Walk me through how you built the charts in this budgeting app.',
        options: [
          { text: 'I... can\'t remember.', why: 'That\'s what happens when it isn\'t your work.' },
          { text: 'I built everything myself.', why: 'One follow-up question and this falls apart.' },
          { text: 'The charts came from the original project I built on. My part was the contribution tracking: here\'s how I added it.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each situation to the honest way to show it.',
        pairs: [
          ['You followed a tutorial', 'List it under "learning", not as your project'],
          ['You built on someone\'s code', 'Credit them and say what you added'],
          ['You built it from scratch', 'Call it your project'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the misleading portfolio line.',
        lines: ['Njangi Tracker: my own project for my mum\'s savings group.', 'Budget Buddy: my app with charts and categories.', 'Weather app: tutorial practice (learning React).'],
        bug: 1,
        fix: 'Budget Buddy: built on an open-source budgeting app; I added njangi contribution tracking.',
        explanation: 'He didn\'t build the charts or categories. Say what he actually added.',
      },
      {
        kind: 'mcq',
        prompt: 'What real job skill does honestly building on someone\'s code show?',
        options: [
          { text: 'Working with other people\'s code, which developers do every day' },
          { text: 'None', why: 'Most real work means building on existing code. It\'s a valued skill.' },
          { text: 'Copying fast', why: 'It shows reading, understanding and extending code.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Only show what you can [[1]] line by line. Name who you built [[2]].',
        blanks: [['explain'], ['on']],
        distractors: ['hide', 'copy', 'over'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Giving the original author their name and credit is called ___ them. (one word)',
        answers: ['crediting', 'credit', 'citing', 'attributing'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it apply outside coding too?',
        groups: ['Same rule applies', 'Doesn\'t apply'],
        items: [
          { text: 'Using someone\'s design template for a poster', group: 0 },
          { text: 'Rewording someone else\'s article as your own', group: 0 },
          { text: 'Writing your own newsletter from scratch', group: 1 },
          { text: 'Using a budget template from a website', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'So you\'re deleting the cool budget app? It looked SO good.',
        options: [
          { text: 'No, I\'ll keep calling it mine.', why: 'Not worth an offer or a reputation.' },
          { text: 'I\'ll delete my whole portfolio.', why: 'The Njangi Tracker is all his. Keep it.' },
          { text: 'I\'m keeping it, credited, with my one honest feature. My own small thing beats someone else\'s big thing.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever been tempted to present someone else\'s work (or a template) as fully yours? How would you show it honestly instead?',
    starters: ['I was tempted when...', 'Honestly, I\'d say...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Go through anything you might show an employer. For each piece, write one line: "I built/made ___ myself" or "I built on ___ and added ___."',
  },
  notes: 'Honesty choice per playbook §8a.7. Open-source code comes with licences that usually require attribution (e.g. MIT licence keeps the copyright notice); version history (e.g. Git commits) shows authorship. General principle, not legal advice.',
};

export default lesson;
