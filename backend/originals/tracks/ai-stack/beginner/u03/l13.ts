import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 13 — Languages: English, Hindi and token costs. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Languages and token costs',
  summary: 'Half of Mr Rao\'s customers write in Hindi, or in Hindi typed in English letters. Joel counts the tokens for the same question three ways, and finds that language changes the bill.',
  minutes: 11,
  outcomes: [
    'Know that the same message can cost different tokens in different languages',
    'Count tokens for English, Hindi and Hinglish',
    'Plan Ask Rao for customers who don\'t write in English',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'One question, three ways',
      text: '"Is delivery free?" is 5 practice tokens. "क्या डिलीवरी मुफ्त है?", the same question in Hindi, is 19. "Delivery free hai kya?", Hindi in English letters, is 6. Same meaning, very different counts.',
      hotspots: [
        { phrase: '"Is delivery free?" is 5 practice tokens', note: 'Tokenizers learned mostly from English text, so English splits into fewer, bigger pieces.' },
        { phrase: 'is 19', note: 'The practice tokenizer counts each Devanagari character. Real tokenizers do better, but many still use noticeably more tokens for Hindi than English.' },
        { phrase: 'is 6', note: 'Hinglish in Latin letters tokenizes much like English. Many customers write this way on WhatsApp.' },
        { phrase: 'Same meaning, very different counts', note: 'More tokens means more cost, more wait, and less room in the context window for the same content.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count three ways',
      caption: 'Add your own language.',
      code: 'from teyro_ai import count_tokens\n\nfor text in ["Is delivery free?", "क्या डिलीवरी मुफ्त है?", "Delivery free hai kya?"]:\n    print(count_tokens(text), text)\n',
      challenge: 'Try "नमस्ते" and "namaste".',
    },
  ],
  apply: {
    scenario: 'Tokens across languages.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the practice token count of the Hindi question "क्या डिलीवरी मुफ्त है?"',
        starter: 'from teyro_ai import count_tokens\n',
        solution: 'from teyro_ai import count_tokens\nprint(count_tokens("क्या डिलीवरी मुफ्त है?"))\n',
        hint: 'count_tokens("...")',
        checks: [{ message: 'Print 19', outputEquals: '19' }],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the version to its practice token count.',
        pairs: [
          ['English: "Is delivery free?"', '5'],
          ['Hinglish: "Delivery free hai kya?"', '6'],
          ['Hindi script', '19'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do some languages use more tokens?',
        options: [
          { text: 'Those languages are longer', why: 'The meaning is the same; the tokenizer is the difference.' },
          { text: 'Tokenizers learned mostly from English, so other scripts split into smaller pieces' },
          { text: 'Models dislike other languages', why: 'It\'s about how text was split when tokenizers were built.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'More practice tokens or fewer, for the same meaning?',
        groups: ['More', 'Fewer'],
        items: [
          { text: 'नमस्ते', group: 0 },
          { text: 'namaste', group: 1 },
          { text: 'Hindi script', group: 0 },
          { text: 'English', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Should Ask Rao only answer in English to save tokens?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'Yes, English only.', why: 'Customers who write Hindi deserve answers in Hindi.' },
          { text: 'Tokens don\'t change by language.', why: 'They do, sometimes a lot.' },
          { text: 'No: customers should be answered in their language. We budget for the extra tokens, and test Hindi questions as carefully as English ones.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import count_tokens\nprint(count_tokens("namaste"))',
        language: 'python',
        options: [
          { text: '2' },
          { text: '7', why: 'English letters split into pieces of up to 4: "nama" + "ste".' },
          { text: '6', why: 'That\'s the Hindi script version.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The lesson.',
        template: 'The same [[1]] can cost a different number of [[2]] in different languages.',
        blanks: [['message', 'question', 'meaning'], ['tokens']],
        distractors: ['letters', 'models'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in the test plan is a gap?',
        lines: [
          'Test 30 English questions.',
          'Test 30 Hinglish questions.',
          'Skip Hindi-script questions: few people type them.',
          'Budget for more tokens on Hindi chats.',
        ],
        bug: 2,
        fix: 'Test Hindi-script questions too.',
        explanation: 'Customers who type in Hindi script are real customers; untested languages are where answers go wrong.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many times more practice tokens the Hindi question uses than the English one, rounded to 1 place',
        starter: 'from teyro_ai import count_tokens\n\nenglish = count_tokens("Is delivery free?")\nhindi = count_tokens("क्या डिलीवरी मुफ्त है?")\n',
        solution: 'from teyro_ai import count_tokens\n\nenglish = count_tokens("Is delivery free?")\nhindi = count_tokens("क्या डिलीवरी मुफ्त है?")\nprint(round(hindi / english, 1))\n',
        hint: 'round(hindi / english, 1)',
        checks: [{ message: 'Print 3.8', outputEquals: '3.8' }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do people call Hindi typed in English letters? (one word)',
        answers: ['Hinglish', 'hinglish'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Which languages do people around you write in on their phones? How would you make an assistant fair to all of them?',
    starters: ['People around me write in...', 'To be fair, I\'d...'],
  },
  deepen: {
    title: 'Fairness by language',
    summary: 'If one language costs four times the tokens, it may also fit less context and get weaker answers. Checking quality per language is part of fairness testing in Chapter 10.',
  },
  notes: 'teyro_ai practice tokenizer: "Is delivery free?" 5; "क्या डिलीवरी मुफ्त है?" 19 (one token per Devanagari character); "Delivery free hai kya?" 6; "namaste" 2. 19/5 = 3.8. Real tokenizers are more efficient on Hindi than this, but non-English text, especially non-Latin scripts, commonly costs more tokens per word (well documented).',
};

export default lesson;
