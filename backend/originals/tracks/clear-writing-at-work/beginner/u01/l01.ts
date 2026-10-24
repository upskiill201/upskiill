import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story: the question mark. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The question mark',
  summary: 'Zanele found why 1 in 3 Synergix deliveries was late. Now she runs the Saturday pilot and writes Mr Kamau a weekly update: 900 careful words. His reply is one character: "?"',
  minutes: 11,
  outcomes: [
    'See why long work messages often go unread',
    'Notice what busy readers actually need',
    'Know what this course covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week one of the pilot',
      beats: [
        { speaker: 'narrator', text: 'April. The Saturday dispatch pilot is running at the Nairobi depot. Zanele owns the numbers.' },
        { speaker: 'narrator', text: 'Friday evening she sends Mr Kamau her first update: 900 words, six paragraphs, the result in paragraph five.' },
        { speaker: 'narrator', text: 'Monday, 7:02 a.m., his reply: "?"' },
        { speaker: 'achieng', text: '(dryly) He reads the first two lines of everything. Your first two lines were about the weather in Nairobi.' },
        { speaker: 'zanele', text: 'I wanted it to look thorough. English is my third language. Long sounds more professional.' },
        { speaker: 'tey', text: 'This course: write less, use plain words, put the point first, make documents skimmable, and handle hard messages.' },
      ],
      choice: {
        prompt: 'What should Zanele\'s first two lines have said?',
        options: [
          { text: '"Week 1: late deliveries at Nairobi fell from 34% to 23%. No action needed from you yet."', outcome: 'Right. The result and what he needs to do, in two lines.', best: true },
          { text: '"I hope this email finds you well. It has been a busy week at the depot."', outcome: 'Polite, but he stops reading before the point.' },
          { text: '"Please see the attached 12-page report."', outcome: 'He won\'t open it before he knows why.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Assume your reader reads two lines. Make those two lines the point.',
    },
  ],
  apply: {
    scenario: 'The question mark.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many words was Zanele\'s first update?',
        answers: ['900'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Where was the result in Zanele\'s email?',
        options: [
          { text: 'In the subject line', why: 'That\'s where it should have been.' },
          { text: 'In paragraph five' },
          { text: 'Nowhere', why: 'It was there, but buried.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the first two lines, or later?',
        groups: ['First two lines', 'Later or not at all'],
        items: [
          { text: 'Late deliveries fell from 34% to 23%', group: 0 },
          { text: 'The weather in Nairobi', group: 1 },
          { text: 'What Mr Kamau needs to do', group: 0 },
          { text: 'How she cleaned the data', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'If I write less, won\'t he think I didn\'t work hard?',
        prompt: "Mrs Achieng's best reply?",
        options: [
          { text: 'Yes, so write more.', why: 'He didn\'t read the 900.' },
          { text: 'Don\'t send updates at all.', why: 'He needs them, short.' },
          { text: 'He\'ll think you\'re clear. The hard work shows in the result, not the word count.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to what they need first.',
        pairs: [
          ['Mr Kamau (CEO)', 'The result and any decision'],
          ['Emeka (logistics)', 'What he must do and by when'],
          ['Felix (IT)', 'Exactly what data is wrong'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'Assume your reader reads [[1]] lines. Make those lines the [[2]].',
        blanks: [['two', '2'], ['point']],
        distractors: ['twenty', 'greeting'],
      },
      {
        kind: 'mcq',
        prompt: 'What did "?" from Mr Kamau most likely mean?',
        options: [
          { text: '"What\'s the point? What do you need from me?"' },
          { text: '"Great work!"', why: 'He couldn\'t find the point.' },
          { text: '"You\'re fired."', why: 'He just needed the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Zanele\'s first draft should go first?',
        lines: [
          'I hope you had a good week.',
          'It has been a busy few days at the depot.',
          'Late deliveries fell from 34% to 23% in week 1.',
          'I have attached the full analysis.',
        ],
        bug: 0,
        fix: 'Start with: Late deliveries fell from 34% to 23% in week 1.',
        explanation: 'The greeting buries the result.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this course covers.',
        lines: ['Write less', 'Plain words', 'The point first', 'Skimmable documents', 'Hard messages'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'At what time did Mr Kamau reply? (e.g. 7:02)',
        answers: ['7:02', '7.02', '702', '7:02 am', '7:02 a.m.'],
        placeholder: 'A time',
      },
    ],
  },
  reflect: {
    prompt: 'Open your last important email. Do the first two lines say the point?',
    starters: ['My first two lines said...', 'They should say...'],
  },
  deepen: {
    title: 'Busy readers',
    summary: 'Most people at work skim. Researchers who study busy readers find that shorter, clearer messages get more replies and faster action.',
  },
  notes: 'Continues Data Science for Beginners: March late rate 34% (0.3375); Saturday dispatch pilot at Nairobi in April (Kamau). Fictional week-1 result 23%.',
};

export default lesson;
