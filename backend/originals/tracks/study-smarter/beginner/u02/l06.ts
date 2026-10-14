import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 6 — the explain-it-back test: the AI plays a classmate and you teach it. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The explain-it-back test',
  summary: "Kofi thinks he understands mole ratios. Then the AI pretends to be a confused classmate, and he finds out exactly where he doesn't.",
  minutes: 12,
  outcomes: [
    'Set the AI up as a classmate who asks you questions',
    'Explain a topic in your own words to find the holes',
    'Fix the holes the AI finds',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The confused classmate',
      beats: [
        { speaker: 'narrator', text: 'Thursday call. Kofi announces he has "basically mastered" stoichiometry.' },
        { speaker: 'miracle', text: "Great. Then teach it to me. Pretend I missed the lesson." },
        { speaker: 'kofi', text: "OK so... you change grams to moles, then you... use the... the numbers. The ratio numbers. Then... grams again?" },
        { speaker: 'miracle', text: '"The numbers"? Which numbers? Why?' },
        { speaker: 'narrator', text: "Silence. Kofi could follow a worked example. He couldn't explain one." },
        { speaker: 'miracle', text: "Don't feel bad, that's the most useful thing that happened to you this week. Now do it with the AI every time. Tell it to play a classmate who missed the lesson." },
        { speaker: 'tey', text: "This is sometimes called the Feynman technique, after the physicist Richard Feynman: if you can't explain it simply, you haven't understood it yet. Explaining shows you the holes." },
      ],
      choice: {
        prompt: 'How should Kofi set up the AI?',
        options: [
          {
            text: '"Pretend you\'re a classmate who missed the stoichiometry lesson. I\'ll explain it. Ask me questions whenever my explanation is vague or skips a step. Don\'t explain it yourself."',
            outcome: 'Three questions in, the AI asks: "Why do you divide by molar mass and not multiply?" Kofi has to think. Now he really knows.',
            best: true,
          },
          {
            text: '"Is my understanding of stoichiometry correct?"',
            outcome: 'The AI says "Yes, broadly!" and adds a summary. Kofi learns nothing about his own holes.',
          },
          {
            text: '"Explain stoichiometry to me so I can explain it to Miracle."',
            outcome: 'He reads the AI\'s explanation. Back to watching, not doing.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: '<p>The explain-it-back set-up has three parts:</p><ol><li><strong>Give it a role:</strong> "a classmate who missed the lesson" (or a younger student).</li><li><strong>You explain:</strong> in your own words, without notes.</li><li><strong>It only asks:</strong> "Ask me questions where I\'m vague or skip a step. Don\'t explain it yourself."</li></ol><p>That last line matters. Without it, the AI will helpfully take over, and you\'re back to reading.</p>',
    },
    {
      kind: 'check',
      question: 'Why tell the AI "don\'t explain it yourself"?',
      options: ['So it saves time', 'So you do the explaining, which is where you find the holes', 'Because it explains badly'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Kofi explains it back.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the explain-it-back set-up in order.',
        lines: ['Give the AI a role: a classmate who missed it', 'Explain the topic in your own words', 'Let it ask questions where you are vague', 'Fix the holes it finds'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which set-up works best?',
        options: [
          { text: 'Check if I understand moles.', why: 'It will probably just say yes.' },
          { text: "Pretend you're a classmate who missed the moles lesson. I'll explain. Ask questions where I'm vague. Don't explain it yourself." },
          { text: 'Explain moles to me in my own words.', why: "It can't use your words. Only you can." },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: "Which part of Kofi's explanation would the 'classmate' question first?",
        lines: ['First you change the grams into moles.', 'Then you use the numbers.', 'Then you change moles back into grams.'],
        bug: 1,
        fix: 'Then you use the coefficients in the balanced equation to find the mole ratio.',
        explanation: '"The numbers" is vague. Which numbers, and why?',
      },
      {
        kind: 'typeAnswer',
        prompt: "The rule behind the Feynman technique: if you can't explain it ..., you haven't understood it yet (one word)",
        answers: ['simply'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'david',
        message: "I explained circuits to the AI and it said \"Great explanation!\" every time. Didn't help.",
        prompt: 'What should Kofi suggest?',
        options: [
          { text: 'Tell it to play a confused classmate and only ask questions where you are vague. No praise, no explaining.' },
          { text: 'Then you must understand it.', why: 'Praise is not a test.' },
          { text: 'Stop explaining things.', why: 'Explaining is the point. The set-up needs fixing.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Explain-it-back done right, or not?',
        groups: ['Done right', 'Not quite'],
        items: [
          { text: 'Explaining without notes', group: 0 },
          { text: 'Reading your notes aloud to it', group: 1 },
          { text: 'It asks, you answer', group: 0 },
          { text: 'It explains, you nod', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why was Kofi\'s failed explanation to Miracle "the most useful thing that happened this week"?',
        options: [
          { text: 'It showed exactly what he didn\'t understand yet' },
          { text: 'It was funny', why: 'It was, a bit. But that is not why it was useful.' },
          { text: 'Miracle explained it for him', why: 'She did not. She made him find the holes.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the most important line of the set-up.',
        tiles: ["Don't", 'explain', 'it', 'yourself,', 'just', 'ask'],
        distractors: ['please', 'answer'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the role to when you would use it.',
        pairs: [
          ['A classmate who missed it', 'Checking a topic you just learned'],
          ['A younger student', 'Forcing yourself to use simple words'],
          ['A strict examiner', 'Practising exam-style explanations'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the set-up.',
        template: "Pretend you're a [[1]] who missed the lesson. I'll [[2]] it. Ask me questions where I'm [[3]].",
        blanks: [['classmate', 'student'], ['explain'], ['vague', 'unclear']],
        distractors: ['professor', 'copy', 'right'],
      },
    ],
  },
  reflect: {
    prompt: 'Pick something you think you understand. Explain it in three sentences here, as if to a classmate who missed it. Where did you hesitate?',
    starters: ['The topic is...', 'My explanation:', 'I hesitated at...'],
  },
  deepen: {
    title: 'Try it tonight',
    summary: 'Set up the AI as a confused classmate and explain your newest topic to it. Write down every question it asks that you could not answer.',
  },
  notes: '"Feynman technique" is a popular name for explain-it-simply learning, attributed to Richard Feynman; framed as "sometimes called". Learning by explaining (self-explanation, protégé effect) has research support; stated generally.',
};

export default lesson;
