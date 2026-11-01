import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 19 — templates for the messages you send every week, filled in by AI from your notes. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Templates for repeat messages',
  summary: 'You send the same kinds of message every week. Write the shape once, and let the AI fill it in.',
  minutes: 13,
  outcomes: [
    'Use five templates for messages you send often',
    'Have the AI fill a template from your notes',
    'Personalise every template so it never feels copy-pasted',
  ],
  learn: [
    {
      kind: 'text',
      html:
        '<h3>Why templates?</h3><p>Most work messages are repeats: a weekly update, a meeting follow-up, a request, an introduction, a thank-you. A template fixes the <strong>shape</strong> once, so you only think about the <strong>content</strong>.</p><p>Write blanks in [brackets]. Then paste the template and your notes, and ask: <em>"Fill this template from my notes. Only use my notes; leave [?] where something is missing."</em></p>',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'WEEKLY UPDATE\nSubject: [Project] update, week of [date]\n• Done: [1-3 points]\n• Next: [1-3 points]\n• Blocked on: [thing + who can unblock it]\n• Need from you: [ask + date, or "nothing this week"]',
      caption: '1. The weekly update',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'MEETING FOLLOW-UP\nSubject: Follow-up: [meeting], [date]\nThanks for today. What we agreed:\n1. [decision]\nActions:\n- [who] will [what] by [when]\nOpen question: [question + who answers it]',
      caption: '2. The meeting follow-up',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'REQUEST\nSubject: [Ask] by [date]\nHi [name], could you [ask] by [date]?\nWhy: [one-line reason].\n[What you need from them, as yes/no if possible.]\nThanks!',
      caption: '3. The request (ask first)',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'INTRODUCTION\nSubject: Intro: [person A] <> [person B]\n[A], meet [B]: [one line on who B is].\n[B], meet [A]: [one line on who A is].\nWhy you should talk: [the specific reason].\nI\'ll let you two take it from here!',
      caption: '4. Introducing two people',
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'THANK-YOU\nHi [name], thank you for [specific thing].\nIt helped because [specific effect].\n[Optional: what happens next.]',
      caption: '5. The thank-you (specific, or it sounds automatic)',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'A template is a shape, not a script. Always add one specific detail, or it will feel copy-pasted.',
    },
    {
      kind: 'check',
      question: 'What should the AI do when your notes are missing something a template needs?',
      options: ['Invent something likely', 'Leave [?] so you can fill it', 'Delete that line silently'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is setting up her message templates.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the situation to the template.',
        pairs: [
          ['Friday status for your manager', 'Weekly update'],
          ['After a planning meeting', 'Meeting follow-up'],
          ['You need files from Grace', 'Request'],
          ['Connecting Lucía with Grace', 'Introduction'],
          ['Grace helped on launch day', 'Thank-you'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a template fix, so you only think about content?',
        options: [
          { text: 'The facts', why: 'The facts change every time; they come from you.' },
          { text: 'The recipient', why: 'Recipients change too.' },
          { text: 'The shape of the message' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the fill-in instruction.',
        tiles: ['Fill', 'this', 'template', 'from', 'my', 'notes'],
        distractors: ['imagination', 'guess'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific thank-you, or generic?',
        groups: ['Specific', 'Generic'],
        items: [
          { text: 'Thanks for staying late to fix the sign-up bug; we hit Friday because of it.', group: 0 },
          { text: 'Thanks for everything!', group: 1 },
          { text: 'Thank you for your hard work.', group: 1 },
          { text: 'Thanks for the brand guide, it saved Grace a whole day.', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line the AI should have marked [?]. (Ada\'s notes had no date for the logo.)',
        lines: ['Done: sign-up screens finished.', 'Next: testing on Friday.', 'Need from you: the final logo by 3 March.'],
        bug: 2,
        fix: 'Need from you: the final logo by [?].',
        explanation: 'The date was invented. Missing facts should become [?], not guesses.',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Could you introduce me to Grace? I hear she's the one doing our onboarding screens.",
        prompt: 'Which introduction should Ada send?',
        options: [
          { text: 'Lucía, Grace. Grace, Lucía. Bye!', why: 'Neither knows who the other is or why to talk.' },
          { text: "Lucía, meet Grace: she's designing your onboarding screens. Grace, meet Lucía: she leads marketing on the client side. You should talk about the welcome emails. Over to you!" },
          { text: 'Grace, please email Lucía at some point.', why: 'Not an introduction; no context for either.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the request template.',
        template: 'A request template starts with the [[1]] in the subject, puts the ask in the first [[2]], and gives a one-line [[3]].',
        blanks: [['ask'], ['line'], ['reason']],
        distractors: ['greeting', 'page', 'joke'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'A template is a shape, not a ... (one word)',
        answers: ['script'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request turns meeting notes into a good follow-up?',
        options: [
          { text: 'Write a follow-up.', why: 'No template, no notes: it will invent the meeting.' },
          { text: 'Fill this follow-up template from my notes: [template] [notes]. Only use my notes; put [?] where something is missing.' },
          { text: 'Write a friendly email about the meeting.', why: 'No decisions or actions from the real meeting.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the meeting follow-up template.',
        lines: ['Thanks for today', 'What we agreed', 'Actions: who, what, by when', 'Open questions'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth making a template, or not?',
        groups: ['Make a template', 'Not worth it'],
        items: [
          { text: 'Weekly status update', group: 0 },
          { text: 'A one-time apology for a unique mistake', group: 1 },
          { text: 'Meeting follow-ups', group: 0 },
          { text: 'Introducing two people', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your Friday updates are so consistent, I know exactly where to look for what I need.',
        prompt: "What's behind it?",
        options: [
          { text: 'A weekly update template: Done, Next, Blocked on, Need from you. Same shape every week.' },
          { text: 'Luck.', why: 'It is a template, not luck.' },
          { text: 'The AI writes whatever it likes.', why: 'The template fixes the shape; Ada supplies the facts.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In a weekly update, "Blocked on" should say the thing and who can ... it (one word)',
        answers: ['unblock', 'fix', 'solve'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the template to its most important line.',
        pairs: [
          ['Weekly update', '"Need from you"'],
          ['Meeting follow-up', '"Actions: who, what, by when"'],
          ['Introduction', '"Why you should talk"'],
          ['Thank-you', '"It helped because..."'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How do you stop a template feeling copy-pasted?',
        options: [
          { text: 'Change the font', why: 'Content, not looks.' },
          { text: 'Add at least one specific detail every time' },
          { text: 'Use it less often', why: 'Personalise it instead.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Which message do you send most often? Write its template here, with [brackets] for the blanks.',
    starters: ['Template name:', 'Shape:'],
  },
  deepen: { title: 'Do it now', summary: 'Save your two most-used templates next to your style guide.' },
  notes: 'Templates are Teyro-authored. "3 March" in the exercise is a fictional invented date.',
};

export default lesson;
