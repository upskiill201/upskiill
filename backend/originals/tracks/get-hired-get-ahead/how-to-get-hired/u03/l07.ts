import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 7 — "What's your greatest weakness?" Chat with Tey. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"What\'s your greatest weakness?"',
  summary: 'David\'s internet research says the trick is to say "I\'m a perfectionist." Clinton isn\'t sure. Tey explains what the question is really asking, and why the "trick" answer usually backfires.',
  minutes: 11,
  outcomes: ['Explain what the weakness question tests', 'Pick a real, non-fatal weakness', 'Show what you\'re doing about it'],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Interviewers have heard "I\'m a perfectionist" and "I work too hard" thousands of times. What do you think it tells them?',
          replies: ['That you\'re hiding something', 'That you\'re great'],
        },
        {
          tey: 'Mostly that you either don\'t know yourself or won\'t say. The question is testing self-awareness: do you know where you\'re weaker, and are you doing something about it?',
          replies: ['So what should I say?'],
        },
        {
          tey: 'A real weakness that isn\'t central to the job, plus what you\'re doing about it. Clinton: "I used to say yes to everything and end up overloaded. At Kmer I started writing my week\'s priorities every Monday and saying \'not this week\' to extras. It\'s better, and I\'m still practising."',
          replies: ['What should I avoid?'],
        },
        {
          tey: 'Avoid weaknesses that are the core of the job, like "I hate coding" for a developer role. Avoid fake ones. And keep it short: about 30 seconds, then stop.',
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A real weakness, not central to the job, plus what you\'re doing about it. Thirty seconds, then stop.',
    },
  ],
  apply: {
    scenario: 'Clinton prepares his weakness answer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does the weakness question really test?',
        options: [
          { text: 'Whether you have zero weaknesses', why: 'Everyone has some.' },
          { text: 'Self-awareness, and whether you\'re working on it' },
          { text: 'Whether you can trick them', why: 'They\'ve heard every trick.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good weakness answer for a developer role, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'I used to overload myself; now I plan priorities on Mondays', group: 0 },
          { text: 'I\'m a perfectionist', group: 1 },
          { text: 'I hate coding', group: 1 },
          { text: 'Public speaking makes me nervous, so I joined a meet-up to practise', group: 0 },
          { text: 'I have no weaknesses', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the weakness answer in order.',
        lines: ['Name a real weakness', 'Give a quick example', 'Say what you\'re doing about it', 'Say how it\'s going, then stop'],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'My weakness is I freeze in interviews. Can I actually say that?',
        options: [
          { text: 'No, say you\'re a perfectionist.', why: 'A real one with action is stronger.' },
          { text: 'Say you have no weaknesses.', why: 'Nobody believes that.' },
          { text: 'Yes, if you add what you\'re doing: "so I practise out loud every week, and it\'s improving."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that ruins Clinton\'s answer.',
        lines: ['I used to say yes to everything.', 'Now I write my priorities every Monday.', 'Also I\'m often late, disorganised and I forget deadlines.'],
        bug: 2,
        explanation: 'One weakness, with action. Don\'t list several, especially core ones.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each weak answer to a better one.',
        pairs: [
          ['I\'m a perfectionist', 'I overload myself; I now plan priorities'],
          ['I have no weaknesses', 'Public speaking is hard, so I practise'],
          ['I work too hard', 'I say yes too often; I\'m learning "not this week"'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How long should the answer take?',
        options: [
          { text: 'About 30 seconds' },
          { text: 'Five minutes', why: 'Short. Then stop.' },
          { text: 'Five seconds', why: 'A bit longer: weakness, action, progress.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'A [[1]] weakness, not central to the job, plus what you\'re [[2]] about it.',
        blanks: [['real'], ['doing']],
        distractors: ['fake', 'hiding', 'saying'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'On which day does Clinton write his priorities? (one word)',
        answers: ['monday', 'mondays'],
        placeholder: 'A day',
      },
      {
        kind: 'sortGroups',
        prompt: 'Too central to the job, or fine to mention?',
        groups: ['Fine', 'Too central'],
        items: [
          { text: 'Nervous at public speaking (developer role)', group: 0 },
          { text: 'Can\'t write code (developer role)', group: 1 },
          { text: 'Say yes too often', group: 0 },
          { text: 'Can\'t work with people (team role)', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a real weakness of yours that isn\'t central to the job you want? What are you doing about it?',
    starters: ['My weakness is...', 'I\'m working on it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your weakness answer in three sentences. Say it out loud in 30 seconds.',
  },
  notes: 'Common interview guidance. Where you live: in some cultures modesty is expected and this question is handled more gently; keep it honest and short.',
};

export default lesson;
