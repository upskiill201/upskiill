import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 4. Compare: one slide, before and after. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'One slide, before and after',
  summary: 'Lucía rebuilds her sales slide. Same numbers. One version makes the audience read; the other makes them look, and listen to her.',
  minutes: 12,
  outcomes: [
    'Rebuild a text slide as a picture slide',
    'Write a slide title that says the point',
    'Keep your words in your mouth, not on the screen',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The sales slide',
      before: {
        label: 'Before',
        text: 'Title: "Sales Update"\n- Week 1 sales: 92,000 bags\n- Week 2 sales: 110,000 bags\n- Strong growth observed in Guadalajara\n- Stock issue in week 3\n- Overall performance above target by 38%\n- Best launch in three years\n(Lucía reads each line aloud.)',
      },
      after: {
        label: 'After',
        text: 'Title: "Our best launch in three years: 38% above target"\nOne line chart: sales vs target, nine weeks. The gap between the lines is shaded orange.\nNo bullets.\n(Lucía says: "This orange gap is what shop owners told us to make." Then she pauses.)',
      },
      notes: [
        'The title is the point (signalling).',
        'One chart replaces six bullets (coherence).',
        'Her words are spoken, not printed (redundancy).',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A slide title that says the point, one picture, nothing to read aloud.',
    },
  ],
  apply: {
    scenario: 'The sales slide.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the new slide title?',
        options: [
          { text: '"Our best launch in three years: 38% above target"' },
          { text: '"Sales Update"', why: 'That was the old one.' },
          { text: '"Slide 7"', why: 'The title says the point.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Before slide or after slide?',
        groups: ['Before', 'After'],
        items: [
          { text: 'Six bullet points', group: 0 },
          { text: 'One line chart', group: 1 },
          { text: '"Sales Update"', group: 0 },
          { text: 'A shaded orange gap', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bullet points did the old slide have?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the change to Mayer\'s principle.',
        pairs: [
          ['Title says the point', 'Signalling'],
          ['One chart replaces bullets', 'Coherence'],
          ['Words spoken, not printed', 'Redundancy'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'diego',
        message: 'The after slide has almost nothing on it. People will think you\'re lazy.',
        prompt: "Lucía\'s best reply?",
        options: [
          { text: 'They\'ll look at the gap and listen to me. That\'s the job. The detail is in the handout.' },
          { text: 'You\'re right, add the bullets back.', why: 'The slide supports the talk.' },
          { text: 'Add more charts to the same slide.', why: 'One idea per slide.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'One [[1]], and nothing to read [[2]].',
        blanks: [['picture', 'chart'], ['aloud']],
        distractors: ['paragraph', 'silently'],
      },
      {
        kind: 'mcq',
        prompt: 'What does the orange gap show?',
        options: [
          { text: 'How far sales were above target' },
          { text: 'The stock issue', why: 'The gap above target.' },
          { text: 'Nothing', why: 'The gap above target.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the slide plan is the mistake?',
        lines: [
          'Title: our best launch in three years.',
          'One chart: sales vs target.',
          'Shade the gap orange.',
          'Add the six bullets underneath, in small text.',
        ],
        bug: 3,
        fix: 'Delete it.',
        explanation: 'Small bullets bring back reading and redundancy.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the rebuild.',
        lines: ['Find the point', 'Make it the title', 'Pick one chart', 'Highlight the key part', 'Delete the bullets'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many weeks does the chart show sales?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Rebuild one of your own text-heavy slides as a single picture with a point title.',
    starters: ['Old title:...', 'New title:...'],
  },
  deepen: {
    title: 'Handouts are separate',
    summary: 'If people need the detail, give it to them in a document after. Slides that try to be handouts end up as neither.',
  },
  notes: 'Applies Mayer\'s coherence, signalling and redundancy principles. Fictional sales figures.',
};

export default lesson;
