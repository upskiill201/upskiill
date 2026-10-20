import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 4. Before/After: reacting vs responding. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Reacting vs responding',
  summary: 'Monday night, Grace drafts an email to Callum. Then she drafts it again on Tuesday morning. Same facts, very different emails.',
  minutes: 12,
  outcomes: [
    'Tell a reaction from a response',
    'Write a reply to criticism that keeps your credibility',
    'Use the time between criticism and reply',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Monday night vs Tuesday morning',
      before: {
        label: 'Reaction (Monday, 11 p.m.)',
        text: 'Callum, I was frankly shocked by your comment today. I have 18 years of clinical experience and a research qualification. Calling my work "just opinions" in front of the team was unprofessional. Usability research doesn\'t need hundreds of people, which you\'d know if you\'d read the report.',
      },
      after: {
        label: 'Response (Tuesday, 9 a.m.)',
        text: 'Hi Callum, thanks for the question about sample size in yesterday\'s meeting. You\'re right that six sessions can\'t show how many patients are affected. Usage data from the pilot surgery can: 38% of over-65s drop out at step 3, against 12% of younger patients. The six sessions show why. Could we take 20 minutes this week to go through it? Grace',
      },
      notes: [
        'The reaction defends Grace. The response defends the patients, with evidence.',
        'The response takes the fair point first, then adds what\'s missing.',
        'How he said it (in public) is a separate conversation, best had in person.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'React tonight in a draft; respond tomorrow in the email. A response answers the content, with evidence, and keeps the delivery for a private talk.',
    },
  ],
  apply: {
    scenario: 'Two drafts.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'From the reaction or the response?',
        groups: ['Reaction', 'Response'],
        items: [
          { text: '"I was frankly shocked."', group: 0 },
          { text: '"Thanks for the question about sample size."', group: 1 },
          { text: '"Which you\'d know if you\'d read the report."', group: 0 },
          { text: '"38% of over-65s drop out at step 3."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does the reaction mainly defend?',
        options: [
          { text: 'Grace herself' },
          { text: 'The patients', why: 'That\'s the response.' },
          { text: 'The launch', why: 'It\'s mostly about her.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the response to its job.',
        pairs: [
          ['"Thanks for the question"', 'Starts calmly'],
          ['"You\'re right that six can\'t show scale"', 'Takes the fair point'],
          ['"38% of over-65s"', 'Adds evidence'],
          ['"Could we take 20 minutes?"', 'Opens a conversation'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'Should I mention that he was rude to say it in public?',
        prompt: "Priya's best reply?",
        options: [
          { text: 'Yes, but not in this email. Answer the content in writing; raise the public delivery in person, softly.' },
          { text: 'Put it in capitals at the top.', why: 'It would bury the evidence.' },
          { text: 'Never mention it.', why: 'It\'s worth raising, privately.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'React tonight in a [[1]]; respond tomorrow in the [[2]].',
        blanks: [['draft'], ['email', 'message']],
        distractors: ['meeting', 'diary'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the response more likely to change Callum\'s mind?',
        options: [
          { text: 'It answers his actual concern with data he can use' },
          { text: 'It\'s longer', why: 'It\'s about content.' },
          { text: 'It flatters him', why: 'It\'s honest and evidence-based.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time did Grace write the reaction draft? (e.g. 11 pm)',
        answers: ['11', '11 pm', '11pm', '11 p.m.', '23:00'],
        placeholder: 'A time',
      },
      {
        kind: 'findBug',
        prompt: 'Which line in this response slips back into reacting?',
        lines: [
          'Thanks for the question about sample size.',
          'You\'re right that six can\'t show scale.',
          'Though I\'d expect a PM to know basic research methods.',
          'Could we take 20 minutes this week?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'A dig that undoes the calm.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Content (for the email) or delivery (for in person)?',
        groups: ['Content', 'Delivery'],
        items: [
          { text: 'Is six enough?', group: 0 },
          { text: 'Saying it in front of eight people', group: 1 },
          { text: 'The 38% drop-out data', group: 0 },
          { text: 'Calling it "just opinions"', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order a response to criticism.',
        lines: ['Write the reaction, don\'t send it', 'Sleep on it', 'Take the fair point', 'Add evidence', 'Suggest a conversation'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of criticism you replied to too fast. Rewrite your reply as a response.',
    starters: ['My reaction was...', 'My response would be...'],
  },
  deepen: {
    title: 'The unsent draft',
    summary: 'Writing the angry version and not sending it is an old trick. It gets the feeling out of your head, and the next morning, the calmer you can write the version that works.',
  },
  notes: 'Fictional drafts. Pilot data: 38% vs 12% drop-out at step 3.',
};

export default lesson;
