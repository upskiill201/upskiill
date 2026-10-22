import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Before/After: after the interview. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'After the interview',
  summary: 'Remi\'s instinct is to wait silently and refresh his inbox. Ada\'s advice: a short, specific thank-you note the same day. Here\'s the difference.',
  minutes: 11,
  outcomes: [
    'Write a short, specific thank-you note',
    'Follow up at the right time',
    'Avoid follow-ups that annoy',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Silence vs a thank-you note',
      before: {
        label: 'Silence',
        text: 'Remi goes home and refreshes his email every ten minutes.\nNothing for a week.\nThen he sends: "Hi, any news?? Please let me know."',
      },
      after: {
        label: 'Thank-you note (same day)',
        text: 'Subject: Thank you, internship assessment day\n"Dear Mr Otieno, thank you for today. I especially enjoyed the delivery exercise; checking the late routes first is exactly the kind of problem I\'d love to work on. I\'m very keen on the internship. Best wishes, Remi"\nThen: if he hears nothing by the date they gave, one polite follow-up.',
      },
      notes: [
        'Short, specific and sent the same day.',
        'Mention one real moment from the interview.',
        'If they gave a decision date, wait until it passes before following up, once.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Send a short, specific thank-you the same day. Follow up once, politely, after the date they gave.',
    },
  ],
  apply: {
    scenario: 'After the interview.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Good follow-up, or not?',
        groups: ['Good', 'Not'],
        items: [
          { text: 'A short thank-you the same day', group: 0 },
          { text: '"Any news??" after one day', group: 1 },
          { text: 'Mentioning one real moment', group: 0 },
          { text: 'Five follow-ups in a week', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'When should Remi follow up if he hears nothing?',
        options: [
          { text: 'Every day', why: 'That annoys.' },
          { text: 'Never', why: 'One polite follow-up is fine.' },
          { text: 'Once, politely, after the decision date they gave' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the note to its job.',
        pairs: [
          ['"Thank you for today"', 'Courtesy'],
          ['"The delivery exercise"', 'A specific memory'],
          ['"I\'m very keen on the internship"', 'Clear interest'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'Does a thank-you note really change anything?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'It guarantees the job.', why: 'It helps a little; it\'s not magic.' },
          { text: 'It won\'t rescue a weak interview, but it\'s polite, reminds them of you, and costs two minutes.' },
          { text: 'No, never send one.', why: 'It\'s cheap and courteous.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The note.',
        template: 'Short, [[1]], and sent the same [[2]].',
        blanks: [['specific'], ['day']],
        distractors: ['long', 'month'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many polite follow-ups should Remi send after the decision date?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Should Remi send separate notes to each panellist?',
        options: [
          { text: 'He must send ten', why: 'One or a few is plenty.' },
          { text: 'Never thank the panel', why: 'Thanking them is courteous.' },
          { text: 'He can, or one note to the main contact thanking everyone' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Remi\'s thank-you note should go?',
        lines: [
          'Dear Mr Otieno, thank you for today.',
          'I enjoyed the delivery exercise.',
          'Please tell me tomorrow if I got it!',
          'Best wishes, Remi',
        ],
        bug: 2,
        fix: 'I\'m very keen on the internship.',
        explanation: 'It pressures them for a decision.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or generic thank-you?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: '"I enjoyed the late-routes exercise."', group: 0 },
          { text: '"Thanks for everything."', group: 1 },
          { text: '"Your question about first weeks made me think."', group: 0 },
          { text: '"It was nice."', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order what happens after an interview.',
        lines: ['Write a few notes for yourself', 'Send a short thank-you', 'Wait until the decision date', 'Follow up once if needed'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a three-sentence thank-you note for your last interview, or your next one.',
    starters: ['Thank you for...', 'I especially enjoyed...'],
  },
  deepen: {
    title: 'Notes for yourself',
    summary: 'Straight after any interview, write down the questions you were asked and how you answered. It\'s the best preparation for the next one.',
  },
  notes: 'Thank-you and follow-up practice is common careers advice; no statistics claimed about its effect.',
};

export default lesson;
