import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat: "I don't know". */
const lesson: OriginalLesson = {
  key: 'l04',
  title: '"I don\'t know"',
  summary: 'The question Lucía can\'t answer: "What will chili-lime sell next year?" Tey shows her how to say "I don\'t know" and still sound in control.',
  minutes: 11,
  outcomes: [
    'Say "I don\'t know" with confidence',
    'Offer what you do know',
    'Promise a follow-up you can keep',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'If you don\'t know, say so. Guessing in front of 300 people is riskier than "I don\'t know".', replies: ['Won\'t I look unprepared?'] },
        { tey: 'Not if you add what you do know: "I don\'t know yet. What I can say is that sales are still 38% above target after nine weeks."', replies: ['And then?'] },
        { tey: 'Then a follow-up you can keep: "We\'ll have a forecast by the end of October. I\'ll share it on the intranet."', replies: ['What if I sort of know, but I\'m not sure?'] },
        { tey: 'Say how sure you are: "My best guess is about the same as this year, but I\'d want the forecast before I\'d bet on it."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: '"I don\'t know yet", then what you do know, then a follow-up you\'ll keep. Unsure? Say how sure.',
    },
  ],
  apply: {
    scenario: '"I don\'t know."',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order a good "I don\'t know".',
        lines: ['"I don\'t know yet."', 'What you do know', 'A follow-up you\'ll keep'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is guessing risky?',
        options: [
          { text: 'Guessing is always right', why: 'It can be wrong.' },
          { text: 'It isn\'t risky', why: 'Wrong guesses cost trust.' },
          { text: 'A wrong guess in front of 300 people is worse than "I don\'t know"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good "I don\'t know" or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: '"I don\'t know yet. What I can say is..."', group: 0 },
          { text: 'Making up a number', group: 1 },
          { text: '"We\'ll have a forecast by end of October."', group: 0 },
          { text: '"No idea, sorry." and silence', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Lucía\'s words.',
        pairs: [
          ['Honest', '"I don\'t know yet."'],
          ['What you know', '"Still 38% above target."'],
          ['Follow-up', '"A forecast by end of October."'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What if I promise a follow-up and then forget?',
        prompt: "Tey\'s best reply?",
        options: [
          { text: 'Write it down on stage or straight after. Only promise what you\'ll do. A kept promise builds more trust than a perfect answer.' },
          { text: 'Then never promise.', why: 'Promise and keep it.' },
          { text: 'They\'ll forget too.', why: 'Some won\'t.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Unsure?',
        template: 'Say how [[1]] you are, not just a [[2]].',
        blanks: [['sure'], ['guess']],
        distractors: ['tired', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'By the end of which month will the forecast be ready?',
        answers: ['October', 'october'],
        placeholder: 'A month',
      },
      {
        kind: 'mcq',
        prompt: 'Where will Lucía share the forecast?',
        options: [
          { text: 'At next year\'s Encuentro', why: 'The intranet.' },
          { text: 'Nowhere', why: 'The intranet.' },
          { text: 'On the intranet' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which answer to "What will it sell next year?" is the mistake?',
        lines: [
          '"I don\'t know yet."',
          '"What I can say is it\'s still 38% above target."',
          '"Probably double. Or triple. Let\'s say triple."',
          '"We\'ll share a forecast by end of October."',
        ],
        bug: 2,
        fix: 'Delete it, or "My best guess is similar, but I\'d wait for the forecast."',
        explanation: 'A made-up number is a promise you can\'t keep.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many people would hear a wrong guess?',
        answers: ['300', 'three hundred'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Think of a question you once bluffed an answer to. Rewrite your answer as a good "I don\'t know".',
    starters: ['I bluffed...', 'Better:...'],
  },
  deepen: {
    title: 'Honest uncertainty',
    summary: 'Saying how sure you are is a strength in business. Leaders make better decisions when they know which numbers are solid and which are guesses.',
  },
  notes: '"I don\'t know" + what you know + follow-up: common presentation and media-training advice.',
};

export default lesson;
