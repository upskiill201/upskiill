import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 7. Chat: the final check before you send. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'The final check',
  summary: 'Zanele is about to send a tense reply to Brian at 10 p.m. Tey stops her for two minutes: the final check before anything hard goes out.',
  minutes: 11,
  outcomes: [
    'Do a quick final check before sending',
    'Read a message as the reader will',
    'Know when to wait before sending',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Before you send: read it out loud. Your ear catches long sentences and harsh words your eye skips.', replies: ['It sounds a bit sharp, out loud.'] },
        { tey: 'Then read it as Brian, on his phone, tired. Would any line sting? Change that line, not the message.', replies: ['And the numbers?'] },
        { tey: 'Check every number, name and date against your source. Then check who it\'s going to, and any attachment.', replies: ['Should I just send it now?'] },
        { tey: 'If you\'re annoyed, save it and send it in the morning. A hard message is never worse for waiting one night.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Final check: read it aloud, read it as them, check facts and recipients. Annoyed? Wait until morning.',
    },
  ],
  apply: {
    scenario: 'The final check.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the final check.',
        lines: ['Read it out loud', 'Read it as the reader', 'Check numbers, names, dates', 'Check recipients and attachments', 'Send, or wait until morning'],
      },
      {
        kind: 'mcq',
        prompt: 'Why read it out loud?',
        options: [
          { text: 'To practise a speech', why: 'It\'s to catch problems.' },
          { text: 'No reason', why: 'It catches tone and length.' },
          { text: 'Your ear catches long sentences and harsh words' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Send now, or wait until morning?',
        groups: ['Send now', 'Wait'],
        items: [
          { text: 'A calm, checked update', group: 0 },
          { text: 'A reply written while annoyed', group: 1 },
          { text: 'Bad news with a plan, checked', group: 0 },
          { text: 'A message you haven\'t read back', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the check to what it catches.',
        pairs: [
          ['Read aloud', 'Long sentences and harsh words'],
          ['Read as them', 'Lines that would sting'],
          ['Check recipients', 'Sending to the wrong person'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'But if I wait, Brian will think I\'m ignoring him.',
        prompt: "Tey\'s best reply?",
        options: [
          { text: 'At 10 p.m.? He\'ll see it in the morning either way. A calm reply at 8 a.m. beats a sharp one tonight.' },
          { text: 'Then send it now, as it is.', why: 'It\'s sharp.' },
          { text: 'Never reply.', why: 'Reply in the morning.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'A hard message is never [[1]] for waiting one [[2]].',
        blanks: [['worse'], ['night']],
        distractors: ['better', 'month'],
      },
      {
        kind: 'mcq',
        prompt: 'A line would sting. What should Zanele change?',
        options: [
          { text: 'Delete the whole message', why: 'Just fix the line.' },
          { text: 'Nothing', why: 'Change the line.' },
          { text: 'That line, not the message' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Zanele\'s draft would sting Brian?',
        lines: [
          'Thanks for the note on the summary.',
          '14 July still works for the first one.',
          'As I already explained twice, I can\'t do Friday.',
          'Happy to talk it through tomorrow.',
        ],
        bug: 2,
        fix: 'As we agreed, Friday isn\'t possible.',
        explanation: '"As I already explained twice" sounds like a telling-off.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What time was Zanele about to send? (e.g. 9 p.m.)',
        answers: ['10 p.m.', '10pm', '10 pm', '10', '22:00', '10 p.m'],
        placeholder: 'A time',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of the final check, or not?',
        groups: ['Final check', 'Not needed'],
        items: [
          { text: 'Check every number', group: 0 },
          { text: 'Add three more paragraphs', group: 1 },
          { text: 'Check the attachment is there', group: 0 },
          { text: 'Change the font', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a message you wish you\'d waited to send. Which part of the final check would have caught it?',
    starters: ['The message was...', 'The check that would have caught it...'],
  },
  deepen: {
    title: 'Read it as them',
    summary: 'You know what you meant. The reader only has the words. Reading as them is the closest you can get to seeing what they\'ll see.',
  },
  notes: 'Final-check routine: common editing practice (read aloud, reader view, facts, recipients, delay when emotional).',
};

export default lesson;
