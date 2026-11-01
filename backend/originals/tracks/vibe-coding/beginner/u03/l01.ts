import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story: the thermometer says $18,000. They have $1,800. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '$18,000',
  summary: 'Six weeks to go. Car wash, 11:40 a.m. The screen flashes "WE\'RE GOING TO D.C.!" and the street cheers. Ruth counts the cash box: $1,800. Something added up very wrong.',
  minutes: 12,
  outcomes: [
    'Explain why "it looks right" isn\'t a check',
    'Spot that numbers can be glued together like words',
    'Decide what to do when the AI\'s work is wrong in public',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The car wash, 11:40 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Two pledges come in: $1,200 from Crescent Bakery, $600 from the Cajun Grill. Ruth types them. The gold bar shoots to the top. The screen flashes WE\'RE GOING TO D.C.!' },
        { speaker: 'benny', text: 'WE DID IT! Miss B, we did it!' },
        { speaker: 'ruth', text: '(counting) The cash box and pledges come to one thousand eight hundred dollars.' },
        { speaker: 'narrator', text: 'Hazel looks at the total on screen. It says $1,200,600.' },
        { speaker: 'tey', text: '1,200 and 600 weren\'t added. They were glued together, like two words: "1200" then "600". To the code, Ruth\'s numbers were text.' },
        { speaker: 'hazel', text: 'But it looked right all week. And the AI said it was done.' },
        { speaker: 'tey', text: 'It looked right with one pledge. Nobody tested two. This whole chapter is about how to catch this before the street does.' },
      ],
      choice: {
        prompt: 'Thirty people are cheering. What should Hazel do?',
        options: [
          { text: 'Say nothing, fix it tonight.', outcome: 'Three parents post "We made it!" online. Taking that back on Monday is much harder.' },
          { text: 'Turn the screen round and say: "Small bug, we\'re at $1,800. Still a long way to go, keep washing!"', outcome: 'A groan, a laugh, then a cheer. Two more cars pull in. Honest and fast.', best: true },
          { text: 'Blame the AI loudly.', outcome: 'True-ish, but the band still needs the right number. And she approved it.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'The cash box vs the screen.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did $1,200 and $600 show $1,200,600?',
        options: [
          { text: 'The numbers were treated as text and glued together' },
          { text: 'Ruth typed it wrong', why: 'She typed 1200 and 600. The code joined them.' },
          { text: 'The internet was slow', why: 'Nothing to do with the internet.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If "50" and "25" are glued as text, what do you get?',
        answers: ['5025'],
        placeholder: 'Number',
      },
      {
        kind: 'chatReply',
        from: 'hazel',
        message: 'It worked all week with one pledge. How did nobody notice?',
        prompt: 'Tey\'s answer?',
        options: [
          { text: 'Bad luck.', why: 'It\'s not luck. One pledge can\'t show an adding bug.' },
          { text: 'You only ever tested one pledge. The bug only shows up when two are added.' },
          { text: 'The AI hid it.', why: 'Nobody hid anything. Nobody tested two.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A real check, or just "looks right"?',
        groups: ['Real check', 'Looks right'],
        items: [
          { text: 'Add $1,200 and $600; expect $1,800', group: 0 },
          { text: 'The bar is gold and pretty', group: 1 },
          { text: 'The AI said "Done!"', group: 1 },
          { text: 'Add three pledges and compare to a calculator', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: '"It [[1]] right" is not a check. A check has real numbers and an [[2]] answer.',
        blanks: [['looks'], ['expected']],
        distractors: ['feels', 'easy'],
      },
      {
        kind: 'mcq',
        prompt: 'Who is responsible for the wrong total on the screen?',
        options: [
          { text: 'Only the AI', why: 'It wrote the bug, but Hazel approved it without testing two pledges.' },
          { text: 'Ruth, for typing', why: 'Ruth typed exactly the right numbers.' },
          { text: 'Hazel owns it: she approved it. The fix is better checking, not blame' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Hazel\'s test notes would have caught the bug?',
        lines: ['Opened the page: looks good.', 'Added one pledge: $50 shows $50.', 'Never added two pledges.'],
        bug: 2,
        fix: 'Add two pledges: $50 + $25 should show $75.',
        explanation: 'The missing test is the bug\'s hiding place.',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Let\'s just leave it. People are happy!',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Happy people will donate less if they think we\'re done. And the bus company won\'t take $1.2 million in pretend money.' },
          { text: 'Okay, leave it.', why: 'A fundraiser that shows the wrong total loses trust and money.' },
          { text: 'Delete the app forever.', why: 'One bug, one fix.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the right total for $1,200 + $600 + $250?',
        options: [
          { text: '$1,200,600,250', why: 'That\'s the glued-text bug.' },
          { text: '$2,050' },
          { text: '$1,850', why: 'Check the maths: 1,200 + 600 = 1,800; + 250 = 2,050.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the lesson.',
        pairs: [
          ['"It looked right all week"', 'Looking isn\'t testing'],
          ['"The AI said it was done"', 'Done is a claim'],
          ['"Small bug, we\'re at $1,800"', 'Own it, fix it, say it plainly'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the tool you built in Chapter 2. What\'s one situation you never tried (two entries, a blank, a big number)?',
    starters: ['I never tried...'],
  },
  deepen: {
    title: 'On your computer: try to break it',
    summary: 'Open your Chapter 2 tool. Try three things you haven\'t: two or more entries, a blank entry, and a very big number. Write down anything that looks wrong. Don\'t fix it yet.',
  },
  notes: 'JavaScript "+" concatenates when either side is a string: 0 + "1200" + "600" = "01200600" (shown here as $1,200,600). Input values from HTML forms are strings. Story only.',
};

export default lesson;
