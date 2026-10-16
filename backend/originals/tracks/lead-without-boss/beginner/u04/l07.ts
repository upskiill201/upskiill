import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 7. Step-by-step: keeping momentum with small wins (Weick 1984; Amabile & Kramer 2011). */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Small wins keep it alive',
  summary: 'Week 5, Friday. The team is tired. Twenty-one days to eleven is huge, but it doesn\'t feel huge, because the goal is five. Njeri: "Are we winning or losing?" Remi realises nobody knows. Tey shows him how to make progress visible.',
  minutes: 12,
  outcomes: [
    'Know why small wins matter in long projects',
    'Make progress visible every week',
    'Celebrate steps without declaring victory too early',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Small wins in five steps',
      steps: [
        { title: '1. Break the big goal into steps', body: 'Organisational psychologist Karl Weick argued in 1984 that huge problems feel impossible, which freezes people. Small, concrete wins feel doable. 21 to 5 is huge. 11 to 9 by Saturday is doable.' },
        { title: '2. Pick one number everyone watches', body: 'Average days to refund, updated every Friday. One number, the same chart, every week. Zanele\'s spreadsheet becomes a single line going down.' },
        { title: '3. Show it where people work', body: 'On the Finance door, the warehouse board, Emeka\'s screen in Lagos. Remember the progress principle (Amabile and Kramer): seeing progress on meaningful work is one of the biggest boosts to motivation.' },
        { title: '4. Connect each win to a person', body: '"Down two days: Felix\'s Saturday change." Every step on the chart has a name next to it.' },
        { title: '5. Celebrate the step, not the finish', body: 'Kotter warns against declaring victory too soon. So celebrate "11 to 9" as a step: "Halfway there, and the hardest half is done." Keep the goal in view.' },
      ],
    },
    {
      kind: 'compare',
      title: 'Friday\'s update, two ways',
      before: { label: 'No progress shown', text: '"Still working on it. Lots happening. Thanks all for your hard work."' },
      after: { label: 'Small win', text: '"21 days to 11 in four weeks. Felix\'s Saturday change should get us to 9. Halfway there. Next: Emeka\'s reference field."' },
      notes: ['The first gives nothing to feel good about.', 'The second shows the line going down, and who moved it.', 'It celebrates the step and names the next one.'],
    },
  ],
  apply: {
    scenario: 'Week 5, Friday.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Break the goal into steps', 'Pick one number', 'Show it where people work', 'Connect each win to a person', 'Celebrate the step, not the finish'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Weick say small wins matter?',
        options: [
          { text: 'Small goals are lazy', why: 'They\'re stepping stones.' },
          { text: 'Huge problems feel impossible; small concrete wins feel doable' },
          { text: 'Big goals don\'t matter', why: 'The big goal stays. Small wins get you there.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds momentum, or drains it?',
        groups: ['Builds it', 'Drains it'],
        items: [
          { text: '"21 to 11 in four weeks."', group: 0 },
          { text: '"Still working on it."', group: 1 },
          { text: 'The chart on the warehouse board', group: 0 },
          { text: '"We\'re done!" at 11 days', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'njeri',
        message: 'So are we winning or losing?',
        prompt: 'Remi\'s best reply?',
        options: [
          { text: 'Winning. 21 to 11, and your form did a third of that. Saturday should get us to 9.' },
          { text: 'Hard to say really.', why: 'If the leader doesn\'t know, nobody does.' },
          { text: 'Losing: we\'re not at 5 yet.', why: 'True, and it ignores huge progress.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Weick called them small ___. (one word)',
        answers: ['wins', 'Wins'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why celebrate "11 to 9" as a step, not a finish?',
        options: [
          { text: 'Celebrations are bad', why: 'Celebrate. Just keep the goal in view.' },
          { text: 'Declaring victory too early lets energy drop before the goal' },
          { text: 'Kamau hasn\'t approved it', why: 'It\'s about momentum.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s Friday chart. Which label breaks step 4?',
        lines: [
          'Week 3: down 5 days (Njeri\'s form)',
          'Week 4: down 3 days (various)',
          'Week 5: down 2 days (Emeka\'s first Lagos fix)',
        ],
        bug: 1,
        fix: 'Week 4: down 3 days (Wanjiku\'s sample-check)',
        explanation: '"Various" hides the person who moved the line.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idea to its source.',
        pairs: [
          ['Small wins', 'Karl Weick'],
          ['Progress principle', 'Amabile and Kramer'],
          ['Don\'t declare victory too soon', 'John Kotter'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Celebrate the [[1]], not the [[2]]. One [[3]] everyone watches.',
        blanks: [['step'], ['finish'], ['number']],
        distractors: ['boss', 'slide'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Friday\'s headline.',
        tiles: ['Halfway', 'there.', 'Hardest', 'half', 'done.'],
        distractors: ['Finished.'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a long goal you\'re working on. What\'s one number you could track weekly? What was your last small win?',
    starters: ['My number could be...', 'My last small win was...'],
  },
  deepen: {
    title: 'One line going down',
    summary: 'Pick one number for something you\'re working on. Write it down every Friday for three weeks. Watch the line, and notice how it feels.',
  },
  notes: 'Karl E. Weick (1984), "Small Wins: Redefining the Scale of Social Problems", American Psychologist 39(1). Teresa Amabile & Steven Kramer, The Progress Principle (2011). John P. Kotter (1995/1996): don\'t declare victory too soon. Fictional figures.',
};

export default lesson;
