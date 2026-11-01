import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Backstage at pitch night: Ada is speaker seven of ten, and learns from the six before her. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Backstage',
  summary: 'Pitch night. Three hundred people, three judges, ten finalists. Ada is speaker seven. From the side of the stage she watches six pitches, and learns more in 20 minutes than in a month.',
  minutes: 12,
  outcomes: [
    'Spot what works and what fails in other people\'s pitches',
    'Notice how much the ask and the Q&A matter',
    'Know this chapter\'s goal: finish strong',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Lagos Tech Fest, pitch night. Tuesday, 7 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Speaker 1 opens with "Hello, my name is..." and a slide of his company logo. Ada mouths: "Name badge."' },
        { speaker: 'narrator', text: 'Speaker 3 is brilliant for 55 seconds, then says "...so yeah, that\'s basically it." The applause is polite. Ada winces.' },
        { speaker: 'narrator', text: 'Speaker 4 goes over time. At 60 seconds, the microphone switches off mid-sentence. He never gets to his ask.' },
        { speaker: 'narrator', text: 'Speaker 5 nails the pitch. Then Mrs Adeyemi asks, "How will you make money?" He says, "Er... ads? Probably?" The room goes quiet.' },
        { speaker: 'ada', text: '(whispering to Arjun on the phone) Speaker five had a great pitch and lost it in one question.' },
        { speaker: 'arjun', text: 'And speaker four never reached his ask. The last 20 seconds of the pitch, and the two minutes after it, matter as much as the rest. That\'s what we fix tonight. You\'re on in 25 minutes.' },
      ],
      choice: {
        prompt: 'What should Ada use her 25 minutes on?',
        options: [
          {
            text: 'Sharpen her ask and rehearse answers to the three hardest questions',
            outcome: 'Arjun: "Yes. The pitch is ready. The ask and the answers are where tonight is won or lost."',
            best: true,
          },
          {
            text: 'Rewrite the whole pitch based on what she\'s just seen',
            outcome: 'Arjun: "No! The pitch works. Changing it 25 minutes before is how people go blank."',
          },
          {
            text: 'Watch the other finalists and worry',
            outcome: 'Watching was useful for ten minutes. Now it\'s just worry. Use the time.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>The finish.</strong> A strong pitch can be lost in its last seconds, and in the questions afterwards. This chapter: making the ask clear, handling questions honestly, ending strong, stretching or shrinking your pitch on the spot, and following up afterwards.</p>",
    },
  ],
  apply: {
    scenario: 'Backstage. Speakers 1 to 6.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the speaker to the mistake.',
        pairs: [
          ['Speaker 1', 'A name-badge opening'],
          ['Speaker 3', 'A fading ending: "so yeah"'],
          ['Speaker 4', 'Went over time, never reached the ask'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Speaker 5 get wrong?',
        options: [
          { text: 'His pitch was bad', why: 'The pitch was great.' },
          { text: 'He wasn\'t prepared for an obvious question about making money' },
          { text: 'He was too nervous', why: 'He was unprepared.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of pitch night was it?',
        groups: ['The pitch', 'The finish', 'The questions'],
        items: [
          { text: 'A name-badge opening', group: 0 },
          { text: '"So yeah, that\'s basically it"', group: 1 },
          { text: '"Er... ads? Probably?"', group: 2 },
          { text: 'The mic cut before the ask', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Should I rewrite my pitch based on what I just saw?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Yes, start from scratch.', why: 'That\'s how people go blank on stage.' },
          { text: 'Copy Speaker 5\'s pitch.', why: 'Never. And he lost anyway.' },
          { text: 'No. The pitch works. Use the time on your ask and your answers to hard questions.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Ada is speaker number ___. (a number)',
        answers: ['7', 'seven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why did Speaker 4 lose his ask?',
        options: [
          { text: 'He went over time and the microphone switched off' },
          { text: 'He forgot it', why: 'He never reached it.' },
          { text: 'The judges left', why: 'The mic cut out.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put pitch night\'s format in order.',
        lines: ['The speaker walks on', '60 seconds of pitch', 'The microphone switches off at 60 seconds', 'Two minutes of judges\' questions'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s 25-minute plan. Which item is a mistake?',
        lines: [
          'Sharpen the ask.',
          'Rewrite the hook with a brand-new joke.',
          'Rehearse answers to the three hardest questions.',
        ],
        bug: 1,
        fix: 'Do one calm run-through of the beats.',
        explanation: 'Changing the opening minutes before going on stage invites a blank.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Arjun\'s warning.',
        template: 'The last 20 [[1]] of the pitch, and the two [[2]] after it, matter as much as the [[3]].',
        blanks: [['seconds'], ['minutes'], ['rest']],
        distractors: ['hours', 'hook'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s plan.',
        tiles: ['Sharpen', 'the', 'ask.', 'Prepare', 'the', 'answers.'],
        distractors: ['rewrite'],
      },
    ],
  },
  reflect: {
    prompt: 'Think about the hardest question someone could ask about your pitch. Write it down, and your honest answer.',
    starters: ['The hardest question: ...', 'My answer: ...'],
  },
  deepen: {
    title: 'Watch other pitches',
    summary: 'Watch three short pitch videos online (a startup competition, a job intro, a student pitch). For each, note the opening, the ask and how they handle questions.',
  },
  notes: 'Story setup for Chapter 5. Pitch-night format (60 s pitch, mic cut-off, 2 min Q&A) is fictional but typical of pitch competitions.',
};

export default lesson;
