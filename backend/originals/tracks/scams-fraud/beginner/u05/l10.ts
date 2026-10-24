import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10. Final challenge: the whole course. Ending. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: the session',
  summary: 'Grace runs the full session for all of Kinwell. At the end, she plays a recording: one call that uses every trick in the book. Take it apart using everything from the course. Then, on the way home, a text: "Hi Mum..."',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Take apart a complex scam using the whole course', 'Teach others to do the same'],
  learn: [
    {
      kind: 'story',
      title: 'The session',
      beats: [
        { speaker: 'narrator', text: 'Kinwell\'s biggest meeting room. Every seat taken. Femi at the front with his own warning post on a slide. Jayden on a video call from college, "for the young people\'s section".' },
        { speaker: 'grace', text: 'Last thing. A recording of a real-style call. Spot everything.' },
        { speaker: 'narrator', text: 'Afterwards, Callum stays behind: "My dad got a call like that last year. He never told anyone. I\'m sending him your page."' },
        { speaker: 'narrator', text: 'On the tram home, Grace\'s phone buzzes. Unknown number. "Hi Mum, dropped my phone, this is my new number..." She laughs out loud, forwards it to 7726, and texts Jayden on his real number: "They\'re back. Safe word?" He replies in seconds, with the right one.' },
        { speaker: 'tey', text: 'The recipe, investment scams, impersonation, scams aimed at young people, and protect-report-recover. Grace\'s file became a whole company\'s protection. Now, the recording.' },
      ],
    },
  ],
  apply: {
    scenario: 'Final challenge: the recording. "Hello, this is Detective Sergeant Hale from the fraud unit. Your bank account has been used by a criminal gang, and staff at your branch may be involved, so don\'t tell them. To protect your savings, move them to a secure account we\'ve set up. I\'ll stay on the line. You\'ll also get a code; read it to me to confirm it\'s you. This needs to happen in the next 20 minutes."',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Find the recipe in the call.',
        pairs: [
          ['Authority', '"Detective Sergeant"'],
          ['Secrecy', '"Don\'t tell branch staff"'],
          ['Urgency', '"Next 20 minutes"'],
          ['Fear', '"Criminal gang"'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which "never" does each request break?',
        groups: ['Never move money to a "safe account"', 'Never share codes'],
        items: [
          { text: '"Move your savings to a secure account"', group: 0 },
          { text: '"Read the code to me"', group: 1 },
          { text: '"We\'ve set up an account for you"', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Would real police ever ask you to move money or read out a code?',
        options: [
          { text: 'In emergencies', why: 'Never.' },
          { text: 'Never' },
          { text: 'If they give a rank', why: 'Ranks are easy to fake.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the right response to the call.',
        lines: ['Hang up', 'Wait or use another phone', 'Call your bank on the card number or 159', 'Report the call', 'Add it to the scam file'],
      },
      {
        kind: 'chatReply',
        from: 'femi',
        message: 'What if he calls back and gets angry?',
        prompt: 'Grace\'s best answer?',
        options: [
          { text: 'Do what he says this time.', why: 'Anger is a pressure tactic.' },
          { text: 'Argue with him.', why: 'Just hang up.' },
          { text: 'Hang up again. Anger is just urgency in a louder voice. Real police won\'t mind you checking.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The one check.',
        template: 'Use my [[1]] channel, never [[2]].',
        blanks: [['own'], ['theirs']],
        distractors: ['fastest', 'his'],
      },
      {
        kind: 'findBug',
        prompt: 'Which response to the call would lead to a loss?',
        lines: [
          'Hang up and call the bank on the card number.',
          'Tell the branch staff exactly what the caller said.',
          'Stay on the line but only read out half the code.',
        ],
        bug: 2,
        fix: 'Hang up; never share any part of a code.',
        explanation: 'Staying on the line keeps you in the scammer\'s control.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did the caller give?',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'If someone had already moved money after this call, what\'s the first step?',
        options: [
          { text: 'Call the detective back', why: 'That\'s the scammer.' },
          { text: 'Call their bank immediately on a trusted number' },
          { text: 'Wait until Monday', why: 'Speed matters.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Callum\'s dad.',
        template: 'He stayed quiet out of [[1]], which is exactly what scammers count [[2]].',
        blanks: [['shame'], ['on']],
        distractors: ['anger', 'for'],
      },
      {
        kind: 'mcq',
        prompt: 'How did Grace handle the second "Hi Mum" text?',
        options: [
          { text: 'Forwarded it to 7726 and checked with Jayden on his real number, with the safe word' },
          { text: 'Paid it, to be safe', why: 'She knew better.' },
          { text: 'Replied asking who it was', why: 'She used her own channel.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'What is this whole course really about?',
        options: [
          { text: 'Never using a phone', why: 'Habits, not avoidance.' },
          { text: 'Being cleverer than scammers', why: 'It\'s about habits, not cleverness.' },
          { text: 'A few habits, kept for life, that make you very hard to scam, and the kindness to help others' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'You\'ve finished Grace and the Scam Files. Who will you share your one-page handout with first?',
    starters: ['I\'ll share it with...', 'Because...'],
  },
  notes: 'Final challenge (xp 30). Callum, DS Hale (fake) narrated. Ending: second "Hi Mum" text, forwarded to 7726, safe word confirmed.',
};

export default lesson;
