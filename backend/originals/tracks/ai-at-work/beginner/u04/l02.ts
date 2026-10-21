import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 2 — made-up facts and fake sources (hallucinations), with a real court case. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Made-up facts and fake sources',
  summary: 'AI tools can invent quotes, studies, links and even court cases. Learn what it looks like, and why a citation is not proof until you open it.',
  minutes: 13,
  outcomes: [
    'Recognise the common kinds of made-up content',
    'Know why a citation from AI is not proof',
    'Check a source in under two minutes',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'When AI invents things',
      html:
        '<p>People call it <strong>hallucination</strong>: the AI writes something that looks real and isn\'t. Common kinds:</p>' +
        '<ul>' +
        '<li><strong>Fake studies and reports</strong> with believable titles and authors.</li>' +
        '<li><strong>Fake quotes</strong> from real people.</li>' +
        '<li><strong>Links that go nowhere</strong>, or to a page that says something else.</li>' +
        '<li><strong>Real sources, wrong details:</strong> the report exists, but the number isn\'t in it.</li>' +
        '</ul>' +
        '<p>This happens to professionals too. In 2023, in the US case <em>Mata v. Avianca</em>, lawyers filed a brief citing court cases that ChatGPT had invented. The judge found the cases didn\'t exist and fined the lawyers $5,000.</p>' +
        '<h3>The two-minute source check</h3>' +
        '<p>Open the link or search the exact title. Check it exists, check who published it, and find the exact sentence or number. If you can\'t, don\'t use it.</p>',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A citation from AI is a lead, not proof. It only counts once you have opened it and found the claim inside.',
    },
    {
      kind: 'check',
      question: 'The AI names a real report, but the number isn\'t in it. Is the number safe to use?',
      options: ['Yes, the report is real', 'No, the claim isn\'t in the source'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is checking the sources in her research notes.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the kind of made-up content to an example.',
        pairs: [
          ['Fake report', 'A 2022 study by an institute that doesn\'t exist'],
          ['Fake quote', 'Words a CEO never said'],
          ['Dead link', 'A URL that returns "page not found"'],
          ['Wrong detail', 'Real report, number not in it'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What happened in Mata v. Avianca (2023)?',
        options: [
          { text: 'Lawyers cited court cases ChatGPT had invented, and were fined' },
          { text: 'An airline used AI to set prices', why: 'It was about fake legal citations.' },
          { text: 'A judge used AI to write a ruling', why: 'The lawyers used it.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much were the lawyers fined, in US dollars?',
        answers: ['5000', '5,000', '$5,000', '$5000'],
        placeholder: 'An amount',
      },
      {
        kind: 'orderLines',
        prompt: 'Order the two-minute source check.',
        lines: ['Open the link or search the exact title', 'Check it exists', 'Check who published it', 'Find the exact claim inside'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is the source checked yet?',
        groups: ['Checked', 'Not checked yet'],
        items: [
          { text: 'Ada opened the PDF and found the number on page 9', group: 0 },
          { text: 'The AI gave a title and a year', group: 1 },
          { text: 'The link works but Ada hasn\'t read it', group: 1 },
          { text: 'Ada found the quote in the original interview', group: 0 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'A citation from AI is a [[1]], not [[2]].',
        blanks: [['lead'], ['proof']],
        distractors: ['fact', 'guess'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'The AI gave me five sources for the Ghana stats. Can I just paste them into the appendix?',
        prompt: 'What should Ada say?',
        options: [
          { text: 'Open each one first. Keep only the ones that exist and actually contain the claim.' },
          { text: 'Yes, five sources looks thorough.', why: 'Some may not exist.' },
          { text: 'Delete them all, AI sources are always fake.', why: 'Some may be real. Check them.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Ada\'s notes is not a checked source yet?',
        lines: [
          'Bank of Ghana annual report: opened, figure on p.41',
          'GSMA report: opened, quote found in section 2',
          '"Ghana Fintech Review 2023": named by AI, not found online',
          'Lucía\'s own sales data: from her team',
        ],
        bug: 2,
        fix: 'Remove it unless she can find and open it.',
        explanation: 'It only exists because the AI named it.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request makes fake sources less likely?',
        options: [
          { text: 'Give me sources.', why: 'Invites it to fill the gap with anything.' },
          { text: 'Only cite sources you are confident exist. If you are unsure, say "unsure". I will check each one.' },
          { text: 'Give me ten sources, fast.', why: 'Pressure for quantity makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Warning sign or good sign?',
        groups: ['Warning sign', 'Good sign'],
        items: [
          { text: 'The link returns "page not found"', group: 0 },
          { text: 'You found the exact sentence in the source', group: 1 },
          { text: 'No author or publisher anywhere', group: 0 },
          { text: 'A known organisation published it', group: 1 },
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s rule for her notes.',
        tiles: ['No', 'source', 'opened,', 'no', 'number', 'used'],
        distractors: ['maybe'],
      },
      {
        kind: 'mcq',
        prompt: 'The report is real, but the number isn\'t in it. What now?',
        options: [
          { text: 'Don\'t use the number' },
          { text: 'Use it; the report is real', why: 'The claim isn\'t supported.' },
          { text: 'Change the page number', why: 'That makes it misleading.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever trusted a source without opening it? What would the two-minute check have cost you?',
    starters: ['The source was...', 'Checking would have taken...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask an AI tool for three sources on a topic you know well. Open each one and see how many exist and say what it claimed.' },
  notes: 'Mata v. Avianca, Inc. (S.D.N.Y. 2023): lawyers sanctioned $5,000 for citing non-existent cases generated by ChatGPT. "Ghana Fintech Review 2023" is fictional.',
};

export default lesson;
