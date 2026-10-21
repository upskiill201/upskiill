import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 9 · Lesson 10 — Checkpoint 2. Angry replies, feedback, asking, disagreeing. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: the hard messages',
  summary: 'Calm replies to anger, kind feedback, clear requests and polite disagreement. Show you can handle the messages most people avoid.',
  minutes: 14,
  milestone: 'CHECKPOINT',
  outcomes: ['Show you can reply calmly and give feedback kindly', 'Show you can ask and disagree clearly'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Checkpoint 2. The hardest week of Ada\'s job so far.', replies: ['Ready'] },
        { tey: 'Warm-up: a furious email arrives. First move?', replies: ['Pause', 'Vent to the AI'] },
        { tey: 'Then reply with the four parts. Go.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: outage week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the calm reply.',
        lines: ['Acknowledge the impact', 'Own your part', 'Say what\'s fixed', 'Give the next step'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Owning or defending?',
        groups: ['Owning', 'Defending'],
        items: [
          { text: '"Shops lost sales; I\'m sorry"', group: 0 },
          { text: '"Not our fault"', group: 1 },
          { text: '"We\'ve added an alert"', group: 0 },
          { text: '"These things happen"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order SBI feedback.',
        lines: ['Situation', 'Behaviour', 'Impact', 'Ask what would help'],
      },
      {
        kind: 'findBug',
        prompt: 'Which feedback line is a judgement?',
        lines: ['On Monday morning,', 'your phone was on silent for 40 minutes,', 'which proves you\'re lazy.', 'What would help next time?'],
        bug: 2,
        fix: 'so shops waited longer for help.',
        explanation: 'Behaviour and impact, not personality.',
      },
      {
        kind: 'mcq',
        prompt: 'People asking for help underestimate others\' willingness by about how much?',
        options: [
          { text: 'About half' },
          { text: 'Not at all', why: 'They underestimate.' },
          { text: 'Ten times', why: 'About half.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Is the review still Wednesday?',
        prompt: 'Ada needs until Friday. Best reply?',
        options: [
          { text: 'Can we move it to Friday 3pm? The outage took two days.' },
          { text: 'Yes!', why: 'It won\'t be ready.' },
          { text: 'Not sure.', why: 'Give a date.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which disagreement request is best?',
        options: [
          { text: 'Tell her she\'s wrong.', why: 'Defensive.' },
          { text: 'Draft a polite disagreement: show I understand, shared goal, evidence, alternative, her call. Not defensive.' },
          { text: 'Just agree.', why: 'Shops lose out.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hard message to its key move.',
        pairs: [
          ['Angry email', 'Acknowledge the impact'],
          ['Feedback', 'Behaviour, not personality'],
          ['Asking for time', 'A new date'],
          ['Disagreeing', 'An alternative'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rules.',
        template: 'Vent to the [[1]]. Disagree with the idea, never the [[2]].',
        blanks: [['AI'], ['person']],
        distractors: ['client', 'data'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the feedback question.',
        tiles: ['What', 'would', 'help', 'next', 'time?'],
        distractors: ['Why'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good request, or weak?',
        groups: ['Good', 'Weak'],
        items: [
          { text: '"Report by Wednesday, for Thursday\'s update?"', group: 0 },
          { text: '"Sorry sorry, maybe if you have time..."', group: 1 },
          { text: '"Move to Friday 3pm?"', group: 0 },
          { text: 'Missing it quietly', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line weakens the disagreement?',
        lines: ['I understand why a pause feels safer.', 'We both want shops to trust us.', 'Pausing would be a panic reaction.', 'Instead: daily check-ins for two weeks.'],
        bug: 2,
        fix: 'Paused shops often don\'t come back, in our data.',
        explanation: 'Criticises Carmen; use evidence.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many steps in the polite disagreement?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why mention the cause "as a fact, not an excuse"?',
        options: [
          { text: 'It informs without shifting blame' },
          { text: 'To blame the bank', why: 'Not the goal.' },
          { text: 'Never mention the cause', why: 'A brief fact helps.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Carmen: "Our shops lost sales because of you."',
        prompt: 'Best first line from Ada?',
        options: [
          { text: 'You\'re right that shops lost sales, and I\'m sorry.' },
          { text: 'Actually, it was the bank.', why: 'Defensive first.' },
          { text: 'Sorry for any inconvenience.', why: 'Vague.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which hard message do you avoid most? What will you try next time?',
    starters: ['I avoid...', 'Next time...'],
  },
  notes: 'Checkpoint for Unit 9 lessons 6-9.',
};

export default lesson;
