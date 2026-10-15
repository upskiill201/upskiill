import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 9. "Line Check" (Tap to explore): Miracle's opening words for Sunday. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line Check: Miracle\'s opening words',
  summary: 'Saturday night. Miracle reads Tey the first thirty seconds of what she plans to say at Sunday lunch. Tey goes through it, line by line, on air. "Producer, this might be the best opening on Tey FM all year."',
  minutes: 11,
  outcomes: [
    'See every Chapter 5 tool in one opening',
    'Open a hard conversation with respect and curiosity',
    'Put listening before your case',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Miracle\'s opening (Sunday, after lunch)',
      text: 'Mama, Papa, thank you for making time for this. I know you both want me safe, and I want that too. Before I say anything about Lagos, I want to hear what worries you most. Papa, after what you told me about your first job, I understand why security matters so much. Whatever we decide, I want it to be a decision you understand, and I\'d love us to keep talking.',
      hotspots: [
        { phrase: 'thank you for making time for this', note: 'She booked the conversation (Producer\'s Notes on timing) and thanks them for it. Respect first.' },
        { phrase: 'I know you both want me safe, and I want that too', note: 'A shared interest, named first. Under the positions, they want the same thing.' },
        { phrase: 'Before I say anything about Lagos, I want to hear what worries you most', note: 'Listening first, with an open question. Their voice comes before her case.' },
        { phrase: 'after what you told me about your first job, I understand why security matters so much', note: 'Proof she listened on Wednesday. Papa hears his own story taken seriously.' },
        { phrase: 'a decision you understand', note: 'Not "a decision you agree with". Heard, not necessarily agreed.' },
        { phrase: 'I\'d love us to keep talking', note: 'No ultimatum. The door stays open, which lowers the pressure, and the reactance.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good hard-conversation opener: thanks, a shared interest, an open question, proof you\'ve listened, and an open door.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Line Check.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Miracle ask about their worries before mentioning Lagos?',
        options: [
          { text: 'To avoid ever talking about Lagos', why: 'She\'ll get there, after listening.' },
          { text: 'To trick them', why: 'It\'s genuine. She wants to know.' },
          { text: 'People who feel heard first are usually more open to listening' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 5 tool is it?',
        groups: ['Shared interest', 'Listening first', 'Open door'],
        items: [
          { text: 'I know you want me safe, and I want that too', group: 0 },
          { text: 'What worries you most?', group: 1 },
          { text: 'I\'d love us to keep talking', group: 2 },
          { text: 'After what you told me about your first job...', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s opening in order.',
        lines: ['Thank them for the time', 'Name the shared interest', 'Ask what worries them most', 'Show she listened on Wednesday', 'Leave the door open'],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Should I end the opening with "...and I\'m going to Lagos either way"?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'No. That\'s an ultimatum, and it triggers reactance before they\'ve spoken.' },
          { text: 'Yes, be clear from the start.', why: 'Clear is good. An ultimatum at minute one isn\'t.' },
          { text: 'Say it twice for emphasis.', why: 'Twice the reactance.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Miracle wants "a decision you ___", not necessarily one they agree with. (one word)',
        answers: ['understand'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s first draft. Which line would fail the Line Check?',
        lines: [
          'Thank you for making time for this.',
          'I know you both want me safe, and I want that too.',
          'I\'ve prepared twelve reasons why you\'re wrong about startups.',
          'What worries you most?',
        ],
        bug: 2,
        fix: 'Before I say anything about Lagos, I want to hear you.',
        explanation: '"Why you\'re wrong" is pushing. Listening first, case later.',
      },
      {
        kind: 'mcq',
        prompt: 'Why mention Papa\'s first-job story?',
        options: [
          { text: 'To use it against him', why: 'It\'s respect, not ammunition.' },
          { text: 'It proves she really listened, so he feels respected' },
          { text: 'To change the subject', why: 'It\'s very much on the subject.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Heard', 'They understand your view'],
          ['Agreed', 'They share your view'],
          ['Open door', '"Can we keep talking?"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s key line.',
        template: 'Before I say anything about [[1]], I want to [[2]] what worries you [[3]].',
        blanks: [['Lagos'], ['hear', 'know'], ['most']],
        distractors: ['least', 'argue'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the shared interest.',
        tiles: ['You', 'want', 'me', 'safe,', 'and', 'I', 'want', 'that', 'too.'],
        distractors: ['but'],
      },
    ],
  },
  reflect: {
    prompt: 'Write the first thirty seconds of a hard conversation you need to have: thanks, a shared interest, an open question, and an open door.',
    starters: ['Thank you for...', 'I know we both want...', 'What worries you most about...'],
  },
  deepen: {
    title: 'Read it out loud',
    summary: 'Read your opening out loud to yourself, or to a friend. If any line sounds like pushing ("you need to", "you\'re wrong"), rewrite it as an invitation or a question.',
  },
  notes: 'Synthesis of Chapter 5 tools (timing, shared interests, listening first, heard vs agreed, avoiding reactance). Explore hotspot phrases appear verbatim in the text.',
};

export default lesson;
