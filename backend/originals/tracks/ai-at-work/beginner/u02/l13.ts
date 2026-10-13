import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 13 — AI translation done well: natural not literal, formality, idioms, and checking. */
const lesson: OriginalLesson = {
  key: 'l13',
  title: 'Writing in another language',
  summary: 'AI makes writing in another language far easier. A few habits keep it accurate and polite.',
  minutes: 13,
  outcomes: [
    'Ask for natural translations with the right formality',
    'Write source text that translates well',
    'Check important translations before sending',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "Lucía's team is in Mexico City. Ada wants to send a short thank-you to them in Spanish. Ada doesn't speak Spanish.", replies: ['Can AI do that?', 'Is that risky?'] },
        { tey: "AI tools are genuinely good at this. But a few things go wrong if you just say 'translate'." },
        { tey: "First: literal translations sound odd. Ask for a NATURAL translation, the way a native speaker would say it.", replies: ['What else?'] },
        { tey: 'Second: formality. Spanish, French, German and many other languages have formal and informal "you". Tell it which, or ask it to choose for a new business contact.' },
        { tey: 'Third: idioms. "Hit the ground running" or "ballpark figure" can come out as nonsense. Simple source text translates best.', replies: ['And for important stuff?'] },
        { tey: "For anything important, like contracts, prices or apologies, have a fluent speaker check it. And never translate legal text with AI alone." },
        { tey: "Bonus trick: ask the AI to translate it back into English. If the meaning drifted, you'll see it." },
      ],
    },
    {
      kind: 'reading',
      title: 'Write it so it translates well',
      html:
        '<ul>' +
        '<li><strong>Short sentences, one idea each.</strong> Plain language translates cleanly.</li>' +
        '<li><strong>No idioms or slang.</strong> "Let\'s touch base" → "Let\'s talk".</li>' +
        '<li><strong>Write dates and numbers clearly.</strong> 05/06 means 5 June in some countries and May 6 in others. Write "6 May".</li>' +
        '<li><strong>Keep names and product names as they are.</strong> Say so: "Do not translate the product name".</li>' +
        '<li><strong>Name the reader.</strong> "For a new business contact in Mexico" tells the AI which Spanish and how formal.</li>' +
        '</ul>' +
        '<p>A good request: <em>"Translate this into natural Mexican Spanish for a new business contact, formal \'usted\'. Keep product names in English. Then translate it back into English so I can check the meaning."</em></p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Contracts, prices, legal or medical text: always have a qualified human check the translation.',
    },
    {
      kind: 'check',
      question: 'What does a back-translation help you check?',
      options: ['That the meaning did not drift', 'That the font is right', 'That the email was sent'],
      answer: 0,
    },
  ],
  apply: {
    scenario: "Ada is writing to Lucía's team in Spanish.",
    items: [
      {
        kind: 'mcq',
        prompt: 'Why ask for a "natural" translation instead of just "translate"?',
        options: [
          { text: 'Literal translations can sound odd; natural ones sound like a native speaker' },
          { text: 'Natural means shorter', why: 'It means sounding right, not shorter.' },
          { text: 'There is no difference', why: 'Literal word-by-word can sound strange.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Translates well, or risky?',
        groups: ['Translates well', 'Risky'],
        items: [
          { text: "Let's talk on Thursday.", group: 0 },
          { text: "Let's touch base and circle back.", group: 1 },
          { text: 'The launch is on 6 May.', group: 0 },
          { text: 'The launch is 05/06.', group: 1 },
          { text: 'Give me a ballpark figure.', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the check-it request.',
        tiles: ['Then', 'translate', 'it', 'back', 'into', 'English'],
        distractors: ['forget', 'Klingon'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the idiom to a plain version that translates well.',
        pairs: [
          ['"Touch base"', '"Talk"'],
          ['"Ballpark figure"', '"Rough estimate"'],
          ['"Hit the ground running"', '"Start quickly"'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your Spanish message to my team was lovely! One thing: you used 'tú' with our director. In a first message we'd use 'usted'.",
        prompt: 'What should Ada add to her request next time?',
        options: [
          { text: '"For a new business contact: formal \'usted\'."' },
          { text: '"Make it more Spanish."', why: 'Vague. Name the formality.' },
          { text: '"Translate better."', why: 'Better how? Formality was the issue.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s translation request.',
        template: 'Translate into [[1]] Mexican Spanish for a new business contact, [[2]] "usted". Keep product [[3]] in English.',
        blanks: [['natural'], ['formal'], ['names']],
        distractors: ['robotic', 'casual', 'prices'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line that may confuse an international reader.',
        lines: ['Thanks for a great launch!', 'Our next review is on 03/04.', 'Talk soon.'],
        bug: 1,
        fix: 'Our next review is on 3 April.',
        explanation: '03/04 is 3 April in many countries and March 4 in others.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Translating it back to English to check meaning is called a back-... (one word)',
        answers: ['translation', 'translate'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request is best for a thank-you to Lucía\'s team?',
        options: [
          { text: 'Translate this to Spanish.', why: 'Which Spanish? How formal?' },
          {
            text: 'Translate this thank-you into natural Mexican Spanish for a team we know well, friendly "tú". Keep "Teyro" as is. Then translate it back into English.',
          },
          { text: 'Write it in perfect Spanish.', why: '"Perfect" gives no formality or reader.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'AI translation alone is fine, or get a human check?',
        groups: ['AI is fine', 'Get a human check'],
        items: [
          { text: 'A friendly thank-you note', group: 0 },
          { text: 'A contract clause', group: 1 },
          { text: 'A price quote to a client', group: 1 },
          { text: 'Getting the gist of an email you received', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "We'd like to send the partnership contract in Spanish too. Can your AI translate it?",
        prompt: 'What should Ada say?',
        options: [
          { text: "AI can do a first draft, but a contract needs a qualified translator or lawyer to check it." },
          { text: 'Sure, AI is perfect for contracts.', why: 'Legal text needs a qualified human check.' },
          { text: 'Contracts cannot be translated.', why: 'They can, by qualified people.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s translation routine.',
        lines: ['Write plain source text', 'Ask for a natural translation, with reader and formality', 'Ask for a back-translation', 'For important text, get a fluent speaker to check'],
      },
      {
        kind: 'typeAnswer',
        prompt: '05/06 could mean 5 June or 6 May. So write the month as a ... (one word)',
        answers: ['word', 'name', 'words'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the risk to the fix.',
        pairs: [
          ['Wrong formality', 'Say formal or friendly'],
          ['Idioms turn to nonsense', 'Write plainly first'],
          ['Meaning drifted', 'Back-translate to check'],
          ['Legal text', 'Qualified human check'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Lucía writes to Ada in Spanish. What is a good use of AI?',
        options: [
          { text: 'Translate it to understand it, then reply with the translation habits from this lesson' },
          { text: 'Ignore it', why: 'AI makes it easy to understand.' },
          { text: 'Reply in Spanish without checking anything', why: 'Check meaning and formality first.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do you ever write to people in another language, or to non-native English speakers? What will you change?',
    starters: ['I write to...', 'I will change...'],
  },
  deepen: { title: 'Try it today', summary: 'Translate one short message into another language and back. Notice what changed.' },
  notes: 'Formality distinctions (tú/usted, tu/vous, du/Sie) are standard grammar facts. Date-format ambiguity is well known. No statistics.',
};

export default lesson;
