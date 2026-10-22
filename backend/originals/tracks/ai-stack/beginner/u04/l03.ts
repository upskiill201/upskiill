import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 3 — "Open" isn't always open: licences. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: '"Open" isn\'t always open',
  summary: 'Before choosing model-c, Arjun asks the boring question that can sink a business: "What does the licence say?" Joel discovers that "open" models come with very different rules.',
  minutes: 11,
  outcomes: [
    'Know that open-weight models have licences',
    'Tell permissive licences from ones with conditions',
    'Check a licence before shipping',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Three kinds of licence',
      text: 'Some open-weight models use standard permissive licences such as Apache 2.0 or MIT: use them commercially, change them, ship them. Others use the lab\'s own licence with conditions, such as limits for very large companies or rules on use. A few are for research only. Always read the licence before you ship.',
      hotspots: [
        { phrase: 'Apache 2.0 or MIT', note: 'Well-known open-source licences. They allow commercial use with simple conditions, such as keeping the copyright notice.' },
        { phrase: 'the lab\'s own licence with conditions', note: 'Meta\'s Llama licence, for example, requires extra permission for companies with very large numbers of users, and has an acceptable-use policy.' },
        { phrase: 'research only', note: 'You may study it, but not use it in a product. Fine for experiments, not for Ask Rao.' },
        { phrase: 'Always read the licence before you ship', note: 'Licences change between model versions. Check the exact version you use, on the day you decide.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'A licence check',
      caption: 'Made-up licence notes for three practice models.',
      code: 'licences = {\n    "model-a": "closed API terms",\n    "model-c": "Apache 2.0",\n    "model-r": "research only",\n}\nok_for_shop = ["Apache 2.0", "MIT", "closed API terms"]\n\nfor name, licence in licences.items():\n    print(name, "->", "OK" if licence in ok_for_shop else "not for a product")\n',
      challenge: 'Add "model-l" with "custom licence with conditions". What should the code say for it?',
    },
  ],
  apply: {
    scenario: 'Reading the licence.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why check the licence of an open-weight model?',
        options: [
          { text: 'It sets the model\'s speed', why: 'It sets the rules of use, not performance.' },
          { text: 'It decides whether, and how, you may use it in a product' },
          { text: 'Open models have no licences', why: 'They do, and they differ a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'writeCode',
        prompt: 'Print "OK" if model-c\'s licence is in the allowed list, otherwise "not for a product"',
        starter: 'licences = {"model-c": "Apache 2.0", "model-r": "research only"}\nok_for_shop = ["Apache 2.0", "MIT"]\n',
        solution: 'licences = {"model-c": "Apache 2.0", "model-r": "research only"}\nok_for_shop = ["Apache 2.0", "MIT"]\nif licences["model-c"] in ok_for_shop:\n    print("OK")\nelse:\n    print("not for a product")\n',
        hint: 'if licences["model-c"] in ok_for_shop:',
        checks: [{ message: 'Print OK', outputEquals: 'OK' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fine for Ask Rao (after checking the details), or not for a product?',
        groups: ['Fine for Ask Rao', 'Not for a product'],
        items: [
          { text: 'Apache 2.0', group: 0 },
          { text: 'Research only', group: 1 },
          { text: 'MIT', group: 0 },
          { text: 'No licence stated at all', group: 1 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the licence type to what it usually allows.',
        pairs: [
          ['Permissive (Apache 2.0, MIT)', 'Commercial use, with simple conditions'],
          ['Custom with conditions', 'Use, within the lab\'s rules'],
          ['Research only', 'Study, not products'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'It\'s open, so we can do whatever we want, right?',
        prompt: "Arjun's best reply?",
        options: [
          { text: 'Yes, open means no rules.', why: 'Licences set rules even for open weights.' },
          { text: 'Open models are illegal to use.', why: 'Most are fine to use under their licence.' },
          { text: '"Open weights" means you can download them. What you may DO with them is in the licence. Ten minutes reading it can save the business.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'What does this print?',
        code: 'print("research only" in ["Apache 2.0", "MIT"])',
        language: 'python',
        options: [
          { text: 'False' },
          { text: 'True', why: '"research only" isn\'t in the list.' },
          { text: 'research only', why: 'in gives True or False.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Two things to check.',
        template: 'Check the licence of the exact [[1]] you use, on the [[2]] you decide.',
        blanks: [['version', 'model'], ['day']],
        distractors: ['colour', 'night'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Kavya\'s plan skips the licence?',
        lines: [
          'Test model-c on our questions.',
          'Compare its price with model-b.',
          'Ship it; open models have no rules.',
          'Keep model-b as a backup.',
        ],
        bug: 2,
        fix: 'Read model-c\'s licence before shipping.',
        explanation: 'Open weights still come with a licence.',
      },
      {
        kind: 'mcq',
        prompt: 'Meta\'s Llama licence is an example of...',
        options: [
          { text: 'A research-only licence', why: 'It allows commercial use within its conditions.' },
          { text: 'No licence', why: 'It has its own licence.' },
          { text: 'A custom licence with conditions, such as limits for very large companies' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Name one permissive open-source licence. (Apache 2.0 or ...)',
        answers: ['MIT', 'mit', 'Apache 2.0', 'apache'],
        placeholder: 'A licence',
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever clicked "I agree" without reading? What would you check first if your business depended on it?',
    starters: ['I usually...', 'I\'d check...'],
  },
  deepen: {
    title: 'Not legal advice',
    summary: 'For anything serious, a lawyer reads the licence. For a small shop, a careful read plus choosing well-known permissive licences avoids most problems.',
  },
  notes: 'Open-weight licences vary (checked 2026-10): many Mistral and Qwen releases use Apache 2.0; DeepSeek-R1 was released under MIT; Meta Llama uses the Llama Community License with an acceptable-use policy and an extra-permission clause for very large services. Licences change by version; this is not legal advice. Practice licence names in the code are made up.',
};

export default lesson;
