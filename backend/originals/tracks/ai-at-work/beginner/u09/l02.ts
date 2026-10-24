import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 2 — an agenda that keeps time. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'An agenda that keeps time',
  summary: 'The call has 30 minutes. Without an agenda, it will be 30 minutes of anger. With one, it ends with a plan. AI drafts it in seconds.',
  minutes: 12,
  outcomes: [
    'Write an agenda with outcomes and timings',
    'Put the most important item first',
    'Share it before the meeting',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Two agendas for the same call',
      before: {
        label: 'Topic list',
        text: '1. The outage\n2. Next steps\n3. AOB',
      },
      after: {
        label: 'Agenda that keeps time',
        text: 'Goal: agree how we fix this for shops and prevent it.\n1. What happened and what we\'ve fixed (Ada, 5 min)\n2. Carmen\'s concerns (Carmen, 10 min)\n3. What we\'ll do for affected shops: decide (all, 10 min)\n4. Next update and owner (Ada, 5 min)',
      },
      notes: [
        'A goal at the top tells everyone what "done" looks like.',
        'Each item says who leads and how long.',
        'Carmen\'s concerns get real time, early. Items that need a decision say so.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Goal on top. Each item: what, who, how long, and whether it needs a decision. Most important first. Share it before the call.',
    },
  ],
  apply: {
    scenario: 'Ada writes the agenda for the 11:30 call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s missing from "1. The outage 2. Next steps 3. AOB"?',
        options: [
          { text: 'More items', why: 'Detail, not quantity.' },
          { text: 'A goal, owners, timings and which items need decisions' },
          { text: 'Nothing', why: 'It keeps no time.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which agenda request is best?',
        options: [
          { text: 'Write an agenda.', why: 'No meeting details.' },
          { text: 'Write a 30-minute agenda for a call with an upset client after an outage. Goal: agree fixes for shops and prevention. Each item: owner, minutes, and whether a decision is needed.' },
          { text: 'Make it long.', why: '30 minutes only.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The four items take 5, 10, 10 and 5 minutes. What\'s the total?',
        answers: ['30'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good agenda item, or vague?',
        groups: ['Good', 'Vague'],
        items: [
          { text: 'What we\'ll do for shops: decide (all, 10 min)', group: 0 },
          { text: 'Next steps', group: 1 },
          { text: 'What happened (Ada, 5 min)', group: 0 },
          { text: 'AOB', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can you send the agenda before the call? Carmen likes to know what\'s coming.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'I\'ll share it on the call.', why: 'Share before.' },
          { text: 'We don\'t need one.', why: 'An angry call needs structure.' },
          { text: 'Sending it now: four items, 30 minutes, and her concerns get ten minutes early on.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] on top. Most important item [[2]].',
        blanks: [['Goal'], ['first']],
        distractors: ['Lunch', 'last'],
      },
      {
        kind: 'findBug',
        prompt: 'Which agenda item will cause trouble?',
        lines: [
          'What happened and the fix (Ada, 5 min)',
          'Carmen\'s concerns (Carmen, 10 min)',
          'Our new features roadmap (Tolu, 15 min)',
          'Next update and owner (Ada, 5 min)',
        ],
        bug: 2,
        fix: 'What we\'ll do for affected shops: decide (all, 10 min)',
        explanation: 'A roadmap pitch on an angry outage call is the wrong item.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the agenda part to its job.',
        pairs: [
          ['Goal', 'Defines done'],
          ['Owner', 'Who leads the item'],
          ['Minutes', 'Keeps time'],
          ['"Decide"', 'Shows a decision is needed'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the agenda goal.',
        tiles: ['Agree', 'fixes', 'for', 'shops', 'and', 'prevention'],
        distractors: ['blame'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the call agenda.',
        lines: ['What happened and the fix', 'Carmen\'s concerns', 'What we\'ll do for shops', 'Next update and owner'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a decision, or just information?',
        groups: ['Decision', 'Information'],
        items: [
          { text: 'What to offer affected shops', group: 0 },
          { text: 'What caused the outage', group: 1 },
          { text: 'Who owns the next update', group: 0 },
          { text: 'When it was fixed', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give Carmen\'s concerns real time early?',
        options: [
          { text: 'People need to be heard before they can move to solutions' },
          { text: 'To fill time', why: 'It helps the call work.' },
          { text: 'She insisted', why: 'It\'s good practice.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite the agenda of your next meeting with a goal, owners, minutes and decisions.',
    starters: ['Goal:', 'Item 1:'],
  },
  deepen: { title: 'Try it today', summary: 'Ask AI to turn your next meeting\'s topic list into an agenda with a goal, owners and minutes.' },
  notes: 'General meeting practice.',
};

export default lesson;
