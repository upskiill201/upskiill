import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Chapter Challenge: Chidi shows Miracle the bank offer. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the bank offer',
  summary: 'Week 2, Monday, 8:30 a.m. Chidi asks for five minutes. He shows Miracle his phone: an offer from a bank in Victoria Island. Thirty percent more. "I\'m telling you because you actually asked me stuff last week. I have until Friday."',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 1 tool in one live moment',
    'Respond to a resignation risk without panic or bribes',
    'Find out what would really make someone stay',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 2, Monday, 8:30 a.m.',
      beats: [
        { speaker: 'chidi', text: 'Thirty percent more. Bigger office. I\'m only telling you because you actually asked me stuff last week. I have until Friday.' },
        { speaker: 'narrator', text: 'Chidi is the best agent on the team. If he leaves seven weeks before rollout, the northern clinics plan goes with him. Miracle\'s first instinct is to run to Folake for a counter-offer.' },
        { speaker: 'narrator', text: 'Her second thought: he told her. He didn\'t have to. He\'s giving her a chance. You\'re with Miracle.' },
      ],
    },
  ],
  apply: {
    scenario: 'Monday, 8:30 a.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Miracle say first?',
        options: [
          { text: '"Thank you for telling me. That means a lot. Can I ask: is it mainly the money, or is it something else?"' },
          { text: '"I\'ll get Folake to match it."', why: 'Before knowing if money is even the reason.' },
          { text: '"You can\'t leave before rollout."', why: 'Pressure. He\'ll leave sooner.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 tool helps?',
        groups: ['Stay interview', 'Three needs', 'Fair pay'],
        items: [
          { text: '"What would make you stay?"', group: 0 },
          { text: 'He\'s bored: competence', group: 1 },
          { text: 'Check his pay against the market', group: 2 },
          { text: '"What might tempt you to go?"', group: 0 },
          { text: 'A hard problem to own', group: 1 },
          { text: 'Fair pay is the floor', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'chidi',
        message: 'Honestly? The money is nice. But I\'m bored out of my mind here.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Everyone gets bored sometimes.', why: 'Dismisses the real reason.' },
          { text: 'The bank will be boring too.', why: 'Might be true. Not your argument to make.' },
          { text: 'Then let me be honest too. I can check your pay is fair. And I have a problem nobody\'s cracked: 40 clinics in the north. Would you want to lead it?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Chidi\'s hungriest need is ___. (one word)',
        answers: ['competence', 'Competence', 'growth', 'challenge'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s response in order.',
        lines: ['Thank him for telling her', 'Ask what\'s really behind it', 'Check his pay is fair', 'Offer a real challenge, honestly'],
      },
      {
        kind: 'mcq',
        prompt: 'Why not lead with a counter-offer?',
        options: [
          { text: 'Afiya can\'t afford it', why: 'Maybe, but that\'s not the main point.' },
          { text: 'Counter-offers are illegal', why: 'They\'re not.' },
          { text: 'If boredom is the reason, more money keeps him bored, just for longer' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s message to Folake. Which line breaks Chapter 1?',
        lines: [
          'Chidi has a bank offer; he told me himself.',
          'Let\'s offer him 40% more, today, to beat it.',
          'His pay looks below market; can we review it fairly?',
        ],
        bug: 1,
        fix: 'His real issue is boredom; I want to offer him the northern clinics.',
        explanation: 'A money race doesn\'t fix boredom, and it skips asking why.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the tool.',
        pairs: [
          ['"Thank you for telling me."', 'Trust from Week 1'],
          ['"Is it the money, or something else?"', 'Stay interview'],
          ['The northern clinics', 'Competence'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Chidi says he\'ll think about it until Friday. What should Miracle do this week?',
        options: [
          { text: 'Remind him daily that Friday is coming', why: 'Pressure pushes him out.' },
          { text: 'Make the challenge real: brief him on the northern clinics and get the pay review started' },
          { text: 'Start interviewing replacements', why: 'Too early, and he\'ll notice.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1, in one line.',
        template: 'Fix what [[1]], ask why they [[2]], and feed the hungriest [[3]].',
        blanks: [['frustrates', 'blocks'], ['stay'], ['need']],
        distractors: ['bribe', 'leave'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s question.',
        tiles: ['Is', 'it', 'the', 'money,', 'or', 'something', 'else?'],
        distractors: ['only'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever thought about leaving a job, team or course? Was it really the money, or something else? What would have made you stay?',
    starters: ['I thought about leaving because...', 'I\'d have stayed if...'],
  },
  deepen: {
    title: 'Next: Week 2',
    summary: 'Chidi says he\'ll decide by Friday. Meanwhile, Miracle notices something: the team talks about clinics as "tickets", never as people. Nobody on Clinic Success has ever seen what Afiya does for a patient. Chapter 2: Why does this matter?',
  },
  notes: 'Chapter 1 challenge. Responding to resignation risk with stay-interview questions, fair-pay checks and competence-building challenge rather than reactive counter-offers. Fictional events.',
};

export default lesson;
