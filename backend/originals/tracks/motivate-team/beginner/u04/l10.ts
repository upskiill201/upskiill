import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Chapter Challenge: Folake's bonus for the top ticket-closer. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the bonus',
  summary: 'Week 7, Friday afternoon. Folake has budget. "₦200,000 bonus for whoever closes the most tickets before rollout! That\'ll fire them up!" It would almost certainly go to Chidi. And it would reward exactly the ticket-chasing the team has spent seven weeks moving away from.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 4 tool, and earlier ones, in one live moment',
    'Redesign an incentive so it\'s fair and helps the goal',
    'Say yes to the money, and no to the design',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 7, Friday, 2:00 p.m.',
      beats: [
        { speaker: 'folake', text: '₦200,000 for the top ticket-closer before rollout! You\'ve all been brilliant, let\'s reward it.' },
        { speaker: 'narrator', text: 'Miracle does the maths in her head. Chidi would win. Halima, who spends an hour per Kano clinic, would come last. Bisi would quietly stop teaching people the Ogun trick, because that takes time from her own tickets.' },
        { speaker: 'narrator', text: 'And everyone would start closing easy tickets again. Folake is generous, and she\'s trying to do something nice. You\'re with Miracle.' },
      ],
    },
  ],
  apply: {
    scenario: 'Friday, the bonus idea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Miracle say first?',
        options: [
          { text: '"Thank you, that\'s generous and they\'ll love it. Can I suggest a design that rewards what we\'re trying to do?"' },
          { text: '"No, bonuses are bad."', why: 'Turns down money and a kind boss.' },
          { text: '"Great, Chidi will win."', why: 'Accepts a design that undoes seven weeks.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which earlier tool explains the risk?',
        groups: ['Fairness', 'Rewards', 'Outcome goals'],
        items: [
          { text: 'Halima\'s harder clinics would rank last', group: 0 },
          { text: 'Competing for cash can crowd out helping', group: 1 },
          { text: 'Tickets aren\'t the goal; clinics live are', group: 2 },
          { text: 'One winner, five losers', group: 0 },
          { text: 'Incentives drive quantity, not quality', group: 1 },
          { text: '300 clinics live by rollout', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'What\'s wrong with rewarding the hardest worker?',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Chidi doesn\'t need more money.', why: 'Not her call, and not the point.' },
          { text: 'It\'s unfair to Halima.', why: 'True, but offer the better design too.' },
          { text: 'Nothing, if we measure the right thing. Tickets would reward easy ones and stop people helping each other. What if it\'s a team bonus if we hit 300 clinics live?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Reward the ___ that matters, not the activity. (one word)',
        answers: ['outcome', 'Outcome', 'goal', 'result'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s response in order.',
        lines: ['Thank Folake for the generosity', 'Name the risk with one example', 'Offer a better design', 'Agree how it\'s announced'],
      },
      {
        kind: 'mcq',
        prompt: 'What makes a team bonus for "300 clinics live" better?',
        options: [
          { text: 'It\'s cheaper', why: 'Same budget.' },
          { text: 'Nobody can win it', why: 'It\'s hard but achievable.' },
          { text: 'It rewards the real goal, keeps people helping each other, and is fair to everyone' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s counter-proposal. Which line brings the problem back?',
        lines: [
          'Team bonus, shared equally, if all 300 clinics are live by rollout.',
          'Plus an extra prize for whoever closes the most tickets.',
          'Announced at stand-up, with the clinic count on the board.',
        ],
        bug: 1,
        fix: 'Plus a thank-you lunch for the whole team, whatever happens.',
        explanation: 'The extra ticket prize brings back the race the team left behind.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the design to what it encourages.',
        pairs: [
          ['Top ticket-closer prize', 'Easy tickets, no helping'],
          ['Team bonus for 300 live', 'Helping each other hit the goal'],
          ['Shared equally', 'Fair to every role'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Folake says: "Fine, team bonus. But what about Chidi? He\'s the best." What now?',
        options: [
          { text: 'Give him a secret extra bonus', why: 'Secret extras destroy fairness when found out.' },
          { text: 'Recognise Chidi specifically, his way: the northern clinics, and a bigger problem next quarter' },
          { text: 'Ignore it', why: 'His work deserves recognition, just not a race.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 4, in one line.',
        template: 'Fair, not equal. Seen, one by [[1]]. Reward the team\'s [[2]], not a race.',
        blanks: [['one'], ['goal', 'outcome']],
        distractors: ['all', 'tickets'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s alternative.',
        tiles: ['A', 'team', 'bonus', 'for', '300', 'live.'],
        distractors: ['tickets'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a reward or competition you\'ve seen at work, school or sport. What behaviour did it really encourage? How would you redesign it?',
    starters: ['The reward was...', 'It encouraged...', 'I\'d change it to...'],
  },
  deepen: {
    title: 'Next: Week 8',
    summary: 'The team bonus is announced, and the board says 241 clinics live. Then rollout week begins. On Monday morning, Afiya\'s servers go down for six hours, with 59 clinics still to launch. Chapter 5: Rollout.',
  },
  notes: 'Chapter 4 challenge. Incentive design: rewarding outcomes vs activity (Kerr 1975), competitive individual incentives and helping behaviour, fairness (Adams; Colquitt), overjustification risks (Deci et al. 1999). Fictional events.',
};

export default lesson;
