import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 1. The first rehearsal: great words, delivered like a hostage video. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The first rehearsal',
  summary: 'Monday lunchtime. Ada rehearses Pitch v3 for eight colleagues in the meeting room. She reads it off her phone, eyes on the floor, and finishes in 41 seconds flat. Silence. Then Tunde, kindly: "Great words. But it sounded like a hostage video."',
  minutes: 12,
  outcomes: [
    'See how delivery can sink great words',
    'Spot the most common delivery mistakes',
    'Know this chapter\'s goal: say it like you mean it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The meeting room, Monday, 1 p.m. Two weeks to go.',
      beats: [
        { speaker: 'narrator', text: 'Eight colleagues with jollof rice. Ada at the front, holding her phone like a shield.' },
        { speaker: 'ada', text: '(reading fast, eyes on the screen) "Tencolleaguestwohundredthousandnairaamonthonenotebookwhatcouldpossiblygowrong." (scrolls) "OnedayTundeswore..."' },
        { speaker: 'narrator', text: '41 seconds later, she looks up for the first time. Silence. Someone\'s spoon clinks.' },
        { speaker: 'narrator', text: 'Tunde: "Ada. Those are great words. Really. But it sounded like a hostage video. Blink twice if you need help."' },
        { speaker: 'ada', text: '(texting Arjun) The words are good. Everyone says so. So why did it feel so bad?' },
        { speaker: 'arjun', text: 'Because pitch night isn\'t an essay. People will judge you as much on HOW you say it. Two weeks. Let\'s work on you, not the words.' },
      ],
      choice: {
        prompt: 'What should Ada fix first?',
        options: [
          {
            text: 'Put the phone down and know the pitch well enough to look at people',
            outcome: 'Arjun: "Yes. Reading kills eye contact, pace and confidence all at once. Learn the beats, not the script, and you\'ll find the rest gets easier."',
            best: true,
          },
          {
            text: 'Rewrite the words again',
            outcome: 'The words are already strong; Arjun remembered them from one read. Changing them again won\'t fix a delivery problem.',
          },
          {
            text: 'Speak even faster, to get it over with',
            outcome: '41 seconds was already too fast. Rushing is the nerves talking.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>Delivery matters.</strong> The same words can sound confident or terrified depending on how they're said. This chapter: what research says investors really respond to, how to rehearse, how to handle nerves, why you shouldn't memorise every word, your voice and body, and what to do if your mind goes blank.</p>",
    },
  ],
  apply: {
    scenario: 'The hostage video.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Ada\'s rehearsal go badly when the words were good?',
        options: [
          { text: 'The words were bad', why: 'Everyone agreed they were good.' },
          { text: 'She read from her phone, looked at the floor and rushed' },
          { text: 'Her colleagues were eating', why: 'Jollof isn\'t the problem.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Words problem, or delivery problem?',
        groups: ['Words', 'Delivery'],
        items: [
          { text: 'Reading from her phone', group: 1 },
          { text: 'Talking about databases', group: 0 },
          { text: 'Finishing in 41 seconds', group: 1 },
          { text: 'Buzzwords like "seamless solution"', group: 0 },
          { text: 'Eyes on the floor', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'If the words are good, shouldn\'t that be enough?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Yes, delivery never matters.', why: 'The meeting room says otherwise.' },
          { text: 'Then send the judges a PDF instead.', why: 'It\'s a live pitch night.' },
          { text: 'On a page, yes. Spoken, people also judge how you say it: your voice, your eyes, your pace.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada finished her 60-second pitch in how many seconds? (a number)',
        answers: ['41', 'forty-one', 'forty one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the first thing Ada should change?',
        options: [
          { text: 'Put the phone down and learn it well enough to look at people' },
          { text: 'Rewrite the words', why: 'The words work.' },
          { text: 'Practise in private only', why: 'She\'ll need an audience to practise for an audience.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the rehearsal in order.',
        lines: ['Ada holds her phone like a shield.', 'She reads fast, eyes on the screen.', 'She finishes in 41 seconds.', 'Silence. A spoon clinks.', 'Tunde: "a hostage video".'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s plan for next time. Which idea won\'t help?',
        lines: [
          'Learn the beats so I don\'t need my phone.',
          'Speak even faster so it\'s over sooner.',
          'Look at people while I talk.',
        ],
        bug: 1,
        fix: 'Slow down and leave room for pauses.',
        explanation: 'Rushing was part of the problem. 60 seconds is time to use, not survive.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review: each chapter\'s focus.',
        pairs: [
          ['Chapter 1', 'Structure and the one sentence'],
          ['Chapter 3', 'Making it memorable'],
          ['Chapter 4', 'Delivery'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s point.',
        template: 'Pitch night isn\'t an [[1]]. People judge you as much on [[2]] you say it. Let\'s work on you, not the [[3]].',
        blanks: [['essay'], ['how'], ['words']],
        distractors: ['database', 'what'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tunde\'s verdict.',
        tiles: ['Great', 'words.', 'But', 'say', 'it', 'like', 'you', 'mean', 'it.'],
        distractors: ['faster'],
      },
    ],
  },
  reflect: {
    prompt: 'Record yourself saying your pitch on your phone. Watch it back. What would a friend say about your delivery: eyes, pace, voice?',
    starters: ['My eyes were...', 'My pace was...', 'My voice was...'],
  },
  deepen: {
    title: 'Watch with the sound off',
    summary: 'Watch your recording with the sound off. What does your body say? Then listen without watching. What does your voice say? Each tells you something different.',
  },
  notes: 'Story setup for Chapter 4 (delivery).',
};

export default lesson;
