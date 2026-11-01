import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Before/After: interview or conversation? Balancing questions with sharing (reciprocity). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Interview or conversation?',
  summary: 'Grace has learned follow-up questions. She now asks so many that Tomasz from Finance jokes he should have brought his CV. Questions are great; a conversation also needs a little of you.',
  minutes: 12,
  outcomes: [
    'Balance questions with sharing',
    'Use the "answer, add, ask" rhythm',
    'Share at the right level for small talk',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Grace and Tomasz at the coffee machine',
      before: {
        label: 'The interview',
        text: 'Grace: "Where are you from?" Tomasz: "Kraków." Grace: "How long have you lived here?" T: "Six years." Grace: "Why Manchester?" T: "Work." Grace: "Do you like it?" T: "...Am I being assessed?"',
      },
      after: {
        label: 'The conversation',
        text: 'Grace: "Where are you from?" Tomasz: "Kraków." Grace: "Oh, I\'ve always wanted to go. I\'ve only been as far as Lisbon. How long have you been in Manchester?" T: "Six years. Came for work, stayed for the... well, not the weather." Grace: "Nobody stays for the weather. I grew up here and I still own four umbrellas."',
      },
      notes: [
        'Grace still asks questions, but she adds a little of herself between them.',
        'Her small shares (Lisbon, the umbrellas) give Tomasz something to ask about.',
        'The conversation feels like a swap, not a test.',
      ],
    },
    {
      kind: 'text',
      html: "<p><strong>The rhythm: answer, add, ask.</strong></p><ol><li><strong>Answer</strong> their question properly (not just \"fine\").</li><li><strong>Add</strong> one small detail about you.</li><li><strong>Ask</strong> something back.</li></ol><p>Example: \"How was your weekend?\" → \"Good, thanks (answer). My son made me watch three horror films and I didn't sleep (add). Do you like horror, or are you sensible? (ask)\"</p><p><strong>How much to share:</strong> small talk is for light, easy details: hobbies, places, funny moments, what you're working on. Save heavy things (health problems, money worries, relationship trouble) for when you know someone better.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Answer, add, ask. Questions show interest; sharing shows trust. You need both.',
    },
  ],
  apply: {
    scenario: 'Tuesday. Tomasz, take two.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Grace\'s reply in the "answer, add, ask" order.',
        lines: ['Good, thanks.', 'My son made me watch three horror films and I didn\'t sleep.', 'Do you like horror, or are you sensible?'],
      },
      {
        kind: 'mcq',
        prompt: 'Why did Tomasz ask if he was being assessed?',
        options: [
          { text: 'Grace\'s questions were rude', why: 'They were polite. There were just only questions.' },
          { text: 'He had a job interview later', why: 'He was joking about how it felt.' },
          { text: 'Grace asked too many questions and shared nothing, so it felt like an interview' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good small-talk share, or too heavy for now?',
        groups: ['Good to share', 'Save for later'],
        items: [
          { text: 'I just started learning to swim.', group: 0 },
          { text: 'My marriage is falling apart.', group: 1 },
          { text: 'I own four umbrellas.', group: 0 },
          { text: 'I\'m worried I can\'t pay my rent.', group: 1 },
          { text: 'My son thinks I\'m embarrassing.', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'How was your weekend?',
        prompt: 'Which reply follows "answer, add, ask"?',
        options: [
          { text: 'Good! I finally fixed my bike, mostly. It now has a spare part I can\'t explain. How was yours?' },
          { text: 'Fine.', why: 'Answer only. No add, no ask.' },
          { text: 'How was YOUR weekend? And your week? And your month?', why: 'All ask, no answer.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The rhythm: answer, add, ... (one word)',
        answers: ['ask'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s chat with Priya. Which line turns it back into an interview?',
        lines: [
          'Priya: "I\'ve been in UX for ten years."',
          'Grace: "Ten years! I\'m on week two, so you\'re my hero. What made you choose UX?"',
          'Grace: "Where did you study? What grade did you get? How much did it cost?"',
        ],
        bug: 2,
        fix: 'Grace: "I came from nursing, so I\'m learning everything backwards."',
        explanation: 'Three rapid questions in a row, with nothing shared, is an interview again.',
      },
      {
        kind: 'mcq',
        prompt: 'What does sharing a small detail about yourself do?',
        options: [
          { text: 'Makes the conversation about you', why: 'Not if it\'s small and followed by a question.' },
          { text: 'Shows trust, and gives the other person something to ask about' },
          { text: 'Nothing; only questions matter', why: 'Questions alone feel like an interview.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Free information', 'Hooks in someone\'s answer'],
          ['Follow-up question', 'About what they just said'],
          ['Next-in-line effect', 'Why names vanish'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s balanced reply.',
        template: 'Oh, I\'ve always wanted to go to [[1]]. I\'ve only been as far as [[2]]. How long have you been in [[3]]?',
        blanks: [['Kraków', 'Krakow'], ['Lisbon'], ['Manchester']],
        distractors: ['Leeds', 'Accra'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build an "add" for Grace.',
        tiles: ['I', 'still', 'own', 'four', 'umbrellas.'],
        distractors: ['assessed', 'CV'],
      },
    ],
  },
  reflect: {
    prompt: 'In conversations, do you tend to ask too much (interviewer) or share too much (storyteller)? What will you do differently?',
    starters: ['I tend to...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Balance check',
    summary: 'After your next chat, ask yourself: did I learn something about them, AND did they learn something about me? If only one is true, adjust next time.',
  },
  notes: 'Reciprocal self-disclosure (mutual sharing builds liking) is well established in social psychology (e.g. Collins & Miller 1994 meta-analysis on self-disclosure and liking). Answer/add/ask is a teaching framework. Light vs heavy disclosure guidance is general etiquette.',
};

export default lesson;
