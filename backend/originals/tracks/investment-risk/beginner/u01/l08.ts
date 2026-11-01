import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 8. Myth or Fact: risk myths. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Risk myths at the dinner table',
  summary: 'Sunday lunch in Mysuru. Arjun\'s uncle, Appa, and cousin Vikram all have firm views on risk. Five of them, tested.',
  minutes: 10,
  outcomes: [
    'Spot common beliefs about risk that mislead',
    'Separate past performance from future promises',
    'Recognise that doing nothing is also a choice',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Land never falls in value.',
          isFact: false,
          explain: 'Myth. Land and property prices can fall, or stay flat for years. Land can also be hard to sell and can have legal or ownership problems. "Never" is the warning word.',
        },
        {
          text: 'Past returns tell you what will happen next.',
          isFact: false,
          explain: 'Myth. Something that rose fast last year can fall next year. Past returns show what was possible, not what\'s promised.',
        },
        {
          text: 'Keeping all your money in cash also has a risk.',
          isFact: true,
          explain: 'Fact. If prices rise faster than the interest, cash slowly loses buying power. Doing nothing is a choice with its own risk.',
        },
        {
          text: 'Higher risk always means higher returns.',
          isFact: false,
          explain: 'Myth. Higher risk means higher returns are possible, along with bigger losses. Many high-risk bets simply lose.',
        },
        {
          text: 'The right amount of risk is different for different money and people.',
          isFact: true,
          explain: 'Fact. Money you need next year and money for retirement need different risk levels. So do a salaried person and a freelancer with uneven income.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Over the sambar',
      beats: [
        { speaker: 'narrator', text: 'His uncle: "Land never falls." Vikram: "Options made me ₹2 lakh last month." Appa, quietly: "And the month before?"' },
        { speaker: 'arjun', text: 'Vikram goes very quiet. Arjun makes a note.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"Never" and "always" are warning words. Past returns aren\'t promises. Higher risk means bigger possible losses, not guaranteed gains. Even cash has a risk.',
    },
  ],
  apply: {
    scenario: 'Lunch in Mysuru.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Land never falls', group: 0 },
          { text: 'Cash has inflation risk', group: 1 },
          { text: 'Higher risk always pays more', group: 0 },
          { text: 'Different money needs different risk', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was Appa\'s question, "And the month before?", so sharp?',
        options: [
          { text: 'He wanted to invest', why: 'He was testing the claim.' },
          { text: 'One good month says nothing about overall results' },
          { text: 'He was being rude', why: 'He was asking the key question.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'My uncle says land never falls.',
        prompt: 'What does Grace say?',
        options: [
          { text: 'Ask him about the three questions: could it fall, could you lose it, how fast could you sell it? "Never" is the word to watch.' },
          { text: 'Then buy land.', why: '"Never" is a warning, not a guarantee.' },
          { text: 'Land is always bad.', why: 'Too absolute the other way.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Warning words.',
        template: '"[[1]]" and "[[2]]" are warning words when people talk about investments.',
        blanks: [['Never', 'never'], ['Always', 'always']],
        distractors: ['Maybe', 'Usually'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['"Land never falls"', 'It can fall and be hard to sell'],
          ['"It went up last year"', 'Past returns aren\'t promises'],
          ['"Cash is completely safe"', 'Inflation slowly eats it'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion is wrong?',
        lines: [
          'Vikram made ₹2 lakh last month.',
          'One month doesn\'t show his overall results.',
          'So options trading is a reliable income.',
        ],
        bug: 2,
        fix: 'One month says nothing about reliability.',
        explanation: 'You need the whole record, losses included.',
      },
      {
        kind: 'mcq',
        prompt: 'Why might a freelancer need different risk levels from a salaried worker?',
        options: [
          { text: 'Freelancers like risk', why: 'It\'s about income stability.' },
          { text: 'Uneven income means they may need more money safe and reachable' },
          { text: 'No reason', why: 'Income stability changes how much risk is sensible.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Cash earns 3%; prices rise 6%. Real return, roughly, in percent?',
        answers: ['-3', '−3', '-3%', '−3%'],
        placeholder: 'A percent',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Arjun handles a strong claim at the table.',
        lines: ['Listen politely', 'Notice "never" or "always"', 'Ask for the whole record', 'Note it for his risk map'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the risk of doing nothing with ₹12 lakh for years?',
        options: [
          { text: 'None at all', why: 'Inflation is a risk.' },
          { text: 'It will vanish', why: 'It\'s buying power that shrinks.' },
          { text: 'Losing buying power to inflation' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which money belief from your family or friends have you never questioned?',
    starters: ['The belief is...', 'Questioning it...'],
  },
  deepen: {
    title: 'Survivorship again',
    summary: 'We hear about the land that tripled and the trade that paid off. We rarely hear about the plot with a title dispute, or the trader who quietly lost everything. Ask about the ones that didn\'t work out too.',
  },
  notes: 'Cast: Arjun, Grace per CAST; uncle, Appa, Vikram narrated. Land risks stated generally.',
};

export default lesson;
