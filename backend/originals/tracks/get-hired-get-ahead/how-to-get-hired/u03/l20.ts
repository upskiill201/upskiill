import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 3 · Lesson 20 — Chapter Challenge: the real interview with Brenda at Njangi Pay. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: the interview',
  summary: '10:20am, Njangi Pay, Douala. Brenda and a senior developer sit across the table. "So, Clinton. Tell me about yourself." Everything from this chapter, question by question.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Answer a full interview calmly', 'Use your story bank under pressure', 'Close the interview well'],
  learn: [
    {
      kind: 'story',
      title: '10:20am',
      beats: [
        { speaker: 'narrator', text: '10:20am. A glass meeting room on the fourth floor. Brenda smiles. Beside her, a senior developer with a laptop and a serious face.' },
        { speaker: 'brenda', text: 'Glad you made it. Your cover letter opened with your mum\'s njangi notebook; I still remember it. So, Clinton. Tell me about yourself.' },
        { speaker: 'narrator', text: 'Present, past, future. Fifty-five seconds. Then question after question, and a story for every one.' },
        { speaker: 'brenda', text: 'Thank you, Clinton. We\'re seeing a few more people this week. You\'ll hear from us within ten days.' },
        { speaker: 'tey', text: 'Let\'s replay the interview, question by question.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your job-search kit so far',
      steps: [
        { title: 'Piece 1', body: 'Network map, message templates, weekly tracker.' },
        { title: 'Piece 2', body: 'Internship plan.' },
        { title: 'Piece 3 (this chapter)', body: 'Story bank: opener, six stories, weakness, why us, questions.' },
        { title: 'Next chapter: When it\'s a no', body: 'Ten days later, an email arrives. On his birthday.' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: the Njangi Pay interview.',
    items: [
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best opener.',
        from: 'brenda',
        message: 'So, Clinton. Tell me about yourself.',
        options: [
          { text: 'Right now I\'m a final-year CS student building offline delivery confirmations at Kmer: eleven drivers use them. Before that, a savings tracker 60 people use. Next, payment tools people rely on, which is why I\'m here.' },
          { text: 'I was born in Bamenda and I like football...', why: 'Present, past, future, with proof.' },
          { text: 'I\'m a hard worker and a team player.', why: 'Claims, not proof.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s problem-solving answer in STAR order.',
        lines: ['Drivers couldn\'t confirm without data', 'My job: make it work offline', 'Saved on the phone, synced later, flagged old phones early', 'Eleven drivers, zero lost confirmations'],
      },
      {
        kind: 'chatReply',
        prompt: 'The developer asks something Clinton hasn\'t done. Pick his answer.',
        from: 'brenda',
        message: 'Our developer asks: how would you handle a payment provider being down for an hour?',
        options: [
          { text: '"I haven\'t handled that exactly, but at Kmer I queued confirmations offline and retried later. I\'d think about queuing payments safely, with unique IDs so nothing is charged twice."' },
          { text: '"I\'ve done that loads." (he hasn\'t)', why: 'Never bluff.' },
          { text: '"No idea."', why: 'Reason from what you know.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Strong or weak in this interview?',
        groups: ['Strong', 'Weak'],
        items: [
          { text: 'A mistake owned within ten minutes', group: 0 },
          { text: 'I\'m a perfectionist', group: 1 },
          { text: 'Your offline mode is my Kmer problem', group: 0 },
          { text: 'You\'re an innovative company', group: 1 },
          { text: 'Pausing to think before a hard answer', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak line in Clinton\'s weakness answer.',
        lines: ['I used to say yes to everything.', 'Now I plan my priorities every Monday.', 'But honestly I have no real weaknesses.'],
        bug: 2,
        explanation: 'It contradicts the honest answer he just gave.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each question to Clinton\'s story.',
        pairs: [
          ['A time you made a mistake', 'The broken sync'],
          ['A time you disagreed', 'The credit mix-up with Nadia'],
          ['A time you took initiative', 'Starting the meet-up'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How should Clinton mention the late bus at the start?',
        options: [
          { text: 'One short thank-you for moving the time, then focus' },
          { text: 'Ten minutes about the engine', why: 'Brief, then move on.' },
          { text: 'Blame Njangi Pay\'s location', why: 'Never blame them.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Brenda asks, "Any questions for us?" Which is best?',
        options: [
          { text: '"What would success look like for a graduate developer in the first three months?"' },
          { text: '"No, you covered everything."', why: 'A missed chance.' },
          { text: '"When was Njangi Pay founded?"', why: 'It\'s on the website.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s chapter rules.',
        template: 'Present, past, [[1]]. STAR with a [[2]]. Don\'t [[3]].',
        blanks: [['future'], ['number'], ['bluff']],
        distractors: ['hobbies', 'joke', 'breathe'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Within how many days will Clinton hear back? (a number)',
        answers: ['10', 'ten'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Do it after the interview, or not?',
        groups: ['Do it', 'Don\'t'],
        items: [
          { text: 'A five-line thank-you within a day', group: 0 },
          { text: 'Message Brenda daily for news', group: 1 },
          { text: 'Write down what went well and what didn\'t', group: 0 },
          { text: 'Stop all other applications', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'How do you feel it went?',
        options: [
          { text: 'Good. I\'ll send the thank-you tonight and keep my other conversations going while I wait.' },
          { text: 'Perfect, I\'ll stop looking now.', why: 'Keep other doors open until there\'s an offer.' },
          { text: 'Terrible, I\'m giving up.', why: 'He did well. Keep going either way.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Imagine your next interview has just ended. What would you want to be able to say about how you prepared?',
    starters: ['I prepared by...', 'I\'m proud that...'],
  },
  deepen: {
    title: 'Your kit, piece 3',
    summary: 'Finish your story bank and practise it out loud three times. After your next interview, write down what went well and one thing to improve.',
  },
  notes: 'Chapter Challenge. Brenda Fon (CastId brenda) speaks. Brenda quoting the cover letter fulfils L1 Ch4\'s setup. The outcome (a no) comes in Ch4.',
};

export default lesson;
