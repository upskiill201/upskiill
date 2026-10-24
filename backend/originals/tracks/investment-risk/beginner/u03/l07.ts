import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 7. Chat with Tey: getting safer as the date nears. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Getting safer as the date gets closer',
  summary: 'Arjun\'s home deposit pot is five years away. What happens in year four? Tey explains how people usually shift money from growth to safety as a goal approaches.',
  minutes: 12,
  outcomes: [
    'Explain shifting from growth to safety as a goal nears',
    'Plan a simple shift for a five-year goal',
    'Avoid the "one more good year" trap',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'A pot\'s right risk changes over time. Your home deposit is five years away now. In year four, it\'s one year away, and that\'s a different pot.', replies: ['So what do I do?'] },
        { tey: 'A common approach: the further away a goal is, the more of its pot can be in things that grow but swing. As the date gets closer, you gradually move more of it to safer places.', replies: ['Gradually, not all at once?'] },
        { tey: 'Gradually is usually easier. For example: each year, move a slice to safer places. By the final year, most or all of it is safe. That way one bad year near the end can\'t wreck it.', replies: ['What if markets are doing great in year four?'] },
        { tey: 'That\'s the trap: "one more good year". People delay moving to safety because things are going up, then a fall arrives just before they need the money. Stick to the plan.', replies: ['Does this apply to retirement too?'] },
        { tey: 'Yes. Many retirement products and pension plans do this automatically, sometimes called a glide path or lifecycle approach. Check how yours works.', replies: ['And Appa\'s pot?'] },
        { tey: 'Two months away: fully safe from the start. No glide needed. Short goals stay safe the whole way.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'As a goal gets closer, move its money gradually toward safety. By the final year, most of it should be safe. Don\'t wait for "one more good year".',
    },
  ],
  apply: {
    scenario: 'Getting safer.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a five-year deposit pot\'s shift.',
        lines: ['Years 1 to 2: more growth', 'Year 3: move a slice to safety', 'Year 4: move more to safety', 'Year 5: mostly or all safe'],
      },
      {
        kind: 'mcq',
        prompt: 'Why move gradually rather than all at once?',
        options: [
          { text: 'It\'s required by law', why: 'It\'s a practical approach.' },
          { text: 'It earns more', why: 'It reduces risk; it doesn\'t promise more.' },
          { text: 'It\'s easier, and avoids betting everything on one day\'s prices' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Year four and markets are flying. Maybe I wait one more year before moving to safety.',
        prompt: 'What does Grace say?',
        options: [
          { text: 'That\'s the trap Tey warned about. Stick to the plan you made when you were calm.' },
          { text: 'Yes, wait.', why: 'A fall in year five could wreck the deposit.' },
          { text: 'Put more in.', why: 'More risk right before the deadline.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Needs a glide toward safety, or safe from the start?',
        groups: ['Glide toward safety', 'Safe from the start'],
        items: [
          { text: 'A home deposit in 5 years', group: 0 },
          { text: 'Appa\'s operation in 2 months', group: 1 },
          { text: 'Retirement in 30 years', group: 0 },
          { text: 'Emergency fund', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The trap.',
        template: 'The "one more [[1]] year" trap: delaying safety until a [[2]] arrives.',
        blanks: [['good'], ['fall']],
        distractors: ['bad', 'raise'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each term to its meaning.',
        pairs: [
          ['Glide path', 'Gradually safer as the date nears'],
          ['"One more good year"', 'Delaying safety, risking a late fall'],
          ['Lifecycle approach', 'A plan that shifts with age'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step in a deposit plan breaks the idea?',
        lines: [
          'Year 3: move a slice to safety.',
          'Year 4: move more to safety.',
          'Year 5: move everything into growth for a final boost.',
        ],
        bug: 2,
        fix: 'Year 5: mostly or all safe.',
        explanation: 'The final year is when a fall hurts most.',
      },
      {
        kind: 'mcq',
        prompt: 'What should Arjun check about any pension plan he joins?',
        options: [
          { text: 'Its logo', why: 'Check how it manages risk over time.' },
          { text: 'Nothing', why: 'How it shifts matters.' },
          { text: 'Whether and how it shifts toward safety with age' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A five-year goal. In year four, how many years are left?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why doesn\'t Appa\'s pot need a glide path?',
        options: [
          { text: 'It\'s too small', why: 'It\'s about timing.' },
          { text: 'It\'s two months away, so it stays safe the whole time' },
          { text: 'It does', why: 'It\'s safe from the start.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'For a goal you have in three to five years, when would you start moving it toward safety?',
    starters: ['My goal is...', 'I\'d start moving it...'],
  },
  deepen: {
    title: 'Target-date approaches',
    summary: 'Some funds around the world are built around a target year and shift from growth to safety automatically as it approaches. Whatever the product, the idea is the same: less risk as the date nears.',
  },
  notes: 'Glide path / lifecycle concept, general. No products named.',
};

export default lesson;
