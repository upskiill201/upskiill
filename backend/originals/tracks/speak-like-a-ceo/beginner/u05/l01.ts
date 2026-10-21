import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: the ten dreaded questions. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The ten dreaded questions',
  summary: 'Six days to go. The talk is ready. The questions aren\'t. Carmen makes Lucía write down the ten questions she\'d hate to be asked.',
  minutes: 11,
  outcomes: [
    'See why Q&A can be prepared',
    'List the questions you dread',
    'Know what this chapter covers',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday evening',
      beats: [
        { speaker: 'carmen', text: 'Write the ten questions you\'d hate to get. Not the easy ones. The ones that make your stomach drop.' },
        { speaker: 'lucia', text: 'Why Monterrey and not Puebla? Was the target too low? What if the plant fails? What did it cost?' },
        { speaker: 'diego', text: 'Good. Now the worst one: something you can\'t answer at all.' },
        { speaker: 'lucia', text: '"What will chili-lime sell next year?" I have no idea.' },
        { speaker: 'tey', text: 'This chapter: answering questions, tough questions, "I don\'t know", nerves on the day, and the Encuentro itself.' },
      ],
      choice: {
        prompt: 'What should Lucía do with the list?',
        options: [
          { text: 'Practise a short answer to each, out loud', outcome: 'Yes. Most real questions will be on or near the list.', best: true },
          { text: 'Hope nobody asks them', outcome: 'Someone usually does.' },
          { text: 'Put all ten answers on slides', outcome: 'That\'s ten more slides. Keep them ready, not shown.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'List the ten questions you dread. Practise a short answer to each, out loud.',
    },
  ],
  apply: {
    scenario: 'The ten dreaded questions.',
    items: [
      {
        kind: 'typeAnswer',
        prompt: 'How many questions did Carmen ask Lucía to write down?',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Which questions should go on the list?',
        options: [
          { text: 'The ones that make your stomach drop' },
          { text: 'The easy ones', why: 'The hard ones.' },
          { text: 'Only ones you know the answer to', why: 'The ones you dread.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Easy question or dreaded question?',
        groups: ['Easy', 'Dreaded'],
        items: [
          { text: '"When did it launch?"', group: 0 },
          { text: '"Was the target too low?"', group: 1 },
          { text: '"What flavour is it?"', group: 0 },
          { text: '"What if the plant fails?"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Writing them down makes me more nervous, not less.',
        prompt: "Carmen\'s best reply?",
        options: [
          { text: 'For an hour, maybe. Then you\'ll have an answer for each, and the dread goes. A question you\'ve practised isn\'t scary.' },
          { text: 'Then stop.', why: 'Preparation reduces the dread.' },
          { text: 'Write a hundred.', why: 'Ten is enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to its topic.',
        pairs: [
          ['"Why not Puebla?"', 'The rollout choice'],
          ['"Was the target too low?"', 'The 38% result'],
          ['"What if the plant fails?"', 'The main risk'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The tip.',
        template: 'List the questions you [[1]]. Practise each one out [[2]].',
        blanks: [['dread'], ['loud']],
        distractors: ['love', 'quietly'],
      },
      {
        kind: 'mcq',
        prompt: 'Which question can\'t Lucía answer at all?',
        options: [
          { text: '"What will chili-lime sell next year?"' },
          { text: '"Why Monterrey?"', why: 'She can answer that.' },
          { text: '"What did it cost?"', why: 'She can answer that.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Lucía\'s Q&A plan is the mistake?',
        lines: [
          'Write the ten questions I dread.',
          'Practise a 30-second answer to each.',
          'Put all ten answers on slides at the end.',
          'Ask the team to fire them at me.',
        ],
        bug: 2,
        fix: 'Keep a few backup slides hidden, ready if needed.',
        explanation: 'Ten answer slides is a second talk.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order what this chapter covers.',
        lines: ['Answering questions', 'Tough questions', '"I don\'t know"', 'Nerves on the day', 'The Encuentro'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many days until the Encuentro?',
        answers: ['6', 'six'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'For your next talk or meeting, write the three questions you\'d hate to be asked. Answer each out loud.',
    starters: ['Question 1:...', 'My answer:...'],
  },
  deepen: {
    title: 'Q&A is part of the talk',
    summary: 'For many audiences, the questions are when they decide whether you really know your subject. Preparing for them is preparing the talk.',
  },
  notes: 'Fictional: ten dreaded questions, six days before the Encuentro. Preparing likely questions: standard presentation practice.',
};

export default lesson;
