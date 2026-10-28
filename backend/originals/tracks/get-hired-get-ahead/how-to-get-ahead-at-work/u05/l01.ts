import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 5 · Lesson 1 — opens the chapter: quit to "go into product", or test it first. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The leap or the bridge',
  summary: 'Almost a year in. Aïcha\'s associate product manager role is opening next quarter. David has a dramatic idea: "Quit, do a three-month product bootcamp in Lagos, come back a PM!" Clinton is tempted. The outline of his career depends on what he does next.',
  minutes: 11,
  outcomes: ['Compare a big leap with a tested move', 'Explain why testing first reduces risk', 'Choose a strategic first step'],
  learn: [
    {
      kind: 'story',
      title: 'David\'s idea',
      beats: [
        { speaker: 'narrator', text: 'Eleven months in. A Friday evening. David is excited again.' },
        { speaker: 'david', text: 'Bro. Quit. Do a product bootcamp in Lagos. Three months. Come back a product manager. Bold moves!' },
        { speaker: 'clinton', text: 'Or... Aïcha\'s associate PM role opens next quarter. At my own company. Where people already know my work.' },
        { speaker: 'tey', text: 'Career changes can be big leaps or tested bridges. Leaps sometimes work, but they risk money, momentum and the advantages you\'ve built. Testing first usually costs less and teaches more.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Test the switch inside Njangi Pay first: more product work now, then apply for Aïcha\'s role.',
            outcome: 'He keeps his salary, his reputation and his sponsors, and builds real product evidence. When the role opens, he\'s the obvious internal candidate.',
            best: true,
          },
          {
            text: 'Quit and do the bootcamp with no plan for after.',
            outcome: 'Three months of savings gone, a certificate, and no product experience on real users. He\'s competing with hundreds of bootcamp graduates.',
          },
          {
            text: 'Forget product; stay a developer because change is scary.',
            outcome: 'Safe, but his energy audit keeps saying the same thing. In a year he\'ll face the same question, with less energy.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Test before you leap. Use the advantages you\'ve built: your company, your reputation, your sponsors.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> how career changes really work, mapping transferable skills, telling your change story, moving internally, changing from outside, money trade-offs, leaving well and starting again. Your kit piece: a change strategy. And at the end, Clinton sits on the other side of the table.</p>',
    },
  ],
  apply: {
    scenario: 'David\'s bootcamp idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is testing first usually less risky than a big leap?',
        options: [
          { text: 'It\'s always slower', why: 'It\'s cheaper and more informative.' },
          { text: 'It costs less and teaches you more before you commit' },
          { text: 'Leaps never work', why: 'Sometimes they do; testing is safer.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Advantage of moving inside Njangi Pay, or not?',
        groups: ['Advantage', 'Not an advantage'],
        items: [
          { text: 'People already know his work', group: 0 },
          { text: 'Sponsors like Paul and Ngozi', group: 0 },
          { text: 'Spending all his savings', group: 1 },
          { text: 'Keeping his salary while testing', group: 0 },
          { text: 'Starting with no relationships', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best reply to David.',
        from: 'david',
        message: 'Bold moves, bro! Quit and do the bootcamp!',
        options: [
          { text: 'You\'re right, I quit tonight.', why: 'Test first; use his advantages.' },
          { text: 'Change is too scary.', why: 'Test it; don\'t freeze.' },
          { text: 'Bold is fine, but I\'ve got a real chance here where people know my work. I\'ll test it first, then apply.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the riskiest part of David\'s plan.',
        lines: ['Learn about product.', 'Quit with no plan for after the bootcamp.', 'Become a product manager eventually.'],
        bug: 1,
        explanation: 'No plan after means risking savings and momentum.',
      },
      {
        kind: 'mcq',
        prompt: 'What happens if Clinton ignores product entirely?',
        options: [
          { text: 'He\'ll likely face the same question later, with less energy' },
          { text: 'Nothing ever', why: 'His energy audit keeps pointing there.' },
          { text: 'He\'ll be promoted to CEO', why: 'Ha. The question returns.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Test inside first', 'The obvious internal candidate'],
          ['Quit for a bootcamp', 'Savings gone, no real product experience'],
          ['Ignore product', 'Same question next year'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: '[[1]] before you [[2]].',
        blanks: [['Test'], ['leap']],
        distractors: ['Quit', 'sleep', 'hide'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many months is David\'s bootcamp? (a number)',
        answers: ['3', 'three'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s Clinton\'s best first step?',
        options: [
          { text: 'Resign on Monday', why: 'Test first.' },
          { text: 'Do nothing', why: 'Take a small step.' },
          { text: 'More product work now, then apply for the internal role' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Leap or bridge?',
        groups: ['Leap', 'Bridge'],
        items: [
          { text: 'Quit for a bootcamp', group: 0 },
          { text: 'Internal transfer', group: 1 },
          { text: 'Product tasks alongside engineering', group: 1 },
          { text: 'Move abroad with no job', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a direction you\'re tempted to leap into? What would a smaller, tested first step look like?',
    starters: ['I\'m tempted to...', 'A tested first step:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'List the advantages you already have where you are (people, reputation, skills) that a big leap would throw away.',
  },
  notes: 'Opens L3 Ch5 (founder topic: How to Change Careers Strategically). Outline choice: quit to "go into product" with no plan, or test it inside Njangi Pay first.',
};

export default lesson;
