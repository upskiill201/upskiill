import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 10 · Lesson 2 — never paste these. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Never paste these',
  summary: 'Ada\'s "never paste" list is short enough to remember. Tap each item to see why it\'s on there.',
  minutes: 12,
  outcomes: [
    'Know the six things never to paste into an unapproved tool',
    'Spot them hidden inside documents',
    'Replace them before using AI',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Ada\'s never-paste list',
      text: 'Passwords and keys. ID and account numbers. Customers\' personal details. Health information. Confidential company documents. Anything a client asked you to keep private.',
      hotspots: [
        { phrase: 'Passwords and keys', note: 'Anyone who sees them can get in. Covered in lesson 6.' },
        { phrase: 'ID and account numbers', note: 'National IDs, bank account and card numbers: the raw material of fraud.' },
        { phrase: 'Customers\' personal details', note: 'Names with phone numbers, addresses or emails. Data protection laws apply.' },
        { phrase: 'Health information', note: 'Extra-sensitive under most data laws. Never in an unapproved tool.' },
        { phrase: 'Confidential company documents', note: 'Contracts, plans, salaries, unreleased results. Your company owns them, not you.' },
        { phrase: 'keep private', note: 'If a client asked for confidentiality, that promise travels with the data.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Never paste into an unapproved tool: passwords and keys, ID and account numbers, personal details, health info, confidential documents, anything promised private.',
    },
  ],
  apply: {
    scenario: 'Ada checks a document before using AI.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'On the never-paste list, or fine?',
        groups: ['Never paste', 'Fine'],
        items: [
          { text: 'A shop owner\'s national ID number', group: 0 },
          { text: 'A generic question about formulas', group: 1 },
          { text: 'The bank API key', group: 0 },
          { text: 'A public blog post', group: 1 },
          { text: 'Salaries in the team budget', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many items are on Ada\'s never-paste list?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Ada wants AI to shorten this email. Which line must she remove first?',
        lines: [
          'Hi Kofi, the pilot is going well.',
          'Your account number 0123456789 is linked.',
          'Payments grew by half this month.',
          'Talk soon, Ada',
        ],
        bug: 1,
        fix: 'Your account is linked.',
        explanation: 'Account numbers are on the never-paste list.',
      },
      {
        kind: 'mcq',
        prompt: 'Why is health information extra sensitive?',
        options: [
          { text: 'It\'s boring', why: 'It\'s protected.' },
          { text: 'Most data laws give it special protection, and leaks can seriously harm people' },
          { text: 'It isn\'t', why: 'It\'s special-category data in many laws.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Can I paste our new campaign budget into an AI to tidy it?',
        prompt: 'It\'s confidential and the tool isn\'t approved. Best reply?',
        options: [
          { text: 'Sure, it\'s only numbers.', why: 'Confidential documents.' },
          { text: 'Never use AI again.', why: 'Use approved tools or placeholders.' },
          { text: 'I\'d use a company-approved tool for that, or replace the real numbers with placeholders first.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the item to a safe replacement.',
        pairs: [
          ['Customer name', 'Customer A'],
          ['Account number', '[ACCOUNT]'],
          ['Real salary', 'A made-up round number'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the list.',
        template: 'Never paste [[1]] and keys, or ID and [[2]] numbers.',
        blanks: [['passwords'], ['account']],
        distractors: ['questions', 'phone-case'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is safe to send to an unchecked tool?',
        options: [
          { text: 'Here is the shop list with names and phone numbers. Sort it.', why: 'Personal data.' },
          { text: 'I have a sheet with columns Name, Phone, Market. Write a formula to sort it by Market.' },
          { text: 'Here\'s our bank login so you can check the data.', why: 'Never share credentials.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s placeholder line.',
        tiles: ['Customer', 'A', 'paid', '[AMOUNT]'],
        distractors: ['Kofi'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Hidden sensitive detail, or harmless?',
        groups: ['Sensitive', 'Harmless'],
        items: [
          { text: 'A phone number in an email signature', group: 0 },
          { text: 'The word "pilot"', group: 1 },
          { text: 'A client\'s unreleased results', group: 0 },
          { text: 'Today\'s date', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s pre-paste check.',
        lines: ['Read the whole text', 'Find never-paste items', 'Replace with placeholders', 'Then paste'],
      },
      {
        kind: 'mcq',
        prompt: 'A client asked you to keep their plan private. Can you paste it into an unapproved tool?',
        options: [
          { text: 'No; the promise of privacy travels with the data' },
          { text: 'Yes, AI doesn\'t count', why: 'It\'s sharing with a third party.' },
          { text: 'Only part of it', why: 'Not without approval.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which of the six items do you handle most at work? Where might it be hiding in your documents?',
    starters: ['I handle...', 'It hides in...'],
  },
  deepen: { title: 'Try it today', summary: 'Before your next AI paste, scan the text for the six never-paste items and replace any you find.' },
  notes: 'List reflects common data-protection categories (e.g. NDPA 2023 Nigeria, Data Protection Act 2012 Ghana, GDPR). Follow your employer\'s policy.',
};

export default lesson;
