import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 5. Checkpoint 1: lessons 1–4. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: yes, no, yes-if',
  summary: 'The real size of "small" requests, yes-if, the positive no and the triangle. Quick check before Arjun learns why scope creep sinks so many projects.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Answer unreasonable requests with yes-if or a positive no', 'Use the triangle to sort requests'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday',
      beats: [
        { speaker: 'kavya', text: 'Fourteen features became four. Ms Okafor-Lane chose them herself. And she thanked us.' },
        { speaker: 'arjun', text: 'And Pryce still wants 120 days. We hold the line.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: yes, no, yes-if.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Yes-if or positive no?',
        groups: ['Yes-if', 'Positive no'],
        items: [
          { text: '"Yes, if we add two weeks."', group: 0 },
          { text: '"We pay our team monthly, so we can\'t do 120 days. We can do 40/30/30."', group: 1 },
          { text: '"Yes, if it goes in phase two."', group: 0 },
          { text: '"Our weekends matter, so no weekend work. We can start Monday early."', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Time and cost are fixed. A client adds features. What must move?',
        options: [
          { text: 'Nothing', why: 'Something has to give.' },
          { text: 'Scope: something else moves out or to later' },
          { text: 'The team\'s sleep', why: 'Unpaid overtime isn\'t a plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Four extra weeks at £2,000 a week. Cost, in pounds?',
        answers: ['8000', '8,000', '£8,000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the part of the positive no.',
        pairs: [
          ['Yes', 'Your interest'],
          ['No', 'The request'],
          ['Yes?', 'An offer'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'A client says "it\'s just a tiny tweak". It\'s two days.',
        prompt: "Arjun's best reply?",
        options: [
          { text: '"Sure, no charge."', why: 'Two days given away.' },
          { text: '"No tweaks, ever."', why: 'Yes-if works better.' },
          { text: '"Happy to. It\'s about two days, so it\'s £800, or it can go in phase two. Which would you prefer?"' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Yes-if conditions.',
        template: 'More [[1]], more money, or less [[2]].',
        blanks: [['time'], ['scope']],
        distractors: ['stress', 'sleep'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of this positive no goes wrong?',
        lines: [
          'We need to pay our team monthly.',
          'So 120-day terms don\'t work for us.',
          'I\'m so sorry, I know I\'m being difficult.',
          'We can do 40/30/30. Would that work?',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'Apologising for a reasonable no weakens it.',
      },
      {
        kind: 'mcq',
        prompt: 'Best question when someone says "all of these are must-haves"?',
        options: [
          { text: '"If we could only do four, which four?"' },
          { text: '"Are you sure?"', why: 'They\'ll say yes.' },
          { text: '"That\'s impossible."', why: 'Give them a real choice instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two days at £400 a day. Cost, in pounds?',
        answers: ['800', '£800'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to answer any unreasonable request.',
        lines: ['Find its real size', 'Decide: yes-if or positive no', 'Name the condition or the offer', 'Let them choose'],
      },
    ],
  },
  reflect: {
    prompt: 'Which unreasonable request do you face most often? Write your yes-if or positive no for it.',
    starters: ['The request:...', 'My answer:...'],
  },
  notes: 'Checkpoint for Chapter 3 lessons 1-4. 4 weeks × £2,000 = £8,000; 2 days × £400 = £800.',
};

export default lesson;
