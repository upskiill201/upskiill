import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 2. Step-by-step: your point in 30 seconds. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Your point in 30 seconds',
  summary: 'Diego gives Lucía a challenge: say the week\'s update in 30 seconds. She builds it in four steps.',
  minutes: 12,
  outcomes: [
    'Build a spoken point in four steps',
    'Say it in about 30 seconds',
    'Stop when you\'ve made it',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to a 30-second point',
      steps: [
        { title: '1. Write the headline in one sentence', body: '"Chili-lime is 38% above target after eight weeks." If you can\'t write it, you can\'t say it.' },
        { title: '2. Add why it matters', body: '"It\'s our best launch in three years."' },
        { title: '3. Add what you need, if anything', body: '"I need a yes on a bigger reorder by Thursday."' },
        { title: '4. Stop', body: 'Then wait. Silence after a clear point invites questions. Filling it with more detail weakens it.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Headline, why it matters, what you need. Then stop.',
    },
  ],
  apply: {
    scenario: 'Thirty seconds.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the four steps.',
        lines: ['Headline in one sentence', 'Why it matters', 'What you need', 'Stop'],
      },
      {
        kind: 'mcq',
        prompt: 'Why write the headline first?',
        options: [
          { text: 'To read it out word for word', why: 'It\'s to get clear first.' },
          { text: 'No reason', why: 'It tests your clarity.' },
          { text: 'If you can\'t write it in one sentence, you can\'t say it clearly' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which step is this?',
        groups: ['Why it matters', 'What you need'],
        items: [
          { text: '"Our best launch in three years."', group: 0 },
          { text: '"A yes on the reorder by Thursday."', group: 1 },
          { text: '"It beats our target by 38%."', group: 0 },
          { text: '"Two more people on the Guadalajara stock."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many seconds does Diego give Lucía?',
        answers: ['30', 'thirty'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'After I say it, there\'s an awkward silence. So I keep talking.',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Fill every silence.', why: 'It weakens the point.' },
          { text: 'That silence is them thinking. Let it sit. If they want more, they\'ll ask.' },
          { text: 'Leave the room.', why: 'Just wait.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The steps.',
        template: 'Headline, why it [[1]], what you [[2]]. Then stop.',
        blanks: [['matters'], ['need']],
        distractors: ['costs', 'feel'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to Lucía\'s line.',
        pairs: [
          ['Headline', '"38% above target after eight weeks"'],
          ['Why it matters', '"Our best launch in three years"'],
          ['What you need', '"A yes on the reorder by Thursday"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line breaks step 4?',
        lines: [
          'Chili-lime is 38% above target after eight weeks.',
          'It\'s our best launch in three years.',
          'I need a yes on a bigger reorder by Thursday.',
          'Also, the photo shoot, and the agency, and the packaging...',
        ],
        bug: 3,
        fix: 'Stop after the ask.',
        explanation: 'Extra detail after the ask weakens it.',
      },
      {
        kind: 'mcq',
        prompt: 'What should Lucía do if she has nothing to ask for?',
        options: [
          { text: 'Skip step 3: headline, why it matters, stop' },
          { text: 'Invent an ask', why: 'Skip the step.' },
          { text: 'Talk until she thinks of one', why: 'Stop.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'By which day does Lucía need the reorder yes?',
        answers: ['Thursday', 'thursday'],
        placeholder: 'A day',
      },
    ],
  },
  reflect: {
    prompt: 'Write your own 30-second point about this week. Say it out loud and time it.',
    starters: ['Headline:...', 'It took... seconds'],
  },
  deepen: {
    title: 'Thirty seconds is a lot',
    summary: 'At a normal speaking pace, 30 seconds is roughly 60 to 80 words. That\'s enough for a headline, a reason and an ask, and not much else.',
  },
  notes: 'Conversational speech is often around 120-160 words per minute (varies widely by speaker), so ~30 seconds is roughly 60-80 words. Fictional figures.',
};

export default lesson;
