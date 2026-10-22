import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1. Story with a choice: "Hi Mum". */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"Hi Mum"',
  summary: 'A text from an unknown number: "Hi Mum, I\'ve dropped my phone, this is my new number." It asks for £480, urgently. Grace\'s thumb is already on her banking app. What should she do?',
  minutes: 12,
  outcomes: [
    'Recognise an impersonation text',
    'Verify through a channel you already trust',
    'Feel how pressure makes clever people act fast',
  ],
  learn: [
    {
      kind: 'story',
      title: '11:42 a.m., Kinwell',
      beats: [
        { speaker: 'narrator', text: 'Grace is between two research sessions when her phone buzzes. Unknown number.' },
        { speaker: 'narrator', text: '"Hi Mum, I\'ve dropped my phone down the toilet lol, this is my new number. Can you do me a massive favour? I need to pay my phone bill and some stuff for college today, £480, I\'ll pay you back Friday. Can\'t call, mic\'s broken x"' },
        { speaker: 'grace', text: '(under her breath) Oh, Jayden. Of course he has.' },
        { speaker: 'narrator', text: 'A second message, before she\'s replied: "Mum? It has to be before 12 or they cut me off. Here are the details..."' },
        { speaker: 'tey', text: 'Grace loves her son, she\'s busy, and there\'s a deadline. That\'s exactly the moment scammers aim for. What should she do?' },
      ],
      choice: {
        prompt: 'What should Grace do?',
        options: [
          { text: 'Pay it quickly; it\'s only £480 and she can sort it out with Jayden later.', outcome: 'If it\'s a scammer, the £480 is gone, often within minutes. And paying once tells them she\'s a good target for "one more thing".' },
          { text: 'Reply to the new number and ask a question only Jayden would know.', outcome: 'Better than paying, but scammers can be good at dodging questions ("Mum, stop, I\'m panicking!"), and some details are on social media. Don\'t verify through the channel that contacted you.' },
          { text: 'Stop, and call Jayden on his usual number, the one already saved in her phone.', outcome: 'Yes. Jayden answers from the college canteen with his phone in his hand: "Mum, I haven\'t dropped anything. That\'s a scam." She\'s lost nothing but a minute.', best: true },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'When a message claims to be someone you know but comes from a new number, contact them on the number or channel you already have. Never verify through the message that asked.',
    },
  ],
  apply: {
    scenario: 'The "Hi Mum" text.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Warning sign in the text, or normal?',
        groups: ['Warning sign', 'Normal'],
        items: [
          { text: 'A new, unknown number', group: 0 },
          { text: '"Can\'t call, mic\'s broken"', group: 0 },
          { text: 'Using his usual saved number', group: 1 },
          { text: '"Before 12 or they cut me off"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does the text say "can\'t call, mic\'s broken"?',
        options: [
          { text: 'Phones break often', why: 'It\'s a trick to stop a call.' },
          { text: 'So Grace can\'t hear that it isn\'t Jayden\'s voice' },
          { text: 'To save money', why: 'It\'s to avoid voice contact.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Grace does.',
        lines: ['Stop before paying', 'Find Jayden\'s saved number', 'Call him', 'Confirm it\'s a scam', 'Block and report the number'],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Mum, why would you think I\'d text you from a random number?',
        prompt: 'Grace\'s honest reply?',
        options: [
          { text: 'I knew straight away.', why: 'She nearly paid. Honesty helps others learn.' },
          { text: 'It doesn\'t matter.', why: 'It matters; it nearly worked.' },
          { text: 'Because it sounded exactly like the sort of thing you\'d do. That\'s why it nearly worked.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Verify through a channel you [[1]] have, never through the message that [[2]].',
        blanks: [['already'], ['asked']],
        distractors: ['never', 'paid'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each line of the text to its purpose.',
        pairs: [
          ['"New number"', 'Explains the unknown sender'],
          ['"Can\'t call"', 'Stops a voice check'],
          ['"Before 12"', 'Creates urgency'],
          ['"I\'ll pay you back Friday"', 'Makes it feel small and safe'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which verification step doesn\'t really verify?',
        lines: [
          'Call Jayden\'s saved number.',
          'Message him on his usual app account.',
          'Ask the new number to send a selfie.',
        ],
        bug: 2,
        fix: 'Only use channels you already had before the message.',
        explanation: 'Photos can be taken from social media. The new number is the scammer\'s channel.',
      },
      {
        kind: 'mcq',
        prompt: 'Why might paying once make things worse, beyond losing £480?',
        options: [
          { text: 'It marks her as a target for more requests' },
          { text: 'It doesn\'t', why: 'Scammers often come back for more.' },
          { text: 'Banks fine you', why: 'It\'s about being targeted again.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'How much did the text ask for, in pounds? (A number.)',
        answers: ['480', '£480'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'What made Grace nearly pay?',
        options: [
          { text: 'Not being clever enough', why: 'It\'s pressure, not intelligence.' },
          { text: 'A bank\'s advice', why: 'No bank was involved.' },
          { text: 'Love, being busy, and a deadline' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who in your life would you rush to help if they texted from a new number? How would you check it\'s really them?',
    starters: ['I\'d rush to help...', 'I\'d check by...'],
  },
  deepen: {
    title: 'Family impersonation scams',
    summary: '"Hi Mum" and "Hi Dad" texts became common in the UK and elsewhere from around 2021, often on messaging apps. Some families agree a safe word to use if anyone ever asks for money by message.',
  },
  notes: 'Cast: Grace, Jayden per CAST. "Hi Mum" scam widely reported by UK police and banks from 2021. No apps or banks named.',
};

export default lesson;
