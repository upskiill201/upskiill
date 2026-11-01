import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 11 — story choice: Mr Tamba offers the one full-time Kmer job while Clinton is still hurting. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'An offer, on a bad week',
  summary: 'Four days after the Njangi Pay no, Mr Tamba calls Clinton into his tiny office. "I can keep one intern full-time. I\'d like it to be you." Clinton\'s heart says YES before his brain has finished listening.',
  minutes: 11,
  outcomes: ['Avoid deciding big things to escape a bad feeling', 'Ask for time to consider an offer', 'Know what to ask before you decide'],
  learn: [
    {
      kind: 'story',
      title: 'The tiny office',
      beats: [
        { speaker: 'narrator', text: 'Four days after the email. Mr Tamba closes the door of his tiny office.' },
        { speaker: 'narrator', text: '"I can keep one intern full-time after graduation, as a junior developer. I\'d like it to be you. Think about it, and tell me what you need to know."' },
        { speaker: 'clinton', text: '(to himself) Yes. YES. Anything to stop feeling like this.' },
        { speaker: 'tey', text: 'A great offer on a bad week is still worth thinking about properly. Accepting to escape a feeling is different from accepting because it\'s right.' },
      ],
      choice: {
        prompt: 'What should Clinton say?',
        options: [
          {
            text: 'Thank him warmly, say he\'s very interested, and ask for a few days and the details in writing.',
            outcome: 'Mr Tamba: "Of course. I\'ll send the details today. Can you let me know by Friday next week?" Clinton walks out with a real offer and time to think.',
            best: true,
          },
          {
            text: 'Say yes on the spot, before hearing the salary or the role.',
            outcome: 'He\'s relieved for a day. Then he realises he doesn\'t know the pay, the start date, or what "junior developer" means at Kmer.',
          },
          {
            text: 'Say no: Kmer isn\'t his dream company.',
            outcome: 'A real offer from someone who has seen his work, turned down in ten seconds while he\'s hurting.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Thank them, show interest, ask for the details in writing and a few days to decide. That\'s normal and professional.',
    },
  ],
  apply: {
    scenario: 'Mr Tamba makes an offer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is accepting on the spot risky this week?',
        options: [
          { text: 'Kmer is a bad company', why: 'It\'s a good offer. He just needs the details.' },
          { text: 'He\'d be deciding to escape a feeling, without the details' },
          { text: 'It\'s illegal', why: 'It\'s just unwise without details.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Should Clinton ask about this before deciding?',
        groups: ['Ask', 'Not needed now'],
        items: [
          { text: 'Salary', group: 0 },
          { text: 'Start date', group: 0 },
          { text: 'What the role involves', group: 0 },
          { text: 'Mr Tamba\'s favourite song', group: 1 },
          { text: 'Who he\'d learn from', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best reply to Mr Tamba.',
        from: 'clinton',
        message: 'What do I actually say to him, right now?',
        options: [
          { text: '"YES! Whatever you\'re paying is fine."', why: 'Thank him, then get the details.' },
          { text: '"No thanks, I want a bigger company."', why: 'Don\'t decide while hurting.' },
          { text: '"Thank you, that means a lot. I\'m very interested. Could you send me the details, and could I have a few days to think?"' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that rushes the decision.',
        lines: ['Thank you, that means a lot.', 'I accept, I don\'t need to know the salary.', 'Could I have a few days to think?'],
        bug: 1,
        explanation: 'Always know the basics before you accept.',
      },
      {
        kind: 'mcq',
        prompt: 'Is asking for a few days rude?',
        options: [
          { text: 'No: it\'s normal and professional' },
          { text: 'Yes, accept immediately', why: 'Asking for time is normal.' },
          { text: 'Only for big companies', why: 'It\'s normal everywhere.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Thank him, ask for details and time', 'A real offer and time to think'],
          ['Yes on the spot', 'Relief, then lots of unknowns'],
          ['No straight away', 'A good offer lost while hurting'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What does Mr Tamba ask in return?',
        options: [
          { text: 'An answer in ten minutes', why: 'He gave him until Friday next week.' },
          { text: 'Nothing, ever', why: 'He asked for an answer by Friday next week.' },
          { text: 'An answer by Friday next week' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Thank them, ask for the details in [[1]] and a few [[2]] to decide.',
        blanks: [['writing'], ['days']],
        distractors: ['secret', 'years', 'minutes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many interns can Mr Tamba keep full-time? (a number)',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good reason to accept, or a poor one?',
        groups: ['Good reason', 'Poor reason'],
        items: [
          { text: 'The work and the learning suit him', group: 0 },
          { text: 'To stop feeling bad this week', group: 1 },
          { text: 'The pay and terms are fair', group: 0 },
          { text: 'To show Njangi Pay they were wrong', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever made a big decision to escape a bad feeling? What happened?',
    starters: ['Once I...', 'Now I would...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your own "before I accept" list: the five things you must know about any offer.',
  },
  notes: 'Sets up L2 Ch5 (The offer): Clinton will weigh Kmer\'s real offer. Mr Tamba is a named extra.',
};

export default lesson;
