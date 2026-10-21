import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 7. Myth or Fact: impulse buying is a willpower problem. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"It\'s just weak willpower"',
  summary: 'After the boots, Kofi calls himself weak. But impulse buying is something shops, apps and our own moods work on together. Five myths about impulse buying, tested.',
  minutes: 10,
  outcomes: [
    'Explain why impulse buying isn\'t just a willpower problem',
    'See the roles of design, mood and timing',
    'Stop blaming yourself and start changing the situation',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        {
          text: 'Impulse buying happens because some people have weak willpower.',
          isFact: false,
          explain: 'Myth, mostly. Mood, tiredness, the time of day and the way shops and apps are designed all play big parts. Change the situation and the behaviour changes.',
        },
        {
          text: 'Shops and apps are deliberately designed to encourage quick purchases.',
          isFact: true,
          explain: 'Fact. One-click buying, countdown timers, "only 2 left" and saved card details are all designed to remove friction. Chapter 3 takes them apart.',
        },
        {
          text: 'Most people make impulse purchases sometimes.',
          isFact: true,
          explain: 'Fact. Surveys in many countries find that most shoppers report buying things on impulse. It\'s normal. The question is how often, how big, and whether you regret it.',
        },
        {
          text: 'If you just try harder, you\'ll stop impulse buying.',
          isFact: false,
          explain: 'Myth. Trying harder at 2 a.m., tired and upset, rarely works. A rule set in daytime ("no buying after 11 p.m.") works much better.',
        },
        {
          text: 'People who feel ashamed about spending tend to spend less.',
          isFact: false,
          explain: 'Myth. Shame often leads to hiding and avoiding, and sometimes more spending to feel better. Curiosity ("why did I do that?") helps more.',
        },
      ],
    },
    {
      kind: 'story',
      title: 'Weak',
      beats: [
        { speaker: 'kofi', text: 'I saved for 16 weeks and then threw GH₵480 away in 40 seconds. I\'m weak.' },
        { speaker: 'miracle', text: 'You were tired, upset, alone at 2 a.m., and looking at a page built by experts to make you tap. That\'s not weak. That\'s outnumbered.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Impulse buying is you plus your mood plus the design of the shop. Change the situation, not just your effort.',
    },
  ],
  apply: {
    scenario: 'Weak, or outnumbered?',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Impulse buying is just weak willpower', group: 0 },
          { text: 'Apps are designed for quick purchases', group: 1 },
          { text: 'Trying harder at 2 a.m. works well', group: 0 },
          { text: 'Most people buy on impulse sometimes', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Miracle mean by "outnumbered"?',
        options: [
          { text: 'Tiredness, mood, timing and design were all pushing him at once' },
          { text: 'There were too many boots', why: 'She meant the forces pushing him to buy.' },
          { text: 'He was weak', why: 'She said the opposite.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each force to its example.',
        pairs: [
          ['Mood', 'Upset after the penalty'],
          ['Timing', '2:14 a.m.'],
          ['Design', 'A countdown and one-tap buying'],
          ['Tiredness', 'Can\'t sleep, still scrolling'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'yaw',
        message: 'I\'m just weak with money. Can\'t help it.',
        prompt: 'Kofi\'s best reply?',
        options: [
          { text: 'Same here at 2 a.m. But change the situation: no apps after 11, card details deleted. It\'s not about being strong.' },
          { text: 'Yes, you are.', why: 'Unkind and unhelpful.' },
          { text: 'Just try harder.', why: 'That\'s the myth.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Change the [[1]], not just your [[2]].',
        blanks: [['situation'], ['effort']],
        distractors: ['shop', 'friends'],
      },
      {
        kind: 'findBug',
        prompt: 'Which response to an impulse buy makes the next one more likely?',
        lines: [
          'Ask: what was going on when I bought it?',
          'Set a daytime rule for next time.',
          'Tell myself I\'m hopeless and hide the purchase.',
        ],
        bug: 2,
        fix: 'Be curious: log it and look for the pattern.',
        explanation: 'Shame and hiding feed the cycle. Curiosity breaks it.',
      },
      {
        kind: 'mcq',
        prompt: 'Which rule would have stopped the 2:14 a.m. boots?',
        options: [
          { text: '"No buying anything after 11 p.m. Screenshot it and decide in the morning."' },
          { text: '"Try harder."', why: 'Effort runs out at 2 a.m.' },
          { text: '"Only buy boots on sale."', why: 'They were on "sale". That was the trap.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'If Kofi\'s rule is "no buying after 11 p.m.", was 2:14 a.m. before or after 11 p.m.? (Type before or after.)',
        answers: ['after'],
        placeholder: 'before / after',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a curious response to an impulse buy.',
        lines: ['Notice it without shame', 'Log the details', 'Find the pattern', 'Change the situation'],
      },
      {
        kind: 'mcq',
        prompt: 'Who designs the countdown timers and "only 2 left" messages?',
        options: [
          { text: 'Teams whose job is to get people to buy' },
          { text: 'Nobody; they\'re random', why: 'They\'re carefully designed.' },
          { text: 'The government', why: 'Sellers design them.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of your last regretted purchase. What was the situation: your mood, the time, the design of the app or shop?',
    starters: ['My mood was...', 'It was...', 'The app or shop...'],
  },
  deepen: {
    title: 'Willpower research',
    summary: 'Early research suggested willpower is a limited resource that gets "used up". Later attempts to repeat some of those studies found weaker effects, and the idea is debated. What\'s clearer: people who avoid temptation in the first place, by arranging their surroundings, do better than people who rely on resisting it.',
  },
  notes: 'Ego depletion (Baumeister et al. 1998; Vohs & Faber 2007 on impulse buying) and replication debate (Hagger et al. 2016). Situational strategies: Duckworth, Gendler & Gross (2016). Impulse buying prevalence: widely reported in consumer surveys; stated qualitatively.',
};

export default lesson;
