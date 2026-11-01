import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 5 · Lesson 17 — story choice: declining Kmer and Mr Tamba. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'The harder call',
  summary: 'Mr Tamba gave Clinton his first real job. He waited for his answer. Now Clinton has to tell him no. He\'d honestly rather send a text and switch his phone off.',
  minutes: 11,
  outcomes: ['Decline an offer gracefully', 'Thank people who helped you', 'Keep a relationship after saying no'],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 10am',
      beats: [
        { speaker: 'narrator', text: 'Friday, 10am. Njangi Pay has his yes. Now Clinton stares at Mr Tamba\'s number.' },
        { speaker: 'clinton', text: 'He believed in me before anyone else. What do I even say?' },
        { speaker: 'tey', text: 'Declining well is a skill. People remember how you said no as much as how you said yes, and the people who gave you your first chance often stay in your career for years.' },
      ],
      choice: {
        prompt: 'How should Clinton tell Mr Tamba?',
        options: [
          {
            text: 'Call him, thank him specifically, explain briefly, and offer to help with the handover.',
            outcome: 'Mr Tamba is quiet, then laughs. "I knew Njangi would take you. Go and learn. Finish the tracker handover, and come back and see us." He\'s still Clinton\'s reference.',
            best: true,
          },
          {
            text: 'Send a one-line text: "Sorry, I\'m taking another job."',
            outcome: 'It\'s done in five seconds, and Mr Tamba feels like the last three months meant little.',
          },
          {
            text: 'Say nothing, and stop answering his calls.',
            outcome: 'Mr Tamba hears it from Tchami. A reference, a friendship and a reputation, gone.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Decline by call if you can. Thank them specifically. Explain briefly. Offer help. Keep the door open.',
    },
  ],
  apply: {
    scenario: 'Clinton declines Kmer.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why call Mr Tamba rather than text?',
        options: [
          { text: 'Texts are illegal', why: 'A call is about respect here.' },
          { text: 'He gave Clinton his first chance; a call shows respect' },
          { text: 'To change his mind', why: 'He\'s decided. It\'s about respect.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the call in order.',
        lines: ['Thank him specifically', 'Say your decision clearly', 'Explain briefly', 'Offer help with the handover', 'Say you\'d like to stay in touch'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Graceful or not?',
        groups: ['Graceful', 'Not graceful'],
        items: [
          { text: 'Thank you for my first real chance', group: 0 },
          { text: 'Sorry, taking another job (text only)', group: 1 },
          { text: 'I\'ll finish the tracker handover', group: 0 },
          { text: 'Ignoring his calls', group: 1 },
          { text: 'I\'d love to stay in touch', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s opening line.',
        from: 'clinton',
        message: 'What\'s the first thing I say when he answers?',
        options: [
          { text: '"So, bad news..."', why: 'Start with genuine thanks.' },
          { text: '"Njangi paid more, bye."', why: 'Thank him first, explain briefly.' },
          { text: '"Mr Tamba, first, thank you. You gave me my first real chance, and I learned so much at Kmer."' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that would hurt.',
        lines: ['Thank you for everything.', 'Honestly, Kmer was just a back-up.', 'I\'ll finish the handover.'],
        bug: 1,
        explanation: 'Unkind, and unnecessary. Explain briefly and positively.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['A call with thanks and handover', 'Still his reference'],
          ['A one-line text', 'Three months feel small'],
          ['Silence', 'He hears it from Tchami'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'How should Clinton explain his choice?',
        options: [
          { text: 'Briefly: "I\'ll be on a team building payments, which is where I want to learn."' },
          { text: 'A long list of what Kmer lacks', why: 'Brief and positive.' },
          { text: 'Not at all', why: 'A short, honest reason is kind.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Thank them [[1]]. Explain [[2]]. Offer help.',
        blanks: [['specifically'], ['briefly']],
        distractors: ['vaguely', 'endlessly', 'never'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What will Clinton hand over before leaving Kmer? The ___. (one word)',
        answers: ['tracker', 'project', 'code'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the relationship, or ends it?',
        groups: ['Keeps it', 'Ends it'],
        items: [
          { text: 'Visiting after he starts at Njangi', group: 0 },
          { text: 'Never speaking again', group: 1 },
          { text: 'Updating him on how it goes', group: 0 },
          { text: 'Badmouthing Kmer later', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever had to say no to someone who helped you? How did you do it, and how would you do it now?',
    starters: ['I once had to...', 'Now I\'d...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write a five-part decline script you could use for any offer: thanks, decision, brief reason, help, stay in touch.',
  },
  notes: 'Declining offers gracefully is standard careers guidance.',
};

export default lesson;
