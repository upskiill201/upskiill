import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 2 · Lesson 19 — the learner plans their own first portfolio piece (career kit, piece 2). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your portfolio piece',
  summary: 'Your turn. Clinton has his tracker; you plan your first piece of proof. One page, five boxes, and a date. By the end of this lesson you\'ll know exactly what you\'re making, for whom, and when it\'s done.',
  minutes: 12,
  outcomes: ['Choose a real problem for your first piece', 'Write a one-line scope with a date', 'Plan the case study you\'ll write when it\'s done'],
  learn: [
    {
      kind: 'steps',
      title: 'Plan your piece in five boxes',
      steps: [
        { title: '1. The problem', body: 'Who has it, and what keeps going wrong? Use the four steps from lesson 4. Example: "My netball club never knows who has paid the season fee."' },
        { title: '2. The smallest useful version', body: 'One sentence. "A shared sheet showing who has paid and who hasn\'t, that the captain updates."' },
        { title: '3. Scope and date', body: 'What\'s in, what\'s on the later list, and when version 1 is done. "Version 1 by the 30th. Later: reminders."' },
        { title: '4. How you\'ll know it worked', body: 'Pick the result you\'ll measure before you start: fewer arguments, time saved, sign-ups, sales, questions answered. Write down the "before" number now.' },
        { title: '5. Permission and privacy', body: 'Who do you need to ask? What details will you hide in screenshots? Ask now, not after.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Write the "before" number today. Without it, you can\'t show the "after", and the after is what gets you the interview.',
    },
  ],
  apply: {
    scenario: 'You plan your first portfolio piece.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five boxes in order.',
        lines: ['The problem', 'The smallest useful version', 'Scope and date', 'How you\'ll know it worked', 'Permission and privacy'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the "before" number at the start?',
        options: [
          { text: 'Without it, you can\'t show how much things changed' },
          { text: 'It looks professional', why: 'It\'s about proving change, not looks.' },
          { text: 'You don\'t need it', why: 'Before and after is the strongest proof there is.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'A measurable result, or too vague?',
        groups: ['Measurable', 'Too vague'],
        items: [
          { text: 'Questions to the captain per week', group: 0 },
          { text: 'It feels better', group: 1 },
          { text: 'Minutes to sign in', group: 0 },
          { text: 'Things are nicer', group: 1 },
          { text: 'Sign-ups in the first week', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the box that\'s missing from this plan.',
        lines: ['Problem: nobody knows who paid the season fee.', 'Smallest version: a shared paid/unpaid sheet.', 'Scope: version 1 someday, maybe.', 'Result: questions to the captain per week.'],
        bug: 2,
        fix: 'Scope: version 1 by the 30th. Later: reminders.',
        explanation: '"Someday, maybe" isn\'t a date. Without one, it won\'t get finished.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Who do you need permission from before you start?',
        options: [
          { text: 'The people whose information or problem I\'m using, like the captain and members. I\'ll ask this week.' },
          { text: 'Nobody, it\'s my project.', why: 'It\'s their information and their story. Ask first.' },
          { text: 'I\'ll ask after it\'s finished.', why: 'Ask before. Afterwards might be too late.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each box to an example.',
        pairs: [
          ['Smallest version', 'A shared paid/unpaid sheet'],
          ['Scope and date', 'Version 1 by the 30th'],
          ['How you\'ll know', 'Questions per week: 15 before'],
          ['Privacy', 'Use "Player 1, 2, 3" in screenshots'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first piece plan is ready to start?',
        options: [
          { text: '"Something for my church, eventually."', why: 'No problem, no scope, no date.' },
          { text: '"A sign-up sheet for the choir trip, done by Friday; before: 3 people manage it on WhatsApp."' },
          { text: '"A huge app for every church in the country."', why: 'Too big to finish. Shrink it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete your scope line.',
        template: 'Version 1 does [[1]] for my club, by the [[2]].',
        blanks: [['payments', 'fees', 'tracking'], ['30th', 'deadline']],
        distractors: ['everything', 'someday', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Box 4: write down the "___" number before you start. (one word)',
        answers: ['before'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Box 5: hide it in screenshots, or fine to show?',
        groups: ['Hide it', 'Fine to show'],
        items: [
          { text: 'Members\' real names and numbers', group: 0 },
          { text: 'Your own name as the builder', group: 1 },
          { text: 'Made-up sample data', group: 1 },
          { text: 'Someone\'s home address', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Fill in your five boxes now, one line each. When is your version 1 due?',
    starters: ['Problem: ...', 'Smallest version: ...', 'Done by: ...', 'Before number: ...', 'I need to ask: ...'],
  },
  deepen: {
    title: 'Your career kit, piece 2',
    summary: 'Finish your five-box plan, ask for permission this week, and put the due date in your phone. When it\'s done, write the case study using Halima\'s structure. That\'s piece 2 of your kit.',
  },
  notes: 'Learner\'s career kit, piece 2 (outline engagement point 1). Pulls together l04 (problem), l07 (scope), l08 (case study), l12 (privacy).',
};

export default lesson;
