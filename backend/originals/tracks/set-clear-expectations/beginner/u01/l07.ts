import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Step-by-step: writing a brief someone else can deliver. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'A brief they can deliver',
  summary: 'Day 3, 7 a.m. Arjun rewrites the brief before anyone wakes up. Four words won\'t do. Forty pages didn\'t either. Tey gives him a shape for what goes in between.',
  minutes: 12,
  outcomes: [
    'Write a brief in six parts',
    'Keep it to one screen',
    'Make the first step obvious',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'A brief in six parts',
      steps: [
        { title: '1. What, in one sentence', body: '"Build the product page for Mr Rao\'s shop." One thing. If you need two sentences, it might be two tasks.' },
        { title: '2. Why it matters', body: '"80% of Mr Rao\'s customers shop on cheap phones, in Hindi." The why lets people make good choices you didn\'t think to mention.' },
        { title: '3. What done looks like', body: 'The definition of done from lesson 4. Five boxes, written, with an example screenshot.' },
        { title: '4. The limits', body: 'What\'s fixed: "Use my design system. No new libraries." What\'s theirs: "How you lay out the size picker is up to you."' },
        { title: '5. By when, and first check-in', body: '"First version by Day 5. Show me a rough version tomorrow at 4." An early check catches a wrong turn after one day, not five.' },
        { title: '6. Who to ask', body: '"Stuck? Message me any time before 9 p.m. Mr Rao\'s questions go through me." People need to know where to take questions.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Arjun\'s brief to Kavya',
      before: { label: 'Day 1', text: 'Kavya: products.' },
      after: { label: 'Day 3', text: 'Product page for Mr Rao\'s shop. Why: 80% of buyers use cheap phones, many in Hindi. Done: the 5-box checklist plus the screenshot. Fixed: my design system. Yours: the size picker. Rough version tomorrow 4 p.m. Stuck? Message me before 9.' },
      notes: ['Still short: it fits on one phone screen.', 'Every part answers a question Kavya would otherwise have to guess.', 'The first check-in is tomorrow, not in five days.'],
    },
  ],
  apply: {
    scenario: 'Day 3, 7 a.m., the rewrite.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the six parts in order.',
        lines: ['What, in one sentence', 'Why it matters', 'What done looks like', 'The limits', 'By when, and first check-in', 'Who to ask'],
      },
      {
        kind: 'mcq',
        prompt: 'Why include "why it matters"?',
        options: [
          { text: 'To fill space', why: 'It changes their decisions.' },
          { text: 'It helps people make good choices you didn\'t think to mention' },
          { text: 'To motivate them', why: 'Maybe, but mainly it guides choices.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Fixed, or their call?',
        groups: ['Fixed', 'Their call'],
        items: [
          { text: 'Use Arjun\'s design system', group: 0 },
          { text: 'How to lay out the size picker', group: 1 },
          { text: 'No new libraries', group: 0 },
          { text: 'Which photo angle to show first', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Rough version tomorrow? It won\'t be pretty.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Perfect. Ugly and early beats beautiful and wrong. I just want to see we\'re on the same track.' },
          { text: 'Then wait until it\'s pretty.', why: 'Then a wrong turn costs five days.' },
          { text: 'It needs to be perfect.', why: 'An early check isn\'t a final review.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A good brief fits on one phone ___. (one word)',
        answers: ['screen', 'Screen', 'page'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why say who to ask, and until when?',
        options: [
          { text: 'To limit questions', why: 'It\'s to invite them, within reason.' },
          { text: 'People need to know where questions go, and that asking is welcome' },
          { text: 'It\'s polite', why: 'It\'s more than polite: it unblocks people.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s brief to Joel. Which part is still missing?',
        lines: [
          'Cart with guest checkout and UPI, no login.',
          'Done: the 5-box checklist.',
          'Due: sometime before Diwali.',
        ],
        bug: 2,
        fix: 'First version Day 5. Rough version tomorrow 4 p.m.',
        explanation: '"Sometime before Diwali" has no check-in and no real deadline.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to the line.',
        pairs: [
          ['Why', '"80% use cheap phones."'],
          ['Limits', '"Use my design system."'],
          ['Who to ask', '"Message me before 9."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Ugly and [[1]] beats beautiful and [[2]].',
        blanks: [['early'], ['wrong', 'late']],
        distractors: ['right', 'never'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first check-in.',
        tiles: ['Rough', 'version', 'tomorrow', 'at', '4.'],
        distractors: ['perfect'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite a brief you\'ve given or received using the six parts. Which part was missing before?',
    starters: ['What: ...', 'The missing part was...'],
  },
  deepen: {
    title: 'One-screen brief',
    summary: 'Next time you hand over work, write the six parts in one message that fits on a phone screen. Add one example.',
  },
  notes: 'Brief structure synthesises definition of done (Scrum Guide), purpose/intent (commander\'s intent, Chapter 2), decision rights and early check-ins (standard delegation guidance). Fictional figures (80% mobile).',
};

export default lesson;
