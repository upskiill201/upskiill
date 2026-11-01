import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 11 — honest skill levels. Honesty choice: "Fluent in French"? */
const lesson: OriginalLesson = {
  key: 'l11',
  title: '"Fluent in French"?',
  summary: 'Njangi Pay\'s graduate advert says "French is a plus". Clinton\'s French is... schoolboy French. Cameroon is bilingual, and everyone writes "fluent" anyway. Should he?',
  minutes: 12,
  outcomes: ['Describe a skill level honestly and still make it a strength', 'Explain why overclaiming backfires', 'Use simple, clear levels for languages and tools'],
  learn: [
    {
      kind: 'story',
      title: '"French is a plus"',
      beats: [
        { speaker: 'narrator', text: 'Sunday night. Njangi Pay posts its graduate developer role. Clinton reads it four times. At the bottom: "French is a plus."' },
        { speaker: 'clinton', text: 'Cameroon is bilingual. I did French at school. I can order food, argue with a taxi driver, and understand most of a meeting if people speak slowly. That\'s basically fluent, right?' },
        { speaker: 'narrator', text: 'He types "Languages: English (native), French (fluent)". It looks great.' },
        { speaker: 'miracle', text: 'Njangi Pay\'s head office is in Douala. Half the team speaks French all day. What happens when Brenda switches to French in the interview?' },
        { speaker: 'tey', text: 'Overclaiming feels like a small shortcut. But skills on a CV get tested, in interviews and in the first week of the job. The good news: an honest level, said well, is still a strength.' },
      ],
      choice: {
        prompt: 'What should Clinton write?',
        options: [
          {
            text: '"French: intermediate (comfortable in everyday conversation, improving my work French)."',
            outcome: 'In the interview, Brenda asks two questions in French. Clinton answers simply and says he\'s taking an online course. She writes "honest, improving" in her notes. That\'s a plus.',
            best: true,
          },
          {
            text: '"French: fluent." Everyone exaggerates languages.',
            outcome: 'Brenda switches to French. Clinton freezes, then stumbles. Now she wonders what else on the CV is stretched.',
          },
          {
            text: 'Leave French off completely, since it\'s not perfect.',
            outcome: 'Safe, but he hides a real "plus" the advert asked for. Intermediate French is worth saying.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'An honest level, said well, beats an exaggerated one. Everything on your CV can be tested.',
    },
  ],
  apply: {
    scenario: 'Clinton writes honest skill levels.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does overclaiming a skill backfire?',
        options: [
          { text: 'Skills get tested in interviews and at work, and one stretch makes everything else look doubtful' },
          { text: 'It doesn\'t, everyone does it', why: 'Many people do, and many get caught. One stretch casts doubt on the whole CV.' },
          { text: 'Recruiters never check', why: 'They often check, sometimes by switching languages mid-interview.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest level, or overclaim?',
        groups: ['Honest', 'Overclaim'],
        items: [
          { text: 'French: intermediate, comfortable in conversation', group: 0 },
          { text: 'Expert in 12 programming languages (used 3 once)', group: 1 },
          { text: 'Excel: comfortable with formulas and charts', group: 0 },
          { text: 'Fluent in French (can order food)', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'brenda',
        message: 'Je vois que vous parlez français. Pourquoi Njangi Pay?',
        options: [
          { text: '(Silence, then English) Sorry, I don\'t really speak French.', why: 'Only a problem because his CV said "fluent". With "intermediate", even a simple answer is fine.' },
          { text: 'Parce que j\'aime votre application. Mon français est intermédiaire, je l\'améliore chaque semaine.' },
          { text: 'Can we do this in English? My French is fluent but I\'m tired.', why: 'That sounds like exactly what it is: an excuse.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each level to an honest description.',
        pairs: [
          ['Basic', 'Simple phrases and everyday words'],
          ['Intermediate', 'Comfortable in everyday conversation'],
          ['Fluent', 'Work, meetings and writing with ease'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would fall apart in an interview.',
        lines: ['Python: built three projects, including a fixtures app.', 'Machine learning: expert.', 'Git: use it daily for team projects.'],
        bug: 1,
        explanation: 'Clinton has watched two machine learning videos. "Expert" invites questions he can\'t answer. "Learning the basics" is honest and fine.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which honest line about machine learning still sounds good?',
        options: [
          { text: '"Machine learning: expert."', why: 'Overclaim. One question and it collapses.' },
          { text: '"Currently learning machine learning basics through an online course."' },
          { text: '"Machine learning: don\'t know anything."', why: 'Undersells. He\'s started, so say so.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'An [[1]] level, said well, is still a [[2]].',
        blanks: [['honest'], ['strength']],
        distractors: ['expert', 'weakness', 'secret'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good way to show you\'re improving a skill?',
        groups: ['Good', 'Not convincing'],
        items: [
          { text: 'Taking an online course and naming it', group: 0 },
          { text: '"I plan to learn it one day"', group: 1 },
          { text: 'Practising French with colleagues at the meet-up', group: 0 },
          { text: 'Saying you\'re fluent and hoping', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Clinton\'s honest French level, from the story? (one word)',
        answers: ['intermediate'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'But if everyone else writes "fluent", won\'t I look worse?',
        options: [
          { text: 'You\'ll look honest, and you\'ll pass the test when Brenda checks. Plenty of the "fluent" ones won\'t.' },
          { text: 'Then write "fluent" too.', why: 'Copying everyone\'s exaggeration means failing the same test they do.' },
          { text: 'Write "native".', why: 'That\'s an even bigger overclaim.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a skill you\'d be tempted to overclaim? Write an honest level for it, and one thing you\'re doing to improve.',
    starters: ['I\'d be tempted to say...', 'Honestly, my level is...', 'I\'m improving by...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look up the CEFR language levels (A1 to C2). Work out your honest level for every language you speak, and how you\'d describe it in plain words.',
  },
  notes: 'Cameroon\'s official languages are English and French (constitution, 1961/1996); Douala is predominantly francophone, Buea anglophone. CEFR (Common European Framework of Reference for Languages, Council of Europe) levels A1–C2 are widely used to state language levels on CVs. Honesty choice per playbook §8a.7. French in the chatReply: "I see you speak French. Why Njangi Pay?" / "Because I like your app. My French is intermediate; I improve it every week."',
};

export default lesson;
