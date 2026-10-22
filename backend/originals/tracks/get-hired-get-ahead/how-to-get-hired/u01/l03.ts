import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 1 · Lesson 3 — free. "Pls job" vs a good advice request. Before / After. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Asking for advice, not a job',
  summary: 'Clinton\'s first message to Tchami, the meet-up speaker, says: "Hi bro, any jobs at your company? Pls send. Thanks." No reply. Miracle shows him why, and what to send instead.',
  minutes: 11,
  outcomes: ['Explain why "any jobs?" messages get ignored', 'Ask for advice instead of a job', 'Make your request small and easy to say yes to'],
  learn: [
    {
      kind: 'compare',
      title: 'Two messages to Tchami',
      before: { label: '"Pls job"', text: 'Hi bro, any jobs at your company? Pls send. Thanks.\n\nTchami barely remembers Clinton. The message asks for a big favour (a job), gives nothing, and doesn\'t say who he is. It\'s easy to ignore, and he does.' },
      after: { label: 'An advice request', text: 'Hi Tchami, I\'m Clinton from the UB tech meet-up: you spoke about mobile money last term. I\'m graduating in June and trying to understand how people get into fintech in Douala. Could I ask you three quick questions, by message or a 15-minute call, whenever suits you?\n\nIt reminds him who Clinton is, asks for something small (advice, not a job), and is easy to say yes to. Tchami replies the same day.' },
      notes: [
        'Ask for advice, not a job. Advice is a small, flattering request; a job is a big one.',
        'Remind them how you\'re connected in the first line.',
        'Make it easy: a few questions, 15 minutes, whenever suits them.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'People help with advice far more readily than with jobs. And advice is often how jobs start.',
    },
  ],
  apply: {
    scenario: 'Clinton rewrites his message to Tchami.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did "Hi bro, any jobs? Pls send" get no reply?',
        options: [
          { text: 'Tchami was offline', why: 'Maybe, but the message itself is easy to ignore.' },
          { text: 'It asks for a big favour from someone who barely remembers him, and gives nothing' },
          { text: 'It was too long', why: 'It was short. It was the wrong ask.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good request or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Could I ask you three quick questions about fintech?', group: 0 },
          { text: 'Can you get me a job?', group: 1 },
          { text: 'Would a 15-minute call whenever suits you be possible?', group: 0 },
          { text: 'Send me your company\'s HR email now', group: 1 },
          { text: 'You spoke at our meet-up about mobile money', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the advice request in order.',
        lines: ['Remind them how you\'re connected', 'Say what you\'re trying to do', 'Ask a small, specific question', 'Make it easy: their time, their choice'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'If I only ask for advice, won\'t I miss the chance to ask about jobs?',
        options: [
          { text: 'Yes, always ask for the job first.', why: 'That\'s the request people ignore.' },
          { text: 'Never mention jobs ever.', why: 'You can ask later, once there\'s a relationship.' },
          { text: 'Advice conversations often lead to openings. If there\'s a role, they usually mention it.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes the request too big.',
        lines: ['Hi Tchami, I\'m Clinton from the UB meet-up.', 'Could you introduce me to your CEO and HR and get me an interview this week?', 'Could I ask you three quick questions?'],
        bug: 1,
        explanation: 'Too much, too soon. Start with a small, easy ask.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each weak line to a strong one.',
        pairs: [
          ['Hi bro', 'Hi Tchami, I\'m Clinton from the UB meet-up'],
          ['Any jobs?', 'Could I ask you three quick questions?'],
          ['Pls send', 'Whenever suits you'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which first line is best?',
        options: [
          { text: '"Hi Tchami, I\'m Clinton from the UB tech meet-up: you spoke about mobile money last term."' },
          { text: '"Hello sir, I need a job."', why: 'No connection, big ask.' },
          { text: '"You probably don\'t remember me but..."', why: 'Starts by talking himself down. Remind him instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Ask for [[1]], not a [[2]].',
        blanks: [['advice'], ['job']],
        distractors: ['money', 'favour', 'reply'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes does Clinton suggest for the call? (a number)',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy to say yes to, or hard?',
        groups: ['Easy', 'Hard'],
        items: [
          { text: 'Three questions by message', group: 0 },
          { text: 'A two-hour meeting tomorrow', group: 1 },
          { text: 'A 15-minute call when it suits them', group: 0 },
          { text: 'Reading your 10-page plan', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone you could ask for advice about the job you want. What would your first line say, to remind them how you\'re connected?',
    starters: ['I\'d message...', 'My first line: "Hi ___, I\'m..."'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write (don\'t send yet) one advice request using the four parts: connection, goal, small question, their choice of time.',
  },
  notes: 'Advice-seeking over job-seeking is common networking guidance. Tchami is a named extra (fintech developer who spoke at Clinton\'s meet-up; Level 1, Ch5 l14).',
};

export default lesson;
