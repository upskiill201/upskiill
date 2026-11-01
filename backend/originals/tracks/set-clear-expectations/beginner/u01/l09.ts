import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Tap to explore: Arjun's rewritten brief to Joel, marked up. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Line check: the new brief',
  summary: 'Day 3, 8:30 a.m. Arjun sends Joel the rewritten cart brief. Ten minutes later Joel replies with three real questions, the first questions he\'s asked all week. Tap through to see why.',
  minutes: 11,
  outcomes: [
    'See every Chapter 1 tool in one short brief',
    'Write a brief that invites questions',
    'Spot what\'s missing from your own briefs',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Arjun to Joel, Day 3, 8:30 a.m.',
      text: 'Joel, my Day 1 brief was too short. That\'s on me. The cart: guest checkout with UPI, no login. Why: most of Mr Rao\'s buyers are on cheap phones and give up if asked to sign up. Done means it works on a cheap Android, in Hindi and English, and an order reaches Mr Rao\'s email. Here\'s the UPI code from my last project to start from. Rough version tomorrow at 4. Which part are you least sure about?',
      hotspots: [
        { phrase: 'my Day 1 brief was too short. That\'s on me.', note: 'Owning the gap. Joel learns the problem was the brief, not him, so asking feels safe.' },
        { phrase: 'guest checkout with UPI, no login', note: 'The thing that was only in Arjun\'s head, finally on the page.' },
        { phrase: 'Why: most of Mr Rao\'s buyers are on cheap phones', note: 'The why, so Joel can make good choices Arjun didn\'t think of.' },
        { phrase: 'Done means it works on a cheap Android', note: 'A definition of done, written before the work, not argued about after.' },
        { phrase: 'Here\'s the UPI code from my last project', note: 'A worked example: show, don\'t just tell.' },
        { phrase: 'Rough version tomorrow at 4.', note: 'An early check-in. A wrong turn now costs one day, not five.' },
        { phrase: 'Which part are you least sure about?', note: 'A specific question that assumes there are questions. And there were three.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'A good brief: own the gap, what, why, done, an example, an early check-in, and a question that invites questions.',
    },
  ],
  apply: {
    scenario: 'Line check, Day 3.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Joel finally ask three questions?',
        options: [
          { text: 'Joel was bored', why: 'He was finally safe to ask.' },
          { text: 'Arjun ordered him to', why: 'He invited him.' },
          { text: 'Arjun owned the gap and asked a specific question that assumed there were questions' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which Chapter 1 tool is it?',
        groups: ['Definition of done', 'Show, don\'t tell', 'Safe to ask'],
        items: [
          { text: 'Works on a cheap Android', group: 0 },
          { text: 'The UPI code to start from', group: 1 },
          { text: '"Which part are you least sure about?"', group: 2 },
          { text: 'An order reaches Mr Rao\'s email', group: 0 },
          { text: 'An example from the last project', group: 1 },
          { text: '"That\'s on me."', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Least sure about: what happens if the UPI payment fails halfway?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Brilliant question, I hadn\'t written that down. Show a "payment didn\'t go through, try again" screen and keep the cart. Adding it to done.' },
          { text: 'It won\'t fail.', why: 'It will, sometimes. Joel found a real gap.' },
          { text: 'Figure it out.', why: 'He just did the hard part: he asked.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: '"That\'s on me" means Arjun is ___ the gap. (one word)',
        answers: ['owning', 'Owning'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why add Joel\'s question to the definition of done?',
        options: [
          { text: 'To give Joel more work', why: 'It\'s work that was always needed.' },
          { text: 'It was a real gap; now it\'s written down for everyone' },
          { text: 'It doesn\'t matter', why: 'Failed payments matter a lot.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Draft 1 of the brief. Which line breaks Chapter 1?',
        lines: [
          'The cart: guest checkout with UPI, no login.',
          'You should have asked about the login on Day 1.',
          'Rough version tomorrow at 4.',
        ],
        bug: 1,
        fix: 'My Day 1 brief was too short. That\'s on me.',
        explanation: 'Blaming him for not asking guarantees he won\'t ask next time.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the brief in order.',
        lines: ['Own the gap', 'What and why', 'What done looks like', 'An example and a check-in', 'A question for them'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the research.',
        pairs: [
          ['"That\'s on me."', 'Psychological safety'],
          ['"Here\'s the UPI code"', 'Worked-example effect'],
          ['"Done means..."', 'Definition of done'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Own the [[1]]. Then ask which part they\'re least [[2]] about.',
        blanks: [['gap', 'mistake'], ['sure']],
        distractors: ['blame', 'happy'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s opening line.',
        tiles: ['That\'s', 'on', 'me.'],
        distractors: ['you.'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last brief you sent. Which of these was missing: what, why, done, an example, a check-in, a question?',
    starters: ['My brief was missing...', 'Next time I\'ll add...'],
  },
  deepen: {
    title: 'Rewrite one brief',
    summary: 'Take a brief you sent this week and rewrite it with the seven parts from this lesson. Send the new version, and say why.',
  },
  notes: 'Synthesis of Chapter 1 tools: owning the gap (psychological safety), definition of done, purpose, worked example, early check-in, specific question prompt. Fictional brief.',
};

export default lesson;
