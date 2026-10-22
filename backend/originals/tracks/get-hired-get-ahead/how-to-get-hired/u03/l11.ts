import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 11 — story choice: a question you can't answer. Bluff, freeze, or think out loud. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'When you don\'t know the answer',
  summary: 'In a practice technical round, Kofi (now a part-time web developer) asks Clinton: "How would you stop the same payment being charged twice?" Clinton has no idea. Silence. Then three choices.',
  minutes: 11,
  outcomes: ['Handle a question you can\'t answer', 'Think out loud in a structured way', 'Admit a gap without losing confidence'],
  learn: [
    {
      kind: 'story',
      title: 'The silence',
      beats: [
        { speaker: 'narrator', text: 'A video call. Kofi, from Accra, plays the technical interviewer.' },
        { speaker: 'kofi', text: 'Say a customer taps "Pay" twice because the network is slow. How would you stop them being charged twice?' },
        { speaker: 'narrator', text: 'Clinton\'s mind goes white. Five seconds. Eight.' },
        { speaker: 'tey', text: 'Interviewers often ask questions you can\'t fully answer, on purpose. They want to see how you think when you don\'t know. Bluffing is usually the worst option, because they can tell.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Say honestly he hasn\'t done it before, then think out loud from what he does know.',
            outcome: '"I haven\'t built that, but at Kmer I had a similar problem with duplicate confirmations. I gave each one a unique ID so the second copy was ignored. Maybe each payment could carry an ID like that?" Kofi grins: "That\'s basically the real answer."',
            best: true,
          },
          {
            text: 'Bluff with confident-sounding words.',
            outcome: '"I\'d use, um, blockchain." Kofi asks one follow-up question, and the bluff collapses.',
          },
          {
            text: 'Say "I don\'t know" and stop.',
            outcome: 'Honest, but Kofi learns nothing about how he thinks. A missed chance.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Don\'t bluff. Say what you haven\'t done, then reason out loud from something you have done.',
    },
  ],
  apply: {
    scenario: 'Clinton faces a question he can\'t answer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why do interviewers ask questions you can\'t fully answer?',
        options: [
          { text: 'To embarrass you', why: 'It\'s about how you reason.' },
          { text: 'To see how you think when you don\'t know' },
          { text: 'By accident', why: 'Often on purpose.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the honest approach in order.',
        lines: ['Pause and breathe', 'Say what you haven\'t done', 'Link to something you have done', 'Reason out loud to a possible answer'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good response, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'I haven\'t built that, but I solved something similar', group: 0 },
          { text: 'I\'d use blockchain (bluffing)', group: 1 },
          { text: 'Can I think out loud for a moment?', group: 0 },
          { text: 'I don\'t know. (silence)', group: 1 },
          { text: 'Could you tell me a bit more about the setup?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best first line.',
        from: 'kofi',
        message: 'How would you stop a customer being charged twice?',
        options: [
          { text: '"Easy, I\'ve done it loads." (he hasn\'t)', why: 'Never bluff.' },
          { text: '"Next question please."', why: 'Try reasoning first.' },
          { text: '"I haven\'t built that, but can I think it through out loud? At Kmer I had a similar duplicate problem..."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the bluff.',
        lines: ['I haven\'t built payments before.', 'I\'ve personally built five payment systems for banks.', 'At Kmer, I used unique IDs to ignore duplicates.'],
        bug: 1,
        explanation: 'Untrue, and one follow-up question will expose it.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Honest, then reason out loud', 'Close to the real answer'],
          ['Bluff', 'Collapses on the first follow-up'],
          ['"I don\'t know" and stop', 'They learn nothing about his thinking'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What\'s a useful clarifying question here?',
        options: [
          { text: '"Is this on a mobile app, with a slow network?"' },
          { text: '"What\'s the answer?"', why: 'Try first.' },
          { text: '"Why are you asking me this?"', why: 'Ask about the problem instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Don\'t [[1]]. Reason out [[2]] from what you know.',
        blanks: [['bluff'], ['loud']],
        distractors: ['breathe', 'quiet', 'quit'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What did Clinton give each Kmer confirmation to ignore duplicates? A unique ___. (one word)',
        answers: ['id', 'identifier', 'code'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Honest gap or bluff?',
        groups: ['Honest', 'Bluff'],
        items: [
          { text: 'I haven\'t used that tool yet', group: 0 },
          { text: 'I\'m an expert in everything', group: 1 },
          { text: 'I\'d need to look that up, but my guess is...', group: 0 },
          { text: 'Inventing a past project', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a question you\'d dread in an interview. What do you know that you could reason from?',
    starters: ['The question I dread is...', 'I could reason from...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask a friend to ask you something you don\'t know. Practise: "I haven\'t done that, but..." and reason out loud for one minute.',
  },
  notes: 'The duplicate-payment answer is idempotency keys (a unique ID per payment request), a real technique. Kofi (shared cast) is now a part-time web developer in Accra (Get Hired L2 Ch1 l18).',
};

export default lesson;
