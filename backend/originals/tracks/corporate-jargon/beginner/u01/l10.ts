import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9 with some 1–4. Story beat: Brian's late-night voice note. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: Brian\'s voice note',
  summary: 'Thursday, 9:40 p.m. A two-minute voice note from Brian lands. It has eleven pieces of jargon and Remi\'s whole Friday in it.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Decode priority words, impact words and "look closer" words', 'Turn a long jargon message into a clear plan for the day'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 9:40 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Remi is halfway through a plate of nyama choma when his phone buzzes. A voice note from Brian. 2 minutes 14 seconds.' },
        { speaker: 'brian', text: 'Hey Remi, sorry for the late one! For tomorrow: top priority is the Swift Freight thing, great catch by the way. Can you drill down into the invoices with Finance, but let\'s not boil the ocean, just the last three months.' },
        { speaker: 'brian', text: 'The van logo is back burner, forget it for now. Quick win if you have time: update the FAQ. Keep me in the loop, and let\'s circle back at the Friday wrap-up. Oh, and if this moves the needle on costs, it\'s a big deal. Cheers!' },
        { speaker: 'remi', text: '(On Monday, I would have understood "Remi" and "cheers". Now...)' },
        { speaker: 'tey', text: "Now you can decode the whole thing. Let's prove it." },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2. Brian\'s voice note, decoded.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is Remi\'s top priority on Friday?',
        options: [
          { text: 'The van logo', why: 'Brian put the logo on the back burner: forget it for now.' },
          { text: 'The FAQ page', why: 'That\'s a quick win "if you have time". Not the top priority.' },
          { text: 'The Swift Freight invoices' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Sort Brian\'s Friday list.',
        groups: ['Top priority', 'If there\'s time', 'Not now'],
        items: [
          { text: 'Swift Freight invoices', group: 0 },
          { text: 'Update the FAQ', group: 1 },
          { text: 'Van logo', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Drill down into the invoices, but let\'s not boil the ocean, just the last three months." What does Brian want?',
        options: [
          { text: 'A detailed look, but only at three months, not every invoice ever' },
          { text: 'Check every invoice in the company\'s history', why: 'That\'s exactly the "boil the ocean" he\'s warning against.' },
          { text: 'A quick glance at the invoices', why: '"Drill down" means detail. The limit is on how far back, not how closely.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the voice-note phrases to plain English.',
        pairs: [
          ['Back burner', 'Paused for now'],
          ['Quick win', 'Easy and useful'],
          ['Keep me in the loop', 'Keep me informed'],
          ['Circle back', 'Come back to it'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: '"If this moves the needle on costs..." Plain English: if this makes a real ... to costs (one word)',
        answers: ['difference', 'change', 'dent'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: '(voice note, 2:14)',
        prompt: 'Remi replies by text. Which reply shows he understood?',
        options: [
          { text: 'Noted, will boil the ocean on the invoices.', why: 'Brian said NOT to boil the ocean.' },
          { text: 'Got it! Tomorrow: Swift Freight invoices with Finance (last 3 months), FAQ if there\'s time, logo on hold. I\'ll update you at the wrap-up.' },
          { text: 'Thumbs up', why: 'Fine for a small thing. For a full day\'s plan, repeating it back catches misunderstandings.' },
        ],
        answer: 1,
        explanation: 'Playing the plan back in plain words is the fastest way to catch a misunderstanding before it costs a day.',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s Friday plan. Which line is wrong?',
        lines: [
          '9:00: Meet Finance about Swift Freight, last 3 months only.',
          '11:00: Start designing the new van logo.',
          '2:00: Update the FAQ if there\'s time.',
          '5:00: Friday wrap-up with Brian.',
        ],
        bug: 1,
        fix: '11:00: Keep going on the invoices.',
        explanation: 'The logo is on the back burner. Don\'t spend top-priority time on it.',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Remi\'s finding, for the wrap-up. Which version is best?',
        options: [
          { text: 'We paid Swift Freight twice for 4 deliveries in August: KSh 186,000 we can claim back.' },
          { text: 'The invoice work was a real game-changer with massive impact.', why: 'Big words, no facts. What did he find?' },
          { text: 'I looked at a lot of invoices and it took ages.', why: 'That\'s about the work, not the result.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The "offline" rule.',
        template: 'Whatever the reason, follow [[1]] and ask for a [[2]].',
        blanks: [['up'], ['time']],
        distractors: ['away', 'raise'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the deep-dive steps in order.',
        lines: ['Find the one question', 'Agree the size and deadline', 'Dig, then find the "so what"', 'Lead with the answer'],
      },
      {
        kind: 'mcq',
        prompt: 'Brian also says, "Touch base with Felix about the invoice system." What should Remi do?',
        options: [
          { text: 'Book a two-hour workshop with Felix', why: 'Touching base is brief.' },
          { text: 'Email the whole IT department', why: 'Brian named one person: Felix.' },
          { text: 'Have a short chat with Felix' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Decode: "Let\'s put a pin in the logo and circle back next month."',
        tiles: ['Let\'s', 'pause', 'the', 'logo', 'and', 'come', 'back', 'to', 'it', 'next', 'month.'],
        distractors: ['offline'],
      },
    ],
  },
  reflect: {
    prompt: 'When someone gives you a lot of instructions at once, what do you usually do? What will you do now?',
    starters: ['Usually I...', 'Now I\'ll play it back like Remi: ...'],
  },
  deepen: {
    title: 'The play-back habit',
    summary: 'For one week, whenever you get a task with more than two parts, reply with a one-line play-back: the task, the deadline, the people. Count how many misunderstandings it catches.',
  },
  notes: 'Review of lessons 6–9, plus 1–4. KSh = Kenyan shilling; the sum is fictional. Nyama choma = Kenyan grilled meat.',
};

export default lesson;
