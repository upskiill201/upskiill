import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3 — Counting tokens, and the 4-letter rule of thumb. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Counting tokens',
  summary: 'Tokens are what you pay for and what fills the model\'s memory. Joel wants a quick way to estimate them without running code every time, and checks a rule of thumb against the shop\'s help page.',
  minutes: 11,
  outcomes: [
    'Count tokens with count_tokens()',
    'Estimate tokens from length: about 4 letters per token in English',
    'Count the tokens in a whole document',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'The help page in tokens',
      text: 'The help page is 316 practice tokens. Its 15 bullet lines are 283 of them; headings and spaces make up the rest. A rough rule for English: one token is about 4 letters, or about three quarters of a word. So 100 words is roughly 130 tokens.',
      hotspots: [
        { phrase: 'The help page is 316 practice tokens', note: 'count_tokens(open("rao_policies.md").read()). Every time it goes into a prompt, you pay for all 316.' },
        { phrase: '283 of them', note: 'Adding count_tokens() for each "- " line gives 283.' },
        { phrase: 'about 4 letters', note: 'A common rule of thumb for English with real tokenizers. It\'s an estimate: names, numbers and other languages vary.' },
        { phrase: '100 words is roughly 130 tokens', note: 'Useful for quick estimates of cost before you build anything.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Count a document',
      caption: 'The whole page, then line by line.',
      code: 'from teyro_ai import count_tokens\n\npolicies = open("rao_policies.md").read()\nprint("Whole page:", count_tokens(policies))\n\nlines = [l for l in policies.splitlines() if l.startswith("- ")]\nprint("Bullet lines:", len(lines))\nprint("Bullet tokens:", sum(count_tokens(l) for l in lines))\n',
      challenge: 'Which bullet line has the most tokens?',
    },
  ],
  apply: {
    scenario: 'Counting before you pay.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print the number of practice tokens in the whole help page',
        starter: 'from teyro_ai import count_tokens\n\npolicies = open("rao_policies.md").read()\n',
        solution: 'from teyro_ai import count_tokens\n\npolicies = open("rao_policies.md").read()\nprint(count_tokens(policies))\n',
        hint: 'count_tokens(policies)',
        checks: [{ message: 'Print 316', outputEquals: '316' }],
      },
      {
        kind: 'mcq',
        prompt: 'Roughly how many tokens is 100 English words, by the rule of thumb?',
        options: [
          { text: 'About 25', why: 'That would be 4 words per token. It\'s about 4 letters.' },
          { text: 'About 130' },
          { text: 'Exactly 100', why: 'Many words are more than one token.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print the total tokens of the bullet lines, using sum() and count_tokens()',
        starter: 'from teyro_ai import count_tokens\n\npolicies = open("rao_policies.md").read()\nlines = [l for l in policies.splitlines() if l.startswith("- ")]\n',
        solution: 'from teyro_ai import count_tokens\n\npolicies = open("rao_policies.md").read()\nlines = [l for l in policies.splitlines() if l.startswith("- ")]\nprint(sum(count_tokens(l) for l in lines))\n',
        hint: 'sum(count_tokens(l) for l in lines)',
        checks: [{ message: 'Print 283', outputEquals: '283' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'More tokens or fewer?',
        groups: ['More tokens', 'Fewer tokens'],
        items: [
          { text: 'The whole help page', group: 0 },
          { text: 'One bullet line', group: 1 },
          { text: 'A 300-word reply', group: 0 },
          { text: '"Hi!"', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the text to its practice token count.',
        pairs: [
          ['"Hi!"', '2'],
          ['"Is delivery free?"', '5'],
          ['The whole help page', '316'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'Why should I care about counting tokens?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'You shouldn\'t.', why: 'Tokens drive cost, speed and what fits.' },
          { text: 'Only output tokens matter.', why: 'Input tokens are billed too, and the help page is most of them.' },
          { text: 'Every token in and out is billed, takes time, and fills the model\'s limited window. Counting is how we keep all three under control.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule of thumb.',
        template: 'In English, one token is about [[1]] letters, or about three quarters of a [[2]].',
        blanks: [['4', 'four'], ['word']],
        distractors: ['10', 'page'],
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'from teyro_ai import count_tokens\nprint(count_tokens("Is delivery free?") + count_tokens("Hi!"))',
        language: 'python',
        options: [
          { text: '7' },
          { text: '5', why: 'Add the 2 tokens of "Hi!".' },
          { text: '2', why: 'Add the 5 tokens of the first text.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'This prints the number of LINES, not tokens. Which line?',
        language: 'python',
        lines: ['from teyro_ai import count_tokens', 'lines = [l for l in policies.splitlines() if l.startswith("- ")]', 'print(len(lines))'],
        bug: 2,
        fix: 'print(sum(count_tokens(l) for l in lines))',
        explanation: 'len() counts the lines. Add up count_tokens() of each one.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many bullet lines does the help page have?',
        answers: ['15', 'fifteen'],
        placeholder: 'A number',
      },
    ],
  },
  reflect: {
    prompt: 'If every word you sent cost money, how would you write differently? Would it make your writing better or worse?',
    starters: ['I\'d write...', 'It would make it...'],
  },
  deepen: {
    title: 'Count with the real tokenizer',
    summary: 'For real bills, count with the model\'s own tokenizer: providers publish tools for it. The 4-letter rule is for quick estimates only.',
  },
  notes: 'count_tokens(rao_policies.md) = 316; 15 bullet lines totalling 283 practice tokens. Rule of thumb for English with common real tokenizers: about 4 characters or 0.75 words per token (widely cited, e.g. OpenAI guidance). 5 + 2 = 7.',
};

export default lesson;
