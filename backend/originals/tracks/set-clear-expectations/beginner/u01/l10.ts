import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Chapter Challenge: the Day 4 demo, and Mr Rao's one-line email. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Challenge: the first demo',
  summary: 'Day 4, 6 p.m. Arjun shows Mr Rao the first demo. Mr Rao watches for forty seconds, then sends a one-line email: "Why is it in English only?" Kavya and Joel are both on the call. Both look at the floor.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every Chapter 1 tool in one live moment',
    'Own a gap in front of your team and your client',
    'Reset expectations without blaming anyone',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 4, 6:02 p.m., after the demo',
      beats: [
        { speaker: 'narrator', text: 'Mr Rao\'s email arrives while they\'re still on the call: "Why is it in English only?" That\'s the whole email. Hindi has been on Kavya\'s checklist since Day 2. But nobody told her the demo was today, or what it had to show.' },
        { speaker: 'kavya', text: '(quietly) I thought Hindi was for the final version. I didn\'t know the demo needed it.' },
        { speaker: 'narrator', text: 'Arjun feels his face go hot. He could say "Kavya forgot Hindi." Technically, she did. Joel is watching very closely to see what Arjun does with a mistake.' },
        { speaker: 'narrator', text: 'Twenty-six days to Diwali. You\'re with Arjun.' },
      ],
    },
  ],
  apply: {
    scenario: 'The call, 6:02 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Arjun say to Kavya and Joel first?',
        options: [
          { text: '"That one\'s on me. I never said what the demo had to show. Let\'s fix that, then the page."' },
          { text: '"Kavya, you missed Hindi."', why: 'She was never told. And Joel learns mistakes get blamed.' },
          { text: '"Don\'t worry, I\'ll add Hindi myself tonight."', why: 'Rescuing teaches nothing and doesn\'t fix the brief.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 tool helps now?',
        groups: ['Definition of done', 'Say it back', 'Safe to ask'],
        items: [
          { text: 'Add "English and Hindi" to Kavya\'s checklist', group: 0 },
          { text: '"Tell me what you\'ll change first."', group: 1 },
          { text: '"That one\'s on me."', group: 2 },
          { text: 'A five-box done list for every page', group: 0 },
          { text: 'Kavya explains the new brief back', group: 1 },
          { text: '"What else might I have forgotten to say?"', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'I\'m so sorry. I thought Hindi was for the final version.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'It\'s fine, but please be more careful.', why: 'She was careful. The brief was missing it.' },
          { text: 'Mr Rao is upset.', why: 'True, and it adds guilt without helping.' },
          { text: 'You had no way to know: I never said what the demo needed. I\'ll fix that tonight. What else might I have forgotten to tell you?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The gap was in the brief, not in Kavya\'s ___. (one word)',
        answers: ['work', 'Work', 'effort', 'code'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s next hour in order.',
        lines: ['Own the gap to the team', 'Reply to Mr Rao in one line', 'Rewrite Kavya\'s brief with done', 'Ask her to say it back'],
      },
      {
        kind: 'mcq',
        prompt: 'Mr Rao reads only the first line. What should Arjun\'s reply start with?',
        options: [
          { text: '"Thank you for your feedback on the demo, we really appreciate..."', why: 'He\'ll never reach the answer.' },
          { text: '"It was always going to be in Hindi, of course."', why: 'Defensive, and it doesn\'t say when.' },
          { text: '"Hindi will be live by Day 7."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s new brief for Kavya. Which line repeats the Day 1 mistake?',
        lines: [
          'Next demo, Day 7: product pages in English and Hindi.',
          'And the rest of the usual demo stuff, you know.',
          'Done for the demo: the 5-box checklist. Rough version tomorrow 4 p.m.',
        ],
        bug: 1,
        fix: 'The demo shows Hindi, the size picker and a real "Add to cart".',
        explanation: '"The usual stuff, you know" is the curse of knowledge in four words.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the moment to the tool.',
        pairs: [
          ['"That one\'s on me."', 'Owning the gap'],
          ['"Hindi by Day 7."', 'Answer first, for Mr Rao'],
          ['Kavya explains it back', 'Checking understanding'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is Joel learning from how Arjun handles this?',
        options: [
          { text: 'That Kavya is in trouble', why: 'Only if Arjun blames her.' },
          { text: 'That mistakes get fixed, not blamed, so it\'s safe to flag them early' },
          { text: 'Nothing', why: 'New people watch these moments very closely.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 1, in one line.',
        template: 'What\'s [[1]] to you is invisible to them. Write it [[2]], show it, and ask them to say it [[3]].',
        blanks: [['obvious'], ['down'], ['back']],
        distractors: ['hidden', 'louder'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the first line to Mr Rao.',
        tiles: ['Hindi', 'will', 'be', 'live', 'by', 'Day', '7.'],
        distractors: ['Sorry'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone was blamed for missing something they were never told. What would owning the gap have sounded like?',
    starters: ['They were blamed for...', 'Owning it would sound like...'],
  },
  deepen: {
    title: 'Next: Day 6',
    summary: 'Hindi goes live on Day 6. Then Arjun opens the code and finds that Kavya AND Joel have both built the checkout, two different ways, each sure it was their job. Chapter 2: Who does what?',
  },
  notes: 'Chapter 1 challenge. Owning a brief gap, rebriefing with a definition of done and teach-back, answer-first communication to a first-line reader (How to Make People Listen to You). Fictional events.',
};

export default lesson;
