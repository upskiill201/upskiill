import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6. Step-by-step: interests, not positions (Fisher & Ury, Getting to Yes). */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Find the interest behind the no',
  summary: 'Friday. Remi goes back to Wanjiku. Her position is "I check every refund by hand." Remi\'s position is "approvals must be faster." Two walls. Tey shows him how to look behind them.',
  minutes: 12,
  outcomes: [
    'Tell a position from an interest',
    'Find options that meet both sides\' interests',
    'Agree a small test instead of a big promise',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'From two walls to one plan, in five steps',
      steps: [
        { title: '1. Name the positions', body: 'A position is what someone says they want. Wanjiku: "Every refund checked by hand." Remi: "Faster approvals." Positions clash.' },
        { title: '2. Ask why, to find the interests', body: 'An interest is WHY they want it. Wanjiku: a clean audit, and her name protected. Remi: customers paid in five days. Roger Fisher and William Ury, in Getting to Yes, say: focus on interests, not positions.' },
        { title: '3. Find the shared interest', body: 'Both want Synergix to keep customers AND pass audit. Say it out loud: "We both want refunds that are fast and safe."' },
        { title: '4. Invent options together', body: 'Before choosing, list several: sample-check refunds under KSh 5,000; auto-approve repeat customers with clean records; a second checker on busy days. Brainstorm first, judge later.' },
        { title: '5. Agree a small test', body: '"Let\'s try the sample-check for two weeks and show audit the results." A test is easier to say yes to than a permanent change, and it produces evidence.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Remi and Wanjiku, round two',
      before: { label: 'Positions', text: 'Remi: "Approvals need to be faster." Wanjiku: "Every refund gets checked." Remi: "But..." Wanjiku: "Every. Refund."' },
      after: { label: 'Interests', text: 'Remi: "We both want fast and audit-safe. What if we sample-check the small ones for two weeks and show audit the results?" Wanjiku: "...Show me the numbers on the small ones."' },
      notes: ['Positions are walls. Interests are doors.', 'A shared interest turns opponents into partners.', 'A two-week test is easier to say yes to than forever.'],
    },
  ],
  apply: {
    scenario: 'Friday, Finance, round two.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Name the positions', 'Ask why: find the interests', 'Find the shared interest', 'Invent options together', 'Agree a small test'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a position and an interest?',
        options: [
          { text: 'A position is what they want; an interest is why they want it' },
          { text: 'They mean the same thing', why: 'They don\'t. That\'s the whole point.' },
          { text: 'Interests are for money, positions for people', why: 'No.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Position or interest?',
        groups: ['Position', 'Interest'],
        items: [
          { text: '"Every refund checked by hand."', group: 0 },
          { text: 'A clean audit report', group: 1 },
          { text: '"Approvals must be faster."', group: 0 },
          { text: 'Customers paid within five days', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'wanjiku',
        message: 'And if the sample-check misses a bad refund?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'It won\'t.', why: 'He can\'t promise that.' },
          { text: 'That\'s audit\'s problem.', why: 'It\'s her name. It\'s her problem.' },
          { text: 'Good question. Let\'s keep hand-checking anything over KSh 5,000 and anything flagged. Can we look at last year\'s small-refund errors together?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Fisher and Ury: focus on interests, not ___. (one word)',
        answers: ['positions', 'Positions'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why propose a two-week test?',
        options: [
          { text: 'To trick her into a permanent change', why: 'An honest test, with an honest review.' },
          { text: 'Because six weeks is too long', why: 'It\'s about lowering the risk of saying yes.' },
          { text: 'It\'s easier to say yes to, and it produces evidence' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s options list. Which line breaks step 4?',
        lines: [
          'Sample-check refunds under KSh 5,000.',
          'That one\'s rubbish; next.',
          'Auto-approve repeat customers with clean records.',
        ],
        bug: 1,
        fix: 'A second checker on busy days.',
        explanation: 'Judging ideas while brainstorming kills the good ones before they\'re said.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the line.',
        pairs: [
          ['Shared interest', '"We both want fast and safe."'],
          ['Invent options', '"What if we... or we..."'],
          ['Small test', '"Two weeks, then show audit."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Positions are [[1]]. Interests are [[2]].',
        blanks: [['walls'], ['doors']],
        distractors: ['windows', 'roofs'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the shared interest.',
        tiles: ['We', 'both', 'want', 'fast', 'and', 'safe.'],
        distractors: ['cheap'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a disagreement you\'re in. What\'s each side\'s position? What might each side\'s interest be? Is there a shared one?',
    starters: ['Their position: ...', 'Their interest might be...', 'Shared: ...'],
  },
  deepen: {
    title: 'Ask why twice',
    summary: 'Next time someone gives you a firm "no" or "must", ask "what\'s important to you about that?" twice. The second answer is usually the real interest.',
  },
  notes: 'Roger Fisher & William Ury (with Bruce Patton), Getting to Yes (1981; 3rd ed. 2011): focus on interests not positions; invent options for mutual gain; separate inventing from deciding. Pilot/test as a low-risk commitment: standard change practice. Fictional figures.',
};

export default lesson;
