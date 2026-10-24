import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 10. Unit Challenge: the first 20 minutes at Mtaa Labs. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the first 20 minutes',
  summary: 'Tuesday, 10 a.m. Wanjiru opens: "Tell me about yourself. Then, what do you know about us?" This time Remi is ready. Everything from Chapter 2.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use research in a real interview', 'Use everything from Chapter 2 together'],
  learn: [
    {
      kind: 'reading',
      title: 'The first 20 minutes',
      html: '<p>Remi\'s 60-second answer ends on their app. Then: <em>"What do you know about us?"</em></p><p>Remi: <em>"You help 3,000 shop owners track deliveries, you raised your first round this year, and you\'re expanding to Mombasa. I used the app last night. It\'s really light on a slow phone, which I think comes from your post about building for slow phones."</em></p><p>Wanjiru smiles: <em>"You read that? Nobody reads that."</em> She asks about his booking app for five minutes.</p><p>Then: <em>"Have you used React Native?"</em> Remi: <em>"Not yet. I\'ve used JavaScript a lot, and I\'m keen to learn it."</em> She nods: <em>"That\'s fine for an intern."</em></p><p>Then she says: <em>"OK. Next, a coding problem, and a few tell-me-about-a-time questions."</em> Remi\'s stomach drops. He has no stories ready.</p>',
    },
    {
      kind: 'story',
      title: 'Ten minutes later',
      beats: [
        { speaker: 'remi', text: '(voice note, after) The research part went brilliantly. Then she asked for a time I disagreed with a teammate and I blanked.' },
        { speaker: 'ada', text: 'That\'s Chapter 3. You need a story bank.' },
        { speaker: 'tey', text: 'That\'s Chapter 2: research in an hour, why us, the ad, set-up, questions. Next: STAR stories.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter 2 challenge: the first 20 minutes.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What made Wanjiru smile?',
        options: [
          { text: 'His long life story', why: 'He kept it to a minute.' },
          { text: 'He said it\'s a great culture', why: 'He was specific.' },
          { text: 'Remi had read her post about slow phones' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the Chapter 2 lesson.',
        pairs: [
          ['"You\'re expanding to Mombasa"', 'Research in an hour'],
          ['"Light on a slow phone"', '"Why us?"'],
          ['"Not yet, keen to learn"', 'Decoding the ad'],
          ['Good camera and sound', 'The video set-up'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Went well, or still a gap?',
        groups: ['Went well', 'Still a gap'],
        items: [
          { text: '"What do you know about us?"', group: 0 },
          { text: '"Tell me about a time you disagreed"', group: 1 },
          { text: 'The React Native question', group: 0 },
          { text: 'Having stories ready', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'remi',
        message: 'I blanked on "tell me about a time". Is the whole interview ruined?',
        prompt: "Ada's best reply?",
        options: [
          { text: 'No. One weak answer among strong ones is normal. Build your story bank now, before Synergix.' },
          { text: 'Yes, it\'s ruined.', why: 'One answer rarely decides it.' },
          { text: 'Email them a better answer tonight.', why: 'Focus on the next interview.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'For how many minutes did Wanjiru ask about the booking app?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'fillBlank',
        prompt: 'Why the research worked.',
        template: 'It was [[1]] to them, and showed he\'d [[2]] the product.',
        blanks: [['specific'], ['used', 'tried']],
        distractors: ['generic', 'hated'],
      },
      {
        kind: 'mcq',
        prompt: 'What was Wanjiru\'s reaction to the honest React Native answer?',
        options: [
          { text: 'She ended the interview', why: 'Honesty was fine.' },
          { text: 'She laughed', why: 'She accepted it.' },
          { text: '"That\'s fine for an intern."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Remi\'s answer would have hurt him?',
        lines: [
          'You help 3,000 shop owners track deliveries.',
          'You\'re expanding to Mombasa.',
          'And yes, I\'ve used React Native loads.',
          'I used the app last night.',
        ],
        bug: 2,
        fix: 'Not yet, but I\'m keen to learn it.',
        explanation: 'Overclaiming would have been exposed fast.',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the first 20 minutes.',
        lines: ['Tell me about yourself', 'What do you know about us?', 'The booking app', 'React Native', 'Coding and behavioural questions'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What\'s the interviewer\'s name?',
        answers: ['Wanjiru', 'wanjiru'],
        placeholder: 'A name',
      },
    ],
  },
  reflect: {
    prompt: 'Practise "what do you know about us?" out loud for a company you want to work for.',
    starters: ['You...', 'I noticed...'],
  },
  deepen: {
    title: 'Research pays early',
    summary: 'Good research usually shows in the first ten minutes: "tell me about yourself", "what do you know about us?" and "why us?". It sets a strong tone for the rest.',
  },
  notes: 'Chapter 2 challenge (fictional): Mtaa Labs interview, Wanjiru (CTO); research lands; behavioural question exposes the missing story bank.',
};

export default lesson;
