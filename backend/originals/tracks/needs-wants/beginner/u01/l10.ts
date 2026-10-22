import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10. Unit Challenge: find the creep. Cliffhanger: Mexico City. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: find the creep',
  summary: 'Ngozi\'s fabric business had its best quarter ever. Her savings didn\'t. She asks Ada to find her creep. Use everything from Chapter 1. Then Ada\'s phone rings: Lucía, from Mexico City, with an offer that changes everything.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Find lifestyle creep in someone else\'s spending', 'Use the line, the before-and-after and the treadmill together'],
  learn: [
    {
      kind: 'story',
      title: 'The call',
      beats: [
        { speaker: 'narrator', text: 'Saturday. Ngozi slides her phone across the table. "Best quarter ever. ₦150,000 more profit a month. And somehow I\'m saving nothing. Find my creep, please."' },
        { speaker: 'ada', text: 'Two columns. Same categories. Let\'s go.' },
        { speaker: 'narrator', text: 'That evening, a video call. Lucía, in Mexico City, in front of a wall of chili-lime packets.' },
        { speaker: 'narrator', text: '"Ada! Our company has a booth at the design conference here in six months. I want you on it. Nopal pays the ticket and half your travel. The other half is yours: about ₦900,000. Can you do it?"' },
        { speaker: 'ada', text: 'Yes! Absolutely! ...I\'ll... figure it out.' },
        { speaker: 'narrator', text: 'She hangs up and opens her savings app. ₦20,000 a month. Six months. ₦120,000.' },
        { speaker: 'tey', text: 'That\'s Chapter 1: lifestyle creep, the need–want line, need inflation and the treadmill. Ada said yes, as she always does. Now she has to find ₦900,000. Chapter 2: needs, wants and the space between. First, Ngozi.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 1 challenge: Ngozi\'s creep. Profit up ₦150,000 a month. Savings: ₦50,000 before, ₦10,000 now.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'Profit up ₦150,000, saving down ₦40,000. How much more is Ngozi spending?',
        answers: ['190000', '190,000', '₦190,000', '₦190000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Ada finds Ngozi\'s creep.',
        lines: ['Pick the month before and last month', 'Use the same categories', 'Subtract line by line', 'Check it adds up', 'List the growers'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Ngozi\'s growers. Business need, or personal creep?',
        groups: ['Business need', 'Personal creep'],
        items: [
          { text: 'More fabric stock for more orders', group: 0 },
          { text: 'Rides to the market every day instead of the bus', group: 1 },
          { text: 'Delivery packaging for more orders', group: 0 },
          { text: 'A new handbag every month', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Ngozi says "I need rides now, I\'m a business owner." What\'s the honest test?',
        options: [
          { text: 'Do other business owners take rides?', why: 'Comparison, not need.' },
          { text: 'What would actually happen if she took the bus for a month?' },
          { text: 'None; business owners always need rides', why: 'Some trips do; every trip doesn\'t.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Chapter 1 idea to Ngozi\'s situation.',
        pairs: [
          ['Lifestyle creep', 'More profit, less saved'],
          ['Need inflation', '"I need rides now"'],
          ['The treadmill', 'The new handbags stop feeling special'],
          ['Basic version', 'The bus for most market trips'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Ngozi, your business grew, and your spending grew more. Want to try my two columns?',
        prompt: 'Why is this a good way for Ada to start?',
        options: [
          { text: 'It\'s kind, specific, and offers the tool, not a lecture' },
          { text: 'It\'s rude', why: 'She asked for help; this is gentle.' },
          { text: 'It doesn\'t matter how she says it', why: 'Tone decides if Ngozi listens.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule for Ngozi\'s next good quarter.',
        template: 'Decide where the extra [[1]] before it [[2]].',
        blanks: [['goes'], ['arrives', 'lands']],
        distractors: ['hides', 'leaves'],
      },
      {
        kind: 'findBug',
        prompt: 'Which conclusion about Ngozi is wrong?',
        lines: [
          'Some new costs are real business needs.',
          'Some are personal upgrades that crept in.',
          'Since profit went up, all new spending is fine.',
        ],
        bug: 2,
        fix: 'Separate business needs from personal creep.',
        explanation: 'More profit doesn\'t make personal creep a business need.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada needs ₦900,000 in 6 months. How much a month?',
        answers: ['150000', '150,000', '₦150,000', '₦150000'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Ada saves ₦20,000 a month. How short is she each month?',
        options: [
          { text: '₦150,000', why: 'That\'s the target. She already saves ₦20,000.' },
          { text: '₦130,000' },
          { text: '₦20,000', why: 'That\'s what she saves now.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Ada said "Yes! Absolutely!" before checking. Which part of her character is that?',
        options: [
          { text: 'She\'s careful with money', why: 'Not in that moment.' },
          { text: 'She hates travel', why: 'She\'s thrilled.' },
          { text: 'She says yes to everything, then panics a little' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Could help Ada find ₦130,000 a month, or not?',
        groups: ['Could help', 'Won\'t help'],
        items: [
          { text: 'Cutting the creep', group: 0 },
          { text: 'Choosing which wants really matter', group: 0 },
          { text: 'Putting the trip on a credit card', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there something big you\'d love to do in the next six months? What would it cost per month?',
    starters: ['I\'d love to...', 'It would cost about... a month'],
  },
  notes: 'Chapter 1 challenge. Ngozi (narrated, fictional numbers): profit +150,000, savings 50,000 → 10,000, spending +190,000. Mexico City: Nopal (Lucía\'s company, per CAST) pays ticket + half travel; Ada\'s half ₦900,000 in 6 months = 150,000/month; gap 130,000/month.',
};

export default lesson;
