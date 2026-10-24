import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 11 — from messy notes to a skimmable document: structure, message headings, summary first. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Turning notes into a document',
  summary: 'Most work documents are read in under a minute. Structure them so that minute is enough.',
  minutes: 14,
  outcomes: [
    'Use a simple structure for any short work document',
    'Write headings that say something',
    'Get the AI to structure your notes without inventing content',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Same content, different structure',
      before: {
        label: 'Notes pasted in',
        text: 'met w/ devs. testing fri. bug in email field fixed. lucia palette pending. grace onboarding mon. risk: if palette late, build slips. need decision on dark mode later.',
      },
      after: {
        label: 'Structured document',
        text:
          'Sign-up launch: status and next steps\n\nSummary: On track for launch on the 14th, if Lucía approves the palette by Wednesday.\n\nWhat\'s done\n• Sign-up screens finished; email-field bug fixed\n\nWhat\'s next\n• Testing on Friday\n• Grace starts Monday\n\nRisk: Late palette approval delays the build\n\nDecision needed later: dark mode (not this week)',
      },
      notes: [
        'A title that says what it is.',
        'A one-line summary first: someone who reads only that knows the situation.',
        'Short sections with clear labels.',
        'The risk and the decision get their own lines, so nobody misses them.',
      ],
    },
    {
      kind: 'reading',
      title: 'Structure that works for almost any short document',
      html:
        '<ol>' +
        '<li><strong>Title:</strong> what this is. "Sign-up launch: status and next steps".</li>' +
        '<li><strong>Summary (1 to 2 lines):</strong> the situation and anything the reader must do.</li>' +
        '<li><strong>Sections</strong> in the order the reader cares about: usually <em>what happened → what is next → risks → decisions needed</em>.</li>' +
        '<li><strong>Bullets inside sections</strong>, one idea each.</li>' +
        '</ol>' +
        '<h3>Headings that say something</h3>' +
        '<p>A heading like "Testing" tells the reader the topic. A heading like <strong>"Testing moved to Friday"</strong> tells them the news. People skim headings; make the headings carry the message.</p>' +
        '<h3>Asking the AI</h3>' +
        '<p><em>"Turn these notes into a one-page document for my manager: title, 1-line summary, then What\'s done, What\'s next, Risks, Decisions needed. Use only my notes; mark anything unclear with [?]."</em> The [?] trick makes gaps visible instead of filled.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask the AI to mark unclear points with [?] instead of guessing. Then fill those gaps yourself.',
    },
    {
      kind: 'check',
      question: 'Which heading carries the message?',
      options: ['Testing', 'Testing moved to Friday', 'Update section 2'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is turning notes into documents people can skim.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the structure of a short work document.',
        lines: ['Title', 'One-line summary', "What's done", "What's next", 'Risks', 'Decisions needed'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Heading that says something, or just a topic?',
        groups: ['Says something', 'Just a topic'],
        items: [
          { text: 'Testing moved to Friday', group: 0 },
          { text: 'Testing', group: 1 },
          { text: 'Palette approval needed by Wednesday', group: 0 },
          { text: 'Colours', group: 1 },
          { text: 'Grace starts Monday', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why put a one-line summary at the top?',
        options: [
          { text: 'Documents require it legally', why: 'No law. It helps busy readers.' },
          { text: 'To make it longer', why: 'It makes it faster to read.' },
          { text: 'Someone who reads only that line still knows the situation' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that stops the AI filling gaps.',
        tiles: ['Mark', 'anything', 'unclear', 'with', '[?]'],
        distractors: ['invent', 'guess'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Can you send a one-pager on the launch for our leadership meeting? They'll give it about 30 seconds.",
        prompt: 'Which request should Ada give the AI (with her notes)?',
        options: [
          { text: 'Write a detailed launch report.', why: '30 seconds means summary first and short sections.' },
          { text: "One page for leadership: title, 1-line summary, then Done, Next, Risks, Decisions needed. Bullets. Use only my notes; mark gaps [?]." },
          { text: 'Make my notes look nice.', why: 'No structure or reader given.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each note to the section it belongs in.',
        pairs: [
          ['"bug fixed"', "What's done"],
          ['"testing fri"', "What's next"],
          ['"if palette late, build slips"', 'Risks'],
          ['"dark mode later"', 'Decisions needed'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line the AI invented. (Ada\'s notes did NOT mention a budget.)',
        lines: ['Summary: on track for the 14th.', "What's done: sign-up screens finished.", 'Budget: 15% under plan.', "What's next: testing Friday."],
        bug: 2,
        fix: 'Delete it, or write "Budget: [?]" if it belongs.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'People skim the ... first, so make them carry the message (one word)',
        answers: ['headings', 'headlines', 'titles'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s document request.',
        template: 'Title, a [[1]]-line summary, then What\'s done, What\'s next, [[2]], Decisions needed. Use only my [[3]].',
        blanks: [['1', 'one'], ['Risks'], ['notes']],
        distractors: ['50', 'Jokes', 'imagination'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request turns meeting notes into the best document?',
        options: [
          { text: 'Organise these notes.', why: 'Organise into what? For whom?' },
          { text: 'Turn these notes into a one-page summary for my team: title, 1-line summary, Decisions, Actions (who, by when), Open questions. Only my notes; mark gaps [?].' },
          { text: 'Expand these notes into a long report.', why: 'Long is not the goal; structure is.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Summary line or detail?',
        groups: ['Summary line', 'Detail for a section'],
        items: [
          { text: 'On track for the 14th, if the palette is approved by Wednesday.', group: 0 },
          { text: 'The email-field bug was fixed on Tuesday.', group: 1 },
          { text: 'Grace needs a laptop.', group: 1 },
          { text: 'Launch is at risk unless legal signs off this week.', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Your one-pager was great: I read the summary and the risks and knew exactly what to do.",
        prompt: 'What made it work?',
        options: [
          { text: 'It was very long and detailed.', why: 'It worked because it was skimmable.' },
          { text: 'It had lots of colours.', why: 'Structure, not decoration.' },
          { text: 'Summary first, then short sections, with the risk on its own line.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Instead of guessing, the AI should ... unclear points (one word)',
        answers: ['mark', 'flag', 'highlight'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the topic heading to a message heading.',
        pairs: [
          ['"Budget"', '"Budget is on plan"'],
          ['"Timeline"', '"Launch stays on the 14th"'],
          ['"Team"', '"Grace joins Monday"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'In what order should sections usually go?',
        options: [
          { text: 'The order the reader cares about: done, next, risks, decisions' },
          { text: 'Alphabetical', why: 'The reader does not care about the alphabet.' },
          { text: 'The order things happened to you', why: 'Diary order buries what matters.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Which document do you write regularly? Sketch its title, summary line and section headings using this lesson.',
    starters: ['Title:', 'Summary:', 'Sections:'],
  },
  deepen: { title: 'Try it today', summary: 'Turn your last meeting notes into a one-pager using the [?] trick.' },
  notes: 'Document structure and "message headings" follow general business-writing practice. "15%" is a fictional invented figure in the exercise.',
};

export default lesson;
