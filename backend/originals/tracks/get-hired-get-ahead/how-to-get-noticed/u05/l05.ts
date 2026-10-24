import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 5 — Checkpoint 1. Reviews lessons 1–4. Story beat: Mrs Ewane's profile clinic. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: Mrs Ewane\'s profile clinic',
  summary: 'The careers office runs a "LinkedIn clinic" on Thursday afternoons. Mrs Ewane projects students\' profiles on the wall (with permission) and asks the room what a recruiter would see. Clinton volunteers. Why profiles matter, recruiters\' searches, headlines and photos, mixed together.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Explain how recruiters check and find people', 'Write a headline that works', 'Choose a professional photo and banner'],
  learn: [
    {
      kind: 'story',
      title: 'On the wall',
      beats: [
        { speaker: 'narrator', text: 'Thursday, 3pm. Fifteen students, a projector, and Mrs Ewane with a laser pointer.' },
        { speaker: 'ewane', text: 'Volunteers. Your profile goes on the wall, and the room tells you what a recruiter sees in five seconds. Clinton. Of course.' },
        { speaker: 'clinton', text: 'I fixed it last night! Mostly.' },
        { speaker: 'ewane', text: '"Mostly" is my favourite word. It means there\'s something to find. Room, begin.' },
        { speaker: 'tey', text: 'Let\'s see what the room finds, and what you\'ve learned.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 1: the profile clinic.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What three things does a recruiter see in search results?',
        options: [
          { text: 'About, experience and skills', why: 'Those come after the click.' },
          { text: 'Photo, name and headline' },
          { text: 'Your CV', why: 'Not shown in search.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'The room spots one thing Clinton hasn\'t fixed. Tap it.',
        lines: ['Photo: clear, by a window, plain wall', 'Headline: Student at UB', 'Banner: screenshot of the Njangi Tracker'],
        bug: 1,
        fix: 'Headline: Final-year CS student · JavaScript & Python · Built a tracker used by 42 people',
        explanation: 'The default headline. It shows up everywhere he appears.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak headline?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'Graduate nurse · Patient education · Built a sign-in system that halved waits', group: 0 },
          { text: 'Hustler', group: 1 },
          { text: 'Final-year Economics student · Excel · Treasurer, student union', group: 0 },
          { text: 'Seeking opportunities', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'Why should a student bother? Recruiters only look at CVs.',
        options: [
          { text: 'You\'re right, it\'s a waste of time.', why: 'She\'s testing him. Profiles get checked and searched.' },
          { text: 'For the followers.', why: 'Followers matter little. Being found and trusted matters.' },
          { text: 'They look you up after you apply, and they search for people before you apply. A profile works even when I\'m not applying.' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the photo steps in order.',
        lines: ['Find window light', 'Plain background', 'Face fills most of the frame', 'Dress like the job, natural smile'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the headline formula to Clinton\'s words.',
        pairs: [
          ['Who you are', 'Final-year CS student'],
          ['Key skills', 'JavaScript & Python'],
          ['One proof', 'Built a tracker used by 42 people'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'A student\'s photo is a group shot from a party. What does the room say?',
        options: [
          { text: 'Take a new one: just you, by a window, plain background' },
          { text: 'Perfect, it shows teamwork', why: 'Recruiters can\'t tell which one is you.' },
          { text: 'Remove the photo entirely', why: 'A clear photo helps people recognise you.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Mrs Ewane\'s rule.',
        template: 'The profile must [[1]] the CV: same dates, same projects, same [[2]] numbers.',
        blanks: [['match'], ['honest', 'true']],
        distractors: ['beat', 'rounded', 'bigger'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which network is best for showing developers\' code? (one word)',
        answers: ['github'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Helps someone find Clinton in a search, or not?',
        groups: ['Helps', 'Doesn\'t help'],
        items: [
          { text: 'JavaScript in the headline', group: 0 },
          { text: 'Location set to Cameroon', group: 0 },
          { text: 'A clever headline joke', group: 1 },
          { text: 'An empty skills section', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'ewane',
        message: 'Last question. Your LinkedIn says GPA 3.0 and your CV says nothing. Problem?',
        options: [
          { text: 'No, LinkedIn doesn\'t count.', why: 'Everything public counts. Recruiters compare.' },
          { text: 'I\'ll add 3.0 to the CV too.', why: 'Then both are wrong.' },
          { text: 'Yes. It\'s 2.94, so I\'ll remove it from LinkedIn. Both must be honest and match.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'If your profile went on Mrs Ewane\'s wall, what would the room spot first?',
    starters: ['They\'d spot...', 'I\'ll fix it by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask a friend to look at your profile for five seconds and tell you what they remember. Fix the first thing they mention.',
  },
  notes: 'Checkpoint 1 of Chapter 5 = reviews l01–l04. Profiles projected "with permission" (privacy). These exercises double as Jump ahead / placement questions.',
};

export default lesson;
