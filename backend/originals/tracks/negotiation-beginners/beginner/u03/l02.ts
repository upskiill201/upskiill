import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Reading: first offers as anchors. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'First offers as anchors',
  summary: 'Why did ₦1,450,000 suddenly feel almost reasonable to Ada? Because ₦1,500,000 came first. Lucía sends her the research on anchors, and what to do when the other side drops one.',
  minutes: 12,
  outcomes: [
    'Know what an anchor is and why it works',
    'See why the side that goes first often does better',
    'Respond to an anchor without being pulled by it',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The pull of the first number',
      html: '<p>In 1974, psychologists Amos Tversky and Daniel Kahneman showed that people\'s estimates are pulled towards any number they see first, even a random one. They called it <strong>anchoring</strong>.</p><p>In negotiation, the first offer is an anchor. Adam Galinsky and Thomas Mussweiler (2001) ran mock negotiations and found that <strong>whichever side made the first offer tended to get a better result</strong>, and that first offers strongly predicted final prices.</p><p>That\'s what happened to Ada. Mr Adeyemi\'s ₦1,500,000 made ₦1,450,000 feel like a big step down. Against the market range (₦1,300,000 to ₦1,450,000), it\'s the very top.</p><p><strong>What to do when they anchor first:</strong></p><ul><li>Don\'t argue about their number. That keeps everyone thinking about it.</li><li>Put your own number on the table soon, with your evidence: "Similar flats nearby rent for ₦1,300,000."</li><li>Galinsky also found it helps to focus on your own goal and their alternatives, not on their number.</li></ul>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The first number pulls everything towards it. Go first when you\'re prepared; if they go first, answer with your own number and evidence.',
    },
  ],
  apply: {
    scenario: 'Anchors.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an anchor in negotiation?',
        options: [
          { text: 'Your walk-away point', why: 'That\'s private; an anchor is put on the table.' },
          { text: 'A final offer', why: 'Anchors come first.' },
          { text: 'A first number that pulls the final deal towards it' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year did Galinsky and Mussweiler publish their first-offer study?',
        answers: ['2001'],
        placeholder: 'A year',
      },
      {
        kind: 'sortGroups',
        prompt: 'A good answer to his anchor, or a weak one?',
        groups: ['Good', 'Weak'],
        items: [
          { text: '"Similar flats nearby rent for ₦1,300,000."', group: 0 },
          { text: '"₦1,500,000 is crazy! Why so high?"', group: 1 },
          { text: 'Naming her own number with evidence', group: 0 },
          { text: 'Asking him to go down "a bit"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to who studied it.',
        pairs: [
          ['Anchoring in estimates', 'Tversky and Kahneman'],
          ['First offers in negotiation', 'Galinsky and Mussweiler'],
          ['BATNA', 'Fisher and Ury'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Why did ₦1,450,000 feel almost OK after ₦1,500,000?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Because it is OK.', why: 'It\'s exactly her walk-away.' },
          { text: 'His first number anchored you. Compare it with the market, not with his ask: ₦1,450,000 is the very top.' },
          { text: 'You were tired.', why: 'It\'s the anchoring effect.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Answering an anchor.',
        template: 'Don\'t argue about their [[1]]. Put your own on the table, with [[2]].',
        blanks: [['number'], ['evidence', 'reasons']],
        distractors: ['anger', 'silence'],
      },
      {
        kind: 'mcq',
        prompt: 'What did Galinsky suggest focusing on when the other side anchors first?',
        options: [
          { text: 'Their number', why: 'That strengthens their anchor.' },
          { text: 'Your fear', why: 'Focus on goals and alternatives.' },
          { text: 'Your own goal and their alternatives' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'What is the top of the market range, in naira?',
        answers: ['1450000', '1,450,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s plan for next Saturday is weakest?',
        lines: [
          'Thank him for meeting again.',
          'Ask why ₦1,500,000 was so high, three times.',
          'Say: similar flats rent for ₦1,300,000.',
          'Offer a two-year lease.',
        ],
        bug: 1,
        fix: 'Move to her own number and evidence.',
        explanation: 'Arguing about his number keeps the anchor in place.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to respond to an anchor.',
        lines: ['Notice the anchor', 'Don\'t argue about it', 'State your number', 'Give your evidence'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a price that felt reasonable only because of a bigger number before it. How did that anchor work?',
    starters: ['The first number was...', 'It made me think...'],
  },
  deepen: {
    title: 'Anchors everywhere',
    summary: 'Shops use anchors too: a "was ₦50,000" label makes ₦35,000 feel cheap. Once you notice anchors, you can ask: compared with the market, is this actually good?',
  },
  notes: 'Tversky & Kahneman (1974), Science 185. Galinsky & Mussweiler (2001), "First offers as anchors: The role of perspective-taking and negotiator focus", JPSP 81(4): the side making the first offer obtained better outcomes; first offers predicted settlements; focusing on the other side\'s alternatives or one\'s own target reduced the anchor\'s effect.',
};

export default lesson;
