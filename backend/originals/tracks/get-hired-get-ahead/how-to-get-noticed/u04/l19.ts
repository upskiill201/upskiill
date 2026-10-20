import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 19 — the learner writes their own cover letter (career kit, piece 4). Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your cover letter',
  summary: 'Piece 4 of your career kit. Pick one real role you want, and write the letter in five steps: research, opening, why them, why you, close. Then the checks.',
  minutes: 13,
  outcomes: ['Write a one-page cover letter for a real role', 'Make every paragraph specific to that company', 'Check it before you send'],
  learn: [
    {
      kind: 'steps',
      title: 'Your letter in five steps',
      steps: [
        { title: '1. Pick one real role and research it', body: 'One advert you\'d genuinely apply for. Highlight its must-haves. Spend 20 minutes on their website, news, posts and people. Write down one or two real details.' },
        { title: '2. Write the opening', body: 'Three sentences: a story only you could tell, what you did and what changed, and the bridge to their work. Name the role last.' },
        { title: '3. Write "why them"', body: 'Two or three sentences with your real details. Run the swap-the-name test: if another company\'s name fits, rewrite.' },
        { title: '4. Write "why you"', body: 'Two proofs from your proof bank, matched to two must-haves. Name their need, prove it in two sentences, link it to the role.' },
        { title: '5. Close, then check', body: 'A calm invitation and thanks. Then: read aloud, check every name, about 300 words, no apologies or big claims, saved as "Firstname-Lastname-Cover-Letter-Company.pdf".' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'If you use AI, use it on your own draft only, ask it not to add anything, and check every change.',
    },
  ],
  apply: {
    scenario: 'You write your cover letter.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the five steps in order.',
        lines: ['Pick one real role and research it', 'Write the opening', 'Write "why them"', 'Write "why you"', 'Close, then check'],
      },
      {
        kind: 'mcq',
        prompt: 'Which role should you write your first letter for?',
        options: [
          { text: 'A real advert you\'d genuinely apply for' },
          { text: 'A made-up dream job', why: 'Real adverts have real must-haves to match. Use one.' },
          { text: 'Any job, it doesn\'t matter', why: 'It matters: the letter is specific to one role.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Ready to send, or fix first?',
        groups: ['Ready', 'Fix first'],
        items: [
          { text: 'Opening with your own story', group: 0 },
          { text: '"Why them" that works for any company', group: 1 },
          { text: 'Two proofs matching must-haves', group: 0 },
          { text: '"I know there are better candidates"', group: 1 },
          { text: 'About 300 words', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that fails the checks.',
        lines: ['Dear Mbanga Bakeries team,', 'I am writing to apply for the advertised position.', 'Kind regards, Ngum Fru'],
        bug: 1,
        explanation: 'The most-read line, wasted. Open with your story.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'How will you know your "why them" is specific enough?',
        options: [
          { text: 'I\'ll swap in another company\'s name. If it still works, I rewrite it.' },
          { text: 'If it sounds nice.', why: 'Nice isn\'t specific. Use the swap test.' },
          { text: 'If it\'s long.', why: 'Length doesn\'t make it specific.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of your kit to where it helps your letter.',
        pairs: [
          ['Evidence bank', 'Proofs for "why you"'],
          ['Portfolio case study', 'A story for the opening'],
          ['Your CV', 'Attached, not repeated'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the safe way to use AI on your letter?',
        options: [
          { text: 'On your own draft, asking it not to add anything, and checking every change' },
          { text: 'Ask it to write the whole letter', why: 'Then it isn\'t yours, and may not be true.' },
          { text: 'Never read what it writes', why: 'Always read every word you send.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the file name.',
        template: 'Firstname-Lastname-[[1]]-Letter-[[2]].pdf',
        blanks: [['Cover'], ['Company']],
        distractors: ['Final', 'v3', 'Photo'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Your letter should be about how many words? (a number)',
        answers: ['300', 'about 300', '250', '400'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of step 5\'s checks, or not?',
        groups: ['Check it', 'Not part of it'],
        items: [
          { text: 'Read it aloud', group: 0 },
          { text: 'Search for every company name', group: 0 },
          { text: 'Add more adjectives', group: 1 },
          { text: 'Open the PDF before attaching', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Write the opening and "why them" for your real role now. Run the swap-the-name test on both.',
    starters: ['Opening: ...', 'Why them: ...'],
  },
  deepen: {
    title: 'Your career kit, piece 4',
    summary: 'Finish the full letter for your real role, get one second reader, and save it next to your CV. Chapter 5 builds your LinkedIn profile.',
  },
  notes: 'Learner\'s career kit, piece 4 (outline engagement point 1).',
};

export default lesson;
