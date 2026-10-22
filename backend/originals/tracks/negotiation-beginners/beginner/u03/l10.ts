import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 10. Unit Challenge: the bakery quote. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the bakery quote',
  summary: 'Ada sends the quote. Mrs Okon replies: "My budget is ₦100,000." Ada doesn\'t panic, doesn\'t discount, and finds a deal. Everything from Chapter 3.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Answer a budget objection without simply dropping the price', 'Use everything from Chapter 3 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The reply',
      html: '<p>Ada\'s quote: <em>"The logo is ₦150,000 to ₦180,000, depending on revisions and files. That includes three concepts, two rounds of changes, and every file you need for signs, bags and Instagram."</em></p><p>Mrs Okon: <em>"I love your work, but my budget is ₦100,000."</em></p><p>Ada asks what matters most. Mrs Okon: the sign for the shop front, and having it before the Christmas rush. She doesn\'t need many changes.</p><p>Ada offers two options:</p><ul><li><strong>₦100,000:</strong> two concepts, one round of changes, sign and Instagram files.</li><li><strong>₦120,000:</strong> three concepts, two rounds, every file, ready in two weeks.</li></ul><p>Mrs Okon picks <strong>₦120,000</strong>, with half paid upfront, and offers to put "Logo by Ada" on the shop\'s Instagram.</p>',
    },
    {
      kind: 'story',
      title: 'Ping',
      beats: [
        { speaker: 'ada', text: '₦60,000 just arrived. Upfront! I\'ve never been paid upfront.' },
        { speaker: 'lucia', text: 'You held the price and changed the package. Now the rent, with the same skills.' },
        { speaker: 'tey', text: 'That\'s Chapter 3: go first when you know the range, anchor with a reason, bolster your range and hold the silence. Next: win-win.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 3 challenge: the bakery quote.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Mrs Okon says her budget is ₦100,000. What did Ada do first?',
        options: [
          { text: 'Dropped to ₦100,000 for the same work', why: 'That\'s a pure discount.' },
          { text: 'Refused', why: 'She looked for a deal.' },
          { text: 'Asked what mattered most to her' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Half of ₦120,000 paid upfront. How much is that, in naira?',
        answers: ['60000', '60,000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which option includes this?',
        groups: ['₦100,000', '₦120,000'],
        items: [
          { text: 'Two concepts', group: 0 },
          { text: 'Three concepts', group: 1 },
          { text: 'One round of changes', group: 0 },
          { text: 'Every file, ready in two weeks', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ada\'s walk-away was ₦90,000 and her goal ₦150,000. How did ₦120,000 do?',
        options: [
          { text: 'Below her walk-away', why: '₦120,000 is above ₦90,000.' },
          { text: 'Well above her walk-away, with less work than the full package' },
          { text: 'Above her goal', why: 'It\'s below ₦150,000, but for less work.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I have just said ₦100,000 for the full package?',
        prompt: "Lucía's best reply?",
        options: [
          { text: 'Yes, it\'s kinder.', why: 'It\'s a discount that devalues her work.' },
          { text: 'You should have said ₦200,000.', why: 'The range was well judged.' },
          { text: 'No. Same work for less teaches her your price is soft. Less work for less keeps your price honest.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Chapter 3 lesson to the move.',
        pairs: [
          ['"What\'s your number?"', 'Buy time if not ready'],
          ['Anchors', 'The first number pulls'],
          ['How to make an ask', 'Number, reason, silence'],
          ['Ranges', 'Bottom = your goal'],
          ['Scripts', '"What part feels too much?"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The move.',
        template: 'Hold the [[1]], change the [[2]].',
        blanks: [['price'], ['package', 'scope']],
        distractors: ['phone', 'customer'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada\'s goal was ₦150,000. The deal was ₦120,000. How far below the goal, in naira?',
        answers: ['30000', '30,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s reply to "my budget is ₦100,000" is the mistake?',
        lines: [
          'Thank you, that helps.',
          'What matters most to you about the logo?',
          'OK, ₦100,000 for everything, no problem.',
          'Here are two options.',
        ],
        bug: 2,
        fix: 'Delete it: offer the two options.',
        explanation: 'Same work for less is a discount.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s answer to a budget objection.',
        lines: ['Thank her', 'Ask what matters most', 'Offer options at different prices', 'Agree payment terms'],
      },
    ],
  },
  reflect: {
    prompt: 'Next time someone says "my budget is lower", what could you take out of the package instead of dropping the price?',
    starters: ['I could take out...', 'I would offer...'],
  },
  deepen: {
    title: 'Price and scope',
    summary: 'Professionals rarely cut a price for the same work. They change the scope: fewer options, fewer changes, a longer deadline. It keeps the price honest and the client happy.',
  },
  notes: 'Chapter 3 challenge (fictional): quote ₦150,000–₦180,000; budget ₦100,000; options ₦100,000 (2 concepts, 1 round) or ₦120,000 (3 concepts, 2 rounds, all files, 2 weeks); chosen ₦120,000, ₦60,000 upfront; Instagram credit.',
};

export default lesson;
