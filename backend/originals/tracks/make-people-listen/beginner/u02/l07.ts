import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. "Myth or Mic Drop": stories stick, statistics slip (Made to Stick classroom exercise). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Myth or Mic Drop: stories stick, statistics slip',
  summary: 'Arjun believes facts speak for themselves. "I showed Mr Rao that 23.7% of checkouts fail under load. Surely that\'s convincing?" Mr Rao doesn\'t remember the number. He remembers the story of the woman who couldn\'t buy her daughter\'s birthday present.',
  minutes: 11,
  outcomes: [
    'Know why stories are remembered more than statistics',
    'Pair a number with a story or a person',
    'Avoid the opposite mistake: stories with no facts',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Good facts speak for themselves; you don\'t need stories.', isFact: false, explain: 'Myth. In a classroom exercise described in the book "Made to Stick", students gave short persuasive speeches. Afterwards, 63% of listeners remembered the stories, and only 5% remembered any single statistic.' },
        { text: 'People tend to remember stories about a specific person more than numbers about thousands.', isFact: true, explain: 'Mic drop. One customer who couldn\'t buy a birthday present is easier to picture, and remember, than "23.7% of checkouts".' },
        { text: 'Numbers are useless; always use stories instead.', isFact: false, explain: 'Myth. Numbers give stories weight and honesty. The magic is the pair: a story people feel, and a number that shows it\'s not a one-off.' },
        { text: 'Speeches that focus on one point are remembered better than speeches with ten.', isFact: true, explain: 'Mic drop. In the same exercise, the most memorable speakers stressed a single point, often through a story.' },
        { text: 'Being polished and fluent is what makes a speech memorable.', isFact: false, explain: 'Myth. In that exercise, polish didn\'t predict what people remembered. Stories, emotion and one clear point did.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'arjun', text: 'So... the 23.7% doesn\'t matter?' },
        { speaker: 'tey', text: "It matters. It's just not what people remember. Try this: tell Mr Rao about ONE customer, then give the number." },
        { speaker: 'arjun', text: 'Last sale, a woman in Chennai tried to buy her daughter\'s birthday present four times. The checkout failed every time. She bought it elsewhere. And she wasn\'t alone: about one in four checkouts failed that day.' },
        { speaker: 'tey', text: "Mic. Drop. Story first, number second. Now Mr Rao can see it AND trust it." },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A story makes people feel it. A number makes them trust it. Use both: story first, then the number.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Myth or Mic Drop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'In the "Made to Stick" classroom exercise, what did listeners remember most?',
        options: [
          { text: 'The stories (63%) far more than any single statistic (5%)' },
          { text: 'The statistics', why: 'Only 5% remembered any single statistic.' },
          { text: 'The most polished speakers\' words', why: 'Polish didn\'t predict memory.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or mic drop?',
        groups: ['Myth', 'Mic drop'],
        items: [
          { text: 'Facts speak for themselves', group: 0 },
          { text: 'One clear point beats ten', group: 1 },
          { text: 'Numbers are useless', group: 0 },
          { text: 'A specific person sticks better than a percentage', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s story-plus-number in order.',
        lines: ['A woman in Chennai tried to buy her daughter\'s present four times.', 'The checkout failed every time.', 'She bought it elsewhere.', 'And about one in four checkouts failed that day.'],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Shouldn\'t I just give the exact number? 23.7% is more accurate than "one in four".',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Always use three decimal places.', why: 'Precision nobody remembers doesn\'t help.' },
          { text: '"About one in four" is easier to picture and still honest. Put 23.7% in the written details.' },
          { text: 'Round it to "loads".', why: 'Too vague. "About one in four" keeps the meaning.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A story makes people feel it. A number makes them ___ it. (one word)',
        answers: ['trust', 'believe'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the risk of a story with no number at all?',
        options: [
          { text: 'None, stories are always enough', why: 'A number shows it\'s a pattern.' },
          { text: 'It\'s too memorable', why: 'Not really a risk.' },
          { text: 'People may think it\'s a one-off' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s pitch for more budget. Which line will nobody remember?',
        lines: [
          'Last month, a customer\'s refund failed three times; she left a one-star review.',
          'The refund system has a 4.83% failure rate with a standard deviation of 1.2.',
          'That\'s about one in twenty refunds failing.',
        ],
        bug: 1,
        fix: 'Delete it, or move it to the written details.',
        explanation: 'The story and "one in twenty" do the work. The decimal statistics belong in an appendix.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['About four chunks', 'Working memory limit'],
          ['Signposting', '"Three things. First..."'],
          ['Rank your points', 'Most urgent first'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rule.',
        template: '[[1]] first, then the [[2]].',
        blanks: [['Story'], ['number', 'statistic']],
        distractors: ['Decimals', 'diagram'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a number people can picture.',
        tiles: ['About', 'one', 'in', 'four', 'checkouts', 'failed.'],
        distractors: ['23.7%'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a fact you want someone to take seriously. Which real person or moment could you tell them about first?',
    starters: ['The fact is...', 'The story is...'],
  },
  deepen: {
    title: 'One person, one number',
    summary: 'Next time you need to convince someone, prepare one short story about a real person (with permission, or anonymised), and one rounded number. Lead with the story.',
  },
  notes: 'Heath & Heath (2007), Made to Stick: Stanford classroom exercise (Chip Heath) — in 1-minute speeches, students used ~2.5 statistics; 1 in 10 told a story; afterwards 63% remembered stories, 5% any individual statistic; polish did not predict stickiness. Presented as a classroom exercise, not a controlled study. Chennai customer is fictional.',
};

export default lesson;
