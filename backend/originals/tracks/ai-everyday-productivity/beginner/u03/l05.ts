import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the money message',
  summary: 'The party is MX$6,000 over budget. Lucía has to ask eight cousins to chip in MX$750 each, in the family group chat, without starting a war. Check what you know about drafts, complaints, voice and tone.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Write a hard message with AI in your own voice', 'Pick the right tone and keep the facts'],
  learn: [
    {
      kind: 'story',
      title: 'The hardest message',
      beats: [
        { speaker: 'narrator', text: 'Mariachi quote: MX$6,000 more than planned. Eight cousins. MX$750 each.' },
        { speaker: 'lucia', text: 'Asking family for money in a group chat. What could possibly go wrong.' },
        { speaker: 'tey', text: 'Everything you\'ve learned this chapter, in one message. Let\'s write it.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: writing with AI.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt should Lucía start with?',
        options: [
          { text: 'Write a message asking my cousins for money.', why: 'It\'ll invent her voice and the details.' },
          { text: 'Here\'s my draft: "primos!! the mariachi is 6,000 over, can we each put in 750? no pressure, tell me by friday". Fix it, keep my words, warm and light, don\'t add anything.' },
          { text: 'Write a firm demand for payment.', why: 'Wrong tone for family.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it, or cut it?',
        groups: ['Keep', 'Cut'],
        items: [
          { text: 'MX$750 each', group: 0 },
          { text: '"This momentous journey"', group: 1 },
          { text: 'Tell me by Friday', group: 0 },
          { text: '"You owe this to the family"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'marta',
        message: 'What tone are you going for?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Formal, like a bank.', why: 'Wrong for cousins.' },
          { text: 'Furious, they never help.', why: 'That starts the war.' },
          { text: 'Warm and light, clear about the amount, easy to say no to.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The writing rules.',
        template: 'Draft it [[1]] first. Edit, don\'t [[2]].',
        blanks: [['yourself', 'myself'], ['rewrite']],
        distractors: ['never', 'delete'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the message to its tone.',
        pairs: [
          ['The fee complaint', 'Calm and firm'],
          ['The cousins\' money ask', 'Warm and light'],
          ['Abuela\'s invitation', 'Warmer and simpler'],
          ['Papá\'s colleagues', 'More formal, still warm'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line from the AI\'s version should Lucía remove?',
        lines: [
          'Primos! The mariachi came in MX$6,000 over budget.',
          'As you know, Mamá and Papá paid for all your quinceañeras.',
          'Could we each put in MX$750? Tell me by Friday, and no pressure.',
        ],
        bug: 1,
        fix: 'Delete it.',
        explanation: 'Guilt the AI added, and maybe not even true. It\'s exactly what starts a family war.',
      },
      {
        kind: 'mcq',
        prompt: 'The AI\'s draft says MX$800 each. What happened?',
        options: [
          { text: 'A number drifted. Check every number before sending: it\'s MX$750' },
          { text: 'It rounded up to be safe', why: 'It doesn\'t know her budget better than she does.' },
          { text: 'Prices went up', why: 'The quote didn\'t change.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much is Lucía asking each cousin for, in pesos? (A number.)',
        answers: ['750', 'MX$750', '750 pesos'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s method for the money message.',
        lines: ['Write a messy draft', 'Ask AI to fix it, keep her words', 'Turn the dial: warm and light', 'Check the numbers', 'Send to the group'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Well? Did the cousins pay?',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'Seven said yes in an hour. Mateo sent a meme and then MX$750. Nobody fought.' },
          { text: 'I didn\'t send it.', why: 'She did.' },
          { text: 'They all left the group.', why: 'Warm and light worked.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s a hard message you need to send (asking for money, saying no, a late reply)? What tone does it need?',
    starters: ['I need to send...', 'It needs to be...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1–4. 8 × 750 = 6,000.',
};

export default lesson;
