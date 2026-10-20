import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Reading: name it to tame it, and flooding. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Name it to tame it',
  summary: 'Why did "I can hear how much pressure you\'re under" work so fast? Priya sends Grace two pieces of research: one on naming feelings, one on what happens when we\'re "flooded".',
  minutes: 12,
  outcomes: [
    'Know why naming a feeling calms it',
    'Recognise flooding in yourself and others',
    'Use a real break when someone is flooded',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Labels and floods',
      html: '<p><strong>Naming calms.</strong> In a 2007 brain-scanning study, Matthew Lieberman and colleagues showed people pictures of angry or frightened faces. When people <em>labelled</em> the emotion ("angry"), activity in the amygdala, the brain\'s alarm system, dropped. Putting feelings into words seems to put a brake on them. That works when you name your own feeling, and when you gently name someone else\'s: "That sounds really frustrating."</p><p><strong>Flooding blocks thinking.</strong> Relationship researcher John Gottman described "flooding": when an argument gets heated enough, the body goes into fight-or-flight. Heart rate rises (he often cites above about 100 beats a minute), and listening becomes very hard. Gottman\'s advice is to take a real break, about 20 minutes, doing something calming, not rehearsing the argument, and then come back.</p><p>For Grace: naming Femi\'s pressure lowered his alarm. If he had been flooded, the best move would have been a 20-minute pause, not a better argument.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Name the feeling to calm it. If someone is flooded, take a real 20-minute break, then come back.',
    },
  ],
  apply: {
    scenario: 'Labels and floods.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What happened in Lieberman\'s study when people labelled an emotion?',
        options: [
          { text: 'Activity in the amygdala, the brain\'s alarm, dropped' },
          { text: 'They got angrier', why: 'Labelling calmed the alarm.' },
          { text: 'Nothing changed', why: 'It reduced amygdala activity.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many minutes of break does Gottman suggest when someone is flooded?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Sign of flooding, or not?',
        groups: ['Flooding', 'Not flooding'],
        items: [
          { text: 'Racing heart, can\'t take in what\'s said', group: 0 },
          { text: 'Calmly disagreeing', group: 1 },
          { text: 'Repeating the same point louder', group: 0 },
          { text: 'Asking questions', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the finding to the researcher.',
        pairs: [
          ['Naming feelings calms the alarm', 'Matthew Lieberman'],
          ['Flooding blocks listening', 'Gottman: heart rate up, listening down'],
          ['Take a 20-minute break', 'Gottman: calm down, then come back'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: 'During the break, I\'ll plan my best comeback.',
        prompt: "Priya's best reply?",
        options: [
          { text: 'That keeps you flooded. Do something calming instead: a walk, a tea. Come back to listen, not to win.' },
          { text: 'Good idea.', why: 'Rehearsing the fight keeps the alarm on.' },
          { text: 'Don\'t come back at all.', why: 'Coming back is what makes it a pause.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Name it to [[1]] it.',
        blanks: [['tame', 'calm']],
        distractors: ['blame', 'shame'],
      },
      {
        kind: 'mcq',
        prompt: 'What does Gottman suggest doing during the break?',
        options: [
          { text: 'Something calming, not rehearsing the argument' },
          { text: 'Writing a long email to them', why: 'That keeps you in the fight.' },
          { text: 'Telling colleagues what happened', why: 'That spreads it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Grace\'s notes misreads the research?',
        lines: [
          'Naming a feeling can calm it.',
          'Flooding makes listening very hard.',
          'When someone is flooded, argue faster.',
          'Take a real break, then come back.',
        ],
        bug: 2,
        fix: 'When someone is flooded, pause.',
        explanation: 'Flooded people can\'t take in arguments.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which year was Lieberman\'s labelling study published?',
        answers: ['2007'],
        placeholder: 'A year',
      },
      {
        kind: 'orderLines',
        prompt: 'Order a good break.',
        lines: ['Notice flooding', 'Say you need a pause and when you\'ll return', 'Do something calming', 'Come back to listen'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you notice in your body when you\'re close to flooding? What calms you in 20 minutes?',
    starters: ['I notice...', 'What calms me is...'],
  },
  deepen: {
    title: 'Labelling, gently',
    summary: 'Naming someone else\'s feeling works best as a tentative guess ("It sounds like...", "I wonder if..."), not a verdict ("You\'re angry"). Guesses invite correction; verdicts invite defence.',
  },
  notes: 'Lieberman et al. (2007), "Putting feelings into words: Affect labeling disrupts amygdala activity in response to affective stimuli", Psychological Science 18(5). Gottman, flooding and self-soothing breaks (~20 minutes), e.g. Gottman & Silver, The Seven Principles for Making Marriage Work (1999); heart-rate threshold commonly cited as ~100 bpm.',
};

export default lesson;
