import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: thinking out loud on a problem you can't solve. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Thinking out loud',
  summary: 'Remi went silent on the duplicate-orders problem. Ada, who sits on interview panels at her startup, shows him five steps for any problem you can\'t immediately solve.',
  minutes: 12,
  outcomes: [
    'Talk through a problem instead of going silent',
    'Clarify before solving',
    'Ask for a hint without losing face',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps when you\'re stuck',
      steps: [
        { title: '1. Repeat and clarify', body: '"So I\'m finding orders that appear twice in a million. Is an order the same if the ID matches, or every field?"' },
        { title: '2. Say the simple approach first', body: '"The simplest way: compare every order with every other. That works but it\'s slow for a million."' },
        { title: '3. Try a small example', body: '"With five orders, I could keep a list of IDs I\'ve seen and check each new one against it."' },
        { title: '4. Improve it out loud', body: '"If I use a set instead of a list, checking is fast, so one pass through the million works."' },
        { title: '5. Say where you\'re stuck, or ask', body: '"I\'m not sure how to handle memory if it doesn\'t fit. Could I get a hint?" Asking is fine; silence isn\'t.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Clarify, say the simple approach, try a small example, improve it out loud, then say where you\'re stuck.',
    },
  ],
  apply: {
    scenario: 'Stuck on a problem.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Repeat and clarify', 'Say the simple approach first', 'Try a small example', 'Improve it out loud', 'Say where you\'re stuck, or ask'],
      },
      {
        kind: 'mcq',
        prompt: 'Why say the slow, simple approach first?',
        options: [
          { text: 'It shows you can solve it, and gives you something to improve' },
          { text: 'To waste time', why: 'It\'s a foothold.' },
          { text: 'Interviewers want slow code', why: 'They want to see your path to better.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Remi\'s line.',
        pairs: [
          ['Clarify', '"Is an order the same if the ID matches?"'],
          ['Simple first', '"Compare every order with every other."'],
          ['Small example', '"With five orders..."'],
          ['Ask', '"Could I get a hint?"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps the interviewer see your thinking, or hides it?',
        groups: ['Shows thinking', 'Hides it'],
        items: [
          { text: 'Saying your approach out loud', group: 0 },
          { text: 'A minute of silence', group: 1 },
          { text: 'Trying a small example', group: 0 },
          { text: 'Guessing an answer without explaining', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Won\'t asking for a hint count against me?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'Not if you\'ve shown your thinking first. Many interviewers expect to give hints. Silence counts against you more.' },
          { text: 'Yes, never ask.', why: 'Silence is worse.' },
          { text: 'Ask for the answer straight away.', why: 'Show your approach first.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Asking for a hint is [[1]]; long [[2]] is not.',
        blanks: [['fine', 'OK', 'ok'], ['silence']],
        distractors: ['rude', 'talking'],
      },
      {
        kind: 'mcq',
        prompt: 'Why use a set instead of a list here?',
        options: [
          { text: 'Checking whether an item is in a set is fast, so one pass works' },
          { text: 'Sets look nicer', why: 'It\'s about speed.' },
          { text: 'Lists can\'t hold IDs', why: 'They can; they\'re slower to search.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s approach would worry an interviewer?',
        lines: [
          'Let me check what counts as a duplicate.',
          'The simple way is to compare every pair.',
          'I\'ll just write code silently for ten minutes.',
          'A set would make checking fast.',
        ],
        bug: 2,
        fix: 'Talk through each step as I write.',
        explanation: 'Silent coding hides how he thinks.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In step 3, how many orders does Remi use as a small example?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Clarify', 'Improve'],
        items: [
          { text: '"Is a duplicate the same ID or every field?"', group: 0 },
          { text: '"A set would make this one pass."', group: 1 },
          { text: '"Do orders arrive in any order?"', group: 0 },
          { text: '"I could sort first, then compare neighbours."', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Pick any problem you find hard. Talk through the five steps out loud for two minutes.',
    starters: ['Clarify:...', 'Simple approach:...'],
  },
  deepen: {
    title: 'Not just for coders',
    summary: 'Case interviews, numeracy tests and "how would you estimate..." questions work the same way. Interviewers often care more about your approach than the final answer.',
  },
  notes: 'Think-aloud technique is standard technical-interview advice. Fictional duplicate-orders problem (hash set, one pass).',
};

export default lesson;
