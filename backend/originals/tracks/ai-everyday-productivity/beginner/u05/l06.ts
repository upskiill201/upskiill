import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 6. Chat with Tey: AI and numbers. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'The budget that didn\'t add up',
  summary: 'Day 27, moving boxes everywhere. The AI says the party comes in MX$600 under budget. Lucía nearly relaxes. Then she adds it up on her phone calculator. Tey on why AI and numbers need a second look.',
  minutes: 11,
  outcomes: [
    'Know that chat AI can make arithmetic mistakes',
    'Ask it to show its working, line by line',
    'Check totals with a calculator or spreadsheet',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'The AI said: total MX$45,400, budget MX$46,000, MX$600 to spare. Lucía\'s calculator says MX$46,400. Who\'s right?', replies: ['The calculator', 'The AI, surely'] },
        { tey: 'The calculator. Venue 10,000, food 19,500, mariachi 11,000, decorations 2,400, transport 1,800, cake 1,700. That\'s 46,400. She\'s MX$400 short, not MX$600 ahead.', replies: ['How did the AI get it wrong?'] },
        { tey: 'Chat AIs write numbers the way they write words: by predicting what comes next. They\'re often right, and sometimes slip on sums, especially long ones. Some tools can run real calculations, but you can\'t always tell which way it worked.', replies: ['So never use it for money?'] },
        { tey: 'Use it, and check it. Two habits: ask "show your working, one line per item", so you can see each step. Then check the total with a calculator or a spreadsheet.', replies: ['And the MX$400?'] },
        { tey: 'Now it\'s a normal problem. She asks AI for three ways to save MX$400 without touching food or music. It suggests fewer flowers. Decorations go from 2,400 to 2,000. Done.', replies: ['Phew'] },
        { tey: 'Words: AI is great. Numbers: AI is a helpful assistant who needs a calculator next to it. That\'s you.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Any number that matters (a total, a split, a date count, a dose): ask AI to show its working, then check the result with a calculator or spreadsheet.',
    },
  ],
  apply: {
    scenario: 'The party budget.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why can a chat AI get a sum wrong?',
        options: [
          { text: 'It predicts likely text, so it can slip on arithmetic, especially long sums' },
          { text: 'It can\'t read numbers', why: 'It reads them fine; adding is where it can slip.' },
          { text: 'It\'s trying to save her money', why: 'It has no motive; it just slipped.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Add it up: 10,000 + 19,500 + 11,000 + 2,400 + 1,800 + 1,700 = ? (A number.)',
        answers: ['46400', '46,400', 'MX$46,400', 'MX$46400'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'tomas',
        message: 'I split our team dinner bill with AI. Everyone paid. Was it right?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Definitely, AI is good at maths.', why: 'Often, not always.' },
          { text: 'Did you check it on a calculator? If not, nobody knows, including the AI.' },
          { text: 'Never use AI for bills.', why: 'Use it, and check it.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The two number habits.',
        template: 'Ask it to show its [[1]]. Check the total with a [[2]].',
        blanks: [['working', 'work'], ['calculator', 'spreadsheet']],
        distractors: ['feelings', 'friend'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Check with a calculator, or fine as it is?',
        groups: ['Check it', 'Fine'],
        items: [
          { text: 'The party total', group: 0 },
          { text: 'Ideas to save money', group: 1 },
          { text: 'Each cousin\'s share', group: 0 },
          { text: 'A name for the playlist', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of the AI\'s working is wrong?',
        lines: [
          'Venue + food = 29,500',
          '29,500 + mariachi 11,000 = 40,500',
          '40,500 + decorations 2,400 = 41,900',
          '41,900 + transport 1,800 + cake 1,700 = 45,400',
        ],
        bug: 2,
        fix: '40,500 + 2,400 = 42,900',
        explanation: 'That\'s where it slipped by 1,000, and every line after it carried the mistake. Showing the working made it findable.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which prompt makes the mistake easy to catch?',
        options: [
          { text: 'What\'s my total?', why: 'One number, no way to see a slip.' },
          { text: 'Am I under budget?', why: 'A yes or no hides the sum.' },
          { text: 'Add these up and show your working, one line per item, with a running total.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the numbers.',
        pairs: [
          ['Budget plus cousins', 'MX$46,000'],
          ['Real total', 'MX$46,400'],
          ['The AI\'s total', 'MX$45,400'],
          ['Saved on decorations', 'MX$400'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Order Lucía\'s budget check.',
        lines: ['Ask AI for the total, with working', 'Check it on a calculator', 'Find the gap: MX$400 short', 'Ask AI for ways to save MX$400', 'Update the budget'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Budget sorted?',
        prompt: 'Lucía\'s reply?',
        options: [
          { text: 'The AI said I was MX$600 under, so yes.', why: 'She\'d have been MX$400 short.' },
          { text: 'AI said MX$600 under. Calculator said MX$400 over. Fewer flowers fixed it. Always check the sum.' },
          { text: 'I gave up on the budget.', why: 'She fixed it.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'When did you last trust a number without checking it (a bill split, a discount, a total)? How would you check it next time?',
    starters: ['I trusted...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Give an AI tool a list of 8 to 10 real expenses and ask for the total with working. Check it on a calculator. Did it match?',
  },
  notes: 'Sums: 10,000+19,500 = 29,500; +11,000 = 40,500; +2,400 = 42,900; +1,800+1,700 = 46,400. Funds 40,000 + cousins 6,000 = 46,000. Short 400; decorations 2,400 → 2,000. LLM arithmetic errors are documented; some tools run code or calculators for maths, but users can\'t always tell.',
};

export default lesson;
