import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 1 — opens the chapter: the Njangi Pay offer, lower than he hoped. Story choice. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'The offer call',
  summary: 'Monday\'s final conversation is with Ngozi Bate, who leads the offline team. On Tuesday, Brenda calls: "We\'d love to offer you the role. The salary is 300,000 francs a month." Clinton had hoped for 350,000. His mouth opens before he\'s decided what to say.',
  minutes: 11,
  outcomes: ['Respond to an offer call well', 'Avoid deciding on the phone', 'Show enthusiasm without accepting yet'],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 3pm',
      beats: [
        { speaker: 'narrator', text: 'One week to graduation. Monday\'s conversation with Ngozi Bate, the offline team\'s engineering manager, went well: direct questions, real answers, a nod at the end.' },
        { speaker: 'brenda', text: 'Clinton, we\'d love to offer you the Graduate Developer role on the offline team. The salary is 300,000 francs a month. How does that sound?' },
        { speaker: 'clinton', text: '(to himself) YES. But... I hoped for 350,000. And Kmer\'s offer is close. What do I say right now?' },
        { speaker: 'tey', text: 'An offer call is the start of a conversation, not the end. You don\'t have to decide on the phone. Thank them, show you\'re excited, and ask for it in writing.' },
      ],
      choice: {
        prompt: 'What should Clinton say on the call?',
        options: [
          {
            text: '"Thank you, I\'m really excited. Could you send it in writing? I\'d like to look at everything and come back to you by Thursday."',
            outcome: 'Brenda: "Of course, it\'ll be in your inbox in an hour." He has the full offer, time, and a calm head.',
            best: true,
          },
          {
            text: '"Yes! I accept!"',
            outcome: 'Done in five seconds. He never asks about the salary, and spends a year wondering what would have happened if he had.',
          },
          {
            text: '"300,000? That\'s too low."',
            outcome: 'The call goes cold. It\'s the right question, asked the wrong way, before he\'s even seen the full offer.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'On the call: thank them, show enthusiasm, ask for it in writing, agree when you\'ll reply. Decide later.',
    },
    {
      kind: 'text',
      html: '<p><strong>In this chapter:</strong> what\'s in an offer, how to research what\'s fair, whether and how to negotiate, what to do when they say no to your ask, choosing between offers, and declining gracefully. Your kit piece: an offer checklist.</p>',
    },
  ],
  apply: {
    scenario: 'Brenda makes the offer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an offer call?',
        options: [
          { text: 'The start of a conversation, not the end' },
          { text: 'A test you must answer instantly', why: 'You can take time.' },
          { text: 'A contract you\'ve already signed', why: 'Nothing is signed on a call.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s reply in order.',
        lines: ['Thank them', 'Show you\'re excited', 'Ask for it in writing', 'Agree when you\'ll reply'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good on the call, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'I\'m really excited', group: 0 },
          { text: 'That\'s too low (before seeing anything)', group: 1 },
          { text: 'Could you send it in writing?', group: 0 },
          { text: 'I accept everything right now', group: 1 },
          { text: 'I\'ll come back to you by Thursday', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply to Brenda.',
        from: 'brenda',
        message: 'The salary is 300,000 francs a month. How does that sound?',
        options: [
          { text: '"Thank you, I\'m really excited. Could you send everything in writing, and I\'ll come back to you by Thursday?"' },
          { text: '"Too low."', why: 'Right question later, better words.' },
          { text: '"Perfect, yes!" (he hoped for more)', why: 'Take time to look first.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that closes the conversation too early.',
        lines: ['Thank you so much.', 'I accept, no need to send anything.', 'Could I reply by Thursday?'],
        bug: 1,
        explanation: 'Always see the full offer in writing before accepting.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Thank, ask in writing, set a date', 'Full offer and time to think'],
          ['Accept instantly', 'A year of wondering'],
          ['"Too low" straight away', 'A cold call'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Who is Ngozi Bate?',
        options: [
          { text: 'The engineering manager of the offline team' },
          { text: 'The recruiter', why: 'That\'s Brenda.' },
          { text: 'The Kmer founder', why: 'That\'s Mr Tamba.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'Thank them, show [[1]], ask for it in [[2]].',
        blanks: [['enthusiasm', 'excitement'], ['writing']],
        distractors: ['anger', 'secret', 'cash'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What monthly salary in francs did Njangi Pay offer? (a number)',
        answers: ['300000', '300,000', '300 000'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Decide on the call, or later?',
        groups: ['On the call', 'Later'],
        items: [
          { text: 'Saying thank you', group: 0 },
          { text: 'Whether to accept', group: 1 },
          { text: 'When you\'ll reply', group: 0 },
          { text: 'Whether to ask for more', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'If an employer called with an offer tomorrow, what would your first two sentences be?',
    starters: ['I\'d say...', 'Then...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write your offer-call script in three lines: thanks and enthusiasm, ask for it in writing, agree a date to reply.',
  },
  notes: 'Opens L2 Ch5 (founder topic: How to Negotiate a Job Offer). Salaries are story numbers in CFA francs, not benchmarks for Douala. Ngozi Bate (CastId ngozi) becomes Clinton\'s manager in Level 3.',
};

export default lesson;
