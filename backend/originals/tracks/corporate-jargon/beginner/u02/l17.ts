import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 17. Before/After: the follow-up email after a meeting. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The follow-up email',
  summary: 'Every meeting this week ended with "I\'ll send a follow-up". Most of those follow-ups never arrived. The ones that did were either three words or three pages. Here is the version that works.',
  minutes: 11,
  outcomes: [
    'Write a follow-up email in five short parts',
    'Decode "as discussed", "please find attached" and "let me know if I missed anything"',
    'Send it while everyone still remembers the meeting',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Zanele\'s follow-up after the courier meeting',
      before: {
        label: 'Version 1',
        text: 'Subject: Meeting. Hi all, thanks for the meeting! Lots of great points. Let\'s keep the momentum going! Z',
      },
      after: {
        label: 'Version 2',
        text: 'Subject: Courier costs: decisions and next steps. Hi all, thanks for today. As discussed, we\'ll track three courier costs: fuel, late fees and refunds. Next steps: I\'ll update the courier tab by Tuesday (Zanele). Emeka will share October invoices by Monday. The updated tab is attached. Let me know if I missed anything. Zanele',
      },
      notes: [
        'The subject line says what\'s inside: decisions and next steps.',
        '"As discussed" introduces what was agreed, in one sentence.',
        'Next steps have names and days, so nobody can be surprised later.',
        '"Let me know if I missed anything" invites corrections politely.',
        'Version 1 had warmth and no information. Version 2 has both.',
      ],
    },
    {
      kind: 'text',
      html: "<p>The five parts of a follow-up:</p><ol><li><strong>Subject:</strong> the meeting and \"decisions and next steps\".</li><li><strong>Thanks:</strong> one line.</li><li><strong>What we agreed:</strong> \"As discussed...\" in a sentence or two.</li><li><strong>Next steps:</strong> who, what, when.</li><li><strong>The check:</strong> \"Let me know if I missed anything.\"</li></ol><p><strong>When:</strong> the same day. A follow-up three days later is a history lesson.</p><p><strong>Watch out:</strong> \"Per our conversation\" and \"As per my last email\" can sound cold or annoyed. \"As discussed\" is friendlier.</p>",
    },
  ],
  apply: {
    scenario: 'Thursday. Follow-ups to send.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the follow-up in order.',
        lines: ['Subject: Courier test: decisions and next steps', 'Thanks for today, everyone.', 'As discussed, we\'ll test the new courier on one route.', 'Next steps: Emeka sets it up by Monday.', 'Let me know if I missed anything.'],
      },
      {
        kind: 'mcq',
        prompt: 'What does "As discussed" do at the start of a sentence?',
        options: [
          { text: 'Tells off people who weren\'t listening', why: 'That\'s "as per my last email". "As discussed" is friendly.' },
          { text: 'Introduces something that was agreed in the meeting' },
          { text: 'Starts a new discussion', why: 'It refers back to the one that happened.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best subject line for the follow-up?',
        options: [
          { text: 'Meeting', why: 'Which one? There were eleven this week.' },
          { text: 'Courier test: decisions and next steps' },
          { text: 'URGENT!!! PLEASE READ!!!', why: 'It isn\'t urgent, and it will make people anxious.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s follow-up. Which line needs fixing?',
        lines: [
          'Thanks for today, everyone.',
          'As discussed, we\'ll test the new courier first.',
          'Next steps: various people will do various things.',
          'Let me know if I missed anything.',
        ],
        bug: 2,
        fix: 'Next steps: Emeka sets up the test by Monday; I\'ll track delivery times.',
        explanation: 'Next steps need names and dates.',
      },
      {
        kind: 'typeAnswer',
        prompt: '"Let me know if I ___ anything." (one word)',
        answers: ['missed'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Friendly, or can sound cold?',
        groups: ['Friendly', 'Can sound cold'],
        items: [
          { text: 'As discussed...', group: 0 },
          { text: 'As per my last email...', group: 1 },
          { text: 'Let me know if I missed anything.', group: 0 },
          { text: 'Per our conversation...', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'I\'ll send the follow-up on Monday, I\'m tired.',
        prompt: 'It\'s Thursday. What does Remi say?',
        options: [
          { text: 'Fair, Monday is fine.', why: 'By Monday, people will remember the meeting differently.' },
          { text: 'Just send version 1, it\'s quicker.', why: 'Quick, but empty.' },
          { text: 'Could you do a short one now? Five lines. By Monday everyone will remember it differently.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: '"Please find attached the courier tab." What should Zanele check before sending?',
        options: [
          { text: 'That the file is actually attached' },
          { text: 'That it\'s in capitals', why: 'Please no.' },
          { text: 'That she\'s copied in the whole company', why: 'Only the people who were there, plus anyone with an action.' },
        ],
        answer: 0,
        explanation: 'The most common follow-up mistake in the world: "Please find attached" with nothing attached.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Apologies', 'Couldn\'t come and said so'],
          ['Loop in', 'Add someone to the conversation'],
          ['FYI', 'For your information'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the start of a good follow-up sentence.',
        tiles: ['As', 'discussed,', 'we\'ll', 'test', 'the', 'new', 'courier', 'first.'],
        distractors: ['per', 'URGENT'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last meeting, call or group plan that ended with "I\'ll send something round". Did it arrive? Write the five-part follow-up for it now.',
    starters: ['Subject: ...', 'As discussed, ...', 'Next steps: ...'],
  },
  deepen: {
    title: 'The 10-minute rule',
    summary: 'Try sending your follow-up within 10 minutes of the meeting ending, for one week. It\'s the easiest way to look organised, and it stops "I thought we agreed..." arguments before they start.',
  },
  notes: '"As discussed", "please find attached" (standard business email phrases), "as per my last email" (widely noted as passive-aggressive in workplace-email commentary; lesson says "can sound").',
};

export default lesson;
