import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Chapter Challenge. Climax: Ask Rao v0.2, the hosting decision with every number checked. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: Ask Rao v0.2',
  summary: 'Arjun\'s challenge: "Defend the hosting decision. Memory, bill, speed, energy and the backup: show me each number in code." Everything from Chapter 2, harder.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Do every compute calculation from the chapter', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'story',
      title: 'Version 0.2',
      beats: [
        { speaker: 'narrator', text: 'Joel runs each number on screen: 14 GB for a 7B model, $1,080 for a GPU left on all month, $5 for paying per answer, half a second for a short reply.' },
        { speaker: 'arjun', text: 'Every claim checked. That\'s v0.2. Next: what\'s actually happening inside the model.' },
        { speaker: 'tey', text: 'Your turn: defend Ask Rao v0.2.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: Ask Rao v0.2.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the GB needed for a 7B model at 16 bits',
        starter: 'parameters = 7_000_000_000\n',
        solution: 'parameters = 7_000_000_000\nprint(parameters * 2 / 1_000_000_000)\n',
        hint: '2 bytes per parameter at 16 bits',
        checks: [{ message: 'Print 14.0', outputEquals: '14.0' }],
      },
      {
        kind: 'writeCode',
        prompt: 'Print both monthly bills on two lines: the GPU at $1.50 an hour, 24/7 (30 days), then pay-per-answer for 30,000 chats at $0.00018, rounded to 2 places',
        starter: 'per_hour = 1.50\nper_chat = 0.00018\nchats = 30000\n',
        solution: 'per_hour = 1.50\nper_chat = 0.00018\nchats = 30000\nprint(per_hour * 24 * 30)\nprint(round(per_chat * chats, 2))\n',
        hint: 'per_hour * 24 * 30, then round(per_chat * chats, 2)',
        checks: [{ message: 'Print 1080.0 then 5.4', outputEquals: '1080.0\n5.4' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the formula to its job.',
        pairs: [
          ['parameters x bytes', 'Memory needed'],
          ['per hour x hours', 'GPU bill'],
          ['tokens / speed', 'Wait time'],
          ['power x hours', 'Energy'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Print the wait for a 60-token reply on each of model-a, model-b and model-c, one per line, using the price cards',
        starter: 'from teyro_ai import MODELS\n\nfor name in ["model-a", "model-b", "model-c"]:\n    pass\n',
        solution: 'from teyro_ai import MODELS\n\nfor name in ["model-a", "model-b", "model-c"]:\n    print(round(60 / MODELS[name]["speed"], 2))\n',
        hint: 'Inside the loop: print(round(60 / MODELS[name]["speed"], 2))',
        checks: [{ message: 'Print 1.0, 0.5 and 0.67', outputEquals: '1.0\n0.5\n0.67' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Ask Rao pay per answer instead of renting a GPU?',
        options: [
          { text: 'At about 30,000 chats a month, it costs about $5 instead of $1,080, with nothing to maintain' },
          { text: 'GPUs don\'t work', why: 'They work; they just don\'t pay off at this volume.' },
          { text: 'APIs are always faster', why: 'Not always. Here the deciding factors are cost and maintenance.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who does it: a model lab, a chip maker, or Ask Rao\'s team?',
        groups: ['Model lab or chip maker', 'Ask Rao\'s team'],
        items: [
          { text: 'Training the model', group: 0 },
          { text: 'Running the model for customers (through an API)', group: 1 },
          { text: 'Manufacturing GPUs', group: 0 },
          { text: 'Choosing short replies', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the v0.2 note is wrong?',
        lines: [
          'A 70B model at 16 bits needs 140 GB.',
          'It fits on a 24 GB gaming GPU.',
          'A 7B model at 4 bits is 3.5 GB.',
          'Local models are for experiments.',
        ],
        bug: 1,
        fix: 'It needs several large GPUs, or heavy shrinking.',
        explanation: '140 GB is far more than 24 GB.',
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Mr Rao: "Will it cost more if more people chat?"',
        prompt: "Joel's best reply?",
        options: [
          { text: '"Yes, a little: it\'s paid per answer, so about $5 a month now, and roughly double if chats double."' },
          { text: '"No, it\'s a fixed price."', why: 'Pay-per-answer grows with use.' },
          { text: '"We can\'t know."', why: 'It\'s simple multiplication.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The chapter in one line.',
        template: 'Check [[1]] first, then the [[2]], then the wait, and keep a [[3]].',
        blanks: [['memory'], ['bill', 'cost'], ['backup']],
        distractors: ['logo', 'colour'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print(round(0.7 * 720 * 0.15, 2))',
        language: 'python',
        options: [
          { text: '75.6' },
          { text: '504.0', why: 'That\'s the kWh before multiplying by the price.' },
          { text: '0.15', why: 'It multiplies all three.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which company is the only maker of the EUV machines used for the most advanced chips?',
        answers: ['ASML'],
        placeholder: 'A company',
      },
    ],
  },
  reflect: {
    prompt: 'You can now estimate memory, cost, speed and energy for any model. Which of these numbers will you look for next time you read about AI in the news?',
    starters: ['I\'ll look for...', 'Because...'],
  },
  notes: 'Chapter 2 challenge. 7B fp16 14.0 GB; GPU 1.5 x 720 = 1080.0; API 30,000 x 0.00018 = 5.4; waits 60/60 = 1.0, 60/120 = 0.5, 60/90 = 0.67; energy cost 0.7 x 720 x 0.15 = 75.6 (practice prices).',
};

export default lesson;
