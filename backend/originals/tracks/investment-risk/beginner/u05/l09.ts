import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. Tap to explore: the risk map v5. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Arjun\'s risk map v5: the whole system',
  summary: 'The final map: every pot, every rule, every red flag, and the bugs in his own head. It\'s the document Arjun wishes someone had handed him the day the money landed. Tap through version 5.',
  minutes: 11,
  outcomes: [
    'Read a complete personal risk plan',
    'See how pots, spreading, rules and red flags fit together',
    'Build your own final map',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun\'s risk map v5',
      text: 'POTS: Appa\'s operation (paid). Emergency fund ₹3,60,000, safe. Home deposit ₹3,00,000, getting safer yearly. Long term ₹4,40,000 plus ₹15,000 a month, spread broadly, low fees, regulated, rebalanced every January. FIRST QUESTIONS: How far could it fall? Could it go to zero? How fast can I get out? RED FLAGS: guaranteed high returns. "No risk". Not on the official list. Recruitment bonuses. Lock-ins with vague exits. Urgency. MY BUGS: FOMO, so 24-hour rule. Loss aversion, so no chasing. Overconfidence, so check the base rate. FAMILY RULE: big decisions wait 24 hours and get a second opinion. IF SCAMMED: report to 1930, tell the bank, keep evidence, ignore recovery offers.',
      hotspots: [
        { phrase: 'Appa\'s operation (paid)', note: 'Chapter 3\'s pots, working exactly as planned.' },
        { phrase: 'spread broadly, low fees, regulated, rebalanced every January', note: 'Chapter 4 in one line.' },
        { phrase: 'How far could it fall? Could it go to zero? How fast can I get out?', note: 'The sticky note from Chapter 1, still above his desk.' },
        { phrase: 'Recruitment bonuses', note: 'The sign that new money is what keeps it alive.' },
        { phrase: 'FOMO, so 24-hour rule', note: 'Debugging his own head, the way he debugs code.' },
        { phrase: 'big decisions wait 24 hours and get a second opinion', note: 'Agreed with Amma and Appa after the temple-friend call.' },
        { phrase: 'report to 1930', note: 'India\'s national cyber-fraud helpline. Use your country\'s equivalent.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A complete risk map has pots by date, a spreading plan, first questions, red flags, your own mind bugs, a family rule and an "if scammed" plan.',
    },
  ],
  apply: {
    scenario: 'Reading map v5.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each map section to its chapter.',
        pairs: [
          ['First questions', 'Chapter 1: what risk means'],
          ['Pots by date', 'Chapter 3: time and goals'],
          ['Spread broadly, low fees', 'Chapter 4: spreading risk'],
          ['Red flags and bugs', 'Chapter 5: too good to be true'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Red flag on the map, or healthy sign?',
        groups: ['Red flag', 'Healthy sign'],
        items: [
          { text: 'Guaranteed high returns', group: 0 },
          { text: 'On the official list', group: 1 },
          { text: 'Recruitment bonus', group: 0 },
          { text: 'Fees disclosed', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which pot is the only one exposed to bigger market swings?',
        options: [
          { text: 'The long-term pot' },
          { text: 'The emergency fund', why: 'That stays safe.' },
          { text: 'All of them', why: 'Only the long-term pot.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'What\'s the most useful line on the map?',
        prompt: 'Arjun\'s best answer?',
        options: [
          { text: 'The crypto slice.', why: 'Not the most useful.' },
          { text: 'None.', why: 'Several protect him.' },
          { text: 'The 24-hour rule. Almost every bad decision I nearly made was a same-day decision.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'If scammed.',
        template: 'Report fast, tell the [[1]], keep [[2]], ignore recovery offers.',
        blanks: [['bank'], ['evidence']],
        distractors: ['scammer', 'quiet'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Total in the emergency fund, home deposit and long-term pots: ₹3,60,000 + ₹3,00,000 + ₹4,40,000?',
        answers: ['1100000', '11,00,000', '1,100,000', '₹11,00,000'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line on a copy of v5 doesn\'t belong?',
        lines: [
          'Red flag: "no risk".',
          'Family rule: 24 hours and a second opinion.',
          'Exception: offers from friends skip the checks.',
        ],
        bug: 2,
        fix: 'No exceptions: the checks apply to everyone.',
        explanation: 'Schemes spread through friends.',
      },
      {
        kind: 'mcq',
        prompt: 'Why list his own mind bugs on the map?',
        options: [
          { text: 'To feel bad', why: 'To catch them.' },
          { text: 'Knowing his weak spots makes them easier to catch' },
          { text: 'It\'s required', why: 'It\'s useful.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many versions of the map did Arjun make?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order all five map versions.',
        lines: ['v1: three questions', 'v2: five kinds of risk', 'v3: pots and dates', 'v4: spread', 'v5: the whole system'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your own v5: one line each for pots, spreading, red flags, your bugs and a family rule.',
    starters: ['Pots:...', 'Spreading:...', 'Red flags:...', 'My bugs:...', 'Family rule:...'],
  },
  deepen: {
    title: 'Share the red flags',
    summary: 'The red-flag list is the most shareable part of the map. Sending it to a family group could protect someone who\'ll never take this course.',
  },
  notes: 'Map v5 (fictional). 3.6 + 3 + 4.4 = 11 lakh. 1930: India.',
};

export default lesson;
