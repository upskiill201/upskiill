import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: notice and ask',
  summary: 'Hidden negotiations, the five parts, what not asking costs, and taming the awkwardness. A quick check before Ada rewrites her rent text.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Spot negotiations and their parts', 'Work out the cost of not asking'],
  learn: [
    {
      kind: 'story',
      title: 'Saturday',
      beats: [
        { speaker: 'ada', text: 'OK. I\'ve written my first line. I said it twice. I\'m... excited.' },
        { speaker: 'remi', text: 'Excited? You sound terrified. Do the quiz first, then text him.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: notice and ask.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'A negotiation, or not?',
        groups: ['Negotiation', 'Not'],
        items: [
          { text: 'Agreeing a deadline with a client', group: 0 },
          { text: 'Watching a film alone', group: 1 },
          { text: 'Asking a flatmate to split a bill', group: 0 },
          { text: 'Brushing your teeth', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the goal of a negotiation?',
        options: [
          { text: 'An agreement both sides prefer to no deal' },
          { text: 'Beating the other side', why: 'Beaten people don\'t keep deals.' },
          { text: 'Avoiding all conflict', why: 'Some disagreement is normal.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '5% of ₦400,000. How much a month, in naira?',
        answers: ['20000', '20,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to the example.',
        pairs: [
          ['What they want', 'A higher rent'],
          ['The reason', 'His costs rose'],
          ['If no deal', 'Finding a new tenant'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I\'m so nervous I want to cancel.',
        prompt: "Remi's best reply?",
        options: [
          { text: 'That\'s just your heart getting ready. Call it excitement and read your first line.' },
          { text: 'Cancel then.', why: 'The cost of not asking is real.' },
          { text: 'Wait until you\'re calm.', why: 'That may never come.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Why gaps grow.',
        template: 'Raises are usually a [[1]], so a higher [[2]] gets bigger raises.',
        blanks: [['percentage'], ['base', 'salary', 'pay']],
        distractors: ['gift', 'bonus'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s message is an awkwardness habit?',
        lines: [
          'Good morning, Mr Adeyemi.',
          'Sorry, sorry, I know this is annoying.',
          'I\'d like to stay in the flat.',
          'Can we talk about the new rent?',
        ],
        bug: 1,
        fix: 'Delete it: a polite greeting is enough.',
        explanation: 'Apologising says the ask is wrong.',
      },
      {
        kind: 'typeAnswer',
        prompt: '₦20,000 a month for a year. How much, in naira?',
        answers: ['240000', '240,000'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the five parts of a negotiation.',
        lines: ['Two sides who need each other', 'Something each side wants', 'The reasons behind it', 'What happens if you don\'t agree', 'A deal both can accept'],
      },
      {
        kind: 'mcq',
        prompt: 'What do people usually get wrong about direct requests?',
        options: [
          { text: 'They underestimate how often others will say yes' },
          { text: 'They overestimate yes', why: 'Research found the opposite.' },
          { text: 'Nothing', why: 'Askers guess too low.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What would you ask for this week if you weren\'t nervous? Write it as one sentence.',
    starters: ['I would ask...'],
  },
  notes: 'Checkpoint for Chapter 1 lessons 1-4. 5% of 400,000 = 20,000; ×12 = 240,000.',
};

export default lesson;
