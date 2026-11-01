import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 5 — Checkpoint 1. Where data goes, never-paste, personal data, rules. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: think before you paste',
  summary: 'Where typed text goes, the never-paste list, personal data basics and company rules. Show you can keep data safe.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can spot data that must not be pasted', 'Show you can apply data and company rules'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Unit 10, first Checkpoint. The agency list, again.', replies: ['Ready'] },
        { tey: 'Warm-up: pasting into an AI tool is like what?', replies: ['Sending it to that company'] },
        { tey: 'Exactly. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the agency list.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Never paste, or fine?',
        groups: ['Never paste', 'Fine'],
        items: [
          { text: 'Bank API key', group: 0 },
          { text: 'A public article', group: 1 },
          { text: 'Shop owner ID numbers', group: 0 },
          { text: 'A formula question', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What can happen to text typed into an AI tool?',
        options: [
          { text: 'Nothing', why: 'It leaves your computer.' },
          { text: 'It may be stored, reviewed or used for training, depending on tool and settings' },
          { text: 'It\'s deleted at once', why: 'Not guaranteed.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the principle.',
        pairs: [
          ['Purpose', 'Only for what people were told'],
          ['Minimum', 'Only what you need'],
          ['Consent', 'Agreement for new uses'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line must go before pasting?',
        lines: ['Hi team, quick update.', 'Customer Ama, ID GHA-123456789-0, is live.', 'Payments grew this week.', 'Thanks'],
        bug: 1,
        fix: 'Customer A is live.',
        explanation: 'ID numbers are never-paste.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Just send the agency the full shop list. Everyone does it.',
        prompt: 'Best reply from Ada?',
        options: [
          { text: 'OK, sending.', why: 'New purpose.' },
          { text: 'No, never.', why: 'Opt-in is the route.' },
          { text: 'They gave details for payments, not marketing. Let\'s send an opt-in message and share only those who agree.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Company allows a tool; the client contract bans AI on their data. What wins?',
        options: [
          { text: 'The stricter rule' },
          { text: 'The company rule', why: 'Stricter wins.' },
          { text: 'The easier one', why: 'Stricter wins.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is safe in an unchecked tool?',
        options: [
          { text: 'Here\'s the list with phones. Clean it.', why: 'Personal data.' },
          { text: 'My sheet has columns Name, Phone, Market. Write a formula to remove duplicate rows.' },
          { text: 'Here\'s my login, fix the data.', why: 'Credentials.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Treat pasting like [[1]]. No policy? Act [[2]].',
        blanks: [['sending'], ['strictly']],
        distractors: ['deleting', 'freely'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ghana\'s Data Protection Act is from which year?',
        answers: ['2012'],
        placeholder: 'A year',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the key question.',
        tiles: ['Did', 'they', 'agree', 'to', 'this', 'use?'],
        distractors: ['Whatever'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Personal data, or not?',
        groups: ['Personal', 'Not personal'],
        items: [
          { text: 'A name with a phone number', group: 0 },
          { text: 'Total weekly payments', group: 1 },
          { text: 'A face photo', group: 0 },
          { text: 'Average failure rate', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order the pause before pasting.',
        lines: ['Whose data is it?', 'Check company rules', 'Check the tool settings', 'Remove anything sensitive'],
      },
      {
        kind: 'findBug',
        prompt: 'Which assumption is risky?',
        lines: ['Check the policy', 'Check the contract', 'Nobody said no, so it\'s allowed', 'Ask if unsure'],
        bug: 2,
        fix: 'Ask before using it.',
        explanation: 'Silence isn\'t permission.',
      },
      {
        kind: 'mcq',
        prompt: 'What did Samsung do after staff pasted confidential code?',
        options: [
          { text: 'Nothing', why: 'It restricted use.' },
          { text: 'Celebrated', why: 'It restricted use.' },
          { text: 'Restricted public AI tool use' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which of these would you most likely have got wrong before this unit?',
    starters: ['I\'d have...', 'Now I\'ll...'],
  },
  notes: 'Checkpoint for Unit 10 lessons 1-4.',
};

export default lesson;
