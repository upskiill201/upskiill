import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 17 — Common model misunderstandings. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Common model misunderstandings',
  summary: 'Mr Rao\'s nephew helps in the shop and has strong opinions about AI. Kavya collects his beliefs on a sticky note. Joel, gently, rewrites each one.',
  minutes: 11,
  outcomes: [
    'Correct five common misunderstandings about models',
    'Explain each correction with what you now know',
    'Show that a model doesn\'t know today\'s date unless told',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The sticky note, rewritten',
      before: {
        label: 'What people often believe',
        text: '1. It remembers our past chats.\n2. It knows today\'s date and the latest news.\n3. It checks facts before answering.\n4. Bigger means it tells the truth.\n5. It counts letters and does sums perfectly.',
      },
      after: {
        label: 'What\'s actually true',
        text: '1. It only sees what the app sends each time.\n2. Its knowledge stops at a cut-off; tell it the date.\n3. It predicts likely text; you supply the facts.\n4. Bigger models hallucinate too.\n5. It sees tokens, not letters, so counting and maths can trip it up: use code for those.',
      },
      notes: [
        'Each belief makes sense from the outside, because the replies are fluent and confident.',
        'Each correction comes from one idea: a model predicts the next token from what it learned and what it\'s given.',
        'For dates, sums and counts, let ordinary code do it and give the result to the model.',
      ],
    },
    {
      kind: 'tryIt',
      title: 'What day is it?',
      caption: 'The model can\'t know unless the app tells it.',
      code: 'from datetime import date\nfrom teyro_ai import PracticeModel\n\nm = PracticeModel()\nprint(m.reply("What is today\'s date?"))\nprint("The app knows:", date(2026, 11, 14))\n',
      challenge: 'How would you give the model the date? (Hint: put it in the prompt.)',
    },
  ],
  apply: {
    scenario: 'Clearing up misunderstandings.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the belief to the truth.',
        pairs: [
          ['"It remembers us"', 'It sees only what\'s sent'],
          ['"It knows today\'s news"', 'Its knowledge has a cut-off'],
          ['"It checks facts"', 'It predicts likely text'],
          ['"It counts letters perfectly"', 'It sees tokens, not letters'],
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Count the letters in "kurta" with Python instead of asking a model, and print the count',
        starter: 'word = "kurta"\n',
        solution: 'word = "kurta"\nprint(len(word))\n',
        hint: 'len(word)',
        checks: [{ message: 'Print 5', outputEquals: '5' }],
      },
      {
        kind: 'mcq',
        prompt: 'Why can counting letters trip a model up?',
        options: [
          { text: 'It sees tokens like "kurt" + "a", not individual letters' },
          { text: 'It can\'t read', why: 'It reads tokens, which hide individual letters.' },
          { text: 'Letters are secret', why: 'They\'re just grouped into tokens.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Do it with code, or let the model do it?',
        groups: ['Code', 'Model'],
        items: [
          { text: 'Adding up an order total', group: 0 },
          { text: 'Writing a friendly reply', group: 1 },
          { text: 'Finding today\'s date', group: 0 },
          { text: 'Summarising a policy in plain words', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'Mr Rao\'s nephew says the AI remembers his last chat. Should I correct him?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Kindly: "It seems to remember because the app resends the chat. Close the chat and it starts fresh." It helps him trust it the right amount.' },
          { text: 'Tell him he\'s wrong and move on.', why: 'Explaining kindly builds the right trust.' },
          { text: 'Agree with him.', why: 'Wrong beliefs lead to wrong trust.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import tokenize\nprint(tokenize("kurta"))',
        language: 'python',
        options: [
          { text: "['kurt', 'a']" },
          { text: "['k', 'u', 'r', 't', 'a']", why: 'Practice tokens are pieces of up to 4 letters.' },
          { text: "['kurta']", why: '5 letters is more than 4, so it splits.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Let code help.',
        template: 'For dates, sums and counts, use [[1]] and give the [[2]] to the model.',
        blanks: [['code', 'Python'], ['result', 'answer']],
        distractors: ['guess', 'temperature'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on Joel\'s rewritten note is still a myth?',
        lines: [
          'It writes fluent text very quickly.',
          'It predicts likely next tokens.',
          'It remembers every past chat by itself.',
          'Its knowledge stops at a cut-off.',
        ],
        bug: 2,
        fix: 'It only sees what the app sends each time.',
        explanation: 'Models keep no memory between calls; the app resends the chat.',
      },
      {
        kind: 'writeCode',
        prompt: 'Add up an order of ₹799 and ₹1,299 with code and print the total',
        starter: 'items = [799, 1299]\n',
        solution: 'items = [799, 1299]\nprint(sum(items))\n',
        hint: 'sum(items)',
        checks: [{ message: 'Print 2098', outputEquals: '2098' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many letters are in "kurta"?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'Which of the five beliefs did you hold before this course? Which one surprised you most?',
    starters: ['I believed...', 'The most surprising was...'],
  },
  deepen: {
    title: 'Tools for maths',
    summary: 'Many AI products let the model call a calculator or run code for maths, instead of guessing. That\'s tool calling, Chapter 7.',
  },
  notes: 'Common misconceptions: statelessness, knowledge cut-off, no built-in fact-checking, size does not eliminate hallucination, tokenization hampers character-level tasks. tokenize("kurta") = [kurt, a]. 799 + 1299 = 2098. date(2026, 11, 14) is an illustrative date in the story.',
};

export default lesson;
