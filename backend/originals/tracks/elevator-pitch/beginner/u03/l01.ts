import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Arjun zones out: a correct pitch that nobody remembers. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Arjun zones out',
  summary: 'Ada\'s pitch is clear, the right length and has an ask. She performs it on a video call. At second 35, Arjun\'s eyes drift to another tab. Afterwards she asks, "What do you remember?" He says, "Er... an app? For money?"',
  minutes: 12,
  outcomes: [
    'See the difference between a correct pitch and a memorable one',
    'Test what people actually remember',
    'Know this chapter\'s goal: make your pitch stick',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Video call, Monday, 8 p.m. Three weeks to go.',
      beats: [
        { speaker: 'ada', text: '(reading) "I help office savings groups track who\'s paid, so nobody argues about money. Most groups use a notebook. My app sends reminders and keeps a record. Three groups use it now, with 110 members. I\'m looking for a mentor to reach a hundred offices." Done! 52 seconds.' },
        { speaker: 'arjun', text: 'Great. Very clear.' },
        { speaker: 'ada', text: 'What do you remember from it?' },
        { speaker: 'arjun', text: '(long pause) An app. For... money. Savings? Sorry. I zoned out around second 35. There\'s nothing wrong with it. There\'s just nothing to hold on to.' },
        { speaker: 'ada', text: 'It\'s correct! It has all five boxes!' },
        { speaker: 'arjun', text: 'Correct is the minimum. On pitch night the judges hear ten correct pitches in a row. They\'ll remember two. You need to be one of the two.' },
      ],
      choice: {
        prompt: 'What should Ada try first?',
        options: [
          {
            text: 'Ask Arjun what WOULD have made him remember it',
            outcome: 'Arjun thinks. "Honestly? A person. A moment. The Tunde-swears-he-paid thing you told me once made me laugh. It\'s not in your pitch." Ada writes "TUNDE" on a sticky note.',
            best: true,
          },
          {
            text: 'Add more numbers and features to sound more impressive',
            outcome: 'More information usually means less remembered. The problem isn\'t too little; it\'s nothing vivid.',
          },
          {
            text: 'Say it louder and faster',
            outcome: 'Volume doesn\'t make words memorable. Arjun would just zone out at a higher volume.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>Clear isn't the same as memorable.</strong> Judges, recruiters and people at parties hear a lot of clear, correct pitches. The ones they remember have something to hold on to: a story, a vivid detail, a surprising question, a hook.</p><p>This chapter: six different ways to pitch, the Pixar story structure, questions and rhymes, hooks, vivid details and numbers that land.</p>",
    },
  ],
  apply: {
    scenario: 'The zone-out call.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was wrong with Ada\'s pitch?',
        options: [
          { text: 'It was too long', why: '52 seconds is fine.' },
          { text: 'Nothing was wrong, but there was nothing vivid to remember' },
          { text: 'It had no ask', why: 'It had one.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Makes it correct, or makes it memorable?',
        groups: ['Correct', 'Memorable'],
        items: [
          { text: 'All five boxes filled', group: 0 },
          { text: 'A story about Tunde swearing he paid', group: 1 },
          { text: 'The right length', group: 0 },
          { text: 'A surprising opening question', group: 1 },
          { text: 'A clear ask', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'So should I throw away my clear pitch and start again?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Yes, start from zero.', why: 'The clarity took two weeks. Keep it.' },
          { text: 'Make it twice as long.', why: 'Longer isn\'t stickier.' },
          { text: 'No. Keep the structure. Add things people can hold on to: a story, a hook, a vivid detail.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Arjun: "Correct is the ___." (one word)',
        answers: ['minimum'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What does "what do you remember?" test?',
        options: [
          { text: 'Whether the pitch sticks, not just whether it\'s correct' },
          { text: 'Arjun\'s memory', why: 'It tests the pitch.' },
          { text: 'Whether the pitch is under 60 seconds', why: 'A stopwatch does that.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the call in order.',
        lines: ['Ada reads her pitch in 52 seconds.', 'Arjun says it\'s very clear.', 'Ada asks what he remembers.', '"An app? For money?"', 'Arjun admits he zoned out at second 35.'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s plan to fix it. Which idea won\'t help?',
        lines: [
          'Add the Tunde story.',
          'Add twelve more statistics.',
          'Open with something surprising.',
        ],
        bug: 1,
        fix: 'Pick one number people can picture.',
        explanation: 'Piling on numbers makes it harder to remember, not easier.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review: what each chapter fixed.',
        pairs: [
          ['Chapter 1', 'A clear structure and one sentence'],
          ['Chapter 2', 'The personal pitch'],
          ['Chapter 3', 'Making it memorable'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s warning.',
        template: 'The judges hear ten [[1]] pitches. They\'ll [[2]] two. You need to be one of the [[3]].',
        blanks: [['correct', 'clear'], ['remember'], ['two']],
        distractors: ['forget', 'ten'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the test question.',
        tiles: ['What', 'do', 'you', 'remember?'],
        distractors: ['forget'],
      },
    ],
  },
  reflect: {
    prompt: 'Say your pitch to someone, then ask "What do you remember?" Write down exactly what they say.',
    starters: ['They remembered...', 'They forgot...'],
  },
  deepen: {
    title: 'The next-day test',
    summary: 'Pitch to a friend today. Tomorrow, ask them what they remember. Whatever survives a day is the sticky part. Build around it.',
  },
  notes: 'Story setup. Traction (three groups, 110 members) follows Chapter 2 (office 10 + church 40 + youth group 60).',
};

export default lesson;
