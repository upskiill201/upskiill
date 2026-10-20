import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 16 — interview myths. Myth or Fact. */
const lesson: OriginalLesson = {
  key: 'l16',
  title: 'Interview myths',
  summary: '"They decide in the first seven seconds." "Never admit you don\'t know." "The most confident person always wins." The final-year group chat is full of interview advice. Myth or fact?',
  minutes: 11,
  outcomes: ['Spot common interview myths', 'Know what actually helps', 'Ignore advice that makes you fake'],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Interviewers always decide in the first few seconds, and nothing after that matters.', isFact: false, explain: 'First impressions do count, but in structured interviews every answer is scored. A strong middle and end can change a shaky start.' },
        { text: 'Never admit you don\'t know something.', isFact: false, explain: 'Bluffing is usually spotted. "I haven\'t done that, but here\'s how I\'d think about it" is often a strong answer.' },
        { text: 'Preparing real stories in advance helps.', isFact: true, explain: 'Many questions are predictable themes. Prepared stories mean you can answer calmly and specifically.' },
        { text: 'Asking questions at the end can help you.', isFact: true, explain: 'It shows interest and helps you decide if the job fits you.' },
        { text: 'The most confident-sounding candidate always gets the job.', isFact: false, explain: 'Confidence helps, but evidence matters more in a well-run interview. Calm and specific beats loud and vague.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Preparation and honesty beat tricks. Calm and specific beats loud and vague.',
    },
  ],
  apply: {
    scenario: 'Clinton sorts the group chat\'s interview advice.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Prepared stories help', group: 0 },
          { text: 'Only the first seconds matter', group: 1 },
          { text: 'Never admit you don\'t know', group: 1 },
          { text: 'Asking questions can help', group: 0 },
          { text: 'The loudest always wins', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I stumbled on the first answer. Someone said that means it\'s over. Is it?',
        options: [
          { text: 'No: in a structured interview every answer counts. A strong rest can change it.' },
          { text: 'Yes, it\'s over.', why: 'Every answer is scored.' },
          { text: 'Only if you cry.', why: 'Recover and carry on.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What usually beats "loud and vague"?',
        options: [
          { text: 'Calm and specific' },
          { text: 'Louder and vaguer', why: 'Evidence matters more.' },
          { text: 'Silent', why: 'Calm and specific.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the myth.',
        lines: ['Real stories help you answer calmly.', 'Always bluff if you don\'t know.', 'Questions at the end show interest.'],
        bug: 1,
        explanation: 'Bluffs are usually spotted. Reason honestly instead.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each myth to the truth.',
        pairs: [
          ['Only the first seconds matter', 'Every answer is scored'],
          ['Never admit you don\'t know', 'Reason out loud honestly'],
          ['The most confident wins', 'Evidence matters more'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which advice should Clinton follow?',
        options: [
          { text: 'Prepare real stories and practise out loud' },
          { text: 'Learn trick answers', why: 'Interviewers have heard them.' },
          { text: 'Copy someone else\'s stories', why: 'Use your own.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Preparation and [[1]] beat [[2]].',
        blanks: [['honesty'], ['tricks']],
        distractors: ['luck', 'stories', 'shouting'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a structured interview, is every answer scored? (yes or no)',
        answers: ['yes'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful advice, or harmful?',
        groups: ['Helpful', 'Harmful'],
        items: [
          { text: 'Practise with a friend', group: 0 },
          { text: 'Invent a better story', group: 1 },
          { text: 'Prepare questions for them', group: 0 },
          { text: 'Talk over the interviewer', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Someone says I should copy a famous CEO\'s interview answers. Good idea?',
        options: [
          { text: 'No: my own true stories are what they\'re asking for.' },
          { text: 'Yes, they worked for him.', why: 'They\'re his stories, not yours.' },
          { text: 'Only the best ones.', why: 'Use your own.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which interview myth have you believed? How would it have hurt you?',
    starters: ['I believed...', 'It would have...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time you read interview advice online, ask: does this make me more honest and specific, or more fake?',
  },
  notes: 'Myths reflect common advice-circulation; claims kept qualitative. "Decide in seconds" myths are related to the CV-skim research but don\'t transfer to structured interviews.',
};

export default lesson;
