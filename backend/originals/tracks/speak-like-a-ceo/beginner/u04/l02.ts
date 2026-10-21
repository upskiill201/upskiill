import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 2. Step-by-step: the self-check. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The self-check',
  summary: 'Lucía turns Diego\'s recording into a routine she can do alone, with just a phone and her talk card.',
  minutes: 12,
  outcomes: [
    'Record and review yourself in five steps',
    'Measure pace, pauses, fillers and eye contact',
    'Pick one or two fixes at a time',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Five steps to a self-check',
      steps: [
        { title: '1. Record two minutes', body: 'Prop up your phone where the audience would be. Give the opening and one part of the talk.' },
        { title: '2. Watch with the sound off', body: 'Look at your eyes, hands and posture. Where are you looking? Are your hands busy or calm?' },
        { title: '3. Listen without watching', body: 'Count words in one minute, fillers, and pauses. Can you hear the signposts?' },
        { title: '4. Check against your card', body: 'Headline first? Three points? Message at the close? Tick or cross each check.' },
        { title: '5. Pick one or two fixes', body: 'Not ten. Practise those, then record again. Compare the two videos.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Record, watch silent, listen blind, check the card, fix one or two things, record again.',
    },
  ],
  apply: {
    scenario: 'The self-check.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the five steps.',
        lines: ['Record two minutes', 'Watch with sound off', 'Listen without watching', 'Check against your card', 'Pick one or two fixes'],
      },
      {
        kind: 'mcq',
        prompt: 'Why watch with the sound off?',
        options: [
          { text: 'To notice eyes, hands and posture without being distracted by words' },
          { text: 'To save battery', why: 'To see body language.' },
          { text: 'No reason', why: 'To see body language.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Spot it by watching, or by listening?',
        groups: ['Watching (sound off)', 'Listening'],
        items: [
          { text: 'Eyes on the screen', group: 0 },
          { text: 'Words per minute', group: 1 },
          { text: 'Fiddling with a pen', group: 0 },
          { text: 'Number of ums', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes should you record?',
        answers: ['2', 'two'],
        placeholder: 'A number',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to what you check.',
        pairs: [
          ['Sound off', 'Eyes, hands, posture'],
          ['Listen only', 'Pace, fillers, pauses'],
          ['Talk card', 'Structure and message'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I found eleven things to fix. Where do I start?',
        prompt: "Diego\'s best reply?",
        options: [
          { text: 'Pick the two that would make the biggest difference. Pace and eye contact. The rest can wait.' },
          { text: 'Fix all eleven tonight.', why: 'One or two at a time.' },
          { text: 'Give up, it\'s too many.', why: 'Pick two.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Step 5.',
        template: 'Pick one or [[1]] fixes, then [[2]] again.',
        blanks: [['two'], ['record']],
        distractors: ['ten', 'cancel'],
      },
      {
        kind: 'mcq',
        prompt: 'Where should you prop up the phone?',
        options: [
          { text: 'Where the audience would be' },
          { text: 'Behind you', why: 'Where the audience would be.' },
          { text: 'On the floor facing the ceiling', why: 'Where the audience would be.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Lucía\'s routine is the mistake?',
        lines: [
          'Record the opening and part 1.',
          'Watch it silent, then listen without watching.',
          'Try to fix all eleven problems at once.',
          'Record again and compare.',
        ],
        bug: 2,
        fix: 'Pick the two biggest.',
        explanation: 'Too many fixes at once and none of them stick.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many problems did Lucía find?',
        answers: ['11', 'eleven'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Do the five-step self-check on two minutes of yourself. What are your two fixes?',
    starters: ['Fix 1:...', 'Fix 2:...'],
  },
  deepen: {
    title: 'Feedback you control',
    summary: 'A recording is feedback you can get any time, without asking anyone. Paired with a checklist, it turns "I think I did OK" into something you can measure.',
  },
  notes: 'Self-check routine: practical, Phase One (record yourself + checklist; no AI feedback).',
};

export default lesson;
