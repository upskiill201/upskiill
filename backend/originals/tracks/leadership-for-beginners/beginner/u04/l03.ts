import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3. Myth or Fact: praise that counts (recognition research; feedback sandwich; positivity ratio). */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Praise that counts',
  summary: 'Before meeting Diego, Lucía plans to "sandwich" the hard part between two compliments. Tey: "Ah, the feedback sandwich. Let\'s play myth or fact about praise first."',
  minutes: 11,
  outcomes: [
    'Know what research says about recognition',
    'Make praise specific enough to mean something',
    'Know why the "feedback sandwich" often fails',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Recognition at work makes a real difference to whether people stay.', isFact: true, explain: 'Fact. A Gallup and Workhuman study (2023) found employees who receive strong recognition were 45% less likely to have left their job two years later.' },
        { text: '"Great job, everyone!" is the most effective kind of praise.', isFact: false, explain: 'Myth. Vague, group praise is easy to ignore. Specific praise works better: what exactly they did, and why it mattered. "Your test sends caught two broken links before launch" lands in a way "great job" never does.' },
        { text: 'The "feedback sandwich" (praise, criticism, praise) is the best way to give hard feedback.', isFact: false, explain: 'Myth. People often remember only the bread, or learn to brace for the "but". Then your real praise starts to sound like a warning. Better: give praise and hard feedback separately, and both clearly.' },
        { text: 'There is a proven magic ratio of exactly 5.6 positive comments to 1 negative.', isFact: false, explain: 'Myth. A famous "positivity ratio" paper was heavily criticised in 2013 for its maths, and parts of it were formally withdrawn. The broader idea holds: people need far more recognition than most get. But there\'s no magic number.' },
        { text: 'Some people prefer praise in private rather than public.', isFact: true, explain: 'Fact. Remember Sofía: "Please don\'t thank me in the all-hands." Ask people how they like to be recognised.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Recognise often, and specifically: what they did and why it mattered. Skip the sandwich. Ask how they like to be thanked.',
    },
  ],
  apply: {
    scenario: 'Myth or fact, with Tey.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Employees with strong recognition were how much less likely to have left after two years (Gallup and Workhuman)?',
        options: [
          { text: '1%', why: 'Much bigger than that.' },
          { text: '100%', why: 'Nothing is that certain.' },
          { text: '45%' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'The feedback sandwich always works', group: 0 },
          { text: 'Recognition helps people stay', group: 1 },
          { text: 'There\'s a magic 5.6-to-1 ratio', group: 0 },
          { text: 'Some people prefer private praise', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Praise for Tomás: "Great job on the email!" Good?',
        prompt: 'What does Tey suggest?',
        options: [
          { text: '"GREAT job!!!"', why: 'Louder, still vague.' },
          { text: '"Your test sends caught two broken links before 12,000 people saw them. That\'s exactly the habit we needed."' },
          { text: 'Skip it; he\'s paid to do it.', why: 'Recognition matters for retention.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Good praise is ___: what they did and why it mattered. (one word)',
        answers: ['specific', 'Specific'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does the feedback sandwich often fail?',
        options: [
          { text: 'People remember the praise, or learn to brace for the "but"' },
          { text: 'It\'s too short', why: 'Length isn\'t the issue.' },
          { text: 'It\'s too honest', why: 'It\'s often not honest enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the praise to the problem.',
        pairs: [
          ['"Great job, everyone!"', 'Too vague'],
          ['Praise, but..., praise', 'The sandwich'],
          ['"Your test sends caught two broken links"', 'Specific, works'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Lucía\'s plan for Diego. Which line is the sandwich?',
        lines: [
          'Open with the SBI about the comment.',
          'Wrap the SBI between two compliments so it\'s softer.',
          'Separately, this week: thank him for mentoring Tomás.',
        ],
        bug: 1,
        fix: 'Keep it clear and kind, without padding.',
        explanation: 'Padding blurs the message. Give praise and hard feedback separately.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put specific praise in order.',
        lines: ['Name what they did', 'Say why it mattered', 'Say it soon', 'In the way they like'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'What they [[1]], and why it [[2]].',
        blanks: [['did'], ['mattered']],
        distractors: ['are', 'cost'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the end of good praise.',
        tiles: ['That\'s', 'exactly', 'what', 'we', 'needed.'],
        distractors: ['but'],
      },
    ],
  },
  reflect: {
    prompt: 'When was the last time someone praised you specifically? What did they say, and how did it feel compared with "great job"?',
    starters: ['They said...', 'It felt...'],
  },
  deepen: {
    title: 'One specific thank-you',
    summary: 'Today, thank one person specifically: what they did and why it mattered. One sentence. Watch their face.',
  },
  notes: 'Gallup & Workhuman (2023), "Empowering Workplace Recognition": employees receiving strong recognition 45% less likely to have turned over after two years. Positivity ratio: Fredrickson & Losada (2005) critiqued by Brown, Sokal & Friedman (2013), American Psychologist; mathematical modelling element formally withdrawn. Feedback sandwich critique: common in feedback literature (e.g. von Bergen et al. 2014), hedged as "often".',
};

export default lesson;
