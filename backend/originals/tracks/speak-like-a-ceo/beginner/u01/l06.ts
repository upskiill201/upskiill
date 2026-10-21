import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Compare: answer first. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Answer first',
  summary: 'Carmen asks a simple question: "Will we run out of stock?" Lucía\'s first answer takes 90 seconds to reach "probably not". Her second takes ten seconds.',
  minutes: 12,
  outcomes: [
    'Answer a question in the first sentence',
    'Give the reason after the answer',
    'Recognise a "build-up" answer',
  ],
  learn: [
    {
      kind: 'compare',
      title: '"Will we run out of stock?"',
      before: {
        label: 'Build-up answer',
        text: '"So, it\'s a bit complicated. The supplier changed their delivery days in July, and Guadalajara had that spike in week three, and we\'ve been talking to logistics, and Marta has a spreadsheet... so, probably not, I think?"',
      },
      after: {
        label: 'Answer first',
        text: '"Probably not. We have four weeks of stock everywhere except Guadalajara, which has ten days. A reorder by Thursday fixes that. Want the detail?"',
      },
      notes: [
        'The answer is the first two words.',
        'Then the reason, with one number, and what fixes it.',
        'An offer of more detail lets Carmen choose.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Answer first: the answer, the reason, what happens next. Then offer more.',
    },
  ],
  apply: {
    scenario: 'Answer first.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s wrong with the build-up answer?',
        options: [
          { text: 'The answer comes last, and sounds unsure' },
          { text: 'It\'s too short', why: 'It\'s too long.' },
          { text: 'It has no facts', why: 'It has facts, in the wrong order.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Answer first or build-up?',
        groups: ['Answer first', 'Build-up'],
        items: [
          { text: '"Probably not. We have four weeks..."', group: 0 },
          { text: '"So, it\'s a bit complicated..."', group: 1 },
          { text: '"Yes, by Friday."', group: 0 },
          { text: '"Well, to give some context first..."', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days of stock does Guadalajara have?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part to Lucía\'s second answer.',
        pairs: [
          ['The answer', '"Probably not."'],
          ['The reason', '"Four weeks of stock, except Guadalajara"'],
          ['What happens next', '"A reorder by Thursday fixes that."'],
          ['The offer', '"Want the detail?"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'What if I don\'t know the answer for sure?',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Then that\'s your answer first: "Probably not, but I\'ll confirm by Thursday." Uncertainty said clearly still sounds in control.' },
          { text: 'Pretend you\'re sure.', why: 'Say what you know.' },
          { text: 'Talk until you work it out.', why: 'That\'s the build-up.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The order.',
        template: 'The [[1]], the reason, what happens [[2]].',
        blanks: [['answer'], ['next']],
        distractors: ['history', 'last'],
      },
      {
        kind: 'mcq',
        prompt: 'How long did the second answer take?',
        options: [
          { text: 'About ten seconds' },
          { text: 'About 90 seconds', why: 'That was the first.' },
          { text: 'About five minutes', why: 'About ten seconds.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which answer to "Is the campaign on budget?" is a build-up?',
        lines: [
          '"Yes, we\'re 3% under."',
          '"No, 5% over, because of the reshoot."',
          '"Well, there were a few changes, and the agency, and..."',
          '"Yes. I\'ll send the breakdown today."',
        ],
        bug: 2,
        fix: '"Yes, we\'re 3% under."',
        explanation: 'It starts with background, not the answer.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the second answer.',
        lines: ['Probably not', 'Four weeks of stock, except Guadalajara', 'Reorder by Thursday', 'Want the detail?'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks of stock are there outside Guadalajara?',
        answers: ['4', 'four'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Next time someone asks you a question at work, notice your first sentence. Was it the answer?',
    starters: ['They asked...', 'My first sentence was...'],
  },
  deepen: {
    title: 'Answers sound confident',
    summary: 'Starting with the answer doesn\'t just save time. It sounds like you know your material, even when the honest answer is "probably".',
  },
  notes: 'Answer-first: spoken form of BLUF. Fictional stock figures.',
};

export default lesson;
