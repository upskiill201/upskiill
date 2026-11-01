import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 2 · Lesson 18 — Clinton's month-five impact summary. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'The month-five summary',
  summary: 'Before his six-month review, Clinton turns five months of weekly lines into one page. Miracle reads it and says, "This is a promotion case waiting to happen." Tap each line.',
  minutes: 11,
  outcomes: ['Summarise months of impact on one page', 'Group results by goal', 'End with what you want next'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each line of Clinton\'s summary',
      text: 'Goal 1, failed confirmations: from 8% to 5%, through the retry and sync fixes I owned.\nGoal 2, support calls: sync status cut "where is my confirmation?" calls by about a third.\nGoal 3, old phones: crashes on 2 GB phones down about 90%.\nBeyond my team: fixed the Monday payout report with finance; onboarded Kemi.\nNext: I\'d like to own a larger part of the sync service.',
      hotspots: [
        { phrase: 'from 8% to 5%, through the retry and sync fixes I owned', note: 'The headline result, with "I owned". It shows his part clearly without claiming the whole team\'s work.' },
        { phrase: 'cut "where is my confirmation?" calls by about a third', note: 'Matches Goal 2 exactly. "About" keeps it honest.' },
        { phrase: 'crashes on 2 GB phones down about 90%', note: 'His rare skill (old phones) shows up as a number.' },
        { phrase: 'fixed the Monday payout report with finance; onboarded Kemi', note: 'Value beyond his own tasks: a problem nobody owned, and making others better.' },
        { phrase: 'I\'d like to own a larger part of the sync service.', note: 'He says what he wants next. Without this line, Ngozi has to guess.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'One page: results by goal, value beyond your team, and what you want next.',
    },
  ],
  apply: {
    scenario: 'Clinton writes his summary.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the summary in order.',
        lines: ['Goal 1 result', 'Goal 2 result', 'Goal 3 result', 'Value beyond his team', 'What he wants next'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Clinton write "I owned"?',
        options: [
          { text: 'To take all the credit', why: 'It\'s precise about his part.' },
          { text: 'To show his part clearly without claiming the whole team\'s work' },
          { text: 'No reason', why: 'It clarifies his contribution.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Goal result, or value beyond his team?',
        groups: ['Goal result', 'Beyond his team'],
        items: [
          { text: 'Failed confirmations 8% to 5%', group: 0 },
          { text: 'Payout report fixed with finance', group: 1 },
          { text: 'Crashes down about 90%', group: 0 },
          { text: 'Onboarded Kemi', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that overclaims.',
        lines: ['Failed confirmations down, through fixes I owned.', 'I single-handedly saved the company.', 'Onboarded Kemi.'],
        bug: 1,
        explanation: 'Overclaiming hurts trust. Be precise about your part.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Is it pushy to end with what I want next?',
        options: [
          { text: 'Yes, never say what you want.', why: 'Saying it helps your manager.' },
          { text: 'Demand a promotion instead.', why: 'State what you\'d like to own next.' },
          { text: 'No: it helps Ngozi plan. Without it, she has to guess.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line to its kind of value.',
        pairs: [
          ['Crashes down about 90%', 'Rare skill'],
          ['Onboarded Kemi', 'Making others better'],
          ['Calls down by a third', 'Impact on a goal'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Miracle call the summary?',
        options: [
          { text: '"A promotion case waiting to happen"' },
          { text: '"Too long"', why: 'She saw a promotion case.' },
          { text: '"Not enough"', why: 'She saw a promotion case.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Results by [[1]], value beyond your team, what you want [[2]].',
        blanks: [['goal'], ['next']],
        distractors: ['mood', 'never', 'month'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Failed confirmations are now at what percent? (a number)',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest or overclaiming?',
        groups: ['Honest', 'Overclaiming'],
        items: [
          { text: 'About a third fewer calls', group: 0 },
          { text: 'I fixed everything', group: 1 },
          { text: 'Fixes I owned', group: 0 },
          { text: 'Nobody else helped', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If you summarised your last few months on one page, what would your headline result be?',
    starters: ['My headline:', 'Next I want...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a five-line summary of your last few months: results by goal, value beyond your role, what you want next.',
  },
  notes: 'Numbers are story details.',
};

export default lesson;
