import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 9 — "I failed" vs. "not yet, and here's what I'll change". Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: '"Not yet"',
  summary: 'Clinton\'s cousin asks how the Njangi Pay thing went. Clinton tries two different answers in his head. They\'re about the same facts, and they lead to two very different weeks.',
  minutes: 11,
  outcomes: ['Describe a setback as a step, not an ending', 'Name what you\'ll change', 'Keep your story moving forward'],
  learn: [
    {
      kind: 'compare',
      title: 'Two ways to tell it',
      before: { label: '"I failed"', text: '"I didn\'t get it. I\'m just not good enough for those companies. There\'s no point applying to places like that."\n\nThe story ends there. And a story that ends tends to stop him applying, which makes it come true.' },
      after: { label: '"Not yet"', text: '"I didn\'t get it this time. It was close, and they said I was light on testing, so I\'m adding tests to my sync. They\'re hiring more graduates later this year, and I\'ve got other conversations going."\n\nSame facts. But the story continues: what happened, what he\'s changing, what\'s next.' },
      notes: [
        '"Not yet" keeps the story going.',
        'Name the one thing you\'re changing.',
        'End on a next step, not a verdict.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Same facts, different story. What happened, what I\'m changing, what\'s next.',
    },
  ],
  apply: {
    scenario: 'Clinton tells the story to his cousin.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does the "I failed" story tend to come true?',
        options: [
          { text: 'It stops him applying, so nothing changes' },
          { text: 'It\'s magic', why: 'It changes what he does next.' },
          { text: 'It doesn\'t', why: 'It often stops people trying.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the "not yet" story in order.',
        lines: ['What happened', 'What I\'m changing', 'What\'s next'],
      },
      {
        kind: 'sortGroups',
        prompt: '"I failed" story, or "not yet" story?',
        groups: ['Not yet', 'I failed'],
        items: [
          { text: 'I didn\'t get it this time', group: 0 },
          { text: 'There\'s no point trying', group: 1 },
          { text: 'I\'m adding tests to my sync', group: 0 },
          { text: 'I\'m just not good enough', group: 1 },
          { text: 'I\'ve got other conversations going', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that ends the story.',
        lines: ['It was close.', 'So I\'ll never apply to fintech again.', 'They\'re hiring more graduates later.'],
        bug: 1,
        explanation: 'A verdict ends the story. Name a next step instead.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My cousin asks, "So did you get the Njangi Pay job?" What do I say?',
        options: [
          { text: '"Not this time. It was close; I\'m working on testing, and I\'ve got other things going."' },
          { text: '"No, I\'m a failure."', why: 'Same facts, better story.' },
          { text: '"Yes." (it\'s a lie)', why: 'Never lie. Tell the "not yet" version.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each verdict to a "not yet" line.',
        pairs: [
          ['I\'m not good enough', 'It was close this time'],
          ['There\'s no point', 'I\'ve got other conversations going'],
          ['I\'m bad at testing', 'I\'m adding tests to my sync'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should Clinton\'s story end?',
        options: [
          { text: 'On a next step' },
          { text: 'On a verdict about himself', why: 'End on a step.' },
          { text: 'On who\'s to blame', why: 'End on a step.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the story shape.',
        template: 'What [[1]], what I\'m changing, what\'s [[2]].',
        blanks: [['happened'], ['next']],
        distractors: ['hurt', 'over', 'wrong'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete the phrase: "Not ___." (one word)',
        answers: ['yet'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps him moving, or stops him?',
        groups: ['Moving', 'Stops'],
        items: [
          { text: 'One small project this week', group: 0 },
          { text: 'No more applications ever', group: 1 },
          { text: 'Checking back with Njangi Pay later', group: 0 },
          { text: 'Deciding fintech isn\'t for him on day one', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Tell a setback of yours in the "not yet" shape: what happened, what you\'re changing, what\'s next.',
    starters: ['What happened:', 'What\'s next:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'The next time someone asks about a setback, practise the three-part "not yet" answer out loud.',
  },
  notes: '"Not yet" framing popularised by Carol Dweck\'s growth-mindset writing; presented as a communication tool. Research on mindset interventions shows mixed, often small effects, so no claims about outcomes are made.',
};

export default lesson;
