import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Reading: your real competitors, including doing nothing. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Your real competitors',
  summary: 'Clinton says WashDay has no competitors: "There\'s no laundry app in Buea!" Miracle laughs. "Your competitor is a bucket. And Mama Rose. And a bag of laundry going home on the bus."',
  minutes: 12,
  outcomes: [
    'List every way customers solve the problem today',
    'See why "doing nothing" is often the biggest competitor',
    'Describe the job customers want done',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Everything they do instead',
      html: '<p>A competitor is <strong>anything a customer could do instead of paying you</strong>, not just businesses that look like yours. Ask: what is the job the customer wants done? For hostel students it\'s: <em>"clean, dry clothes for Monday, without losing my Saturday."</em></p><p>Everything that gets that job done, even badly, competes with WashDay:</p><ol><li><strong>A bucket and a Saturday</strong>: hand-washing. Free in money, costly in time. The most common choice by far.</li><li><strong>Mama Rose</strong>: the wash-and-iron stand at the gate. About 2,400 FCFA a basket, three days, carry it yourself.</li><li><strong>Taking it home</strong>: students from nearby towns carry a bag home at weekends.</li><li><strong>Buying more clothes</strong>: wash less often, like Esther.</li><li><strong>Living with it</strong>: damp jeans, ironing shirts dry.</li></ol><p>The hardest competitor is usually the first one: <strong>doing nothing new</strong>. It\'s free, familiar and already a habit. WashDay doesn\'t just have to be better than Mama Rose; it has to be worth changing a habit for.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"We have no competitors" usually means "I haven\'t looked at what customers do today".',
    },
  ],
  apply: {
    scenario: 'Mapping the competition.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What counts as a competitor?',
        options: [
          { text: 'Anything customers could do instead of paying you' },
          { text: 'Only businesses selling the same thing', why: 'Buckets and habits compete too.' },
          { text: 'Only apps', why: 'Most of WashDay\'s competition isn\'t an app.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Competitor for WashDay, or not?',
        groups: ['Competitor', 'Not a competitor'],
        items: [
          { text: 'Hand-washing in a bucket', group: 0 },
          { text: 'Mama Rose\'s stand', group: 0 },
          { text: 'Taking laundry home at weekends', group: 0 },
          { text: 'A food stall', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The job to be done.',
        template: 'Clean, [[1]] clothes for Monday, without losing my [[2]].',
        blanks: [['dry'], ['Saturday']],
        distractors: ['cheap', 'phone'],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'There\'s no laundry app in Buea, so I have no competition!',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Every student who washes in a bucket is choosing a competitor. Free and familiar is hard to beat.' },
          { text: 'Great, easy win.', why: 'Habits and Mama Rose are real competition.' },
          { text: 'Then nobody needs it.', why: 'No app doesn\'t mean no need; it means other solutions.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the competitor to its weakness.',
        pairs: [
          ['Hand-washing', 'Costs the whole Saturday'],
          ['Mama Rose', 'Three days; carry it yourself'],
          ['Buying more clothes', 'Expensive; still have to wash'],
          ['Taking it home', 'Only if home is nearby'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "doing nothing new" often the toughest competitor?',
        options: [
          { text: 'It\'s free, familiar and already a habit' },
          { text: 'It\'s the most advertised', why: 'Nobody advertises a bucket.' },
          { text: 'It\'s the best solution', why: 'It\'s often worse; it\'s just easy to keep doing.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many kinds of competitor does Clinton\'s list have?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Clinton\'s competitor map is wrong?',
        lines: [
          'Hand-washing: free, takes 3 hours.',
          'Mama Rose: 2,400 FCFA a basket, 3 days.',
          'Competition overall: none, because there\'s no app.',
          'Taking it home: only for students from nearby towns.',
        ],
        bug: 2,
        fix: 'Competition overall: buckets, Mama Rose, home trips, habits.',
        explanation: 'Customers already solve the problem in several ways.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order these by how many hostel students use them (most to fewest), from Clinton\'s notes.',
        lines: ['Hand-washing', 'Mama Rose (sometimes)', 'Taking it home'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is this about the job, or about a product?',
        groups: ['The job', 'A product'],
        items: [
          { text: 'Dry clothes by Monday', group: 0 },
          { text: 'A laundry app', group: 1 },
          { text: 'Not losing my Saturday', group: 0 },
          { text: 'A pickup bicycle', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'What do people do today instead of using your idea? Which of those is hardest to beat, and why?',
    starters: ['Today they...', 'Hardest to beat is...'],
  },
  deepen: {
    title: 'Jobs to be done',
    summary: 'Clayton Christensen\'s idea: customers "hire" products to get a job done. Thinking about the job, not the product category, shows competitors you\'d otherwise miss.',
  },
  notes: 'Jobs to be done: Christensen, Hall, Dillon & Duncan, Competing Against Luck (2016). Competitor list and costs are fictional story details.',
};

export default lesson;
