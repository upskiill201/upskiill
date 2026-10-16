import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: 14 pieces, 14 names',
  summary: 'Day 8. The ownership list is pinned in the team chat: 14 pieces, one owner each, one approver, and the intent for each written in one line. Joel kept Kavya\'s checkout button and his own checkout. Nobody argued. Quick check.',
  minutes: 11,
  milestone: 'CHECKPOINT',
  outcomes: ['Use ownership, intent and decision tools without notes', 'Connect them to Chapter 1'],
  learn: [
    {
      kind: 'story',
      title: 'Day 8, 11:30 a.m.',
      beats: [
        { speaker: 'joel', text: 'I used Kavya\'s button and my checkout. Took two hours to join them.' },
        { speaker: 'kavya', text: 'And I didn\'t ask Arjun about the colours. I checked the list: layout is mine. I just told Joel.' },
        { speaker: 'arjun', text: 'That\'s the first day nobody has needed me for anything. It\'s weirdly great.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: Day 8.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did nobody need Arjun on Day 8?',
        options: [
          { text: 'Arjun was on holiday', why: 'He was right there.' },
          { text: 'Everyone knew what they owned, what they could decide and why' },
          { text: 'They stopped working', why: 'They joined two features.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put writing one RACI line in order.',
        lines: ['Name the piece', 'Who does it', 'Who approves it', 'Who to ask, who to tell'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 2 tool is it?',
        groups: ['Ownership', 'Intent', 'Decisions'],
        items: [
          { text: 'One owner per piece', group: 0 },
          { text: '"Bring back old customers for Diwali."', group: 1 },
          { text: '"If you clash, I decide by noon."', group: 2 },
          { text: 'One approver only', group: 0 },
          { text: '"Never hide the Pay button."', group: 1 },
          { text: 'Kavya decides layout', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Who owns the "out of stock" message? It\'s not on the list.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Whoever has time.', why: 'Diffusion of responsibility, again.' },
          { text: 'Both of you.', why: 'Two owners: two out-of-stock messages.' },
          { text: 'Good spot, thank you. Yours: it\'s on the product page. Adding it to the list now.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'When everyone owns it, ___ owns it. (one word)',
        answers: ['nobody', 'Nobody', 'no-one'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What are the three parts of good intent?',
        options: [
          { text: 'Why, what success looks like, what must not break' },
          { text: 'Who, where, how much', why: 'Not those.' },
          { text: 'Steps one, two and three', why: 'That\'s an instruction.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'A new line on the list. Which part breaks Chapter 2?',
        lines: [
          'Order emails: Joel does it.',
          'Approved by: Arjun or Kavya, whoever sees it first.',
          'Intent: the customer knows the order arrived.',
        ],
        bug: 1,
        fix: 'Approved by: Arjun.',
        explanation: 'Two possible approvers is two A\'s.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the tool to what it means.',
        pairs: [
          ['Definition of done', 'A shared finish checklist'],
          ['Commander\'s intent', 'Why, and what success is'],
          ['RACI', 'Who does, owns, advises, hears'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Kavya changed the colours without asking. Was that right?',
        options: [
          { text: 'No, she should always ask Arjun', why: 'Then Arjun becomes the bottleneck.' },
          { text: 'Yes: layout is hers to decide, and she told Joel after' },
          { text: 'No, nobody should change colours', why: 'Layout was her decision.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 so far.',
        template: 'One [[1]] per piece. Give the [[2]]. Say who [[3]].',
        blanks: [['owner'], ['intent', 'why'], ['decides']],
        distractors: ['meeting', 'blames'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s surprise.',
        tiles: ['Nobody', 'needed', 'me', 'today.'],
        distractors: ['hated'],
      },
    ],
  },
  reflect: {
    prompt: 'If you stepped away from your team or group for a day, would they know what they own and what they can decide? What would they need?',
    starters: ['They would know...', 'They\'d need...'],
  },
  deepen: {
    title: 'The day off test',
    summary: 'Imagine you\'re unreachable tomorrow. Write the three things your team would need to know to keep going. That\'s what\'s missing from your expectations.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapter 1.',
};

export default lesson;
