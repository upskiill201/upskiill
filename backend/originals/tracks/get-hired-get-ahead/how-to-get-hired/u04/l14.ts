import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 14 — staying in touch with the company that said no. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'The company that said no',
  summary: 'Many people never speak to a company again after it says no. Miracle says that\'s a waste: several of her best hires were people she\'d turned down before. Here\'s how Clinton stays on Njangi Pay\'s radar without being annoying.',
  minutes: 12,
  outcomes: ['Stay in touch after a rejection', 'Share progress without pressure', 'Know when to apply again'],
  learn: [
    {
      kind: 'steps',
      title: 'Staying on the radar',
      steps: [
        { title: '1. Connect, politely', body: 'Connect with Brenda and the developer who interviewed him, with a short note: "Thanks again for the interview. I\'d love to stay in touch."' },
        { title: '2. Follow the company', body: 'Follow Njangi Pay\'s page and blog. Notice new products, new cities, new roles. Set a reminder to check every couple of weeks.' },
        { title: '3. Share progress, once', body: 'In a month or two, a short update: "You mentioned testing. I\'ve added automated tests to my sync work, and they caught two bugs. Thanks for the push." One message, no ask.' },
        { title: '4. Apply again when it fits', body: 'When a role appears that fits, apply, and mention the earlier interview and what you\'ve improved. Many companies are happy to see a candidate come back stronger.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Connect politely. Follow quietly. Share progress once. Apply again when it fits.',
    },
  ],
  apply: {
    scenario: 'Clinton stays in touch with Njangi Pay.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the steps in order.',
        lines: ['Connect, politely', 'Follow the company', 'Share progress, once', 'Apply again when it fits'],
      },
      {
        kind: 'mcq',
        prompt: 'Why stay in touch with a company that said no?',
        options: [
          { text: 'To make them feel guilty', why: 'It\'s about future chances.' },
          { text: 'Companies often hire people they turned down before' },
          { text: 'There\'s no reason', why: 'Many companies rehire past candidates.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to stay in touch, or annoying?',
        groups: ['Good', 'Annoying'],
        items: [
          { text: 'One progress update after a month or two', group: 0 },
          { text: 'Asking every week "any roles yet?"', group: 1 },
          { text: 'Following their blog quietly', group: 0 },
          { text: 'Commenting on every post', group: 1 },
          { text: 'A short connection note', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that spoils the progress update.',
        lines: ['You mentioned testing.', 'I\'ve added tests, and they caught two bugs.', 'So can you hire me now?'],
        bug: 2,
        explanation: 'Share progress with no ask. Apply when a role fits.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best note to Brenda.',
        from: 'clinton',
        message: 'What should my connection note to Brenda say?',
        options: [
          { text: '"Still can\'t believe you said no."', why: 'Keep it warm and short.' },
          { text: 'No note.', why: 'A short note is friendlier.' },
          { text: '"Thanks again for the interview and the feedback. I\'d love to stay in touch."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to its timing.',
        pairs: [
          ['Connect', 'This week'],
          ['Share progress', 'In a month or two'],
          ['Apply again', 'When a role fits'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'When Clinton applies again, what should he mention?',
        options: [
          { text: 'The earlier interview and what he\'s improved' },
          { text: 'Nothing, pretend it\'s the first time', why: 'Show how you\'ve grown.' },
          { text: 'That they were wrong last time', why: 'Show growth, not blame.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: 'Follow [[1]]. Share progress [[2]].',
        blanks: [['quietly'], ['once']],
        distractors: ['loudly', 'daily', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many progress updates should Clinton send before a new role appears? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth noticing about Njangi Pay, or not?',
        groups: ['Worth noticing', 'Not useful'],
        items: [
          { text: 'A new graduate role posted', group: 0 },
          { text: 'They\'re launching in a new city', group: 0 },
          { text: 'A new office plant', group: 1 },
          { text: 'A new product team', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Is there a company or person who said no to you that you could reconnect with? What progress could you share?',
    starters: ['I could reconnect with...', 'My progress:'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Pick one company that said no to you. Follow them, and set a reminder for a progress update in six weeks.',
  },
  notes: 'Re-applying after rejection is common and often welcomed; some companies have formal waiting periods, so check the advert or ask.',
};

export default lesson;
