import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 6. Before/After: need inflation. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'When wants become "needs"',
  summary: 'Three months ago Ada said "I\'ll take a ride, it\'s raining." Now she says "I need a ride, I can\'t do the bus." Same trip, same city. Before and after: how the words around spending change.',
  minutes: 11,
  outcomes: [
    'Notice when "want" language turns into "need" language',
    'Ask the question that tests a "need"',
    'Rename a creeping "need" honestly',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Ada\'s words, three months apart',
      before: {
        label: 'Month 1 after the raise',
        text: '"It\'s raining, I\'ll treat myself to a ride."\n"Long day, let\'s order in tonight."\n"The new phone looks nice, maybe one day."\n"I should try that gym sometime."',
      },
      after: {
        label: 'Month 3 after the raise',
        text: '"I need a ride, I can\'t do the bus any more."\n"I need delivery, I don\'t have time to cook."\n"I needed a new phone, mine was old."\n"I need the gym, it\'s self-care." (Visits this month: 2)',
      },
      notes: [
        '"Treat", "maybe", "sometime" are want words. "Need", "can\'t", "have to" are need words. The words changed before the facts did.',
        'Nothing in Ada\'s life made the bus impossible or cooking impossible. The upgrades just became normal.',
        'The test: "What would actually happen if I went back to the basic version for a month?" For most of these: a bit less comfort. Nothing worse.',
        'Renaming honestly helps: "I like rides more than the bus" is true, and it\'s a fine choice, as a choice.',
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When you hear yourself say "I need", ask: what would actually happen if I went back to the basic version for a month?',
    },
  ],
  apply: {
    scenario: 'Need inflation.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Want words or need words?',
        groups: ['Want words', 'Need words'],
        items: [
          { text: '"I\'ll treat myself"', group: 0 },
          { text: '"I can\'t do without it"', group: 1 },
          { text: '"Maybe one day"', group: 0 },
          { text: '"I have to"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What changed between month 1 and month 3?',
        options: [
          { text: 'Ada\'s words, not her real situation' },
          { text: 'The buses stopped running', why: 'They still run.' },
          { text: 'Her job moved further away', why: 'Same job, same commute.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'I NEED the gym. It\'s self-care.',
        prompt: 'Lucía\'s best reply?',
        options: [
          { text: 'Yes, keep paying.', why: 'She went twice.' },
          { text: 'Exercise is self-care. Two visits a month for ₦12,000 isn\'t, though. What if you ran with Ngozi on Saturdays instead?' },
          { text: 'Self-care is a waste.', why: 'Self-care matters. The question is what form works.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The test.',
        template: 'What would actually [[1]] if I went back to the [[2]] version for a month?',
        blanks: [['happen'], ['basic']],
        distractors: ['cost', 'fancy'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Gym ₦12,000 a month, visited twice. Cost per visit?',
        answers: ['6000', '6,000', '₦6,000', '₦6000'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each "need" to an honest rename.',
        pairs: [
          ['"I need rides"', '"I prefer rides to the bus"'],
          ['"I need delivery"', '"I\'d rather not cook most nights"'],
          ['"I needed a new phone"', '"I wanted a nicer phone"'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which of these is a genuine need?',
        lines: [
          'I need rides because the bus is beneath me now.',
          'I need medicine for my asthma.',
          'I need delivery because cooking is boring.',
        ],
        bug: 1,
        fix: 'Medicine is a must-have; the others are choices.',
        explanation: 'Here the "bug" is the odd one out: the only real need on the list.',
      },
      {
        kind: 'mcq',
        prompt: 'Why rename a "need" honestly?',
        options: [
          { text: 'To feel guilty', why: 'It\'s about clarity, not guilt.' },
          { text: 'It doesn\'t matter', why: 'Words shape what feels possible to change.' },
          { text: 'It turns it back into a choice you can make on purpose' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Order how need inflation happens.',
        lines: ['A treat once', 'A treat often', 'It becomes normal', 'It\'s called a "need"'],
      },
      {
        kind: 'mcq',
        prompt: 'If Ada went back to the bus for a month, what would happen?',
        options: [
          { text: 'She\'d lose her job', why: 'She got to work by bus before.' },
          { text: 'A bit less comfort, longer trips, about ₦35,000 saved' },
          { text: 'Nothing at all', why: 'There\'d be some discomfort, and real savings.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing you call a "need" that might really be a "want" you\'ve got used to? What\'s the honest name for it?',
    starters: ['I say I need...', 'Honestly, it\'s...'],
  },
  deepen: {
    title: 'Words shape choices',
    summary: 'The language we use about spending changes how fixed it feels. "I can\'t" makes something feel impossible to change. "I choose not to" or "I prefer" keeps the decision in your hands.',
  },
  notes: 'Fictional dialogue. Gym 12,000/2 visits = 6,000 per visit. findBug here uses the "odd one out" variant (the real need), explained in-lesson.',
};

export default lesson;
